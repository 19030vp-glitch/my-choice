// import necessary models here
const AdminUser = require('../models/faculty-models/adminUser')
const FacultyUser = require('../models/faculty-models/userModel')
const DirectorUser = require('../models/director-models/directorUser')
const StudentUser = require('../models/student-models/studentUserSchema')
const AlumniUser = require('../models/alumni-models/alumniUserSchema')
const PROUser = require('../models/pro-models/proUser')
const YFCollege = require('../models/youth-festival/yfColleges')
const DSDUser = require('../models/dsd-models/dsdUserSchema')
const KRCUser = require('../models/krc-models/krcUserSchema')
const SportsUser = require('../models/sports-models/sportsUserSchema')
const NSSUser = require('../models/nss-models/nssUserSchema')
const ExamUser = require('../models/exam-models/examUserSchema')
const PlacementUser = require('../models/placement-models/placementUserSchema')
const IILUser = require('../models/iil-models/iilUserSchema')
const SkillUser = require('../models/skilldevelopment-models/skillUserSchema')
const PGUser = require('../models/pg-models/pgUserSchema')
const APDSUser = require('../models/apds-models/apdsUserSchema')
const SwayamUser = require('../models/swayam-models/swayamUserSchema')
const ESTTUser = require('../models/establishment-models/esttUserSchema')
const USHAUser = require('../models/pm-usha-models/ushaUser')


const models = { FacultyUser, DirectorUser, StudentUser, AlumniUser, PROUser, YFCollege, DSDUser, KRCUser, SportsUser, NSSUser, ExamUser, PlacementUser, IILUser, SkillUser, PGUser, APDSUser, SwayamUser, ESTTUser, AdminUser, USHAUser }

const userAuthentication = (app, jwt) => {

    // faculty-user authentication handler
    app.post("/api/user/authentication", (req, res) => {

        // get data from body
        const { token, model, filterName } = req.body
        const decoded = jwt.verify(token, "SRTMUN");
        const filter = { [filterName]: decoded[filterName] }
        models[model].findOne(filter).then(function (user) {
            if (user) {
                res.send({ status: "authenticated", user: user });
            } else {
                res.send({ status: "error" });
            }
        });
    });

    app.post("/service/user/login", (req, res) => {
        const { email, password, model } = req.body
        models[model].findOne({ email: email.toLowerCase() })
            .then((user) => {
                if (user) {
                    if (password === user.password) {
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
                        message: "Please Enter correct username or password",
                    });
                }
            })
            .catch(function (err) {
                res.send({ status: "notok", message: "Internal Server Error" });
            });
    })


}





module.exports = userAuthentication