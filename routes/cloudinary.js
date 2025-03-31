const cloudinary = require('cloudinary').v2;
const express = require('express');
const multer = require('multer');
const User = require('../models/User'); // Assuming your User model is here
const router = express.Router();

// Cloudinary configuration
cloudinary.config({
  cloud_name: "dc0li2qzl", // Replace with your Cloudinary cloud name
  api_key: "832938628972688",       // Replace with your Cloudinary API key
  api_secret: "HY1Mu1qiAC6QQUwimGugxV_an6w"  // Replace with your Cloudinary API secret
});




// Multer setup to handle image uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to upload profile picture
router.post('/profilePicture', upload.single('profilePicture'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload_stream(
      { resource_type: 'auto' },
      async (error, result) => {
        if (error) {
          return res.status(500).json({ message: 'Error uploading image to Cloudinary', error });
        }

        // Save image URL in the user's profile
        const imageUrl = result.secure_url;
        
        // Assuming you have a user authentication system and userId is in the request
        const userId = req.user.id; // Adjust based on your authentication system
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        user.profilePicture = imageUrl; // Store the image URL in the user's profile
        await user.save();

        return res.status(200).json({
          message: 'Profile picture uploaded successfully!',
          fileUrl: imageUrl, // Send back the URL of the uploaded image
        });
      }
    );
    req.file.stream.pipe(result);
  } catch (error) {
    console.error('Error in file upload:', error);
    return res.status(500).json({ message: 'Error uploading file', error });
  }
});

router.delete('/profilePicture', async (req, res) => {
    try {
      const userId = req.user.id; // Adjust based on your authentication system
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Remove the profile picture from the user's profile
      user.profilePicture = null;
      await user.save();
  
      res.status(200).json({ message: 'Profile picture removed successfully!' });
    } catch (error) {
      console.error('Error removing profile picture:', error);
      res.status(500).json({ message: 'Error removing profile picture', error });
    }
  });
  

module.exports = router;
