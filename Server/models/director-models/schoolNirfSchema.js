const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    submitted: {
        type: [{ type: String }],
        require: false,
        default: [],
    },
    schoolName: {
        type: String,
        required: true,
    }

}, { timestamps: true });

module.exports = mongoose.model('schoolNirfs', schema);