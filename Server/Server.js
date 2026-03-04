// all imports
const cron = require('node-cron');
const { Delete_Pdfs, DB_Backups, Delete_Excels } = require('./utility/cronFunction');
const { generateExcelFile } = require('./utility/sampleExcelGenrater');
const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require('dotenv')
dotenv.config()
const { json } = require("express");
const jwt = require("jsonwebtoken");
app.use(json());
const mongoose = require("mongoose");

app.use(cors());
const path = require("path");
var fs = require("fs");
const multer = require("multer");


// crons Backup_DB/Delete_Pdf_Excels
cron.schedule('45 0 * * *', () => {
  Delete_Excels();
  Delete_Pdfs();
});
cron.schedule('30 0 * * *', () => {
  const C_Date = new Date();
  let CPath = `../../../DB_Backups/SRTMUN-${C_Date.getDate()}-${C_Date.getMonth() + 1}-${C_Date.getFullYear()}-${C_Date.getTime()}`
  DB_Backups(CPath)
});

cron.schedule('0 1 * * *', () => {
  let CPath = `../../../Temp_Backup`
  DB_Backups(CPath)
});


app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// middlewares
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
app.use(bodyParser.json({ limit: '5mb' }));
app.use(express.json({ limit: '10mb' })); // Adjust the limit as per your requirements

app.use(cookieParser());


// multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, `./uploads/faculty-uploads/`));
    console.log('Link :', path.join(__dirname, `./uploads/faculty-uploads/`))
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date().getTime()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;


//Excel routes
app.use(require('./routes/excel-routes/excel-routes'))
// faculty routes
app.use(require("./routes/faculty-routes/faculty-routes").router);
require("./routes/faculty-routes/routes.js").initRoutes(app);
require("./routes/faculty-routes/excelReport.js")(app);
require("./routes/faculty-routes/editRoutes.js")(app);
require("./routes/faculty-routes/casRoutes.js")(app);
require("./routes/faculty-routes/pbasRoutes.js")(app);
require("./routes/faculty-routes/teacherReport.js")(app);
require("./routes/faculty-routes/services.js").services(app)
require("./routes/faculty-routes/authRoutes.js")(app, upload, jwt);

/// director routes
app.use(require("./routes/director-routes/director-routes").router);
app.use(require('./routes/director-routes/academic-audit-routes/routes'));
require('./routes/director-routes/directorAuth')(app, jwt)

// main routes
app.use(require("./routes/main-routes/main-routes").router)

//nss routes
app.use(require("./routes/nss-routes/nss-routes").router)

// DSD / Sports
app.use(require('./routes/dsd-routes/dsd-routes').router)

// Exam 
app.use(require('./routes/exam-routes/exam-routes').router)

//krc
app.use(require('./routes/krc-routes/krc-routes').router)

//swayam
app.use(require('./routes/swayam-routes/swayam-routes').router)

// iil
require('./routes/iil-routes/iil-routes').iilRoutes(app)

// skill
require('./routes/skill-routes/umpscStudentsHandler')(app)

//other
app.use(require('./routes/other-routes/other-routes').router)

//estt
app.use(require('./routes/estt-routes/estt-routes').router)

//nirf
app.use(require('./routes/nirf-routes/nirf-routes').router)
app.use(require('./routes/nirf-routes/nirf-program-routes.js'))
app.use(require('./routes/nirf-routes/nirf-admin-routes.js').router)

//admin routes
app.use(require('./routes/admin-routes/admin-routes').router);

//alumni routes
app.use(require('./routes/alumni-routes/alumni-routes'));

//student routes
app.use(require('./routes/student-routes/student-routes'))
app.use(require('./routes/student-routes/student-auth'));

//developer routes
app.use(require('./routes/developer-routes/developer-routes'))

// utility routes
require('./utility/feedback')(app)
require('./utility/dashboard')(app)
require('./utility/userAuthentication')(app, jwt)
require('./utility/cloneItem')(app)
app.use(require('./utility/forgotPassword'));
app.use(require('./utility/verifyOTP'));
require("./utility/getProofs")(app);


