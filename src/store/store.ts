import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from './auth/authSlice';
import animalReducer from './animal/animalSlice';
import lostFoundReducer from './lostFound/lostFoundSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    animal: animalReducer,
    lostFound: lostFoundReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
