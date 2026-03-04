const mongoose = require('mongoose');

const actionSchema = new mongoose.Schema({
    schoolName: {
        type: 'string',
        required: true,
    },
    academicYear: {
        type: 'string',
        required: true,
    },
    submitted: {
        type: 'boolean',
        required: false,
        default: false,
    },
    Student: {
        type: 'string',
        required: false,
    },
    Teacher: {
        type: 'string',
        required: false,
    },
    Alumni: {
        type: 'string',
        required: false,
    },
    Employer: {
        type: 'string',
        required: false,
    },
    Parent: {
        type: 'string',
        required: false,
    },
    Expert: {
        type: 'string',
        required: false,
    }

}, { timestamps: true });

module.exports = mongoose.model('actiontakenreports', actionSchema);