// pro (news) routes
require('./routes/pro-routes/auth')(app, jwt)
require('./routes/pro-routes/newsOperations')(app)

// visitor routes
require('./utility/visitorCount')(app)

// photo gallery routes
require('./routes/photogallery-routes/event')(app)

// feedback routes
require('./routes/feedback-routes/feedbackRoutes').studentFeedbackRoutes(app)
require('./routes/feedback-routes/fetchFeedbackData')(app)
require('./routes/feedback-routes/generateFeedbackReport')(app)
require('./routes/feedback-routes/actionTakenReport')(app)
require('./routes/feedback-routes/studentSurveryRoutes')(app)


// AQAR routes
require('./routes/director-routes/directorAqarRoutes')(app)
require('./routes/faculty-routes/facultyAqarRoutes')(app)

// submit cas, pbas, aqar
require('./routes/faculty-routes/submitReportForm')(app)

// require('./routes/director-routes/alumniToStudent').alumniToStudent()

// Program (event / workshop) routes
require('./routes/program-routes/saveRegistrationForm')(app)
require('./routes/program-routes/programOperations')(app)

// Youth Festival routes
app.use(require('./routes/youthfestival-routes/youth-auth'))
require('./routes/youthfestival-routes/youth-routes')(app)
app.use(require('./routes/youthfestival-routes/competition-routes'))

// Editable Table
require('./utility/editableTable')(app)

// NAAC-AQAR Routes
app.use(require('./routes/naac-aqar-routes/naac-aqar'))

// download table pdf
require('./utility/downloadTablePDF')(app)

// ACF Routes
require('./routes/acf-routes/acf-routes')(app)

// PM-USHA Routes
app.use(require('./routes/pm-usha-routes/pm-usha-routes').router)
require('./routes/pm-usha-routes/construction-renovation-routes')(app)
require('./routes/pm-usha-routes/pm-usha-dashboard-routes.js')(app)

// data validity check
app.use(require('./validity/check-validity-routes.js'))






mongoose
  .connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => console.log("Database connection failed"));


// Capitalizing the names of users for better display
// const capitalizeNames = async () => {
//   try {
//     const users = await User.find();
//     const updates = users.map((user) => {
//       const updatedName = user.name.trim().toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
//       return User.updateOne({ _id: user._id }, { $set: { name: updatedName } });
//     });

//     await Promise.all(updates);
//     console.log('All names have been capitalized successfully.');
//   } catch (error) {
//     console.error('Error occurred while capitalizing names:', error);
//   }
// };




// Call the function to capitalize names
// capitalizeNames();

// const JRFSRF = require('./models/admin-models/jrfsrfAdminSchema.js')

// const copyFiles = async () => {
//   const data = await JRFSRF.find({}).lean();
//   data.forEach((item) => {
//     const proof = item.proof;
//     if (proof) {
//       try {
//         fs.copyFile(path.join(__dirname, `./uploads/admin-uploads/${proof}`), path.join(__dirname, `./uploads/faculty-uploads/${proof}`), (err) => {
//           console.log('File copied successfully!');
//         });
//       } catch (error) {
//         console.log('Error', error.message)
//       }
//     }
//   })
// }



// copyFiles()


// FILE MANAGEMENT SECTION
// 1. File Deletion function
async function deleteFile(fileName, desiredPath, callback) {
  let paths = {
    faculty: path.join(__dirname, `./uploads/faculty-uploads/${fileName}`),
    CAS: path.join(__dirname, `./uploads/faculty-uploads/CAS-uploads/${fileName}`),
    PBAS: path.join(__dirname, `./uploads/faculty-uploads/PBAS-uploads/${fileName}`),
    FeedbackATR: path.join(__dirname, `./uploads/feedback-uploads/${fileName}`)
  }
  fs.unlink(paths[desiredPath], callback)
}

app.get("/downloadPdf/:fileName", (req, res) => {
  const fileName = req.params.fileName

  const link = path.join(__dirname, `../pdfs/${fileName}`);
  res.download(link)
});

