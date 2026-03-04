const mongoose = require('mongoose');

const yfStudentSchema = new mongoose.Schema({

    ParticpantName: {
        type: 'string',
        required: true,
    },
    permentAddress: {
        type: 'string',
        required: true,
    },
    mobileNo: {
        type: 'string',
        required: true,
    },
    gender: {
        type: 'string',
        required: true,
    },
    dob: {
        type: 'string',
        required: true
    },
    age: {
        type: 'string',
        required: true
    },
    bloodGroup: {
        type: 'string',
        required: true
    },
    academicYear: {
        type: 'string',
        required: true
    },
    photoURL: {
        type: 'string',
        required: false
    },
    competitions: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "yfCompetition"
        }],
        required: false
    },
    college: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "yfcolleges",
        required: true
    },

}, { timestamps: true });

module.exports = mongoose.model('yfstudent', yfStudentSchema);