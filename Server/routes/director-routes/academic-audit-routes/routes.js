const express = require('express');
const router = express.Router();
require('dotenv').config();
const AAAModel = require('../../../models/director-models/academic-audit-models/academicAuditModel.js');
const path = require('path');
const puppeteer = require('puppeteer')

// multer configuration
const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const link = path.join(__dirname, `../../../uploads/director-uploads/AAA-uploads/`)
        cb(null, link)
    },
    filename: (req, file, cb) => {
        cb(null, `AAA-Feedback-${new Date().getTime()}-${file.originalname}`)
    },
})
const upload = multer({ storage: storage })




// import all faculty models here
const AppointmentsHeldPrior = require('../../../models/faculty-models/appointmentsHeldPrior');
const PostHeld = require('../../../models/faculty-models/postHeld')
const Lectures = require('../../../models/faculty-models/lectures');
const Online = require('../../../models/faculty-models/online');
const ResearchProject = require('../../../models/faculty-models/researchProjects');
const ResearchPaper = require('../../../models/faculty-models/researchPapers')
const BookAndChapter = require('../../../models/faculty-models/booksAndChapters')
const ResearchGuidance = require('../../../models/faculty-models/researchGuidance')
const PhdAwarded = require('../../../models/faculty-models/phdAwarded')
const JrfSrf = require('../../../models/faculty-models/jrfsrf')
const AwardRecognition = require('../../../models/faculty-models/awardAndRecognition')
const Patent = require('../../../models/faculty-models/patent')
const ConsultancyServices = require('../../../models/faculty-models/consultancyServices')
const Collaboration = require('../../../models/faculty-models/collaborations')
const InvitedTalk = require('../../../models/faculty-models/invitedTalk')
const ConferenceOrganized = require('../../../models/faculty-models/conferenceOrganized')
const Fellowship = require('../../../models/faculty-models/fellowship')
const User = require('../../../models/faculty-models/userModel')
const Degree = require('../../../models/faculty-models/degreeModel')
const Qualification = require('../../../models/faculty-models/qualificationModel')
const EContentDeveloped = require('../../../models/faculty-models/eContentDeveloped')
const FinancialSupport = require('../../../models/faculty-models/financialSupport')


// all director models are imported here:
const DirectorUser = require('../../../models/director-models/directorUser');
const Award = require('../../../models/director-models/awardSchema');
const CounselingAndGuidance = require('../../../models/director-models/counselingAndGuidanceSchema');
const DemandRatio = require('../../../models/director-models/demandRatioSchema');
const ProjectsInternships = require('../../../models/director-models/projectsInternshipsSchema');
const Employability = require('../../../models/director-models/employabilitySchema');
const ExtensionActivities = require('../../../models/director-models/extensionActivitysSchema');
const IctClassrooms = require('../../../models/director-models/ictClassroomsSchema')
const MoUs = require('../../../models/director-models/moUsSchema')
const ValueAddedCource = require('../../../models/director-models/valueAddedCourceSchema');
const SkillsEnhancementInitiatives = require('../../../models/director-models/skillsEnhancementInitiativesSchema');
const StudentSatisfactionSurvey = require('../../../models/director-models/studentSatisfactionSurveySchema');
const UgcSapCasDstFistDBTICSSR = require('../../../models/director-models/ugcSapCasDstFistDBTICSSRSchema');
const TrainingProgramsOrganized = require('../../../models/director-models/trainingProgramsOrganizedSchema');
const ResearchMethodologyWorkshops = require('../../../models/director-models/researchMethodologyWorkshopsSchema');
const ReservedSeats = require('../../../models/director-models/reservedSeatsSchema');
const QualifiedExams = require('../../../models/director-models/qualifiedExamSchema');
const ProgressionToHE = require('../../../models/director-models/progressionToHESchema');
const Placement = require('../../../models/director-models/placementSchema');
const SyllabusRevision = require('../../../models/director-models/syllabusRevisionSchema');
const AlumniContribution = require('../../../models/director-models/alumniContributionSchema');
const ConferencesSemiWorkshopOrganized = require('../../../models/director-models/conferencesSemiWorkshopOrganizedSchema');
const Alumni = require('../../../models/alumni-models/alumniUserSchema')
const Student = require('../../../models/student-models/studentUserSchema')

