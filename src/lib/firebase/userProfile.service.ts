import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './db';
import { uploadImageToCloudinary } from '../cloudinary';
import { DEFAULT_USER_ROLE } from '@/utils/types';

export const createUserProfile = async (
  uid: string,
  name: string,
  email: string,
  googlePhotoURL: string | null,
) => {
  const userRef = doc(db, 'users', uid);
  const existing = await getDoc(userRef);

  if (existing.exists()) {
    return;
  }

  let photoURL = googlePhotoURL;

  if (googlePhotoURL) {
    const res = await fetch(googlePhotoURL);
    const blob = await res.blob();
    const file = new File([blob], 'avatar.jpg', { type: blob.type });

    const cloudinaryUrl = await uploadImageToCloudinary(file);
    if (cloudinaryUrl) photoURL = cloudinaryUrl;
  }

  await setDoc(userRef, {
    uid,
    name,
    email,
    photoURL: photoURL ?? `https://ui-avatars.com/api/?name=${name}`,
    role: DEFAULT_USER_ROLE,
    createdAt: serverTimestamp(),
  });
};
