// verifyEmailTemplate: Template for verifying email with an OTP
const verifyEmailTemplate = (otp) => {
  return `
    <!-- Main container for email with dark background -->
    <div style="font-family: Arial, sans-serif; color: #e0e0e0; background-color: #121212; margin: 0; padding: 0;">
      
      <!-- Centered email content with dark theme and padding -->
      <div style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #1A1A1A; padding: 30px; border-radius: 10px; box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5); text-align: center;">
        
        <!-- Header section with title and description -->
        <div style="margin-bottom: 30px;">
          <h1 style="color: #1E90FF;">Welcome to ChatWeb</h1>
          <p style="color: #A9A9A9; font-size: 16px;">Please verify your email address to complete your registration.</p>
        </div>
        
        <!-- Main content with OTP display and instruction -->
        <div>
          <p style="color: #A9A9A9; font-size: 16px;">Thank you for signing up! To complete the registration process, please verify your email address:</p>
          <p>
            <span style="background-color: #1E90FF; color: white; padding: 15px 30px; text-align: center; text-decoration: none; border-radius: 5px; font-size: 16px; display: inline-block;">${otp}</span>
          </p>
          <p style="color: #A9A9A9; font-size: 14px;">If you did not sign up for an account, please ignore this email.</p>
        </div>
        
        <!-- Footer section with support and team details -->
        <div style="margin-top: 30px; font-size: 14px; color: #777777;">
          <p style="color: #A9A9A9;">If you have any questions, feel free to contact our support team.</p>
          <p style="color: #A9A9A9;">Best regards, <br> The ChatWeb Team</p>
        </div>
      </div>
    </div>
  `;
}

// resetPassTemplate: Template for resetting password with a unique reset link
const resetPassTemplate = (randomString, email) => {
  return `
    <!-- Main container for password reset email -->
    <div style="font-family: Arial, sans-serif; background-color: #121212; margin: 0; padding: 0;">
      
      <!-- Centered email content with dark theme -->
      <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; background-color: #121212; padding: 30px 0;">
        <tr>
          <td align="center">
            <!-- Email body with styling and box shadow -->
            <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 600px; background-color: #1E1E1E; padding: 30px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);">
              
              <!-- Header section for password reset request -->
              <tr>
                <td style="text-align: center; padding-bottom: 30px;">
                  <h2 style="color: #1E90FF; font-size: 24px;">Forgot Your Password?</h2>
                </td>
              </tr>
              
              <!-- Main content with instruction to reset password -->
              <tr>
                <td style="padding-bottom: 20px; color: #A9A9A9; font-size: 16px; line-height: 1.5;">
                  <p style="color: #A9A9A9;">Hello,</p>
                  <p style="color: #A9A9A9;">We received a request to reset the password for your account. If you didn't request this change, please ignore this email.</p>
                  <p style="color: #A9A9A9;">To reset your password, click the button below:</p>
                </td>
              </tr>
              
              <!-- Button for resetting the password -->
              <tr>
                <td align="center" style="padding-bottom: 20px;">
                  <a href="${process.env.BASE_URL}/api/v1/auth/resetpassword/${randomString}?email=${email}" style="background-color: #1E90FF; color: white; padding: 14px 28px; text-decoration: none; border-radius: 5px; font-size: 16px; display: inline-block;">Reset Your Password</a>
                </td>
              </tr>
              
              <!-- Footer with expiration notice for the reset link -->
              <tr>
                <td style="color: #777777; font-size: 14px; text-align: center;">
                  <p style="color: #A9A9A9;">This link will expire in 10 min for security reasons.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  `;
}

module.exports = { verifyEmailTemplate, resetPassTemplate };
