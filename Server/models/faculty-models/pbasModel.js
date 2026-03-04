const mongoose = require('mongoose');

const pbasReportSchema = new mongoose.Schema({

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
    casData: {
        type: [{ type: String }],
        required: true,
    }

}, { timestamps: true });

module.exports = mongoose.model('pbas', pbasReportSchema);