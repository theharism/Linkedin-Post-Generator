import AuthSlice from "../slices/AuthSlice";
import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "../slices/UserSlice";
import SubscriptionSlice from "../slices/SubscriptionSlice";
import PointsSlice from "../slices/PointsSlice";
import TeamsSlice from "../slices/TeamsSlice";

export default configureStore({
  reducer: {
    Auth: AuthSlice,
    User: UserSlice,
    Subscription: SubscriptionSlice,
    Points: PointsSlice,
    Teams: TeamsSlice,
  },
});
