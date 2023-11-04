import { createSlice } from "@reduxjs/toolkit";

export const SubscriptionSlice = createSlice({
  name: "Subscription",
  initialState: {
    id: null,
    amount_total: 0,
    customer_details: {},
    createdDate: "",
    expiresDate: "",
    type: "Free",
  },
  reducers: {
    setSubscription: (state, action) => {
      const subscription = action.payload.subscription;
      state.type = subscription.type;
      state.id = subscription.id;
      state.amount_total = subscription.amount_total;
      state.customer_details = subscription.customer_details;
      state.createdDate = subscription.createdDate;
      state.expiresDate = subscription.expiresDate;
      const write = action.payload.write;
      if (write) {
        localStorage.setItem("subscription", JSON.stringify(subscription));
      }
    },
    resetSubscription: (state) => {
      state.type = "Free";
      state.id = null;
      state.amount_total = 0;
      state.customer_details = {};
      state.createdDate = "";
      state.expiresDate = "";
    },
  },
});

export const { setSubscription, resetSubscription } = SubscriptionSlice.actions;

export default SubscriptionSlice.reducer;
