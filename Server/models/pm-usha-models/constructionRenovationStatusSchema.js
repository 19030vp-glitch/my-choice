const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    tabId: {
        type: 'string',
        required: true,
    },
    title: {
        type: 'string',
        required: true,
    },
    infraId: {
        type: 'string',
        required: true,
    },
    status: {
        type: 'string',
        required: false,
        default: 'Not yet started',
    },
    statusInPercentage: {
        type: 'string',
        required: false,
        default: '0',
    },
    beforePhotos: {
        type: Array,
        required: false,
        default: []
    },
    ongoingPhotos: {
        type: Array,
        required: false,
        default: []
    },
    afterPhotos: {
        type: Array,
        required: false,
        default: []
    },
    landPhotos: {
        type: Object,
        required: false,
        default: {}
    },
    outcomes: {
        type: 'string',
        required: false,
    }


}, { timestamps: true });

module.exports = mongoose.model('constructionRenovationStatus', schema);