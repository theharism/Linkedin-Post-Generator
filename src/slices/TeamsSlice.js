import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

export const getTeams = createAsyncThunk("teams/getTeams", async (payload) => {
  const resp = await fetch(
    `${process.env.REACT_APP_BASE_URL}/api/teams/${payload.email}`
  );

  if (resp.ok) {
    const teams = await resp.json();
    console.log(teams);
    return { teams };
  } else {
    return { teams: [] };
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

export const addMember = createAsyncThunk(
  "teams/addMember",
  async (payload) => {
    try {
      const { id, setTeamId, ...restpayload } = payload;

      const resp = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/teams/${id}/members/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(restpayload),
        }
      );

      if (resp.ok) {
        Swal.fire({
          title: "Members Added Successfully",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        if (typeof setTeamId === "function") {
          setTeamId("");
        }
        const team = await resp.json();
        return Promise.resolve({ team });
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
      console.error("Add member failed:", error);
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

export const removeMember = createAsyncThunk(
  "teams/removeMember",
  async (payload) => {
    try {
      const { id, email, type } = payload;
      //action.payload.type => True for kick, False for leave

      const resp = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/teams/${id}/members/remove`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (resp.ok) {
        Swal.fire({
          title: "Member Removed Successfully",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });

        const team = await resp.json();
        return Promise.resolve({ team, type });
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
      console.error("Remove member failed:", error);
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

export const add_remove_Admins = createAsyncThunk(
  "teams/add_remove_Admins",
  async (payload) => {
    try {
      const { id, email, type } = payload;
      console.log(payload);
      //action.payload.type => 1 for make admin, 2 for remove admin
      const op = type === 2 ? "make-admin" : "remove-admin";
      const resp = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/teams/${id}/members/${op}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (resp.ok) {
        const title = `Admin ${type === 2 ? "Added" : "Removed"} Successfully`;
        Swal.fire({
          title: title,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });

        const team = await resp.json();
        return Promise.resolve({ team });
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
      console.error("Add/Remove Team Admin failed:", error);
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
  initialState: JSON.parse(localStorage.getItem("teams")) || [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTeam.fulfilled, (state, action) => {
        state.push(action.payload.team);
        localStorage.setItem("teams", JSON.stringify(state));
      })
      .addCase(createTeam.rejected, (state, action) => {})
      .addCase(getTeams.fulfilled, (state, action) => {
        const teams = action.payload.teams;
        localStorage.setItem("teams", JSON.stringify(teams));
        return teams;
      })
      .addCase(getTeams.rejected, (state, action) => {})
      .addCase(addMember.fulfilled, (state, action) => {
        const index = state.findIndex(
          (team) => team.team._id === action.payload.team.team._id
        );
        // If found, replace the team with the updated one
        if (index !== -1) {
          state[index] = action.payload.team;
        } else state.push(action.payload.team);

        localStorage.setItem("teams", JSON.stringify(state));
      })
      .addCase(addMember.rejected, (state, action) => {})
      .addCase(removeMember.fulfilled, (state, action) => {
        const index = state.findIndex(
          (team) => team.team._id === action.payload.team.team._id
        );
        // If found, replace the team with the updated one
        if (index !== -1) {
          //action.payload.type => True for kick, False for leave
          if (action.payload.type) {
            state[index] = action.payload.team;
          } else {
            state.splice(index, 1);
          }
        }

        localStorage.setItem("teams", JSON.stringify(state));
      })
      .addCase(removeMember.rejected, (state, action) => {})
      .addCase(add_remove_Admins.fulfilled, (state, action) => {
        const index = state.findIndex(
          (team) => team.team._id === action.payload.team.team._id
        );
        // If found, replace the team with the updated one
        if (index !== -1) {
          //action.payload.type => True for kick, False for leave
          state[index] = action.payload.team;
        } else state.push(action.payload.team);

        localStorage.setItem("teams", JSON.stringify(state));
      })
      .addCase(add_remove_Admins.rejected, (state, action) => {});
  },
});

// export const {} = TeamSlice.actions;

export default TeamsSlice.reducer;
