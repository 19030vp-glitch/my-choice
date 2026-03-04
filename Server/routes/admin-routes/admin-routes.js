const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const multerConfig = require('../../utility/multerConfig').multerConfig

const adminTableUpload = multerConfig('../uploads/admin-uploads')

const User = require('../../models/faculty-models/userModel')
const DirectorUser = require('../../models/director-models/directorUser');
const AlumniUser = require('../../models/alumni-models/alumniUserSchema');
const StudentUser = require('../../models/student-models/studentUserSchema');

const BooksAndChapters = require('../../models/faculty-models/booksAndChapters');
const ResearchPapers = require('../../models/faculty-models/researchPapers');
const ResearchProjects = require('../../models/faculty-models/researchProjects');
const EContentDeveloped = require('../../models/faculty-models/eContentDeveloped');
const Petant = require('../../models/faculty-models/patent');
const ConferenceOrganized = require('../../models/faculty-models/conferenceOrganized');
const InvitedTalk = require('../../models/faculty-models/invitedTalk');
const Fellowship = require('../../models/faculty-models/fellowship');
const Qualification = require('../../models/faculty-models/qualificationModel');
const Degree = require('../../models/faculty-models/degreeModel');
const AppointmentsHeldPrior = require('../../models/faculty-models/appointmentsHeldPrior');
const AwardRecognition = require('../../models/faculty-models/awardAndRecognition');
const BookAndChapter = require('../../models/faculty-models/booksAndChapters');
const Collaboration = require('../../models/faculty-models/collaborations');
const ConferenceParticipated = require('../../models/faculty-models/conferenceParticipated');
const ConsultancyServices = require('../../models/faculty-models/consultancyServices');
const ResearchProject = require('../../models/faculty-models/researchProjects')
const PostHeld = require('../../models/faculty-models/postHeld')
const Lectures = require('../../models/faculty-models/lectures')
const ResearchPaper = require('../../models/faculty-models/researchPapers')
const PhdAwarded = require('../../models/faculty-models/phdAwarded')
const JrfSrf = require('../../models/faculty-models/jrfsrf')
const Patent = require('../../models/faculty-models/patent')
const Online = require('../../models/faculty-models/online')
const FinancialSupport = require('../../models/faculty-models/financialSupport')
const Responsibilities = require('../../models/faculty-models/responsibilities')
const ForeignVisit = require('../../models/faculty-models/foreignVisit')
const PolicyDocuments = require('../../models/faculty-models/policyDocuments')
const PublicationCitation = require('../../models/faculty-models/publicationCitation')

// director 
const AlumniContribution = require('../../models/director-models/alumniContributionSchema')
const Award = require('../../models/director-models/awardSchema')
const ConferencesSemiWorkshopOrganized = require('../../models/director-models/conferencesSemiWorkshopOrganizedSchema')
const CounselingAndGuidance = require('../../models/director-models/counselingAndGuidanceSchema')
const DemandRatio = require('../../models/director-models/demandRatioSchema')
const Employability = require('../../models/director-models/employabilitySchema')
const ExtensionActivities = require('../../models/director-models/extensionActivitysSchema')
const IctClassrooms = require('../../models/director-models/ictClassroomsSchema')
const MoUs = require('../../models/director-models/moUsSchema')
const Placement = require('../../models/director-models/placementSchema')
const ProgressionToHE = require('../../models/director-models/progressionToHESchema')
const ProjectsInternships = require('../../models/director-models/projectsInternshipsSchema')
const QualifiedExams = require('../../models/director-models/qualifiedExamSchema')
const ResearchMethodologyWorkshops = require('../../models/director-models/researchMethodologyWorkshopsSchema')
const ReservedSeats = require('../../models/director-models/reservedSeatsSchema')
const SkillsEnhancementInitiatives = require('../../models/director-models/skillsEnhancementInitiativesSchema')
const StudentSatisfactionSurvey = require('../../models/director-models/studentSatisfactionSurveySchema')
const SyllabusRevision = require('../../models/director-models/syllabusRevisionSchema')
const TrainingProgramsOrganized = require('../../models/director-models/trainingProgramsOrganizedSchema')
const UgcSapCasDstFistDBTICSSR = require('../../models/director-models/ugcSapCasDstFistDBTICSSRSchema')
const ValueAddedCource = require('../../models/director-models/valueAddedCourceSchema')
const CourceInAllProgram = require('../../models/director-models/courceInAllProgramSchema')
const NewPrograms = require('../../models/director-models/newProgramsSchema')
const StudentInformation = require('../../models/director-models/studentInformationSchema')
const StudentFeedback = require('../../models/feedback-models/studentFeedbackModel')
const AlumniFeedback = require('../../models/feedback-models/alumniFeedbackModel')
const TeacherFeedback = require('../../models/feedback-models/teacherFeedbackModel')
const ParentFeedback = require('../../models/feedback-models/parentFeedbackModel')
const EmployerFeedback = require('../../models/feedback-models/employerFeedbackModel')
const ExpertFeedback = require('../../models/feedback-models/expertFeedbackModel')
const FeedbackStudentSatisfactionSurvey = require('../../models/feedback-models/feedbackStudentSatisfactionSurvey')


