const mongoose = require('mongoose');

const subscriptionForKRCSchema = new mongoose.Schema({
 
    libraryResources: {
        type: 'string',
        required: true,
    },
    eBooks: {
        type: 'string',
        required: true,
    },
    eResources: {
        type: 'string',
        required: true,
    },
    academicYear: {
        type: 'string',
        required: true,
    },
    proof: {
        type: 'string',
        required: false
    }

}, { timestamps: true });

module.exports = mongoose.model('SubscriptionForKRC', subscriptionForKRCSchema);