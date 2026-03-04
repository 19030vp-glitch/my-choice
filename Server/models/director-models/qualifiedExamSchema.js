const mongoose = require('mongoose');

const qualifiedExamSchema = new mongoose.Schema({
    Acadmic_year: {
        type: String,
        required: false
    },
    Registration_number_roll_number: {
        type: String,
        required: true
    },
    Names_of_students_selected_qualified: {
        type: String,
        required: true
    },
    Name_of_the_Exam: {
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
    }

})

const QualifiedExam = new mongoose.model('QualifiedExam', qualifiedExamSchema);

module.exports = QualifiedExam;