let models = {
    User, Qualification, Degree, AppointmentsHeldPrior, PostHeld, Lectures, Online, ResearchProject, ResearchPaper, BookAndChapter, ResearchGuidance, PhdAwarded, JrfSrf, AwardRecognition, Patent, ConsultancyServices, Collaboration, InvitedTalk, ConferenceOrganized, Fellowship, EContentDeveloped, FinancialSupport, Award, CounselingAndGuidance, DemandRatio, ProjectsInternships, Employability, ExtensionActivities, IctClassrooms, MoUs, ValueAddedCource, SkillsEnhancementInitiatives, StudentSatisfactionSurvey, UgcSapCasDstFistDBTICSSR, TrainingProgramsOrganized, ResearchMethodologyWorkshops, ReservedSeats, QualifiedExams, ProgressionToHE, Placement, SyllabusRevision, AlumniContribution, ConferencesSemiWorkshopOrganized, Alumni, Student,
}

router.post('/api/director/academic-audit/getData/facultyData', async (req, res) => {

    const { model, school, auditYear } = req.body
    const response = await models[model].find({ year: auditYear }).populate('userId')
    const filteredReponse = response.filter((doc) => doc.userId !== null && doc.userId.department === school)
    if (response) {
        res.send({ status: 'success', data: filteredReponse })
    }
    else {
        res.send({ status: 'error', })
    }
})

router.post('/api/director/academic-audit/getData/directorData', async (req, res) => {

    const { model, school } = req.body
    const response = await models[model].find({ SchoolName: school })
    if (response) {
        res.send({ status: 'success', data: response })
    }
    else {
        res.send({ status: 'error', })
    }
})

router.post('/api/director/academic-audit/saveAAAData', (req, res) => {
    const { AAAData, schoolName } = req.body

    if (AAAData.auditYear) {
        // check if AAA data for this school already exists
        AAAModel.findOne({ schoolName }, (err, data) => {
            if (err) {
                res.send({ status: "error", message: "Internal server error" })
            }
            else {
                if (data) {
                    // if aaa data exist only push into that array
                    // remove aaa array item with same year as in AAAData

                    data.AAAData.forEach((item, index) => {
                        if (JSON.parse(item).auditYear === AAAData.auditYear) {
                            data.AAAData.splice(index, 1);
                        }
                    })

                    data.AAAData.push(JSON.stringify(AAAData));
                    data.save((err, item) => {
                        if (err) {
                            res.send({ status: "error", message: "Error saving data" })
                        }
                        else {
                            res.send({ status: 'success', data: item });
                        }
                    }
                    )
                }
                else {
                    // if aaa data does not exist create new one
                    const newData = new AAAModel({
                        schoolName: schoolName,
                        AAAData: [JSON.stringify(AAAData)]
                    });
                    newData.save((err, item) => {
                        if (err) {
                            res.send({ status: "error", message: "Error saving data" })
                        }
                        else {
                            res.send({ status: 'success', message: 'Your progress saved...' })
                            // res.send({ status: 'success', data: item });

                        }
                    }
                    )
                }
            }
        })
    }
    // res.send({status : 'success', message : 'Your progress saved...'})
})

router.post("/api/director/academic-audit/getAAAData", (req, res) => {
    const { schoolName } = req.body;
    AAAModel.findOne({ schoolName }, (err, data) => {
        if (err) {
            res.send({ status: "error", message: "Internal server error" })
        }
        else {
            if (data) {
                res.send({ status: 'success', data });
            }
            else {
                res.send({ status: 'error', message: "No data found" });
            }
        }
    }
    )
})

router.post("/api/director/academic-audit/getTotalAAAData", (req, res) => {
    AAAModel.find({}).lean().then((data, err) => {
        if (err) {
            res.send({ status: "error", message: "Internal server error" })
        }
        else {
            if (data) {
                res.send({ status: 'success', data });
            }
            else {
                res.send({ status: 'error', message: "No data found" });
            }
        }
    }
    )
})

