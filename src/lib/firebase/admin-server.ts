import admin from 'firebase-admin';

let adminInitialized = false;

export const getFirebaseAdmin = () => {
  if (!adminInitialized) {
    const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

    if (serviceAccountJson) {
      const serviceAccount = JSON.parse(serviceAccountJson) as admin.ServiceAccount;
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    } else if (
      process.env.FIREBASE_ADMIN_PROJECT_ID &&
      process.env.FIREBASE_ADMIN_CLIENT_EMAIL &&
      process.env.FIREBASE_ADMIN_PRIVATE_KEY
    ) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
          clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }),
      });
    } else {
      throw new Error(
        'Firebase Admin credentials missing. Set FIREBASE_SERVICE_ACCOUNT_KEY or FIREBASE_ADMIN_* env vars.',
      );
    }

    adminInitialized = true;
  }

  return admin;
};

export type VerifiedAdmin = {
  uid: string;
};

export const verifyAdminRequest = async (
  req: Request,
): Promise<{ admin: VerifiedAdmin } | { error: string; status: number }> => {
  const authHeader = req.headers.get('Authorization');

  if (!authHeader?.startsWith('Bearer ')) {
    return { error: 'Missing authorization token', status: 401 };
  }

  const idToken = authHeader.slice(7);

  try {
    const firebaseAdmin = getFirebaseAdmin();
    const decoded = await firebaseAdmin.auth().verifyIdToken(idToken);
    const userSnap = await firebaseAdmin
      .firestore()
      .collection('users')
      .doc(decoded.uid)
      .get();

    if (!userSnap.exists() || userSnap.data()?.role !== 'admin') {
      return { error: 'Admin access required', status: 403 };
    }

    return { admin: { uid: decoded.uid } };
  } catch (error) {
    console.error('[verifyAdminRequest]', error);
    return { error: 'Invalid or expired token', status: 401 };
  }
};

export const deleteUserPermanently = async (uid: string): Promise<void> => {
  const firebaseAdmin = getFirebaseAdmin();
  const firestore = firebaseAdmin.firestore();

  const [animalSnap, reportSnap] = await Promise.all([
    firestore.collection('animals').where('userId', '==', uid).get(),
    firestore.collection('lostFoundReports').where('userId', '==', uid).get(),
  ]);

  const batch = firestore.batch();

  animalSnap.docs.forEach((docSnap) => batch.delete(docSnap.ref));
  reportSnap.docs.forEach((docSnap) => batch.delete(docSnap.ref));
  batch.delete(firestore.collection('users').doc(uid));

  await batch.commit();
  await firebaseAdmin.auth().deleteUser(uid);
};
