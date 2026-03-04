const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        studentData: {
            type: Object,
            required: true,
        },
        totalValues: {
            type: Object,
            required: true,
        },
        year: {
            type: "string",
            required: true,
        },
        schoolName: {
            type: "string",
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("studentInformation", schema);
