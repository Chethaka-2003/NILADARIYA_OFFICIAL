const express = require('express');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const User = mongoose.model("UserInfo");
const transporter = require('../utils/transporter');

const router = express.Router();

const verificationCodes = {};

// Send OTP for password reset
router.post('/send-password-otp', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const otp = crypto.randomInt(100000, 999999).toString();
        verificationCodes[email] = otp;

        transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset OTP',
            text: `Your OTP to reset your password is: ${otp}`
        }, (error) => {
            if (error) return res.status(500).json({ error: error.message });
            res.json({ status: "OK", message: "OTP sent successfully" });
        });

    } catch (error) {
        res.status(500).json({ error: 'Error sending OTP' });
    }
});

module.exports = router;
