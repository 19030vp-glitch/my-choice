const mongoose = require('mongoose');

const jrfsrfAdminSchema = new mongoose.Schema({

    researchName: {
        type: 'string',
        required: true,
    },
    enrolmentYear: {
        type: 'string',
        required: false,
    },
    fellowshipDate: {
        type: 'string',
        required: true,
    },
    fellowshipDuration: {
        type: 'string',
        required: true,
    },
    fellowshipType: {
        type: 'string',
        required: true,
    },
    grantingAgency: {
        type: 'string',
        required: true,
    },
    qualifyingExam: {
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
    schoolName: {
        type: 'string',
        required: true,
    },
    guideName: {
        type: 'string',
        required: true,
    },

}, { timestamps: true });

module.exports = mongoose.model('jrfsrfAdmin', jrfsrfAdminSchema);