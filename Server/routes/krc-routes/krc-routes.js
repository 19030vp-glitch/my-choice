const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const multerConfig = require('../../utility/multerConfig').multerConfig

const SubscriptionForKRC = require("../../models/krc-models/subscriptionForKRCSchema")
const AQARSupportingDocuments = require("../../models/aqar-models/aqarSupportingDocuments")

const models = { SubscriptionForKRC }

const krcstorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const link = path.join(__dirname, `../../uploads/krc-uploads/`)
        cb(null, link)
    },
    filename: (req, file, cb) => {
        cb(null, `${new Date().getTime()}-${file.originalname}`)
    },
})
const krcUpload = multer({ storage: krcstorage })

const supportingDocsUpload = multerConfig(`../uploads/aqar-uploads/`, 'AQAR-SupportingDocument')


router.post('/aqar/uploadSupportingProof', supportingDocsUpload.single('file'), async (req, res) => {
    try {
        const formData = JSON.parse(JSON.stringify(req.body));
        const filter = { academicYear: formData.academicYear, userType: formData.userType, proofType: formData.proofType, school: formData.school || null }

        let dataToUpdate = {}

        if (req.file && req.file.filename) {
            dataToUpdate = { ...formData, proof: req.file.filename }
        } else {
            dataToUpdate = { ...formData }
        }

        console.log('Proof :', dataToUpdate)

        AQARSupportingDocuments.findOneAndUpdate(filter, dataToUpdate, { upsert: true, new: true }, (err, updatedDocument) => {
            if (err) {
                res.send({ status: 'error', message: err })
            } else {
                res.send({ status: 'success' })
            }
        })

    } catch (error) {
        console.log(error)
        res.send({ status: 'error', message: error.message })

    }

})


router.post('/aqar/fetchSupportingProof', async (req, res) => {
    try {
        const { filter, isMultiple } = req.body
        const doc = await AQARSupportingDocuments.find(filter)
        if (doc.length > 0) {
            res.send({ status: 'success', data: isMultiple ? doc : doc[0] })
        } else {
            res.send({ status: 'notfound' })
        }
    } catch (error) {
        console.log(error)
        res.send({ status: 'error', message: error.message })
    }

})

//get
router.post('/krc/getData', async (req, res) => {
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
router.post("/krc/newRecord/:model", krcUpload.single("Proof"), async (req, res) => {
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
router.post('/krc/editRecord/:model', krcUpload.single('Proof'), async (req, res) => {
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
router.post('/krc/deleteRecord', async (req, res) => {
    const { model, id } = req.body

    try {
        const Record = await models[model].findOne({ _id: id });
        await models[model].deleteOne({ _id: id })
        const Filename = Record.proof;
        const link = path.join(__dirname, `../../uploads/krc-uploads/${Filename}`);
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