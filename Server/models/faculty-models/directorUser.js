const mongoose = require('mongoose');

const directorUserSchema = new mongoose.Schema({

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

module.exports = mongoose.model('directors', directorUserSchema);