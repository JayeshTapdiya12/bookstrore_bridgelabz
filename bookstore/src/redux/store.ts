import { configureStore } from "@reduxjs/toolkit";

// import the reducerds from the
import searchReducer from "./slice/SearchSlice";

export const store = configureStore({
  reducer: {
    // adding the slice here
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
