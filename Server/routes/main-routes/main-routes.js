const fs = require('fs');
const express = require('express');
const router = express.Router();
const path = require('path');
const examModels = require('../exam-routes/exam-routes').models
const iilModels = require('../iil-routes/iil-routes').models
const directorModels = require('../director-routes/director-routes').models
const dsdModels = require('../dsd-routes/dsd-routes').models
const esttModels = require('../estt-routes/estt-routes').models
const krcModels = require('../krc-routes/krc-routes').models
const nssModels = require('../nss-routes/nss-routes').models
const otherModels = require('../other-routes/other-routes').models
const facultyModels = require('../faculty-routes/routes').AllModels
const SwayamDetailsOfOnlineCourses = require('../../models/swayam-models/swayamDetailsOfOnlineCoursesSchema')
const ResearchGuideAdmin = require('../../models/admin-models/researchGuideAdminSchema')
const ACFDitails = require('../../models/acf-college-models/acfDetailsSchema')
const SoftAndEquipment = require('../../models/pm-usha-models/softAndEquipmentSchema');


const multer = require('multer');
const dirstorage = multer.diskStorage({
    destination: (req, file, cb) => {
        try {
            const data = JSON.parse(JSON.stringify(req.body));
            const { folder } = data;
            const link = path.join(__dirname, `../../uploads/${folder}-uploads/`);
            cb(null, link);
        } catch (error) {
            cb(error, null);
        }
    },
    filename: (req, file, cb) => {
        cb(null, `${new Date().getTime()}-${file.originalname}`);
    },
});

const upload = multer({ storage: dirstorage });
const models = { ...examModels, ...iilModels, ...directorModels, ...dsdModels, ...esttModels, ...krcModels, ...nssModels, ...otherModels, ...facultyModels, SwayamDetailsOfOnlineCourses, ResearchGuideAdmin, ACFDitails, SoftAndEquipment }

//get
router.post('/main/getData', async (req, res) => {
    const { model, filter } = req.body
    try {
        const fetch = await models[model].find(filter);
        res.status(200).send(fetch);
    } catch (err) {
        console.log("main-route-getData-catch ", err);
        res.status(500).send();
    }
})

//set
router.post("/main/newRecord/:model", upload.single("Proof"), async (req, res) => {
    try {
        const model = req.params.model

        const data = JSON.parse(JSON.stringify(req.body));
        const proof = data.getproof
        let SendData = null;
        const isfile = req.file;
        if (isfile) {
            var up = req.file.filename
        }

        SendData = data

        var withUpData = up ? Object.assign(SendData, { [proof]: up }) : SendData;
        const obj = new models[model](withUpData);
        await obj.save();
        res.status(201).send("Entry Succeed")
    }
    catch (err) {
        console.log("main-route-newRecord-catch", err)
        res.status(500).send()
    }
});

//reset
router.post('/main/editRecord/:model', upload.single('Proof'), async (req, res) => {
    try {
        const model = req.params.model
        const data = JSON.parse(JSON.stringify(req.body));
        const { folder, getproof: proof } = data
        let SendData = null;
        const { id } = data
        const isfile = req.file;
        if (isfile) {
            var up = req.file.filename
        }
        SendData = data

        var alldata = null

        if (up) {
            alldata = Object.assign(SendData, { [proof]: up })
            const previousData = await models[model].findOne({ _id: id })
            const previousProof = await previousData?.[proof]
            unlink(folder, previousProof)
        }
        else {
            alldata = SendData
        }
        await models[model].findOneAndUpdate({ _id: id }, alldata)
        res.status(200).send("Edited Successfully")
    } catch (e) {
        console.log("main-route-editRecord-catch", e.message)
        res.status(500).send({ massage: e.massage });
    }
})

//remove
router.post('/main/deleteRecord', async (req, res) => {
    const { model, id, folder, getproof } = req.body
    try {
        const record = await models[model].findOne({ _id: id });
        await models[model].deleteOne({ _id: id })
        const filename = record[getproof];
        unlink(folder, filename)

        res.status(200).send("Entry Deleted Successfully");
    }
    catch (e) {
        console.log("main-route-deleteRecord-catch", e.message)
        res.status(500).send({ massage: e.massage });
    }
})


const unlink = (folder, filename) => {
    const link = path.join(__dirname, `../../uploads/${folder}-uploads/${filename}`);
    fs.unlink(link, function (err) {
        if (err) {
            console.error("main-route-deleteRecord-unlink", err);
        }
    });
}

module.exports = { router, models, unlink };