const JrfSrfAdmin = require('../../models/admin-models/jrfsrfAdminSchema')
const PhdAwardedAdmin = require('../../models/admin-models/phdAwardedAdminSchema')
const ResearchProjectsAdmin = require('../../models/admin-models/researchProjectsAdminSchema')
const ResearchGuideAdmin = require('../../models/admin-models/researchGuideAdminSchema')
const EsttFullTimeTeacherAgainstSanctioned = require('../../models/establishment-models/esttFullTimeTeacherAgainstSanctionedSchema')
const EsttFullTimeTeacher = require('../../models/establishment-models/esttFullTimeTeacherSchema')
const EsttFullTimeTeacherWhoLeft = require('../../models/establishment-models/esttFullTimeTeacherWhoLeftSchema')
const DateOfResultDiclaration = require('../../models/exam-models/dateOfResultDiclarationSchema')
const StudentComplaintsGrievances = require('../../models/exam-models/studentComplaintsGrevancesSchema')
const ExamPassedDuringYear = require('../../models/exam-models/examPassedDuringYearSchema')
const TotalExpenditure = require('../../models/other-models/totalExpenditureSchema')
const MaintenanceAndInfrastructure = require('../../models/other-models/maintenanceAndInfrastructureSchema')
const IQACInstitutionQualityAssurance = require('../../models/other-models/iqacInstitutionQualityAssuranceSchema')
const Scholarship = require('../../models/other-models/scholarshipSchema')
const SubscriptionForKRC = require('../../models/krc-models/subscriptionForKRCSchema')
const DSDSports = require('../../models/dsd-models/dsdSportsSchema')
const SportsAndCulturalEvents = require('../../models/dsd-models/sportsAndCulturalEventsSchema')
const AwardForExtensionActivities = require('../../models/nss-models/awardForExtensionActivitiesSchema')
const SwayamEContentDeveloped = require('../../models/swayam-models/swayamEContentDevelopedSchema')
const SwayamValueAddedCourses = require('../../models/swayam-models/swayamValueAddedCourseSchema')
const SwayamDetailsOfOnlineCourses = require('../../models/swayam-models/swayamDetailsOfOnlineCoursesSchema')
const ACFCollege = require('../../models/acf-college-models/acfCollege')

//admin
const IsRegistration = require('../../models/admin-models/isRegistrationSchema')
const { YearSelecter } = require('../../routes/director-routes/director-routes');
const { pupetteerSetting } = require('../../utility/pupetteerSetting');

const AdminModels = { JrfSrfAdmin, PhdAwardedAdmin, ResearchProjectsAdmin, ResearchGuideAdmin }

const establishmentModels = { EsttFullTimeTeacherAgainstSanctioned, EsttFullTimeTeacher, EsttFullTimeTeacherWhoLeft }
const examModels = { DateOfResultDiclaration, StudentComplaintsGrievances, ExamPassedDuringYear }
const otherModels = { TotalExpenditure, MaintenanceAndInfrastructure, Scholarship, IQACInstitutionQualityAssurance }
const krcModels = { SubscriptionForKRC }
const dsdModels = { DSDSports, SportsAndCulturalEvents }
const nssModels = { AwardForExtensionActivities, }
const swayamModels = { SwayamEContentDeveloped, SwayamValueAddedCourses, SwayamDetailsOfOnlineCourses }

