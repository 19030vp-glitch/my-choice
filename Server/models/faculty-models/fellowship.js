const mongoose = require('mongoose');

const fellowshipSchema = new mongoose.Schema({


    teacherName: {
        type: 'string',
        required: true,
    },
    awardName: {
        type: 'string',
        required: true,
    },
    awardYear: {
        type: 'string',
        required: true,
    },
    awardingAgency: {
        type: 'string',
        required: true,
    },
    isNat: {
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

module.exports = mongoose.model('fellowship', fellowshipSchema);