async function pupetteerSetting(fileName, userData, selectedYear) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const link = `${process.env.Report_Main_URL}/report/AAAReport/${userData.department}/${JSON.stringify(selectedYear)}`

    await page.goto(link,
        { waitUntil: 'networkidle0', timeout: 200000 });
    await page.pdf({
        path: `pdfs/${fileName}`,
        printBackground: true,
        scale: 0.6,
        format: "A4",
        margin: { top: '50px', right: '10px', bottom: '50px', left: '10px' },
        displayHeaderFooter: true,
        headerTemplate: "<div style='font-size:7px;'></div>",
        footerTemplate: `<div style='font-size:7px; padding-left: 300px;'><span class='pageNumber'></span> of <span class='totalPages'></span></div>`
    });
    await browser.close()
}

// for generating AAA report
router.post("/generateAAAReport", async (req, res) => {

    const { userData, selectedYear } = req.body;

    const fileName = `AAAReport-${new Date().getTime()}.pdf`
    try {
        await pupetteerSetting(fileName, userData, selectedYear)
        res.send({ status: "generated", fileName: fileName });

    } catch (error) {
        console.log(error)
        res.send({ status: "error", message: 'Could not generate report, please try again later...' });
    }



    async function pupetteerSetting(fileName, userData, selectedYear) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        const link = `${process.env.Report_Main_URL}/report/AAAReport/${userData.department}/${JSON.stringify(selectedYear)}`

        await page.goto(link,
            { waitUntil: 'networkidle0', timeout: 200000 });
        await page.pdf({
            path: `pdfs/${fileName}`,
            printBackground: true,
            scale: 0.6,
            format: "A4",
            margin: { top: '50px', right: '10px', bottom: '50px', left: '10px' },
            displayHeaderFooter: true,
            headerTemplate: "<div style='font-size:7px;'></div>",
            footerTemplate: `<div style='font-size:7px; padding-left: 300px;'><span class='pageNumber'></span> of <span class='totalPages'></span></div>`
        });
        await browser.close()
    }


});

