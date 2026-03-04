const FeedbackModels = require('./feedbackRoutes').feedbackModels
const User = require('../../models/faculty-models/userModel')
const { SchoolsProgram } = require('../../utility/allschool');
const generateChartDataForStudent = require('./studentAnalysis');
const generateChartDataForTeacher = require('./teacherAnalysis');

function fetchFeedbackData(app) {


    app.post('/director/service/getFeedbackData', async (req, res) => {
        const { filter, feedbackUser } = req.body;

        let dashboardData = {}
        let Student = await FeedbackModels.StudentFeedback.find(filter).select("response")
        dashboardData.Student = Student
        dashboardData.StudentCount = Student.length
        let Teacher = await FeedbackModels.TeacherFeedback.find(filter).select("response")
        dashboardData.Teacher = Teacher
        dashboardData.TeacherCount = Teacher.length
        let Alumni = await FeedbackModels.AlumniFeedback.find(filter).select("response")
        dashboardData.Alumni = Alumni
        dashboardData.AlumniCount = Alumni.length
        let Parent = await FeedbackModels.ParentFeedback.find(filter).select("response")
        dashboardData.Parent = Parent
        dashboardData.ParentCount = Parent.length
        let Employer = await FeedbackModels.EmployerFeedback.find(filter).select("response")
        dashboardData.Employer = Employer
        dashboardData.EmployerCount = Employer.length
        let Expert = await FeedbackModels.ExpertFeedback.find(filter).select("response")
        dashboardData.Expert = Expert
        dashboardData.ExpertCount = Expert.length
        let Faculties = await User.find({department:filter.schoolName})
        dashboardData.Faculties = Faculties


        let analysis = {}

        if (feedbackUser === "Student") {

            let reponses = Student.map((item) => {
                return JSON.parse(item.response)
            })

            analysis["Student"] = generateChartDataForStudent(reponses)
        } else if (feedbackUser === "Teacher") {
            let reponses = Teacher.map((item) => {
                return JSON.parse(item.response)
            })

            const questions = [
                {
                    type: 'table',
                    required: true,
                    question: 'For each item please indicate your level of satisfaction with the following statement',
                    head: ['Strongly agree', 'Agree', 'Neither agree nor disagree', 'Disagree', 'Strongly disagree'],

                    cell: ['Syllabus is suitable to the course', 'Syllabus is need based', 'Objectives & outcome of the syllabi are well defined and clear to teachers and students.', 'Course content is followed by corresponding reference materials.', 'Sufficient number of prescribed books are available in the Library.', 'The course/syllabus has good balance between theory and application.', 'The course/syllabus has made me interested in the subject area.', 'The course/syllabus of this subject increased my knowledge and perspective in the subject area', 'The course/programme of studies carries sufficient number of optional papers.', 'The books prescribed/listed as reference materials are relevant, updated and appropriate', 'Infrastructural facilities, such as teacher’s rooms/carrels, class rooms, reading rooms and toilets are available in the Department.', 'Staff canteen is available at the faculty level.', 'Tests and examinations are conducted well in time with proper coverage of all units in the syllabus.', 'I have the freedom to propose, modify, suggest and incorporate new topics in the syllabus', 'I have the freedom to adopt new techniques/strategies of teaching such as seminar presentations, group discussions and learners’ participations.', 'I have the freedom to adopt/adapt new techniques/strategies of testing and assessment of students.', 'The environment in the department is conducive to teaching and research.', 'The administration is teacher friendly', 'The University provides adequate and smooth support for projects and research facilities.', 'The University provides adequate funding and support to faculty members for upgrading their skills and qualifications.', 'Provisions for professional development are non-discriminatory and fair.']
                },

                {
                    type: 'text',
                    required: true,
                    question: 'If you have other major comments to offer',
                }

            ]

            generateChartDataForTeacher(reponses, questions)

            analysis["Teacher"] = questions

        } else if (feedbackUser === "Alumni") {
            let reponses = Alumni.map((item) => {
                return JSON.parse(item.response)
            })

            const questions = [{
                type: 'radio',
                required: true,
                chartType: 'Chart',
                question: 'The Course objectives & outcomes  were clearly defined / identified',
                options: ['Excellent', 'Good', 'Average', 'Below Average',]
            },

            {
                type: 'radio',
                required: true,
                question: 'The books prescribed/listed as reference materials are relevant, updated and appropriate.',
                options: ['Excellent', 'Good', 'Average', 'Below Average',],
                show: 'Chart'

            },
            {
                type: 'radio',
                required: true,
                question: 'The program of studies carries sufficient number of elective(optional) papers.',
                options: ['Excellent', 'Good', 'Average', 'Below Average',]
            },
            {
                type: 'radio',
                required: true,
                question: 'Size / quantum of curriculum according to course duration',
                options: ['Excellent', 'Good', 'Average', 'Below Average',]
            },
            {
                type: 'radio',
                required: true,
                question: 'Weightage and usefulness of curriculum towards Research and Innovation',
                options: ['Excellent', 'Good', 'Average', 'Below Average',],
                show: 'Chart'
            },
            {
                type: 'radio',
                required: true,
                question: 'The program provides focus on skill Development /Employability/ Entrepreneurship',
                options: ['Excellent', 'Good', 'Average', 'Below Average',]
            },
            {
                type: 'text',
                required: true,
                question: 'Any suggestions on course objectives and course outcomes',
            },
            {
                type: 'text',
                required: true,
                question: 'Would you suggest any courses to be introduced',
            },
            {
                type: 'text',
                required: true,
                question: 'Any other comments towards the  betterment of the curriculum',
            },]

            generateChartDataForTeacher(reponses, questions)

            analysis["Alumni"] = questions

        } else if (feedbackUser === "Parent") {
            let reponses = Parent.map((item) => {
                return JSON.parse(item.response)
            })

            const questions = [
                {
                    type: 'radio',
                    required: true,
                    question: 'The books prescribed/listed as reference materials are relevant, updated and appropriate.',
                    options: ['Excellent', 'Good', 'Average', 'Below Average',]
                },
                {
                    type: 'radio',
                    required: true,
                    question: 'The program of studies carries sufficient number of elective(optional) papers.',
                    options: ['Excellent', 'Good', 'Average', 'Below Average',],
                    show: 'Chart'
                },
                {
                    type: 'radio',
                    required: true,
                    question: 'Size / quantum of curriculum according to course duration',
                    options: ['Excellent', 'Good', 'Average', 'Below Average',]
                },
                {
                    type: 'radio',
                    required: true,
                    question: 'Weightage and usefulness of curriculum towards Research and Innovation',
                    options: ['Excellent', 'Good', 'Average', 'Below Average',]
                },
                {
                    type: 'radio',
                    required: true,
                    question: 'The program provides focus on skill Development /Employability/ Entrepreneurship',
                    options: ['Excellent', 'Good', 'Average', 'Below Average',],
                    show: 'Chart'
                },
                {
                    type: 'text',
                    required: true,
                    question: 'Would you suggest any courses to be introduced',
                },
                {
                    type: 'text',
                    required: true,
                    question: 'Any suggestions on course objectives and course outcomes',
                },
                {
                    type: 'text',
                    required: true,
                    question: 'Any other comments towards the  betterment of the curriculum',
                }]

            generateChartDataForTeacher(reponses, questions)

            analysis["Parent"] = questions

        } else if (feedbackUser === "Employer") {
            let reponses = Employer.map((item) => {
                return JSON.parse(item.response)
            })

            const questions = [
                {
                    type: 'radio',
                    required: true,
                    question: 'The Course objectives & outcomes  were clearly defined / identified',
                    options: ['Excellent', 'Good', 'Average', 'Below Average',]
                },
                {
                    type: 'radio',
                    required: true,
                    question: 'The books prescribed/listed as reference materials are relevant, updated and appropriate.',
                    options: ['Excellent', 'Good', 'Average', 'Below Average',]
                },
                {
                    type: 'radio',
                    required: true,
                    question: 'The program of studies carries sufficient number of elective(optional) papers.',
                    options: ['Excellent', 'Good', 'Average', 'Below Average',]
                },
                {
                    type: 'radio',
                    required: true,
                    question: 'Size / quantum of curriculum according to course duration',
                    options: ['Excellent', 'Good', 'Average', 'Below Average',]
                },
                {
                    type: 'radio',
                    required: true,
                    question: 'Weightage and usefulness of curriculum towards Research and Innovation',
                    options: ['Excellent', 'Good', 'Average', 'Below Average',]
                },
                {
                    type: 'radio',
                    required: true,
                    question: 'The program provides focus on skill Development /Employability/ Entrepreneurship',
                    options: ['Excellent', 'Good', 'Average', 'Below Average',]
                },
                {
                    type: 'text',
                    required: true,
                    question: 'Any suggestions on course objectives and course outcomes',
                },
                {
                    type: 'text',
                    required: true,
                    question: 'Would you suggest any courses to be introduced',
                },
                {
                    type: 'text',
                    required: true,
                    question: 'Any other comments towards the  betterment of the curriculum',
                },
            ]

            generateChartDataForTeacher(reponses, questions)

            analysis["Employer"] = questions

        } else if (feedbackUser === "Expert") {
            let reponses = Expert.map((item) => {
                return JSON.parse(item.response)
            })

            const questions = [{
                type: 'radio',
                required: true,
                question: 'The Course objectives & outcomes  were clearly defined / identified',
                options: ['Excellent', 'Good', 'Average', 'Below Average',]
            },
            {
                type: 'radio',
                required: true,
                question: 'The books prescribed/listed as reference materials are relevant, updated and appropriate.',
                options: ['Excellent', 'Good', 'Average', 'Below Average',],
                show: 'Chart'
            },
            {
                type: 'radio',
                required: true,
                question: 'The program of studies carries sufficient number of elective(optional) papers.',
                options: ['Excellent', 'Good', 'Average', 'Below Average',]
            },
            {
                type: 'radio',
                required: true,
                question: 'Size / quantum of curriculum according to course duration',
                options: ['Excellent', 'Good', 'Average', 'Below Average',],
                show: 'Chart'
            },
            {
                type: 'radio',
                required: true,
                question: 'The Curriculum is need base and balanced',
                options: ['Excellent', 'Good', 'Average', 'Below Average',]
            },
            {
                type: 'radio',
                required: true,
                question: 'Curriculum is designed in view of  employability, Research and Innovation',
                options: ['Excellent', 'Good', 'Average', 'Below Average',],
                show: 'Chart'
            },
            {
                type: 'radio',
                required: true,
                question: 'The program provides focus on skill Development /Employability/ Entrepreneurship',
                options: ['Excellent', 'Good', 'Average', 'Below Average',]
            },
            {
                type: 'text',
                required: true,
                question: 'Any suggestions on course objectives and course outcomes',
            },
            {
                type: 'text',
                required: true,
                question: 'Would you suggest any courses to be introduced',
            },
            {
                type: 'text',
                required: true,
                question: 'Any other comments towards the  betterment of the curriculum',
            },]

            generateChartDataForTeacher(reponses, questions)

            analysis["Expert"] = questions

        }


        res.send({ message: 'success', data: { dashboardData, analysis } })


    })

    app.post('/director/service/getTotalFeedbackData', async (req, res) => {
        const { filter } = req.body;

        let dashboardData = {}
        dashboardData.Student = await FeedbackModels.StudentFeedback.find(filter).select("schoolName").lean()
        dashboardData.StudentCount = dashboardData.Student.length
        dashboardData.Teacher = await FeedbackModels.TeacherFeedback.find(filter).select("schoolName").lean()
        dashboardData.TeacherCount = dashboardData.Teacher.length
        dashboardData.Alumni = await FeedbackModels.AlumniFeedback.find(filter).select("schoolName").lean()
        dashboardData.AlumniCount = dashboardData.Alumni.length
        dashboardData.Parent = await FeedbackModels.ParentFeedback.find(filter).select("schoolName").lean()
        dashboardData.ParentCount = dashboardData.Parent.length
        dashboardData.Employer = await FeedbackModels.EmployerFeedback.find(filter).select("schoolName").lean()
        dashboardData.EmployerCount = dashboardData.Employer.length
        dashboardData.Expert = await FeedbackModels.ExpertFeedback.find(filter).select("schoolName").lean()
        dashboardData.ExpertCount = dashboardData.Expert.length


        let schoolNames = Object.keys(SchoolsProgram)



        const StudentsSchoolWise = dashboardData.Student.reduce((obj, item) => {
            if (schoolNames.includes(item.schoolName)) {
                if (obj[item.schoolName]) {
                    obj[item.schoolName] += 1;
                } else {
                    obj[item.schoolName] = 1;
                }
            }
            return obj;
        }, {});

        const TeachersSchoolWise = dashboardData.Teacher.reduce((obj, item) => {
            if (schoolNames.includes(item.schoolName)) {
                if (obj[item.schoolName]) {
                    obj[item.schoolName] += 1;
                } else {
                    obj[item.schoolName] = 1;
                }
            }
            return obj;
        }, {});

        const AlumniSchoolWise = dashboardData.Alumni.reduce((obj, item) => {
            if (schoolNames.includes(item.schoolName)) {
                if (obj[item.schoolName]) {
                    obj[item.schoolName] += 1;
                } else {
                    obj[item.schoolName] = 1;
                }
            }
            return obj;
        }, {});

        const ParentsSchoolWise = dashboardData.Parent.reduce((obj, item) => {
            if (schoolNames.includes(item.schoolName)) {
                if (obj[item.schoolName]) {
                    obj[item.schoolName] += 1;
                } else {
                    obj[item.schoolName] = 1;
                }
            }
            return obj;
        }, {});

        const EmployersSchoolWise = dashboardData.Employer.reduce((obj, item) => {
            if (schoolNames.includes(item.schoolName)) {
                if (obj[item.schoolName]) {
                    obj[item.schoolName] += 1;
                } else {
                    obj[item.schoolName] = 1;
                }
            }
            return obj;
        }, {});

        const ExpertsSchoolWise = dashboardData.Expert.reduce((obj, item) => {
            if (schoolNames.includes(item.schoolName)) {
                if (obj[item.schoolName]) {
                    obj[item.schoolName] += 1;
                } else {
                    obj[item.schoolName] = 1;
                }
            }
            return obj;
        }, {});


        res.send({ message: 'success', data: { StudentsSchoolWise, TeachersSchoolWise, AlumniSchoolWise, ParentsSchoolWise, EmployersSchoolWise, ExpertsSchoolWise, StudentCount: dashboardData.StudentCount, TeacherCount: dashboardData.TeacherCount, AlumniCount: dashboardData.AlumniCount, ParentCount: dashboardData.ParentCount, EmployerCount: dashboardData.EmployerCount, ExpertCount: dashboardData.ExpertCount } })


    })

}


module.exports = fetchFeedbackData