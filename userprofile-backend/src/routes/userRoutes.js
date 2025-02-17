const express = require('express');
const UserController = require('../controllers/userController');
const router = express.Router();
const userController = new UserController();

router.get('/user/:id', userController.getUserProfile);
router.put('/user/:id', userController.updateUserProfile);
router.post('/user/:id/profileImage', userController.uploadProfileImage);

// New route to export all users
router.get('/export/users', userController.exportUsers);

module.exports = router;