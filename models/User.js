const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  mobile: { type: String, unique: true },
  password: String
});

const User = mongoose.model('UserInfo', userSchema);

module.exports = User; // Export the model
