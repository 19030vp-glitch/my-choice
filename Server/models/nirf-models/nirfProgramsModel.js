const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    programs: {
        type: [{ type: String }],
        require: false,
        default: [],
    },
    schoolName: {
        type: String,
        required: true
    },
    academicYear: {
        type: String,
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model('nirfPrograms', schema);