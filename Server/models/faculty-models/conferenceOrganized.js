const mongoose = require('mongoose');

const conferenceOrganizedSchema = new mongoose.Schema({


    programTitle: {
        type: 'string',
        required: true,
    },
    schoolName: {
        type: 'string',
        required: true,
    },
    fundedBy: {
        type: 'string',
        required: true,
    },
    isNational: {
        type: 'string',
        required: true,
    },
    noOfParticipants: {
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

module.exports = mongoose.model('conferenceOrganized', conferenceOrganizedSchema);