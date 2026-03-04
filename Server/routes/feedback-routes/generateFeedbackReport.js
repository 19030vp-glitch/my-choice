const { pupetteerSetting } = require("../../utility/pupetteerSetting");

const generateFeedbackReport = (app) => {
    app.post('/feedback/generateReport', async (req, res) => {

        const { schoolName, feedbackUser, academicYear } = req.body;


        const linkToNavigate = `${process.env.Report_Main_URL}/feedback/generateFeedbackReport/${schoolName}/${feedbackUser}/${academicYear}`
        console.log("Feedback Report Links:", linkToNavigate)
        const fileName = `${feedbackUser}-FeedbackAnalysis-${schoolName}-${academicYear}-${new Date().getTime()}.pdf`

        try {
            await pupetteerSetting({ linkToNavigate, fileName })
            res.send({ status: 'success', fileName });

        } catch (error) {
            console.log(error)
            res.send({ status: 'error', message: 'Could not generate Analysis Report' })
        }


    })
}


module.exports = generateFeedbackReport