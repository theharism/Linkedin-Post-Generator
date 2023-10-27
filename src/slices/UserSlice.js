import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
  name: "User",
  initialState: {
    fullName: "",
    email: "",
    username: "",
    authType: "",
    referalCode: "",
  },
  reducers: {
    setUser: (state, action) => {
      console.log("AAAAAAAAAAAAA", action);
      const user = action.payload.user;
      state.fullName = user.fullName;
      state.email = user.email;
      state.username = user.username;
      state.authType = user.authType;
      state.referalCode = user.referalCode;
    },
    resetUser: (state) => {
      state.fullName = "";
      state.email = "";
      state.username = "";
      state.authType = "";
      state.referalCode = "";
    },
  },
});

export const { setUser, resetUser } = UserSlice.actions;

export default UserSlice.reducer;
