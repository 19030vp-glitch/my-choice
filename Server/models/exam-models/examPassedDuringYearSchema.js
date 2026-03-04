const mongoose = require('mongoose');

const examPassedDuringYearSchema = new mongoose.Schema({

    programCode: {
        type: 'string',
        required: true,
    },
    programName: {
        type: 'string',
        required: true,
    },
    studentsAppeared: {
        type: 'string',
        required: true,
    },
    studentsPassed: {
        type: 'string',
        required: true,
    },
    academicYear: {
        type: 'string',
        required: true,
    },

}, { timestamps: true });

module.exports = mongoose.model('ExamPassedDuringYear', examPassedDuringYearSchema);