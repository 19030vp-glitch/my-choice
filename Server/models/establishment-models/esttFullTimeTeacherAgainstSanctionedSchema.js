const mongoose = require("mongoose");

const esttFullTimeTeacherAgainstSanctionedSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    pan: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    yearOfAppointment: {
      type: Number,
      required: true,
    },
    natureOfAppointment: {
      type: String,
      required: true,
    },
    departmentName: {
      type: String,
      required: true,
    },
    experienceInYears: {
      type: Number,
      required: true,
    },
    stillWorking: {
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

module.exports = mongoose.model("esttFullTimeTeacherAgainstSanctioned",esttFullTimeTeacherAgainstSanctionedSchema);
