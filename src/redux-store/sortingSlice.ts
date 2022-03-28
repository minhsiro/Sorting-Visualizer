import { createSlice } from "@reduxjs/toolkit";

export const sortingSlice = createSlice({
  name: "sortingSlice",
  initialState: {
    isSorting: false,
  },
  reducers: {
    toggleIsSorting(state) {
      state.isSorting = !state.isSorting;
    },
  },
});

export const { toggleIsSorting } = sortingSlice.actions;
export default sortingSlice.reducer;
