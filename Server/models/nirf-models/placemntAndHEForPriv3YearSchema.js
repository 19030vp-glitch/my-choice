const  mongoose = require('mongoose');

const placemntAndHEForPriv3YearSchema = new mongoose.Schema({
    noOfIntake: {
        type: Number,
        required: true,
    },
    noOfAdmitted: {
        type: Number,
        required: true,
    },
    leteralEntry: {
        type: Number,
        required: false,
    },
    academicYear: {
        type: String,
        required: true,
    },
    noOfGraduating: {
        type: Number,
        required: true,
    },
    placed: {
        type: Number,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    salaryInWords: {
        type: String,
        required: false,
    },
    noOfHEStudents: {
        type: Number,
        required: true,
    },
    school: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    }, 
},{timestamps:true});

module.exports = mongoose.model('PlacemntAndHEForPriv3Year', placemntAndHEForPriv3YearSchema);