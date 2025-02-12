const nodemailer = require("nodemailer");
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
    },
});

async function welcomeEmail(email) {
    try {
        const info = await transporter.sendMail({
            from: process.env.NODEMAILER_EMAIL,
            to: email,
            subject: "Welcome to GymLink - Your Ultimate Gym Discovery Platform! 🏋️‍♂️",
            text: `Welcome to GymLink! Your gateway to discovering perfect gyms and connecting with expert trainers.`,
            html: `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to GymLink!</title>
  </head>
  <body style="font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(to right, #2193b0, #6dd5ed); padding: 20px; text-align: center; border-radius: 5px 5px 0 0;">
      <h1 style="color: white; margin: 0; text-transform: uppercase; letter-spacing: 2px;">Welcome to GymLink!</h1>
    </div>
    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
      <p style="font-size: 18px; font-weight: bold;">Hello Fitness Explorer! 🎯</p>
      <p>Welcome to the platform that's revolutionizing how you discover and connect with gyms across the states!</p>
      <div style="background-color: #f2f2f2; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p style="font-weight: bold;">Here's what you can do with GymLink:</p>
        <p style="margin: 5px 0;">🔍 Browse gyms across multiple states with easy navigation</p>
        <p style="margin: 5px 0;">🤖 Get AI-powered gym recommendations based on your preferences</p>
        <p style="margin: 5px 0;">👥 Connect with certified trainers that match your goals</p>
        <p style="margin: 5px 0;">📍 Find the perfect gym location that fits your lifestyle</p>
      </div>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${process.env.CLIENT_URL}" style="background: linear-gradient(to right, #2193b0, #6dd5ed); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Explore Gyms Now</a>
      </div>
      <p style="font-weight: bold;">For Gym Owners:</p>
      <ul style="list-style-type: none; padding-left: 0;">
        <li>✨ List your facility</li>
        <li>👥 Find qualified trainers</li>
        <li>📊 Access detailed analytics</li>
        <li>🎯 Reach targeted fitness enthusiasts</li>
      </ul>
      <p>Ready to transform your fitness journey?<br>Your GymLink Team 🏋️‍♂️</p>
    </div>
    <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
      <p>This is an automated message. For support, please contact our team directly.</p>
    </div>
  </body>
  </html>`
        });
        return info;
    } catch (error) {
        console.error("Error sending email: ", error);
    }
}

