const mongoose = require('mongoose');

const iilCollaborativeActivitiesSchema = new mongoose.Schema({

    nameOfParticipant: {
        type: 'string',
        required: true,
    },
    titleOfActivity: {
        type: 'string',
        required: true,
    },
    nameOfAgency: {
        type: 'string',
        required: true,
    },
    academicYear: {
        type: 'string',
        required: true,
    },
    duration: {
        type: 'string',
        required: true
    },
    natureOfActivity: {
        type: 'string',
        required: true
    },
    Proof: {
        type: 'string',
        required: false
    },



}, { timestamps: true });

module.exports = mongoose.model('IilCollaborativeActivities', iilCollaborativeActivitiesSchema);