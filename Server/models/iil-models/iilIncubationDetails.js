const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    details: {
        type: 'string',
        required: true,
    },
    academicYear: {
        type: 'string',
        required: true,
    },

}, { timestamps: true });

module.exports = mongoose.model('iilincubationDetails', schema);