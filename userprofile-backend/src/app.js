require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db'); // Import the connectDB function
const setUserRoutes = require('./routes/userRoutes'); // Import the setUserRoutes function

app.use(express.json());
app.use(cors());

connectDB();

// Set up routes
setUserRoutes(app);

app.listen(process.env.PORT, () => {
  console.log("Local server Started");
});

app.get("/", (req, res) => {
  res.send({status: "Started"});
});