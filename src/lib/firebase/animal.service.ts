import {
    collection,
    addDoc,
    serverTimestamp,
    getDocs,
} from "firebase/firestore";
import { db } from "./db";
import { TAnimal } from "@/utils/types";

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