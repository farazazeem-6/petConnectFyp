import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './auth.service';
import { setUser } from '@/store/auth/authSlice';

/**
 * Subscribes to Firebase auth state changes and syncs them into Redux.
 * Called once on app boot inside AuthInitializer (Providers.tsx).
 * Calling setUser with null OR a real user both set loading → false.
 */
export const listenToAuthChanges = (dispatch: any) => {
  onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      dispatch(
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName,
          photo: firebaseUser.photoURL,
        })
      );
    } else {
      // No user signed in — explicitly set null so loading becomes false
      dispatch(setUser(null));
    }
  });
};