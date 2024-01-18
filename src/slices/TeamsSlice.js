import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

export const getTeams = createAsyncThunk("teams/getTeams", async (payload) => {
  const resp = await fetch(
    `${process.env.REACT_APP_BASE_URL}/api/teams/${payload.username}`
  );

  if (resp.ok) {
    const teams = await resp.json();
    return { teams };
  }
});

export const createTeam = createAsyncThunk(
  "teams/createTeam",
  async (payload) => {
    try {
      const resp = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/teams/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (resp.ok) {
        Swal.fire({
          title: "Team Created Successfully",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });

        const team = await resp.json();
        return Promise.resolve({ team });
      } else {
        if (resp.status === 404) {
          Swal.fire({
            title: "User not found",
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
          });
          return Promise.reject();
        } else {
          Swal.fire({
            title: "Internal Server Error",
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
          });
          return Promise.reject();
        }
      }
    } catch (error) {
      console.error("Create Team failed:", error);
      Swal.fire({
        title: "Internal Server Error",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
      return Promise.reject("Internal Server Error");
    }
  }
);

export const TeamsSlice = createSlice({
  name: "Teams",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTeams.fulfilled, (state, action) => {
        return action.payload.teams;
      })
      .addCase(createTeam.fulfilled, (state, action) => {
        state.push(action.payload.team);
      })
      .addCase(createTeam.rejected, (state, action) => {});
  },
});

// export const {} = TeamSlice.actions;

export default TeamsSlice.reducer;
