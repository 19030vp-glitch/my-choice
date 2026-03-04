const fs = require("fs")
const path = require('path');
const IncubationDetails = require('../../models/iil-models/iilIncubationDetails')
const ScopusWebOfScience = require('../../models/iil-models/iilScopusWebOfScience')
const IilCollaborativeActivities = require('../../models/iil-models/iilCollaborativeActivitiesSchema')
const IilRevenueConsultancy = require('../../models/iil-models/iilRevenueConsultancySchema')
const IilRevenueCorporateTraining = require('../../models/iil-models/iilRevenueCorporateTrainingSchema')
const { multerConfig } = require('../../utility/multerConfig')
const models = { IncubationDetails, ScopusWebOfScience, IilCollaborativeActivities, IilRevenueConsultancy, IilRevenueCorporateTraining }
function iilRoutes(app) {


    const iiLUpload = multerConfig(`../uploads/iil-uploads`)


    // add iil data in any iil model
    app.post('/iil/addData', async (req, res) => {
        try {
            const { model, dataToAppend, filter } = req.body;
            await models[model].findOneAndUpdate(filter, dataToAppend, { upsert: true, new: true });
            res.send({ status: 'success' })
        } catch (error) {
            console.log(error)
            res.send({ status: 'error' })
        }
    })

    // retrive iil data from any iil model
    app.post('/iil/getData', async (req, res) => {
        try {
            const { model, filter } = req.body;
            const data = await models[model].findOne(filter).lean()
            console.log(data)
            if (data) {
                res.send({ status: 'success', data })
            } else {
                res.send({ status: 'error' })
            }
        } catch (error) {
            console.log(error)
            res.send({ status: 'error' })

        }
    })

    //iil new rouetes
    //get
    app.post('/iil2/getData', async (req, res) => {
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
    app.post("/iil2/newRecord/:model", iiLUpload.single("Proof"), async (req, res) => {
        try {
            const model = req.params.model
            const data = JSON.parse(JSON.stringify(req.body));

            const isFile = req.file
            if (isFile) {
                var up = req.file.filename;
            }

            if (up) {
                var withUpData = Object.assign(data, { Proof: up })
            }
            else {
                var withUpData = data
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
    app.post('/iil2/editRecord/:model', iiLUpload.single("Proof"), async (req, res) => {
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
            alldata = Object.assign(SendData, { Proof: up })
        }
        else {
            alldata = SendData
        }
        await models[model].findOneAndUpdate({ _id: id }, alldata)
        res.status(200).send("Edited Successfully")
    })

    //remove
    app.post('/iil2/deleteRecord', async (req, res) => {
        const { model, id } = req.body
        try {
            const Record = await models[model].findOne({ _id: id });
            await models[model].deleteOne({ _id: id })
            const Filename = Record.Proof;
            console.log(Filename);
            const link = path.join(__dirname, `../../uploads/iil-uploads/${Filename}`);
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
}

module.exports = { iilRoutes, models }