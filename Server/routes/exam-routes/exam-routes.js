const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const multerConfig = require('../../utility/multerConfig').multerConfig

const ExamPassedDuringYear = require('../../models/exam-models/examPassedDuringYearSchema')
const StudentComplaintsGrievances = require('../../models/exam-models/studentComplaintsGrevancesSchema')
const DateOfResultDiclaration = require('../../models/exam-models/dateOfResultDiclarationSchema')

const models = { ExamPassedDuringYear, StudentComplaintsGrievances, DateOfResultDiclaration }

const examUpload = multerConfig(`../uploads/exam-uploads/`)


const excelObject = {
    //EXAM
    ExamPassedDuringYear: {
        "Program Code": 'programCode', "Program Name": 'programName', "Number of Students Appeared in Final Year Examination": 'studentsAppeared', "Number of Students Passed in Final Year Examination": 'studentsPassed', 'Year': 'academicYear',
    },
    StudentComplaintsGrievances: {
        "No Of Students Appeared": 'noOfStudents', "No Of Grievances": 'noOfGrievances', 'Year': 'academicYear',
    },
    DateOfResultDiclaration: {
        "Programme Name": 'programmeName', "Programme Code": 'programmeCode', "Semester/ year": 'academicYear', "Last date of the last semester-end/ year- end examination": 'lastDate', "Date of declaration of results of semester-end/ year- end examination": 'diclarationDate',
    }
}

//get
router.post('/exam/getData', async (req, res) => {
    const { model, filter } = req.body
    try {
        const fetch = await models[model].find(filter);
        res.status(200).send(fetch);
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
})

//set
router.post("/exam/newRecord/:model", examUpload.single("Proof"), async (req, res) => {
    try {
        const model = req.params.model
        const data = JSON.parse(JSON.stringify(req.body));

        const isFile = req.file
        if (isFile) {
            var up = req.file.filename;
        }
        let withUpData = data
        if (up) {
            Object.assign(withUpData, { Proof: up })
        }

        const obj = new models[model](withUpData);
        await obj.save();
        res.status(201).send("Entry Succeed")
    }
    catch (err) {
        console.log(err)
        res.status(500).send()
    }
});

//reset
router.post('/exam/editRecord/:model', examUpload.single("Proof"), async (req, res) => {
    const model = req.params.model
    const data = JSON.parse(JSON.stringify(req.body));
    const { id } = data
    const isfile = req.file;
    if (isfile) {
        var up = req.file.filename
    }
    let SendData = data
    if (up) {
        Object.assign(SendData, { Proof: up })
    }
    await models[model].findOneAndUpdate({ _id: id }, SendData)
    res.status(200).send("Edited Successfully")
})

//remove
router.post('/exam/deleteRecord', async (req, res) => {
    const { model, id } = req.body

    try {
        const Record = await models[model].findOne({ _id: id });
        await models[model].deleteOne({ _id: id })
        const Filename = Record.Proof;
        const link = path.join(__dirname, `../../uploads/exam-uploads/${Filename}`);
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




module.exports = { router, excelObject, models };