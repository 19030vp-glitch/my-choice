const mongoose = require('mongoose');

const trainingProgramsOrganizedSchema = new mongoose.Schema({
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
    Type_of_staff: {
        type: String,
        required: false
    },
    Number_of_Participants: {
        type: Number,
        required: true
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

const TrainingProgramsOrganized = new mongoose.model('TrainingProgramsOrganized', trainingProgramsOrganizedSchema);

module.exports = TrainingProgramsOrganized;