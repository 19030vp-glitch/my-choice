const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const YFCollege = require("../../models/youth-festival/yfColleges");
const ACFCollege = require("../../models/acf-college-models/acfCollege");

// multer configuration

const { multerConfig } = require("../../utility/multerConfig");
const upload = multerConfig(`../../`);

const collegeModels = {
  YFCollege,
  ACFCollege,
};

// student login auth route
router.post("/api/auth/youthfestival-login", (req, res) => {
  const { email, password, modelName } = req.body;
  const model = modelName ? modelName : "YFCollege";
  collegeModels[model]
    .findOne({ email: email.toLowerCase() })
    .then((user) => {
      if (user) {
        if (password === user.password) {
          const token = jwt.sign({ email: user.email, id: user._id }, "SRTMUN");
          res.send({ status: "ok", user, token });
        } else {
          res.send({
            status: "notok",
            message: "Please Enter correct username or password",
          });
        }
      } else {
        res.send({
          status: "notok",
          message: "Please Enter correct username or password",
        });
      }
    })
    .catch(function (err) {
      res.send({ status: "notok", message: "Internal Server Error" });
    });
});

// check if email is already taken by student
router.post("/youthfestival/editProfile", async function (req, res) {
  try {
    const { user, data, modelName, filter: modelFilter } = req.body;
    const model = modelName ? modelName : "YFCollege";
    const filter = modelName === 'YFCollege' ? { _id: user?._id } : modelFilter
    const doc = await collegeModels[model].findOneAndUpdate(
      filter,
      data,
      { new: true }
    );
    res.send({ status: "success", data: doc });
  } catch (error) {
    res.send({ status: "error" });
  }
});

// check if email is already taken by student
router.post("/service/youthfestival-checkAndEmail", function (req, res) {
  const { email, modelName, collegeCode } = req.body;
  const model = modelName ? modelName : "YFCollege";

  const filter =
    model === "YFCollege" ? { email: email.toLowerCase() } : { collegeCode };

  // check if mail already taken
  collegeModels[model].findOne(filter, (err, user) => {
    if (user) {
      res.send({ status: "taken", message: "Email already taken" });
    } else {
      res.send({ status: "available" });
    }
  });
});

// student-user register handler
router.post(
  "/api/auth/youthfestival-register",
  upload.single("file"),
  async (req, res) => {
    try {
      const data = JSON.parse(JSON.stringify(req.body));
      const model = data.model ? data.model : "YFCollege";

      // otp authentication
      let isMatch = await bcrypt.compare(data.clientOTP, data.serverOTP);
      const unsanitizedHash = await bcrypt.hash(data.collegeCode, 10);
      const hash = unsanitizedHash.replace(/\//g, '');

      if (isMatch) {
        const college = new collegeModels[model]({
          ...data,
          email: data.email.toLowerCase(),
          ...(model === "ACFCollege"
            ? {
              collegeCodeHash: hash,
              programsOffered: JSON.parse(data.programsOffered),
            }
            : {}),
        });
        const savedCollege = await college.save();
        res.send({
          status: "success",
          message: "Registration Successfull",
          college: savedCollege,
        });
      } else {
        res.send({
          status: "error",
          message: "Wrong OTP entered, Please try again",
        });
      }
    } catch (error) {
      console.log(error);
      res.send({ status: "error", message: "Internal Server Error" });
    }
  }
);

module.exports = router;
