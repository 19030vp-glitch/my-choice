const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    submitted: {
        type: [{ type: String }],
        require: false,
        default: [],
    },
    college: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

}, { timestamps: true });

module.exports = mongoose.model('yfSubmitted', schema);