const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();
const userController = new UserController();

const setUserRoutes = (app) => {
  router.get('/user/:id', userController.getUserProfile);
  router.put('/user/:id', userController.updateUserProfile);
  router.post('/user/:id/profile-image', userController.uploadProfileImage);

  app.use('/api', router);
};

module.exports = setUserRoutes;