const models = { User, DirectorUser, AlumniUser, StudentUser, BooksAndChapters, ResearchProjects, EContentDeveloped, Petant, ConferenceOrganized, InvitedTalk, ResearchPapers, Fellowship, Qualification, Degree, AppointmentsHeldPrior, AwardRecognition, BookAndChapter, Collaboration, ConferenceParticipated, PolicyDocuments, ConsultancyServices, ResearchProject, PostHeld, Lectures, ResearchPaper, PhdAwarded, JrfSrf, Patent, Online, FinancialSupport, Responsibilities, ForeignVisit, PublicationCitation, AlumniContribution, Award, ConferencesSemiWorkshopOrganized, CounselingAndGuidance, DemandRatio, Employability, ExtensionActivities, IctClassrooms, MoUs, Placement, ProgressionToHE, ProjectsInternships, QualifiedExams, ResearchMethodologyWorkshops, ReservedSeats, SkillsEnhancementInitiatives, StudentSatisfactionSurvey, SyllabusRevision, TrainingProgramsOrganized, UgcSapCasDstFistDBTICSSR, ValueAddedCource, CourceInAllProgram, StudentInformation, StudentFeedback, AlumniFeedback, TeacherFeedback, ParentFeedback, EmployerFeedback, ExpertFeedback, FeedbackStudentSatisfactionSurvey, ACFCollege, NewPrograms, ...AdminModels, ...establishmentModels, ...examModels, ...otherModels, ...krcModels, ...dsdModels, ...nssModels, ...swayamModels }



const facultyModels = ["PublicationCitation", "BooksAndChapters", "Qualification", "Degree", "AppointmentsHeldPrior", "AwardRecognition", "BookAndChapter", "Collaboration", "ConferenceOrganized", "ConferenceParticipated", "ConsultancyServices", "EContentDeveloped", "ResearchProject", "ResearchProjects", "PostHeld", "Lectures", "ResearchPaper", "ResearchPapers", "PhdAwarded", "JrfSrf", "Patent", "Petant", "Online", "FinancialSupport", "ForeignVisit", "InvitedTalk", "Fellowship", "Responsibilities", "PolicyDocuments", "ConferencesSemiWorkshopOrganized", "ExtensionActivities", "MoUs",]

const directorModels = ["AlumniContribution", "Award", "CounselingAndGuidance", "DemandRatio", "Employability", "IctClassrooms", "Placement", "ProgressionToHE", "ProjectsInternships", "QualifiedExams", "ResearchMethodologyWorkshops", "ReservedSeats", "SkillsEnhancementInitiatives", "StudentSatisfactionSurvey", "SyllabusRevision", "TrainingProgramsOrganized", "UgcSapCasDstFistDBTICSSR", "ValueAddedCource", "CourceInAllProgram", "NewPrograms", "StudentInformation"]

const feedbackModels = ["StudentFeedback", "AlumniFeedback", "TeacherFeedback", "ParentFeedback", "EmployerFeedback", "ExpertFeedback", "FeedbackStudentSatisfactionSurvey"]

const researchModels = ["JrfSrf", "ResearchProjects", "ResearchPapers", "BooksAndChapters", "Patent",]

const dataSetter = {
    "School of Computational Sciences": "compCount",
    "School of Chemical Sciences": "chemiCount",
    "School of Commerce and Management Sciences": "managementCount",
    "School of Educational Sciences": "eduCount",
    "School of Mathematical Sciences": "mathCount",
    "School of Physical Sciences": "phyCount",
    "School of Social Sciences": "socialCount",
    "School of Earth Sciences": "earthCount",
    "School of Life Sciences": "lifeCount",
    "School of Pharmacy": "pharmaCount",
    "School of Media Studies": "mediaCount",
    "School of Fine and Performing Arts": "fineCount",
    "School of Language, Literature and Culture Studies": "langCount",
    "School of Management Sciences, Sub-Campus, Latur": "managementLaturCount",
    "School of Technology, Sub-Campus, Latur": "techLaturCount",
    "School of Social Sciences, Sub-Campus, Latur": "socialLaturCount",
}

