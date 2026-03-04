const mongoose = require('mongoose');

const AAASchema = new mongoose.Schema({

    schoolName: {
        type: String,
        required: true,
    },
    submitted: {
        type: [{ type: String }],
        require: false,
        default: [],
    },
    AAAData: {
        type: [{ type: String }],
        required: true,
    }

}, { timestamps: true });

module.exports = mongoose.model('academicAudit', AAASchema);