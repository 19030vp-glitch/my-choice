const mongoose = require('mongoose');

const swayamDetailsOfOnlineCoursesSchema = new mongoose.Schema({
    portalName: {
        type: String,
        required: true
    }, 
    offeredOnlineCourses: {
        type: Number,
        required: true
    },
    onlineCoursesWhichTrasperedCredit: {
        type: Number,
        required: true
    },
    creditsTransferredToTranscript: {
        type: Number,
        required: true
    },
    academicYear: {
        type: String,
        required: true
    },
    proof: {
        type: String,
        required: false
    },
}, { timestamps: true })

module.exports = mongoose.model('swayamDetailsOfOnlineCourses', swayamDetailsOfOnlineCoursesSchema);