const { multerConfig } = require('../../utility/multerConfig')
const upload = multerConfig(`../uploads/event-uploads/`)

const Event = require('../../models/event-model/event')

function event(app) {


    // 1. ADD or CREATE
    const arrayOfFields = [{ name: 'file1', maxCount: 1 }, { name: 'file2', maxCount: 1 }, { name: 'file3', maxCount: 1 }, { name: 'file4', maxCount: 1 }, { name: 'file5', maxCount: 1 }]
    app.post('/api/event/add', upload.fields(arrayOfFields), (req, res) => {

        try {
            const data = JSON.parse(JSON.stringify(req.body));
            const photos = []

            // creation of array 
            if (req.files) {

                for (let i = 1; i < 6; i++) {
                    if (req.files[`file${i}`]) {
                        photos.push({ file: req.files[`file${i}`][0].filename, caption: data[`caption${i}`] })
                    }
                }

            }

            // saving the event
            const newEvent = new Event({
                eventTitle: data.eventTitle,
                eventSummary: data.eventSummary,
                eventDuration: data.eventDuration,
                photos: photos,
                schoolName: 'School of Mathematical Sciences'
            })

            newEvent.save()

            res.send({ status: 'success' });
        } catch (error) {
            res.send({ status: 'error', message: 'Error occured while saving event' });

        }
    })

    // 2A. READ
    app.post('/api/event/getEvents', async (req, res) => {
        const { filter } = req.body
        const events = await Event.find(filter).lean().sort({ $natural: -1 })

        try {
            if (events.length > 0) {
                res.send({ status: 'success', data: events });
            } else {
                res.send({ status: 0, message: 'No events found' });
            }
        } catch (error) {
            res.send({ status: error, message: 'Something went wrong while fetching evnets' });
        }
    })

    // 2B. READ
    app.post('/api/event/singleEvent', async (req, res) => {
        const { filter } = req.body
        const events = await Event.findOne(filter).lean()

        try {
            if (events) {
                res.send({ status: 'success', data: events });
            } else {
                res.send({ status: 0, message: 'No events found' });
            }
        } catch (error) {
            res.send({ status: error, message: 'Something went wrong while fetching evnets' });
        }
    })
}

module.exports = event
