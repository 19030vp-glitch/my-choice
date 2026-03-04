const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    designation: {
        type: 'string',
        required: true,
    },
    employerName: {
        type: 'string',
        required: true,
    },
    joiningDate: {
        type: 'string',
        required: true,
    },
    leavingDate: {
        type: 'string',
        required: false,
    },
    salaryWithGrade: {
        type: 'string',
        required: true,
    },
    leavingReason: {
        type: 'string',
        required: true,
    },
    proof: {
        type: 'string',
        required: false,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users"
    }

}, { timestamps: true });

module.exports = mongoose.model('appointmentHeldPrior', appointmentSchema);