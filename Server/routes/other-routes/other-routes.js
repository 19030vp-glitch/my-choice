const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const TotalExpenditure = require("../../models/other-models/totalExpenditureSchema")
const Scholarship = require("../../models/other-models/scholarshipSchema")
const MaintenanceAndInfrastructure = require("../../models/other-models/maintenanceAndInfrastructureSchema")
const IQACInstitutionQualityAssurance = require("../../models/other-models/iqacInstitutionQualityAssuranceSchema")

const models = { TotalExpenditure, Scholarship, MaintenanceAndInfrastructure, IQACInstitutionQualityAssurance }

const otherstorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const link = path.join(__dirname, `../../uploads/other-uploads/`)
        cb(null, link)
    },
    filename: (req, file, cb) => {
        cb(null, `${new Date().getTime()}-${file.originalname}`)
    },
})
const otherUpload = multer({ storage: otherstorage })

//get
router.post('/other/getData', async (req, res) => {
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
router.post("/other/newRecord/:model", otherUpload.single("Proof"), async (req, res) => {
    try {
        const model = req.params.model
        // console.log(model)
        const data = JSON.parse(JSON.stringify(req.body));
        const isFile = req.file
        if (isFile) {
            var up = req.file.filename;
        }
        let withUpData;

        if (up) {
            withUpData = Object.assign(data, { proof: up })
        }
        else {
            withUpData = data
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
router.post('/other/editRecord/:model', otherUpload.single('Proof'), async (req, res) => {
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
router.post('/other/deleteRecord', async (req, res) => {
    const { model, id } = req.body

    try {
        const Record = await models[model].findOne({ _id: id });
        await models[model].deleteOne({ _id: id })
        const Filename = Record.Proof;
        const link = path.join(__dirname, `../../uploads/other-uploads/${Filename}`);
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


module.exports = { router, models };