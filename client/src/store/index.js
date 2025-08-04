import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import conversationSlice from "./slices/conversationSlice";

// Create the Redux store with auth and conversation slices
const store = configureStore({
  reducer: { authSlice, conversationSlice },
});

export { store };


