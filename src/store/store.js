import AuthSlice from "../slices/AuthSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import UserSlice from "../slices/UserSlice";
import SubscriptionSlice from "../slices/SubscriptionSlice";
import TeamsSlice from "../slices/TeamsSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  Auth: AuthSlice,
  User: UserSlice,
  Subscription: SubscriptionSlice,
  Teams: TeamsSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export const persistor = persistStore(store);
