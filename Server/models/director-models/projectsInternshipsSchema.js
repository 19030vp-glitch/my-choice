const mongoose = require('mongoose');

const projectsInternshipsSchema = new mongoose.Schema({

    Programme_Code: {
        type: String,
        required: true
    },
    Programme_name: {
        type: String,
        required: true
    },
    Name_of_the_student: {
        type: String,
        required: true
    },
    Upload_Proof: {
        type: String,
        required: false
    },
    Academic_Year: {
        type: String,
        required: false
    },
    SchoolName: {
        type: String,
        required: true
    }

})

const ProjectsInternships = new mongoose.model('ProjectsInternship', projectsInternshipsSchema);

module.exports = ProjectsInternships;