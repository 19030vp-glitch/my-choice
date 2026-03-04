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
const Qualification = require("../../models/faculty-models/qualificationModel");
const EContentDeveloped = require("../../models/faculty-models/eContentDeveloped");
const PolicyDocuments = require("../../models/faculty-models/policyDocuments");
const Experience = require("../../models/faculty-models/experienceModel");
const Responsibilities = require("../../models/faculty-models/responsibilities");
const FinancialSupport = require("../../models/faculty-models/financialSupport");
const ConferenceParticipated = require("../../models/faculty-models/conferenceParticipated");
const ForeignVisit = require("../../models/faculty-models/foreignVisit");

//director models
const DirectorUser = require("../../models/director-models/directorUser");
const MoUs = require("../../models/director-models/moUsSchema");
const ExtensionActivities = require("../../models/director-models/extensionActivitysSchema");

// node mailer
const nodemailer = require("nodemailer");
const emailTemplate = require("../../email/emailTemplate");
const OTPGenerator = require("../../utility/generators").OTPGenerator;
const bcrypt = require("bcrypt");
const path = require("path");

// fs function for file system operations
const fs = require("fs");
const AlumniUser = require("../../models/alumni-models/alumniUserSchema");
const StudentUser = require("../../models/student-models/studentUserSchema");
const { multerConfig } = require("../../utility/multerConfig");
const { AllModels } = require("./routes");

async function deleteFile(filename, type, callback) {
  let paths = {
    faculty: path.join(__dirname, `../../uploads/faculty-uploads/${filename}`),
  };
  fs.unlink(paths[type], callback);
}

const upload = multerConfig(`../uploads/director-uploads/`);

const usersModels = { User, StudentUser, AlumniUser, DirectorUser };

