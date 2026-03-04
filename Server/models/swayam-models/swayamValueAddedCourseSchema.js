const mongoose = require('mongoose');

const swayamValueAddedCourseSchema = new mongoose.Schema({

    // year: "Academic Year", Proof: "Uploaded Proof"
    nameOfProgram: {
        type: 'string',
        required: true,
    },
    programCode: {
        type: 'string',
        required: true,
    },
    modeOfCourse: {
        type: 'string',
        required: true,
    },
    yearOfOffering: {
        type: 'string',
        required: true,
    },
    contactHours: {
        type: 'string',
        required: true,
    },
    studentsEnrolled: {
        type: 'number',
        required: true,
    },
    studentsCompleting: {
        type: 'number',
        required: true,
    },
    academicYear: {
        type: 'string',
        required: true,
    },
    proof: {
        type: 'string',
        required: false
    }

}, { timestamps: true });

module.exports = mongoose.model('swayamValueAddedCourse', swayamValueAddedCourseSchema);