// src/services/api.js
import axios from "axios";

// Create an instance of axios with predefined settings (base URL and headers)
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1`, 
  headers: {
    "Content-Type": 'application/json', 
  },
});

// Axios middleware
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (err) => {        
    return Promise.reject(err);
  }
);

// Authentication services
export const authServices = {
  registration: async (userData) => {
    const res = await api.post("/auth/registration", userData);
    return res.data;  
  },

  verifyOtp: async (email, otp) => {
    const res = await api.post("/auth/verify-email", { email, otp }); 
    return res.data; 
  },

  // Function for logging in a user
  loginUser: async (userData) => {
    const res = await api.post("/auth/login", userData); 
    if (res.data.accessToken) {
      
      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("loggedUser", JSON.stringify(res.data.user));  
    }
    return res.data;  
  },

  // Function for updating user information (like name, password, avatar)
  updateUser: async (fullName, password, avatar) => {
    const res = await api.post("/auth/update", { fullName, password, avatar }, {
      headers: {
        "Content-Type": "multipart/form-data", 
      },
    });
    return res.data;  
  },
};

// Chat services - Functions related to managing conversations and messages
export const chatServices = {
  listConversation: async () => {
    const res = await api.get("/chat/conversation-list"); 
    return res.data;  
  },

  // Function to add a new conversation with a specific participant (by email)
  addConversation: async (participentEmail) => {
    const res = await api.post("/chat/create-conversation", {
      participentEmail, 
    });
    return res.data; 
  },

  // Function to get messages of a particular conversation by its ID
  getMessages: async (conversationID) => {
    const res = await api.get(`/chat/get-message/${conversationID}`); 
    return res.data; 
  },

  // Function to send a new message in a conversation
  sendMessage: async (data) => {
    const { content, reciverId, conversationId } = data;
    const res = await api.post("/chat/send", {
      reciverId, content, conversationId,  
    });
    return res.data; 
  },
};
