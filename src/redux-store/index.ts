import { configureStore } from "@reduxjs/toolkit";
import arrayConfigReducer from "./arrayConfigSlice";
import sortingReducer from "./sortingSlice";

const store = configureStore({
  reducer: {
    config: arrayConfigReducer,
    sorting: sortingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
