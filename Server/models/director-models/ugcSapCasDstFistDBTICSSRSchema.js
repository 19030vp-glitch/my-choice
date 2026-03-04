const mongoose = require('mongoose');

const ugcSapCasDstFistDBTICSSRSchema = new mongoose.Schema({
    Name_of_the_Scheme_Project_Endowments_Chairs: {
        type: String,
        required: true
    },
    Name_of_the_Principal_Investigator_Co_Investigator: {
        type: String,
        required: true
    },
    Name_of_the_Funding_agency: {
        type: String,
        required: true
    },
    Type_of_Agency: {
        type: String,
        required: true
    },
    Name_of_Department: {
        type: String,
        required: false
    },
    Year_of_Award: {
        type: String,
        required: true
    },
    Funds_provided_in_lakhs: {
        type: Number,
        required: true
    },
    Duration_of_the_project_in_Years: {
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

const UgcSapCasDstFistDBTICSSR = new mongoose.model('UgcSapCasDstFistDBTICSSR', ugcSapCasDstFistDBTICSSRSchema);

module.exports = UgcSapCasDstFistDBTICSSR;