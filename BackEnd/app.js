require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const port = process.env.PORT || 4000;
app.use(express.json());

const mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl)
  .then(() => console.log('DATABASE CONNECTED'))
  .catch((e) => console.log(e));

// Load Mongoose Models
require('./UserDetails');
require('./Language');
require('./feedback');
require('./notifications');

const User = mongoose.model("UserInfo");
const UserLanguage = mongoose.model("UserLanguage");
const UserFeedback = mongoose.model("UserFeedback");
const UserNotifications = mongoose.model("UserNotifications");

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const verificationCodes = {}; // Store verification codes temporarily

// Send verification code
app.post("/send-verification", async (req, res) => {
  const { email, mobile } = req.body;
  const oldUser = await User.findOne({ $or: [{ email }, { mobile }] });

  if (oldUser) {
    return res.send({ data: 'User already exists!' });
  }

  const code = crypto.randomInt(100000, 999999).toString();
  verificationCodes[email] = code;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Email Verification Code',
    text: `Your verification code is: ${code}`
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      return res.send({ status: "error", data: error.message });
    }
    res.send({ status: "OK", data: "Verification email sent" });
  });
});

// User Registration
app.post("/register", async (req, res) => {
  const { name, email, mobile, password, code } = req.body;

  if (verificationCodes[email] !== code) {
    return res.send({ status: "error", data: "Invalid verification code" });
  }

  try {
    const newUser = await User.create({ name, email, mobile, password });

    // Create default language entry
    await UserLanguage.create({ userId: newUser._id });

    // Create default notification settings
    await UserNotifications.create({ userId: newUser._id, notificationsEnabled: true });

    delete verificationCodes[email];
    res.send({ status: "OK", data: "User Created" });
  } catch (error) {
    res.send({ status: "error", data: error.message });
  }
});

// User Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.send({ status: "error", data: "User not found" });
    }

    if (password !== user.password) {
      return res.send({ status: "error", data: "Invalid password" });
    }

    res.send({ status: "OK", data: "Login successful" });
  } catch (error) {
    res.send({ status: "error", data: error.message });
  }
});

// Get User's Language Preference
app.get("/user/:id/language", async (req, res) => {
  try {
    const userLanguage = await UserLanguage.findOne({ userId: req.params.id });
    if (!userLanguage) {
      return res.status(404).json({ message: "Language preference not found" });
    }
    res.json({ language: userLanguage.language });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Update User's Language Preference
app.put("/user/:id/language", async (req, res) => {
  const { language } = req.body;

  try {
    const userLanguage = await UserLanguage.findOneAndUpdate(
      { userId: req.params.id },
      { language },
      { new: true }
    );

    if (!userLanguage) {
      return res.status(404).json({ message: "Language preference not found" });
    }

    res.json({ message: "Language updated successfully", userLanguage });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Submit Feedback
app.post("/submit-feedback", async (req, res) => {
  const { userId, rating, feedbackText } = req.body;

  if (!userId || !rating || !feedbackText) {
    return res.status(400).json({ error: "User ID, rating, and feedback are required." });
  }

  try {
    const feedback = await UserFeedback.create({ userId, rating, feedbackText });
    res.status(201).json({ message: "Feedback submitted successfully!", feedback });
  } catch (error) {
    res.status(500).json({ error: "Server error while submitting feedback.", details: error.message });
  }
});

// Get Feedback for a User
app.get("/user/:id/feedback", async (req, res) => {
  try {
    const feedbackList = await UserFeedback.find({ userId: req.params.id });
    res.json({ feedback: feedbackList });
  } catch (error) {
    res.status(500).json({ error: "Server error while fetching feedback.", details: error.message });
  }
});

// Get User's Notification Settings
app.get("/user/:id/notifications", async (req, res) => {
  try {
    const userNotification = await UserNotifications.findOne({ userId: req.params.id });
    if (!userNotification) {
      return res.status(404).json({ message: "Notification settings not found" });
    }
    res.json({ notificationsEnabled: userNotification.notificationsEnabled });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Update User's Notification Settings
app.put("/user/:id/notifications", async (req, res) => {
  const { notificationsEnabled } = req.body;

  try {
    const userNotification = await UserNotifications.findOneAndUpdate(
      { userId: req.params.id },
      { notificationsEnabled },
      { new: true }
    );

    if (!userNotification) {
      return res.status(404).json({ message: "Notification settings not found" });
    }

    res.json({ message: "Notification settings updated", userNotification });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Start Server
app.listen(port, () => console.log(`Server started on port ${port}`));
