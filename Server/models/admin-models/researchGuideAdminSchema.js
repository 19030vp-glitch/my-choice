const mongoose = require('mongoose');

const researchGuideAdminSchema = new mongoose.Schema({

    fullTimeTeacher: {
        type: 'string',
        required: true,
    },
    qualification: {
        type: 'string',
        required: false,
    },
    researchCenterName: {
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

}, { timestamps: true });

module.exports = mongoose.model('researchGuideAdmin', researchGuideAdminSchema);