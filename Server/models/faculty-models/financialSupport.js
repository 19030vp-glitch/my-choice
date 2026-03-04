const mongoose = require('mongoose');

const financialsupportSchema = new mongoose.Schema({

    nameOfConference: {
        type: 'string',
        required: true,
    },
    feeprovider: {
        type: 'string',
        required: true,
    },
    amountOfSupport: {
        type: 'Number',
        required: true,
    },
    pan: {
        type: 'string',
        required: true,
    },
    year: {
        type: 'string',
        required: true,
    },
    proof: {
        type: 'string',
        required: false,
    },
    studentId:{
        type: 'string',
        required: false,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users"
    }

}, { timestamps: true });

module.exports = mongoose.model('financialsupport', financialsupportSchema);