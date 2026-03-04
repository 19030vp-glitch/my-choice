const fs = require('fs');
const express = require('express');
const xlsx = require('xlsx');
const router = express.Router();
const Award = require('../../models/director-models/awardSchema');
const CounselingAndGuidance = require('../../models/director-models/counselingAndGuidanceSchema');
const DemandRatio = require('../../models/director-models/demandRatioSchema');
const ProjectsInternships = require('../../models/director-models/projectsInternshipsSchema');
const Employability = require('../../models/director-models/employabilitySchema');
const ExtensionActivities = require('../../models/director-models/extensionActivitysSchema');
const IctClassrooms = require('../../models/director-models/ictClassroomsSchema')
const MoUs = require('../../models/director-models/moUsSchema')
const ValueAddedCource = require('../../models/director-models/valueAddedCourceSchema');
const SkillsEnhancementInitiatives = require('../../models/director-models/skillsEnhancementInitiativesSchema');
const StudentSatisfactionSurvey = require('../../models/director-models/studentSatisfactionSurveySchema');
const UgcSapCasDstFistDBTICSSR = require('../../models/director-models/ugcSapCasDstFistDBTICSSRSchema');
const TrainingProgramsOrganized = require('../../models/director-models/trainingProgramsOrganizedSchema');
const ResearchMethodologyWorkshops = require('../../models/director-models/researchMethodologyWorkshopsSchema');
const ReservedSeats = require('../../models/director-models/reservedSeatsSchema');
const QualifiedExams = require('../../models/director-models/qualifiedExamSchema');
const ProgressionToHE = require('../../models/director-models/progressionToHESchema');
const Placement = require('../../models/director-models/placementSchema');
const SyllabusRevision = require('../../models/director-models/syllabusRevisionSchema');
const AlumniContribution = require('../../models/director-models/alumniContributionSchema');
const ConferencesSemiWorkshopOrganized = require('../../models/director-models/conferencesSemiWorkshopOrganizedSchema')
const CourceInAllProgram = require('../../models/director-models/courceInAllProgramSchema')
const NewPrograms = require('../../models/director-models/newProgramsSchema')
const StudentUser = require('../../models/student-models/studentUserSchema')
const AlumniUser = require('../../models/alumni-models/alumniUserSchema')

// multer configuration director 

const multer = require('multer');
const path = require('path');
const { sendMail } = require('../faculty-routes/services');
const emailTemplate = require('../../email/emailTemplate');
// const { Sync } = require('@mui/icons-material');
const dirstorage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Server/uploads/directorUploads
        const link = path.join(__dirname, `../../uploads/director-uploads/`)
        cb(null, link)
    },
    filename: (req, file, cb) => {
        cb(null, `${new Date().getTime()}-${file.originalname}`)
    },
})
const upload = multer({ storage: dirstorage })

// multer configuration excel 
const excelStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const link = path.join(__dirname, `../../../excels/`)
        cb(null, link)
    },
    filename: (req, file, cb) => {
        cb(null, `${new Date().getTime()}-${file.originalname}`)
    },
})
const excelUpload = multer({ storage: excelStorage })

let models = { Award, MoUs, CounselingAndGuidance, ProgressionToHE, DemandRatio, ProjectsInternships, Employability, ReservedSeats, TrainingProgramsOrganized, UgcSapCasDstFistDBTICSSR, ResearchMethodologyWorkshops, ExtensionActivities, IctClassrooms, SyllabusRevision, Placement, ValueAddedCource, QualifiedExams, SkillsEnhancementInitiatives, StudentSatisfactionSurvey, AlumniContribution, ConferencesSemiWorkshopOrganized, StudentUser, AlumniUser, CourceInAllProgram, NewPrograms }

