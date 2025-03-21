// routes/feedback.js
const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback'); // Import the Feedback model

// POST /feedback/submit - Save feedback data to the database
router.post('/submit', async (req, res) => {
  try {
    const { userId, rating, feedbackText } = req.body;
    if (!userId || !rating || !feedbackText) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newFeedback = new Feedback({ userId, rating, feedbackText });
    await newFeedback.save();

    res.status(200).json({ message: 'Feedback submitted successfully.' });
  } catch (err) {
    console.error('Error saving feedback:', err);
    res.status(500).json({ message: 'Server error while submitting feedback.' });
  }
});

module.exports = router;
