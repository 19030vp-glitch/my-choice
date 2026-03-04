const mongoose = require('mongoose');

const consultancySchema = new mongoose.Schema({

    cName: {
        type: 'string',
        required: true,
    },
    cProjectName: {
        type: 'string',
        required: true,
    },
    cAgency: {
        type: 'string',
        required: true,
    },
    cYear: {
        type: 'string',
        required: true,
    },
    revenue: {
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
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users"
    }

}, { timestamps: true });

module.exports = mongoose.model('consultancyServices', consultancySchema);