async function sendVerificationEmail(email, token) {
    try {
        const info = await transporter.sendMail({
            from: process.env.NODEMAILER_EMAIL,
            to: email,
            subject: "Reset Your GymLink Password 🔐",
            text: `Reset your GymLink password to continue exploring gyms and connecting with trainers. Token: ${token}`,
            html: `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your GymLink Password</title>
      </head>
      <body style="font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(to right, #2193b0, #6dd5ed); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0; text-transform: uppercase; letter-spacing: 2px;">Password Reset Request</h1>
        </div>
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
          <p style="font-size: 18px; font-weight: bold;">Hello! 👋</p>
          <p>We received a request to reset your GymLink password. Click below to set up a new password:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.CLIENT_URL}/api/reset-password/${token}" 
               style="background: linear-gradient(to right, #2193b0, #6dd5ed); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">
               Reset Password
            </a>
          </div>
          <p style="color: #2193b0; font-weight: bold;">⚡ This link expires in 1 hour for security</p>
          <p>Looking forward to helping you discover more great gyms!<br>The GymLink Team 🔍</p>
        </div>
        <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
          <p>If you didn't request this reset, please ignore this email or contact support.</p>
        </div>
      </body>
      </html>`
        });
        return info;
    } catch (error) {
        console.error("Error sending email: ", error);
    }
}
async function sendResetEmailSuccessful(email) {
    try {
      const info = await transporter.sendMail({
        from: process.env.NODEMAILER_EMAIL,
        to: email,
        subject: "Password Reset Successful - Your GymLink Account is Secure! 🔒",
        text: `Your GymLink password has been successfully reset. You can now continue exploring gyms and connecting with trainers.`,
        html: `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Successful</title>
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(to right, #2193b0, #6dd5ed); padding: 20px; text-align: center;">
      <h1 style="color: white; margin: 0;">Password Reset Successful! 🔒</h1>
    </div>
    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
      <p>Hello,</p>
      <p>Your password has been successfully reset. Your account is now secure! 🛡️</p>
      <div style="text-align: center; margin: 30px 0;">
        <div style="background-color: #2193b0; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
          ✓
        </div>
      </div>
      <p>You can now:</p>
      <ul style="list-style-type: none; padding-left: 0;">
        <li>🔍 Continue exploring gyms in your area</li>
        <li>👥 Connect with certified trainers</li>
        <li>🤖 Get AI-powered gym recommendations</li>
        <li>📍 Save your favorite locations</li>
      </ul>
      <div style="background-color: #f2f2f2; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p style="margin: 5px 0; font-weight: bold;">Security Tips:</p>
        <ul style="margin: 5px 0;">
          <li>Use a unique password for your GymLink account</li>
          <li>Enable two-factor authentication if available</li>
          <li>Never share your login credentials</li>
        </ul>
      </div>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${process.env.CLIENT_URL}/login" 
           style="background: linear-gradient(to right, #2193b0, #6dd5ed); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">
           Login Now
        </a>
      </div>
      <p>If you didn't request this password reset, please contact our support team immediately.</p>
      <p>Stay fit and secure!<br>The GymLink Team 🏋️‍♂️</p>
    </div>
    <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
      <p>This is an automated message. Please do not reply to this email.</p>
    </div>
  </body>
  </html>`
      });
  
      console.log("Password reset success email sent successfully");
  
    } catch (error) {
      console.error("Error sending password reset success email:", error);
    }
  }
  async function sendGymCreationSuccessful(email, gymName) {
    try {
      const info = await transporter.sendMail({
        from: process.env.NODEMAILER_EMAIL,
        to: email,
        subject: `🎉 Your Gym "${gymName}" is Now Live on GymLink!` ,
        text: `Congratulations! Your gym, "${gymName}," has been successfully added to GymLink. Gym enthusiasts can now discover and connect with your facility!`,
        html: `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gym Successfully Added</title>
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(to right, #4CAF50, #8BC34A); padding: 20px; text-align: center;">
      <h1 style="color: white; margin: 0;">🎉 Gym Successfully Created! 🏋️‍♂️</h1>
    </div>
    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
      <p>Hello,</p>
      <p>We are thrilled to inform you that your gym, <strong>"${gymName}"</strong>, has been successfully added to GymLink! 🎊</p>
      <div style="text-align: center; margin: 30px 0;">
        <div style="background-color: #4CAF50; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
          ✓
        </div>
      </div>
      <p>Your gym is now discoverable by fitness enthusiasts looking for the perfect workout spot. Here’s what you can do next:</p>
      <ul style="list-style-type: none; padding-left: 0;">
        <li>📍 Update your gym details and add images</li>
        <li>👥 Connect with potential members and trainers</li>
        <li>🏆 Promote your gym with exclusive offers</li>
        <li>🤖 Get AI-powered recommendations to attract new members</li>
      </ul>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${process.env.CLIENT_URL}/dashboard" 
           style="background: linear-gradient(to right, #4CAF50, #8BC34A); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">
           Manage Your Gym
        </a>
      </div>
      <p>If you have any questions, feel free to reach out to our support team.</p>
      <p>Thank you for being a part of GymLink! 💪<br>The GymLink Team 🏋️‍♂️</p>
    </div>
    <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
      <p>This is an automated message. Please do not reply to this email.</p>
    </div>
  </body>
  </html>`
      });
  
      console.log("Gym creation success email sent successfully");
  
    } catch (error) {
      console.error("Error sending gym creation success email:", error);
    }
  }

// Export all functions
module.exports = { 
    welcomeEmail,
    sendVerificationEmail,
    sendResetEmailSuccessful,
    sendGymCreationSuccessful
}