import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { db } from './db';

/** Add a pet ID to the user's favouritePetIds array */
export const addFavourite = async (
  uid: string,
  petId: string,
): Promise<void> => {
  await updateDoc(doc(db, 'users', uid), {
    favouritePetIds: arrayUnion(petId),
  });
};

/** Remove a pet ID from the user's favouritePetIds array */
export const removeFavourite = async (
  uid: string,
  petId: string,
): Promise<void> => {
  await updateDoc(doc(db, 'users', uid), {
    favouritePetIds: arrayRemove(petId),
  });
};

/** Fetch all favourite pet IDs for a user */
export const getFavouritePetIds = async (uid: string): Promise<string[]> => {
  const snap = await getDoc(doc(db, 'users', uid));
  if (!snap.exists()) return [];
  return (snap.data().favouritePetIds as string[]) ?? [];
};
