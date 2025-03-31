const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const os = require("os");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads")); // Serve uploaded images

app.put('/profilePicture', authenticateJWT, upload.single('profilePicture'), async (req, res) => {
    try {
      const user = await User.findById(req.userId);
      if (!user) {
        return res.status(404).json({ status: 'error', message: 'User not found' });
      }
   
      // Update only allowed fields
      if (req.body.position) {
        user.governmentDetails.position = req.body.position;
      }
      if (req.body.mobile) {
        user.mobile = req.body.mobile;
      }
      if (req.file) {
        // Save the profile picture URL or path
        user.image = `/uploads/profiles/${req.file.filename}`;
      }
   
      await user.save();
      res.status(200).json({ status: 'OK', message: 'Profile updated successfully' });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  });

// Error handling middleware
app.use((err, req, res, next) => {
    console.error("Server Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://${SERVER_IP}:${PORT}`);
});
