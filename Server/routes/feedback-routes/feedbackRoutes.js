const StudentFeedback = require('../../models/feedback-models/studentFeedbackModel')
const TeacherFeedback = require('../../models/feedback-models/teacherFeedbackModel')
const AlumniFeedback = require('../../models/feedback-models/alumniFeedbackModel')
const ParentFeedback = require('../../models/feedback-models/parentFeedbackModel')
const EmployerFeedback = require('../../models/feedback-models/employerFeedbackModel')
const ExpertFeedback = require('../../models/feedback-models/expertFeedbackModel')
const StudentSatisfactionSurvey = require('../../models/feedback-models/feedbackStudentSatisfactionSurvey')
const UMPSCFeedback = require('../../models/skilldevelopment-models/umpscFeedback')

const feedbackModels = { StudentFeedback, TeacherFeedback, AlumniFeedback, ParentFeedback, EmployerFeedback, ExpertFeedback, UMPSCFeedback }

function studentFeedbackRoutes(app) {

    app.post('/feedback/studentFeedback/collectResponse', (req, res) => {
        // collecting the response here

        const { response, academicYear, schoolName } = req.body;
        const studentFeedback = new StudentFeedback({ academicYear, schoolName, response: JSON.stringify(response) });
        studentFeedback.save().then((savedFeedback) => {
            if (savedFeedback) {
                res.send({ status: 'success', message: 'Feedback submitted successfully' })
            }
            else {
                res.send({ status: 'error', message: 'Could not save the form...' })
            }
        })

    })

    app.post('/feedback/teacherFeedback/collectResponse', (req, res) => {
        // collecting the response here

        const { response, academicYear, schoolName } = req.body;
        const teacherFeedback = new TeacherFeedback({ academicYear, schoolName, response: JSON.stringify(response) });
        teacherFeedback.save().then((savedFeedback) => {
            if (savedFeedback) {
                res.send({ status: 'success', message: 'Feedback submitted successfully' })
            }
            else {
                res.send({ status: 'error', message: 'Could not save the form...' })
            }
        })

    })

    app.post('/feedback/alumniFeedback/collectResponse', (req, res) => {
        // collecting the response here

        const { response, academicYear, schoolName } = req.body;
        const alumniFeedback = new AlumniFeedback({ academicYear, schoolName, response: JSON.stringify(response) });
        alumniFeedback.save().then((savedFeedback) => {
            if (savedFeedback) {
                res.send({ status: 'success', message: 'Feedback submitted successfully' })
            }
            else {
                res.send({ status: 'error', message: 'Could not save the form...' })
            }
        })

    })

    app.post('/feedback/parentFeedback/collectResponse', (req, res) => {
        // collecting the response here

        const { response, academicYear, schoolName } = req.body;
        const parentFeedback = new ParentFeedback({ academicYear, schoolName, response: JSON.stringify(response) });
        parentFeedback.save().then((savedFeedback) => {
            if (savedFeedback) {
                res.send({ status: 'success', message: 'Feedback submitted successfully' })
            }
            else {
                res.send({ status: 'error', message: 'Could not save the form...' })
            }
        })

    })

    app.post('/feedback/employerFeedback/collectResponse', (req, res) => {
        // collecting the response here

        const { response, academicYear, schoolName } = req.body;
        const employerFeedback = new EmployerFeedback({ academicYear, schoolName, response: JSON.stringify(response) });
        employerFeedback.save().then((savedFeedback) => {
            if (savedFeedback) {
                res.send({ status: 'success', message: 'Feedback submitted successfully' })
            }
            else {
                res.send({ status: 'error', message: 'Could not save the form...' })
            }
        })

    })

    app.post('/feedback/expertFeedback/collectResponse', (req, res) => {
        // collecting the response here

        const { response, academicYear, schoolName } = req.body;
        const expertFeedback = new ExpertFeedback({ academicYear, schoolName, response: JSON.stringify(response) });
        expertFeedback.save().then((savedFeedback) => {
            if (savedFeedback) {
                res.send({ status: 'success', message: 'Feedback submitted successfully' })
            }
            else {
                res.send({ status: 'error', message: 'Could not save the form...' })
            }
        })

    })

    app.post('/survey/student-satisfaction-survey', (req, res) => {

        const { response, academicYear, schoolName } = req.body;
        const survey = new StudentSatisfactionSurvey({ academicYear, schoolName, response: JSON.stringify(response) });
        survey.save().then((savedFeedback) => {
            if (savedFeedback) {
                res.send({ status: 'success', message: 'Feedback submitted successfully' })
            }
            else {
                res.send({ status: 'error', message: 'Could not save the form...' })
            }
        })

    })

    app.post('/feedback/umpsc-feedback', (req, res) => {

        const { response, academicYear } = req.body;
        const survey = new UMPSCFeedback({ academicYear, response: JSON.stringify(response) });
        survey.save().then((savedFeedback) => {
            if (savedFeedback) {
                res.send({ status: 'success', message: 'Feedback submitted successfully' })
            }
            else {
                res.send({ status: 'error', message: 'Could not save the form...' })
            }
        })

    })


}

module.exports = { studentFeedbackRoutes, feedbackModels }
