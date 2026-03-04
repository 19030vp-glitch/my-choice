const moment = require('moment');
const Program = require('../../models/program-models/program');
const { multerConfig } = require('../../utility/multerConfig');
const upload = multerConfig(`../uploads/program-uploads/`)

function programOperations(app) {

    app.post('/program/add', upload.single('pPhotoURL'), async (req, res) => {
        const formData = JSON.parse(JSON.stringify(req.body));
        try {
            const program = new Program({ ...formData, pPhotoURL: req.file.filename, finalRegistrationDate: moment(formData.finalRegistrationDate).format("DD MMMM YYYY"), programDate: moment(formData.programDate).format("DD MMMM YYYY") })
            await program.save()

            res.send({ status: 'success' })
        } catch (error) {
            console.log('Error:', error)
            res.send({ status: 'error' })
        }

    })

    app.post('/programs/fetch', async (req, res) => {
        const { filter, select, singleItem, shouldPopulate } = req.body
        let data;
        if (singleItem) {
            if (shouldPopulate) {
                data = await Program.findOne(filter).populate({
                    path: shouldPopulate,
                    options: { sort: { createdAt: -1 } }
                }).lean().exec()
            } else {
                data = await Program.findOne(filter).lean()
            }
        } else {
            data = await Program.find(filter).lean().sort({ createdAt: -1 }).select(select)
        }
        res.send({ data })
    })
}

module.exports = programOperations