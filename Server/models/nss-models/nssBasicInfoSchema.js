const mongoose = require('mongoose');

const nssBasicInfoSchema = new mongoose.Schema({ 
   studentName:{
    type: String,
    required: true
   }, 
   parentName:{
    type: String,
    required: true
   }, 
   gender:{
    type: String,
    required: true
   },
   state:{
    type: String,
    required: false
   }, 
   distric:{
    type: String,
    required: false
   }, 
   mobileNo:{
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
   createdByEmail:{ 
    type: String,
    required: true
   }, 
   otherAreaOfInterest:{
    type: String,
    required: true
   }, 
   dob:{
    type: String,
    required: true
   }

})

module.exports = mongoose.model('NssBasicInfo', nssBasicInfoSchema);