// generateReport for user
router.post('/api/getAllData/director', async (req, res) => {

    const { department, filter } = req.body
    const report = {};
    // const filteredReponse = response


    // get faculties
    const faculties = await User.find({ department: department }).lean();
    report.Faculties = faculties.sort(function (a, b) {
        var dateA = new Date(a.createdAt), dateB = new Date(b.createdAt)
        return dateB - dateA;
    })

    // get ValueAddedCource
    const ValueAddedCourceres = await ValueAddedCource.find({ department: department }).lean();
    report.ValueAddedCource = ValueAddedCourceres.sort(function (a, b) {
        var dateA = new Date(a.createdAt), dateB = new Date(b.createdAt)
        return dateB - dateA;
    })

    // get SyllabusRevision
    const SyllabusRevisionres = await SyllabusRevision.find({ department: department }).lean();
    report.SyllabusRevision = SyllabusRevisionres.sort(function (a, b) {
        var dateA = new Date(a.createdAt), dateB = new Date(b.createdAt)
        return dateB - dateA;
    })

    // get faculties
    const ExtensionActivitiesres = await ExtensionActivities.find({ department: department }).lean();
    report.ExtensionActivities = ExtensionActivitiesres.sort(function (a, b) {
        var dateA = new Date(a.createdAt), dateB = new Date(b.createdAt)
        return dateB - dateA;
    })

    // get ProjectsInternships
    const ProjectsInternshipsRes = await ProjectsInternships.find({ department: department }).lean();
    report.ProjectsInternships = ProjectsInternshipsRes.sort(function (a, b) {
        var dateA = new Date(a.createdAt), dateB = new Date(b.createdAt)
        return dateB - dateA;
    })

    // get Employability
    const Employabilityres = await Employability.find({ department: department }).lean();
    report.Employability = Employabilityres.sort(function (a, b) {
        var dateA = new Date(a.createdAt), dateB = new Date(b.createdAt)
        return dateB - dateA;
    })

    // get UgcSapCasDstFistDBTICSSR
    const ugcSapCasDstFistDBTICSSR = await UgcSapCasDstFistDBTICSSR.find({ department: department }).lean();
    report.UgcSapCasDstFistDBTICSSR = ugcSapCasDstFistDBTICSSR.sort(function (a, b) {
        var dateA = new Date(a.createdAt), dateB = new Date(b.createdAt)
        return dateB - dateA;
    })

    // get Alumni
    const alumni = await Student.find({ schoolName: department, isAlumni: true }).lean()
    report.Alumni = alumni.sort(function (a, b) {
        var dateA = new Date(a.createdAt), dateB = new Date(b.createdAt)
        return dateB - dateA;
    });

    // get student
    const student = await Student.find({ schoolName: department, isAlumni: false }).lean()
    report.Student = student.sort(function (a, b) {
        var dateA = new Date(a.createdAt), dateB = new Date(b.createdAt)
        return dateB - dateA;
    });


    // get demand
    const DemandRatioRes = await DemandRatio.find({ schoolName: department }).lean();
    report.DemandRatio = DemandRatioRes.sort(function (a, b) {
        var dateA = new Date(a.createdAt), dateB = new Date(b.createdAt)
        return dateB - dateA;
    });



    // get alumniContribution
    const alumniContribution = await AlumniContribution.find({ SchoolName: department }).lean()
    report.AlumniContribution = alumniContribution.sort(function (a, b) {
        var dateA = new Date(a.createdAt), dateB = new Date(b.createdAt)
        return dateB - dateA;
    });

    // get qualifiedExam
    const qualifiedExam = await QualifiedExams.find({ SchoolName: department }).lean()
    report.QualifiedExams = qualifiedExam.sort(function (a, b) {
        var dateA = new Date(a.createdAt), dateB = new Date(b.createdAt)
        return dateB - dateA;
    });

    // get placement
    const placement = await Placement.find({ SchoolName: department }).lean()
    report.Placement = placement.sort(function (a, b) {
        var dateA = new Date(a.createdAt), dateB = new Date(b.createdAt)
        return dateB - dateA;
    });

    // get awards
    const awards = await Award.find({ SchoolName: department }).lean()
    report.Award = awards.sort(function (a, b) {
        var dateA = new Date(a.createdAt), dateB = new Date(b.createdAt)
        return dateB - dateA;
    });;



    // get progressionToHE
    const progressionToHE = await ProgressionToHE.find({ SchoolName: department }).lean()
    report.ProgressionToHE = progressionToHE.sort(function (a, b) {
        var dateA = new Date(a.createdAt), dateB = new Date(b.createdAt)
        return dateB - dateA;
    });

    // get conference
    const conference = await ConferencesSemiWorkshopOrganized.find({ SchoolName: department }).lean()
    report.ConferencesSemiWorkshopOrganized = conference.sort(function (a, b) {
        var dateA = new Date(a.createdAt), dateB = new Date(b.createdAt)
        return dateB - dateA;
    });

    // get TrainingProgramsOrganized
    const training = await TrainingProgramsOrganized.find({ SchoolName: department }).lean()
    report.TrainingProgramsOrganized = training.sort(function (a, b) {
        var dateA = new Date(a.createdAt), dateB = new Date(b.createdAt)
        return dateB - dateA;
    });


    res.send({ status: "success", data: report });
});

