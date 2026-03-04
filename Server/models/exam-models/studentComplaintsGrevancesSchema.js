const mongoose = require('mongoose');

const studentComplaintsGrevancesSchema = new mongoose.Schema({
    
    noOfStudents: {
        type: 'string',
        required: false,
    },
    noOfGrievances: {
        type: 'string',
        required: false,
    },
    academicYear: {
        type: 'string',
        required: true,
    },
    Proof: {
        type: 'string',
        required: false,
    },

}, { timestamps: true });

module.exports = mongoose.model('StudentComplaintsGrevances', studentComplaintsGrevancesSchema);