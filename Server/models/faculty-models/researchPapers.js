const mongoose = require('mongoose');

const researchPapersSchema = new mongoose.Schema({
    paperTitle: {
        type: 'string',
        required: true,
    },
    journalName: {
        type: 'string',
        required: true,
    },
    publicationYear: {
        type: 'string',
        required: true,
    },
    issnNumber: {
        type: 'string',
        required: true,
    },
    authors: {
        type: 'string',
        required: false,
    },
    indexedIn: {
        type: 'string',
    },
    indexData: {
        type: [{ type: String }],
    },
    indexLink: {
        type: 'string',
    },
    indexLinkData: {
        type: { type: String },
    },
    year: {
        type: 'string',
        required: true,
    },
    proof: {
        type: 'string',
        required: false,
    },
    studentId: {
        type: 'string',
        required: false,
    },
    schoolName: {
        type: 'string',
        required: false
    },
    impactFactor: {
        type: 'string',
        required: true,
        default: 'N/A'
    },
    isIFActive: {
        type: Boolean,
        required: true,
        default: false
    },
    ifProof: {
        type: 'string',
        required: false,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "users"
    }

}, { timestamps: true });

module.exports = mongoose.model('researchPapers', researchPapersSchema);