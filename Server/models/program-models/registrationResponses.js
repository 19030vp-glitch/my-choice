const mongoose = require('mongoose');

const programRegSchema = new mongoose.Schema({

    response: {
        type: 'string',
        required: true
    },
    program: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "programs"
    }

}, { timestamps: true });

module.exports = mongoose.model('programRegistrations', programRegSchema);