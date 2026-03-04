const mongoose = require('mongoose');

const progressionToHESchema = new mongoose.Schema({
    Name_of_student_enrolling: {
        type: String,
        required: true
    },
    Program_graduated_from: {
        type: String,
        required: false
    },
    Name_of_institution_admitted: {
        type: String,
        required: true
    },
    Name_of_programme_admitted: {
        type: String,
        required: true
    },
    Academic_Year: {
        type: String,
        required: false
    },
    Upload_Proof: {
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
    },
    AlumniId: {
        type: String,
        required: false
    }

})

const ProgressionToHE = new mongoose.model('ProgressionToHE', progressionToHESchema);

module.exports = ProgressionToHE;