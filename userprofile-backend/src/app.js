require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db'); // Import the connectDB function
const userRoutes = require('./routes/userRoutes'); // Import the userRoutes

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', userRoutes);

mongoose.connect('mongodb://localhost:27017/your_database_name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

app.get("/", (req, res) => {
  res.send({status: "Started"});
});