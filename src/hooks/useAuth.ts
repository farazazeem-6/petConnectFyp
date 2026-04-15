'use client';

import { useSelector } from 'react-redux';
import { useAppDispatch } from './useAppDispatch';
import { login, signup, googleLogin, logoutAction } from '@/store/auth';
import type { RootState } from '@/store';
import type { TAuthUser } from '@/store/auth/authSlice';

export const useAuth = () => {
  const dispatch = useAppDispatch();

  // Use react-redux's typed useSelector directly to avoid the overload ambiguity
  const user = useSelector<RootState, TAuthUser>((state) => state.auth.user);
  const loading = useSelector<RootState, boolean>((state) => state.auth.loading);
  const error = useSelector<RootState, string | null>((state) => state.auth.error);

  const handleLogin = (email: string, password: string) =>
    dispatch(login(email, password));

  const handleSignup = (email: string, password: string, name: string) =>
    dispatch(signup(email, password, name));

  const handleGoogleLogin = () => dispatch(googleLogin());

  const handleLogout = () => dispatch(logoutAction());

  return {
    user,
    loading,
    error,
    handleLogin,
    handleSignup,
    handleGoogleLogin,
    handleLogout,
  };
};
