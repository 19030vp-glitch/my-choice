const mongoose = require('mongoose');

const collaborationSchema = new mongoose.Schema({

    collabTitle: {
        type: 'string',
        required: true,
    },
    agencyName: {
        type: 'string',
        required: true,
    },
    participantName: {
        type: 'string',
        required: true,
    },
    collabYear: {
        type: 'string',
        required: true,
    },
    duration: {
        type: 'string',
        required: true,
    },
    activityNature: {
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

module.exports = mongoose.model('collaboration', collaborationSchema);