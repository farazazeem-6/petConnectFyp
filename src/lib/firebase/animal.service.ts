import {
    collection,
    addDoc,
    serverTimestamp,
    getDocs,
    getDoc,
    doc,
    query,
    orderBy,
    where,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";
import { db } from "./db";
import { TAnimal, TLostFoundReport } from "@/utils/types";

// ── Helper: normalise a Firestore doc snapshot ───────────────────────────────
function toTimestamp(ts: any): string {
    return ts?.toDate ? ts.toDate().toISOString() : new Date().toISOString();
}

// ── Add Animal ────────────────────────────────────────────────────────────────
export const addAnimal = async (
    animal: Omit<TAnimal, 'status' | 'createdAt' | 'id' | 'imageFile'>
): Promise<string> => {
    const docRef = await addDoc(collection(db, 'animals'), {
        ...animal,
        status: 'available',
        createdAt: serverTimestamp(),
    });
    return docRef.id;
};

// ── Get All Animals ───────────────────────────────────────────────────────────
export const getAnimals = async (): Promise<TAnimal[]> => {
    const snapshot = await getDocs(collection(db, 'animals'));
    return snapshot.docs.map((d) => {
        const data = d.data();
        return { id: d.id, ...data, createdAt: toTimestamp(data.createdAt) } as TAnimal;
    });
};

// ── Get a single Animal by id ─────────────────────────────────────────────────
export const getAnimalById = async (id: string): Promise<TAnimal | null> => {
    const snap = await getDoc(doc(db, 'animals', id));
    if (!snap.exists()) return null;
    const data = snap.data();
    return { id: snap.id, ...data, createdAt: toTimestamp(data.createdAt) } as TAnimal;
};

// ── Get the current user's donation listings ──────────────────────────────────
export const getUserAnimals = async (userId: string): Promise<TAnimal[]> => {
    const q = query(
        collection(db, 'animals'),
        where('userId', '==', userId)
    );
    const snapshot = await getDocs(q);
    const results = snapshot.docs.map((d) => {
        const data = d.data();
        return { id: d.id, ...data, createdAt: toTimestamp(data.createdAt) } as TAnimal;
    });
    // Sort client-side to avoid Firestore composite index requirement
    return results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

// ── Update a donation listing ─────────────────────────────────────────────────
export const updateAnimal = async (
    id: string,
    data: Partial<Omit<TAnimal, 'id' | 'createdAt' | 'imageFile'>>,
): Promise<void> => {
    await updateDoc(doc(db, 'animals', id), { ...data });
};

// ── Delete a donation listing ─────────────────────────────────────────────────
export const deleteAnimal = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, 'animals', id));
};

// ── Add Lost/Found Report ─────────────────────────────────────────────────────
export const addLostFoundReport = async (
    report: Omit<TLostFoundReport, 'status' | 'createdAt' | 'id'>
): Promise<string> => {
    const docRef = await addDoc(collection(db, 'lostFoundReports'), {
        ...report,
        status: 'open',
        createdAt: serverTimestamp(),
    });
    return docRef.id;
};

// ── Get All Lost/Found Reports ────────────────────────────────────────────────
export const getLostFoundReports = async (): Promise<TLostFoundReport[]> => {
    const q = query(collection(db, 'lostFoundReports'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => {
        const data = d.data();
        return { id: d.id, ...data, createdAt: toTimestamp(data.createdAt) } as TLostFoundReport;
    });
};

// ── Get a single Lost/Found report by id ──────────────────────────────────────
export const getLostFoundReportById = async (id: string): Promise<TLostFoundReport | null> => {
    const snap = await getDoc(doc(db, 'lostFoundReports', id));
    if (!snap.exists()) return null;
    const data = snap.data();
    return { id: snap.id, ...data, createdAt: toTimestamp(data.createdAt) } as TLostFoundReport;
};

// ── Get the current user's lost/found reports ─────────────────────────────────
export const getUserLostFoundReports = async (userId: string): Promise<TLostFoundReport[]> => {
    const q = query(
        collection(db, 'lostFoundReports'),
        where('userId', '==', userId)
    );
    const snapshot = await getDocs(q);
    const results = snapshot.docs.map((d) => {
        const data = d.data();
        return { id: d.id, ...data, createdAt: toTimestamp(data.createdAt) } as TLostFoundReport;
    });
    // Sort client-side to avoid Firestore composite index requirement
    return results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

// ── Update a lost/found report ────────────────────────────────────────────────
export const updateLostFoundReport = async (
    id: string,
    data: Partial<Omit<TLostFoundReport, 'id' | 'createdAt'>>,
): Promise<void> => {
    await updateDoc(doc(db, 'lostFoundReports', id), { ...data });
};

// ── Delete a lost/found report ────────────────────────────────────────────────
export const deleteLostFoundReport = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, 'lostFoundReports', id));
};