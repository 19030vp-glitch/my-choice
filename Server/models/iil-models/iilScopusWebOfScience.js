const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    type: {
        type: 'string',
        required: true,
    },
    scopus: {
        type: 'string',
        required: true,
    },
    webOfScience: {
        type: 'string',
        required: true,
    },
    academicYear: {
        type: 'string',
        required: true,
    },

}, { timestamps: true });

module.exports = mongoose.model('iilscopusWebOfScience', schema);