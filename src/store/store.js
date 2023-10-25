import AuthSlice from "../slices/AuthSlice";
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: {
    Auth: AuthSlice,
  },
});
