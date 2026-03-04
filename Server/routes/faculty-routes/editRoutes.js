// multer configuration
const path = require('path')

const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const link = path.join(__dirname, `../../uploads/faculty-uploads/`)
        cb(null, link)
    },
    filename: (req, file, cb) => {
        cb(null, `${new Date().getTime()}-${file.originalname}`)
    },
})
const upload = multer({ storage: storage })



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
const Qualification = require('./../../models/faculty-models/qualificationModel')
const EContentDeveloped = require('../../models/faculty-models/eContentDeveloped')
const PolicyDocuments = require('../../models/faculty-models/policyDocuments')
const Experience = require('../../models/faculty-models/experienceModel')
const FinancialSupport = require('../../models/faculty-models/financialSupport')
const Responsibilities = require('../../models/faculty-models/responsibilities')
const ConferenceParticipated = require('../../models/faculty-models/conferenceParticipated')
const ForeignVisit = require('../../models/faculty-models/foreignVisit')


// fs function for file system operations
const fs = require('fs');

async function deleteFile(filename, type, callback) {
    let paths = {
        faculty: path.join(__dirname, `../../uploads/faculty-uploads/${filename}`)
    }
    fs.unlink(paths[type], callback)

}




function editRoutes(app) {


    // edit personal profile Configuration
    app.post("/api/editProfile", upload.single('file'), (req, res) => {
        const editData = JSON.parse(JSON.stringify(req.body));
        const { salutation, name, designation, department, promotionDate, gradePay, address, mobile, email, dob, specialization, racDate, cast, userId, orcidId, scopusId, googleScholarId, researcherId, personalWebsiteLink } = editData;
        if (req.file) {
            User.findOneAndUpdate(
                { _id: userId },
                {
                    salutation, name, designation, department, promotionDate, gradePay, address, mobile, email, dob, specialization, racDate, cast, orcidId, scopusId, googleScholarId, researcherId, personalWebsiteLink,
                    photoURL: req.file.filename,
                }
            ).then(function (user) {
                res.send({ status: "edited", user: user });
            })
                .catch(function (err) {
                    res.send({ status: "error" });
                });
        } else {
            User.findOneAndUpdate(
                { _id: userId },
                {
                    salutation, name, designation, department, promotionDate, gradePay, address, mobile, email, dob, specialization, racDate, cast, orcidId, scopusId, googleScholarId, researcherId, personalWebsiteLink
                }
            ).then(function (user) {
                res.send({ status: "edited", user: user });
            })
                .catch(function (err) {
                    res.send({ status: "error" });
                });
        }
    });

    app.post('/api/editProfile/withFormData', upload.single('file'), (req, res) => {
        const editData = JSON.parse(JSON.stringify(req.body));
        const { userId } = editData
        User.findOneAndUpdate({ _id: userId }, editData).then(function (user) {
            res.send({ status: "edited", user: user });
        })
            .catch(function (err) {
                res.send({ status: "error" });
            });
    })

    // Qualification
    app.post('/api/edit/Qualification', (req, res) => {
        const { data } = req.body



        Qualification.findOneAndUpdate({ _id: data.itemId }, {
            exam: data.exam,
            institute: data.institute,
            year: data.year,
            percentage: data.percentage,
            subjects: data.subjects,
        }).then(function (data, err) {
            if (data) {

                res.send({ status: 'deleted' })
            }
            else {
                console.log(err)
                res.send({ status: 'error' })
            }
        }).catch(function (err) {
            console.log('err:', err)
            res.send({ status: 'error' })
        }

        )

    })

    // ForeignVisits
    app.post('/api/edit/ForeignVisit', (req, res) => {
        const { data } = req.body



        ForeignVisit.findOneAndUpdate({ _id: data.itemId }, {
            purposeOfVisit: data.purposeOfVisit,
            nameOfTheInstitutionVisited: data.nameOfTheInstitutionVisited,
            fromDate: data.fromDate,
            toDate: data.toDate,
            year: data.year,
        }).then(function (data, err) {
            if (data) {

                res.send({ status: 'deleted' })
            }
            else {
                console.log(err)
                res.send({ status: 'error' })
            }
        }).catch(function (err) {
            console.log('err:', err)
            res.send({ status: 'error' })
        }

        )

    })

    // experience
    app.post('/api/edit/Experience', (req, res) => {
        const { data } = req.body

        Experience.findOneAndUpdate({ _id: data.itemId }, {
            ug: data.ug,
            pg: data.pg,
            researchExperience: data.researchExperience,
            specialization: data.specialization,
            userId: data.userId,
        }).then(function (data) {
            if (data) {
                res.send({ status: 'deleted' })
            }
            else {
                res.send({ status: 'error' })
            }
        }).catch(function (err) {
            res.send({ status: 'error' })
        }

        )

    })

    // post held
    app.post('/api/edit/PostHeld', upload.single('file'), (req, res) => {
        const data = JSON.parse(JSON.stringify(req.body));

        if (req.file) {
            PostHeld.findOneAndUpdate({ _id: data.itemId }, {
                designation: data.designation,
                level: data.level,
                userDepartment: data.department,
                duration: data.duration,
                durationYears: [...JSON.parse(data.durationYears)],
                active: data.active,
                proof: req.file.filename,
            }).then(function (docs) {

                deleteFile(data.proof, 'faculty', (err) => {
                    try {


                        if (err) {
                            throw new Error('File not found')
                        }

                        res.send({ status: 'deleted', data: docs });
                    } catch (error) {

                        console.log('The error is :', error)
                        res.send({ status: 'error' });
                    }
                })
            }).catch(function (err) {
                res.send({ status: 'error' })
            }

            )
        }
        else {
            PostHeld.findOneAndUpdate({ _id: data.itemId }, {
                designation: data.designation,
                level: data.level,
                userDepartment: data.department,
                duration: data.duration,
                durationYears: [...JSON.parse(data.durationYears)],
                active: data.active,
            }).then(function (data) {
                if (data) {
                    res.send({ status: 'deleted' })
                }
                else {
                    res.send({ status: 'error' })
                }
            }).catch(function (err) {
                res.send({ status: 'error' })
            }

            )
        }


    })

    // Responsibities
    app.post('/api/edit/Responsibilities', upload.single('file'), (req, res) => {
        const data = JSON.parse(JSON.stringify(req.body));



        if (req.file) {
            Responsibilities.findOneAndUpdate({ _id: data.itemId }, {
                committeeName: data.committeeName,
                designation: data.designation,
                institute: data.institute,
                duration: data.duration,
                active: data.active,
                durationYears: [...JSON.parse(data.durationYears)],
                proof: req.file.filename,
            }).then(function (docs) {

                deleteFile(data.proof, 'faculty', (err) => {
                    try {


                        if (err) {
                            throw new Error('File not found')
                        }

                        res.send({ status: 'deleted', data: docs });
                    } catch (error) {
                        console.log('in catch')

                        console.log('The error is :', error)
                        res.send({ status: 'error' });
                    }
                })
            }).catch(function (err) {
                res.send({ status: 'error' })
            }

            )
        }
        else {
            Responsibilities.findOneAndUpdate({ _id: data.itemId }, {
                committeeName: data.committeeName,
                designation: data.designation,
                institute: data.institute,
                active: data.active,
                duration: data.duration,
                durationYears: [...JSON.parse(data.durationYears)],
            }).then(function (data) {
                if (data) {
                    res.send({ status: 'deleted' })
                }
                else {
                    res.send({ status: 'error' })
                }
            }).catch(function (err) {
                res.send({ status: 'error' })
            }

            )
        }


    })

    //  financialSupport
    app.post('/api/edit/FinancialSupport', upload.single('file'), (req, res) => {

        const data = JSON.parse(JSON.stringify(req.body));
        const { nameOfConference, feeprovider, amountOfSupport, pan, year, } = data
        if (req.file) {

            FinancialSupport.findOneAndUpdate({ _id: data.itemId }, {
                nameOfConference: nameOfConference,
                feeprovider: feeprovider,
                amountOfSupport: amountOfSupport,
                pan: pan,
                year: year,
                proof: req.file.filename,

            }).then(function (data) {
                if (data) {
                    res.send({ status: 'deleted' })
                }
                else {
                    res.send({ status: 'error' })
                }

            }).catch(function (err) {
                res.send({ status: 'error' })
            }

            )
        }
        else {

            FinancialSupport.findOneAndUpdate({ _id: data.itemId }, {
                nameOfConference: nameOfConference,
                feeprovider: feeprovider,
                amountOfSupport: amountOfSupport,
                pan: pan,
                year: year,

            }).then(function (data) {

                if (data) {
                    res.send({ status: 'deleted' })
                }
                else {
                    res.send({ status: 'error' })
                }

            }).catch(function (err) {
                res.send({ status: 'error' })
            }



            )
        }
    })

    // appointmentsHeldPrior
    app.post('/api/edit/AppointmentsHeldPrior', upload.single('file'), (req, res) => {
        const data = JSON.parse(JSON.stringify(req.body));
        if (req.file) {

            AppointmentsHeldPrior.findOneAndUpdate({ _id: data.userId }, {
                designation: data.designation,
                employerName: data.employerName,
                joiningDate: data.joiningDate,
                leavingDate: data.leavingDate,
                salaryWithGrade: data.salaryWithGrade,
                leavingReason: data.leavingReason,
                proof: req.file.filename,
            }).then(function (docs) {

                deleteFile(data.proof, 'faculty', (err) => {
                    try {


                        if (err) {
                            throw new Error('File not found')
                        }

                        res.send({ status: 'deleted', data: docs });
                    } catch (error) {
                        console.log('in catch')

                        console.log('The error is :', error)
                        res.send({ status: 'error' });
                    }
                })
            }).catch(function (err) {
                res.send({ status: 'error' })
            }

            )
        }
        else {
            AppointmentsHeldPrior.findOneAndUpdate({ _id: data.userId }, {
                designation: data.designation,
                employerName: data.employerName,
                joiningDate: data.joiningDate,
                leavingDate: data.leavingDate,
                salaryWithGrade: data.salaryWithGrade,
                leavingReason: data.leavingReason,
            }).then(function (data) {
                if (data) {
                    res.send({ status: 'deleted' })
                }
                else {
                    res.send({ status: 'error' })
                }
            }).catch(function (err) {
                res.send({ status: 'error' })
            }

            )
        }




    })

    // EContentDeveloped
    app.post('/api/edit/EContentDeveloped', upload.single('file'), (req, res) => {
        const data = JSON.parse(JSON.stringify(req.body));


        if (req.file) {
            EContentDeveloped.findOneAndUpdate({ _id: data.itemId }, {
                moduleName: data.moduleName,
                creationType: data.creationType,
                platform: data.platform,
                year: data.year,
                link: data.link,
                proof: req.file.filename,

            }).then(function (data) {
                if (data) {
                    res.send({ status: 'deleted' })
                }
                else {
                    res.send({ status: 'error' })
                }
            }).catch(function (err) {
                res.send({ status: 'error' })
            }
            )
        } else {
            EContentDeveloped.findOneAndUpdate({ _id: data.itemId }, {
                moduleName: data.moduleName,
                creationType: data.creationType,
                platform: data.platform,
                year: data.year,
                link: data.link,
                proof: data.proof,
            }).then(function (data) {
                if (data) {
                    res.send({ status: 'deleted' })
                }
                else {
                    res.send({ status: 'error' })
                }
            }).catch(function (err) {
                res.send({ status: 'error' })
            }
            )
        }



    })

    // degrees
    app.post('/api/edit/Degree', upload.single('file'), (req, res) => {

        const data = JSON.parse(JSON.stringify(req.body));
        if (req.file) {
            Degree.findOneAndUpdate({ _id: data.itemId }, {
                degreeName: data.degreeName,
                title: data.title,
                university: data.university,
                awardDate: data.awardDate,
                subject: data.subject,
                proof: req.file.filename,
            }).then(function (docs) {

                deleteFile(data.proof, 'faculty', (err) => {
                    try {


                        if (err) {
                            throw new Error('File not found')
                        }

                        res.send({ status: 'deleted', data: docs });
                    } catch (error) {
                        console.log('in catch')

                        console.log('The error is :', error)
                        res.send({ status: 'error' });
                    }
                })
            }).catch(function (err) {
                res.send({ status: 'error' })
            }

            )
        }
        else {
            Degree.findOneAndUpdate({ _id: data.itemId }, {
                degreeName: data.degreeName,
                title: data.title,
                university: data.university,
                awardDate: data.awardDate,
                subject: data.subject,
                proof: data.proof,
            }).then(function (data) {
                if (data) {
                    res.send({ status: 'deleted' })
                }
                else {
                    res.send({ status: 'error' })
                }
            }).catch(function (err) {
                res.send({ status: 'error' })
            }

            )
        }
    })

    // lectures
    app.post('/api/edit/Lectures', upload.single('file'), (req, res) => {

        const { data } = req.body
        const { course, level, mode, noOfClasses, classesTaken, year } = data

        Lectures.findOneAndUpdate({ _id: data.itemId }, {
            course: course,
            level: level,
            teachingMode: mode,
            noOfClasses: noOfClasses,
            classesTaken: classesTaken,
            year: year,
        }).then(function (data) {
            if (data) {
                res.send({ status: 'deleted' })
            }
            else {
                res.send({ status: 'error' })
            }
        }).catch(function (err) {
            res.send({ status: 'error' })
        }

        )
    })

    // online
    app.post('/api/edit/Online', upload.single('file'), (req, res) => {

        const data = JSON.parse(JSON.stringify(req.body));

        if (req.file) {
            Online.findOneAndUpdate({ _id: data.itemId }, {
                nameOfAttendedTeacher: data.nameOfAttendedTeacher,
                programTitle: data.programTitle,
                durationFrom: data.durationFrom,
                durationTo: data.durationTo,
                year: data.year,
                proof: req.file.filename,
            }).then(function (docs) {

                deleteFile(data.proof, 'faculty', (err) => {
                    try {


                        if (err) {
                            throw new Error('File not found')
                        }

                        res.send({ status: 'deleted', data: docs });
                    } catch (error) {
                        console.log('in catch')

                        console.log('The error is :', error)
                        res.send({ status: 'error' });
                    }
                })
            }).catch(function (err) {
                res.send({ status: 'error' })
            }

            )
        }
        else {

            Online.findOneAndUpdate({ _id: data.itemId }, {
                nameOfAttendedTeacher: data.nameOfAttendedTeacher,
                programTitle: data.programTitle,
                durationFrom: data.durationFrom,
                durationTo: data.durationTo,
                year: data.year,
            }).then(function (data) {
                if (data) {
                    res.send({ status: 'deleted' })
                }
                else {
                    res.send({ status: 'error' })
                }
            }).catch(function (err) {
                res.send({ status: 'error' })
            }

            )
        }
    })

    // ResearchProject
    app.post('/api/edit/ResearchProject', upload.single('file'), (req, res) => {

        const data = JSON.parse(JSON.stringify(req.body));

        if (req.file) {
            ResearchProject.findOneAndUpdate({ _id: data.itemId }, {
                schemeName: data.schemeName,
                programTitle: data.programTitle,
                principalName: data.principalName,
                coInvestigator: data.coInvestigator,
                fundingName: data.fundingName,
                isGov: data.isGov,
                department: data.department,
                awardYear: data.awardYear,
                durationYears: [...JSON.parse(data.durationYears)],
                active: data.active,
                duration: data.duration,
                fundType: data.fundType,
                status: data.status,
                guideName: data.guideName,
                schoolName: data.schoolName,
                providedFunds: data.providedFunds,
                year: data.year,
                proof: req.file.filename,
            }).then(function (docs) {

                deleteFile(data.proof, 'faculty', (err) => {
                    try {


                        if (err) {
                            throw new Error('File not found')
                        }

                        res.send({ status: 'deleted', data: docs });
                    } catch (error) {
                        console.log('in catch')

                        console.log('The error is :', error)
                        res.send({ status: 'error' });
                    }
                })
            }).catch(function (err) {
                res.send({ status: 'error' })
            }

            )
        }
        else {

            ResearchProject.findOneAndUpdate({ _id: data.itemId }, {
                schemeName: data.schemeName,
                programTitle: data.programTitle,
                coInvestigator: data.coInvestigator,
                isCo: data.isCo,
                principalName: data.principalName,
                fundingName: data.fundingName,
                isGov: data.isGov,
                department: data.department,
                guideName: data.guideName,
                schoolName: data.schoolName,
                awardYear: data.awardYear,
                durationYears: [...JSON.parse(data.durationYears)],
                active: data.active,
                duration: data.duration,
                providedFunds: data.providedFunds,
                fundType: data.fundType,
                status: data.status,
                year: data.year,
            }).then(function (data) {
                if (data) {
                    res.send({ status: 'deleted' })
                }
                else {
                    res.send({ status: 'error' })
                }
            }).catch(function (err) {
                res.send({ status: 'error' })
            }

            )
        }
    })

    // ResearchPaper
    app.post('/api/edit/ResearchPaper', upload.fields([{ name: 'file', maxCount: 1 }, { name: 'ifProof', maxCount: 1 }]), (req, res) => {

        const data = JSON.parse(JSON.stringify(req.body));
        const active = JSON.parse(data?.active)

        ResearchPaper.findOneAndUpdate({ _id: data.itemId }, {
            paperTitle: data.paperTitle,
            journalName: data.journalName,
            authors: data.authors,
            publicationYear: data.publicationYear,
            indexedIn: data.indexedIn,
            indexData: data.indexData,
            indexLink: data.indexLink,
            indexLinkData: data.indexLinkData,
            issnNumber: data.issnNumber,
            isIFActive: active,
            impactFactor: active ? data?.impactFactor : 'N/A',
            year: data.year,
            ifProof: active ? (req.files["ifProof"] ? req.files["ifProof"]?.[0]?.filename : (data?.ifProof === 'null' ? JSON.parse(data?.ifProof) : data?.ifProof)) : null,
            proof: req.files["file"] ? req.files["file"]?.[0]?.filename : (data?.file === 'null' ? JSON.parse(data?.file) : data?.file),
        }).then(function (docs) {

            if (req.files.length > 0) {
                if (req.files.ifProof) {
                    deleteFile(data.ifProof, 'faculty', (err) => {
                        try {
                            if (err) {
                                throw new Error('File not found')
                            }
                            res.send({ status: 'deleted', data: docs });
                        } catch (error) {
                            console.log('in catch')
                            res.send({ status: 'error', error: 'Previous file not found...' });
                        }
                    })
                }

                if (req.files.file) {
                    deleteFile(data.proof, 'faculty', (err) => {
                        try {
                            if (err) {
                                throw new Error('File not found')
                            }
                            res.send({ status: 'deleted', data: docs });
                        } catch (error) {
                            console.log('in catch')
                            res.send({ status: 'error', error: 'Previous file not found...' });
                        }
                    })
                }

            } else {
                res.send({ status: 'deleted', data: docs });
            }



        }).catch(function (err) {
            res.send({ status: 'error' })
        }

        )
    })

    // BookAndChapter
    app.post('/api/edit/BookAndChapter', upload.single('file'), (req, res) => {

        const data = JSON.parse(JSON.stringify(req.body));

        if (req.file) {
            BookAndChapter.findOneAndUpdate({ _id: data.itemId }, {
                type: data.type,
                titleOfBook: data.titleOfBook,
                paperTitle: data.paperTitle,
                chapterTitle: data.chapterTitle,
                transType: data.transType,
                authorEditor: data.authorEditor,
                titleOfProceeding: data.titleOfProceeding,
                conName: data.conName,
                isNat: data.isNat,
                publicationYear: data.publicationYear,
                issnNumber: data.issnNumber,
                aff: data.aff,
                publisherName: data.publisherName,
                schoolName: data.schoolName,
                year: data.year,
                proof: req.file.filename,
            }).then(function (docs) {

                deleteFile(data.proof, 'faculty', (err) => {
                    try {


                        if (err) {
                            throw new Error('File not found')
                        }

                        res.send({ status: 'deleted', data: docs });
                    } catch (error) {
                        console.log('in catch')

                        console.log('The error is :', error)
                        res.send({ status: 'error' });
                    }
                })
            }).catch(function (err) {
                res.send({ status: 'error' })
            }

            )
        }
        else {

            BookAndChapter.findOneAndUpdate({ _id: data.itemId }, {
                type: data.type,
                titleOfBook: data.titleOfBook,
                paperTitle: data.paperTitle,
                chapterTitle: data.chapterTitle,
                transType: data.transType,
                titleOfProceeding: data.titleOfProceeding,
                conName: data.conName,
                isNat: data.isNat,
                publicationYear: data.publicationYear,
                issnNumber: data.issnNumber,
                aff: data.aff,
                publisherName: data.publisherName,
                year: data.year,
            }).then(function (data) {
                if (data) {
                    res.send({ status: 'deleted' })
                }
                else {
                    res.send({ status: 'error' })
                }
            }).catch(function (err) {
                res.send({ status: 'error' })
            }

            )
        }
    })

    // ResearchGuidance
    app.post('/api/edit/ResearchGuidance', upload.single('file'), (req, res) => {

        const data = JSON.parse(JSON.stringify(req.body));

        if (req.file) {
            ResearchGuidance.findOneAndUpdate({ _id: data.itemId }, {
                isResearchGuide: data.isResearchGuide,
                year: data.year,
                proof: req.file.filename,
            }).then(function (docs) {

                deleteFile(data.proof, 'faculty', (err) => {
                    try {


                        if (err) {
                            throw new Error('File not found')
                        }

                        res.send({ status: 'deleted', data: docs });
                    } catch (error) {
                        console.log('in catch')

                        console.log('The error is :', error)
                        res.send({ status: 'error' });
                    }
                })
            }).catch(function (err) {
                res.send({ status: 'error' })
            }

            )
        }
        else {

            ResearchGuidance.findOneAndUpdate({ _id: data.itemId }, {
                isResearchGuide: data.isResearchGuide,
                year: data.year,
            }).then(function (data) {
                if (data) {
                    res.send({ status: 'deleted' })
                }
                else {
                    res.send({ status: 'error' })
                }
            }).catch(function (err) {
                res.send({ status: 'error' })
            }

            )
        }
    })

    // PhdAwarded
    app.post('/api/edit/PhdAwarded', upload.single('file'), (req, res) => {

        const data = JSON.parse(JSON.stringify(req.body));

        if (req.file) {
            PhdAwarded.findOneAndUpdate({ _id: data.itemId }, {
                scholarName: data.scholarName,
                departmentName: data.departmentName,
                guideName: data.guideName,
                thesisTitle: data.thesisTitle,
                yearOfScholar: data.yearOfScholar,
                degreeName: data.degreeName,
                awardSubmit: data.awardSubmit,
                rac: data.rac,
                gender: data.gender,
                category: data.category,
                phdAwardYear: data.phdAwardYear,
                year: data.year,
                proof: req.file.filename,
            }).then(function (docs) {

                deleteFile(data.proof, 'faculty', (err) => {
                    try {


                        if (err) {
                            throw new Error('File not found')
                        }

                        res.send({ status: 'deleted', data: docs });
                    } catch (error) {
                        console.log('in catch')

                        console.log('The error is :', error)
                        res.send({ status: 'error' });
                    }
                })
            }).catch(function (err) {
                res.send({ status: 'error' })
            }

            )
        }
        else {

            PhdAwarded.findOneAndUpdate({ _id: data.itemId }, {
                scholarName: data.scholarName,
                departmentName: data.departmentName,
                guideName: data.guideName,
                thesisTitle: data.thesisTitle,
                yearOfScholar: data.yearOfScholar,
                degreeName: data.degreeName,
                awardSubmit: data.awardSubmit,
                rac: data.rac,
                gender: data.gender,
                category: data.category,
                phdAwardYear: data.phdAwardYear,
                year: data.year,
            }).then(function (data) {
                if (data) {
                    res.send({ status: 'deleted' })
                }
                else {
                    res.send({ status: 'error' })
                }
            }).catch(function (err) {
                res.send({ status: 'error' })
            }

            )
        }
    })

    // JrfSrf
    app.post('/api/edit/JrfSrf', upload.single('file'), (req, res) => {

        const data = JSON.parse(JSON.stringify(req.body));

        if (req.file) {
            JrfSrf.findOneAndUpdate({ _id: data.itemId }, {
                researchName: data.researchName,
                enrolmentYear: data.enrolmentYear,
                fellowshipDuration: data.fellowshipDuration,
                fellowshipType: data.fellowshipType,
                schoolName: data.schoolName,
                guideName: data.guideName,
                grantingAgency: data.grantingAgency,
                qualifyingExam: data.qualifyingExam,
                year: data.year,
                proof: req.file.filename,
            }).then(function (docs) {

                deleteFile(data.proof, 'faculty', (err) => {
                    try {


                        if (err) {
                            throw new Error('File not found')
                        }

                        res.send({ status: 'deleted', data: docs });
                    } catch (error) {
                        console.log('in catch')

                        console.log('The error is :', error)
                        res.send({ status: 'error' });
                    }
                })
            }).catch(function (err) {
                res.send({ status: 'error' })
            }

            )
        }
        else {

            JrfSrf.findOneAndUpdate({ _id: data.itemId }, {
                researchName: data.researchName,
                enrolmentYear: data.enrolmentYear,
                fellowshipDuration: data.fellowshipDuration,
                fellowshipType: data.fellowshipType,
                grantingAgency: data.grantingAgency,
                schoolName: data.schoolName,
                guideName: data.guideName,
                qualifyingExam: data.qualifyingExam,
                year: data.year,
            }).then(function (data) {
                if (data) {
                    res.send({ status: 'deleted' })
                }
                else {
                    res.send({ status: 'error' })
                }
            }).catch(function (err) {
                res.send({ status: 'error' })
            }

            )
        }
    })

    // AwardRecognition
    app.post('/api/edit/AwardRecognition', upload.single('file'), (req, res) => {

        const data = JSON.parse(JSON.stringify(req.body));

        if (req.file) {
            AwardRecognition.findOneAndUpdate({ _id: data.itemId }, {
                teacherName: data.teacherName,
                awardYear: data.awardYear,
                pan: data.pan,
                designation: data.designation,
                awardName: data.awardName,
                isNat: data.isNat,
                incentive: data.incentive,
                agencyName: data.agencyName,
                year: data.year,
                proof: req.file.filename,
            }).then(function (docs) {

                deleteFile(data.proof, 'faculty', (err) => {
                    try {


                        if (err) {
                            throw new Error('File not found')
                        }

                        res.send({ status: 'deleted', data: docs });
                    } catch (error) {
                        console.log('in catch')

                        console.log('The error is :', error)
                        res.send({ status: 'error' });
                    }
                })
            }).catch(function (err) {
                res.send({ status: 'error' })
            }

            )
        }
        else {

            AwardRecognition.findOneAndUpdate({ _id: data.itemId }, {
                teacherName: data.teacherName,
                awardYear: data.awardYear,
                pan: data.pan,
                designation: data.designation,
                awardName: data.awardName,
                isNat: data.isNat,
                incentive: data.incentive,
                agencyName: data.agencyName,
                year: data.year,
            }).then(function (data) {
                if (data) {
                    res.send({ status: 'deleted' })
                }
                else {
                    res.send({ status: 'error' })
                }
            }).catch(function (err) {
                res.send({ status: 'error' })
            }

            )
        }
    })

    // Patent
    app.post('/api/edit/Patent', upload.single('file'), (req, res) => {

        const data = JSON.parse(JSON.stringify(req.body));


        if (req.file) {
            Patent.findOneAndUpdate({ _id: data.itemId }, {
                patenterName: data.patenterName,
                patentNumber: data.patentNumber,
                patentTitle: data.patentTitle,
                isNat: data.isNat,
                designation: data.designation,
                awardYear: data.awardYear,
                publishedDate: data.publishedDate,
                fieldDate: data.fieldDate,
                incentive: data.incentive,
                year: data.year,
                proof: req.file.filename,
            }).then(function (docs) {

                deleteFile(data.proof, 'faculty', (err) => {
                    try {


                        if (err) {
                            throw new Error('File not found')
                        }

                        res.send({ status: 'deleted', data: docs });
                    } catch (error) {
                        console.log('in catch')

                        console.log('The error is :', error)
                        res.send({ status: 'error' });
                    }
                })
            }).catch(function (err) {
                res.send({ status: 'error' })
            }

            )
        }
        else {

            Patent.findOneAndUpdate({ _id: data.itemId }, {
                patenterName: data.patenterName,
                patentNumber: data.patentNumber,
                patentTitle: data.patentTitle,
                isNat: data.isNat,
                publishedDate: data.publishedDate,
                fieldDate: data.fieldDate,
                designation: data.designation,
                awardYear: data.awardYear,
                incentive: data.incentive,
                year: data.year,
            }).then(function (data) {
                if (data) {

                    res.send({ status: 'deleted' })
                }
                else {
                    console.log('in error')
                    res.send({ status: 'error' })
                }
            }).catch(function (err) {
                console.log('in error')

                res.send({ status: 'error' })
            }

            )
        }
    })

    // ConsultancyServices
    app.post('/api/edit/ConsultancyServices', upload.single('file'), (req, res) => {

        const data = JSON.parse(JSON.stringify(req.body));

        if (req.file) {
            ConsultancyServices.findOneAndUpdate({ _id: data.itemId }, {
                cName: data.cName,
                cProjectName: data.cProjectName,
                cAgency: data.cAgency,
                cYear: data.cYear,
                revenue: data.revenue,
                year: data.year,
                proof: req.file.filename,
            }).then(function (docs) {

                deleteFile(data.proof, 'faculty', (err) => {
                    try {


                        if (err) {
                            throw new Error('File not found')
                        }

                        res.send({ status: 'deleted', data: docs });
                    } catch (error) {
                        console.log('in catch')

                        console.log('The error is :', error)
                        res.send({ status: 'error' });
                    }
                })
            }).catch(function (err) {
                res.send({ status: 'error' })
            }

            )
        }
        else {

            ConsultancyServices.findOneAndUpdate({ _id: data.itemId }, {
                cName: data.cName,
                cProjectName: data.cProjectName,
                cAgency: data.cAgency,
                cYear: data.cYear,
                revenue: data.revenue,
                year: data.year,
            }).then(function (data) {
                if (data) {
                    res.send({ status: 'deleted' })
                }
                else {
                    res.send({ status: 'error' })
                }
            }).catch(function (err) {
                res.send({ status: 'error' })
            }

            )
        }
    })

    // ConsultancyServices
    app.post('/api/edit/Collaboration', upload.single('file'), (req, res) => {

        const data = JSON.parse(JSON.stringify(req.body));

        if (req.file) {
            Collaboration.findOneAndUpdate({ _id: data.itemId }, {
                collabTitle: data.collabTitle,
                agencyName: data.agencyName,
                participantName: data.participantName,
                collabYear: data.collabYear,
                duration: data.duration,
                activityNature: data.activityNature,
                year: data.year,
                proof: req.file.filename,
            }).then(function (docs) {

                deleteFile(data.proof, 'faculty', (err) => {
                    try {


                        if (err) {
                            throw new Error('File not found')
                        }

                        res.send({ status: 'deleted', data: docs });
                    } catch (error) {
                        console.log('in catch')

                        console.log('The error is :', error)
                        res.send({ status: 'error' });
                    }
                })
            }).catch(function (err) {
                res.send({ status: 'error' })
            }

            )
        }
        else {

            Collaboration.findOneAndUpdate({ _id: data.itemId }, {
                collabTitle: data.collabTitle,
                agencyName: data.agencyName,
                participantName: data.participantName,
                collabYear: data.collabYear,
                duration: data.duration,
                activityNature: data.activityNature,
                year: data.year,
            }).then(function (data) {
                if (data) {
                    res.send({ status: 'deleted' })
                }
                else {
                    res.send({ status: 'error' })
                }
            }).catch(function (err) {
                res.send({ status: 'error' })
            }

            )
        }
    })

    // InvitedTalk
    app.post('/api/edit/InvitedTalk', upload.single('file'), (req, res) => {

        const data = JSON.parse(JSON.stringify(req.body));

        if (req.file) {
            InvitedTalk.findOneAndUpdate({ _id: data.itemId }, {
                lectureTitle: data.lectureTitle,
                seminarTitle: data.seminarTitle,
                organizedBy: data.organizedBy,
                nature: data.nature,
                isNat: data.isNat,
                year: data.year,
                proof: req.file.filename,
            }).then(function (docs) {

                deleteFile(data.proof, 'faculty', (err) => {
                    try {


                        if (err) {
                            throw new Error('File not found')
                        }

                        res.send({ status: 'deleted', data: docs });
                    } catch (error) {
                        console.log('in catch')

                        console.log('The error is :', error)
                        res.send({ status: 'error' });
                    }
                })
            }).catch(function (err) {
                res.send({ status: 'error' })
            }

            )
        }
        else {

            InvitedTalk.findOneAndUpdate({ _id: data.itemId }, {
                lectureTitle: data.lectureTitle,
                seminarTitle: data.seminarTitle,
                organizedBy: data.organizedBy,
                isNat: data.isNat,
                nature: data.nature,
                year: data.year,
            }).then(function (data) {
                if (data) {
                    res.send({ status: 'deleted' })
                }
                else {
                    res.send({ status: 'error' })
                }
            }).catch(function (err) {
                res.send({ status: 'error' })
            }

            )
        }
    })

    // ConferenceOrganized
    app.post('/api/edit/ConferenceOrganized', upload.single('file'), (req, res) => {

        const data = JSON.parse(JSON.stringify(req.body));

        if (req.file) {
            ConferenceOrganized.findOneAndUpdate({ _id: data.itemId }, {
                programTitle: data.programTitle,
                schoolName: data.schoolName,
                fundedBy: data.fundedBy,
                isNational: data.isNational,
                noOfParticipants: data.noOfParticipants,
                year: data.year,
                proof: req.file.filename,
            }).then(function (docs) {

                deleteFile(data.proof, 'faculty', (err) => {
                    try {


                        if (err) {
                            throw new Error('File not found')
                        }

                        res.send({ status: 'deleted', data: docs });
                    } catch (error) {
                        console.log('in catch')

                        console.log('The error is :', error)
                        res.send({ status: 'error' });
                    }
                })
            }).catch(function (err) {
                res.send({ status: 'error' })
            }

            )
        }
        else {

            ConferenceOrganized.findOneAndUpdate({ _id: data.itemId }, {
                programTitle: data.programTitle,
                schoolName: data.schoolName,
                fundedBy: data.fundedBy,
                isNational: data.isNational,
                noOfParticipants: data.noOfParticipants,
                year: data.year,
            }).then(function (data) {
                if (data) {
                    res.send({ status: 'deleted' })
                }
                else {
                    res.send({ status: 'error' })
                }
            }).catch(function (err) {
                res.send({ status: 'error' })
            }

            )
        }
    })


    app.post('/api/edit/ConferenceParticipated', upload.single('file'), (req, res) => {

        const data = JSON.parse(JSON.stringify(req.body));

        if (req.file) {
            ConferenceParticipated.findOneAndUpdate({ _id: data.itemId }, {
                programTitle: data.programTitle,
                organizingInstitute: data.organizingInstitute,
                isNational: data.isNational,
                year: data.year,
                proof: req.file.filename,
                userId: data.userId,
            }).then(function (docs) {

                deleteFile(data.proof, 'faculty', (err) => {
                    try {


                        if (err) {
                            throw new Error('File not found')
                        }

                        res.send({ status: 'deleted', data: docs });
                    } catch (error) {
                        console.log('in catch')

                        console.log('The error is :', error)
                        res.send({ status: 'error' });
                    }
                })
            }).catch(function (err) {
                res.send({ status: 'error' })
            }

            )
        }
        else {

            ConferenceParticipated.findOneAndUpdate({ _id: data.itemId }, {
                programTitle: data.programTitle,
                organizingInstitute: data.organizingInstitute,
                isNational: data.isNational,
                year: data.year,
            }).then(function (data) {
                if (data) {
                    res.send({ status: 'deleted' })
                }
                else {
                    res.send({ status: 'error' })
                }
            }).catch(function (err) {
                res.send({ status: 'error' })
            }

            )
        }
    })

    // Fellowship
    app.post('/api/edit/Fellowship', upload.single('file'), (req, res) => {

        const data = JSON.parse(JSON.stringify(req.body));

        if (req.file) {
            Fellowship.findOneAndUpdate({ _id: data.itemId }, {
                teacherName: data.teacherName,
                awardName: data.awardName,
                awardYear: data.awardYear,
                isNat: data.isNat,
                awardingAgency: data.awardingAgency,
                year: data.year,
                proof: req.file.filename,

            }).then(function (data) {
                if (data) {
                    res.send({ status: 'deleted' })
                }
                else {
                    res.send({ status: 'error' })
                }

            }).catch(function (err) {
                res.send({ status: 'error' })
            }

            )
        }
        else {

            Fellowship.findOneAndUpdate({ _id: data.itemId }, {
                teacherName: data.teacherName,
                awardName: data.awardName,
                awardYear: data.awardYear,
                isNat: data.isNat,
                awardingAgency: data.awardingAgency,
                year: data.year,

            }).then(function (data) {

                if (data) {
                    res.send({ status: 'deleted' })
                }
                else {
                    res.send({ status: 'error' })
                }

            }).catch(function (err) {
                res.send({ status: 'error' })
            }



            )
        }
    })

    // PolicyDocuments
    app.post('/api/edit/PolicyDocuments', upload.single('file'), (req, res) => {

        const data = JSON.parse(JSON.stringify(req.body));

        if (req.file) {
            PolicyDocuments.findOneAndUpdate({ _id: data.itemId }, {
                policyName: data.policyName,
                organizationName: data.organizationName,
                isNat: data.isNat,
                year: data.year,
                proof: req.file.filename,

            }).then(function (data) {
                if (data) {
                    res.send({ status: 'deleted' })
                }
                else {
                    res.send({ status: 'error' })
                }

            }).catch(function (err) {
                res.send({ status: 'error' })
            }

            )
        }
        else {

            PolicyDocuments.findOneAndUpdate({ _id: data.itemId }, {
                policyName: data.policyName,
                organizationName: data.organizationName,
                isNat: data.isNat,
                year: data.year,
            }).then(function (data) {

                if (data) {
                    res.send({ status: 'deleted' })
                }
                else {
                    res.send({ status: 'error' })
                }

            }).catch(function (err) {
                res.send({ status: 'error' })
            }



            )
        }
    })


}


module.exports = editRoutes