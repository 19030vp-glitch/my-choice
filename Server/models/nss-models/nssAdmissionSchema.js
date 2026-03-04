const mongoose = require('mongoose');

const nssAdmissionSchema = new mongoose.Schema({
   studentName:{
    type: String,
    required: true
   }, 
   classes:{
    type: String,
    required: true
   }, 
   caste:{
    type: String,
    required: true
   },
   category:{
    type: String,
    required: true
   }, 
   nss1Year:{
    type: Number,
    required: true
   }, 
   nss2Year:{
    type: Number,
    required: true
   }, 
   address:{
    type: String,
    required: true
   }, 
   email:{
    type: String,
    required: true
   }, 
   projectName:{ 
    type: String,
    required: true
   }, 
   bloodGroup:{
    type: String,
    required: true
   }, 
   dob:{
    type: String,
    required: true
   }

})

module.exports = mongoose.model('NssAdmission', nssAdmissionSchema);