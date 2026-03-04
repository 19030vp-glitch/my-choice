const mongoose = require("mongoose");

const iqacInstitutionQualityAssuranceSchema = new mongoose.Schema(
    {
        academicYear: {
            type: String,
            required: true,
        },
        conferncesSeminarsWorkshops: {
            type: String,
            required: true,
        },
        aaaFollowUp: {
            type: String,
            required: true,
        },
        participationNIRF: {
            type: String,
            required: true,
        },
        iSOCertification: {
            type: String,
            required: true,
        },
        nBAOtherCertification: {
            type: String,
            required: true,
        },
        collaborativeQuality: {
            type: String,
            required: true,
        },
        from: {
            type: String,
            required: true,
        },
        to: {
            type: String,
            required: true,
        },

        proof: {
            type: String,
            required: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model(
    "iqacInstitutionQualityAssurance",
    iqacInstitutionQualityAssuranceSchema
);