function getPreviousYears(yearsAgo) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    const previousYear = currentYear - yearsAgo;
    const yearBeforePrevious = previousYear - 1;

    const previousYears = `${yearBeforePrevious}-${previousYear.toString().slice(2)}`;

    return previousYears;
}

router.post('/admin/pdf/numericalData', async (req, res) => {
    try {
        const { schoolName } = req.body
        const linkToNavigate = `${process.env.Report_Main_URL}/admin/numericalData/${schoolName}`
        const fileName = `${schoolName}-NumericalDashboard-${new Date().getTime()}.pdf`
        await pupetteerSetting({ linkToNavigate, fileName })
        res.send({ status: 'generated', fileName })
    } catch (error) {
        res.send({ status: 'error' })
    }
})

router.post("/getDepartmentWiseDocumentCount", async (req, res) => {
    const { model, property } = req.body
    try {

        let report = {}

        if (facultyModels.includes(model)) {
            let data = await models[model].find({}).populate("userId")
            for (const school of Object.keys(dataSetter)) {

                let count = 0
                for (const item of data) {
                    if (item.userId !== null && item.userId.department === school) {
                        count += 1
                    }
                }
                report[dataSetter[school]] = count
            }
        } else {
            for (const school of Object.keys(dataSetter)) {
                let filter = { [property]: school }
                if (model === "AlumniUser") {
                    filter.isAlumni = true
                }
                else if (model === "StudentUser") {
                    filter.isAlumni = false
                }
                let count = await models[model].countDocuments({ [property]: school })
                report[dataSetter[school]] = count
            }
        }
        res.send(report)

    }
    catch (err) {
        console.log(err);
        res.status(500).send();
    }
})

router.post("/getDocumentCount", async (req, res) => {
    const mod = { 'User': 'facltyCount', 'DirectorUser': 'directorCount', 'AlumniUser': 'alumniCount', 'StudentUser': 'studentCount', 'BooksAndChapters': 'booksAndChaptersCount', 'ResearchProjects': 'researchProjectsCount', 'EContentDeveloped': 'eContentDevelopedCount', 'Petant': 'petantCount', 'ConferenceOrganized': 'conferenceOrganizedCount', 'InvitedTalk': 'invitedTalkCount', 'PhdAwarded': 'researchGuidanceCount', 'ResearchPapers': 'researchPapersCount', 'Fellowship': 'fellowshipCount', }

    let report = {};

    try {
        for (const model of Object.keys(mod)) {
            let fetch
            if (model === "AlumniUser") {
                fetch = await StudentUser.countDocuments({ isAlumni: true })
            }
            else if (model === "StudentUser") {
                fetch = await StudentUser.countDocuments({ isAlumni: false })
            }
            else {
                fetch = await models[model].countDocuments({})
            }

            report[mod[model]] = fetch
        }

        res.status(200).send({ report })
    }
    catch (err) {
        console.log(err);
        res.status(500).send();
    }
})

