const mongoose = require('mongoose');

const degreeSchema = new mongoose.Schema({
    degreeName: {
        type: 'string',
        required: true,
    },
    title: {
        type: 'string',
        required: true,
    },
    subject: {
        type: 'string',
        required: true,
    },
    university: {
        type: 'string',
        required: true,
    },
    awardDate: {
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

module.exports = mongoose.model('degrees', degreeSchema);