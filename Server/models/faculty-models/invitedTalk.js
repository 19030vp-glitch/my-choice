const mongoose = require('mongoose');

const invitedTalkSchema = new mongoose.Schema({

    lectureTitle: {
        type: 'string',
        required: true,
    },
    seminarTitle: {
        type: 'string',
        required: true,
    },
    organizedBy: {
        type: 'string',
        required: true,
    },
    talkDate: {
        type: 'string',
        required: true,
    },
    isNat: {
        type: 'string',
        required: true,
    },
    nature: {
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

module.exports = mongoose.model('invitedTalk', invitedTalkSchema);