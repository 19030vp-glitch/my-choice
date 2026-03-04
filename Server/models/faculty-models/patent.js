const mongoose = require('mongoose');

const patentSchema = new mongoose.Schema({

    type: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    patenterName: {
        type: String,
        required: true,
    },
    patentNumber: {
        type: String,
        required: true,
    },
    patentTitle: {
        type: String,
        required: true,
    },
    isNat: {
        type: String,
        required: true,
    },
    awardYear: {
        type: String,
        required: true,
    },
    fieldDate: {
        type: String,
        required: false
    },
    publishedDate: {
        type: String,
        required: false
    },
    year: {
        type: String,
        required: true,
    },
    proof: {
        type: String,
        required: false,
    },
    studentId:{
        type: String,
        required: false,
    },
    schoolName: {
        type: String,
        required: false
    },
    guideName: {
        type: String,
        required: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "users"
    }

}, { timestamps: true });

module.exports = mongoose.model('patent', patentSchema);