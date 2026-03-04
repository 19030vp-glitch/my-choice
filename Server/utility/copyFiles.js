const path = require('path');
const fs = require('fs');

// admin to faculty
// const JRFSRF = require('../models/admin-models/jrfsrfAdminSchema.js')
// const ResearchProjects = require('../models/admin-models/researchProjectsAdminSchema.js')
// const PHDAwarded = require('../models/admin-models/phdAwardedAdminSchema.js')

// swayam to faculty
// const Econtent = require('../models/swayam-models/swayamEContentDevelopedSchema.js')

// admin to director
// const DemandRatio = require('../models/admin-models/demandRatioAdminSchema.js')
// const AdminHE = require('../models/admin-models/heAdminSchema.js')


// swayam to director
// const ValueAdded = require('../models/swayam-models/swayamValueAddedCourseSchema.js')

// faculty to director
// const Conference = require('../models/faculty-models/conferenceOrganized.js')


const copyFiles = async () => {
    const data = await PHDAwarded.find({}).lean();
    data.forEach((item) => {
        const proof = item.proof;

        if (proof) {
            try {
                fs.copyFile(path.join(__dirname, `../uploads/admin-uploads/${proof}`), path.join(__dirname, `../uploads/faculty-uploads/${proof}`), (err) => {
                    console.log('File copied successfully!');
                });
            } catch (error) {
                console.log('Error', error.message)
            }
        }
    })
}


module.exports = copyFiles