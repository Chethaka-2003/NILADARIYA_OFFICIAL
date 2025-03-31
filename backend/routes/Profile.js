const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Route to get all government officers
router.get('/getofficers', async (req, res) => {
  try {
    const officers = await User.find({ userType: 'government' }); // Fetch all government officers
    res.status(200).json({
      status: 'OK',
      officers,
    });
  } catch (error) {
    console.error('Error fetching officers:', error);
    res.status(500).json({ message: 'Error fetching officers', error: error.message });
  }
});








module.exports = router;
