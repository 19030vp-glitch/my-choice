const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
    course: {
        type: 'string',
        required: true,
    },
    level: {
        type: 'string',
        required: true,
    },
    teachingMode: {
        type: 'string',
        required: true,
    },
    noOfClasses: {
        type: 'string',
        required: true,
    },
    classesTaken: {
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

module.exports = mongoose.model('lectures', lectureSchema);