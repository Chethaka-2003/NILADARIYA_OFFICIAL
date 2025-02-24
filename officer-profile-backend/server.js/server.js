import mongoose from "mongoose";    // Importing mongoose
import express from "express";    // Importing express
import cors from "cors";    // Importing cors

const app = express();    // Creating an express app
app.use(cors());    // Using cors
app.use(express.json());    // Using express.json

mongoose.connect(process.env.MONGO_URI, {    // Connecting to the database
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected!")).catch((err) => console.log(err));