function services(app) {
  let models = {
    ...AllModels,
    DirectorUser,
    MoUs,
    ExtensionActivities,
  };

  app.post("/service/deleteItem", function (req, res) {
    const { model, itemToDelete } = req.body;

    models[model].findByIdAndRemove(itemToDelete._id, function (err, data) {
      if (err) {
        res.send({ status: "error" });
      } else {
        // delete item from file storage
        if (itemToDelete.proof) {
          deleteFile(itemToDelete.proof, "faculty", (err) => {
            try {
              if (err) {
                console.log("Error at deletion", err);
              }
              res.send({ status: "deleted", data: data });
            } catch (error) {
              console.log("The error is :", error);
              res.send({ status: "error" });
            }
          });
        }
      }
    });
  });

  app.post("/service/changePassword", async (req, res) => {
    try {
      const { userId, currentPassword, newPassword, model } = req.body;
      const user = await usersModels[model].findById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      const isValidCurrentPass = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (isValidCurrentPass) {
        const hashedPass = await bcrypt.hash(newPassword, 10);
        user.password = hashedPass;
        await user.save();
        res.send({ status: "changed" });
      } else {
        res.send({ status: "wrong" });
      }
    } catch (error) {
      console.error("Error changing password:", error);
      res.status(404).json({ status: "error", message: error.message });
    }
  });

  app.post("/service/changePassword", async (req, res) => {
    try {
      const { userId, currentPassword, newPassword } = req.body;
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      const isValidCurrentPass = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (isValidCurrentPass) {
        const hashedPass = await bcrypt.hash(newPassword, 10);
        user.password = hashedPass;
        await user.save();
        res.send({ status: "changed" });
      } else {
        res.send({ status: "wrong" });
      }
    } catch (error) {
      console.error("Error changing password:", error);
      res.status(404).json({ status: "error", message: error.message });
    }
  });

  // check if username is already taken
  app.post("/service/checkAndEmail", function (req, res) {
    const { email, modelToCheck, filter, type } = req.body;
    console.log(email, modelToCheck, filter);

    const messageOnUserType = {
      faculty: "Username already taken",
      director: "The Department is already taken by the director",
    };

    // check if username is already taken
    models[modelToCheck].findOne(filter, function (err, user) {
      if (user) {
        res.send({ status: "taken", message: messageOnUserType[type] });
      } else {
        // check if mail already taken
        models[modelToCheck].findOne(
          { email: email.toLowerCase() },
          (err, user) => {
            if (user) {
              res.send({ status: "taken", message: "Email already taken" });
            } else {
              res.send({ status: "available" });
            }
          }
        );
      }
    });
  });

  // sending otp on email address
  app.post("/sendOTPOnEMail", async (req, res) => {
    let generatedOTP = OTPGenerator();
    let subjectForEmail = `${generatedOTP} is your OTP for Email Verification at SRTMUN-UIMS.`;

    let encryptedOTP = await bcrypt.hash(generatedOTP.toString(), 11);

    // message to send on res
    let message = {
      status: "success",
      message: "Email sent successfully, Please check your Email Account",
      otp: encryptedOTP,
    };

    let htmlMatter = `<div>
                            <h2>OTP based Email Verification</h2>
                            <p style="font-size: 14px; line-height: 140%;">
                            <strong>${generatedOTP}</strong> is your OTP for
                            registration as ${req.body.userType} at <strong>SRTMUN-UIMS</strong>. Please enter to verify
                            email now.
                            </p>
                        </div>`;

    // send mail
    sendMail(
      req,
      res,
      req.body.emailId,
      subjectForEmail,
      "html",
      emailTemplate(htmlMatter),
      message
    );
  });

  app.post("/service/sendEMail", async (req, res) => {
    const {
      subjectForEmail,
      successEmailMessage,
      heading,
      emailBody,
      htmlMatter,
    } = req.body;

    // message to send on res
    let message = {
      status: "success",
      message:
        successEmailMessage ||
        "Email sent successfully, Please check your Email Account",
    };

    let emailMatter = ``;

    if (!htmlMatter) {
      emailMatter = `<div>
      <h2>${heading}</h2>
      <p style="font-size: 14px; line-height: 140%;">
      ${emailBody}
      </p>
  </div>`;
    }

    // send mail
    sendMail(
      req,
      res,
      req.body.emailId,
      subjectForEmail,
      "html",
      emailTemplate(htmlMatter ? htmlMatter : emailMatter),
      message
    );
  });

  app.post("/verifyOTP", (req, res) => {
    res.send({ status: "success" });
  });

  // generateReport for user
  app.post("/api/getAllData", async (req, res) => {
    const { userId, fetchYears, getDataFilter } = req.body;
    const report = {};

    let userFilter;
    if (userId) {
      userFilter = { _id: userId };
    } else if (getDataFilter) {
      userFilter = getDataFilter;
    }

    User.findOne(userFilter)
      .then(async function (user, err) {
        // filter
        let filter;
        if (fetchYears === "all") {
          filter = { userId: user?._id };
        } else {
          filter = { userId: user?._id, year: { $in: fetchYears } };
        }

        if (user) {
          // main object where all data will be collected
          report.user = user;

          // get qualifications
          const qualifications = await Qualification.find({ userId });
          report.Qualification = qualifications.sort(function (a, b) {
            var dateA = new Date(a.createdAt),
              dateB = new Date(b.createdAt);
            return dateB - dateA;
          });

          // get Experience
          const experience = await Experience.find({ userId });
          report.Experience = experience.sort(function (a, b) {
            var dateA = new Date(a.createdAt),
              dateB = new Date(b.createdAt);
            return dateB - dateA;
          });

          // get degrees
          const degrees = await Degree.find({ userId });
          report.Degree = degrees.sort(function (a, b) {
            var dateA = new Date(a.createdAt),
              dateB = new Date(b.createdAt);
            return dateB - dateA;
          });

          // get appointmentsHeldPrior
          const appointmentsHeldPrior = await AppointmentsHeldPrior.find({
            userId,
          });
          report.AppointmentsHeldPrior = appointmentsHeldPrior.sort(function (
            a,
            b
          ) {
            var dateA = new Date(a.createdAt),
              dateB = new Date(b.createdAt);
            return dateB - dateA;
          });

          // get post held
          const postHeld = await PostHeld.find({ userId });
          report.PostHeld = postHeld.sort(function (a, b) {
            var dateA = new Date(a.createdAt),
              dateB = new Date(b.createdAt);
            return dateB - dateA;
          });

          // get lectures
          const lectures = await Lectures.find(filter);
          report.Lectures = lectures.sort(function (a, b) {
            var dateA = new Date(a.createdAt),
              dateB = new Date(b.createdAt);
            return dateB - dateA;
          });

          // get online fdp
          const online = await Online.find(filter);
          report.Online = online.sort(function (a, b) {
            var dateA = new Date(a.createdAt),
              dateB = new Date(b.createdAt);
            return dateB - dateA;
          });

          // get ResearchProject
          const researchProject = await ResearchProject.find(filter);
          report.ResearchProject = researchProject.sort(function (a, b) {
            var dateA = new Date(a.createdAt),
              dateB = new Date(b.createdAt);
            return dateB - dateA;
          });

          // get ResearchProject
          const researchPaper = await ResearchPaper.find(filter);
          report.ResearchPaper = researchPaper.sort(function (a, b) {
            var dateA = new Date(a.createdAt),
              dateB = new Date(b.createdAt);
            return dateB - dateA;
          });

          // get ResearchProject
          const bookAndChapter = await BookAndChapter.find(filter);
          report.BookAndChapter = bookAndChapter.sort(function (a, b) {
            var dateA = new Date(a.createdAt),
              dateB = new Date(b.createdAt);
            return dateB - dateA;
          });

          // get ResearchProject
          const researchGuidance = await ResearchGuidance.find(filter);
          report.ResearchGuidance = researchGuidance.sort(function (a, b) {
            var dateA = new Date(a.createdAt),
              dateB = new Date(b.createdAt);
            return dateB - dateA;
          });

          const phdAwarded = await PhdAwarded.find(filter);
          report.PhdAwarded = phdAwarded.sort(function (a, b) {
            var dateA = new Date(a.createdAt),
              dateB = new Date(b.createdAt);
            return dateB - dateA;
          });

          const phdAwardedWithoutPGD = await PhdAwarded.find({
            ...filter,
            degreeName: { $ne: "PG Dissertation" },
          });

          report.PhdAwardedWithoutPGD = phdAwardedWithoutPGD.sort(function (
            a,
            b
          ) {
            var dateA = new Date(a.createdAt),
              dateB = new Date(b.createdAt);
            return dateB - dateA;
          });

          const jrfSrf = await JrfSrf.find(filter);
          report.JrfSrf = jrfSrf.sort(function (a, b) {
            var dateA = new Date(a.createdAt),
              dateB = new Date(b.createdAt);
            return dateB - dateA;
          });

          const awardRecognition = await AwardRecognition.find(filter);
          report.AwardRecognition = awardRecognition.sort(function (a, b) {
            var dateA = new Date(a.createdAt),
              dateB = new Date(b.createdAt);
            return dateB - dateA;
          });

          const patent = await Patent.find(filter);
          report.Patent = patent.sort(function (a, b) {
            var dateA = new Date(a.createdAt),
              dateB = new Date(b.createdAt);
            return dateB - dateA;
          });

          const consultancyServices = await ConsultancyServices.find(filter);
          report.ConsultancyServices = consultancyServices.sort(function (
            a,
            b
          ) {
            var dateA = new Date(a.createdAt),
              dateB = new Date(b.createdAt);
            return dateB - dateA;
          });

          const collaboration = await Collaboration.find(filter);
          report.Collaboration = collaboration.sort(function (a, b) {
            var dateA = new Date(a.createdAt),
              dateB = new Date(b.createdAt);
            return dateB - dateA;
          });

          const invitedTalk = await InvitedTalk.find(filter);
          report.InvitedTalk = invitedTalk.sort(function (a, b) {
            var dateA = new Date(a.createdAt),
              dateB = new Date(b.createdAt);
            return dateB - dateA;
          });

          const conferenceOrganized = await ConferenceOrganized.find(filter);
          report.ConferenceOrganized = conferenceOrganized.sort(function (
            a,
            b
          ) {
            var dateA = new Date(a.createdAt),
              dateB = new Date(b.createdAt);
            return dateB - dateA;
          });

          const fellowship = await Fellowship.find(filter);
          report.Fellowship = fellowship.sort(function (a, b) {
            var dateA = new Date(a.createdAt),
              dateB = new Date(b.createdAt);
            return dateB - dateA;
          });

          const eContentDeveloped = await EContentDeveloped.find(filter);
          report.EContentDeveloped = eContentDeveloped.sort(function (a, b) {
            var dateA = new Date(a.createdAt),
              dateB = new Date(b.createdAt);
            return dateB - dateA;
          });

          const policyDocuments = await PolicyDocuments.find(filter);
          report.PolicyDocuments = policyDocuments.sort(function (a, b) {
            var dateA = new Date(a.createdAt),
              dateB = new Date(b.createdAt);
            return dateB - dateA;
          });

          function generateAcademicYears(startYear, endYear) {
            const startYearParts = startYear.split("-");
            const endYearParts = endYear.split("-");
            const startYearNumeric = parseInt(startYearParts[0]);
            const endYearNumeric =
              endYearParts[0] === "Till Date"
                ? new Date().getFullYear()
                : parseInt(endYearParts[0]);

            const academicYears = [];
            for (let year = startYearNumeric; year <= endYearNumeric; year++) {
              const nextYear = (year + 1).toString().substring(2);
              academicYears.push(`${year}-${nextYear}`);
            }

            return academicYears;
          }

          const responsibilities = await Responsibilities.find(filter);

          if (fetchYears === "all") {
            report.Responsibilities = responsibilities.sort(function (a, b) {
              var dateA = new Date(a.createdAt),
                dateB = new Date(b.createdAt);
              return dateB - dateA;
            });
          } else {
            report.Responsibilities = responsibilities
              .sort(function (a, b) {
                var dateA = new Date(a.createdAt),
                  dateB = new Date(b.createdAt);
                return dateB - dateA;
              })
              .filter((responsibility) => {
                if (responsibility?.durationYears?.length !== 0) {
                  const generatedYears = generateAcademicYears(
                    responsibility.durationYears[0],
                    responsibility.durationYears[1]
                  );
                  return generatedYears.some((year) =>
                    fetchYears.includes(year)
                  );
                } else {
                  return false;
                }
              });
          }

          const foreignVisit = await ForeignVisit.find(filter);
          report.ForeignVisit = foreignVisit.sort(function (a, b) {
            var dateA = new Date(a.createdAt),
              dateB = new Date(b.createdAt);
            return dateB - dateA;
          });

          const financialSupport = await FinancialSupport.find(filter);
          report.FinancialSupport = financialSupport.sort(function (a, b) {
            var dateA = new Date(a.createdAt),
              dateB = new Date(b.createdAt);
            return dateB - dateA;
          });

          const conferenceParticipated = await ConferenceParticipated.find(
            filter
          );
          report.ConferenceParticipated = conferenceParticipated.sort(function (
            a,
            b
          ) {
            var dateA = new Date(a.createdAt),
              dateB = new Date(b.createdAt);
            return dateB - dateA;
          });

          res.send({ status: "success", data: report });
        } else {
          res.send({ status: "error", message: "User Not Found" });
          return;
        }
      })
      .catch(function (err) {
        console.log(err);
        res.send({ status: "error", message: "Something went wrongg" });
        return;
      });
  });

  // check if email is already taken by alumni
  app.post("/service/alumni-checkAndEmail", function (req, res) {
    const { email } = req.body;
    // check if mail already taken
    AlumniUser.findOne({ email: email.toLowerCase() }, (err, user) => {
      if (user) {
        res.send({ status: "taken", message: "Email already taken" });
      } else {
        res.send({ status: "available" });
      }
    });
  });

  // update profile
  app.post(
    "/api/edit-profile/:modelName/:filter",
    upload.single("file"),
    async (req, res) => {
      const data = JSON.parse(JSON.stringify(req.body));
      const { modelName, filter } = req.params;

      if (req.file) {
        data["photoURL"] = req.file.filename;
      }

      // using formData has benefit : any key that matches with mongodb collection schema, it takes it.
      try {
        let doc = await models[modelName].findOneAndUpdate(
          JSON.parse(filter),
          data,
          { new: true }
        );
        if (doc) {
          res.send({ status: "edited", data: doc });
        } else {
          res.send({ error: "error", message: "Error updating profile" });
        }
      } catch (error) {
        console.log("Occured while updating profile :", error);
        res.send({ error: "error", message: "Error updating profile" });
      }
    }
  );
}

function sendMail(
  req,
  res,
  mailTo,
  subject,
  typeOfFormat,
  matter,
  message,
  sendReponseAfterSuccess = true
) {
  const mailTransporter = nodemailer.createTransport({
    service: "Outlook", // Use 'Outlook' for Outlook accounts
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  let mailDetails = {
    from: process.env.EMAIL,
    to: mailTo,
    subject: subject,
    [typeOfFormat]: matter,
  };

  try {
    mailTransporter.sendMail(mailDetails, function (err, data) {
      if (err) {
        console.log("Error is :", err);
        if (sendReponseAfterSuccess) {
          res.send({
            status: "error",
            message: "Could not send Email. Please try again...",
          });
        }
      } else {
        if (sendReponseAfterSuccess) {
          res.send(message);
        }
      }
    });
  } catch (error) {
    console.log("Error Occured in send mail");
  }
}

module.exports = { services, sendMail, deleteFile };