// generateReport for user
router.post('/api/getAllData/faculty', async (req, res) => {

    const { department, filter } = req.body
    const report = {};


    // get online fdp
    const online = await Online.find(filter).populate('userId')
    report.Online = online.sort(function (a, b) {
        var dateA = new Date(a.createdAt), dateB = new Date(b.createdAt)
        return dateB - dateA;
    }).filter((doc) => doc.userId !== null && doc.userId.department === department)

    // get ResearchProject
    const researchProject = await ResearchProject.find(filter).populate('userId')
    report.ResearchProject = researchProject.sort(function (a, b) {
        var dateA = new Date(a.createdAt), dateB = new Date(b.createdAt)
        return dateB - dateA;
    }).filter((doc) => doc.userId !== null && doc.userId.department === department)

    // get ResearchProject
    const researchPaper = await ResearchPaper.find(filter).populate('userId')
    report.ResearchPaper = researchPaper.sort(function (a, b) {
        var dateA = new Date(a.createdAt), dateB = new Date(b.createdAt)
        return dateB - dateA;
    }).filter((doc) => doc.userId !== null && doc.userId.department === department)

    // get ResearchProject
    const bookAndChapter = await BookAndChapter.find(filter).populate('userId')
    report.BookAndChapter = bookAndChapter.sort(function (a, b) {
        var dateA = new Date(a.createdAt), dateB = new Date(b.createdAt)
        return dateB - dateA;
    }).filter((doc) => doc.userId !== null && doc.userId.department === department)

    // get ResearchProject
    const researchGuidance = await ResearchGuidance.find(filter).populate('userId')
    report.ResearchGuidance = researchGuidance.sort(function (a, b) {
        var dateA = new Date(a.createdAt), dateB = new Date(b.createdAt)
        return dateB - dateA;
    }).filter((doc) => doc.userId !== null && doc.userId.department === department)

    const phdAwarded = await PhdAwarded.find(filter).populate('userId')
    report.PhdAwarded = phdAwarded.sort(function (a, b) {
        var dateA = new Date(a.createdAt), dateB = new Date(b.createdAt)
        return dateB - dateA;
    }).filter((doc) => doc.userId !== null && doc.userId.department === department)

    const jrfSrf = await JrfSrf.find(filter).populate('userId')
    report.JrfSrf = jrfSrf.sort(function (a, b) {
        var dateA = new Date(a.createdAt), dateB = new Date(b.createdAt)
        return dateB - dateA;
    }).filter((doc) => doc.userId !== null && doc.userId.department === department)

    const awardRecognition = await AwardRecognition.find(filter).populate('userId')
    report.AwardRecognition = awardRecognition.sort(function (a, b) {
        var dateA = new Date(a.createdAt), dateB = new Date(b.createdAt)
        return dateB - dateA;
    }).filter((doc) => doc.userId !== null && doc.userId.department === department)


    const patent = await Patent.find(filter).populate('userId')
    report.Patent = patent.sort(function (a, b) {
        var dateA = new Date(a.createdAt), dateB = new Date(b.createdAt)
        return dateB - dateA;
    }).filter((doc) => doc.userId !== null && doc.userId.department === department)

    const consultancyServices = await ConsultancyServices.find(filter).populate('userId')
    report.ConsultancyServices = consultancyServices.sort(function (a, b) {
        var dateA = new Date(a.createdAt), dateB = new Date(b.createdAt)
        return dateB - dateA;
    }).filter((doc) => doc.userId !== null && doc.userId.department === department)

    const collaboration = await Collaboration.find(filter).populate('userId')
    report.Collaboration = collaboration.sort(function (a, b) {
        var dateA = new Date(a.createdAt), dateB = new Date(b.createdAt)
        return dateB - dateA;
    }).filter((doc) => doc.userId !== null && doc.userId.department === department)

    const invitedTalk = await InvitedTalk.find(filter).populate('userId')
    report.InvitedTalk = invitedTalk.sort(function (a, b) {
        var dateA = new Date(a.createdAt), dateB = new Date(b.createdAt)
        return dateB - dateA;
    }).filter((doc) => doc.userId !== null && doc.userId.department === department)

    const conferenceOrganized = await ConferenceOrganized.find(filter).populate('userId')
    report.ConferenceOrganized = conferenceOrganized.sort(function (a, b) {
        var dateA = new Date(a.createdAt), dateB = new Date(b.createdAt)
        return dateB - dateA;
    }).filter((doc) => doc.userId !== null && doc.userId.department === department)

    const finance = await FinancialSupport.find(filter).populate('userId')
    report.FinancialSupport = finance.sort(function (a, b) {
        var dateA = new Date(a.createdAt), dateB = new Date(b.createdAt)
        return dateB - dateA;
    }).filter((doc) => doc.userId !== null && doc.userId.department === department)

    res.send({ status: "success", data: report });

})



const arrayOfFields = [{ name: 'teacher', maxCount: 1 }, { name: 'expert', maxCount: 1 }, { name: 'industry', maxCount: 1 }, { name: 'alumni', maxCount: 1 }, { name: 'AAAFile', maxCount: 1 }]

router.post("/api/director/academic-audit/saveFeedbackReports", upload.fields(arrayOfFields), (req, res) => {
    try {
        res.send({ status: 'success', data: req.files })
    } catch {
        console.log('Error')
    }
})


router.get('/viewer/director/showFile/:filename', (req, res) => {
    const link = `${__dirname}/director-uploads/AAA-uploads/${req.params.filename}`.replace('/routes/director-routes/academic-audit-routes', '/uploads')
    res.sendFile(link);
})





module.exports = router;
