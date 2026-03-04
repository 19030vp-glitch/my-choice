const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    academicYear: {
        type: 'string',
        required: true,
    },
    studentName: {
        type: 'string',
        required: true,
    },
    gender: {
        type: 'string',
        required: true,
    },
    category: {
        type: 'string',
        required: true,
    },
    isMinority: {
        type: 'string',
        required: true,
    },
    email: {
        type: 'string',
        required: true,
        unique: true,
    },
    mobile: {
        type: 'string',
        required: true,
    },
    email: {
        type: 'string',
        required: true,
    },
    address: {
        type: 'string',
        required: true
    },
    district: {
        type: 'string',
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model('umpscStudents', schema);