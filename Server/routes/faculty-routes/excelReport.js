const Excel = require('exceljs');
var options = { format: 'A4' };

// import all the models here
const AppointmentsHeldPrior = require('../../models/faculty-models/appointmentsHeldPrior');
const PostHeld = require('../../models/faculty-models/postHeld')
const Lectures = require('../../models/faculty-models/lectures');
const Online = require('../../models/faculty-models/online');
const ResearchProject = require('../../models/faculty-models/researchProjects');
const ResearchPaper = require('../../models/faculty-models/researchPapers')
const BookAndChapter = require('../../models/faculty-models/booksAndChapters')
const ResearchGuidance = require('../../models/faculty-models/researchGuidance')
const PhdAwarded = require('../../models/faculty-models/phdAwarded')
const JrfSrf = require('../../models/faculty-models/jrfsrf')
const AwardRecognition = require('../../models/faculty-models/awardAndRecognition')
const Patent = require('../../models/faculty-models/patent')
const ConsultancyServices = require('../../models/faculty-models/consultancyServices')
const Collaboration = require('../../models/faculty-models/collaborations')
const InvitedTalk = require('../../models/faculty-models/invitedTalk')
const ConferenceOrganized = require('../../models/faculty-models/conferenceOrganized')
const Fellowship = require('../../models/faculty-models/fellowship')
const User = require('../../models/faculty-models/userModel')
const Degree = require('../../models/faculty-models/degreeModel')
const EContentDeveloped = require('../../models/faculty-models/eContentDeveloped')


