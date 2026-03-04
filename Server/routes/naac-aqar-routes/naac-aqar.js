const router = require('express').Router()
const AQARMatter = require('../../models/aqar-models/aqarMatter')
const AQARTextInfo = require('../../models/aqar-models/aqarTextInfoModel')
const AQARRadioInfo = require('../../models/aqar-models/aqarRadioInfoModel')

router.post('/aqar/fetchAQARMatter', async (req, res) => {
    try {
        const { filter, isMultiple } = req.body

        const doc = await AQARMatter.find(filter)
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

router.post('/aqar/fetchAQARTextInfo', async (req, res) => {
    try {
        const { filter, isMultiple } = req.body

        const doc = await AQARTextInfo.find(filter)
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

router.post('/aqar/fetchAQARRadioInfo', async (req, res) => {
    try {
        const { filter, isMultiple } = req.body

        const doc = await AQARRadioInfo.find(filter)
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


router.post('/aqar/saveAQARRadioInfo', (req, res) => {
    try {
        const { formData } = req.body
        const filter = { academicYear: formData.academicYear, radioId: formData.radioId, school: formData.school || null }

        AQARRadioInfo.findOneAndUpdate(filter, formData, { upsert: true, new: true }, (err, updatedDocument) => {
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

router.post('/aqar/saveAQARMatter', (req, res) => {
    try {
        const { formData } = req.body
        const filter = { academicYear: formData.academicYear, userType: formData.userType, matterType: formData.matterType, school: formData.school || null }

        AQARMatter.findOneAndUpdate(filter, formData, { upsert: true, new: true }, (err, updatedDocument) => {
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

router.post('/aqar/saveAQARTextInfo', (req, res) => {
    try {
        const { formData } = req.body
        const filter = { academicYear: formData.academicYear, tableId: formData.tableId, school: formData.school || null }

        AQARTextInfo.findOneAndUpdate(filter, formData, { upsert: true, new: true }, (err, updatedDocument) => {
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

module.exports = router