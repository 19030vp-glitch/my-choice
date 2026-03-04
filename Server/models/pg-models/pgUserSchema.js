const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name: {
        type: 'string',
        required: false,
    },
    email: {
        type: 'string',
        required: true,
        unique: true,
    },
    photoURL: {
        type: 'string',
        required: false,
    },
    department: {
        type: 'string',
        required: true,
    },
    password: {
        type: 'string',
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model('pgUser', userSchema);