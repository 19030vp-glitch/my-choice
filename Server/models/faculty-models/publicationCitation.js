const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    citationData: {
      type: Object,
      required: true,
    },
    year: {
      type: "string",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("publicationCitation", schema);
