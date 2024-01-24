import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
  name: "Auth",
  initialState: {
    authState: null,
    // currentUsername: JSON.parse(localStorage.getItem("user"))?.username || "",
    // currentUserId: JSON.parse(localStorage.getItem("user"))?.email || "",
    currentUsername: null,
    currentUserId: null,
  },
  reducers: {
    setAuthState: (state) => {
      state.authState = true;
    },
    resetAuthState: (state) => {
      state.authState = null;
    },
    setCurrentUser: (state, action) => {
      state.currentUsername = action.payload.name;
      state.currentUserId = action.payload.id;
    },
  },
});

export const { setAuthState, resetAuthState, setCurrentUser } =
  AuthSlice.actions;

export default AuthSlice.reducer;
