const User = require('../../models/faculty-models/userModel')
const AdminUser = require('../../models/faculty-models/adminUser')
const DirectorUser = require('../../models/faculty-models/directorUser')
const bcrypt = require('bcrypt');
const AlumniUser = require('../../models/alumni-models/alumniUserSchema');
const ContractualFacultyID = require('../../models/faculty-models/contractualFacultyID');
const emailTemplate = require('../../email/emailTemplate');
const sendMail = require('./services').sendMail

function authRoutes(app, upload, jwt) {

    // faculty-user login handler
    app.post("/api/auth/login", (req, res) => {
        let username;
        if (req.body.facultyType === 'Contractual') {
            username = `C-${req.body.username}`
        } else if (req.body.facultyType === 'UF Teacher') {
            username = `UFTG-${req.body.username}`
        } else {
            username = req.body.username
        }

        User.findOne({ username: username })
            .then(async(user) => {
                
                if (user) {
                    const isValidPass = await bcrypt.compare(req.body.password, user.password)
                    if (isValidPass) {
                        const token = jwt.sign({ username: user.username, id: user._id, }, "SRTMUN");
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
                        message: "User does not exist, please register.",
                    });
                }
            })
            .catch(function (err) {
                res.send({ status: "notok", message: "Internal Server Error" });
            });
    });




    // faculty-user register handler 
    app.post("/api/auth/register", upload.single("file"), async (req, res) => {

        function usernameGenerator(count, noOfZeros) {
            return Array(noOfZeros - String(count).length + 1).join('0') + count;
        }

        try {

            const data = JSON.parse(JSON.stringify(req.body));

            console.log(data)

            let username;
            let newCount;
            if (data.designation === 'Contractual') {
                // check if cas data for this user already exists
                ContractualFacultyID.findOne({ name: 'facultyContractualUsers' }, (err, contractual) => {
                    if (err) {
                        console.log('Could not found document in database for facultyContractualUsers');
                        res.send({ status: "error", message: "Internal server error" })
                    }
                    else {
                        if (contractual) {
                            // if cas data exist only push into that array
                            // remove cas array item with same year as in casData

                            console.log('Contractual Document :', contractual)

                            if (contractual.userIdCount > 0) {
                                newCount = contractual.userIdCount + 1
                                contractual.userIdCount = newCount
                            } else {
                                newCount = 1
                                contractual.userIdCount = 1
                            }

                            contractual.save((err, cas) => {
                                if (err) {
                                    console.log('Error in generating ID');
                                    res.send({ status: "error", message: 'Error in generating ID' })
                                }
                                else {
                                    console.log('New count :', newCount)
                                    username = `C-${usernameGenerator(newCount, 3)}`
                                    console.log('Contractual Username is :', `${username}`)
                                }
                            }
                            )
                        }

                    }
                })
            } else {
                username = data.username
            }



            // otp authentication
            let isMatch = await bcrypt.compare(data.clientOTP, data.serverOTP)

            if (isMatch) {
                const hashPass = await bcrypt.hash(data.password, 10)
                const user = new User({
                    salutation: data.salutation,
                    username: username,
                    name: data.name,
                    designation: data.designation,
                    department: data.department,
                    password: hashPass,
                    gender: data.gender,
                    email: data.email.toLowerCase(),
                    photoURL: req.file.filename,
                });
                user.save(function (err, user) {
                    if (err) {
                        console.log(err, "Something went wrong. Registration was not successfull");
                        res.send({ status: "error", message: "Something went wrong. Registration was not successfull" });
                    } else {
                        console.log('Faculty Registration is successfull')
                        if (user.designation === 'Contractual') {
                            let subjectForEmail = `${user.username} is your Employee ID for signing in at SRTMUN-UIMS.`
                            let htmlMatter = `<div>
                                                    <h2>Employee ID generated successfully</h2>
                                                    <p style="font-size: 14px; line-height: 140%;">
                                                    <strong>${user.username}</strong> is your Employee ID for signing in at <strong>SRTMUN-UMIS</strong>. Please enter use this as your username and your created password for logging in successfully.
                                                    </p>
                                                </div>`

                            // send mail
                            sendMail(req, res, user.email, subjectForEmail, 'html', emailTemplate(htmlMatter), 'no message', false)

                        }

                        res.send({ status: "success", message: "Registration Successfull", username: user.username });

                    }


                })

            }
            else {
                res.send({ status: "error", message: "Wrong OTP entered, Please try again" });
            }

        } catch (error) {
            res.send({ status: "error", message: "Internal Server Error" });
        }
    });

    // faculty-user authentication handler
    app.post("/api/auth", (req, res) => {

        // get token from body
        const token = req.body.faculty_token;
        const decoded = jwt.verify(token, "SRTMUN");
        User.findOne({ username: decoded.username }).then(function (user) {
            if (user) {
                res.send({ status: "authenticated", user: user });
            } else {
                res.send({ status: "error" });
            }
        });
    });

    // adminUser login handler
    app.post("/api/auth/admin/login", (req, res) => {
        AdminUser.findOne({ username: req.body.username })
            .then((adminUser) => {
                if (adminUser) {
                    if (req.body.password === adminUser.password) {
                        const token = jwt.sign({ id: adminUser._id, username: adminUser.username }, "SRTMUN");
                        res.send({ status: "ok", adminUser, token });
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


    // adminUser authentication handler
    app.post("/api/auth/admin", (req, res) => {
        // get token from body
        const token = req.body.admin_token;
        const decoded = jwt.verify(token, "SRTMUN");
        AdminUser.findOne({ _id: decoded.id }).then(function (adminUser) {
            if (adminUser) {
                res.send({ status: "authenticated", admin: adminUser });
            } else {
                res.send({ status: "error" });
            }
        });
    });


    // alumni-user register handler 
    app.post("/api/auth/alumni-register", upload.single("file"), async (req, res) => {

        try {

            const data = JSON.parse(JSON.stringify(req.body));

            const { salutation, name, programGraduated, schoolName, gender, password, cPassword, email, mobile, clientOTP, serverOTP } = data;

            // otp authentication
            let isMatch = await bcrypt.compare(clientOTP, serverOTP)

            if (isMatch) {
                const user = new AlumniUser({
                    mobile: mobile,
                    salutation: salutation,
                    name: name,
                    schoolName: schoolName,
                    programGraduated: programGraduated,
                    password: password,
                    gender: gender,
                    email: email.toLowerCase(),
                    photoURL: req.file.filename,
                });
                user.save();
                res.send({ status: "success", message: "Registration Successfull" });
            }
            else {
                res.send({ status: "error", message: "Wrong OTP entered, Please try again" });
            }

        } catch (error) {
            res.send({ status: "error", message: "Internal Server Error" });
        }
    });

    // Alumni-user authentication handler
    app.post("/api/auth/alumni", (req, res) => {

        // get token from body
        const token = req.body.alumni_token;
        const decoded = jwt.verify(token, "SRTMUN");
        // console.log('Token :', token, 'Decode :', decoded.username)
        AlumniUser.findOne({ email: decoded.username }).then(function (user) {
            if (user) {

                res.send({ status: "authenticated", user: user });
            } else {
                res.send({ status: "error" });
            }
        });
    });

    // Alumni-user login handler
    app.post("/api/auth/alumni-login", (req, res) => {
        AlumniUser.findOne({ email: req.body.username.toLowerCase() })
            .then((user) => {
                if (user) {
                    if (req.body.password === user.password) {
                        const token = jwt.sign({ email: user.email, id: user._id, }, "SRTMUN");
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
}

module.exports = authRoutes