const mongoose = require('mongoose');

const programPhotosSchema = new mongoose.Schema({

    photoURL: {
        type: 'string',
        required: true,
    },
    caption: {
        type: 'string',
        required: false,
    },

}, { timestamps: true });

module.exports = mongoose.model('programPhotos', programPhotosSchema);