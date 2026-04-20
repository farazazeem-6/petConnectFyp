import { AppDispatch } from "../index";
import {
    setAnimals,
    setLoading,
    setError,
    addAnimalToState,
} from "./animalSlice";

import { addAnimal, getAnimals } from "@/lib/firebase";

//  Fetch all animals
export const fetchAnimals = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(setLoading());
        const data = await getAnimals();
        dispatch(setAnimals(data));
    } catch (err: any) {
        dispatch(setError(err.message));
    }
};

//  Add animal
export const createAnimal = (animal: any) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setLoading());
        const id = await addAnimal(animal);
        dispatch(
            addAnimalToState({
                id,
                ...animal,
            })
        );
    } catch (err: any) {
        dispatch(setError(err.message));
    }
};