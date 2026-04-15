import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TAuthUser = {
  uid: string;
  email: string | null;
  name: string | null;
  photo: string | null;
} | null;

interface AuthState {
  user: TAuthUser;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: true,   // true on boot so auth listener can hydrate before render
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = null;   // clear previous error on new attempt
    },
    setUser: (state, action: PayloadAction<TAuthUser>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setLoading, setUser, setError, logout } = authSlice.actions;
export default authSlice.reducer;