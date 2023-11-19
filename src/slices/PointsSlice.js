import { createSlice } from "@reduxjs/toolkit";

export const PointsSlice = createSlice({
  name: "Points",
  initialState: {
    points: 1,
  },
  reducers: {
    setPoints: (state, action) => {
      state.points = action.payload.points;
      localStorage.setItem("points", state.points);
    },
    resetPoints: (state) => {
      state.points = 1;
      localStorage.setItem("points", state.points);
    },
    addPoints: (state, action) => {
      state.points += action.payload.points;
      localStorage.setItem("points", state.points);
    },
    deletePoint: (state) => {
      state.points -= 1;
      localStorage.setItem("points", state.points);
    },
  },
});

export const { setPoints, resetPoints, addPoints, deletePoint } =
  PointsSlice.actions;

export default PointsSlice.reducer;
