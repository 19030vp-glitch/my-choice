const mongoose = require('mongoose');

const consultancyNirfSchema = new mongoose.Schema({
    Consultancy: {
        type: Number,
        required: true
    },
    clientOrganization: {
        type: Number,
        required: true
    },
    amountReceived: {
        type: Number,
        required: true
    },
    amountInWords: {
        type: String,
        required: false
    },
    academicYear: {
        type: String,
        required: true,
    },
    school: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('consultancyNirfs', consultancyNirfSchema)