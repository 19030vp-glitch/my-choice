const mongoose = require('mongoose');

const uniqueVisitorSchema = new mongoose.Schema({
    id: { type: String, unique: false, required: true },
});

module.exports = mongoose.model('UniqueVisitor', uniqueVisitorSchema);
