const mongoose = require('mongoose');

const conferencesSemiWorkshopOrganizedSchema = new mongoose.Schema({
    Year: {
        type: String,
        required: false
    },
    From_Date: {
        type: String,
        required: false
    },
    To_Date: {
        type: String,
        required: false
    },
    Title_Of_the_Program: {
        type: String,
        required: true
    },
    Number_of_Participants: {
        type: Number,
        required: true
    },
    Level_of_program: {
        type: String,
        required: false
    },
    Upload_Proof: {
        type: String,
        required: false
    },
    SchoolName: {
        type: String,
        required: true
    },
    fundedBy: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "users"
    }
})

const ConferencesSemiWorkshopOrganized = new mongoose.model('ConferencesSemiWorkshopOrganized', conferencesSemiWorkshopOrganizedSchema);

module.exports = ConferencesSemiWorkshopOrganized;