const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    academicYear: {
        type: 'string',
        required: true,
    },
    userType: {
        type: 'string',
        required: true,
    },
    school: {
        type: 'string',
        required: false,
    },
    info: {
        type: 'string',
        required: false,
    },
    proofType: {
        type: 'string',
        required: true,
    },
    proof: {
        type: 'string',
        required: false,
    },
})

module.exports = mongoose.model('aqarSupportingDocuments', schema);
