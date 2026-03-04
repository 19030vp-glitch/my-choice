const mongoose = require('mongoose');

const studentUserSchema = new mongoose.Schema({

    isAlumni: {
        type: 'boolean',
        required: false,
    },
    isActiveStudent: {
        type: 'boolean',
        required: false,
    },
    salutation: {
        type: 'string',
        required: false,
    },
    photoURL: {
        type: 'string',
        required: false,
    },
    uploadProof: {
        type: 'string',
        required: false,
    },
    name: {
        type: 'string',
        required: false,
    },
    email: {
        type: 'string',
        required: false,
    },
    address: {
        type: 'string',
        required: false,
    },
    dob: {
        type: 'string',
        required: false,
    },
    mobile: {
        type: 'string',
        required: false,
    },
    programGraduated: {
        type: 'string',
        required: false,
    },
    programEnroledOn: {
        type: 'string',
        required: false,
    },
    programCompletedOn: {
        type: 'string',
        required: false,
    },
    cast: {
        type: 'string',
        required: false,
    },
    religion: {
        type: 'string',
        required: false,
    },
    country: {
        type: 'string',
        required: false,
    },
    eligibility: {
        type: 'string',
        required: false,
    },
    schoolName: {
        type: 'string',
        required: false,
    },
    currentIn: {
        type: 'string',
        required: false,
    },
    gender: {
        type: 'string',
        required: false,
    },
    password: {
        type: 'string',
        required: false
    },
    abcNo: {
        type: 'string',
        required: false,
    },
    doCompletion: {
        type: 'string',
        required: false,
    },
    alumniProof: {
        type: 'string',
        required: false,
    },
    ResearchGuide: {
        type: 'string',
        required: false,
    },
    Title: {
        type: 'string',
        required: false,
    },
    dateOfRac: {
        type: 'string',
        required: false,
    },
    ReceivesFelloship: {
        type: 'string',
        required: false,
    },
    ResearchGuideId: {
        type: 'string',
        required: false,
    },
    isCreatedByDirector: {
        type: 'boolean',
        required: false,
        default: false,
    },

})

const StudentUser = new mongoose.model('StudentUser', studentUserSchema);

module.exports = StudentUser;
