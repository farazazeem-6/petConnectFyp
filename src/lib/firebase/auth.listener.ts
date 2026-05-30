import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth } from './auth.service';
import { db } from './db';
import { setUser } from '@/store/auth/authSlice';
import { DEFAULT_USER_ROLE, type UserRole } from '@/utils/types';

export const listenToAuthChanges = (dispatch: any) => {
  onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      const snap = await getDoc(doc(db, 'users', firebaseUser.uid));
      const data = snap.exists() ? snap.data() : {};
      const favouritePetIds = (data.favouritePetIds as string[]) ?? [];
      const role = (data.role as UserRole) ?? DEFAULT_USER_ROLE;

      dispatch(
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName,
          photo: firebaseUser.photoURL,
          role,
          favouritePetIds,
        }),
      );
    } else {
      dispatch(setUser(null));
    }
  });
};
