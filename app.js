require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 4000;


app.use(express.json());
app.use(cors());

// Connect to MongoDB
const mongoUrl = process.env.MONGO_URL;
mongoose.connect(mongoUrl)
  .then(() => console.log('DATABASE CONNECTED'))
  .catch((e) => console.log(e));

// Import Routes
const feedbackRoutes = require('./routes/Feedback');
const authRoutes = require('./routes/auth');
const verificationRoutes = require('./routes/Profile');
const cloudinaryRoutes = require('./routes/cloudinary');
const profileRoutes = require('./routes/Profile');



// Use Routes
app.use('/auth', authRoutes);
app.use('/verification', verificationRoutes);
app.use('/feedback', feedbackRoutes);
app.use('/cloudinary', cloudinaryRoutes);
app.use('/profile', profileRoutes);





app.listen(4000, () => console.log("Server started on port 4000"));

