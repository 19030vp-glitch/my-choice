const mongoose = require('mongoose');

const phdAwardedAdminSchema = new mongoose.Schema({

    scholarName: {
        type: 'string',
        required: true,
    },
    schoolName: {
        type: 'string',
        required: true,
    },
    guideName: {
        type: 'string',
        required: true,
    },
    degreeName: {
        type: 'string',
        required: true,
    },
    awardSubmit: {
        type: 'string',
        required: true,
    },
    thesisTitle: {
        type: 'string',
        required: true,
    },
    yearOfScholar: {
        type: 'string',
        required: false,
    },
    rac: {
        type: 'string',
        required: false,
    },
    gender: {
        type: 'string',
        required: true,
    },
    category: {
        type: 'string',
        required: true,
    },
    phdAwardYear: {
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

}, { timestamps: true });

module.exports = mongoose.model('phdAwardedAdmin', phdAwardedAdminSchema);