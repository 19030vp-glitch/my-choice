const mongoose = require('mongoose');

const awardAndRecognitionSchema = new mongoose.Schema({

    teacherName: {
        type: 'string',
        required: true,
    },
    awardYear: {
        type: 'string',
        required: false,
    },
    pan: {
        type: 'string',
        required: true,
    },
    designation: {
        type: 'string',
        required: true,
    },
    isNat: {
        type: 'string',
        required: true,
    },
    agencyName: {
        type: 'string',
        required: true,
    },
    awardName: {
        type: 'string',
        required: true,
    },
    incentive: {
        type: 'string',
        required: true,
    },
    year: {
        type: 'string',
        required: true,
    },
    proof: {
        type: 'string',
        required: false,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users"
    }

}, { timestamps: true });

module.exports = mongoose.model('awardAndRecognition', awardAndRecognitionSchema);