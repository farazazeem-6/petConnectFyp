import {
  updateProfile,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from './db';
import { auth } from './auth.service';
import { uploadImageToCloudinary } from '../cloudinary';

// ── Returns "google.com" | "password"
export const getLoginProvider = (): string | undefined => {
  return auth.currentUser?.providerData?.[0]?.providerId;
};

// ── Use this everywhere to check google user
export const isGoogleAccount = (): boolean => {
  return getLoginProvider() === 'google.com';
};

// ── Re-authenticate (required before email/password change)
export const reAuthUser = async (currentPassword: string): Promise<void> => {
  const user = auth.currentUser!;
  const credential = EmailAuthProvider.credential(user.email!, currentPassword);
  await reauthenticateWithCredential(user, credential);
};

// ── Update Name → Auth + Firestore
export const updateUserName = async (name: string): Promise<void> => {
  const user = auth.currentUser!;
  await updateProfile(user, { displayName: name });
  await updateDoc(doc(db, 'users', user.uid), { name });
};

// ── Update Photo → Cloudinary → Auth + Firestore
export const updateUserPhoto = async (file: File): Promise<string> => {
  const user = auth.currentUser!;
  const cloudinaryUrl = await uploadImageToCloudinary(file);
  if (!cloudinaryUrl) throw new Error('Image upload failed');
  await updateProfile(user, { photoURL: cloudinaryUrl });
  await updateDoc(doc(db, 'users', user.uid), { photoURL: cloudinaryUrl });
  return cloudinaryUrl;
};

// ── Remove Photo → fallback to ui-avatars → Auth + Firestore
export const removeUserPhoto = async (name: string): Promise<void> => {
  const user = auth.currentUser!;
  const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;
  await updateProfile(user, { photoURL: fallbackUrl });
  await updateDoc(doc(db, 'users', user.uid), { photoURL: fallbackUrl });
};

// ── Update Email → re-auth → Auth + Firestore
export const updateUserEmail = async (
  newEmail: string,
  currentPassword: string,
): Promise<void> => {
  await reAuthUser(currentPassword);
  const user = auth.currentUser!;
  await updateEmail(user, newEmail);
  await updateDoc(doc(db, 'users', user.uid), { email: newEmail });
};

// ── Update Password → re-auth → Auth
export const updateUserPassword = async (
  currentPassword: string,
  newPassword: string,
): Promise<void> => {
  await reAuthUser(currentPassword);
  await updatePassword(auth.currentUser!, newPassword);
};
