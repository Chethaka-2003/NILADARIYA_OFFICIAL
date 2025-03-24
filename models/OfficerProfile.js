const mongoose = require('mongoose');

const OfficerProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    // ...add any additional fields as needed...
});

module.exports = mongoose.model('OfficerProfile', OfficerProfileSchema);