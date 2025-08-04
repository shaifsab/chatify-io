// Importing required modules
const express = require('express');
const router = express.Router();
const authRoute = require("./auth"); 
const chat = require("./chat");       

// Using sub-routes in the main router
router.use("/auth", authRoute);  
router.use("/chat", chat);      

// Exporting the main router 
module.exports = router;
