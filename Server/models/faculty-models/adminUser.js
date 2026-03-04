const mongoose = require('mongoose');

const adminUserSchema = new mongoose.Schema({

    photoURL: {
        type: 'string',
        required: true,
    },
    username: {
        type: 'string',
        required: true,
        unique: true
    },
    password: {
        type: 'string',
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model('admins', adminUserSchema);