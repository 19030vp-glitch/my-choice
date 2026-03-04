const mongoose = require('mongoose');

const researchMethodologyWorkshopsSchema = new mongoose.Schema({
    Name_of_the_workshop_seminar: {
        type: String,
        required: true
    },
    Number_of_Participants: {
        type: Number,
        required: true
    },
    year: {
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
    otherUser: {
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
    }

})

const ResearchMethodologyWorkshops = new mongoose.model('ResearchMethodologyWorkshop', researchMethodologyWorkshopsSchema);

module.exports = ResearchMethodologyWorkshops;