app.get("/downloadExcel/:filename", (req, res) => {
  const filename = req.params.filename;

  const link = path.join(__dirname, `../excels/${filename}`);
  res.download(link)
});


app.get('/downloadSampleExcel/:filename/:model/:school', async (req, res) => {
  const filename = req.params.filename
  const model = req.params.model
  const school = req.params.school

  const filePath = path.join(__dirname, '../sampleExcels/', `${filename}.xlsx`);

  // Check if the file exists in the /clientDownload/ directory
  if (fs.existsSync(filePath)) {
    // If the file exists, serve it to the client
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}.xlsx`);

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } else {
    try {
      // If the file doesn't exist, generate it first
      const generatedFilePath = await generateExcelFile(filename, model, school);

      // Serve the generated file to the client
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename=${filename}.xlsx`);

      const fileStream = fs.createReadStream(generatedFilePath);
      fileStream.pipe(res);
    } catch (error) {
      console.error('Error generating or serving Excel file:', error);
      res.status(500).send('Error generating or serving Excel file');
    }
  }
});


app.get("/getFile/:filename", function (req, res) {
  const link = path.join(__dirname, `./uploads/faculty-uploads/${req.params.filename}`);
  res.download(link);
});

app.get("/showFile/:filename/:userType", function (req, res) {

  let { userType, filename } = req.params
  if (!userType) {
    userType = 'faculty'
  }

  const uploadPaths = {
    faculty: `./uploads/faculty-uploads/${filename}`,
    CAS: `./uploads/faculty-uploads/CAS-uploads/${filename}`,
    PBAS: `./uploads/faculty-uploads/PBAS-uploads/${filename}`,
    director: `./uploads/director-uploads/${filename}`,
    AAA: `./uploads/director-uploads/AAA-uploads/${filename}`,
    student: `./uploads/student-uploads/${filename}`,
    alumni: `./uploads/director-uploads/${filename}`,
    news: `./uploads/news-uploads/${filename}`,
    event: `./uploads/event-uploads/${filename}`,
    school: `./uploads/school-uploads/${filename}`,
    FeedbackATR: `./uploads/feedback-uploads/${filename}`,
    admin: `./uploads/admin-uploads/${filename}`,
    program: `./uploads/program-uploads/${filename}`,
    dsd: `./uploads/dsd-uploads/${filename}`,
    krc: `./uploads/krc-uploads/${filename}`,
    sports: `./uploads/sports-uploads/${filename}`,
    nss: `./uploads/nss-uploads/${filename}`,
    exam: `./uploads/exam-uploads/${filename}`,
    placement: `./uploads/placement-uploads/${filename}`,
    iil: `./uploads/iil-uploads/${filename}`,
    aqar: `./uploads/aqar-uploads/${filename}`,
    youth: `./uploads/youth-uploads/${filename}`,
    skill: `./uploads/skilldevelopment-uploads/${filename}`,
    swayam: `./uploads/swayam-uploads/${filename}`,
    estt: `./uploads/establishment-uploads/${filename}`,
    other: `./uploads/other-uploads/${filename}`,
    acf: `./uploads/acf-uploads/${filename}`,
    usha: `./uploads/usha-uploads/${filename}`,
  }

  const link = path.join(__dirname, uploadPaths[userType]);
  res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache the image for 1 hour (3600 seconds)
  res.sendFile(link);
});


app.post("/api/deleteFile", (req, res) => {
  const { fileName, path } = req.body
  deleteFile(fileName, path, (err) => {
    try {
      if (err) {
        throw new Error('File not found')
      }
      res.send({ status: 'deleted' });
    } catch (error) {
      console.log('The error is :', error)
      res.send({ status: 'error' });
    }
  })
})




// SERVING SECTION


// making build folder as static folder
app.use(express.static(path.join(__dirname, "build")));

// for all routes server will serve index.html from build folder

// 1. for going live 
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log(`Server started successfully at ${PORT}.`);
});
