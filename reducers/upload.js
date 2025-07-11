import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uploadReducerSelectedVideoObject: null,
  uploadReducerLoading: false,
};

export const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    updateUploadReducerSelectedVideoObject: (state, action) => {
      state.uploadReducerSelectedVideoObject = action.payload;
    },
    updateUploadReducerLoading: (state, action) => {
      state.uploadReducerLoading = action.payload;
    },
  },
});

export const {
  updateUploadReducerSelectedVideoObject,
  updateUploadReducerLoading,
} = uploadSlice.actions;

export default uploadSlice.reducer;
