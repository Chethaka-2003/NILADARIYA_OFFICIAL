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

// Route to get a specific officer's profile by email
router.get('/getprofile', async (req, res) => {
  const { email } = req.query; // Get email from query parameters

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const officer = await User.findOne({ email, userType: 'government' }); // Find the officer by email and ensure they are a government officer

    if (!officer) {
      return res.status(404).json({ message: 'Officer not found' });
    }

    // Return the officer's profile details (excluding sensitive data like password)
    const officerDetails = {
      name: officer.name,
      email: officer.email,
      mobile: officer.mobile,
      position: officer.position,
      department: officer.department,
      profilePicture: officer.profilePicture,
      available: officer.available,
    };

    res.status(200).json({
      status: 'OK',
      profile: officerDetails,
    });
  } catch (error) {
    console.error('Error fetching officer profile:', error);
    res.status(500).json({ message: 'Error fetching officer profile', error: error.message });
  }
});






module.exports = router;
