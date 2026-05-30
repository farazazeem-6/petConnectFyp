import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from './db';
import {
  MAX_REGISTRATIONS_PER_USER,
  type TRegisteredAnimal,
} from '@/utils/types';

function toTimestamp(ts: unknown): string {
  const value = ts as { toDate?: () => Date } | undefined;
  return value?.toDate ? value.toDate().toISOString() : new Date().toISOString();
}

function mapDoc(d: { id: string; data: () => Record<string, unknown> }): TRegisteredAnimal {
  const data = d.data();
  return {
    id: d.id,
    ...data,
    createdAt: data.createdAt ? toTimestamp(data.createdAt) : undefined,
    updatedAt: data.updatedAt ? toTimestamp(data.updatedAt) : undefined,
  } as TRegisteredAnimal;
}

export const getUserRegistrations = async (
  userId: string,
): Promise<TRegisteredAnimal[]> => {
  const q = query(
    collection(db, 'registeredAnimals'),
    where('userId', '==', userId),
  );
  const snapshot = await getDocs(q);
  const results = snapshot.docs.map((d) => mapDoc(d));

  return results.sort(
    (a, b) =>
      new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime(),
  );
};

export const getRegistrationById = async (
  id: string,
): Promise<TRegisteredAnimal | null> => {
  const snap = await getDoc(doc(db, 'registeredAnimals', id));
  if (!snap.exists()) return null;
  return mapDoc(snap);
};

export const getRegistrationByRegistrationId = async (
  registrationId: string,
): Promise<TRegisteredAnimal | null> => {
  const q = query(
    collection(db, 'registeredAnimals'),
    where('registrationId', '==', registrationId),
  );
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  return mapDoc(snapshot.docs[0]);
};

export const addRegisteredAnimal = async (
  data: Omit<
    TRegisteredAnimal,
    'id' | 'registrationId' | 'status' | 'createdAt' | 'updatedAt'
  >,
): Promise<{ id: string; registrationId: string }> => {
  const existing = await getUserRegistrations(data.userId);

  if (existing.length >= MAX_REGISTRATIONS_PER_USER) {
    throw new Error(
      `You can register a maximum of ${MAX_REGISTRATIONS_PER_USER} animals per account.`,
    );
  }

  const docRef = await addDoc(collection(db, 'registeredAnimals'), {
    ...data,
    status: 'active',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  const registrationId = `REG-${docRef.id.slice(0, 8).toUpperCase()}`;
  await updateDoc(docRef, { registrationId });

  return { id: docRef.id, registrationId };
};

export const updateRegisteredAnimal = async (
  id: string,
  data: Partial<
    Omit<TRegisteredAnimal, 'id' | 'userId' | 'registrationId' | 'createdAt'>
  >,
): Promise<void> => {
  await updateDoc(doc(db, 'registeredAnimals', id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
};

export const deleteRegisteredAnimal = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, 'registeredAnimals', id));
};

export const getUserRegistrationCount = async (userId: string): Promise<number> => {
  const registrations = await getUserRegistrations(userId);
  return registrations.length;
};

export const getAllRegisteredAnimals = async (): Promise<TRegisteredAnimal[]> => {
  const snapshot = await getDocs(collection(db, 'registeredAnimals'));
  const results = snapshot.docs.map((d) => mapDoc(d));
  return results.sort(
    (a, b) =>
      new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime(),
  );
};
