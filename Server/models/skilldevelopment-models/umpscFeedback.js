const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    academicYear: {
        type: 'string',
        required: true,
    },
    response: {
        type: 'string',
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model('umpscFeedback', schema);