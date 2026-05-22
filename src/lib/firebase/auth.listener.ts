import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth } from './auth.service';
import { db } from './db';
import { setUser } from '@/store/auth/authSlice';

export const listenToAuthChanges = (dispatch: any) => {
  onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      const snap = await getDoc(doc(db, 'users', firebaseUser.uid));
      const favouritePetIds = snap.exists()
        ? (snap.data().favouritePetIds as string[]) ?? []
        : [];

      dispatch(
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName,
          photo: firebaseUser.photoURL,
          favouritePetIds,
        }),
      );
    } else {
      dispatch(setUser(null));
    }
  });
};