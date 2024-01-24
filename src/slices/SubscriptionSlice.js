import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

export const getSubscription = createAsyncThunk(
  "subscription/get",
  async (payload) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/subscription/${payload.email}`
      );

      if (response.ok) {
        const subscription = await response.json();
        return Promise.resolve({ subscription });
      } else {
        Swal.fire({
          title: "Internal Server Error",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
        return Promise.reject();
      }
    } catch (error) {
      Swal.fire({
        title: "Internal Server Error",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
      return Promise.reject();
    }
  }
);

export const SubscriptionSlice = createSlice({
  name: "Subscription",
  initialState: {},
  reducers: {
    setSubscription: (state, action) => {
      return action.payload.subscription;
    },
    resetSubscription: (state, action) => {
      return action.payload.subscription;
    },
    setPoints: (state, action) => {
      state.points = action.payload.points;
    },
    deletePoint: (state) => {
      state.points -= 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSubscription.fulfilled, (state, action) => {
        return action.payload.subscription;
      })
      .addCase(getSubscription.rejected, (state, action) => {});
  },
});

export const { setSubscription, resetSubscription, setPoints, deletePoint } =
  SubscriptionSlice.actions;

export default SubscriptionSlice.reducer;
