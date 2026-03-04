const mongoose = require('mongoose');

const contractualFacultyIDSchema = new mongoose.Schema({
    userIdCount: {
        type: Number,
        required: true,
    },
    name : {
        type: 'string',
        required: true,
    },

}, { timestamps: true });

module.exports = mongoose.model('contractualFacultyID', contractualFacultyIDSchema);