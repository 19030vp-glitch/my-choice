const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    ug: {
        type: 'string',
        required: true,
    },
    pg: {
        type: 'string',
        required: true,
    },
    researchExperience: {
        type: 'string',
        required: true,
    },
    specialization: {
        type: 'string',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users"
    }



}, { timestamps: true });

module.exports = mongoose.model('experience', experienceSchema);