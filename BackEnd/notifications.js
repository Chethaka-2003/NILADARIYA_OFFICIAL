const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "UserInfo", required: true },
    notificationsEnabled: { type: Boolean, required: true, default: true }
}, {
    collection: "UserNotifications"
});

mongoose.model("UserNotifications", NotificationSchema);
