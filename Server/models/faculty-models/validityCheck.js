const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "users",
        unique: true
    },
    ResearchPaper: {
        type: Boolean,
        default: false,
        required: false
    },
    PostHeld: {
        type: Boolean,
        default: false,
        required: false
    },
    Lectures: {
        type: Boolean,
        default: false,
        required: false
    },
    ConferencesSemiWorkshopOrganized: {
        type: Boolean,
        default: false,
        required: false
    },
    Responsibilities: {
        type: Boolean,
        default: false,
        required: false
    },
    ResearchProject: {
        type: Boolean,
        default: false,
        required: false
    },
    PGDessertation: {
        type: Boolean,
        default: false,
        required: false
    },
    ResearchGuidance: {
        type: Boolean,
        default: false,
        required: false
    },
    EContentDeveloped: {
        type: Boolean,
        default: false,
        required: false
    },
    InvitedTalk: {
        type: Boolean,
        default: false,
        required: false
    },
    JrfSrf: {
        type: Boolean,
        default: false,
        required: false
    },
    Qualification: {
        type: Boolean,
        default: false,
        required: false
    },
    Degree: {
        type: Boolean,
        default: false,
        required: false
    },
    AppointmentsHeldPrior: {
        type: Boolean,
        default: false,
        required: false
    },
    Online: {
        type: Boolean,
        default: false,
        required: false
    },
    FinancialSupport: {
        type: Boolean,
        default: false,
        required: false
    },
    Patent: {
        type: Boolean,
        default: false,
        required: false
    },
    ConsultancyServices: {
        type: Boolean,
        default: false,
        required: false
    },
    Collaboration: {
        type: Boolean,
        default: false,
        required: false
    },
    AwardRecognition: {
        type: Boolean,
        default: false,
        required: false
    },
    Fellowship: {
        type: Boolean,
        default: false,
        required: false
    },
    PolicyDocuments: {
        type: Boolean,
        default: false,
        required: false
    },
    ForeignVisit: {
        type: Boolean,
        default: false,
        required: false
    },
    PublicationCitation: {
        type: Boolean,
        default: false,
        required: false
    },


}, { timestamps: true });

module.exports = mongoose.model('facultyValidityCheck', schema);