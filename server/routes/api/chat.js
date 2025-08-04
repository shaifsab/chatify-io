// Importing required modules 
const express = require("express");
const {
  createConversation,   // Controller for creating a new conversation
  conversationList,     // Controller for fetching a list of conversations
} = require("../../controller/conversationController");

const authMiddleware = require("../../middleware/authMiddleware"); 

const {
  sendMessage,          // Controller for sending a message
  getMessages,          // Controller for retrieving messages in a conversation
} = require("../../controller/messageController");

// Express router
const router = express.Router();

// POST route 
router.post("/create-conversation", authMiddleware, createConversation);
router.get("/conversation-list", authMiddleware, conversationList);
router.post("/send", authMiddleware, sendMessage);
router.get("/get-message/:conversationid", authMiddleware, getMessages);

// Exporting the router
module.exports = router;
