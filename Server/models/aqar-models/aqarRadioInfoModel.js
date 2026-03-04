const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    academicYear: {
        type: 'string',
        required: true,
    },
    radioId: {
        type: 'string',
        required: true,
    },
    radioInfo: {
        type: 'string',
        required: true,
    },
    school: {
        type: 'string',
        required: true,
    }
})

module.exports = mongoose.model('aqarRadioInfo', schema);
