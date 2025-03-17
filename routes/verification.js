const express = require('express');
const crypto = require('crypto');
const { sendVerificationEmail } = require('../utils/email');
const User = require('../models/User');
const router = express.Router();
const nodemailer = require('nodemailer');

const verificationCodes = {}; // Temporary storage for verification codes

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Route to send verification code
router.post("/send-verification", async (req, res) => {
  const { email, mobile, isPasswordReset } = req.body;

  // For Sign-Up: Check if the user already exists
  if (!isPasswordReset) {
    const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });

    if (existingUser) {
      return res.send({ status: "error", data: "Email already exists" });
    }
  }

  // For Password Reset: Check if the email exists in the database
  if (isPasswordReset) {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.send({ status: "error", data: "Email not registered" });
    }
  }

  // Send the verification code if valid (for both cases)
  const code = crypto.randomInt(100000, 999999).toString();
  verificationCodes[email] = code;

  try {
    await sendVerificationEmail(email, code);
    res.send({ status: "OK", data: "Verification email sent" });
  } catch (error) {
    res.send({ status: "error", data: error.message });
  }
});

// Route to verify the code
router.post("/verify-code", async (req, res) => {
  const { email, code } = req.body;

  // Check if the code matches the one sent to the user's email
  if (verificationCodes[email] !== code) {
    return res.send({ status: "error", data: "Invalid verification code" });
  }

  res.send({ status: "OK", data: "Code verified. Proceed to change password" });
});

// Route to change password
router.post("/change-password", async (req, res) => {
    const { email, newPassword, code } = req.body;
  
    // Verify the code
    if (verificationCodes[email] !== code) {
      return res.send({ status: "error", data: "Invalid verification code" });
    }
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.send({ status: "error", data: "User not found" });
      }
  
      user.password = newPassword; // Update password
      await user.save();
  
      // Send email confirmation after password change
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Change Confirmation',
        text: 'Your password has been successfully changed.'
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).send({ status: 'error', data: error.message });
        }
      });
  
      // Remove the verification code from the cache
      delete verificationCodes[email];
  
      res.send({ status: "OK", data: "Password changed successfully" });
    } catch (error) {
      res.send({ status: "error", data: error.message });
    }
  });

module.exports = router;
