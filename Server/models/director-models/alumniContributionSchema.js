const mongoose = require('mongoose');

const alumniContributionSchema = new mongoose.Schema({
    Name_of_The_Alumni_Contributed: {
        type: String,
        required: true
    },
    Program_graduated_from: {
        type: String,
        required: true
    },
    Amount_of_contribution: {
        type : Number,
        required: true
    },
    Upload_Proof: {
        type: String,
        required: false
    },
    Academic_Year: {
        type: String,
        required: true
    },
    SchoolName: {
        type: String,
        required: true
    },
    AlumniId: {
        type: String,
        required: false
    }

})

const AlumniContribution = new mongoose.model('AlumniContribution', alumniContributionSchema);

module.exports = AlumniContribution;