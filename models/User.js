const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  mobile: { type: String, unique: true },
  password: String, 
  position: String,
  department: String,
  available: { type: Boolean, default: false },
  profilePicture: { type: String, default: null }, // Store the image URL here
  userType: { type: String, enum: ['public', 'government'], default: 'public' },
});

// Hash password before saving to DB
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model('userinfos', userSchema);
