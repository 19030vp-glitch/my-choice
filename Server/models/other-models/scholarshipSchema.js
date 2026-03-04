const mongoose = require("mongoose");

const scholarshipSchema = new mongoose.Schema(
  {
    academicYear: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    governmentStudnts: {
      type: String,
      required: true,
    },
    governmentAmount: {
      type: Number,
      required: true,
    },
    institutionStudnts: {
      type: String,
      required: true,
    },
    institutionAmount: {
      type: Number,
      required: true,
    },
    nonGovernmentStudnts: {
      type: String,
      required: true,
    },
    nonGovernmentAmount: {
      type: Number,
      required: true,
    },
    nonGovernmentNgo: {
      type: String,
      required: true,
    },
    proof: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("scholarship", scholarshipSchema);
