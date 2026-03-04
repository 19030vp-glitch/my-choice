const mongoose = require('mongoose');

const eContentDevelopedSchema = new mongoose.Schema({
    moduleName: {
        type: String,
        required: true,
    },
    creationType: {
        type: String,
        required: false,
    },
    platform: {
        type: String,
        required: false,
    },
    link: {
        type: String,
        required: false,
    },
    proof: {
        type: String,
        required: false,
    },
    year: {
        type: String,
        required: true,
    },
    otherUser: {
        type: String,
        required: false,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users"
    }

}, { timestamps: true });

module.exports = mongoose.model('eContentDeveloped', eContentDevelopedSchema);