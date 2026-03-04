const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    photoURL: {
        type: 'string',
        required: false,
        default: "pm-usha.png"
    },
    username: {
        type: 'string',
        required: true,
        unique: true
    },
    email: {
        type: 'string',
        required: true,
    },
    password: {
        type: 'string',
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model('ushaUser', userSchema);