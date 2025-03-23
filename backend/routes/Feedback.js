// routes/feedback.js
const express = require('express');
const router = express.Router();
const Feedback = require('../models/FeedbackSubmit'); // Import the Feedback model
const axios = require('axios');
 

let pushTokens = [];


// Endpoint to save the push token
router.post('/save-push-token', (req, res) => {
  const { pushToken } = req.body;
  if (pushToken) {
    pushTokens.push(pushToken); // Save this token to a database in a real app
    res.status(200).send('Token saved');
  } else {
    res.status(400).send('Push token required');
  }
});

// Endpoint to send notifications
router.post('/send-notification', async (req, res) => {
  try {
    const message = {
      to: pushTokens[0],  // Send to the first token for demonstration, modify as needed
      sound: 'default',
      title: 'Feedback Received!',
      body: 'Thank you for submitting feedback.',
    };

    const response = await axios.post('https://exp.host/--/api/v2/push/send', message);
    res.status(200).send('Notification sent');
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).send('Error sending notification');
  }
});

 
// POST /feedback/submit - Save feedback data to the database
router.post('/submit', async (req, res) => {
  try {
    const { rating, feedbackText } = req.body;
    if ( !rating || !feedbackText) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
 
    const newFeedback = new Feedback({  rating, feedbackText });
    await newFeedback.save();

    const pushToken = "your_user_device_push_token";  // Example: Retrieve this dynamically

    // Send notification via Expo Push
    const message = {
      to: pushToken,
      sound: 'default',
      title: 'New Feedback Submitted!',
      body: `You have received feedback with a rating of ${rating}`,
    };

    await axios.post('https://exp.host/--/api/v2/push/send', message);
 
    res.status(200).json({ message: 'Feedback submitted successfully.' });

  } catch (err) {
    console.error('Error saving feedback:', err);
    res.status(500).json({ message: 'Server error while submitting feedback.' });
  }
});
 
module.exports = router;