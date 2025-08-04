// Importing required modules and controllers
const express = require("express");
const {
  registration,        
  loginController,    
  verifyEmailAddress,  
  forgatPass,          
  resetPass,           
  update,               
} = require("../../controller/authController");

const upload = require("../../helpers/multer");    
const authMiddleware = require("../../middleware/authMiddleware");

// Express router
const router = express.Router();

// POST route 
router.post("/registration", registration);
router.post("/verify-email", verifyEmailAddress);
router.post("/login", loginController);
router.post("/forgat-pass", forgatPass);
// Example: http://localhost:8000/resetpassword/imI7SXJ1DOvV1QeV9oBpVUqX83Y3?email=elias.cit.bd@gmail.com
router.post("/reset-password/:randomstring", resetPass);
router.post("/update", authMiddleware, upload.single('avatar'), update);

// Exporting the router 
module.exports = router;
