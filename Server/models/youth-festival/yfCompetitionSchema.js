const mongoose = require('mongoose');

const yfCompetitionSchema = new mongoose.Schema({
    competitionName: {
        type: String,
        required: true,
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "yfstudent",
        required: true
    }],
    isGroup: {
        type: Boolean,
        default: true,
        required: true
    },
    academicYear: {
        type: String,
        required: true
    },
    college: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "yfcolleges",
        required: true
    },

}, { timestamps: true });

module.exports = mongoose.model('yfCompetition', yfCompetitionSchema);