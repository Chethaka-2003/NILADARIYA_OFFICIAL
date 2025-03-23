const mongoose = require("mongoose");
 
const FeedbackSchema = new mongoose.Schema(
  {
    rating: { type: Number, required: true, min: 1, max: 5 },
    feedbackText: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  },
  {
    collection: "UserFeedback"
  }
);
 
module.exports = mongoose.model("UserFeedback", FeedbackSchema);