const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({

    collegeName: {
        type: 'string',
        required: true,
    },
    principalName: {
        type: 'string',
        required: true,
    },
    district: {
        type: 'string',
        required: false,
    },
    collegeCode: {
        type: 'string',
        required: false,
    },
    email: {
        type: 'string',
        required: true,
    },
    address: {
        type: 'string',
        required: false,
    },
    mobile: {
        type: 'string',
        required: true,
    },
    password: {
        type: 'string',
        required: true
    },
})

module.exports = new mongoose.model('yfcolleges', collegeSchema);