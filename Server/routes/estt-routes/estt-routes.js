const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const multerConfig = require('../../utility/multerConfig').multerConfig

const esttUpload = multerConfig("../uploads/establishment-uploads/")

const EsttFullTimeTeacher = require('../../models/establishment-models/esttFullTimeTeacherSchema')
const EsttFullTimeTeacherAgainstSanctioned = require('../../models/establishment-models/esttFullTimeTeacherAgainstSanctionedSchema')
const EsttFullTimeTeacherWhoLeft = require('../../models/establishment-models/esttFullTimeTeacherWhoLeftSchema')

const models = { EsttFullTimeTeacher, EsttFullTimeTeacherWhoLeft, EsttFullTimeTeacherAgainstSanctioned }

//get
router.post('/estt/getData', async (req, res) => {
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
router.post("/estt/newRecord/:model", esttUpload.single("Proof"), async (req, res) => {
    try {
        const model = req.params.model
        // console.log(model)
        const data = JSON.parse(JSON.stringify(req.body));
        let SendData = null;
        // const { } = data
        const isfile = req.file;
        if (isfile) {
            var up = req.file.filename
        }

        SendData = data

        var withUpData = up ? Object.assign(SendData, { proof: up }) : SendData;
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
router.post('/estt/editRecord/:model', esttUpload.single('Proof'), async (req, res) => {
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
router.post('/estt/deleteRecord', async (req, res) => {
    const { model, id } = req.body

    try {
        const Record = await models[model].findOne({ _id: id });
        await models[model].deleteOne({ _id: id })
        const Filename = Record.Proof;
        const link = path.join(__dirname, `../../uploads/establishment-uploads/${Filename}`);
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