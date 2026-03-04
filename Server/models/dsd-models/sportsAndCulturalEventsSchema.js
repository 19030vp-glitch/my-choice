const mongoose = require('mongoose');

const sportsAndCulturalEventsSchema = new mongoose.Schema({

    dateOfEvent: {
        type: 'string',
        required: true,
    },
    nameOfEvent: {
        type: 'string',
        required: true,
    },
    academicYear: {
        type: 'string',
        required: true,
    },
    userType: {
        type: 'string',
        required: true,
    },
    proof: {
        type: 'string',
        required: false
    }

}, { timestamps: true });

module.exports = mongoose.model('SportsAndCulturalEvents', sportsAndCulturalEventsSchema);