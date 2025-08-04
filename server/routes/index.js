// Importing required modules
const express = require('express');
const apiRoute = require("./api"); 
const router = express.Router();

// All routes 
router.use("/api/v1", apiRoute);
router.get("/", (req, res) => {
    res.send("Welcome to the Server.");
});

// Handling 404 errors 
router.use((req, res) => {
    res.status(404).send("Page not found!");
});

// Exporting the router 
module.exports = router;
