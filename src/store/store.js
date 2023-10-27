import AuthSlice from "../slices/AuthSlice";
import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "../slices/UserSlice";

export default configureStore({
  reducer: {
    Auth: AuthSlice,
    User: UserSlice,
  },
});
