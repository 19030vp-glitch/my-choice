const mongoose = require('mongoose');

const valueAddedCourceSchema = new mongoose.Schema({
    Name_of_the_value_added_courses_offered: {
        type: String,
        required: true
    },
    Course_Code_if_any: {
        type: String,
        required: false
    },
    Academic_year: {
        type: String,
        required: true
    },
    Year_of_offering: {
        type: Number,
        required: true
    },
    Program_Name:{
        type: String,
        required: true
    },
    No_of_times_offered_during_the_same_year: {
        type: Number,
        required: true
    },
    Duration_of_the_course: {
        type: Number,
        required: true
    },
    Number_of_students_enrolled: {
        type: Number,
        required: true
    },
    Number_of_Students_completing_the_course: {
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

const ValueAddedCource = new mongoose.model('ValueAddedCource', valueAddedCourceSchema);

module.exports = ValueAddedCource;