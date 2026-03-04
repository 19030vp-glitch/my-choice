const mongoose = require('mongoose');

const isRegistrationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
      idObject: {
        type: Object,
        required: true
      }
})

const IsRegistration = new mongoose.model('IsRegistration', isRegistrationSchema);

module.exports = IsRegistration;