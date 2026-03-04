const mongoose = require('mongoose');

const xyzSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    rollNo: {
        type: String,
        required: true
    }
})

const Xyz = new mongoose.model('Xyz', xyzSchema);

module.exports = Xyz;