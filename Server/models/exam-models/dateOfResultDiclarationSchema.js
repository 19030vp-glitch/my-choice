const mongoose = require('mongoose');

const dateOfResultDiclarationSchema = new mongoose.Schema({
    
    programmeName: {
        type: 'string',
        required: false,
    },
    programmeCode: {
        type: 'string',
        required: false,
    },
    academicYear: {
        type: 'string',
        required: true,
    },
    lastDate: {
        type: 'string',
        required: false,
    },
    diclarationDate: {
        type: 'string',
        required: false,
    },
    Proof: {
        type: 'string',
        required: false,
    },

}, { timestamps: true });

module.exports = mongoose.model('DateOfResultDiclaration', dateOfResultDiclarationSchema);