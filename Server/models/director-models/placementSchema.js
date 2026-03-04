const mongoose = require('mongoose');

const placementSchema = new mongoose.Schema({
    Name_of_student_placed: {
        type: String,
        required: true
    },
    Program_graduated_from: {
        type: String,
        required: false
    },
    Name_of_the_employer: {
        type: String,
        required: true
    },
    Employer_contact_details: {
        type: String,
        required: true
    },
    Pay_package_annum: {
        type: String,
        required: true
    },
    Academic_Year: {
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
    },
    AlumniId: {
        type: String,
        required: false
    },
    Type_Of_Placement: {
        type: String,
        required: false
    }

})


module.exports = mongoose.model('placement', placementSchema);