const mongoose = require("mongoose");

const SecuritySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "UserInfo2", unique: true }, // Correct reference to UserInfo2
    password: { type: String, required: true },
    lastUpdated: { type: Date, default: Date.now }
}, {
    collection: "UserSecurity"
});

mongoose.model("UserSecurity", SecuritySchema);
