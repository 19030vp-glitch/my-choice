const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    UG3: {
        type: Object,
        required: false,
    },
    UG4: {
        type: Object,
        required: false,
    },
    UG5: {
        type: Object,
        required: false,
    },
    UG6: {
        type: Object,
        required: false,
    },
    PG1: {
        type: Object,
        required: false,
    },
    PG2: {
        type: Object,
        required: false,
    },
    PG3: {
        type: Object,
        required: false,
    },
    PG6: {
        type: Object,
        required: false,
    },
    schoolName: {
        type: String,
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model('nirfStudentIntake', schema);