const DirectorUser = require('../../models/director-models/directorUser')
const multer = require('multer')
const path = require('path')
const bcrypt = require('bcrypt')

// multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, `../../uploads/director-uploads/`));
        console.log('Link :', path.join(__dirname, `../../uploads/director-uploads/`))
    },
    filename: (req, file, cb) => {
        cb(null, `${new Date().getTime()}-${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

function directorAuth(app, jwt) {
    // faculty-user login handler
    app.post("/api/auth/director-login", (req, res) => {
        // console.log(req.body.department, req.body.password)
        DirectorUser.findOne({ department: req.body.department })
            .then(async(user) => {
                if (user) {
                    const isValidPass = await bcrypt.compare(req.body.password, user.password)
                    if (isValidPass) {
                        const token = jwt.sign({ department: user.department, id: user._id, }, "SRTMUN");
                        res.send({ status: "ok", user, token });
                    } else {
                        res.send({
                            status: "notok",
                            message: "Please enter correct school / department or password",
                        });
                    }
                } else {
                    res.send({
                        status: "notok",
                        message: "Please enter correct school / department or password",
                    });
                }
            })
            .catch(function (err) {
                console.log(err)
                res.send({ status: "notok", message: "Internal Server Error in auth" });
            });
    });

    // faculty-user register handler 
    app.post("/api/auth/director-register", upload.single("file"), async (req, res) => {

        try {

            const data = JSON.parse(JSON.stringify(req.body));
            // otp authentication
            let isMatch = await bcrypt.compare(data.clientOTP, data.serverOTP)

            if (isMatch) {
                const hashPass = await bcrypt.hash(data.password, 10)
                const user = new DirectorUser({
                    salutation: data.salutation,
                    mobileNumber: data.mobileNumber,
                    name: data.name,
                    designation: data.designation,
                    department: data.department,
                    password: hashPass,
                    gender: data.gender,
                    email: data.email.toLowerCase(),
                    photoURL: req.file.filename,
                });
                user.save();
                res.send({ status: "success", message: "Registration Successfull" });
            }
            else {
                res.send({ status: "error", message: "Wrong OTP entered, Please try again" });
            }

        } catch (error) {
            console.log(error)
            res.send({ status: "error", message: "Internal Server Error" });
        }
    });

    // faculty-user authentication handler
    app.post("/api/director-auth", (req, res) => {

        // get token from body
        const token = req.body.director_token;
        const decoded = jwt.verify(token, "SRTMUN");
        DirectorUser.findOne({ department: decoded.department }).then(function (user) {
            if (user) {
                res.send({ status: "authenticated", user: user });
            } else {
                res.send({ status: "error" });
            }
        });
    });
}

module.exports = directorAuth
