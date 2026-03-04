const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const xlsx = require('xlsx');
const multerConfig = require('../../utility/multerConfig').multerConfig

const SchoolAQAR = require('../../models/director-models/schoolAqarSchema')
const SchoolNIRF = require('../../models/director-models/schoolNirfSchema')
const DSDAQAR = require('../../models/dsd-models/dsdAqarSchema')
const KRCAQAR = require('../../models/krc-models/krcAqarSchema')
const SportsAQAR = require('../../models/sports-models/sportsAqarSchema')
const NSSAQAR = require('../../models/nss-models/nssAqarSchema')
const ExamAQAR = require('../../models/exam-models/examAqarSchema')
const PlacementAQAR = require('../../models/placement-models/placementAqarSchema')
const IILAQAR = require('../../models/iil-models/iilAQARSchema')
const ESTTAQAR = require('../../models/establishment-models/esttAqarSchema')
const OtherAQAR = require('../../models/other-models/otherAQARSchema')
const YFReportIsSubmitted = require('../../models/youth-festival/yfSubmitted')

const NonTeachingModels = { DSDAQAR, KRCAQAR, SportsAQAR, NSSAQAR, ExamAQAR, PlacementAQAR, OtherAQAR, YFReportIsSubmitted, IILAQAR, ESTTAQAR, SchoolAQAR, SchoolNIRF }

const DSDSports = require('../../models/dsd-models/dsdSportsSchema');
const SportsAndCulturalEvents = require('../../models/dsd-models/sportsAndCulturalEventsSchema');

const models = { DSDSports, SportsAndCulturalEvents }

const excelUpload = multerConfig(`../../excels/`)

const dsdstorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const link = path.join(__dirname, `../../uploads/dsd-uploads/`)
        cb(null, link)
    },
    filename: (req, file, cb) => {
        cb(null, `${new Date().getTime()}-${file.originalname}`)
    },
})
const dsdUpload = multer({ storage: dsdstorage })



// add aqar submissions year in the schema so that it will show if the aqar for that year has submitted or not
router.post('/other/services/isReportSubmitted', (req, res) => {

    const { year, model, filter, dataToAdd } = req.body;
    const modelFilter = filter ? filter : {}
    const data = dataToAdd ? dataToAdd : {}
    console.log('Data to add', dataToAdd)
    NonTeachingModels[model].findOne(modelFilter, (err, doc) => {
        if (err) {
            console.error(err);
            return res.send({ status: 'error', message: "Internal Server Error" });
        } else {
            if (!doc) {
                doc = new NonTeachingModels[model](data);
            }

            if (model === 'SchoolAQAR' || model === 'SchoolNIRF') {
                doc.schoolName = dataToAdd.schoolName
            }


            doc.submitted = [...new Set([...doc.submitted, year])]?.sort((a, b) => {
                const numA = Number(a.replace('-', ''));
                const numB = Number(b.replace('-', ''));
                if (numA > numB) {
                    return -1;
                } else if (numA < numB) {
                    return 1;
                }
                return 0;
            });;

            doc.save((saveErr, updatedDoc) => {
                if (saveErr) {
                    console.log(saveErr)
                    return res.send({ status: 'error', message: "Could not submit the form" });

                } else {
                    return res.send({ status: 'success', message: `Report submission successful` });
                }
            });

        }
    });

})

//get
router.post('/dsd/getData', async (req, res) => {
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
router.post("/dsd/newRecord/:model", dsdUpload.single("Proof"), async (req, res) => {
    try {
        const model = req.params.model
        // console.log(model)
        const data = JSON.parse(JSON.stringify(req.body));
        let SendData = null;
        // const { } = data
        const up = req.file.filename;
        SendData = data

        var withUpData = Object.assign(SendData, { proof: up })
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
router.post('/dsd/editRecord/:model', dsdUpload.single('Proof'), async (req, res) => {
    const model = req.params.model
    const data = JSON.parse(JSON.stringify(req.body));
    let SendData = null;
    const { id } = data
    const isfile = req.file;
    if (isfile) {
        var up = req.file.filename
    }
    SendData = data

    var alldata = null
    if (up) {
        alldata = Object.assign(SendData, { proof: up })
    }
    else {
        alldata = SendData
    }
    await models[model].findOneAndUpdate({ _id: id }, alldata)
    res.status(200).send("Edited Successfully")
})

//remove
router.post('/dsd/deleteRecord', async (req, res) => {
    const { model, id } = req.body

    try {
        const Record = await models[model].findOne({ _id: id });
        await models[model].deleteOne({ _id: id })
        const Filename = Record.proof;
        const link = path.join(__dirname, `../../uploads/dsd-uploads/${Filename}`);
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


module.exports = { router, models }