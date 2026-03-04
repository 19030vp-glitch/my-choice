const mongoose = require('mongoose');

const jrfsrfSchema = new mongoose.Schema({

    researchName: {
        type: String,
        required: true,
    },
    enrolmentYear: {
        type: String,
        required: false,
    },
    fellowshipDuration: {
        type: String,
        required: true,
    },
    fellowshipType: {
        type: String,
        required: true,
    },
    fellowshipDate: {
        type: String,
        required: false,
    },
    grantingAgency: {
        type: String,
        required: true,
    },
    qualifyingExam: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    proof: {
        type: String,
        required: false,
    },
    studentId:{
        type: String,
        required: false,
    },
    schoolName: {
        type: String,
        required: false,
    },
    guideName: {
        type: String,
        required: false,
    },
    otherUser: {
        type: String,
        required: false,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "users"
    },

}, { timestamps: true });

module.exports = mongoose.model('jrfsrf', jrfsrfSchema);