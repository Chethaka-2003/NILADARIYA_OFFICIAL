const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model("UserInfo");

const router = express.Router();

// User Signup
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, password: hashedPassword, isFirstTimeUser: true });

        res.json({ status: "OK", message: "User Registered Successfully" });
    } catch (error) {
        res.status(500).json({ error: 'Error registering user' });
    }
});

// User Signin
router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        if (user.isFirstTimeUser) {
            user.isFirstTimeUser = false;
            await user.save();
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, isFirstTimeUser: user.isFirstTimeUser });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
