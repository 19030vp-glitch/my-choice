const mongoose = require('mongoose');

const awardForExtensionActivitiesSchema = new mongoose.Schema({
    nameOfActivity: {
        type: 'string',
        required: true,
    },
    nameOfAward: {
        type: 'string',
        required: true,
    },
    nameOfGovBody: {
        type: 'string',
        required: true,
    },
    academicYear: {
        type: 'string',
        required: true,
    },
    Upload_Proof: {
        type: 'string',
        required: false
    }

}, { timestamps: true });

module.exports = mongoose.model('AwardForExtensionActivities', awardForExtensionActivitiesSchema);