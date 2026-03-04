const express = require('express');
const { models } = require('../routes/admin-routes/admin-routes');
const ValidityCheck = require('../models/faculty-models/validityCheck')
const { checkValidDataForModel } = require('./validityFunction');
const validityCheck = require('../models/faculty-models/validityCheck');
const router = express.Router()

const yearFilter = { year: { $in: ["2021-22", "2022-23", "2023-24", "2024-25"] } }

const modelsToCheck = [
    { title: 'ResearchPaper', modelName: 'ResearchPaper', model: models.ResearchPaper, modelFilter: yearFilter },
    { title: 'ResearchProject', modelName: 'ResearchProject', model: models.ResearchProject, modelFilter: yearFilter },
    { title: 'ResearchGuidance', modelName: 'PhdAwarded', model: models.PhdAwarded, modelFilter: { degreeName: { '$ne': 'PG Dissertation' }, ...yearFilter } },
    { title: 'PGDessertation', modelName: 'PhdAwarded', model: models.PhdAwarded, modelFilter: { degreeName: 'PG Dissertation' }, ...yearFilter },
    { title: 'EContentDeveloped', modelName: 'EContentDeveloped', model: models.EContentDeveloped, modelFilter: yearFilter },
    { title: 'ConferencesSemiWorkshopOrganized', modelName: 'ConferencesSemiWorkshopOrganized', model: models.ConferencesSemiWorkshopOrganized, modelFilter: { Year: yearFilter.year } },
    { title: 'Lectures', modelName: 'Lectures', model: models.Lectures, modelFilter: yearFilter },
    { title: 'JrfSrf', modelName: 'JrfSrf', model: models.JrfSrf, modelFilter: yearFilter },
    { title: 'InvitedTalk', modelName: 'InvitedTalk', model: models.InvitedTalk, modelFilter: yearFilter },
    { title: 'Responsibilities', modelName: 'Responsibilities', model: models.Responsibilities, modelFilter: {} },
    { title: 'PostHeld', modelName: 'PostHeld', model: models.PostHeld, modelFilter: {} },
    { title: 'Qualification', modelName: 'Qualification', model: models.Qualification, modelFilter: {} },
    { title: 'Degree', modelName: 'Degree', model: models.Degree, modelFilter: {} },
    { title: 'AppointmentsHeldPrior', modelName: 'AppointmentsHeldPrior', model: models.AppointmentsHeldPrior, modelFilter: {} },
    { title: 'Online', modelName: 'Online', model: models.Online, modelFilter: yearFilter },
    { title: 'FinancialSupport', modelName: 'FinancialSupport', model: models.FinancialSupport, modelFilter: yearFilter },
    { title: 'Patent', modelName: 'Patent', model: models.Patent, modelFilter: {} },
    { title: 'ConsultancyServices', modelName: 'ConsultancyServices', model: models.ConsultancyServices, modelFilter: yearFilter },
    { title: 'Collaboration', modelName: 'Collaboration', model: models.Collaboration, modelFilter: {} },
    { title: 'AwardRecognition', modelName: 'AwardRecognition', model: models.AwardRecognition, modelFilter: {} },
    { title: 'Fellowship', modelName: 'Fellowship', model: models.Fellowship, modelFilter: {} },
    { title: 'PolicyDocuments', modelName: 'PolicyDocuments', model: models.PolicyDocuments, modelFilter: {} },
    { title: 'ForeignVisit', modelName: 'ForeignVisit', model: models.ForeignVisit, modelFilter: {} },
    { title: 'PublicationCitation', modelName: 'PublicationCitation', model: models.PublicationCitation, modelFilter: { year: { $in: ["2021-22", "2022-23", "2023-24"] } } },
]



router.post('/validity/checkValidity', async (req, res) => {
    const { tableHeads, filter, checkForCustomModel } = req.body;
    if (!filter || !filter.userId) {
        res.send({ status: 'error', error: 'Invalid User' });
        return;
    }

    try {
        let validityDoc = await ValidityCheck.findOne({ userId: filter.userId }).lean()



        // all check first
        if (!validityDoc) {
            for (const model of modelsToCheck) {
                if (!validityDoc?.[model.title]) {
                    const result = await checkValidDataForModel(model.title, model.modelName, model.model, tableHeads[model.title], { ...filter, ...model.modelFilter });

                    validityDoc = await ValidityCheck.findOneAndUpdate({ userId: filter.userId }, { $set: { [model.title]: result.isValid } }, { upsert: true, new: true }).lean()
                }
            }
        }

        checkAllValid(validityDoc)



        // optimized check after doc exists
        if (checkForCustomModel) {

            const model = modelsToCheck[modelsToCheck.findIndex(model => model.title === checkForCustomModel)];

            if (!validityDoc?.[model.title]) {
                const result = await checkValidDataForModel(model.title, model.modelName, model.model, tableHeads[model.title], { ...filter, ...model.modelFilter });

                if (!result.isValid) {
                    res.send({ status: 'success', result: { ...result, model: model.title, tablesToCheck: validityDoc } });
                    return
                } else {

                    // Update validity flags if data is valid
                    let newValidDoc = await ValidityCheck.findOneAndUpdate({ userId: filter.userId }, { $set: { [model.title]: true } }, { upsert: true, new: true },);

                    checkAllValid(newValidDoc)

                    res.send({ status: 'success', result: { ...result, model: model.title, tablesToCheck: { ...validityDoc, [model.title]: true }, message: `${model.title} data is completely valid.` } });

                    return
                }
            }
            await iterateAndValidate(validityDoc);
        }
        else {
            return await iterateAndValidate(validityDoc);
        }
    } catch (error) {
        res.send({ status: 'error', error });
    }


    function checkAllValid(validityDoc) {

        if (validityDoc) {
            let tables = [];
            Object.entries(validityDoc).forEach(([key, value]) => {
                if (!value && key !== "__v") {
                    tables.push(key)
                }
            })

            if (tables.length === 0) {
                return res.send({ status: "success", result: { isEverythingValid: true } })
            }
        }
    }


    async function iterateAndValidate(validityDoc) {


        for (const model of modelsToCheck) {
            if (!validityDoc?.[model.title]) {
                const result = await checkValidDataForModel(model.title, model.modelName, model.model, tableHeads[model.title], { ...filter, ...model.modelFilter });

                // create a validity document if it doesn't exist and send the document 
                if (!validityDoc) {
                    validityDoc = await new ValidityCheck({
                        userId: filter.userId,
                        [model.title]: result.isValid
                    }).save()
                }

                if (!result.isValid) {

                    if (validityDoc) {
                        res.send({ status: 'success', result: { ...result, model: model.title, tablesToCheck: validityDoc } });
                        return
                    }

                }
                else {

                    let newValidDoc = await ValidityCheck.findOneAndUpdate({ userId: filter.userId }, { $set: { [model.title]: true } }, { upsert: true, new: true }).lean()

                    checkAllValid(newValidDoc, 'iterator message')
                }

            }
        }
    }
});



router.post('/validity/checkSchemaForDataValdity', async (req, res) => {

    try {
        const { filter } = req.body
        const doc = await validityCheck.findOne(filter)


        if (doc) {

            for (const model of modelsToCheck) {
                const title = model.title;
                if (!doc[title]) {
                    res.send({ isValid: false })
                    return
                }
            }

            res.send({ isValid: true })
        } else {
            res.send({ isValid: false })
        }
    } catch (error) {
        res.send({ isValid: 'error', message: 'Data validity checking has failed due to Internal Server Error, please try again later' })
    }

})





module.exports = router