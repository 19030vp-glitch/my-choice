const mongoose = require('mongoose');

const ictClassroomsSchema = new mongoose.Schema({
    Room_number_or_Name_of_Classrooms:{
        type:String,
        required:true
    },
    Type_of_ICT_facility:{
        type: String,
        required:true
    },
    academicYear:{
        type: String,
        required:true
    },
    Upload_Proof:{
        type:String,
        required:false
    },
    SchoolName: {
        type: String,
        required: true
    }
})

const IctClassroom = new mongoose.model('IctClassroom', ictClassroomsSchema);

module.exports = IctClassroom;