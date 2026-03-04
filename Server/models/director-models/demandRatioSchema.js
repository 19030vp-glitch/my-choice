const mongoose = require('mongoose');

const demandRatioSchema = new mongoose.Schema({

    Programme_Code: {
        type: String,
        required: true
    },
    Programme_name: {
        type: String,
        required: true
    },
    Academic_Year: {
        type: String,
        required: false
    },
    Number_of_seats_available: {
        type: Number,
        required: true
    },
    Number_of_eligible_applications: {
        type: Number,
        required: true
    },
    Number_of_Students_admitted: {
        type: Number,
        required: true
    },
    Type_of_program: {
        type: String,
        required: false
    },
    otherUser: {
        type: String,
        required: false
    },
    Upload_Proof:{
        type: String,
        required: false
    },
    SchoolName: {
        type: String,
        required: true
    }

})

const DemandRatio = new mongoose.model('DemandRatio', demandRatioSchema);

module.exports = DemandRatio;