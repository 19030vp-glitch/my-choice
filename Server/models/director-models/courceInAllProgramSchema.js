const mongoose = require('mongoose');

const courceInAllProgramSchema = new mongoose.Schema({
    programName: {
        type: String,
        required: true
    },
    programCode: {
        type: String,
        required: true
    },
    courseCode: {
        type: String,
        required: true
    },
    courseName: {
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

const CourceInAllProgram = new mongoose.model('coursesinallprograms', courceInAllProgramSchema);

module.exports = CourceInAllProgram;