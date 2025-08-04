const cloudinary = require("../helpers/cloudinary");
const generateRandomString = require("../helpers/generateRandomString");
const { sendMail } = require("../helpers/mail");
const { verifyEmailTemplate, resetPassTemplate } = require("../helpers/templates");
const { emailValidator } = require("../helpers/validators");
const userSchema = require("../models/userSchema");
const jwt = require('jsonwebtoken');
const fs = require('fs');

// Registration Controller 
const registration = async (req, res) => { 
  const { fullName, email, password, avatar } = req.body;

  try { 
    if (!fullName) return res.status(400).send({ message: "Name is required!" });
    if (!email) return res.status(400).send({ message: "Email is required!" });
    if (!password) return res.status(400).send({ message: "Password is required!" });
    if (emailValidator(email)) return res.status(400).send({ message: "Email is not valid!" });
     
    const existingUser = await userSchema.findOne({ email });
    if (existingUser) return res.status(400).send({ message: "Email already exists!" });
     
    const randomOtp = Math.floor(Math.random() * 9000);
 
    const user = new userSchema({
      fullName,
      email,
      password,
      avatar,
      otp: randomOtp,
      otpExpiredAt: new Date(Date.now() + 5 * 60 * 1000)  
    });
     
    user.save();
 
    sendMail(email, "Verify your email.", verifyEmailTemplate, randomOtp)
 
    res.status(201).send({ success: "Registration successful! Please verify your email." });
  } catch (error) { 
    res.status(500).send({ message: "Server error!" });
  }
};

// Email Verification Controller 
const verifyEmailAddress = async (req, res) => { 
  const {email, otp} = req.body;

  try { 
    if(!email || !otp) return res.status(400).send({ error: "Invalid request!" });
     
    const verifiedUser = await userSchema.findOne({email, otp, otpExpiredAt: {$gt: Date.now()}})  
    if(!verifiedUser) return res.status(400).send({ error: "Invalid OTP!" });
     
    verifiedUser.otp = null;
    verifiedUser.otpExpiredAt = null;
    verifiedUser.isVarified = true;  
    verifiedUser.save()
     
    res.status(200).send({ success: "Email verified successfully!" });
  } catch (error) { 
    res.status(500).send({ error: "Server error!" });
  }
}

// Login Controller 
const loginController = async (req, res) => { 
  const { email, password } = req.body;
  
  try { 
    if (!email) return res.status(400).send({ error: "Email is required!" });
    if (emailValidator(email)) return res.status(400).send({ error: "Email is not valid!" });
    if (!password) return res.status(400).send({ error: "Password is required!" });
     
    const existingUser = await userSchema.findOne({ email });
    if(!existingUser) return res.status(400).send({ error: "User not found!" });
     
    const passCheck = await existingUser.isPasswordValid(password);
    if (!passCheck) return res.status(400).send({ error: "Incorrect password!" });
     
    if(!existingUser.isVarified) return res.status(400).send({ error: "Email is not verified!" });
 
    const accessToken = jwt.sign({
      data: {
        email: existingUser.email,
        id: existingUser._id
      }
    }, process.env.JWT_SEC, { expiresIn: '24h' });
   
    const loggedUser = {
      email: existingUser.email,
      _id: existingUser._id,
      fullName: existingUser.fullName,
      avatar: existingUser.avatar,
      isVarified: existingUser.isVarified,
      createdAt: existingUser.createdAt,
      updatedAt: existingUser.updatedAt
    }
 
    res.status(200).send({ success: "Login successful!", user: loggedUser, accessToken });
  } catch (error) { 
    res.status(500).send({ error: "Server error!" });
  }
};

// Forgot Password Controller 
const forgatPass = async (req, res) => { 
  const {email} = req.body;

  try { 
    if (!email) return res.status(400).send({ error: "Email is required!" });
     
    const existingUser = await userSchema.findOne({ email });
    if(!existingUser) return res.status(400).send({ error: "User not found!" });
   
    const randomString = generateRandomString(28);
    existingUser.resetPassId = randomString;
    existingUser.resetPassExpiredAt = new Date(Date.now() + 10 * 60 * 1000) // Reset link expires in 10 minutes
    existingUser.save()
 
    sendMail(email, "Reset Password.", resetPassTemplate, randomString)
     
    res.status(201).send({ success: "Check your email for reset instructions!" });
  } catch (error) { 
    res.status(500).send({ error: "Server error!" });
  }
}

// Reset Password Controller 
const resetPass = async (req, res) => {
  try {
 
    const {newPass} =  req.body;
    const randomString = req.params.randomstring;
    const email = req.query.email;
     
    const existingUser = await userSchema.findOne({email, resetPassId: randomString, resetPassExpiredAt: {$gt: Date.now()}})  
    if(!existingUser) return res.status(400).send({ error: "Invalid request!" });
     
    if(!newPass) return res.status(400).send({ error: "New password is required!" });
    
    // Update password and clear reset fields
    existingUser.password = newPass;
    existingUser.resetPassId = null;
    existingUser.resetPassExpiredAt = null;
    existingUser.save()
    
    res.status(200).send({ success: "Password reset successfully!" });
  } catch (error) { 
    res.status(500).send({ error: "Server error!" });
  }
}

// Update Controller 
const update = async (req, res) => {   
  const {fullName, password} = req.body;  
  try { 
    const existingUser = await userSchema.findById(req.user.id)
 
    if(fullName) existingUser.fullName = fullName.trim().split(/\s+/).join(' ');
     
    if(password) existingUser.password = password;
 
    // Handle avatar upload if file is provided
    if(req?.file?.path){ 
      if(existingUser.avatar) await cloudinary.uploader.destroy(`vibez/avatar/${existingUser.avatar.split('/').pop().split('.')[0]}`);
    
      // Upload new avatar to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, { folder: "vibez/avatar" });
      existingUser.avatar = result.url;
      fs.unlinkSync(req.file.path)
    }
    
    existingUser.save()

    res.status(200).send(existingUser)
  } catch (error) {
    res.status(500).send({ error: "Server error!" });
  }
}

// Export all controller functions
module.exports = { registration, verifyEmailAddress, loginController, forgatPass, resetPass, update};