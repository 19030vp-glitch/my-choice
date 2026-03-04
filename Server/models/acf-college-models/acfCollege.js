const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema({
  collegeName: {
    type: "string",
    required: true,
  },
  principalName: {
    type: "string",
    required: true,
  },
  district: {
    type: "string",
    required: false,
  },
  collegeCode: {
    type: "string",
    required: true,
  },
  email: {
    type: "string",
    required: true,
  },
  address: {
    type: "string",
    required: false,
  },
  mobile: {
    type: "string",
    required: true,
  },
  programsOffered: {
    type: Array,
    required: true,
  },
  password: {
    type: "string",
    required: true,
  },
  collegeCodeHash: {
    type: "string",
    required: true,
  },
  isSubmitted: {
    type: Array,
    required: false,
    default: []
  }
});

module.exports = new mongoose.model("acfcolleges", collegeSchema);
