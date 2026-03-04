const mongoose = require('mongoose');

const studentSatisfactionSurveySchema = new mongoose.Schema({
    Name_of_the_student: {
        type: String,
        required: true,
    },
    Year_of_joining: {
        type: String,
        required: true,
    },
    Category: {
        type: String,
        required: true,
    },
    State_of_Domicile: {
        type: String,
        required: true,
    },
    Nationality: {
        type: String,
        required: false,
    },
    Email_ID: {
        type: String,
        required: true,
    },
    Programme_name: {
        type: String,
        required: true,
    },
    Student_Unique_Enrolment_ID: {
        type: String,
        required: true,
    },
    Mobile_Number: {
        type: Number,
        required: true,
    },
    Gender: {
        type: String,
        required: true,
    },
    Upload_Proof: {
        type: String,
        required: false,
    },
    SchoolName: {
        type: String,
        required: true
    }

})

const StudentSatisfactionSurvey = new mongoose.model('StudentSatisfactionSurvey', studentSatisfactionSurveySchema);

module.exports = StudentSatisfactionSurvey;