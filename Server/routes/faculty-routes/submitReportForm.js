const UserModel = require('../../models/faculty-models/userModel')
const CASModel = require('../../models/faculty-models/casModel')
const PBASModel = require('../../models/faculty-models/pbasModel')
const AAAModel = require('../../models/director-models/academic-audit-models/academicAuditModel')
const FacultyAQARModel = require('../../models/aqar-models/facultyAqarModel')
const DirectorAQARModel = require('../../models/aqar-models/directorAqarModel')
const { SchoolsProgram } = require('../../utility/allschool')

const modelsInfo = {
    CASModel: {
        model: CASModel,
        title: 'CAS'
    },
    PBASModel: {
        model: PBASModel,
        title: 'PBAS'
    },
    AAAModel: {
        model: AAAModel,
        title: 'AAA'
    },
    FacultyAQARModel: {
        model: FacultyAQARModel,
        title: 'Faculty AQAR'
    },
    DirectorAQARModel: {
        model: DirectorAQARModel,
        title: 'Director AQAR'
    }
}


function submitReportForm(app) {
    app.post('/services/submitForm', (req, res) => {
        const { filter, year, model } = req.body;

        modelsInfo[model].model.findOne(filter, (err, item) => {
            if (err) {
                console.log(err);
                return res.send({ status: "error", message: `Could not find the ${modelsInfo[model].title} account with this user.` });
            }

            if (item) {
                item.submitted = [...new Set([...item.submitted, year])]?.sort((a, b) => {
                    const numA = Number(a.replace('-', ''));
                    const numB = Number(b.replace('-', ''));
                    if (numA > numB) {
                        return -1;
                    } else if (numA < numB) {
                        return 1;
                    }
                    return 0;
                });;

                item.save((err, updatedItem) => {
                    if (err) {
                        console.log(err);
                        return res.send({ status: "error", message: "Error saving data." });
                    }
                    res.send({ status: 'success', data: updatedItem });
                });
            } else {
                console.log('COuld not find matching doc', filter)
                res.send({ status: 'error', message: `Could not find the ${modelsInfo[model].title} account with this user.` });
            }
        });
    });


    app.post("/services/getTotalReportData", async (req, res) => {

        const { year, school } = req.body

        let filter = {}
        if (school) {
            filter = { schoolName: school }
        }

        try {
            let CAS = await CASModel.find(filter).lean().populate("userId").select("submitted userId").populate().exec()
            let PBAS = await PBASModel.find(filter).lean().populate("userId").select("submitted userId").populate().exec()
            let FAQAR = await FacultyAQARModel.find(filter).lean().populate("userId").select("submitted userId").populate().exec()
            let AAA = await AAAModel.find(filter).lean().select("submitted schoolName").populate().exec()
            let DAQAR = await DirectorAQARModel.find(filter).lean().select("submitted schoolName").populate().exec()
            let Users = await UserModel.find(filter).lean().select("salutation name department designation")


            let CASUsers = CAS.filter((item) => item.submitted && (item.submitted.length > 0 && item.submitted.includes(year)) ? true : false)
            let PBASUsers = PBAS.filter((item) => item.submitted && (item.submitted.length > 0 && item.submitted.includes(year)) ? true : false)
            let FAQARUsers = FAQAR.filter((item) => item.submitted && (item.submitted.length > 0 && item.submitted.includes(year)) ? true : false)
            let AAAUsers = AAA.filter((item) => item.submitted && (item.submitted.length > 0 && item.submitted.includes(year)) ? true : false)
            let DAQARUsers = DAQAR.filter((item) => item.submitted && (item.submitted.length > 0 && item.submitted.includes(year)) ? true : false)


            const schools = Object.keys(SchoolsProgram)

            const UsersSchoolWise = schools.reduce((result, school) => {
                if (typeof school === 'string') {
                    const users = []
                    Users.forEach((user) => {
                        if (user.department === school) {
                            users.push(user)
                        }
                    })
                    result[school] = users;
                }
                return result;
            }, {});

            const CASSchoolWise = schools.reduce((result, school) => {
                if (typeof school === 'string') {
                    const count = CASUsers.filter((user) => user.userId.department === school).length;
                    result[school] = count;
                }
                return result;
            }, {});

            const PBASSchoolWise = schools.reduce((result, school) => {
                if (typeof school === 'string') {
                    const count = PBASUsers.filter((user) => user.userId.department === school).length;
                    result[school] = count;
                }
                return result;
            }, {});
            const FAQARSchoolWise = schools.reduce((result, school) => {
                if (typeof school === 'string') {
                    const count = FAQARUsers.filter((user) => user.userId.department === school).length;
                    result[school] = count;
                }
                return result;
            }, {});
            const AAASchoolWise = schools.reduce((result, school) => {
                if (typeof school === 'string') {
                    const submitted = AAAUsers.map((item) => item.schoolName === school ? item.submitted : []).flat();
                    result[school] = submitted;
                }
                return result;
            }, {});
            const DAQARSchoolWise = schools.reduce((result, school) => {
                if (typeof school === 'string') {
                    const submitted = DAQARUsers.map((item) => item.schoolName === school ? item.submitted : []).flat();
                    result[school] = submitted;
                }
                return result;
            }, {});

            const CASUserId = CASUsers.map((item) => item.userId._id)
            const PBASUserId = PBASUsers.map((item) => item.userId._id)
            const FAQARUserId = FAQARUsers.map((item) => item.userId._id)


            let data = { UsersSchoolWise, CASSchoolWise, PBASSchoolWise, FAQARSchoolWise, AAASchoolWise, DAQARSchoolWise, CASUserId, PBASUserId, FAQARUserId }
            res.send({ status: "success", data: data })

        } catch (error) {
            console.log(error)
            res.send({ status: "error", message: "Could not fetch data" })
        }




    })

}


module.exports = submitReportForm;