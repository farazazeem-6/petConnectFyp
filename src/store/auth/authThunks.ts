import toast from 'react-hot-toast';
import { AppDispatch } from '../store';
import { setLoading, setUser, setError, logout } from './authSlice';
import type { TAuthUser } from './authSlice';
import {
  loginUser,
  registerUser,
  loginWithGoogle,
  logoutUser,
  db,
} from '@/lib/firebase';
import type { User } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { DEFAULT_USER_ROLE, type UserRole } from '@/utils/types';

export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading());
    const firebaseUser = await loginUser(email, password);
    dispatch(setUser(await toAuthUser(firebaseUser)));
    toast.success('Login successful');
  } catch (err: any) {
    dispatch(setError(err.message ?? 'Login failed'));
    toast.error(err.message ?? 'Login failed');
  }
};

export const signup = (email: string, password: string, name: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading());
    const firebaseUser = await registerUser(email, password, name);
    dispatch(setUser(await toAuthUser(firebaseUser)));
    toast.success('Account created successfully');
  } catch (err: any) {
    dispatch(setError(err.message ?? 'Sign up failed'));
    toast.error(err.message ?? 'Sign up failed');
  }
};

export const googleLogin = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading());
    const firebaseUser = await loginWithGoogle();
    dispatch(setUser(await toAuthUser(firebaseUser)));
    toast.success('Logged in with Google');
  } catch (err: any) {
    dispatch(setError(err.message ?? 'Google sign-in failed'));
    toast.error(err.message ?? 'Google sign-in failed');
  }
};

export const logoutAction = () => async (dispatch: AppDispatch) => {
  try {
    await logoutUser();
    dispatch(logout());
    toast.success('Logged out successfully');
  } catch (err: any) {
    toast.error('Logout failed');
  }
};


/** Map Firebase User → our TAuthUser shape, with favouritePetIds and role from Firestore */
const toAuthUser = async (u: User): Promise<TAuthUser> => {
  const snap = await getDoc(doc(db, 'users', u.uid));
  const data = snap.exists() ? snap.data() : {};
  const favouritePetIds = (data.favouritePetIds as string[]) ?? [];
  const role = (data.role as UserRole) ?? DEFAULT_USER_ROLE;

  return {
    uid: u.uid,
    email: u.email,
    name: u.displayName,
    photo: u.photoURL,
    role,
    favouritePetIds,
  };
};