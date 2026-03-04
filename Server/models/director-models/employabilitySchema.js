const mongoose = require('mongoose');

const employabilitySchema = new mongoose.Schema({

    Course_Code: {
        type: String,
        required: true
    },
    Name_of_the_Course: {
        type: String,
        required: true
    },
    Academic_Year: {
        type: String,
        required: false
    },
    Year_of_introduction: {
        type: Number,
        required: false
    },
    Activities_Content_with_direct_bearing_on_Employability_Entrepreneurship_Skill_development: {
        type: String,
        required: true
    },
    Program_Name:{
        type: String,
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

const Employability = new mongoose.model('Employability', employabilitySchema);

module.exports = Employability;