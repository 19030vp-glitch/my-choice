const mongoose = require("mongoose");

const acfDetailsSchema = new mongoose.Schema({
  collegeCode: {
    type: String,
    required: true,
  },
  programName: {
    type: String,
    required: true,
  },
  academicYear: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
    ref: "acfcolleges",
  },
  courseName: {
    type: Number,
    required: true,
  },
  subjectFees: {
    type: Number,
    required: true,
  },
  annualConsultingFees: {
    type: Number,
    required: true,
  },
  proposalFees: {
    type: Number,
    required: true,
  },
  proof: {
    type: String,
    required: false,
  },
  
},{ timestamps: true });

module.exports = mongoose.model("acfDetails", acfDetailsSchema);
