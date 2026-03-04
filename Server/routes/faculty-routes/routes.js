const path = require("path");
const xlsx = require("xlsx");
// multer configuration

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const link = path.join(__dirname, `../../uploads/faculty-uploads/`);
    cb(null, link);
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date().getTime()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

// multer configuration excel
const excelStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const link = path.join(__dirname, `../../../excels/`);
    cb(null, link);
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date().getTime()}-${file.originalname}`);
  },
});
const excelUpload = multer({ storage: excelStorage });

// import all the models here
const AppointmentsHeldPrior = require("../../models/faculty-models/appointmentsHeldPrior");
const PostHeld = require("../../models/faculty-models/postHeld");
const Lectures = require("../../models/faculty-models/lectures");
const Online = require("../../models/faculty-models/online");
const ResearchProject = require("../../models/faculty-models/researchProjects");
const ResearchPaper = require("../../models/faculty-models/researchPapers");
const BookAndChapter = require("../../models/faculty-models/booksAndChapters");
const ResearchGuidance = require("../../models/faculty-models/researchGuidance");
const PhdAwarded = require("../../models/faculty-models/phdAwarded");
const JrfSrf = require("../../models/faculty-models/jrfsrf");
const AwardRecognition = require("../../models/faculty-models/awardAndRecognition");
const Patent = require("../../models/faculty-models/patent");
const ConsultancyServices = require("../../models/faculty-models/consultancyServices");
const Collaboration = require("../../models/faculty-models/collaborations");
const InvitedTalk = require("../../models/faculty-models/invitedTalk");
const ConferenceOrganized = require("../../models/faculty-models/conferenceOrganized");
const Fellowship = require("../../models/faculty-models/fellowship");
const User = require("../../models/faculty-models/userModel");
const Degree = require("../../models/faculty-models/degreeModel");
const Qualification = require("./../../models/faculty-models/qualificationModel");
const EContentDeveloped = require("../../models/faculty-models/eContentDeveloped");
const PolicyDocuments = require("../../models/faculty-models/policyDocuments");
const Experience = require("../../models/faculty-models/experienceModel");
const FinancialSupport = require("../../models/faculty-models/financialSupport");
const Responsibilities = require("../../models/faculty-models/responsibilities");
const ConferenceParticipated = require("../../models/faculty-models/conferenceParticipated");
const ForeignVisit = require("../../models/faculty-models/foreignVisit");
const ExtensionActivities = require("../../models/director-models/extensionActivitysSchema");
const MoUs = require("../../models/director-models/moUsSchema");
const JrfSrfAdmin = require("../../models/admin-models/jrfsrfAdminSchema");
const PublicationCitation = require("../../models/faculty-models/publicationCitation");
const StudentInformation = require("../../models/director-models/studentInformationSchema");

// other models from which data is to be extrax
const ActionTakenReport = require("../../models/feedback-models/actionTakenReportModel");

let models = {
  User,
  Qualification,
  Degree,
  AppointmentsHeldPrior,
  PostHeld,
  Lectures,
  Online,
  ResearchProject,
  PublicationCitation,
  ResearchPaper,
  BookAndChapter,
  ResearchGuidance,
  PhdAwarded,
  JrfSrf,
  AwardRecognition,
  Patent,
  ConsultancyServices,
  Collaboration,
  InvitedTalk,
  ConferenceOrganized,
  Fellowship,
  EContentDeveloped,
  PolicyDocuments,
  Experience,
  FinancialSupport,
  Responsibilities,
  ConferenceParticipated,
  ForeignVisit,
  ExtensionActivities,
  MoUs,
  ActionTakenReport,
  JrfSrfAdmin,
  StudentInformation
};

let nonAcademicYearModels = {
  Qualification,
  Degree,
  AppointmentsHeldPrior,
  PostHeld,
  Online,
  Experience,
  Responsibilities,
  PublicationCitation,
};

const AllModels = { ...models, ...nonAcademicYearModels };

const excelObject = {
  AppointmentsHeldPrior: {
    Designation: "designation",
    "Employer Name": "employerName",
    From: "joiningDate",
    To: "leavingDate",
    "Salary with grade": "salaryWithGrade",
    "Leaving Reason": "leavingReason",
  },
  Degree: {
    Degree: "degreeName",
    Title: "title",
    University: "university",
    "Award Date": "awardDate",
    Subject: "subject",
  },
  Qualification: {
    Exam: "exam",
    "Institute/Board": "institute",
    Year: "year",
    Percentage: "percentage",
    Subjects: "subjects",
  },
  ResearchProject: {
    "Scheme or Project Name": "schemeName",
    "Principal Invigilator Name": "principalName",
    "Co-Invigilator Name": "coInvestigator",
    "Funding Agency Name": "fundingName",
    "Wheather Government / Non-Government": "isGov",
    "Award Year": "awardYear",
    "Project Duration (In Year)": "projectDuration",
    "Provided Funds (INR)": "providedFunds",
    "Wheather Major / Minor": "fundType",
    Status: "status",
    "Choose Year": "year",
  },
  PostHeld: {
    Designation: "designation",
    "Academic Level": "level",
  },
  Lectures: {
    "Course/Paper": "course",
    Level: "level",
    "Teaching Mode": "teachingMode",
    "No of classes alloted": "noOfClasses",
    "No of classes taken": "classesTaken",
    " Year": "year",
  },
  EContentDeveloped: {
    "Name of the Module / Course developed": "moduleName",
    "Type of Creation": "creationType",
    "Platform on which the module is developed": "platform",
    "Choose Year": "year",
    "Link to the content": "link",
  },
  ResearchPaper: {
    "Paper Title": "paperTitle",
    "Author(s)": "authors",
    "Journal Name": "journalName",
    "Publication Year": "publicationYear",
    "ISSN Number": "issnNumber",
    "Choose Year": "year",
  },
  JrfSrf: {
    "Research Fellow Name": "researchName",
    "Enrolment Date": "enrolmentYear",
    "Fellowship Duration": "fellowshipDuration",
    "Fellowship Type": "fellowshipType",
    "Granting Agency": "grantingAgency",
    "Qualifying Exam (if any)": "qualifyingExam",
    "Choose Year": "year",
  },
  AwardRecognition: {
    "Name of full-time teachers receiving award": "teacherName",
    "Award Date": "awardYear",
    PAN: "pan",
    Designation: "designation",
    "Name of the Award, Fellowship, received": "awardName",
    "Wheather National / International": "isNat",
    "Incentives/Type of incentive given by the HEI in recognition of the award":
      "incentive",
    "Award Agency Name": "agencyName",
    "Choose Year": "year",
  },
  Patent: {
    "Patenter Name": "patenterName",
    "Patent Number": "patentNumber",
    "Patent Title": "patentTitle",
    "Wheather National / International": "isNat",
    "Award Year of Patent": "awardYear",
    "Choose Year": "year",
  },
  ConsultancyServices: {
    "Consultant Name": "cName",
    "Consultancy Project Name": "cProjectName",
    "Consulting / Sponsoring Agency with contact": "cAgency",
    "Consultancy Year": "cYear",
    "Revenue Generated(INR)": "revenue",
    Year: "year",
  },
  Collaboration: {
    "Title of the collaborative activity": "collabTitle",
    "Name of the collaborating agency with contact details": "agencyName",
    "Participant Name": "participantName",
    "Year of Collaboration": "collabYear",
    Duration: "duration",
    "Nature of the activity": "activityNature",
    Year: "year",
  },
  InvitedTalk: {
    "Title of Lecture/Academic Session": "lectureTitle",
    "Title of Seminar, etc.": "seminarTitle",
    "Organized by": "organizedBy",
    Type: "isNat",
    Nature: "nature",
    Year: "year",
  },
  ConferenceOrganized: {
    "Program Title": "programTitle",
    "School Name": "schoolName",
    "Funded By": "fundedBy",
    "National / International": "isNational",
    "No of Participants": "noOfParticipants",
    Year: "year",
  },
  Fellowship: {
    "Name of the teacher awarded national/international fellowship/financial support":
      "teacherName",
    "Name of the award/fellowship": "awardName",
    "Awarding Agency": "awardingAgency",
    "Award Year": "awardYear",
    "National / International": "isNat",
    Year: "year",
  },
  Online: {
    "Program Title": "programTitle",
    "Organized by": "nameOfAttendedTeacher",
    "Duration From": "durationFrom",
    "Duration To": "durationTo",
    Year: "year",
  },
  FinancialSupport: {
    "Name of Conference": "nameOfConference",
    "Name of professional body Funds provided for": "feeprovider",
    "Amount of support": "amountOfSupport",
    "PAN No.": "pan",
    Year: "year",
  },
  Responsibilities: {
    "Name of the Committee": "committeeName",
    Designation: "designation",
    "Hosting institute name": "institute",
  },
  ForeignVisit: {
    "Purpose Of Visit": "purposeOfVisit",
    "Name Of The Institute Visited": "nameOfTheInstitutionVisited",
    "From Date": "fromDate",
    "To Date": "toDate",
    Year: "year",
  },
  ConferenceParticipated: {
    "Program Title": "programTitle",
    "Organizing Institute": "organizingInstitute",
    Level: "isNational",
    Year: "year",
  },
  policyDocument: {
    "Policy Name": "policyName",
    "Organisation Name": "organizationName",
    "Wheather National / International": "isNat",
    "Choose Year": "year",
  },
};

function initRoutes(app) {


  app.post("/api/add/upsertWithFilter", async (req, res) => {
    const { data, filter, model } = req.body;

    try {
      await models[model].findOneAndUpdate(
        filter,
        data,
        { new: true, upsert: true }
      );

      res.send({ status: "added" });
    } catch (error) {
      res.send({ status: "error", error });
    }
  });

  app.get("/getExcelData", async (req, res) => {
    let docs = await BookAndChapter.find({ year: "2022-23" })
      .populate("userId")
      .exec();
    let newDocs = docs.filter(
      (item) => item?.userId?.department === "School of Mathematical Sciences"
    );

    res.send(newDocs);
  });

  // get data from model specified in the req.body
  app.post("/getModelData", (req, res) => {
    const { model, filter } = req.body;

    models[model]
      .find(filter)
      .then((data) => {
        if (data.length > 0) {
          res.send({ status: "fetched", data });
        } else {
          res.send({
            status: "null",
            message: "Could not fetch data at the moment",
          });
        }
      })
      .catch((err) => {
        res.send({ status: "error" });
      });
  });

  // getdata
  app.post("/api/getData", (req, res) => {
    const { model, userId, year, dataFilter } = req.body;

    let filter = { userId };
    if (year) {
      if (dataFilter) {
        filter = dataFilter;
      } else {
        filter = { userId, year };
      }
    }

    if (model in nonAcademicYearModels) {
      models[model]
        .find({ userId })
        .then((data) => {
          if (data.length > 0) {
            res.send({ status: "fetched", data });
          } else {
            res.send({
              status: "null",
              message: "Could not fetch data at the moment",
            });
          }
        })
        .catch((err) => {
          res.send({ status: "error" });
        });
    } else {
      models[model]
        .find(filter)
        .then((data) => {
          if (data.length > 0) {
            res.send({ status: "fetched", data });
          } else {
            res.send({
              status: "null",
              message: "Could not fetch data at the moment",
            });
          }
        })
        .catch((err) => {
          res.send({ status: "error" });
        });
    }
  });

  // getcount
  app.post("/api/getCount", (req, res) => {
    const { academicYear } = req.body;
    let filter = {};
    if (academicYear !== "Show all") {
      filter = { year: academicYear };
    }
    const dashboadData = {};

    User.count({}, function (err, count) {
      if (err) {
        console.log(err);
        return;
      }
      dashboadData["User"] = count;

      Degree.count({}, function (err, count) {
        if (err) {
          console.log(err);
          return;
        }
        dashboadData["Degree"] = count;

        ResearchPaper.count(filter, function (err, count) {
          if (err) {
            console.log(err);
            return;
          }
          dashboadData["ResearchPaper"] = count;

          BookAndChapter.count(filter, function (err, count) {
            if (err) {
              console.log(err);
              return;
            }
            dashboadData["BookAndChapter"] = count;

            ConferenceOrganized.count(filter, function (err, count) {
              if (err) {
                console.log(err);
                return;
              }
              dashboadData["ConferenceOrganized"] = count;

              res.send({ status: "fetched", dashboadData });
            });
          });
        });
      });
    });
  });

  // get all teachers
  app.get("/api/teachers", function (req, res) {
    User.find({})
      .then(function (teachers) {
        if (teachers.length > 0) {
          res.send({ message: "success", teachers });
        } else {
          res.send({ message: "error" });
        }
      })
      .catch(function (err) {
        res.send({ message: "error" });
      });
  });

  app.get("/api/Degree", async function (req, res) {
    Degree.find({})
      .populate("userId")
      .exec()
      .then(function (degrees) {
        if (degrees.length > 0) {
          res.send({ message: "success", degrees });
        } else {
          res.send({ message: "error" });
        }
      })
      .catch(function (err) {
        res.send({ message: "error" });
      });
  });

  // getdata for admin panel
  app.post("/api/getDataForAdmin", (req, res) => {
    const { model, academicYear } = req.body;

    if (model === "User") {
      models[model]
        .find({})
        .then((data) => {
          if (data.length > 0) {
            res.send({ status: "fetched", data });
          } else {
            res.send({
              status: "null",
              message: "Could not fetch data at the moment",
            });
          }
        })
        .catch((err) => {
          res.send({ status: "error" });
        });
    } else {
      let filter = {};
      if (academicYear !== "Show all") {
        filter = { year: academicYear };
      }

      models[model]
        .find(filter)
        .populate("userId")
        .exec()
        .then((dbdata) => {
          if (dbdata.length > 0) {
            // filter items that has userId null
            const data = dbdata.filter((item) => item.userId !== null);
            res.send({ status: "fetched", data });
          } else {
            res.send({
              status: "null",
              message: "Could not fetch data at the moment",
            });
          }
        })
        .catch((err) => {
          res.send({ status: "error" });
        });
    }
  });

  // appointmentsHeldPrior
  app.post("/api/add/Qualification", (req, res) => {
    const { data } = req.body;

    try {
      const newQualification = new Qualification({
        exam: data.exam,
        institute: data.institute,
        year: data.year,
        percentage: data.percentage,
        subjects: data.subjects,
        userId: data.userId,
      });

      newQualification.save();
      res.send({ status: "added", data: newQualification });
    } catch (error) {
      res.send({ status: "error", error });
    }
  });

  app.post("/api/add/publicationCitation", async (req, res) => {
    const { data, year, userId } = req.body;

    try {
      await PublicationCitation.findOneAndUpdate(
        { userId, year },
        {
          citationData: data,
          year: year,
          userId: userId,
        },
        { new: true, upsert: true }
      );

      res.send({ status: "added" });
    } catch (error) {
      res.send({ status: "error", error });
    }
  });



  // experience
  app.post("/api/add/Experience", (req, res) => {
    const { data } = req.body;

    try {
      const newExperience = new Experience({
        ug: data.ug,
        pg: data.pg,
        researchExperience: data.researchExperience,
        specialization: data.specialization,
        userId: data.userId,
      });

      newExperience.save();
      res.send({ status: "added", data: newExperience });
    } catch (error) {
      res.send({ status: "error", error });
    }
  });

  // degrees
  app.post("/api/add/Degree", upload.single("file"), (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body));

    try {
      const degree = new Degree({
        degreeName: data.degreeName,
        title: data.title,
        university: data.university,
        awardDate: data.awardDate,
        proof: req.file.filename,
        userId: data.userId,
        subject: data.subject,
      });
      degree.save();
      res.send({ status: "added", data: degree });
    } catch (error) {
      res.send({ status: "error", error });
    }
  });

  // appointmentsHeldPrior
  app.post(
    "/api/add/AppointmentsHeldPrior",
    upload.single("file"),
    (req, res) => {
      // const { data } = req.body
      const data = JSON.parse(JSON.stringify(req.body));

      try {
        const appointmentsHeldPrior = new AppointmentsHeldPrior({
          designation: data.designation,
          employerName: data.employerName,
          joiningDate: data.joiningDate,
          leavingDate: data.leavingDate,
          salaryWithGrade: data.salaryWithGrade,
          leavingReason: data.leavingReason,
          userId: data.userId,
          proof: req.file.filename,
        });

        appointmentsHeldPrior.save();
        res.send({ status: "added", data: appointmentsHeldPrior });
      } catch (error) {
        res.send({ status: "error", error });
      }
    }
  );

  // appointmentsHeldPrior
  app.post("/api/add/EContentDeveloped", upload.single("file"), (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body));

    try {
      const eContentDeveloped = new EContentDeveloped({
        moduleName: data.moduleName,
        creationType: data.creationType,
        platform: data.platform,
        year: data.year,
        link: data.link,
        proof: req.file ? req.file.filename : null,
        userId: data.userId,
      });

      eContentDeveloped.save();
      res.send({ status: "added", data: eContentDeveloped });
    } catch (error) {
      res.send({ status: "error", error });
    }
  });

  //ForeignVisit
  app.post("/api/add/ForeignVisit", (req, res) => {
    const { data } = req.body;
    try {
      const newForeignVisit = new ForeignVisit({
        purposeOfVisit: data.purposeOfVisit,
        nameOfTheInstitutionVisited: data.nameOfTheInstitutionVisited,
        fromDate: data.fromDate,
        toDate: data.toDate,
        year: data.year,
        userId: data.userId,
      });

      newForeignVisit.save();
      res.send({ status: "added", data: newForeignVisit });
    } catch (error) {
      res.send({ status: "error", error });
    }
  });

  // post held
  app.post("/api/add/PostHeld", upload.single("file"), (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body));
    try {
      const postHeld = new PostHeld({
        designation: data.designation,
        level: data.level,
        userDepartment: data.department,
        duration: data.duration,
        durationYears: [...JSON.parse(data.durationYears)],
        active: data.active,
        proof: req.file.filename,
        userId: data.userId,
      });
      postHeld.save();
      if (postHeld) {
        res.send({ status: "added", data: postHeld });
      } else {
        res.send({ status: "error" });
      }
    } catch (error) {
      res.send({ status: "error" });
    }
  });

  // lectures and seminars
  app.post("/api/add/lectures", (req, res) => {
    const { data } = req.body;
    try {
      const { course, level, mode, noOfClasses, classesTaken, year, userId } =
        data;
      const lecture = new Lectures({
        course: course,
        level: level,
        teachingMode: mode,
        noOfClasses: noOfClasses,
        classesTaken: classesTaken,
        year: year,
        userId: userId,
      });
      lecture.save();
      if (lecture) {
        res.send({ status: "added", data: lecture });
      } else {
        res.send({ status: "error" });
      }
    } catch (error) {
      res.send({ status: "error" });
    }
  });

  // online FDP
  app.post("/api/add/Online", upload.single("file"), (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body));

    try {
      const online = new Online({
        programTitle: data.programTitle,
        nameOfAttendedTeacher: data.nameOfAttendedTeacher,
        durationFrom: data.durationFrom,
        durationTo: data.durationTo,
        year: data.year,
        proof: req.file.filename,
        userId: data.userId,
      });
      online.save();
      if (online) {
        res.send({ status: "added", data: online });
      } else {
        res.send({ status: "error" });
      }
    } catch (error) {
      res.send({ status: "error" });
    }
  });

  // research projects
  app.post("/api/add/ResearchProject", upload.single("file"), (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body));

    try {
      const researchProject = new ResearchProject({
        schemeName: data.schemeName,
        programTitle: data.programTitle,
        principalName: data.principalName,
        coInvestigator: data.coInvestigator,
        isCo: data.isCo,
        fundingName: data.fundingName,
        isGov: data.isGov,
        guideName: data.guideName,
        schoolName: data.schoolName,
        department: data.department,
        awardYear: data.awardYear,
        durationYears: [...JSON.parse(data.durationYears)],
        active: data.active,
        duration: data.duration,
        providedFunds: data.providedFunds,
        fundType: data.fundType,
        status: data.status,
        year: data.year,
        proof: req.file.filename,
        userId: data.userId,
      });
      researchProject.save();
      if (researchProject) {
        res.send({ status: "added", data: researchProject });
      } else {
        res.send({ status: "error" });
      }
    } catch (error) {
      res.send({ status: "error" });
    }
  });

  // research papers
  app.post(
    "/api/add/ResearchPaper",
    upload.fields([
      { name: "file", maxCount: 1 },
      { name: "ifProof", maxCount: 1 },
    ]),
    (req, res) => {
      const data = JSON.parse(JSON.stringify(req.body));
      const active = JSON.parse(data?.active);

      try {
        const researchPaper = new ResearchPaper({
          paperTitle: data.paperTitle,
          journalName: data.journalName,
          authors: data.authors,
          publicationYear: data.publicationYear,
          issnNumber: data.issnNumber,
          indexedIn: data.indexedIn,
          indexData: data.indexData,
          indexLink: data.indexLink,
          indexLinkData: data.indexLinkData,
          recLink: data.recLink,
          year: data.year,
          impactFactor: active ? data?.impactFactor : "N/A",
          isIFActive: active,
          ifProof: active
            ? req.files?.["ifProof"]?.[0]?.filename || null
            : null,
          proof: req.files?.["file"]?.[0]?.filename || null,
          userId: data.userId,
        });
        researchPaper.save();
        if (researchPaper) {
          res.send({ status: "added", data: researchPaper });
        } else {
          res.send({ status: "error" });
        }
      } catch (error) {
        console.log("error:", error);
        res.send({ status: "error" });
      }
    }
  );

  // books and chapters
  app.post("/api/add/BookAndChapter", upload.single("file"), (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body));

    try {
      const bookAndChapter = new BookAndChapter({
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
        proof: req.file.filename,
        userId: data.userId,
      });
      bookAndChapter.save();
      if (bookAndChapter) {
        res.send({ status: "added", data: bookAndChapter });
      } else {
        res.send({ status: "error" });
      }
    } catch (error) {
      res.send({ status: "error" });
    }
  });

  app.post("/api/add/researchGuidance", upload.single("file"), (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body));

    try {
      const researchGuidance = new ResearchGuidance({
        isResearchGuide: data.isResearchGuide,
        year: data.year,
        proof: req.file.filename,
        userId: data.userId,
      });
      researchGuidance.save();
      if (researchGuidance) {
        res.send({ status: "added", data: researchGuidance });
      } else {
        res.send({ status: "error" });
      }
    } catch (error) {
      res.send({ status: "error" });
    }
  });

  // phd Awarded
  app.post("/api/add/PhdAwarded", upload.single("file"), (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body));

    try {
      const phdAwarded = new PhdAwarded({
        scholarName: data.scholarName,
        departmentName: data.departmentName,
        guideName: data.guideName,
        degreeName: data.degreeName,
        awardSubmit: data.awardSubmit,
        thesisTitle: data.thesisTitle,
        yearOfScholar: data.yearOfScholar,
        phdAwardYear: data.phdAwardYear,
        rac: data.rac,
        gender: data.gender,
        category: data.category,
        year: data.year,
        proof: req.file.filename,
        userId: data.userId,
      });
      phdAwarded.save();
      if (phdAwarded) {
        res.send({ status: "added", data: phdAwarded });
      } else {
        res.send({ status: "error" });
      }
    } catch (error) {
      res.send({ status: "error" });
    }
  });

  // jrdf srf
  app.post("/api/add/jrfsrf", upload.single("file"), (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body));

    try {
      const jrfSrf = new JrfSrf({
        researchName: data.researchName,
        enrolmentYear: data.enrolmentYear,
        fellowshipDuration: data.fellowshipDuration,
        fellowshipType: data.fellowshipType,
        guideName: data.guideName,
        schoolName: data.schoolName,
        grantingAgency: data.grantingAgency,
        qualifyingExam: data.qualifyingExam,
        year: data.year,
        proof: req.file.filename,
        userId: data.userId,
      });
      jrfSrf.save();
      if (jrfSrf) {
        res.send({ status: "added", data: jrfSrf });
      } else {
        res.send({ status: "error" });
      }
    } catch (error) {
      res.send({ status: "error" });
    }
  });

  // award and recognition
  app.post("/api/add/AwardRecognition", upload.single("file"), (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body));

    try {
      const awardRecognition = new AwardRecognition({
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
        userId: data.userId,
      });
      awardRecognition.save();
      if (awardRecognition) {
        res.send({ status: "added", data: awardRecognition });
      } else {
        res.send({ status: "error" });
      }
    } catch (error) {
      res.send({ status: "error" });
    }
  });

  // patent
  app.post("/api/add/Patent", upload.single("file"), (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body));
    try {
      const patent = new Patent({
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
        userId: data.userId,
      });
      patent.save();
      if (patent) {
        res.send({ status: "added", data: patent });
      } else {
        res.send({ status: "error" });
      }
    } catch (error) {
      res.send({ status: "error" });
    }
  });

  // consultancyServices
  app.post(
    "/api/add/ConsultancyServices",
    upload.single("file"),
    (req, res) => {
      const data = JSON.parse(JSON.stringify(req.body));

      try {
        const consultancyServices = new ConsultancyServices({
          cName: data.cName,
          cProjectName: data.cProjectName,
          cAgency: data.cAgency,
          cYear: data.cYear,
          revenue: data.revenue,
          year: data.year,
          proof: req.file.filename,
          userId: data.userId,
        });
        consultancyServices.save();
        if (consultancyServices) {
          res.send({ status: "added", data: consultancyServices });
        } else {
          res.send({ status: "error" });
        }
      } catch (error) {
        res.send({ status: "error" });
      }
    }
  );

  // collaborations
  app.post("/api/add/collaborations", upload.single("file"), (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body));

    try {
      const collaboration = new Collaboration({
        collabTitle: data.collabTitle,
        agencyName: data.agencyName,
        participantName: data.participantName,
        collabYear: data.collabYear,
        duration: data.duration,
        activityNature: data.activityNature,
        year: data.year,
        proof: req.file.filename,
        userId: data.userId,
      });
      collaboration.save();
      if (collaboration) {
        res.send({ status: "added", data: collaboration });
      } else {
        res.send({ status: "error" });
      }
    } catch (error) {
      res.send({ status: "error" });
    }
  });

  // invitedTalk
  app.post("/api/add/InvitedTalk", upload.single("file"), (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body));

    try {
      const invitedTalk = new InvitedTalk({
        lectureTitle: data.lectureTitle,
        seminarTitle: data.seminarTitle,
        organizedBy: data.organizedBy,
        isNat: data.isNat,
        nature: data.nature,
        year: data.year,
        proof: req.file.filename,
        userId: data.userId,
      });
      invitedTalk.save();
      if (invitedTalk) {
        res.send({ status: "added", data: invitedTalk });
      } else {
        res.send({ status: "error" });
      }
    } catch (error) {
      res.send({ status: "error" });
    }
  });

  // conferenceOrganized
  app.post(
    "/api/add/ConferenceOrganized",
    upload.single("file"),
    (req, res) => {
      const data = JSON.parse(JSON.stringify(req.body));

      try {
        const conferenceOrganized = new ConferenceOrganized({
          programTitle: data.programTitle,
          schoolName: data.schoolName,
          fundedBy: data.fundedBy,
          isNational: data.isNational,
          noOfParticipants: data.noOfParticipants,
          year: data.year,
          proof: req.file.filename,
          userId: data.userId,
        });
        conferenceOrganized.save();
        if (conferenceOrganized) {
          res.send({ status: "added", data: conferenceOrganized });
        } else {
          res.send({ status: "error" });
        }
      } catch (error) {
        res.send({ status: "error" });
      }
    }
  );

  // conferenceParticipated
  app.post(
    "/api/add/ConferenceParticipated",
    upload.single("file"),
    (req, res) => {
      const data = JSON.parse(JSON.stringify(req.body));

      try {
        const conferenceParticipated = new ConferenceParticipated({
          programTitle: data.programTitle,
          organizingInstitute: data.organizingInstitute,
          isNational: data.isNational,
          year: data.year,
          proof: req.file.filename,
          userId: data.userId,
        });
        conferenceParticipated.save();
        if (conferenceParticipated) {
          res.send({ status: "added", data: conferenceParticipated });
        } else {
          res.send({ status: "error" });
        }
      } catch (error) {
        res.send({ status: "error" });
      }
    }
  );

  // fellowship
  app.post("/api/add/Fellowship", upload.single("file"), (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body));

    try {
      const fellowship = new Fellowship({
        teacherName: data.teacherName,
        awardName: data.awardName,
        awardYear: data.awardYear,
        isNat: data.isNat,
        awardingAgency: data.awardingAgency,
        year: data.year,
        proof: req.file.filename,
        userId: data.userId,
      });
      fellowship.save();
      if (fellowship) {
        res.send({ status: "added", data: fellowship });
      } else {
        res.send({ status: "error" });
      }
    } catch (error) {
      res.send({ status: "error" });
    }
  });

  //  financialSupport
  app.post("/api/add/FinancialSupport", upload.single("file"), (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body));

    try {
      const { nameOfConference, feeprovider, amountOfSupport, pan, year } =
        data;
      const financialSupport = new FinancialSupport({
        nameOfConference: nameOfConference,
        feeprovider: feeprovider,
        amountOfSupport: amountOfSupport,
        pan: pan,
        year: year,
        proof: req.file.filename,
        userId: data.userId,
      });
      financialSupport.save();
      if (financialSupport) {
        res.send({ status: "added", data: financialSupport });
      } else {
        res.send({ status: "error" });
      }
    } catch (error) {
      res.send({ status: "error" });
    }
  });

  // Responsibilities
  app.post("/api/add/Responsibilities", upload.single("file"), (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body));

    try {
      const responsibilities = new Responsibilities({
        committeeName: data.committeeName,
        designation: data.designation,
        institute: data.institute,
        durationYears: [...JSON.parse(data.durationYears)],
        active: data.active,
        duration: data.duration,
        proof: req.file.filename,
        userId: data.userId,
      });
      responsibilities.save();
      if (responsibilities) {
        res.send({ status: "added", data: responsibilities });
      } else {
        res.send({ status: "error" });
      }
    } catch (error) {
      res.send({ status: "error" });
    }
  });

  // policy docs
  app.post("/api/add/PolicyDocuments", upload.single("file"), (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body));

    try {
      const policyDocument = new PolicyDocuments({
        policyName: data.policyName,
        organizationName: data.organizationName,
        isNat: data.isNat,
        year: data.year,
        proof: req.file.filename,
        userId: data.userId,
      });
      policyDocument.save();
      if (policyDocument) {
        res.send({ status: "added", data: policyDocument });
      } else {
        res.send({ status: "error" });
      }
    } catch (error) {
      res.send({ status: "error" });
    }
  });

  app.post(
    "/faculty/excelRecord/:model",
    excelUpload.single("excelFile"),
    (req, res) => {
      const excelFile = req.file.filename;
      const model = req.params.model;
      let sendData = {};
      const values = JSON.parse(JSON.stringify(req.body));
      const { School } = values;

      let data = [];
      try {
        const file = xlsx.readFile(
          path.join(__dirname, `../../../excels/${excelFile}`)
        );
        const sheetNames = file.SheetNames;
        for (let i = 0; i < sheetNames.length; i++) {
          const arr = xlsx.utils.sheet_to_json(file.Sheets[sheetNames[i]]);
          arr.forEach((response) => data.push(response));
        }

        let dateInputs = [
          "From",
          "From Date",
          "To Date",
          "Duration From",
          "Duration To",
          "Award Date",
          "Enrolment Date",
        ];
        data.forEach((item) => {
          Object.keys(excelObject[model]).forEach((key) => {
            if (dateInputs.includes(key)) {
              let d = new Date((item[key] - (25567 + 2)) * 86400 * 1000);
              let fullDate = `${d.getFullYear()}-${(
                "0" +
                (d.getMonth() + 1)
              ).slice(-2)}-${("0" + d.getDate()).slice(-2)}`;
              sendData[excelObject[model][key]] = fullDate;
            } else {
              sendData[excelObject[model][key]] = item[key];
            }
          });
          const allData = Object.assign(sendData, { userId: School });
          const obj = new models[model](allData);
          obj.save(function (error) {
            if (error) {
              res.status(500).send();
              console.log(error);
            }
          });
        });
        res.status(201).send(`Entry suceeed`);
      } catch (err) {
        console.log(err);
        return res.status(500).send();
      }
    }
  );

  app.post("/faculty/aqar/excel", async (req, res) => {
    const { filter } = req.body;
    try {
      let report = {};
      let aqarModels = [
        "ResearchPaper",
        "ResearchProject",
        "AwardRecognition",
        "Fellowship",
        "JrfSrf",
        "Patent",
        "PhdAwarded",
        "BookAndChapter",
        "EContentDeveloped",
        "ConsultancyServices",
        "FinancialSupport",
        "Online",
      ];
      for (const model of aqarModels) {
        report[model] = await models[model].find(filter);
      }
      res.send({ report });
    } catch (err) {
      console.log(err);
    }
  });
}

module.exports = {
  initRoutes,
  nonAcademicYearModels,
  models,
  excelObject,
  AllModels,
};
