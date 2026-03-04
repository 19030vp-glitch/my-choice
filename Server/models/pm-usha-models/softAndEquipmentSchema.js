const mongoose = require('mongoose');

const softAndEquipmentSchema = new mongoose.Schema({

    outCome: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    proof: {
        type: String,
        required: false,
    },
    proof2: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        required: true,
    },
    subType: {
        type: String,
        required: true,
    },
    event: {
        type: String,
        required: false,
    },
    activity: {
        type: String,
        required: false,
    },
    centerName: {
        type: String,
        required: false,
    },
    coordinater: {
        type: String,
        required: false,
    },
    noOfStudentBeneficiary: {
        type: Number,
        required: false,
    },
    noOfFacultyBeneficiary: {
        type: Number,
        required: false,
    },
    objective: {
        type: String,
        required: false,
    },
    From_Date: {
        type: String,
        required: false,
    },
    To_Date: {
        type: String,
        required: false,
    },
    durationInDays: {
        type: Number,
        required: false,
    },
    elementId: {
        type: Number,
        required: true,
    },
    // academicYear: {
    //     type: String,
    //     required: true,
    // },

}, { timestamps: true });

module.exports = mongoose.model('softAndEquipment', softAndEquipmentSchema);