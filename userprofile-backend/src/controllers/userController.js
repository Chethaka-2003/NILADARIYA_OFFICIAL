import User from '../models/userModel';

class UserController {
  async getUserProfile(req, res) {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving user profile', error });
    }
  }

  async updateUserProfile(req, res) {
    try {
      const userId = req.params.id;
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: 'Error updating user profile', error });
    }
  }

  async uploadProfileImage(req, res) {
    try {
      const userId = req.params.id;
      const profileImage = req.file.path; // Assuming you're using multer for file uploads
      const updatedUser = await User.findByIdAndUpdate(userId, { profileImage }, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: 'Error uploading profile image', error });
    }
  }
}

export default new UserController();