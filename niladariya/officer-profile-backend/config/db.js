const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// Default retry connection logic
const MAX_RETRIES = 5;
let retries = 0;

const connectDB = async () => {
  try {
    // Check if the MongoDB URI is provided
    if (!process.env.MONGO_URI) {
      console.error("MONGO_URI is not defined in environment variables.");
      process.exit(1);
    }

    // Attempt to connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB Connected...");
  } catch (error) {
    retries += 1;
    console.error(`MongoDB Connection Error: ${error.message}`);
    if (retries <= MAX_RETRIES) {
      console.log(`Retrying to connect... (${retries}/${MAX_RETRIES})`);
      setTimeout(connectDB, 5000); // Retry connection after 5 seconds
    } else {
      console.error("Max retries reached. Exiting process...");
      process.exit(1); // Exit the process after max retries
    }
  }
};

module.exports = connectDB;
