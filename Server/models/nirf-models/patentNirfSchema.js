const mongoose = require('mongoose');

const patentNirfSchema = new mongoose.Schema({
    noOfpublished: {
        type: Number,
        required: true
    },
    noOfGranted: {
        type: Number,
        required: true
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

module.exports = mongoose.model('patentNirfs', patentNirfSchema)