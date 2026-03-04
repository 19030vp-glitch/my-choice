const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    academicYear: {
        type: 'string',
        required: true,
    },
    userType: {
        type: 'string',
        required: true,
    },
    matterType: {
        type: 'string',
        required: true,
    },
    school: {
        type: 'string',
        required: false,
    },
    matter: {
        type: 'string',
        required: false,
        default: null
    },
})

module.exports = mongoose.model('aqarMatter', schema);
