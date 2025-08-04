// src/store/slices/conversationSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { chatServices } from "../../services/api"; 

// Async thunk to fetch all conversations
export const fetchConversations = createAsyncThunk(
  "/chat/conversation-list",  
  async () => {
    try {
      const res = await chatServices.listConversation();
      return res; 
    } catch (error) {
      return Promise.reject(error); 
    }
  }
);

// Async thunk to add a new conversation by participant's email
export const addConversation = createAsyncThunk(
  "/chat/create-conversation", 
  async (participentEmail) => {
    try {
      const res = await chatServices.addConversation(participentEmail);
      return res; 
    } catch (error) {
      return Promise.reject(error); 
    }
  }
);

// Async thunk to fetch messages for a specific conversation
export const fetchMessages = createAsyncThunk(
  "/chat/get-message",  
  async (conversationID) => {
    try {
      const res = await chatServices.getMessages(conversationID);
      return res;
    } catch (error) {
      return Promise.reject(error); 
    }
  }
);

// Async thunk to send a message in a conversation
export const sendMessage = createAsyncThunk(
  "/chat/send",  
  async (data) => {
    try {
      const { content, reciverId, conversationId } = data;
      const res = await chatServices.sendMessage({ content, reciverId, conversationId });
      return res; 
    } catch (error) {
      return Promise.reject(error); 
    }
  }
);

// Slice to manage conversation-related state
const conversationSlice = createSlice({
  name: "conversation", 
  initialState: {
    conversation: [],  
    selectedConversation: null, 
    messages: [], 
    status: "active",  
    error: null, 
  },
  reducers: {
    selectConversation: (state, actions) => {
      state.selectedConversation = actions.payload;
    },
   
    newMessage: (state, actions) => {
      state.messages.push(actions.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle conversation fetching status
      .addCase(fetchConversations.pending, (state) => {
        state.status = "loading"; 
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.status = "succeeded"; 
        state.conversation = action.payload;  
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.status = "failed";  
        state.error = action.error;  
        localStorage.setItem("loggedUser", null);  
        localStorage.setItem("token", null);  
      })
      .addCase(addConversation.fulfilled, (state, action) => {
        state.conversation.unshift(action.payload); 
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = action.payload;  
      });
  },
});

export const { selectConversation, newMessage } = conversationSlice.actions;

export default conversationSlice.reducer;
