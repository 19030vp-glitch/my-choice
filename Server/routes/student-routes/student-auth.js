const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const path = require('path');

const StudentUser = require('../../models/student-models/studentUserSchema');

// multer configuration

const multer = require('multer');
const capitalizeText = require('../../utility/capitalizeText');


const studentstorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const link = path.join(__dirname, `../../uploads/student-uploads/`)
        cb(null, link)
    },
    filename: (req, file, cb) => {
        cb(null, `${new Date().getTime()}-${file.originalname}`)
    },
})
const StudentUpload = multer({ storage: studentstorage })

const models = { StudentUser }


// student login auth route 
router.post("/api/auth/student-login", (req, res) => {
    const { username, password, isAlumniLink } = req.body
    StudentUser.findOne({ email: username.toLowerCase() })
        .then(async (user) => {
            if (user) {
                if (isAlumniLink === user.isAlumni) {
                    const isValidPass = await bcrypt.compare(password, user.password)
                    if (isValidPass) {
                        const token = jwt.sign({ email: user.email, id: user._id, }, "SRTMUN");
                        res.send({ status: "ok", user, token });
                    }
                    else {
                        res.send({
                            status: "notok",
                            message: "Please Enter correct username or password",
                        });
                    }
                } else {
                    res.send({
                        status: "notok",
                        message: `You are ${isAlumniLink ? "not an alumni, try logging in via the Student Login page." : "no longer a student, please use the Alumni Login instead."}`,
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
})


// check if email is already taken by student
router.post('/service/student-checkAndEmail', function (req, res) {
    const { email } = req.body;
    // check if mail already taken
    StudentUser.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (user) {
            res.send({ status: 'taken', message: 'Email already taken' });
        }
        else {
            res.send({ status: 'available' })
        }
    });
})



// student-user register handler 
router.post("/api/auth/student-register", StudentUpload.single("file"), async (req, res) => {

    try {

        const data = JSON.parse(JSON.stringify(req.body));
        const { salutation, name, programGraduated, schoolName, gender, email, mobile, clientOTP, serverOTP, abcNo, currentIn, country, cast, religion, programEnroledOn, isCreatedByDirector, isAlumni, programCompletedOn } = data;


        if (JSON.parse(isCreatedByDirector)) {
            //genrate random pass
            const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
            let password = "";
            const length = 8
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * charset.length);
                password += charset[randomIndex];
            }
            const hashPass = await bcrypt.hash(password, 10)
            const user = new StudentUser({
                mobile, salutation, name: capitalizeText(name), schoolName, programGraduated, hashPass, gender,
                email: email.toLowerCase(), photoURL: req?.file?.filename || (gender === 'Male' ? 'male.jpg' : 'female.jpg'),
                abcNo, currentIn, country, cast, religion, programEnroledOn, isActiveStudent: true, isCreatedByDirector: true, isAlumni: false
            })
            await user.save();
            res.send({ status: "success", message: "Student Added Successfuly" });
        } else {
            // otp authentication
            const { password } = data
            let isMatch = await bcrypt.compare(clientOTP, serverOTP)
            if (isMatch) {
                const hashPass = await bcrypt.hash(password, 10)
                const user = new StudentUser({
                    mobile, salutation, name: capitalizeText(name), schoolName, programGraduated, password: hashPass, gender,
                    email: email.toLowerCase(), photoURL: req?.file?.filename || (gender === 'Male' ? 'male.jpg' : 'female.jpg'),
                    abcNo, currentIn, country, cast, religion, programEnroledOn, isActiveStudent: true, isCreatedByDirector: false, isAlumni: JSON.parse(isAlumni), programCompletedOn
                });
                await user.save();
                res.send({ status: "success", message: "Registration Successfull" });
            }
            else {
                res.send({ status: "error", message: "Wrong OTP entered, Please try again" });
            }
        }

    } catch (error) {
        console.log(error);
        res.send({ status: "error", message: "Internal Server Error" });
    }
});

// student-user authentication handler
router.post("/api/auth/student", (req, res) => {

    // get token from body
    const token = req.body.student_token;
    const decoded = jwt.verify(token, "SRTMUN");
    // console.log('Token :', token, 'Decode :', decoded.username)
    StudentUser.findOne({ email: decoded.username }).then(function (user) {
        if (user) {

            res.send({ status: "authenticated", user: user });
        } else {
            res.send({ status: "error" });
        }
    });
});

router.get("/student/:filename", function (req, res) {
    const link = path.join(__dirname, `../../uploads/student-uploads/${req.params.filename}`);
    res.sendFile(link);
});

//Student User Edit Record
router.post("/student/editRecord/", StudentUpload.fields([{ name: "uploadProof", maxCount: 1 }, { name: "photoURL", maxCount: 1 }]), async (req, res) => {

    try {
        // const model = req.params.model
        const data = JSON.parse(JSON.stringify(req.body));
        let SendData = null;
        const { id } = data
        const isfile = req.files;
        const isFileProfile = isfile && isfile["photoURL"] ? req.files["photoURL"][0] : ""
        const isFileProof = isfile && isfile["uploadProof"] ? req.files["uploadProof"][0] : ""
        if (isFileProof !== "") {
            var uploadProof = isFileProof.filename
        }
        if (isFileProfile !== "") {
            var photoURL = isFileProfile.filename
        }

        Object.keys(data).map((item) => {
            if (data[item] == 'undefined') {
                data[item] = ""
            }

        })
        // console.log(data)
        const { salutation, name, programGraduated, address, mobile, schoolName, gender, dob, abcNo, ResearchGuide, Title, dateOfRac, ReceivesFelloship, ResearchGuideId, currentIn, country, cast, religion, programEnroledOn, programCompletedOn } = data

        SendData = { salutation, name, programGraduated, address, mobile, schoolName, gender, dob, abcNo, ResearchGuide, Title, dateOfRac, ReceivesFelloship, ResearchGuideId, currentIn, country, cast, religion, programEnroledOn, programCompletedOn }

        if (photoURL) {
            SendData.photoURL = photoURL
        }
        else if (uploadProof) {
            SendData.uploadProof = uploadProof
        }
        await StudentUser.findOneAndUpdate({ _id: id }, SendData)
        res.status(200).send("Edited Successfully")
    } catch (error) {
        console.log(error);
    }

})


module.exports = router;