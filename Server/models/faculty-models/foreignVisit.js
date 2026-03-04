const mongoose = require('mongoose');

const foreignVisitSchema = new mongoose.Schema({

    purposeOfVisit: {
        type: 'string',
        required: true,
    },
    nameOfTheInstitutionVisited: {
        type: 'string',
        required: true,
    },
    fromDate: {
        type: 'string',
        required: true,
    },
    toDate: {
        type: 'string',
        required: true,
    },
    year: {
        type: 'string',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users"
    }

}, { timestamps: true });

module.exports = mongoose.model('foreignVisit', foreignVisitSchema);