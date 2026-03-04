const ConstructionRenovationStatus = require('../../models/pm-usha-models/constructionRenovationStatusSchema');
const { multerConfig } = require('../../utility/multerConfig');
const { unlink } = require('../main-routes/main-routes')

const upload = multerConfig(`../uploads/usha-uploads/`)

function constructionRenovationStatusRoutes(app) {

    app.post('/api/pm-usha/getCRStatus', async (req, res) => {
        const { filter } = req.body
        const data = await ConstructionRenovationStatus.findOne(filter);

        if (data) {
            res.send(data)
        } else {
            res.send(null)
        }
    })

    app.post('/api/pm-usha/updateCRStatusAndOutcome', async (req, res) => {
        const { filter, data, fieldToUpdate, selectedInfra } = req.body

        const statusPercentage = data === "Not yet started" ? 0 : 100
        let savedDoc = null

        if (fieldToUpdate === 'status' && (data === "Completed" || data === "Not yet started")) {
            savedDoc = await ConstructionRenovationStatus.findOneAndUpdate(filter, { [fieldToUpdate]: data, title: selectedInfra.name, statusInPercentage: statusPercentage }, { new: true, upsert: true });
        } else {
            savedDoc = await ConstructionRenovationStatus.findOneAndUpdate(filter, { [fieldToUpdate]: data, title: selectedInfra.name }, { new: true, upsert: true });
        }



        if (savedDoc) {
            res.send({ status: 'success' })
        } else {
            res.send(null)
        }
    })



    const multerFields = [
        { name: "file-1", maxCount: 1 },
        { name: "file-2", maxCount: 1 },
        { name: "file-3", maxCount: 1 },
        { name: "file-4", maxCount: 1 },
        { name: "file-5", maxCount: 1 },
    ]

    app.post('/api/pm-usha/uploadCRPhotos', upload.fields(multerFields), async (req, res) => {
        const data = req.body
        const filter = JSON.parse(data.filter)
        const { photoField, title, status, statusInPercentage } = req.body

        if (!filter) {
            res.send({ status: 'error', message: 'Could not found the record.' })
        }


        try {
            const doc = await ConstructionRenovationStatus.findOne(filter)

            const photosToBeAdded = Object.values(req.files).map((photo) => {
                return photo[0].filename
            })

            if (doc) {
                const allPhotos = [...doc[photoField] || [], ...photosToBeAdded || []]
                doc[photoField] = allPhotos
                doc.status = status

                if (status === "Completed" || status === "Not yet started") {
                    if (status === "Completed") {
                        doc.statusInPercentage = '100'
                    } else {
                        doc.statusInPercentage = '0'
                    }
                } else {
                    doc.statusInPercentage = statusInPercentage
                }

                doc.save()
                return res.send({ status: 'success', message: "Photos uploaded successfully." })
            } else {
                const newDoc = new ConstructionRenovationStatus({
                    title, ...filter, [photoField]: [...photosToBeAdded || []]
                })

                await newDoc.save()
                return res.send({ status: 'success', message: "Photos uploaded successfully." })
            }

        } catch (error) {
            console.log('error in CR photo upload', error)
            return res.send({ status: 'error', message: 'Error occured while uploading photos' })
        }
    })


    app.post('/api/pm-usha/uploadCRLandPhotos', upload.single("file"), async (req, res) => {
        const data = req.body
        const filter = JSON.parse(data.filter)
        const { photoField, title, status, statusInPercentage } = req.body

        if (!filter) {
            res.send({ status: 'error', message: 'Could not found the record.' })
        }


        try {
            const doc = await ConstructionRenovationStatus.findOne(filter)
            const photoToBeAdded = req.file.filename

            if (doc) {
                const allPhotos = { ...doc["landPhotos"] || {}, [photoField]: photoToBeAdded }
                doc["landPhotos"] = allPhotos
                doc.status = status

                if (status === "Completed" || status === "Not yet started") {
                    if (status === "Completed") {
                        doc.statusInPercentage = '100'
                    } else {
                        doc.statusInPercentage = '0'
                    }
                } else {
                    doc.statusInPercentage = statusInPercentage
                }


                doc.save()
                return res.send({ status: 'success', message: "Photos uploaded successfully." })
            } else {
                const newDoc = new ConstructionRenovationStatus({
                    title, ...filter, landPhotos: { [photoField]: photoToBeAdded }
                })

                await newDoc.save()
                return res.send({ status: 'success', message: "Photos uploaded successfully." })
            }

        } catch (error) {
            console.log('error in CR photo upload', error)
            return res.send({ status: 'error', message: 'Error occured while uploading photos' })
        }
    })

    // delete photo route
    app.post('/api/pm-usha/deleteCRPhoto', async (req, res) => {
        const { filter, photoField, filename } = req.body;

        try {
            const doc = await ConstructionRenovationStatus.findOne(filter);

            if (!doc) {
                return res.send({ status: 'error', message: 'Could not found the record to delete photo' })
            }


            const oldPhotos = [...doc[photoField] || []];
            const updatedPhotos = oldPhotos.filter((photo) => photo !== filename);
            doc[photoField] = updatedPhotos;

            await doc.save()
            unlink('usha', filename)
            return res.send({ status: 'success', message: 'Photo deleted successfully' })
        } catch (error) {
            console.log('error in CR photo delete', error)
            return res.send({ status: 'error', message: 'Error occured while deleting photo' })
        }


    })


    app.post('/api/pm-usha/deleteCRLandPhoto', async (req, res) => {
        const { filter, photoField, filename } = req.body;

        try {
            const doc = await ConstructionRenovationStatus.findOne(filter);

            if (!doc) {
                return res.send({ status: 'error', message: 'Could not found the record to delete file' })
            }
            // delete the photoField from the doc object and save
            doc.landPhotos = { ...doc["landPhotos"], [photoField]: undefined };

            await doc.save()
            unlink('usha', filename)
            return res.send({ status: 'success', message: 'File deleted successfully' })
        } catch (error) {
            console.log('error in CR land file delete', error)
            return res.send({ status: 'error', message: 'Error occured while deleting file' })
        }


    })



}


module.exports = constructionRenovationStatusRoutes