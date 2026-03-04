const mongoose = require('mongoose');

const reservedSeatsSchema = new mongoose.Schema({
    Academic_Year: {
        type: String,
        required: true
    },
    Program_Name: {
        type: String,
        required: true
    },
    NseSC: {
        type: Number,
        required: true
    },
    NseST: {
        type: Number,
        required: true
    },
    NseOBC: {
        type: Number,
        required: true
    },
    NseDivyngjan: {
        type: Number,
        required: true
    },
    NseGeneral: {
        type: Number,
        required: true
    },
    NseOthers: {
        type: Number,
        required: true
    },
    NsaSC: {
        type: Number,
        required: true
    },
    NsaST: {
        type: Number,
        required: true
    },
    NsaOBC: {
        type: Number,
        required: true
    },
    NsaDivyngjan: {
        type: Number,
        required: true
    },
    NsaGeneral: {
        type: Number,
        required: true
    },
    NsaOthers: {
        type: Number,
        required: true
    },
    Upload_Proof: {
        type: String,
        required: false
    },
    SchoolName: {
        type: String,
        required: true
    }

})

const ReservedSeats = new mongoose.model('ReservedSeat', reservedSeatsSchema);

module.exports = ReservedSeats;