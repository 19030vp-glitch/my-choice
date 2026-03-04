const mongoose = require('mongoose');

const postHeldSchema = new mongoose.Schema({
    designation: {
        type: 'string',
        required: true,
    },
    userDepartment: {
        type: 'string',
        required: false,
    },
    duration: {
        type: 'string',
        required: false,
    },
    durationYears: {
        type: [{ type: String }],
        require: false,
        default: [],
    },
    active: {
        type: 'boolean',
        required: false,
    },
    level: {
        type: 'string',
        required: false,
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

module.exports = mongoose.model('postHeld', postHeldSchema);