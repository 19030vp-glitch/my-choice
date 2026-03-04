const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    report: {
        type: Object,
        require: false,
        default: {},
    }

}, { timestamps: true });

module.exports = mongoose.model('dashboardData', schema);