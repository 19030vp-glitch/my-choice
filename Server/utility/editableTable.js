const { models } = require("../routes/faculty-routes/routes")
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        // Get the dynamic destination folder from req.body
        const uploadPath = req.body.uploadPath; // Access it directly from req.body
        console.log('Upload Path: ', uploadPath);
        const dynamicDestination = path.join(__dirname, uploadPath || null);
        console.log(`Uploading ${dynamicDestination}`)
        callback(null, dynamicDestination);
    },
    filename: (req, file, callback) => {
        // Generate a unique filename or use the original filename.
        callback(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({ storage: storage });


function editableTableOperations(app) {


    app.post('/api/upsertRecord/:model', upload.single('file'), async (req, res) => {
        const data = JSON.parse(JSON.stringify(req.body))
        const model = req.params.model

        console.log('Data :', data)

        try {
            if (Boolean(data?.isNew) && data?.isNew !== 'undefined') {
                const { _id, ...dataWithoutId } = data;
                await new models[model](
                    { ...dataWithoutId, proof: req.file ? req.file.filename : null }
                ).save();
                res.send({ status: 'success', message: 'Record added successfully' })
            } else {
                await models[model].findOneAndUpdate({ _id: data?._id }, { ...data, proof: req.file ? req.file.filename : data.proof })
                res.send({ status: 'success', message: 'Record updated successfully' })
            }

        } catch (error) {
            console.log(error)
            res.send({ status: 'error' })
        }

    })


}

module.exports = editableTableOperations