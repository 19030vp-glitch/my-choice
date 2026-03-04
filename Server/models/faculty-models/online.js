const mongoose = require('mongoose');

const onlineSchema = new mongoose.Schema({
    nameOfAttendedTeacher: {
        type: 'string',
        required: true,
    },
    programTitle: {
        type: 'string',
        required: true,
    },
    durationFrom: {
        type: 'string',
        required: false,
    },
    durationTo: {
        type: 'string',
        required: false,
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

module.exports = mongoose.model('online', onlineSchema);