function excelRoute(app) {

    app.post('/api/getExcelReport', (req, res) => {
        const { model } = req.body

        if (model === 'User') {
            // get all user from Server
            User.find({}).then(function (users) {
                if (users.length > 0) {

                    // export the user into excel sheet using ExcelJs
                    const workbook = new Excel.Workbook();
                    const worksheet = workbook.addWorksheet('Sheet 1');

                    worksheet.columns = [
                        { header: 'Sr.', key: 'sr', width: 10 },
                        { header: 'Salutation', key: 'salutation', width: 30 },
                        { header: 'Name', key: 'name', width: 30 },
                        { header: 'Designation', key: 'designation', width: 30 },
                        { header: 'School Of', key: 'school_of', width: 30 },
                    ];

                    users.forEach((user, index) => {
                        worksheet.addRow({
                            sr: index + 1,
                            salutation: user.salutation,
                            name: user.name,
                            designation: user.designation,
                            school_of: user.department,
                        })
                    })

                    const filePath = `${new Date().getTime()}.xlsx`
                    workbook.xlsx.writeFile(`./excels/${filePath}`)
                    res.send({ status: 'generated', filePath })


                }
                else {
                    res.send({ status: 'error', message: 'No users found' })
                }
            }).catch(function (err) {
                res.send({ status: 'error', message: 'Something went wrong' })
            })
        }
        else if (model === 'Degree') {


            // get all degrees from server
            Degree.find({}).populate("userId").exec().then(function (dbdata) {
                if (dbdata.length > 0) {
                    const data = dbdata.filter(item => item.userId !== null)
                    data.sort((a, b) => (parseInt(a.awardDate) < parseInt(b.awardDate)) ? 1 : -1)

                    // export the degrees into excel sheet using ExcelJs
                    const workbook = new Excel.Workbook();
                    const worksheet = workbook.addWorksheet('Sheet 1');
                    worksheet.columns = [
                        { header: 'Sr.', key: 'sr', width: 5 },
                        { header: 'Name', key: 'name', width: 30 },
                        { header: 'Degrees', key: 'degrees', width: 30 },
                        { header: 'Title', key: 'title', width: 30 },
                        { header: 'Institution', key: 'institution', width: 30 },
                        { header: 'Award Date', key: 'award_date', width: 30 },
                        { header: 'Award Letter', key: 'letter', width: 30 },
                    ];



                    data.forEach((degree, index) => {
                        worksheet.addRow({
                            sr: index + 1,
                            name: degree.userId.name,
                            degrees: degree.degreeName,
                            title: degree.title,
                            award_date: degree.awardDate,
                            institution: degree.university,
                        })

                        worksheet.getCell(`G${index + 2}`).value = {
                            hyperlink: `http://172.16.24.44:4000/getFile/${degree.proof}`,
                            text: 'View Degree',
                            tooltip: 'View Degree',
                            color: { argb: '2062A800' },
                        };

                    })

                    const filePath = `${new Date().getTime()}.xlsx`
                    workbook.xlsx.writeFile(`./excels/${filePath}`)
                    res.send({ status: 'generated', filePath })
                }
            }).catch(function (err) { })

        }
        else if (model === 'AppointmentsHeldPrior') {
            console.log('Generate report for AppointmentsHeldPrior')
            // get all appointments from server
            AppointmentsHeldPrior.find({}).populate("userId").exec().then(function (dbdata) {
                if (dbdata.length > 0) {


                    const data = dbdata.filter(item => item.userId !== null)
                    data.sort(function (a, b) {
                        var dateA = new Date(a.createdAt), dateB = new Date(b.createdAt)
                        return dateB - dateA;
                    })


                    const workbook = new Excel.Workbook();
                    const worksheet = workbook.addWorksheet('Sheet 1');
                    worksheet.columns = [
                        { header: 'Sr.', key: 'sr', width: 5 },
                        { header: 'Name', key: 'name', width: 30 },
                        { header: 'Designation', key: 'designation', width: 30 },
                        { header: 'Employer Name', key: 'employerName', width: 30 },
                        { header: 'Joining Date', key: 'joiningDate', width: 30 },
                        { header: 'Leaving Date', key: 'leavingDate', width: 30 },
                        { header: 'Salary with Grade', key: 'salaryWithGrade', width: 30 },
                        { header: 'Leaving Reason', key: 'leavingReason', width: 30 },

                    ];

                    data.forEach((item, index) => {
                        worksheet.addRow({
                            sr: index + 1,
                            name: item.userId.name,

                            designation: item.designation,
                            employerName: item.employerName,
                            joiningDate: item.joiningDate,
                            leavingDate: item.leavingDate,
                            salaryWithGrade: item.salaryWithGrade,
                            leavingReason: item.leavingReason,
                        })

                    })

                    const filePath = `${new Date().getTime()}.xlsx`
                    workbook.xlsx.writeFile(`./excels/${filePath}`)

                    res.send({ status: 'generated', filePath })
                }
            }).catch(function (err) { })

        }
        else if (model === 'PostHeld') {
            // get all appointments from server
            PostHeld.find({}).populate("userId").exec().then(function (dbdata) {
                if (dbdata.length > 0) {


                    const data = dbdata.filter(item => item.userId !== null)
                    data.sort(function (a, b) {
                        var dateA = new Date(a.createdAt), dateB = new Date(b.createdAt)
                        return dateB - dateA;
                    })


                    const workbook = new Excel.Workbook();
                    const worksheet = workbook.addWorksheet('Sheet 1');
                    worksheet.columns = [
                        { header: 'Sr.', key: 'sr', width: 5 },
                        { header: 'Name', key: 'name', width: 30 },

                        { header: 'Designation', key: 'designation', width: 30 },
                        { header: 'Department', key: 'department', width: 30 },
                        { header: 'Joining Date', key: 'joiningDate', width: 30 },
                        { header: 'Leaving Date', key: 'leavingDate', width: 30 },
                        { header: 'Appointment Order / CAS Promotion', key: 'proof', width: 30 },


                    ];



                    data.forEach((item, index) => {
                        worksheet.addRow({
                            sr: index + 1,
                            name: item.userId.name,

                            designation: item.designation,
                            department: item.department,
                            joiningDate: item.joiningDate,
                            leavingDate: item.leavingDate,

                        })

                        worksheet.getCell(`G${index + 2}`).value = {
                            hyperlink: `http://172.16.24.44:4000/getFile/${item.proof}`,
                            text: 'View Proof',
                            tooltip: 'Click to View',
                            color: { argb: '2062A800' },
                        };

                    })

                    const filePath = `${new Date().getTime()}.xlsx`
                    workbook.xlsx.writeFile(`./excels/${filePath}`)
                    res.send({ status: 'generated', filePath })
                }
            }).catch(function (err) { })

        }
        else if (model === 'Lectures') {

            // get all degrees from server
            Lectures.find({}).populate("userId").exec().then(function (dbdata) {
                if (dbdata.length > 0) {

                    const data = dbdata.filter(item => item.userId !== null)
                    data.sort(function (a, b) {
                        var dateA = new Date(a.createdAt), dateB = new Date(b.createdAt)
                        return dateB - dateA;
                    })

                    const workbook = new Excel.Workbook();
                    const worksheet = workbook.addWorksheet('Sheet 1');
                    worksheet.columns = [
                        { header: 'Sr.', key: 'sr', width: 5 },
                        { header: 'Name', key: 'name', width: 30 },


                        { header: 'Course', key: 'course', width: 30 },
                        { header: 'Level', key: 'level', width: 30 },
                        { header: 'Teaching Mode', key: 'teachingMode', width: 30 },
                        { header: 'No Of Classes taken', key: 'noOfClasses', width: 30 },
                        { header: '% of Classes taken', key: 'percentageOfClasses', width: 30 },



                        { header: 'Year', key: 'year', width: 30 },
                        { header: 'Award Letter', key: 'letter', width: 30 },
                    ];



                    data.forEach((item, index) => {
                        worksheet.addRow({
                            sr: index + 1,
                            name: item.userId.name,

                            course: item.course,
                            level: item.level,
                            teachingMode: item.teachingMode,
                            noOfClasses: item.noOfClasses,
                            percentageOfClasses: item.percentageOfClasses,

                            year: item.year
                        })

                        worksheet.getCell(`I${index + 2}`).value = {
                            hyperlink: `http://172.16.24.44:4000/getFile/${item.proof}`,
                            text: 'View Proof',
                            tooltip: 'Click to View',
                            color: { argb: '2062A800' },
                        };

                    })

                    const filePath = `${new Date().getTime()}.xlsx`
                    workbook.xlsx.writeFile(`./excels/${filePath}`)
                    res.send({ status: 'generated', filePath })
                }
            }).catch(function (err) { })

        }
        else if (model === 'Online') {

            // get all degrees from server
            Online.find({}).populate("userId").exec().then(function (dbdata) {
                if (dbdata.length > 0) {

                    const data = dbdata.filter(item => item.userId !== null)
                    data.sort(function (a, b) {
                        var dateA = new Date(a.createdAt), dateB = new Date(b.createdAt)
                        return dateB - dateA;
                    })

                    const workbook = new Excel.Workbook();
                    const worksheet = workbook.addWorksheet('Sheet 1');
                    worksheet.columns = [
                        { header: 'Sr.', key: 'sr', width: 5 },
                        { header: 'Program Title', key: 'programTitle', width: 30 },
                        { header: 'Organized by', key: 'name', width: 30 },


                        { header: 'Duration From', key: 'durationFrom', width: 30 },
                        { header: 'Duration To', key: 'durationTo', width: 30 },




                        { header: 'Year', key: 'year', width: 30 },
                        { header: 'Proof', key: 'proof', width: 30 },
                    ];



                    data.forEach((item, index) => {
                        worksheet.addRow({
                            sr: index + 1,

                            programTitle: item.programTitle,
                            name: item.userId.name,
                            durationFrom: item.durationFrom,
                            durationTo: item.durationTo,


                            year: item.year
                        })

                        worksheet.getCell(`G${index + 2}`).value = {
                            hyperlink: `http://172.16.24.44:4000/getFile/${item.proof}`,
                            text: 'View Proof',
                            tooltip: 'Click to View',
                            color: { argb: '2062A800' },
                        };

                    })

                    const filePath = `${new Date().getTime()}.xlsx`
                    workbook.xlsx.writeFile(`./excels/${filePath}`)
                    res.send({ status: 'generated', filePath })
                }
            }).catch(function (err) { })

        }
        else if (model === 'ResearchProject') {

            // get all degrees from server
            ResearchProject.find({}).populate("userId").exec().then(function (dbdata) {
                if (dbdata.length > 0) {

                    const data = dbdata.filter(item => item.userId !== null)
                    data.sort(function (a, b) {
                        var dateA = new Date(a.createdAt), dateB = new Date(b.createdAt)
                        return dateB - dateA;
                    })

                    const workbook = new Excel.Workbook();
                    const worksheet = workbook.addWorksheet('Sheet 1');
                    worksheet.columns = [
                        { header: 'Sr.', key: 'sr', width: 5 },
                        { header: 'Name', key: 'name', width: 30 },


                        { header: 'Scheme/Project Name', key: 'schemeName', width: 30 },
                        { header: 'Program Title', key: 'programTitle', width: 30 },
                        { header: 'Principal Invigilator Name', key: 'principalName', width: 30 },
                        { header: 'Funding Agency Name', key: 'fundingName', width: 30 },
                        { header: 'Government/Non-Government', key: 'isGov', width: 30 },
                        { header: 'Department', key: 'department', width: 30 },
                        { header: 'Award Year', key: 'awardYear', width: 30 },
                        { header: 'Provided Funds (INR)', key: 'providedFunds', width: 30 },
                        { header: 'Project Duration', key: 'projectDuration', width: 30 },




                        { header: 'Year', key: 'year', width: 30 },
                        { header: 'Proof', key: 'proof', width: 30 },
                    ];



                    data.forEach((item, index) => {
                        worksheet.addRow({
                            sr: index + 1,
                            name: item.userId.name,

                            schemeName: item.schemeName,
                            programTitle: item.programTitle,
                            principalName: item.principalName,
                            fundingName: item.fundingName,
                            isGov: item.isGov,
                            department: item.department,
                            awardYear: item.awardYear,
                            providedFunds: item.providedFunds,
                            projectDuration: item.projectDuration,


                            year: item.year
                        })

                        worksheet.getCell(`M${index + 2}`).value = {
                            hyperlink: `http://172.16.24.44:4000/getFile/${item.proof}`,
                            text: 'View Proof',
                            tooltip: 'Click to View',
                            color: { argb: '2062A800' },
                        };

                    })

                    const filePath = `${new Date().getTime()}.xlsx`
                    workbook.xlsx.writeFile(`./excels/${filePath}`)
                    res.send({ status: 'generated', filePath })
                }
            }).catch(function (err) { })

        }
        else if (model === 'ResearchPaper') {

            // get all degrees from server
            ResearchPaper.find({}).populate("userId").exec().then(function (dbdata) {
                if (dbdata.length > 0) {

                    const data = dbdata.filter(item => item.userId !== null)
                    data.sort(function (a, b) {
                        var dateA = new Date(a.createdAt), dateB = new Date(b.createdAt)
                        return dateB - dateA;
                    })

                    const workbook = new Excel.Workbook();
                    const worksheet = workbook.addWorksheet('Sheet 1');
                    worksheet.columns = [
                        { header: 'Sr.', key: 'sr', width: 5 },
                        { header: 'Name', key: 'name', width: 30 },


                        { header: 'Paper Title', key: 'paperTitle', width: 30 },
                        { header: 'Teacher Department', key: 'authorName', width: 30 },
                        { header: 'Journal Name', key: 'teacherDepartment', width: 30 },
                        { header: 'Publication Year', key: 'publicationYear', width: 30 },
                        { header: 'ISSN Number', key: 'issnNumber', width: 30 },


                        { header: 'Year', key: 'year', width: 30 },
                        { header: 'Proof', key: 'proof', width: 30 },
                    ];



                    data.forEach((item, index) => {
                        worksheet.addRow({
                            sr: index + 1,
                            name: item.userId.name,

                            paperTitle: item.paperTitle,
                            authorName: item.authorName,
                            teacherDepartment: item.teacherDepartment,
                            journalName: item.journalName,
                            publicationYear: item.publicationYear,
                            issnNumber: item.issnNumber,


                            year: item.year
                        })

                        worksheet.getCell(`I${index + 2}`).value = {
                            hyperlink: `http://172.16.24.44:4000/getFile/${item.proof}`,
                            text: 'View Proof',
                            tooltip: 'Click to View',
                            color: { argb: '2062A800' },
                        };

                    })

                    const filePath = `${new Date().getTime()}.xlsx`
                    workbook.xlsx.writeFile(`./excels/${filePath}`)
                    res.send({ status: 'generated', filePath })
                }
            }).catch(function (err) { })

        }
        else if (model === 'BookAndChapter') {

            // get all degrees from server
            BookAndChapter.find({}).populate("userId").exec().then(function (dbdata) {
                if (dbdata.length > 0) {

                    const data = dbdata.filter(item => item.userId !== null)
                    data.sort(function (a, b) {
                        var dateA = new Date(a.createdAt), dateB = new Date(b.createdAt)
                        return dateB - dateA;
                    })

                    const workbook = new Excel.Workbook();
                    const worksheet = workbook.addWorksheet('Sheet 1');
                    worksheet.columns = [
                        { header: 'Sr.', key: 'sr', width: 5 },
                        { header: 'Name', key: 'name', width: 30 },


                        { header: 'Title of Book / Chapter / Edited Book / Translation', key: 'titleOfBook', width: 30 },
                        { header: 'Paper Title', key: 'paperTitle', width: 30 },
                        { header: 'Title of proceedings of the conference', key: 'titleOfProceeding', width: 30 },
                        { header: 'Conference Name', key: 'conName', width: 30 },
                        { header: 'National/Internal', key: 'isNat', width: 30 },
                        { header: 'Year of Publication', key: 'publicationYear', width: 30 },
                        { header: 'ISBN/ISSN number of proceeding', key: 'issnNumber', width: 30 },
                        { header: 'Affiliation Institute at the time of publication', key: 'aff', width: 30 },
                        { header: 'Publisher Name', key: 'publisherName', width: 30 },
                        { header: 'School Name', key: 'schoolName', width: 30 },




                        { header: 'Year', key: 'year', width: 30 },
                        { header: 'Proof', key: 'proof', width: 30 },
                    ];



                    data.forEach((item, index) => {
                        worksheet.addRow({
                            sr: index + 1,
                            name: item.userId.name,

                            titleOfBook: item.titleOfBook,
                            paperTitle: item.paperTitle,
                            titleOfProceeding: item.titleOfProceeding,
                            conName: item.conName,
                            isNat: item.isNat,
                            publicationYear: item.publicationYear,
                            issnNumber: item.issnNumber,
                            aff: item.aff,
                            publisherName: item.publisherName,
                            schoolName: item.schoolName,



                            year: item.year
                        })

                        worksheet.getCell(`N${index + 2}`).value = {
                            hyperlink: `http://172.16.24.44:4000/getFile/${item.proof}`,
                            text: 'View Proof',
                            tooltip: 'Click to View',
                            color: { argb: '2062A800' },
                        };

                    })

                    const filePath = `${new Date().getTime()}.xlsx`
                    workbook.xlsx.writeFile(`./excels/${filePath}`)
                    res.send({ status: 'generated', filePath })
                }
            }).catch(function (err) { })

        }
        else if (model === 'ResearchGuidance') {

            // get all degrees from server
            ResearchGuidance.find({}).populate("userId").exec().then(function (dbdata) {
                if (dbdata.length > 0) {

                    const data = dbdata.filter(item => item.userId !== null)
                    data.sort(function (a, b) {
                        var dateA = new Date(a.createdAt), dateB = new Date(b.createdAt)
                        return dateB - dateA;
                    })

                    const workbook = new Excel.Workbook();
                    const worksheet = workbook.addWorksheet('Sheet 1');
                    worksheet.columns = [
                        { header: 'Sr.', key: 'sr', width: 5 },
                        { header: 'Name', key: 'name', width: 30 },

                        { header: 'Year', key: 'year', width: 30 },
                        { header: 'Proof', key: 'proof', width: 30 },
                    ];



                    data.forEach((item, index) => {
                        worksheet.addRow({
                            sr: index + 1,
                            name: item.userId.name,



                            year: item.year
                        })

                        worksheet.getCell(`D${index + 2}`).value = {
                            hyperlink: `http://172.16.24.44:4000/getFile/${item.proof}`,
                            text: 'View Proof',
                            tooltip: 'Click to View',
                            color: { argb: '2062A800' },
                        };

                    })

                    const filePath = `${new Date().getTime()}.xlsx`
                    workbook.xlsx.writeFile(`./excels/${filePath}`)
                    res.send({ status: 'generated', filePath })
                }
            }).catch(function (err) { })

        }
        else if (model === 'AwardRecognition') {

            // get all degrees from server
            AwardRecognition.find({}).populate("userId").exec().then(function (dbdata) {
                if (dbdata.length > 0) {

                    const data = dbdata.filter(item => item.userId !== null)
                    data.sort(function (a, b) {
                        var dateA = new Date(a.createdAt), dateB = new Date(b.createdAt)
                        return dateB - dateA;
                    })

                    const workbook = new Excel.Workbook();
                    const worksheet = workbook.addWorksheet('Sheet 1');
                    worksheet.columns = [
                        { header: 'Sr.', key: 'sr', width: 5 },
                        { header: 'Name', key: 'name', width: 30 },


                        { header: 'Award Year', key: 'awardYear', width: 30 },
                        { header: 'PAN', key: 'pan', width: 30 },
                        { header: 'Designation', key: 'designation', width: 30 },
                        { header: 'Name of the Award, Fellowship, received from Government', key: 'agencyName', width: 30 },
                        { header: 'Award Agency Name', key: 'awardName', width: 30 },
                        { header: 'Incentives/Type of incentive given by the HEI in recognition of the award', key: 'incentive', width: 30 },

                        { header: 'Year', key: 'year', width: 30 },
                        { header: 'Proof', key: 'proof', width: 30 },
                    ];



                    data.forEach((item, index) => {
                        worksheet.addRow({
                            sr: index + 1,
                            name: item.userId.name,

                            awardYear: item.awardYear,
                            pan: item.pan,
                            designation: item.designation,
                            agencyName: item.agencyName,
                            awardName: item.awardName,
                            incentive: item.incentive,




                            year: item.year
                        })

                        worksheet.getCell(`J${index + 2}`).value = {
                            hyperlink: `http://172.16.24.44:4000/getFile/${item.proof}`,
                            text: 'View Proof',
                            tooltip: 'Click to View',
                            color: { argb: '2062A800' },
                        };

                    })

                    const filePath = `${new Date().getTime()}.xlsx`
                    workbook.xlsx.writeFile(`./excels/${filePath}`)
                    res.send({ status: 'generated', filePath })
                }
            }).catch(function (err) { })

        }
        else if (model === 'PhdAwarded') {

            // get all degrees from server
            PhdAwarded.find({}).populate("userId").exec().then(function (dbdata) {
                if (dbdata.length > 0) {

                    const data = dbdata.filter(item => item.userId !== null)
                    data.sort(function (a, b) {
                        var dateA = new Date(a.createdAt), dateB = new Date(b.createdAt)
                        return dateB - dateA;
                    })

                    const workbook = new Excel.Workbook();
                    const worksheet = workbook.addWorksheet('Sheet 1');
                    worksheet.columns = [
                        { header: 'Sr.', key: 'sr', width: 5 },
                        { header: 'Name', key: 'name', width: 30 },


                        { header: 'Department Name', key: 'departmentName', width: 30 },
                        { header: 'Guide Name', key: 'guideName', width: 30 },
                        { header: 'Thesis Title', key: 'thesisTitle', width: 30 },
                        { header: 'Year of Scholar Registration', key: 'yearOfScholar', width: 30 },
                        { header: 'Year of PhD Award', key: 'phdAwardYear', width: 30 },

                        { header: 'Year', key: 'year', width: 30 },
                        { header: 'Proof', key: 'proof', width: 30 },
                    ];



                    data.forEach((item, index) => {
                        worksheet.addRow({
                            sr: index + 1,
                            name: item.userId.name,

                            departmentName: item.departmentName,
                            guideName: item.guideName,
                            thesisTitle: item.thesisTitle,
                            yearOfScholar: item.yearOfScholar,
                            phdAwardYear: item.phdAwardYear,




                            year: item.year
                        })

                        worksheet.getCell(`H${index + 2}`).value = {
                            hyperlink: `http://172.16.24.44:4000/getFile/${item.proof}`,
                            text: 'View Proof',
                            tooltip: 'Click to View',
                            color: { argb: '2062A800' },
                        };

                    })

                    const filePath = `${new Date().getTime()}.xlsx`
                    workbook.xlsx.writeFile(`./excels/${filePath}`)
                    res.send({ status: 'generated', filePath })
                }
            }).catch(function (err) { })

        }
        else if (model === 'JrfSrf') {

            // get all degrees from server
            JrfSrf.find({}).populate("userId").exec().then(function (dbdata) {
                if (dbdata.length > 0) {

                    const data = dbdata.filter(item => item.userId !== null)
                    data.sort(function (a, b) {
                        var dateA = new Date(a.createdAt), dateB = new Date(b.createdAt)
                        return dateB - dateA;
                    })

                    const workbook = new Excel.Workbook();
                    const worksheet = workbook.addWorksheet('Sheet 1');
                    worksheet.columns = [
                        { header: 'Sr.', key: 'sr', width: 5 },
                        { header: 'Name', key: 'name', width: 30 },


                        { header: 'Enrolment Year', key: 'enrolmentYear', width: 30 },
                        { header: 'Fellowship Duration', key: 'fellowshipDuration', width: 30 },
                        { header: 'Fellowship Type', key: 'fellowshipType', width: 30 },
                        { header: 'Granting Agency', key: 'grantingAgency', width: 30 },
                        { header: 'Qualifying Exam (if any)', key: 'qualifyingExam', width: 30 },

                        { header: 'Year', key: 'year', width: 30 },
                        { header: 'Proof', key: 'proof', width: 30 },
                    ];



                    data.forEach((item, index) => {
                        worksheet.addRow({
                            sr: index + 1,
                            name: item.userId.name,

                            enrolmentYear: item.enrolmentYear,
                            fellowshipDuration: item.fellowshipDuration,
                            fellowshipType: item.fellowshipType,
                            grantingAgency: item.grantingAgency,
                            qualifyingExam: item.qualifyingExam,




                            year: item.year
                        })

                        worksheet.getCell(`I${index + 2}`).value = {
                            hyperlink: `http://172.16.24.44:4000/getFile/${item.proof}`,
                            text: 'View Proof',
                            tooltip: 'Click to View',
                            color: { argb: '2062A800' },
                        };

                    })

                    const filePath = `${new Date().getTime()}.xlsx`
                    workbook.xlsx.writeFile(`./excels/${filePath}`)
                    res.send({ status: 'generated', filePath })
                }
            }).catch(function (err) { })

        }
        else if (model === 'Fellowship') {

            // get all degrees from server
            Fellowship.find({}).populate("userId").exec().then(function (dbdata) {
                if (dbdata.length > 0) {

                    const data = dbdata.filter(item => item.userId !== null)
                    data.sort(function (a, b) {
                        var dateA = new Date(a.createdAt), dateB = new Date(b.createdAt)
                        return dateB - dateA;
                    })

                    const workbook = new Excel.Workbook();
                    const worksheet = workbook.addWorksheet('Sheet 1');
                    worksheet.columns = [
                        { header: 'Sr.', key: 'sr', width: 5 },
                        { header: 'Name', key: 'name', width: 30 },


                        { header: 'Name of the award/fellowship', key: 'awardName', width: 30 },
                        { header: 'Award Year', key: 'awardYear', width: 30 },
                        { header: 'Awarding Agency', key: 'awardingAgency', width: 30 },

                        { header: 'Year', key: 'year', width: 30 },
                        { header: 'Proof', key: 'proof', width: 30 },
                    ];



                    data.forEach((item, index) => {
                        worksheet.addRow({
                            sr: index + 1,
                            name: item.userId.name,

                            awardName: item.awardName,
                            awardYear: item.awardYear,
                            awardingAgency: item.awardingAgency,




                            year: item.year
                        })

                        worksheet.getCell(`G${index + 2}`).value = {
                            hyperlink: `http://172.16.24.44:4000/getFile/${item.proof}`,
                            text: 'View Proof',
                            tooltip: 'Click to View',
                            color: { argb: '2062A800' },
                        };

                    })

                    const filePath = `${new Date().getTime()}.xlsx`
                    workbook.xlsx.writeFile(`./excels/${filePath}`)
                    res.send({ status: 'generated', filePath })
                }
            }).catch(function (err) { })

        }
        else if (model === 'Patent') {

            // get all degrees from server
            Patent.find({}).populate("userId").exec().then(function (dbdata) {
                if (dbdata.length > 0) {

                    const data = dbdata.filter(item => item.userId !== null)
                    data.sort(function (a, b) {
                        var dateA = new Date(a.createdAt), dateB = new Date(b.createdAt)
                        return dateB - dateA;
                    })

                    const workbook = new Excel.Workbook();
                    const worksheet = workbook.addWorksheet('Sheet 1');
                    worksheet.columns = [
                        { header: 'Sr.', key: 'sr', width: 5 },
                        { header: 'Name', key: 'name', width: 30 },


                        { header: 'Patent Number', key: 'patentNumber', width: 30 },
                        { header: 'Patent Title', key: 'patentTitle', width: 30 },

                        { header: 'Award Year of Patent', key: 'awardYear', width: 30 },

                        { header: 'Year', key: 'year', width: 30 },
                        { header: 'Proof', key: 'proof', width: 30 },
                    ];



                    data.forEach((item, index) => {
                        worksheet.addRow({
                            sr: index + 1,
                            name: item.userId.name,

                            patentNumber: item.patentNumber,
                            patentTitle: item.patentTitle,
                            awardYear: item.awardYear,




                            year: item.year
                        })

                        worksheet.getCell(`G${index + 2}`).value = {
                            hyperlink: `http://172.16.24.44:4000/getFile/${item.proof}`,
                            text: 'View Proof',
                            tooltip: 'Click to View',
                            color: { argb: '2062A800' },
                        };

                    })

                    const filePath = `${new Date().getTime()}.xlsx`
                    workbook.xlsx.writeFile(`./excels/${filePath}`)
                    res.send({ status: 'generated', filePath })
                }
            }).catch(function (err) { })

        }
        else if (model === 'ConsultancyServices') {

            // get all degrees from server
            ConsultancyServices.find({}).populate("userId").exec().then(function (dbdata) {
                if (dbdata.length > 0) {

                    const data = dbdata.filter(item => item.userId !== null)
                    data.sort(function (a, b) {
                        var dateA = new Date(a.createdAt), dateB = new Date(b.createdAt)
                        return dateB - dateA;
                    })

                    const workbook = new Excel.Workbook();
                    const worksheet = workbook.addWorksheet('Sheet 1');
                    worksheet.columns = [
                        { header: 'Sr.', key: 'sr', width: 5 },
                        { header: 'Name', key: 'name', width: 30 },


                        { header: 'Consultancy Project Name', key: 'cProjectName', width: 30 },
                        { header: 'Consulting / Sponsoring Agency with contact', key: 'cAgency', width: 30 },
                        { header: 'Consultancy Year', key: 'cYear', width: 30 },
                        { header: 'Revenue Generated(INR)', key: 'revenue', width: 30 },

                        { header: 'Year', key: 'year', width: 30 },
                        { header: 'Proof', key: 'proof', width: 30 },
                    ];



                    data.forEach((item, index) => {
                        worksheet.addRow({
                            sr: index + 1,
                            name: item.userId.name,

                            cProjectName: item.cProjectName,
                            cAgency: item.cAgency,
                            cYear: item.cYear,
                            revenue: item.revenue,




                            year: item.year
                        })

                        worksheet.getCell(`H${index + 2}`).value = {
                            hyperlink: `http://172.16.24.44:4000/getFile/${item.proof}`,
                            text: 'View Proof',
                            tooltip: 'Click to View',
                            color: { argb: '2062A800' },
                        };

                    })

                    const filePath = `${new Date().getTime()}.xlsx`
                    workbook.xlsx.writeFile(`./excels/${filePath}`)
                    res.send({ status: 'generated', filePath })
                }
            }).catch(function (err) { })

        }
        else if (model === 'Collaboration') {

            // get all degrees from server
            Collaboration.find({}).populate("userId").exec().then(function (dbdata) {
                if (dbdata.length > 0) {

                    const data = dbdata.filter(item => item.userId !== null)
                    data.sort(function (a, b) {
                        var dateA = new Date(a.createdAt), dateB = new Date(b.createdAt)
                        return dateB - dateA;
                    })

                    const workbook = new Excel.Workbook();
                    const worksheet = workbook.addWorksheet('Sheet 1');
                    worksheet.columns = [
                        { header: 'Sr.', key: 'sr', width: 5 },
                        { header: 'Name', key: 'name', width: 30 },


                        { header: 'Title of the collaborative activity', key: 'collabTitle', width: 30 },
                        { header: 'Name of the collaborating agency with contact details', key: 'agencyName', width: 30 },
                        { header: 'Participant Name', key: 'participantName', width: 30 },
                        { header: 'Year of Collaboration', key: 'collabYear', width: 30 },
                        { header: 'Duration', key: 'duration', width: 30 },
                        { header: 'Nature of the activity', key: 'activityNature', width: 30 },

                        { header: 'Year', key: 'year', width: 30 },
                        { header: 'Proof', key: 'proof', width: 30 },
                    ];



                    data.forEach((item, index) => {
                        worksheet.addRow({
                            sr: index + 1,
                            name: item.userId.name,

                            collabTitle: item.collabTitle,
                            agencyName: item.agencyName,
                            participantName: item.participantName,
                            collabYear: item.collabYear,
                            duration: item.duration,
                            activityNature: item.activityNature,




                            year: item.year
                        })

                        worksheet.getCell(`J${index + 2}`).value = {
                            hyperlink: `http://172.16.24.44:4000/getFile/${item.proof}`,
                            text: 'View Proof',
                            tooltip: 'Click to View',
                            color: { argb: '2062A800' },
                        };

                    })

                    const filePath = `${new Date().getTime()}.xlsx`
                    workbook.xlsx.writeFile(`./excels/${filePath}`)
                    res.send({ status: 'generated', filePath })
                }
            }).catch(function (err) { })

        }
        else if (model === 'InvitedTalk') {

            // get all degrees from server
            InvitedTalk.find({}).populate("userId").exec().then(function (dbdata) {
                if (dbdata.length > 0) {

                    const data = dbdata.filter(item => item.userId !== null)
                    data.sort(function (a, b) {
                        var dateA = new Date(a.createdAt), dateB = new Date(b.createdAt)
                        return dateB - dateA;
                    })

                    const workbook = new Excel.Workbook();
                    const worksheet = workbook.addWorksheet('Sheet 1');
                    worksheet.columns = [
                        { header: 'Sr.', key: 'sr', width: 5 },
                        { header: 'Name', key: 'name', width: 30 },


                        { header: 'Title of Lecture/Academic Session', key: 'lectureTitle', width: 30 },
                        { header: 'Title of Seminar, etc.', key: 'seminarTitle', width: 30 },
                        { header: 'Organized by', key: 'organizedBy', width: 30 },
                        { header: 'National or International', key: 'isNational', width: 30 },

                        { header: 'Year', key: 'year', width: 30 },
                        { header: 'Proof', key: 'proof', width: 30 },
                    ];



                    data.forEach((item, index) => {
                        worksheet.addRow({
                            sr: index + 1,
                            name: item.userId.name,

                            lectureTitle: item.lectureTitle,
                            seminarTitle: item.seminarTitle,
                            organizedBy: item.organizedBy,
                            isNational: item.isNational,


                            year: item.year
                        })

                        worksheet.getCell(`H${index + 2}`).value = {
                            hyperlink: `http://172.16.24.44:4000/getFile/${item.proof}`,
                            text: 'View Proof',
                            tooltip: 'Click to View',
                            color: { argb: '2062A800' },
                        };

                    })

                    const filePath = `${new Date().getTime()}.xlsx`
                    workbook.xlsx.writeFile(`./excels/${filePath}`)
                    res.send({ status: 'generated', filePath })
                }
            }).catch(function (err) { })

        }
        else if (model === 'ConferenceOrganized') {

            // get all degrees from server
            ConferenceOrganized.find({}).populate("userId").exec().then(function (dbdata) {
                if (dbdata.length > 0) {

                    const data = dbdata.filter(item => item.userId !== null)
                    data.sort(function (a, b) {
                        var dateA = new Date(a.createdAt), dateB = new Date(b.createdAt)
                        return dateB - dateA;
                    })

                    const workbook = new Excel.Workbook();
                    const worksheet = workbook.addWorksheet('Sheet 1');
                    worksheet.columns = [
                        { header: 'Sr.', key: 'sr', width: 5 },
                        { header: 'Name', key: 'name', width: 30 },


                        { header: 'Program Title', key: 'programTitle', width: 30 },
                        { header: 'School Name', key: 'schoolName', width: 30 },
                        { header: 'Funded By', key: 'fundedBy', width: 30 },
                        { header: 'National or International', key: 'isNational', width: 30 },
                        { header: 'No of Participants', key: 'noOfParticipants', width: 30 },

                        { header: 'Year', key: 'year', width: 30 },
                        { header: 'Proof', key: 'proof', width: 30 },
                    ];



                    data.forEach((item, index) => {
                        worksheet.addRow({
                            sr: index + 1,
                            name: item.userId.name,

                            programTitle: item.programTitle,
                            schoolName: item.schoolName,
                            fundedBy: item.fundedBy,
                            isNational: item.isNational,
                            noOfParticipants: item.noOfParticipants,


                            year: item.year
                        })

                        worksheet.getCell(`I${index + 2}`).value = {
                            hyperlink: `http://172.16.24.44:4000/getFile/${item.proof}`,
                            text: 'View Proof',
                            tooltip: 'Click to View',
                            color: { argb: '2062A800' },
                        };

                    })

                    const filePath = `${new Date().getTime()}.xlsx`
                    workbook.xlsx.writeFile(`./excels/${filePath}`)
                    res.send({ status: 'generated', filePath })
                }
            }).catch(function (err) { })

        }
        else if (model === 'EContentDeveloped') {

            // get all degrees from server
            EContentDeveloped.find({}).populate("userId").exec().then(function (dbdata) {
                if (dbdata.length > 0) {

                    const data = dbdata.filter(item => item.userId !== null)
                    data.sort(function (a, b) {
                        var dateA = new Date(a.createdAt), dateB = new Date(b.createdAt)
                        return dateB - dateA;
                    })

                    const workbook = new Excel.Workbook();
                    const worksheet = workbook.addWorksheet('Sheet 1');
                    worksheet.columns = [
                        { header: 'Sr.', key: 'sr', width: 5 },
                        { header: 'Teacher Name', key: 'name', width: 30 },


                        { header: 'Name of the Module / Course Developed', key: 'moduleName', width: 30 },
                        { header: 'Platform on which module was developed', key: 'platform', width: 30 },

                        { header: 'Year', key: 'year', width: 30 },
                        { header: 'Link to Content', key: 'link', width: 30 },
                    ];



                    data.forEach((item, index) => {
                        worksheet.addRow({
                            sr: index + 1,
                            name: item.userId.name,

                            moduleName: item.moduleName,
                            platform: item.platform,

                            year: item.year
                        })

                        worksheet.getCell(`F${index + 2}`).value = {
                            hyperlink: `${item.proof}`,
                            text: 'Go to Content',
                            tooltip: 'Click to View',
                            color: { argb: '2062A800' },
                        };

                    })

                    const filePath = `${new Date().getTime()}.xlsx`
                    workbook.xlsx.writeFile(`./excels/${filePath}`)
                    res.send({ status: 'generated', filePath })
                }
            }).catch(function (err) { })

        }

    })


}

module.exports = excelRoute