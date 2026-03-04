const mongoose = require('mongoose');

const directorAQAR = new mongoose.Schema({

    schoolName: {
        type: 'string',
        required: true,
    },
    submitted: {
        type: [{ type: String }],
        require: false,
        default: [],
    },
    aqarData: {
        type: [{ type: String }],
        required: true,
    }

}, { timestamps: true });

module.exports = mongoose.model('directoraqar', directorAQAR);