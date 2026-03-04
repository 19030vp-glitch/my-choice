const mongoose = require('mongoose');

const conferenceParticipatedSchema = new mongoose.Schema({


    programTitle: {
        type: 'string',
        required: true,
    },
    organizingInstitute: {
        type: 'string',
        required: true,
    },
    isNational: {
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

module.exports = mongoose.model('conferenceParticipated', conferenceParticipatedSchema);