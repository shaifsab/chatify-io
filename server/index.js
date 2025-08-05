// Importing required modules
const express     = require("express");
const dbConfig    = require("./dbConfig/db");       
const router      = require("./routes");           
const http        = require('http');                
const { Server }  = require("socket.io");            
const cors        = require("cors");                
const app         = express();                       

// .env file
require("dotenv").config();   

// Middleware  
app.use(express.json());

// CORS configuration 
app.use(cors({
    origin: '*'   
}));

// Create HTTP server and Socket.io instance
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: "https://chatify-io-l6q4.onrender.com" 
});

// Make Socket.io available globally
global.io = io;

// Active users tracking using a Map  
const activeUsers = new Map();

// Handle Socket.io connections
io.on("connection", socket => { 
    socket.on("join_room", (convoId) => {
        socket.join(convoId);  
    });

    
    socket.on("join_user", (userId) => {
        activeUsers.set(socket.id, userId);  
        io.emit("active_users", Array.from(activeUsers.values())); 
    });

    // Handle disconnection event
    socket.on("disconnect", () => {
        activeUsers.delete(socket.id);   
        setTimeout(() => {
            io.emit("active_users", Array.from(activeUsers.values()));   
        }, 5000);  
    });
});

// Database connection setup
dbConfig();   

// Use the routes module for handling requests
app.use(router);  

// Start the HTTP server on port 8000
httpServer.listen(8000, () => {
    console.log("Server is running on port 8000");  
});
