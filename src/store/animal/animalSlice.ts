import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TAnimal } from "@/utils/types";

interface AnimalState {
    list: TAnimal[];
    loading: boolean;
    error: string | null;
}

const initialState: AnimalState = {
    list: [],
    loading: false,
    error: null,
};

const animalSlice = createSlice({
    name: "animal",
    initialState,
    reducers: {
        setAnimals: (state, action: PayloadAction<TAnimal[]>) => {
            state.list = action.payload;
            state.loading = false;
        },

        addAnimalToState: (state, action: PayloadAction<TAnimal>) => {
            state.list.push(action.payload);
        },

        setLoading: (state) => {
            state.loading = true;
        },

        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const { setAnimals, addAnimalToState, setLoading, setError } =
    animalSlice.actions;

export default animalSlice.reducer;