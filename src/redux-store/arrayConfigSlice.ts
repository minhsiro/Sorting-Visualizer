import { createSlice } from "@reduxjs/toolkit";
import SortingAlgos from "../const/sorting";

export const arrayConfigSlice = createSlice({
  name: "arrayConfig",
  initialState: {
    iteration: 20,
    size: 500,
    mode: SortingAlgos.bubble,
  },
  reducers: {
    changeMode: (state, action) => {
      state.mode = action.payload;
    },
    changeSize: (state, action) => {
      state.size = action.payload;
    },
    changeIteration: (state, action) => {
      state.iteration = action.payload;
    },
  },
});

export const { changeMode, changeSize, changeIteration } =
  arrayConfigSlice.actions;

export default arrayConfigSlice.reducer;
