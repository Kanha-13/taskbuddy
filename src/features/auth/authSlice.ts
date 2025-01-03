import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../../firebaseConfig";

export const loginWithGoogle = createAsyncThunk("auth/login", async () => {
  const result = await signInWithPopup(auth, provider);
  return result.user;
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await signOut(auth);
});

interface AuthState {
  user: any;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: AuthState = {
  user: null,
  status: "idle",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;
