const User = require('../models/userModel');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

class UserController {
  async getUserProfile(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  async updateUserProfile(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  uploadProfileImage(req, res) {
    upload.single('profileImage')(req, res, async (err) => {
      if (err) return res.status(500).json({ message: 'Upload error' });
      try {
        const user = await User.findByIdAndUpdate(req.params.id, { profileImage: req.file.path }, { new: true });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
      } catch (error) {
        res.status(500).json({ message: 'Server error' });
      }
    });
  }

  // New method to export all users
  async exportUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
}

module.exports = UserController;