const mongoose = require('mongoose');

const policyDocumentsSchema = new mongoose.Schema({

    policyName: {
        type: 'string',
        required: true,
    },
    organizationName: {
        type: 'string',
        required: true,
    },
    isNat: {
        type: 'string',
        required: true,
    },
    year: {
        type: 'string',
        required: true,
    },
    proof: {
        type: 'string',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users"
    }

}, { timestamps: true });

module.exports = mongoose.model('policyDocuments', policyDocumentsSchema);