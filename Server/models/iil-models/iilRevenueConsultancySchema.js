const mongoose = require('mongoose');

const iilRevenueConsultancySchema = new mongoose.Schema({

    nameOfConsultant: {
        type: 'string',
        required: true,
    },
    nameOfConsultancyProject: {
        type: 'string',
        required: true,
    },
    agencyName: {
        type: 'string',
        required: true,
    },
    academicYear: {
        type: 'string',
        required: true,
    },
    revenueGenerated: {
        type: 'string',
        required: true
    },
    Proof: {
        type: 'string',
        required: true
    },


}, { timestamps: true });

module.exports = mongoose.model('IilRevenueConsultancy', iilRevenueConsultancySchema);