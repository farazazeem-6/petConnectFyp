import {
  collection,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { auth as firebaseAuth } from './auth.service';
import { db } from './db';
import {
  getAnimals,
  getLostFoundReports,
} from './animal.service';
import type { TAdminUser, UserRole } from '@/utils/types';

function toTimestamp(ts: unknown): string {
  const value = ts as { toDate?: () => Date } | undefined;
  return value?.toDate ? value.toDate().toISOString() : new Date().toISOString();
}

export const getAllUsers = async (): Promise<TAdminUser[]> => {
  const snapshot = await getDocs(collection(db, 'users'));
  const users = snapshot.docs.map((d) => {
    const data = d.data();
    return {
      uid: d.id,
      name: (data.name as string) ?? '',
      email: (data.email as string) ?? '',
      photoURL:
        (data.photoURL as string) ??
        `https://ui-avatars.com/api/?name=${encodeURIComponent((data.name as string) ?? 'User')}`,
      role: (data.role as UserRole) ?? 'user',
      createdAt: data.createdAt ? toTimestamp(data.createdAt) : undefined,
      favouritePetIds: (data.favouritePetIds as string[]) ?? [],
    } satisfies TAdminUser;
  });

  return users.sort(
    (a, b) =>
      new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime(),
  );
};

export const updateUserRole = async (uid: string, role: UserRole): Promise<void> => {
  await updateDoc(doc(db, 'users', uid), { role });
};

/** Permanently deletes user Auth account + Firestore profile + all listings via API */
export const permanentlyDeleteUser = async (uid: string): Promise<void> => {
  const currentUser = firebaseAuth.currentUser;

  if (!currentUser) {
    throw new Error('You must be logged in to delete users');
  }

  const idToken = await currentUser.getIdToken();
  const response = await fetch(`/api/admin/users/${uid}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error ?? 'Failed to permanently delete user');
  }
};

export const deleteUserAccount = permanentlyDeleteUser;

export const fetchAdminDashboardData = async () => {
  const [users, animals, lostFoundReports] = await Promise.all([
    getAllUsers(),
    getAnimals(),
    getLostFoundReports(),
  ]);

  return { users, animals, lostFoundReports };
};
