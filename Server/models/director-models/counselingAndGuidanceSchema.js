const mongoose = require('mongoose');

const counselingAndGuidanceSchema = new mongoose.Schema({
    Name_of_the_Activity_conducted_by_the_HEI: {
        type: String,
        required: true
    },
    Number_of_Students_Attended: {
        type: Number,
        required: true
    },
    activityType: {
        type: String,
        required: true
    },
    Upload_Proof: {
        type: String,
        required: false
    },
    Year_of_Activity: {
        type: String,
        required: false
    },
    otherUser: {
        type: String,
        required: false
    },
    SchoolName: {
        type: String,
        required: true
    }

})

const CounselingAndGuidance = new mongoose.model('CounselingAndGuidance', counselingAndGuidanceSchema);

module.exports = CounselingAndGuidance;