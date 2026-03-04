const mongoose = require('mongoose');

const aqarSchema = new mongoose.Schema({

    submitted: {
        type: [{ type: String }],
        require: false,
        default: [],
    },

}, { timestamps: true });

module.exports = mongoose.model('iilAqar', aqarSchema);