const express = require("express");
const router = express.Router();
const {
  Delete_Pdfs,
  DB_Backups,
  Delete_Excels,
} = require("../../utility/cronFunction");
const Users = require("../../models/faculty-models/userModel");
const DirectorUser = require("../../models/director-models/directorUser");
const StudentUser = require("../../models/student-models/studentUserSchema");
const bcrypt = require("bcrypt");

router.post("/developer/mongodump", () => {
  const C_Date = new Date();
  let CPath = `../../../DB_Backups/SRTMUN-${C_Date.getDate()}-${
    C_Date.getMonth() + 1
  }-${C_Date.getFullYear()}-${C_Date.getTime()}`;
  DB_Backups(CPath);
});

router.post("/developer/excelsclear", () => {
  Delete_Excels();
});

router.post("/developer/pdfsclear", () => {
  Delete_Pdfs();
});

router.post("/developer/backendTestFun", () => {
  //   testPassHash();
});

const testPassHash = async () => {
  try {
    const users = await Users.find({});
    const totalUsers = users.length;
    let count = 0;
    let persentage = 0;
    console.clear();
    for (const user of users) {
      ++count;
      persentage = (count / totalUsers) * 100;
      console.log(`Updating... ${persentage.toFixed(2)} %`);
      const newPass = await bcrypt.hash(user.password, 10);
      await Users.findOneAndUpdate(
        { _id: user._id },
        { $set: { password: newPass } }
      );
      console.clear();
    }

    console.log("Password update completed 100% successfully.");
  } catch (error) {
    console.error("Error updating passwords:", error);
    throw new Error("Error updating passwords: " + error.message);
  }
};

module.exports = router;
