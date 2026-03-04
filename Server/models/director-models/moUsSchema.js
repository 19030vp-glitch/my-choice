const mongoose = require('mongoose');

const moUsSchema = new mongoose.Schema({
    Name_of_Organisation_with_whome_mou_signed: {
        type: String,
        required: true
    },
    Duration_of_MoU: {
        type: String,
        required: true
    },
    Year_of_signing_MoU: {
        type: String,
        required: true
    },
    otherUser: {
        type: String,
        required: false
    },
    Upload_Proof: {
        type: String,
        required: false
    },
    SchoolName: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "users"
    }

})

const MoUs = new mongoose.model('MoU', moUsSchema);

module.exports = MoUs;