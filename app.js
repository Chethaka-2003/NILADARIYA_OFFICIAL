require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
app.use(express.json());

const mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl)
  .then(() => console.log('DATABASE CONNECTED'))
  .catch((e) => console.log(e));

require('./UserDetails');
const User = mongoose.model("UserInfo");

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const verificationCodes = {}; // Store codes temporarily

app.post("/send-verification", async (req, res) => {
  const { email } = req.body;
  const oldUser = await User.findOne({ email });

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

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.send({ status: "error", data: error.message });
    }
    res.send({ status: "OK", data: "Verification email sent" });
  });
});

app.post("/register", async (req, res) => {
  const { name, email, mobile, password, code } = req.body;

  if (verificationCodes[email] !== code) {
    return res.send({ status: "error", data: "Invalid verification code" });
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    await User.create({ name, email, mobile, password: encryptedPassword });
    delete verificationCodes[email];
    res.send({ status: "OK", data: "User Created" });
  } catch (error) {
    res.send({ status: "error", data: error.message });
  }
});

app.listen(4000, () => console.log("Server started on port 4000"));

app.get('/test-email', async (req, res) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'chanith.20232342@iit.ac.lk', // Replace with your email for testing
    subject: 'Test Email',
    text: 'This is a test email from your server.'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.send({ status: "error", data: error.message });
    }
    res.send({ status: "OK", data: "Test email sent", info });
  });
});
