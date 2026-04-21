import {
    collection,
    addDoc,
    serverTimestamp,
    getDocs,
} from "firebase/firestore";
import { db } from "./db";
import { Animal } from "@/utils/types";

//  Add Animal
export const addAnimal = async (
    animal: Omit<Animal, "status" | "createdAt" | "id">
) => {
    const docRef = await addDoc(collection(db, "animals"), {
        ...animal,
        status: "available",
        createdAt: serverTimestamp(),
    });

    return docRef.id;
};

//  Get All Animals
export const getAnimals = async (): Promise<Animal[]> => {
    const snapshot = await getDocs(collection(db, "animals"));
    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as Animal[];
};