const mongoose = require('mongoose');
const skillsEnhancementInitiativesSchema = new mongoose.Schema({
    Name_of_the_capacity_development_schemes: {
        type: String,
        required: true
    },
    Academic_Year: {
        type: String,
        required: true
    },
    Date_of_implementation: {
        type: String,
        required: false
    },
    Number_of_students_enrolled: {
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

const SkillsEnhancementInitiatives = new mongoose.model('SkillsEnhancementInitiative', skillsEnhancementInitiativesSchema);

module.exports = SkillsEnhancementInitiatives;
