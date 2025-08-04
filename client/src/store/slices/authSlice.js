// src/store/slices/authSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authServices } from "../../services/api";

export const updateUserThunk = createAsyncThunk(
  "/auth/update", 
  async (userData) => {
    const { fullName, password, avatar } = userData;
    try {
      
      const res = await authServices.updateUser(fullName, password, avatar);
      return res;  
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: "auth", 
  initialState: {
    user: JSON.parse(localStorage.getItem("loggedUser")) || null,
  },
  reducers: {
    loggedUser: (state, actions) => {
      state.user = actions.payload;
    },
    logOutUser: (state) => {
      console.log(state.value);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserThunk.fulfilled, (state, actions) => {
        state.user = actions.payload;
        localStorage.setItem("loggedUser", JSON.stringify(actions.payload));
      });
  },
});

export const { loggedUser, logOutUser } = authSlice.actions;

export default authSlice.reducer;
