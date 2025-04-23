import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = "https://anvaya-backend-zeta.vercel.app";

export const loginUser = createAsyncThunk(
    "login/loginUser",
    async (userData) => {
      const response = await axios.post(`${BASE_URL}/login`, userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("users", JSON.stringify(user));
  
      return { token, user };
    }
  );
  
  export const registerUser = createAsyncThunk(
    "register/registerUser",
    async (userData) => {
      const response = await axios.post(`${BASE_URL}/signup`, userData);
      return response.data.user;
    }
  );
  
  export const authSlice = createSlice({
    name: "auth",
    initialState: {
      user: [],
      loading: false,
      error: null,
    },
    reducers: {
      logout: (state) => {
        state.user = null;
        state.token = null;
        localStorage.removeItem("token");
        localStorage.removeItem("users");
      },
    },
    extraReducers: (builder) => {
      builder.addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      });
      builder.addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
      });
      builder.addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
      builder.addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
      });
    },
  });
  
  export const { logout } = authSlice.actions;
  
  export default authSlice.reducer;