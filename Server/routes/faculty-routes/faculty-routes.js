const fs = require('fs');
const express = require('express');
const router = express.Router();
const path = require('path');
const multerConfig = require('../../utility/multerConfig').multerConfig;
const facultyUpload = multerConfig('../uploads/faculty-uploads')

const facultyModels = require('./routes').models
const models = { ...facultyModels }

//get
router.post('/faculty/getData', async (req, res) => {
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
router.post("/faculty/newRecord/:model", facultyUpload.single("Proof"), async (req, res) => {
    try {
        const model = req.params.model

        const data = JSON.parse(JSON.stringify(req.body));
        let SendData = null;
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
router.post('/faculty/editRecord/:model', facultyUpload.single('Proof'), async (req, res) => {
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
router.post('/faculty/deleteRecord', async (req, res) => {
    const { model, id } = req.body
    console.log(model, id);
    try {
        const record = await models[model].findOne({ _id: id });
        console.log(record)
        await models[model].deleteOne({ _id: id })
        const filename = record.proof;
        console.log(filename)

        const link = path.join(__dirname, `../../uploads/faculty-uploads/${filename}`);
        fs.unlink(link, function (err) {
            if (err) {
                console.error(err);
            }

        });
        res.status(200).send("Entry Deleted Successfully");
    }
    catch (e) {
        console.log(e.message)
        res.status(500).send({ massage: e.massage });
    }
})

module.exports = { router, models };