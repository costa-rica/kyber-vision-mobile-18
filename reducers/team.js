import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playersArray: [],
  selectedPlayerObject: null,
  teamDetails: null,
  teamsArray: [],
};

export const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    updatePlayersArray: (state, action) => {
      state.playersArray = action.payload;
    },
    updateSelectedPlayerObject: (state, action) => {
      state.selectedPlayerObject = action.payload;
    },
    updateTeamDetails: (state, action) => {
      state.teamDetails = action.payload;
    },
    clearTeamReducer: (state) => {
      state.playersArray = [];
      state.selectedPlayerObject = null;
      state.teamDetails = null;
      console.log("--- cleared all teamReducer state ---");
    },
    updateTeamsArray: (state, action) => {
      state.teamsArray = action.payload;
    },
  },
});

export const {
  updatePlayersArray,
  updateSelectedPlayerObject,
  updateTeamDetails,
  clearTeamReducer,
  updateTeamsArray,
} = teamSlice.actions;

export default teamSlice.reducer;
