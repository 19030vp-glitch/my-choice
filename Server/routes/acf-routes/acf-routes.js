const ACFCollege = require('../../models/acf-college-models/acfCollege')


const acfRoutes = (app) => {

    app.post('/api/acf/submitAcademicYear', async (req, res) => {

        const { academicYear, filter } = req.body;
        const college = await ACFCollege.findOne(filter);

        if (college) {
            const isSubmitted = college.isSubmitted || [];
            college.isSubmitted = [...isSubmitted, academicYear]
            college.save();
            res.send({ status: 'success', message: `Details for ${academicYear} submitted successfully!` })
        } else {
            res.send({ status: 'error', message: 'College details not found!' })
        }

    })

    app.post('/api/acf/getACFDataForStatus', async (req, res) => {

        const ACFData = await ACFCollege.find();
        if (ACFData.length > 0) {
            res.send(ACFData)
        } else {
            res.send([])
        }

    })

}


module.exports = acfRoutes