const mongoose = require('mongoose');

const phdAwardedSchema = new mongoose.Schema({

    scholarName: {
        type: String,
        required: true,
    },
    departmentName: {
        type: String,
        required: true,
    },
    guideName: {
        type: String,
        required: true,
    },
    degreeName: {
        type: String,
        required: true,
    },
    awardSubmit: {
        type: String,
        required: true,
    },
    thesisTitle: {
        type: String,
        required: true,
    },
    yearOfScholar: {
        type: String,
        required: false,
    },
    rac: {
        type: String,
        required: false,
    },
    gender: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    phdAwardYear: {
        type: String,
        required: false,
    },
    otherUser: {
        type: String,
        required: false,
    },
    year: {
        type: String,
        required: true,
    },
    proof: {
        type: String,
        required: false,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "users"
    }

}, { timestamps: true });

module.exports = mongoose.model('phdAwarded', phdAwardedSchema);