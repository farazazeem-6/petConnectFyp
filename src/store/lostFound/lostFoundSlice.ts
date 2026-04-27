import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TLostFoundReport } from '@/utils/types';

interface LostFoundState {
    list: TLostFoundReport[];
    loading: boolean;
    error: string | null;
}

const initialState: LostFoundState = {
    list: [],
    loading: false,
    error: null,
};

const lostFoundSlice = createSlice({
    name: 'lostFound',
    initialState,
    reducers: {
        setReports: (state, action: PayloadAction<TLostFoundReport[]>) => {
            state.list = action.payload;
            state.loading = false;
        },
        addReportToState: (state, action: PayloadAction<TLostFoundReport>) => {
            state.list.unshift(action.payload);
        },
        setLFLoading: (state) => {
            state.loading = true;
        },
        setLFError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const { setReports, addReportToState, setLFLoading, setLFError } =
    lostFoundSlice.actions;

export default lostFoundSlice.reducer;
