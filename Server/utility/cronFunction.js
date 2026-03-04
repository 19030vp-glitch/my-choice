const { spawn } = require('child_process');
const exec = require('child_process').exec;
const path = require("path");
const { By, Key, Builder } = require('selenium-webdriver');
require('geckodriver')


function Delete_Excels() {

  const EXCEL_Path = path.join(__dirname, "../../excels/*")
  console.log(EXCEL_Path);

  exec('rm ' + EXCEL_Path, function (err, stdout, stderr) {
    if (err)
      console.log('Directory Empty', err);
    else
      console.log("Files Deleted");
  });

}

function Delete_Pdfs() {
  const PDF_Path = path.join(__dirname, "../../pdfs/*")
  console.log(PDF_Path);
  exec('rm ' + PDF_Path, function (err, stdout, stderr) {
    if (err)
      console.log('Directory Empty', err);
    else
      console.log("Files Deleted");
  });

}

// DB Backups configurations

//mongodump --host localhost --port 27017 --db srtmun --gzip --archive /home/sms2019/react-workspace/DB_Backups/srtmun2022-12-04.gzip --authenticationDatabase srtmun --username '***' --password *** 

function DB_Backups(CPath) {
  const ARCHIVE_Path = path.join(__dirname, CPath);
  console.log(ARCHIVE_Path);
  const child = spawn('mongodump', [`--uri=mongodb://${process.env.DB_User}:${process.env.DB_Pass}@localhost:27017/${process.env.DB_Name}?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false`,
  `--out=${ARCHIVE_Path}`,
  ]);

  child.stdout.on("data", (data) => console.log('stdout:\n', Buffer.from(data).toString()));
  child.stderr.on("data", (data) => console.log('stderr:\n', Buffer.from(data).toString()));
  child.on("error", (error) => console.log('error:\n', error));
  child.on("exit", (code, signal) => {
    if (code) console.log('process backup exited with code: ' + code);
    else if (signal) console.log('process backup exited with signal: ' + signal);
    else console.log("Backup is successful")
  })
}


// List of URLs to hit
// const urls = [
//   'https://google.com',
//   'https://srtmun-uims.org',
// ];

// Function to execute the curl command with a random URL
// function HitRandomUrl() {
//   console.log("hited to url");
//   const randomIndex = Math.floor(Math.random() * urls.length);
//   const randomUrl = urls[randomIndex];
//   const curlCommand = `curl -s 'http://google.com'`;

//   exec(curlCommand, (error, stdout, stderr) => {
//     if (error) {
//       console.error(`Error occurred while hitting ${randomUrl}: ${error.message}`);
//     } else {
//       console.log(`Successfully hit ${randomUrl}`);
//     }
//   });
// }

module.exports = { Delete_Pdfs, DB_Backups, Delete_Excels }
