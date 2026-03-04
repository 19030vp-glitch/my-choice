const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({

    email: {
        type: 'string',
        required: true,
    },
    feedback: {
        type: 'string',
        required: true,
        unique: true
    }

}, { timestamps: true });

module.exports = mongoose.model('feedback', feedbackSchema);