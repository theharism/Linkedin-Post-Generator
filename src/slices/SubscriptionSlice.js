import { createSlice } from "@reduxjs/toolkit";

export const SubscriptionSlice = createSlice({
  name: "Subscription",
  initialState: {
    id: null,
    createdDate: "",
    expiresDate: "",
    type: "Free",
  },
  reducers: {
    setSubscription: (state, action) => {
      const subscription = action.payload.subscription;
      state.type = subscription.type;
      state.id = subscription.id;
      state.createdDate = subscription.createdDate;
      state.expiresDate = subscription.expiresDate;
    },
    resetSubscription: (state, action) => {
      state.type = "Free";
      state.id = null;
      state.createdDate = "";
      state.expiresDate = "";
    },
  },
});

export const { setSubscription, resetSubscription } = SubscriptionSlice.actions;

export default SubscriptionSlice.reducer;
