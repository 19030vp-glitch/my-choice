

const mongoose = require('mongoose');

const newProgramsSchema = new mongoose.Schema({
    programName: {
        type: String,
        required: true
    },
    programCode: {
        type: String,
        required: true
    },
    academicYear: {
        type: String,
        required: true
    },
    SchoolName: {
        type: String,
        required: true
    }

})

const NewPrograms = new mongoose.model('NewPrograms', newProgramsSchema);

module.exports = NewPrograms;