const YearSelecter = {
    academicYear: ["CourceInAllProgram", "NewPrograms", "DSDSports", "SportsAndCulturalEvents", "EsttFullTimeTeacherAgainstSanctioned", "EsttFullTimeTeacher", "EsttFullTimeTeacherWhoLeft", "DateOfResultDiclaration", "ExamPassedDuringYear", "StudentComplaintsGrievances", "SubscriptionForKRC", "AwardForExtensionActivities", "TotalExpenditure", "SwayamValueAddedCourses", "SwayamDetailsOfOnlineCourses"],
    Year_of_Award: ["Award", "UgcSapCasDstFistDBTICSSR"],
    Academic_Year: ["DemandRatio", "ProgressionToHE", "ProjectsInternships", "SkillsEnhancementInitiatives", "SyllabusRevision", "Placement", "Employability", "ReservedSeats", "AlumniContribution"],
    Acadmic_year: ["QualifiedExams"],
    Academic_year: ["ValueAddedCource"],
    Year_of_Activity: ["CounselingAndGuidance"],
    Year_of_activity: ["ExtensionActivities"],
    Year_of_signing_MoU: ["MoUs"],
    year: ["ResearchMethodologyWorkshops", "JrfSrfAdmin", "ResearchProjectsAdmin", "PhdAwardedAdmin", "ResearchGuideAdmin", "HEAdmin", "DemandRatioAdmin", "SwayamEContentDeveloped"],
    Year: ["TrainingProgramsOrganized", "ConferencesSemiWorkshopOrganized"],
    Year_of_joining: ["StudentSatisfactionSurvey"]
}