//Get Route
router.post('/Admin/getMultipleModelsData', async (req, res) => {
    const { years, arrModel } = req.body;
    let report = []
    await Promise.all(arrModel.map(async (model) => {
        let year = "year";
        for (const yearField in YearSelecter) {
            if (YearSelecter[yearField].includes(model)) {
                year = yearField;
            }
        }

        let filter = years.length > 0 ? { [year]: { $in: years } } : {};

        if (facultyModels.includes(model)) {
            const fetch = await new Promise((resolve, reject) => {
                models[model].find(filter).populate({
                    path: 'userId',
                    select: ('-password'),
                }).exec((err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });

            fetch.forEach(item => {
                if (item.userId !== null) {
                    if (model === "JrfSrf") {
                        item.guideName = item?.userId?.name;
                        item.schoolName = item?.userId?.department;
                        delete item.userId;
                        report.push(item);
                    }
                    if (model === "ResearchProject") {
                        item.principalName = item?.userId?.name;
                        item.schoolName = item?.userId?.department;
                        delete item.userId;
                        report.push(item);
                    }
                }
            });
        } else {
            let data = await models[model].find(filter);
            data.forEach(e => {
                report.push(e)
            })
        }

    }));

    res.send(report)

})

router.post('/Admin/getData', async (req, res) => {

    const { model, filter, filterConditios } = req.body
    let school = directorModels.includes(model) ? "SchoolName" : model === "AlumniUser" || model === "StudentUser" ? "schoolName" : model === 'DirectorUser' || model === 'User' ? "department" : ""

    let fil = {};
    let filc = {};
    if (filterConditios !== null) {
        filc = filterConditios
    }
    if (filter !== null) {
        fil = filter
    }

    try {
        if (facultyModels.includes(model)) {
            models[model].find(fil).populate({
                path: 'userId',
                match: filc,
                select: ('-password'),
            }).exec(function (err, fetch) {
                let filterData = []
                if (err) {
                    // throw err; 
                    console.log(err);
                }
                for (const item of fetch) {
                    if (item.userId !== null) {
                        filterData.push(item)
                    }
                }
                res.status(200).send(filterData);
            });
        }
        else if (school === "") {
            const fetch = await models[model].find(fil);
            res.status(200).send(fetch);
        }
        else {
            const fetch = await models[model].find(fil).sort({ [school]: 1 });
            res.status(200).send(fetch);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
})

router.post('/Admin/getFiveYearData', async (req, res) => {
    const { schoolName } = req.body
    try {

        const genrateAcademicYears = () => {
            const d = new Date()
            let year = d.getFullYear() + 1;
            const ly = year - 4;
            let arr = []
            for (year; year >= ly; year--) {
                let privyear = year.toString().slice(-2);
                let last = year - 1 + "-" + privyear;
                last = last.toString();

                arr.push(last)
            }
            return arr
        }



        const yearList = genrateAcademicYears();
        const docs = {}
        let oModels = Object.keys(models)
        const itemsToRemove = ["User", "DirectorUser", "Qualification", "Degree", "AppointmentsHeldPrior", "PostHeld", "Online", "Responsibilities", "BookAndChapter", "IctClassrooms", 'Petant', 'ResearchProject', 'ResearchPaper', 'Lectures', 'ReservedSeats', 'DemandRatio', 'StudentSatisfactionSurvey'];

        const filteredModels = oModels.filter(item => !itemsToRemove.includes(item));

        for (const model of filteredModels) {
            let school = directorModels.includes(model) ? "SchoolName" : model === "AlumniUser" || model === "StudentUser" ? "schoolName" : feedbackModels.includes(model) ? "schoolName" : ""
            docs[model] = {};
            let totalCount = 0;
            let alumniCount = 0
            await Promise.all(
                yearList.map(async (year) => {
                    let yearFieldNmae

                    for (const yearField in YearSelecter) {
                        if (YearSelecter[yearField].includes(model)) {
                            yearFieldNmae = yearField;
                            break;
                        }
                        else if (feedbackModels.includes(model)) {
                            yearFieldNmae = "academicYear"
                        }
                        else {
                            yearFieldNmae = 'year'
                        }

                    }
                    if (model === "AlumniUser") {
                        var filter = { isAlumni: true }
                        if (schoolName) filter[school] = schoolName
                        docs[model][year] = "--"
                        alumniCount = await StudentUser.countDocuments(filter);

                    }
                    else if (model === "StudentUser") {
                        var filter = { isAlumni: false, isActiveStudent: true }
                        if (schoolName) filter[school] = schoolName
                        let fetch = await models[model].find(filter);
                        let countStu = 0
                        for (const item of fetch) {
                            if (item.programEnroledOn === undefined) {
                                if (item.currentIn !== undefined) {
                                    let yeartosub = parseInt(item.currentIn.split(' ')[1]);
                                    if (year == getPreviousYears(yeartosub)) {
                                        countStu++;
                                    }
                                }
                            }
                            else if (item.programEnroledOn !== undefined) {
                                if (item.programEnroledOn === year) {
                                    countStu++;
                                }
                            }
                        }
                        docs[model][year] = countStu
                    }
                    else if (facultyModels.includes(model)) {
                        let schoolFilter = schoolName ? { department: schoolName } : {}
                        var filter = { [yearFieldNmae]: year }
                        if (schoolName) filter[school] = schoolName
                        if (model === "PhdAwarded") {
                            filter.degreeName = "Ph.D."
                            filter.awardSubmit = 'Awarded'
                        }
                        try {
                            const fetch = await models[model]
                                .find(filter)
                                .populate({
                                    path: 'userId',
                                    match: schoolFilter,
                                    select: ('-password'),
                                })
                                .exec();

                            let filterDataCount = 0;
                            for (const item of fetch) {
                                if (researchModels.includes(model)) {
                                    if (item.userId !== undefined && item.userId !== null) {
                                        filterDataCount++;
                                    } else if (item.userId === undefined && item.guideName !== undefined && item.schoolName !== undefined) {
                                        if (schoolFilter != {} && schoolFilter.department === item.schoolName) {
                                            filterDataCount++;
                                        }
                                        else if (schoolFilter == {}) {
                                            filterDataCount++;
                                        }

                                    }
                                }
                                else {
                                    if (item.userId !== null) {
                                        filterDataCount++;
                                    }
                                }
                            }

                            docs[model][year] = filterDataCount;
                        } catch (err) {
                            console.log(err);
                        }
                    }
                    else {
                        var filter = { [yearFieldNmae]: year }
                        if (schoolName) filter[school] = schoolName
                        docs[model][year] = await models[model].countDocuments(filter);
                    }
                    totalCount += docs[model][year]
                }));
            if (model === "AlumniUser") {
                docs[model]['Total'] = alumniCount
            } else {
                docs[model]['Total'] = totalCount
            }
        }
        res.status(200).send(docs);
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
})

router.post('/Admin/getNumaricalTileData', async (req, res) => {
    const { schoolName, year, model } = req.body
    try {
        let school = directorModels.includes(model) ? "SchoolName" : model === "AlumniUser" || model === "StudentUser" ? "schoolName" : feedbackModels.includes(model) ? "schoolName" : ""
        let yearFieldNmae
        for (const yearField in YearSelecter) {
            if (YearSelecter[yearField].includes(model)) {
                yearFieldNmae = yearField;
                break;
            }
            else if (feedbackModels.includes(model)) {
                yearFieldNmae = "academicYear"
            }
            else {
                yearFieldNmae = 'year'
            }

        }
        let data
        let module
        let proof

        if (model === "AlumniUser") {
            var filter = { isAlumni: true }
            if (schoolName) filter[school] = schoolName
            data = await StudentUser.find(filter);
            module = 'student'
            proof = 'uploadProof'
        }
        else if (model === "StudentUser") {
            var filter = { isAlumni: false, isActiveStudent: true }
            if (schoolName) filter[school] = schoolName
            let fetch = await models[model].find(filter);
            let countStu = []
            for (const item of fetch) {
                if (item.programEnroledOn === undefined) {
                    if (item.currentIn !== undefined) {
                        let yeartosub = parseInt(item.currentIn.split(' ')[1]);
                        if (year['$in'].includes(getPreviousYears(yeartosub))) {
                            countStu.push(item)
                        }
                    }
                }
                else if (item.programEnroledOn !== undefined) {
                    if (year['$in'].includes(item.programEnroledOn)) {
                        countStu.push(item)
                    }
                }
            }
            data = countStu
            module = 'student'
            proof = 'uploadProof'
        }
        else if (facultyModels.includes(model)) {
            let schoolFilter = schoolName ? { department: schoolName } : {}
            var filter = { [yearFieldNmae]: year }
            if (schoolName) filter[school] = schoolName
            if (model === "PhdAwarded") {
                filter.degreeName = "Ph.D."
                filter.awardSubmit = 'Awarded'
            }
            try {
                const fetch = await models[model]
                    .find(filter)
                    .populate({
                        path: 'userId',
                        match: schoolFilter,
                        select: ('-password'),
                    })
                    .exec();

                let filterData = [];
                for (const item of fetch) {
                    if (researchModels.includes(model)) {
                        if (item.userId !== undefined && item.userId !== null) {
                            filterData.push(item)
                        } else if (item.userId === undefined && item.guideName !== undefined && item.schoolName !== undefined) {
                            if (schoolFilter != {} && schoolFilter.department === item.schoolName) {
                                filterData.push(item)
                            }
                            else if (schoolFilter == {}) {
                                filterData.push(item)
                            }

                        }
                    }
                    else {
                        if (item.userId !== null) {
                            filterData.push(item)
                        }
                    }
                }

                data = filterData;
                module = 'faculty'
                proof = 'proof'
            } catch (err) {
                console.log(err);
            }
        }
        else {
            var filter = { [yearFieldNmae]: year }
            if (schoolName) filter[school] = schoolName
            data = await models[model].find(filter);
            module = 'director'
            proof = 'Upload_Proof'
        }
        res.status(200).send({ data, module, proof });
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
})

router.post('/Admin/reserchCenterData', async (req, res) => {
    const { schoolFilter, academicYearFilter } = req.body
    console.log(schoolFilter);
    let researchModels = ["JrfSrf", "ResearchProjects", "ResearchPapers", "BooksAndChapters", "Patent",]
    let docs = {};
    try {
        const promises = researchModels.map(async (model) => {
            const fetch = await models[model]
                .find(academicYearFilter)
                .populate({
                    path: 'userId',
                    match: schoolFilter,
                    select: '-password',
                })
                .exec();
            let filterData = [];

            for (const item of fetch) {
                if (item.userId === undefined && item.guideName !== undefined && item.schoolName !== undefined) {
                    if (schoolFilter != {} && schoolFilter.department === item.schoolName) {
                        filterData.push(item);
                    }
                    else {
                        filterData.push(item);
                    }

                }
            }
            docs[model] = filterData;
        });
        Promise.all(promises)
            .then(() => {
                res.status(200).send(docs);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send();
            });
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }

})

// added to tables at admin lavel
//get
router.post('/adminTable/getData', async (req, res) => {
    const { model, filter } = req.body
    try {
        const fetch = await models[model].find(filter);
        res.status(200).send(fetch);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'error' });
    }
})

//set
router.post("/adminTable/newRecord/:model", adminTableUpload.single("Proof"), async (req, res) => {
    try {
        const model = req.params.model
        // console.log(model)
        const data = JSON.parse(JSON.stringify(req.body));
        let SendData = null;
        // const { } = data
        const up = req.file.filename;
        SendData = data

        var withUpData = Object.assign(SendData, { proof: up })
        const obj = new models[model](withUpData);
        await obj.save();
        res.status(201).send("Entry Succeed")
    }
    catch (err) {
        console.log(err)
        res.status(500).send()
    }
});

//reset
router.post('/adminTable/editRecord/:model', adminTableUpload.single('Proof'), async (req, res) => {
    const model = req.params.model
    const data = JSON.parse(JSON.stringify(req.body));
    let SendData = null;
    const { id } = data
    const isfile = req.file;
    if (isfile) {
        var up = req.file.filename
    }
    SendData = data

    var alldata = null
    if (up) {
        alldata = Object.assign(SendData, { proof: up })
    }
    else {
        alldata = SendData
    }
    await models[model].findOneAndUpdate({ _id: id }, alldata)
    res.status(200).send("Edited Successfully")
})

//remove
router.post('/adminTable/deleteRecord', async (req, res) => {
    const { model, id } = req.body

    try {
        const Record = await models[model].findOne({ _id: id });
        await models[model].deleteOne({ _id: id })
        const Filename = Record.Proof;
        const link = path.join(__dirname, `../../uploads/adminTable-uploads/${Filename}`);
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

//registration page Enable/ Disable
router.post('/Registration/pageToggler', async (req, res) => {

    const { name, state } = req.body
    await IsRegistration.updateOne({ name: "isRegToggle" }, { $set: { [`idObject.${name}`]: state } })
    const status = await IsRegistration.findOne({ name: "isRegToggle" }, { idObject: 1 })
    res.send(status.idObject)
})
router.post('/Registration/pageStatus', async (req, res) => {
    const status = await IsRegistration.findOne({ name: "isRegToggle" }, { idObject: 1 })
    res.send(status.idObject)
})

module.exports = { router, AdminModels, models };