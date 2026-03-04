const mongoose = require('mongoose');

const newsItemSchema = new mongoose.Schema({
    headline: {
        type: 'string',
        required: true,
    },
    date: {
        type: 'string',
        required: true,
    },
    desc: {
        type: 'string',
        required: false,
    },
    photoURL: {
        type: [{ type: String }],
        require: false,
        default: [],
    }

}, { timestamps: true });

module.exports = mongoose.model('news', newsItemSchema);