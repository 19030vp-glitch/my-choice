const fs = require('fs');
const express = require('express');
const router = express.Router();

const ProgressionToHE = require('../../models/director-models/progressionToHESchema');
const Placement = require('../../models/director-models/placementSchema');
const QualifiedExams = require('../../models/director-models/qualifiedExamSchema');
const AlumniContribution = require('../../models/director-models/alumniContributionSchema');

const AlumniUser = require('../../models/alumni-models/alumniUserSchema');

// multer configuration

const multer = require('multer');
const path = require('path');
const alumnistorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const link = path.join(__dirname, `../../uploads/director-uploads/`)
        cb(null, link)
    },
    filename: (req, file, cb) => {
        cb(null, `${new Date().getTime()}-${file.originalname}`)
    },
})
const upload = multer({ storage: alumnistorage })

const alumnistore = multer.diskStorage({
    destination: (req, file, cb) => {
        const link = path.join(__dirname, `../../uploads/faculty-uploads/`)
        cb(null, link)
    },
    filename: (req, file, cb) => {
        cb(null, `${new Date().getTime()}-${file.originalname}`)
    },
})

const uploads = multer({ storage: alumnistore })

let models = { ProgressionToHE, Placement, AlumniUser, QualifiedExams, AlumniContribution }

router.post("/alumni/newRecord/:model", upload.single("Upload_Proof"), async (req, res) => {
    try {
        const model = req.params.model
        const data = JSON.parse(JSON.stringify(req.body));
        let SendData = null;
        const { SchoolName, AlumniId } = data
        const up = req.file.filename;

        //ProgressionToHE
        if (model == 'ProgressionToHE') {
            const { Name_of_student_enrolling, Program_graduated_from, Name_of_institution_admitted, Name_of_programme_admitted, Academic_Year } = data
            SendData = {
                Name_of_student_enrolling, Program_graduated_from, Name_of_institution_admitted, Name_of_programme_admitted, Academic_Year
            }
        }
        //Placement
        else if (model == 'Placement') {
            const { Name_of_student_placed, Program_graduated_from, Name_of_the_employer, Employer_contact_details, Pay_package_annum, Academic_Year, Type_Of_Placement } = data
            SendData = {
                Name_of_student_placed, Program_graduated_from, Name_of_the_employer, Employer_contact_details, Pay_package_annum, Academic_Year, Type_Of_Placement
            }
        }
        //QualifiedExams
        else if (model == 'QualifiedExams') {
            const { Acadmic_year, Registration_number_roll_number, Names_of_students_selected_qualified, Name_of_the_Exam } = data
            SendData = {
                Acadmic_year, Registration_number_roll_number, Names_of_students_selected_qualified, Name_of_the_Exam
            }
        }
        //AlumniContribution
        else if (model == 'AlumniContribution') {
            const { Name_of_The_Alumni_Contributed, Program_graduated_from, Amount_of_contribution, Academic_Year } = data
            SendData = {
                Name_of_The_Alumni_Contributed, Program_graduated_from, Amount_of_contribution, Academic_Year
            }
        }

        var withUpData = Object.assign(SendData, { Upload_Proof: up, SchoolName, AlumniId })
        const obj = new models[model](withUpData);
        await obj.save();
        res.status(201).send("Entry Succeed")
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
});

//Delete Route
router.post('/alumni/deleteRecord', async (req, res) => {
    const { model, id } = req.body
    try {
        const Record = await models[model].findOne({ _id: id });
        console.log(Record);

        await models[model].deleteOne({ _id: id })
        const Filename = Record.Upload_Proof;
        const link = path.join(__dirname, `../../uploads/director-uploads/${Filename}`);
        fs.unlink(link, function (err) {
            if (err) {
                console.error(err);
            }

        });
        res.status(200).send("Entry Deleted Successfully");
    }
    catch (e) {
        res.status(500).send({ massage: e.massage });
    }
})

//Get Route
router.post('/alumni/getData', async (req, res) => {

    const { model, id, filter } = req.body
    try {
        if (filter) {
            if (filter === 'placementBusiness') {
                const fetch = await models[model].find({ AlumniId: id, Type_Of_Placement: 'Business Started' }).sort({ $natural: -1 });
                res.status(200).send(fetch);
            }
            else if (filter === 'placementJob') {
                const fetch = await models[model].find({ AlumniId: id, Type_Of_Placement: 'Placement' }).sort({ $natural: -1 });
                res.status(200).send(fetch);
            }
            else if (filter === 'AlumniUser') {
                const fetch = await models[model].find({ _id: id })
                res.status(200).send(fetch)
            }
        }
        else {
            const fetch = await models[model].find({ AlumniId: id }).sort({ $natural: -1 });
            res.status(200).send(fetch);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
})
//Edit Routes


// alumni user route
router.post('/alumni/editRecord', uploads.fields([{ name: "Upload_Proof", maxCount: 1 }, { name: "Upload_Proof2", maxCount: 1 }]), async (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body));
    SendData = null;
    const { id } = data
    // console.log(req.files)
    // console.log(req.files["Upload_Proof"])
    // console.log(req.files["Upload_Proof2"])
    const isFiles = req.files
    const isFileProfile = isFiles && isFiles["Upload_Proof"] ? req.files["Upload_Proof"][0] : ""
    const isFileProof = isFiles && isFiles["Upload_Proof2"] ? req.files["Upload_Proof2"][0] : ""
    // const  = req.files[""][0]
    // if (isFileProfile) {
    //     console.log('fileprofile found: ' + isFileProfile)
    // var up = req.file.filename
    // }
    // if (isFileProof) {
    //     console.log('fileproof found: ' + isFileProof)
    // var up = req.file.filename
    // }

    Object.keys(data).map((item) => {
        if (data[item] == 'undefined') {
            data[item] = ""
        }

    })
    if (isFileProof !== "") {
        var proof = req.files["Upload_Proof2"][0].filename
    }
    if (isFileProfile !== "") {
        var up = req.files["Upload_Proof"][0].filename
    }

    const programGraduated = data.array;
    const { salutation, name, address, mobile, schoolName, gender, dob, doCompleted, doStarted, country } = data
    SendData = { salutation, name, programGraduated, address, mobile, schoolName, gender, dob, doCompleted, doStarted, country }

    if (up && proof) {
        alldata = Object.assign(SendData, { photoURL: up }, { Upload_Proof: proof })
    }
    else if (up && !proof) {
        alldata = Object.assign(SendData, { photoURL: up })
    }
    else if (!up && proof) {
        alldata = Object.assign(SendData, { Upload_Proof: proof })
    }
    else {
        alldata = SendData;
    }
    await AlumniUser.findOneAndUpdate({ _id: id }, alldata)
    res.status(200).send("Edited Successfully")
})

// sub tabels
router.post('/alumni/editRecord/:model', upload.single('Upload_Proof'), async (req, res) => {
    const model = req.params.model
    const data = JSON.parse(JSON.stringify(req.body));
    let SendData = null;
    const { id } = data
    const isfile = req.file;

    if (isfile) {
        var up = req.file.filename
    }

    Object.keys(data).map((item) => {
        if (data[item] == 'undefined') {
            data[item] = ""
        }

    })

    //ProgressionToHE
    if (model == "ProgressionToHE") {
        const { Name_of_student_enrolling, Program_graduated_from, Name_of_institution_admitted, Name_of_programme_admitted, Academic_Year } = data
        SendData = { Name_of_student_enrolling, Program_graduated_from, Name_of_institution_admitted, Name_of_programme_admitted, Academic_Year }
    }
    //Placement
    else if (model == 'Placement') {
        const { Name_of_student_placed, Program_graduated_from, Name_of_the_employer, Employer_contact_details, Pay_package_annum, Academic_Year, Type_Of_Placement } = data
        SendData = {
            Name_of_student_placed, Program_graduated_from, Name_of_the_employer, Employer_contact_details, Pay_package_annum, Academic_Year, Type_Of_Placement
        }
    }
    //QualifiedExams
    else if (model == 'QualifiedExams') {
        const { Acadmic_year, Registration_number_roll_number, Names_of_students_selected_qualified, Name_of_the_Exam } = data
        SendData = {
            Acadmic_year, Registration_number_roll_number, Names_of_students_selected_qualified, Name_of_the_Exam
        }
    }
    //AlumniContribution
    else if (model == 'AlumniContribution') {
        const { Name_of_The_Alumni_Contributed, Program_graduated_from, Amount_of_contribution, Academic_Year } = data
        SendData = {
            Name_of_The_Alumni_Contributed, Program_graduated_from, Amount_of_contribution, Academic_Year
        }
    }


    var alldata = null
    if (up) {

        alldata = Object.assign(SendData, { Upload_Proof: up })

    }
    else {
        alldata = SendData
    }
    await models[model].findOneAndUpdate({ _id: id }, alldata)
    res.status(200).send("Edited Successfully")
})

router.get('/viewer/alumni/:filename', (req, res) => {
    const link = path.join(__dirname, `../../uploads/director-uploads/${req.params.filename}`)
    res.sendFile(link);
})

module.exports = router;