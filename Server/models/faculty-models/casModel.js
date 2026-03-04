const mongoose = require('mongoose');

const casReportSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },
    submitted: {
        type: [{ type: String }],
        require: false,
        default: [],
    },
    stage1: {
        type: 'string',
        required: false,
    },
    stage2: {
        type: 'string',
        required: false,
    },
    stage3: {
        type: 'string',
        required: false,
    },
    stage4: {
        type: 'string',
        required: false,
    },
    stage5: {
        type: 'string',
        required: false,
    },
    casDuration: {
        type: 'string',
        required: false,
    },
    casData: {
        type: [{ type: String }],
        required: true,
    }

}, { timestamps: true });

module.exports = mongoose.model('cas', casReportSchema);