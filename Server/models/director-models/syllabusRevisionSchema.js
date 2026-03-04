const mongoose = require('mongoose');

const syllabusRevisionSchema = new mongoose.Schema({
    Programme_Code: {
        type: String,
        required: true
    },
    Programme_Name: {
        type: String,
        required: true
    },
    Academic_Year: {
        type: String,
        required: true
    },
    Year_of_Introduction: {
        type: Number,
        required: true
    },
    Status_of_implementation: {
        type: String,
        required: true
    },
    Year_of_Implimentation: {
        type: Number,
        required: true
    },
    Year_of_Revision: {
        type: Number,
        required: true
    },
    Percentage_of_content_added_or_replaced: {
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

const SyllabusRevision = new mongoose.model('SyllabusRevision', syllabusRevisionSchema);

module.exports = SyllabusRevision;