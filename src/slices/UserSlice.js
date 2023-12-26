import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
  name: "User",
  initialState: {
    fullName: "",
    email: "",
    username: "",
    authType: "",
    referalCode: "",
    goals: "",
    personalizePosts: "",
    targetAudience: "",
    metadataAsked: false,
  },
  reducers: {
    setUser: (state, action) => {
      const user = action.payload.user;
      state.fullName = user.fullName;
      state.email = user.email;
      state.username = user.username;
      state.authType = user.authType;
      state.referalCode = user.referalCode;
      state.goals = user.goals;
      state.personalizePosts = user.personalizePosts;
      state.targetAudience = user.targetAudience;
      if (user.targetAudience) {
        state.metadataAsked = true;
      } else state.metadataAsked = false;
      const write = action.payload.write;
      if (write) {
        localStorage.setItem("user", JSON.stringify(user));
      }
    },
    resetUser: (state) => {
      state.fullName = "";
      state.email = "";
      state.username = "";
      state.authType = "";
      state.referalCode = "";
      state.goals = "";
      state.personalizePosts = "";
      state.targetAudience = "";
      localStorage.removeItem("user");
    },
    setMetadata: (state, action) => {
      const metadata = action.payload.metadata;
      state.goals = metadata.goals;
      state.personalizePosts = metadata.personalizePosts;
      state.targetAudience = metadata.targetAudience;
      state.metadataAsked = true;
      localStorage.setItem("user", JSON.stringify(state));
    },
  },
});

export const { setUser, resetUser, setMetadata } = UserSlice.actions;

export default UserSlice.reducer;
