const mongoose = require("mongoose");

const OfficerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String, required: true },
    position: { type: String },
    password: { type: String, required: true },
});

module.exports = mongoose.model("Officer", OfficerSchema);
