const  mongoose = require('mongoose');

const totalAnnualStudentStrengthSchema = new mongoose.Schema({
    UG3: {
        type: Object,
        required: false,
    },
    UG4: {
        type: Object,
        required: false,
    },
    UG5: {
        type: Object,
        required: false,
    },
    UG6: {
        type: Object,
        required: false,
    },
    PG1: {
        type: Object,
        required: false,
    },
    PG2: {
        type: Object,
        required: false,
    },
    PG3: {
        type: Object,
        required: false,
    },
    PGI: {
        type: Object,
        required: false,
    },
    PG6: {
        type: Object,
        required: false,
    },
    academicYear: {
        type: String,
        required: true,
    },
    school: {
        type: String,
        required: true,
    }, 
},{timestamps:true});

module.exports = mongoose.model('TotalAnnualStudentStrength', totalAnnualStudentStrengthSchema);