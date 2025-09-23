import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  Login as loginService,
  Sign as signService,
} from "../../service/userService";

interface AuthState {
  user?: any | null;
  token?: string | null;
  loading?: boolean;
  error?: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};
export const loginUser = createAsyncThunk(
  "auth/loginuser",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await loginService(email, password);
      console.log(res);
      if (res?.data?.success) {
        localStorage.setItem("token", res?.data?.result?.accessToken);
      }
      return res?.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const signUser = createAsyncThunk(
  "auth/signuser",
  async (
    {
      fullName,
      email,
      password,
      phone,
    }: { fullName: string; email: string; password: string; phone: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await signService(fullName, email, password, phone);
      console.log(res);
      return res?.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "signup failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      (state.loading = true), (state.error = null);
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload?.result?.accessToken || null;
      //   state.user = action.payload.user || null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(signUser.pending, (state) => {
      (state.loading = true), (state.error = null);
    });
    builder.addCase(signUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.result;
    });
    builder.addCase(signUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
