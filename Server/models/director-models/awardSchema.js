const mongoose = require('mongoose');

const awardSchema = new mongoose.Schema({
    Title_of_the_innovation: {
        type: String,
        required: true
    },
    Name_of_the_Award: {
        type: String,
        required: true
    },
    Year_of_Award: {
        type: String,
        required: true
    },
    Name_of_the_Awarding_Agency: {
        type: String,
        required: true
    },
    Contact_details_Agency: {
        type: String,
        required: true
    },
    Category: {
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
    }

})

const Award = new mongoose.model('Award', awardSchema);

module.exports = Award;