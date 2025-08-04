// src/services/socket.js

import io from 'socket.io-client';
import { store } from '../store';  
import { newMessage } from '../store/slices/conversationSlice';  

let socket; 

const initSocket = () => {
  socket = io.connect(import.meta.env.VITE_API_BASE_URL);

  // Listen for 'new_message' event from the server and dispatch the newMessage action to Redux
  socket.on("new_message", (message) => {
    store.dispatch(newMessage(message));  
  });

  // Emit 'join_user' event to the server with the user's ID
  socket.emit("join_user", store.getState().authSlice.user._id); 
};

export { initSocket, socket };