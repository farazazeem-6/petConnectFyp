import toast from 'react-hot-toast';
import { AppDispatch } from '../store';
import { setLoading, setUser, setError, logout } from './authSlice';
import type { TAuthUser } from './authSlice';
import {
  loginUser,
  registerUser,
  loginWithGoogle,
  logoutUser,
} from '@/lib/firebase';
import type { User } from 'firebase/auth';

/** Map Firebase User → our TAuthUser shape */
const toAuthUser = (u: User): TAuthUser => ({
  uid: u.uid,
  email: u.email,
  name: u.displayName,
  photo: u.photoURL,
});

export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading());
    const firebaseUser = await loginUser(email, password);
    dispatch(setUser(toAuthUser(firebaseUser)));
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
    dispatch(setUser(toAuthUser(firebaseUser)));
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
    dispatch(setUser(toAuthUser(firebaseUser)));
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