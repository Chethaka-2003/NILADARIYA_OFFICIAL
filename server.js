const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/lockdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// User Schema
const userSchema = new mongoose.Schema({
  username: String,
  passcode: String,
});

const User = mongoose.model('User', userSchema);

// Routes
app.post('/login', async (req, res) => {
  const { username, passcode } = req.body;
  const user = await User.findOne({ username, passcode });

  if (user) {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Incorrect passcode' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});