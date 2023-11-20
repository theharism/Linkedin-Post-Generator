import { createSlice } from "@reduxjs/toolkit";

export const PointsSlice = createSlice({
  name: "Points",
  initialState: {
    points: 1,
  },
  reducers: {
    setPoints: (state, action) => {
      state.points = action.payload.points;
    },
    resetPoints: (state) => {
      state.points = 1;
    },
    addPoints: (state, action) => {
      state.points += action.payload.points;
    },
    deletePoint: (state) => {
      state.points -= 1;
    },
  },
});

export const { setPoints, resetPoints, addPoints, deletePoint } =
  PointsSlice.actions;

export default PointsSlice.reducer;
