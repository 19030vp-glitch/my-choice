const mongoose = require('mongoose');

const directorUserSchema = new mongoose.Schema({
    salutation: {
        type: 'string',
        required: true,
    },
    photoURL: {
        type: 'string',
        required: true,
    },
    mobileNumber: {
        type: 'string',
        required: true,
    },
    name: {
        type: 'string',
        required: true,
    },
    email: {
        type: 'string',
        required: true,
    },
    designation: {
        type: 'string',
        required: true,
    },
    department: {
        type: 'string',
        required: true,
        unique: true
    },
    gender: {
        type: 'string',
        required: true,
    },
    password: {
        type: 'string',
        required: true
    },
    role: {
        type: 'string',
        required: true,
        default : 'director'
    }

}, { timestamps: true });

module.exports = mongoose.model('directorUser', directorUserSchema);