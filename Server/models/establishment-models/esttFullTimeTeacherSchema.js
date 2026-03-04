const mongoose = require("mongoose");

const esttFullTimeTeacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    idNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    natureOfPost: {
      type: String,
      required: true,
    },
    dateOfJoining: {
      type: String,
      required: true,
    },
    academicYear: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("esttFullTimeTeacher", esttFullTimeTeacherSchema );
