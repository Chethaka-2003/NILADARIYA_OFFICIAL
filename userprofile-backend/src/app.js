require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db'); // Import the connectDB function

app.use(express.json());
app.use(cors());

connectDB();

app.listen(process.env.PORT, () => {
  console.log("Local server Started");
});

app.get("/", (req, res) => {
  res.send({status: "Started"});
});