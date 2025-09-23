import { configureStore } from "@reduxjs/toolkit";

// import the reducerds from the

export const store = configureStore({
  reducer: {
    // adding the slice here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
