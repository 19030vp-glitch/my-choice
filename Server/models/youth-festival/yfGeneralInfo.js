const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    academicYear: {
        type: 'string',
        required: true,
    },
    college: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "yfcolleges"
    },
    info: {
        type: 'string',
        required: true,
    }
})

module.exports = new mongoose.model('yfGeneralInfo', schema);