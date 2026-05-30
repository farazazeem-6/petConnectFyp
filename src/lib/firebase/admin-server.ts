import { importPKCS8, SignJWT } from 'jose';

type ServiceAccountCredentials = {
  project_id: string;
  client_email: string;
  private_key: string;
};

type FirestoreDocument = {
  name: string;
};

type RunQueryResponse = {
  document?: FirestoreDocument;
}[];

type TokenInfoResponse = {
  sub?: string;
  aud?: string;
  error?: string;
};

let cachedAccessToken: { token: string; expiresAt: number } | null = null;

const getServiceAccount = (): ServiceAccountCredentials => {
  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (serviceAccountJson) {
    return JSON.parse(serviceAccountJson) as ServiceAccountCredentials;
  }

  if (
    process.env.FIREBASE_ADMIN_PROJECT_ID &&
    process.env.FIREBASE_ADMIN_CLIENT_EMAIL &&
    process.env.FIREBASE_ADMIN_PRIVATE_KEY
  ) {
    return {
      project_id: process.env.FIREBASE_ADMIN_PROJECT_ID,
      client_email: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      private_key: process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n'),
    };
  }

  throw new Error(
    'Firebase Admin credentials missing. Set FIREBASE_SERVICE_ACCOUNT_KEY or FIREBASE_ADMIN_* env vars.',
  );
};

const getProjectId = (): string => {
  return (
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? getServiceAccount().project_id
  );
};

const getAccessToken = async (): Promise<string> => {
  if (cachedAccessToken && cachedAccessToken.expiresAt > Date.now() + 60_000) {
    return cachedAccessToken.token;
  }

  const credentials = getServiceAccount();
  const now = Math.floor(Date.now() / 1000);
  const privateKey = await importPKCS8(credentials.private_key, 'RS256');

  const assertion = await new SignJWT({
    scope: 'https://www.googleapis.com/auth/cloud-platform',
  })
    .setProtectedHeader({ alg: 'RS256', typ: 'JWT' })
    .setIssuedAt(now)
    .setExpirationTime(now + 3600)
    .setIssuer(credentials.client_email)
    .setSubject(credentials.client_email)
    .setAudience('https://oauth2.googleapis.com/token')
    .sign(privateKey);

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to obtain access token: ${errorText}`);
  }

  const data = (await response.json()) as {
    access_token?: string;
    expires_in?: number;
  };

  if (!data.access_token) {
    throw new Error('Access token missing from Google OAuth response');
  }

  cachedAccessToken = {
    token: data.access_token,
    expiresAt: Date.now() + (data.expires_in ?? 3600) * 1000,
  };

  return data.access_token;
};

const firestoreBaseUrl = (projectId: string) =>
  `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents`;

const queryDocumentsByUserId = async (
  collectionId: string,
  userId: string,
): Promise<string[]> => {
  const projectId = getProjectId();
  const accessToken = await getAccessToken();

  const response = await fetch(`${firestoreBaseUrl(projectId)}:runQuery`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      structuredQuery: {
        from: [{ collectionId }],
        where: {
          fieldFilter: {
            field: { fieldPath: 'userId' },
            op: 'EQUAL',
            value: { stringValue: userId },
          },
        },
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Firestore query failed: ${errorText}`);
  }

  const results = (await response.json()) as RunQueryResponse;

  return results
    .map((entry) => entry.document?.name)
    .filter((name): name is string => Boolean(name));
};

const deleteFirestoreDocuments = async (documentNames: string[]): Promise<void> => {
  if (documentNames.length === 0) return;

  const projectId = getProjectId();
  const accessToken = await getAccessToken();

  const response = await fetch(`${firestoreBaseUrl(projectId)}:commit`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      writes: documentNames.map((name) => ({ delete: name })),
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Firestore delete failed: ${errorText}`);
  }
};

const getUserRole = async (uid: string): Promise<string | null> => {
  const projectId = getProjectId();
  const accessToken = await getAccessToken();

  const response = await fetch(
    `${firestoreBaseUrl(projectId)}/users/${uid}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (response.status === 404) return null;

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to read user role: ${errorText}`);
  }

  const data = (await response.json()) as {
    fields?: { role?: { stringValue?: string } };
  };

  return data.fields?.role?.stringValue ?? null;
};

const verifyFirebaseIdToken = async (idToken: string): Promise<string> => {
  const projectId = getProjectId();
  const response = await fetch(
    `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`,
  );

  if (!response.ok) {
    throw new Error('Invalid ID token');
  }

  const data = (await response.json()) as TokenInfoResponse;

  if (data.error || !data.sub) {
    throw new Error('Invalid ID token payload');
  }

  if (data.aud !== projectId) {
    throw new Error('ID token audience mismatch');
  }

  return data.sub;
};

const deleteAuthUser = async (uid: string): Promise<void> => {
  const projectId = getProjectId();
  const accessToken = await getAccessToken();

  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/projects/${projectId}/accounts:delete`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ localId: uid }),
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Auth user delete failed: ${errorText}`);
  }
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
    const uid = await verifyFirebaseIdToken(idToken);
    const role = await getUserRole(uid);

    if (role !== 'admin') {
      return { error: 'Admin access required', status: 403 };
    }

    return { admin: { uid } };
  } catch (error) {
    console.error('[verifyAdminRequest]', error);
    return { error: 'Invalid or expired token', status: 401 };
  }
};

export const deleteUserPermanently = async (uid: string): Promise<void> => {
  const projectId = getProjectId();

  const [animalDocs, reportDocs] = await Promise.all([
    queryDocumentsByUserId('animals', uid),
    queryDocumentsByUserId('lostFoundReports', uid),
  ]);

  const userDoc = `${firestoreBaseUrl(projectId)}/users/${uid}`;

  await deleteFirestoreDocuments([...animalDocs, ...reportDocs, userDoc]);
  await deleteAuthUser(uid);
};
