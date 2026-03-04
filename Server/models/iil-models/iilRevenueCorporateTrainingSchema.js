const mongoose = require('mongoose');

const iilRevenueCorporateTrainingSchema = new mongoose.Schema({

    nameOfCorporate: {
        type: 'string',
        required: true,
    },
    nameOfCorporateProgram: {
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
    numberOfTrainees: {
        type: 'number',
        required: true
    },
    Proof: {
        type: 'string',
        required: true
    },


}, { timestamps: true });

module.exports = mongoose.model('IilRevenueCorporateTraining', iilRevenueCorporateTrainingSchema);