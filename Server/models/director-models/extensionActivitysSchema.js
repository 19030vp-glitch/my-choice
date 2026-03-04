const mongoose = require('mongoose');

const extensionActivitysSchema = new mongoose.Schema({

    Name_of_the_activity: {
        type: String,
        required: true
    },
    Organising_unit: {
        type: String,
        required: true
    },
    Name_of_the_scheme: {
        type: String,
        required: true
    },
    Year_of_activity: {
        type: String,
        required: false
    },
    Number_of_students:{
        type: Number,
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

const ExtensionActivity = new mongoose.model('ExtensionActivity', extensionActivitysSchema);

module.exports = ExtensionActivity;