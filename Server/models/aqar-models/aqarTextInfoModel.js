const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    academicYear: {
        type: 'string',
        required: true,
    },
    tableId: {
        type: 'string',
        required: true,
    },
    tableData: {
        type: 'string',
        required: true,
    },
    school: {
        type: 'string',
        required: true,
    }
})

module.exports = mongoose.model('aqarTextInfo', schema);
