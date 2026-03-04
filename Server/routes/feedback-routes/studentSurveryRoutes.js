const SSS = require('../../models/feedback-models/feedbackStudentSatisfactionSurvey');
const { SchoolsProgram } = require('../../utility/allschool');
const { pupetteerSetting } = require('../../utility/pupetteerSetting');
const generateChartDataForTeacher = require('./teacherAnalysis');

function studentSurveryRoutes(app) {

    app.post('/SSS/getNumericalData', async (req, res) => {
        const { filter, academicYearsToFetch } = req.body;
        const data = await SSS.find(filter).select("schoolName academicYear").lean()

        const schoolNames = Object.keys(SchoolsProgram)
        const academicYears = academicYearsToFetch

        // Initialize the result object
        const result = {};

        // Loop through each school name and academic year
        schoolNames.forEach((schoolName) => {
            result[schoolName] = {};
            academicYears.forEach((academicYear) => {
                // Count occurrences of the combination of schoolName and academicYear in the data
                const count = data.filter(
                    (item) => item.schoolName === schoolName && item.academicYear === academicYear
                ).length;
                // Store the count in the result object
                result[schoolName][academicYear] = count;
            });
        });


        res.send({ status: 'success', data: result })
    })

    app.post('/SSS/generateAnalytics', async (req, res) => {
        const { schoolName, academicYear } = req.body;
        const filter = { schoolName, academicYear }
        const docs = await SSS.find(filter).select("response")

        let reponses = docs.map((item) => {
            return JSON.parse(item.response)
        })

        const surveyQuestions = [

            {
                type: 'radio',
                required: true,
                question: 'Please confirm this is the first and only time you answer this survey.',
                options: ["Yes", "No"],
            },
            {
                type: 'radio',
                required: true,
                question: 'What degree program are you pursuing?',
                options: ["Bachelor's", "Master’s", "M. Phil.", "Doctorate", "Diploma", "Vocational"],
                show: 'Chart'
            },
            {
                type: 'radio',
                required: true,
                question: 'What subject area are you currently pursuing?',
                options: ["Arts", "Commerce", "Science and Technology", "Interdisciplinary"],
                show: 'Chart'
            },
            {
                type: 'radio',
                required: true,
                question: 'How much of the syllabus was covered in the class?',
                options: ["Below 30%", "30 to 54%", "55 to 69%", "70 to 84%", "85 to 100%"]

            },
            {
                type: 'radio',
                required: true,
                question: 'How well did the teachers prepare for the classes?',
                options: ["Thoroughly", "Satisfactorily", "Poorly", "Indifferently", "Won’t teach at all"]
            },
            {
                type: 'radio',
                required: true,
                question: 'How well were the teachers able to communicate?',
                options: ["Excellent", "Very good", "Good", "Fair", "Poor"]
            },
            {
                type: 'radio',
                required: true,
                question: 'Fairness of the internal evaluation process by the teachers.',
                options: ["Always fair", "Usually fair", "Sometimes unfair", "Usually unfair", "Unfair"],
                show: 'Chart'
            },
            {
                type: 'radio',
                required: true,
                question: 'Was your performance in assignments discussed with you?',
                options: ["Every time", "Usually", "Occasionally/Sometimes", "Rarely", "Never"]

            },
            {
                type: 'radio',
                required: true,
                question: 'The institute takes active interest in promoting internship, student exchange, field visit opportunities for students.',
                options: ["Regularly", "Often", "Sometimes", "Rarely", "Never"],
                show: 'Chart'
            },
            {
                type: 'radio',
                required: true,
                question: 'The teaching and mentoring process in your institution facilitates you in cognitive, social and emotional growth.',
                options: ["Significantly", "Very well", "Moderately", "Marginally", "Not at all"]
            },
            {
                type: 'radio',
                required: true,
                question: 'The institution provides multiple opportunities to learn and grow.',
                options: ["Strongly agree", "Agree", "Neutral", "Disagree", "Strongly disagree"],
                show: 'Chart'
            },
            {
                type: 'radio',
                required: true,
                question: 'Teachers inform you about your expected competencies, course outcomes and programme outcomes.',
                options: [" Every time", "Usually", "Occasionally/Sometimes", "Rarely", "Never"]
            },
            {
                type: 'radio',
                required: true,
                question: 'Your mentor does a necessary follow-up with an assigned task to you.',
                options: [" Every time", "Usually", "Occasionally/Sometimes", "Rarely", "Never"]

            },
            {
                type: 'radio',
                required: true,
                question: 'The teachers illustrate the concepts through examples and applications.',
                options: [" Every time", "Usually", "Occasionally/Sometimes", "Rarely", "Never"]

            },
            {
                type: 'radio',
                required: true,
                question: 'The teachers identify your strengths and encourage you with providing right level of challenges.',
                options: ["Fully", "Reasonably", "Partially", "Slightly", "Unable to"],
                show: 'Chart'
            },
            {
                type: 'radio',
                required: true,
                question: 'Teachers are able to identify your weaknesses and help you to overcome them.',
                options: [" Every time", "Usually", "Occasionally/Sometimes", "Rarely", "Never"]

            },
            {
                type: 'radio',
                required: true,
                question: 'The institution makes effort to engage students in the monitoring, review and continuous quality improvement of the teaching learning process.',
                options: ["Strongly agree", "Agree", "Neutral", "Disagree", "Strongly disagree"]
            },
            {
                type: 'radio',
                required: true,
                question: 'The institute/ teachers use student centric methods, such as experiential learning, participative learning and problem solving methodologies for enhancing learning experiences.',
                options: ["To a great extent", "Moderate", "Somewhat", "Very little", "Not at all"],
                show: 'Chart'
            },
            {
                type: 'radio',
                required: true,
                question: 'Teachers encourage you to participate in extracurricular activities.',
                options: ["Strongly agree", "Agree", "Neutral", "Disagree", "Strongly disagree"]
            },
            {
                type: 'radio',
                required: true,
                question: 'Efforts are made by the institute/ teachers to inculcate soft skills, life skills and employabilityskills to make you ready for the world of work.',
                options: ["To a great extent", "Moderate", "Somewhat", "Very little", "Not at all"],
                show: 'Chart'
            },
            {
                type: 'radio',
                required: true,
                question: 'What percentage of teachers use ICT tools such as LCD projector, Multimedia, etc. while teaching.',
                options: ["Above 90%", "70 – 89%", "50 – 69%", "30 – 49%", "Below 29%"]
            },
            {
                type: 'radio',
                required: true,
                question: 'The overall quality of teaching-learning process in your institute is very good.',
                options: ["To a great extent", "Moderate", "Somewhat", "Very little", "Not at all"],
                show: 'Chart'
            },
            {
                type: 'text',
                required: false,
                question: 'Give three observation / suggestions to improve the overall teaching – learning experience in your institution.',
            },

        ]

        generateChartDataForTeacher(reponses, surveyQuestions)
        res.send({ status: 'success', data: surveyQuestions })

    })

    app.post('/SSS/generatePDFReport', async (req, res) => {
        try {
            const { schoolName, academicYear } = req.body;
            const linkToNavigate = `${process.env.Report_Main_URL}/SSS/report/${schoolName}/${academicYear}`
            const fileName = `SSSReport-${schoolName}-${academicYear}-${new Date().getTime()}.pdf`
            await pupetteerSetting({ linkToNavigate, fileName })
            res.send({ status: 'generated', fileName })
        } catch (error) {
            console.log(error)
            res.send({ status: 'error', message: 'Could not generate SSS analysis report' })
        }
    })

    app.post('/SSS/getFeedbackData', async (req, res) => {
        try {
            const filter = req.body
            const data = await SSS.find(filter)
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send();
        }
    })
}

module.exports = studentSurveryRoutes

