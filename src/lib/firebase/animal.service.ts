import {
    collection,
    addDoc,
    serverTimestamp,
    getDocs,
    query,
    orderBy,
} from "firebase/firestore";
import { db } from "./db";
import { TAnimal, TLostFoundReport } from "@/utils/types";

//  Add Animal
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

//  Get All Animals
export const getAnimals = async (): Promise<TAnimal[]> => {
    const snapshot = await getDocs(collection(db, "animals"));
    return snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            // Convert Firestore Timestamp to a plain serializable ISO string
            createdAt: data.createdAt?.toDate
                ? data.createdAt.toDate().toISOString()
                : new Date().toISOString(),
        };
    }) as TAnimal[];
};

// ──  Add Lost/Found Report
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

// ──  Get All Lost/Found Reports
export const getLostFoundReports = async (): Promise<TLostFoundReport[]> => {
    const q = query(collection(db, 'lostFoundReports'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate
                ? data.createdAt.toDate().toISOString()
                : new Date().toISOString(),
        };
    }) as TLostFoundReport[];
};