//Set Route
router.post("/director/newRecord/:model", upload.single("Upload_Proof"), async (req, res) => {
    try {

        const model = req.params.model
        const data = JSON.parse(JSON.stringify(req.body));
        const up = req.file ? req.file.filename : "";
        var withUpData = Object.assign(data, { Upload_Proof: up })
        const obj = new models[model](withUpData);
        await obj.save();
        res.status(201).send("Entry Succeed")

    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
});

//faculty routes for mous & extansion activity 
// todo router.post("/faculty/newRecord/:model", upload.single("Upload_Proof"), async (req, res) => {
//     try {
//         const model = req.params.model
//         const data = JSON.parse(JSON.stringify(req.body));
//         let SendData = null;
//         const { SchoolName, userId } = data
//         const up = req.file.filename;

//         //ExtensionActivities MoUs
//         SendData = data

//         var withUpData = Object.assign(SendData, { Upload_Proof: up, SchoolName, userId })
//         const obj = new models[model](withUpData);
//         await obj.save();
//         res.status(201).send("Entry Succeed")
//     }
//     catch (err) {
//         console.log(err)
//         res.status(500).send()
//     }
// });

//Get Route
router.post('/director/getData', async (req, res) => {

    const { model, id, filter } = req.body
    try {
        const fil = id === "" ? filter : { SchoolName: id }
        const fetch = await models[model].find(fil).sort({ $natural: -1 });
        res.status(200).send(fetch);
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
})

//Get Route faculty mous and extension activity
// todo router.post('/faculty/getData', async (req, res) => {

//     const { model, id } = req.body
//     try {
//         const fetch = await models[model].find({ userId: id }).sort({ $natural: -1 });
//         res.status(200).send(fetch);
//     } catch (err) {
//         console.log(err);
//         res.status(500).send();
//     }
// })

//Delete Route
router.post('/director/deleteRecord', async (req, res) => {
    const { model, id } = req.body

    try {
        const Record = await models[model].findOne({ _id: id });
        await models[model].deleteOne({ _id: id })
        const Filename = Record.Upload_Proof;
        const link = path.join(__dirname, `../../uploads/director-uploads/${Filename}`);
        fs.unlink(link, function (err) {
            if (err) {
                console.error(err);
            }

        });
        res.status(200).send("Entry Deleted Successfully");
    }
    catch (e) {
        res.status(500).send({ massage: e.massage });
    }
})

//Edit Route
router.post('/director/editRecord/:model', upload.single('Upload_Proof'), async (req, res) => {
    const model = req.params.model
    const data = JSON.parse(JSON.stringify(req.body));
    let SendData = null;
    const { id } = data
    const isfile = req.file;

    if (isfile) {
        console.log('file found: ' + isfile)
        var up = req.file.filename
    }

    SendData = data

    var alldata = null
    if (up) {
        alldata = Object.assign(SendData, { Upload_Proof: up })
    }
    else {
        alldata = SendData
    }
    await models[model].findOneAndUpdate({ _id: id }, alldata)
    res.status(200).send("Edited Successfully")
})

//Edit Route for mous and extension activity
// todo router.post('/faculty/editRecord/:model', upload.single('Upload_Proof'), async (req, res) => {
//     const model = req.params.model
//     const data = JSON.parse(JSON.stringify(req.body));
//     let SendData = null;
//     const { id } = data
//     const isfile = req.file;
//     if (isfile) {
//         var up = req.file.filename
//     }
//     //ExtensionActivities, MoUs
//     SendData = data

//     var alldata = null
//     if (up) {
//         alldata = Object.assign(SendData, { Upload_Proof: up })
//     }
//     else {
//         alldata = SendData
//     }
//     await models[model].findOneAndUpdate({ _id: id }, alldata)
//     res.status(200).send("Edited Successfully")
// })

router.get('/viewer/director/:filename', (req, res) => {
    const link = path.join(__dirname, `../../uploads/director-uploads/${req.params.filename}`)
    res.sendFile(link);
})

//Activate Diactivate Student
router.post('/inactive-active/student', async (req, res) => {
    const { isActiveStudent, itemToEdit } = req.body
    try {
        await StudentUser.updateOne({ _id: itemToEdit }, { $set: { isActiveStudent } });
        const userdetails = await StudentUser.findOne({ _id: itemToEdit });

        const { email, schoolName, isActiveStudent: isActive } = userdetails
        const activestate = isActive === true ? "Activated" : "Disabled";
        let subjectForEmail = `Your account is ${activestate} by director of ${schoolName} at SRTMUN-UIMS.`

        // message to send on res
        const statematter = isActive === true ? "Please utilize the provided username and password which were entered during registration, to access your student account at <strong>SRTMUN-UIMS</strong>" : `Visit to ${schoolName} with any admission proof to activate your student account`
        let message = { status: 'success', message: 'Email sent successfully, Please check your Email Account' }

        let htmlMatter = `<div>
                            <h2>Your student account ${activestate} by Director of ${schoolName}</h2>
                            <p style="font-size: 14px; line-height: 140%;">
                            <strong>${email}</strong> is your username that is <strong>${activestate}</strong> ${statematter}.
                            </p>
                        </div>`

        // send mail
        sendMail(req, res, email, subjectForEmail, 'html', emailTemplate(htmlMatter), message);
    }
    catch (err) {
        console.log(err)
        res.send({ status: "error" })
    }
})

// Convert student to alumni in single/bulk
router.post('/student-to-alumni/bulk', async (req, res) => {

    const { arr } = req.body
    try {
        let NonConverted = [];


        for (const id of arr) {
            let student = await StudentUser.findOne({ _id: id });
            if (student) {
                const { programEnroledOn, currentIn } = student

                let yStarted = new Date().getFullYear() - parseInt(currentIn[0]);
                let YNext = (yStarted + 1).toString().slice(-2);
                let doStarted = programEnroledOn === undefined ? `${yStarted}-${YNext}` : programEnroledOn;
                let yComplited = new Date().getFullYear();
                let yCNext = (yComplited + 1).toString().slice(-2);
                let doCompleted = `${yComplited}-${yCNext}`;

                await StudentUser.updateOne({ _id: id }, { $set: { isAlumni: true, programEnroledOn: doStarted, doCompletion: doCompleted } })

            } else {
                NonConverted.push(id);
            }
        }
        if (NonConverted.length === 0) {
            res.status(201).send({ status: "allCoverted", message: `Student converted to alumni successfully` })
        }
        else {
            res.status(201).send({ status: "error", message: `${NonConverted.length} out of ${arr.length} are not converted` })
        }
    }
    catch (err) {
        console.log(err)
    }
})

//aqar director 
router.post('/director/aqar/excel', async (req, res) => {
    const { SchoolName, years } = req.body.filter
    try {
        let report = {}
        let aqarModels = ['Award', 'MoUs', 'CounselingAndGuidance', 'ProgressionToHE', 'DemandRatio', 'ProjectsInternships', 'Employability', 'ReservedSeats', 'TrainingProgramsOrganized', 'UgcSapCasDstFistDBTICSSR', 'ResearchMethodologyWorkshops', 'ExtensionActivities', 'SyllabusRevision', 'Placement', 'ValueAddedCource', 'QualifiedExams', 'SkillsEnhancementInitiatives', 'AlumniContribution', 'CourceInAllProgram', 'NewPrograms']
        for (const model of aqarModels) {
            let year
            for (const yearField in YearSelecter) {
                if (YearSelecter[yearField].includes(model)) {
                    year = yearField;
                }
            }
            report[model] = await models[model].find({ SchoolName, [year]: { $in: years } });
        }
        res.send({ report })
    }
    catch (err) {
        console.log(err);
    }
})

module.exports = { router, models, YearSelecter }