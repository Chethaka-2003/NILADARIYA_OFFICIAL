const mongoose = require("mongoose");

const officerSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    position: { type: String, required: true },
    contact: { type: String, required: true },
    service: { type: String, required: true },
    appointments: { type: Array, default: [] },
  },
  { timestamps: true }
);

const Officer = mongoose.model("Officer", officerSchema);
module.exports = Officer;
