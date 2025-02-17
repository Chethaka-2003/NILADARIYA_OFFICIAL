const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  preferences: {
    notifications: { type: Boolean, default: false },
    darkMode: { type: Boolean, default: false },
  },
  profileImage: { type: String },
});

const User = mongoose.model('User', userSchema);

module.exports = User;