const UMPSCStudent = require('../../models/skilldevelopment-models/umpscStudents')

function umpscStudentsHandler(app) {
    app.post('/skill/umpsc-studentRegistration', async (req, res) => {
        const formData = req.body;

        try {
            const user = await UMPSCStudent.findOne({ email: formData.email })
            if (user) {
                res.send({ status: 'error', message: 'Student already exists with this email' })
                return
            }
            await new UMPSCStudent(formData).save()
            res.send({ status: 'success' })
        } catch (error) {
            res.send({ status: 'error' })
        }

    })
}


module.exports = umpscStudentsHandler