const mongoose = require('mongoose');

  const maintenanceAndInfrastructureSchema = new mongoose.Schema({
      academicYear: {
          type: String,
          required: true
      }
,governmentAgencyName: {
          type: String,
          required: true
      }
,nonGovernmentAgencyName: {
          type: String,
          required: true
      }
,grantPurpose: {
          type: String,
          required: true
      }
,fundsReseived: {
          type: Number,
          required: true
      }

      ,proof: {
          type: String,
          required: false
      },
  },{timestamps: true})
  
  module.exports = mongoose.model('maintenanceAndInfrastructure', maintenanceAndInfrastructureSchema);