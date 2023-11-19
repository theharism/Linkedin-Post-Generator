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
      const write = action.payload.write;
      if (write) {
        localStorage.setItem("subscription", JSON.stringify(subscription));
      }
    },
    resetSubscription: (state, action) => {
      state.type = "Free";
      if (action.payload.completed) {
        state.id = null;
        state.createdDate = "";
        state.expiresDate = "";
      }
      localStorage.setItem("subscription", JSON.stringify(state));
    },
  },
});

export const { setSubscription, resetSubscription } = SubscriptionSlice.actions;

export default SubscriptionSlice.reducer;
