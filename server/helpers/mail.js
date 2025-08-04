const nodemailer = require("nodemailer");

// Function to send email
const sendMail = async (email, subject, template, random) => {
  try {
    // Create a transporter using Gmail SMTP server
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",  
      secure: true,           
      auth: {
        user: process.env.EMAIL_USERNAME,  
        pass: process.env.EMAIL_PASS,      
      },
    });

    // Send the email using the transporter
    await transporter.sendMail({
      from: '"no reply" <noreply@chatweb.com>', 
      to: email,                               
      subject: subject,                         
      html: template(random, email),           
    }); 

  } catch (error) { 
    throw new Error("Failed to send email");   
  }
}

module.exports = { sendMail };
