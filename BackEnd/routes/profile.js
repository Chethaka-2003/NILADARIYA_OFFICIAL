const express = require('express');
const authenticate = require('../utils/authenticate');
const mongoose = require('mongoose');
const User = mongoose.model("UserInfo");

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
});

module.exports = router;
