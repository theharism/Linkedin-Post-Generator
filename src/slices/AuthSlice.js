import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
  name: "Auth",
  initialState: {
    authState: null,
  },
  reducers: {
    setAuthState: (state) => {
      state.authState = true;
    },
    resetAuthState: (state) => {
      state.authState = null;
    },
  },
});

export const { setAuthState, resetAuthState } = AuthSlice.actions;

export default AuthSlice.reducer;
