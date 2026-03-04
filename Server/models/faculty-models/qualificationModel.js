const mongoose = require('mongoose');

const qualificationModel = new mongoose.Schema({
    exam: {
        type: 'string',
        required: true,
    },
    year: {
        type: 'string',
        required: true,
    },
    percentage: {
        type: 'string',
        required: true,
    },
    subjects: {
        type: 'string',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },
    institute: {
        type: 'string',
        required: true,
    }


}, { timestamps: true });

module.exports = mongoose.model('qualifications', qualificationModel);