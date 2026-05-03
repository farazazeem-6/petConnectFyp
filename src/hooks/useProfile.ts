'use client';

import { useState, useEffect, useCallback } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/store/auth/authSlice';
import type { TAuthUser } from '@/store/auth/authSlice';
import type { RootState, AppDispatch } from '@/store/store';
import { TUserProfile } from '@/utils/types';
import {
  auth,
  db,
  isGoogleAccount,
  removeUserPhoto,
  updateUserEmail,
  updateUserName,
  updateUserPassword,
  updateUserPhoto,
} from '@/lib/firebase';

type TUseProfileReturn = {
  profile: TUserProfile | null;
  pageLoading: boolean;
  actionLoading: boolean;
  photoLoading: boolean;
  isGoogleUser: boolean;
  fetchProfile: () => Promise<void>;
  handleSaveInfo: (
    name: string,
    email: string,
    currentPassword: string,
  ) => Promise<void>;
  handleUpdatePhoto: (file: File) => Promise<void>;
  handleRemovePhoto: () => Promise<void>;
  handleUpdatePassword: (
    currentPassword: string,
    newPassword: string,
  ) => Promise<void>;
};

export const useProfile = (): TUseProfileReturn => {
  const [profile, setProfile] = useState<TUserProfile | null>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [photoLoading, setPhotoLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const reduxUser = useSelector((state: RootState) => state.auth.user);

  const isGoogleUser = isGoogleAccount();

  // ── Patch Redux so Header re-renders instantly without reload
  const patchReduxUser = useCallback(
    (patch: Partial<NonNullable<TAuthUser>>) => {
      if (!reduxUser) return;
      dispatch(setUser({ ...reduxUser, ...patch }));
    },
    [dispatch, reduxUser],
  );

  // ── Fetch Firestore profile — waits for Auth to be ready first
  const fetchProfile = useCallback(async () => {
    return new Promise<void>((resolve) => {
      // onAuthStateChanged guarantees Auth is hydrated before we proceed
      // unsubscribe immediately after first emission — we only need it once here
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        unsubscribe();
        if (!user) {
          setPageLoading(false);
          resolve();
          return;
        }
        try {
          const snap = await getDoc(doc(db, 'users', user.uid));
          if (snap.exists()) setProfile(snap.data() as TUserProfile);
        } finally {
          setPageLoading(false);
          resolve();
        }
      });
    });
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // ── Photo update
  const handleUpdatePhoto = async (file: File): Promise<void> => {
    setPhotoLoading(true);
    try {
      const newUrl = await updateUserPhoto(file);
      await fetchProfile();
      patchReduxUser({ photo: newUrl }); // ← Header avatar updates instantly
    } finally {
      setPhotoLoading(false);
    }
  };

  // ── Photo remove
  const handleRemovePhoto = async (): Promise<void> => {
    setPhotoLoading(true);
    try {
      await removeUserPhoto(profile?.name ?? '');
      await fetchProfile();
      const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile?.name ?? '')}&background=random`;
      patchReduxUser({ photo: fallbackUrl }); // ← Header avatar updates instantly
    } finally {
      setPhotoLoading(false);
    }
  };

  // ── Name + email update
  const handleSaveInfo = async (
    name: string,
    email: string,
    currentPassword: string,
  ): Promise<void> => {
    setActionLoading(true);
    try {
      const nameChanged = name !== profile?.name;
      const emailChanged = email !== profile?.email;

      if (nameChanged) await updateUserName(name);
      if (emailChanged && !isGoogleUser)
        await updateUserEmail(email, currentPassword);

      await fetchProfile();

      // Patch Redux so Header name/email updates instantly
      const patch: Partial<NonNullable<TAuthUser>> = {};
      if (nameChanged) patch.name = name;
      if (emailChanged && !isGoogleUser) patch.email = email;
      if (Object.keys(patch).length) patchReduxUser(patch);
    } finally {
      setActionLoading(false);
    }
  };

  // ── Password — nothing in Redux to update
  const handleUpdatePassword = async (
    currentPassword: string,
    newPassword: string,
  ): Promise<void> => {
    setActionLoading(true);
    try {
      await updateUserPassword(currentPassword, newPassword);
    } finally {
      setActionLoading(false);
    }
  };

  return {
    profile,
    pageLoading,
    actionLoading,
    photoLoading,
    isGoogleUser,
    fetchProfile,
    handleSaveInfo,
    handleUpdatePhoto,
    handleRemovePhoto,
    handleUpdatePassword,
  };
};
