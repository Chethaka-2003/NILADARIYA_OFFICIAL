const mongoose = require("mongoose");

const LanguageSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "UserInfo", unique: true },
    language: { type: String, default: "English" }
}, {
    collection: "UserLanguages"
});

mongoose.model("UserLanguage", LanguageSchema);