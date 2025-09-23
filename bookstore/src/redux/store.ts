import { configureStore } from "@reduxjs/toolkit";

// import the reducerds from the

import authReducer from "../redux/slice/authSlice";

export const store = configureStore({
  reducer: {
    // adding the slice here
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
