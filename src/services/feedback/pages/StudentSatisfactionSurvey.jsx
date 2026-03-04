import React, { useState } from 'react'
import QuestionHandler from '../components/QuestionHandler'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import GoBack from '../../../components/GoBack'
import validateForm from '../js/validateAndSubmit';
import ActionButtons from '../components/ActionButtons';
import Header from '../components/Header'
import FeedbackHome from '../components/FeedbackHome'
import siteLinks from '../../../components/siteLinks'
import title from '../../../js/title'
import GreetParagraph from '../components/GreetParagraph'
import handleSurveySubmit from '../js/handleSurveySubmit'

const StudentSatisfactionSurvey = () => {

    title(siteLinks.studentSatisfactionSurvey.title)

    const [formData, setFormData] = useState({})
    const [academicYear, setAcademicYear] = useState(null)
    const [schoolName, setSchoolName] = useState(null)

    const [shouldUpdate, setShouldUpdate] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        shouldUpdate && localStorage.setItem(`StudentSatisfactionSurvey-FormData-${academicYear}-${schoolName}`, JSON.stringify(formData))
    }, [formData])

    useEffect(() => {
        setFormData(JSON.parse(localStorage.getItem(`StudentSatisfactionSurvey-FormData-${academicYear}-${schoolName}`)) ? JSON.parse(localStorage.getItem(`StudentSatisfactionSurvey-FormData-${academicYear}-${schoolName}`)) : {})
        setShouldUpdate(true)
    }, [schoolName, academicYear])

    const navigate = useNavigate()

    const [activeStep, setActiveStep] = useState(0);
    const links = [siteLinks.welcome, siteLinks.studentSatisfactionSurvey]

    const handleSubmit = () => {
        handleSurveySubmit(setLoading, formData, schoolName, academicYear, setActiveStep)
    }


    return (
        <div>
            <FeedbackHome userType="Student Satisfaction Survey" setSchoolName={setSchoolName} schoolName={schoolName} academicYear={academicYear} setAcademicYear={setAcademicYear} setActiveStep={setActiveStep} activeStep={activeStep} links={links} >

                <div className='w-full md:flex items-center justify-center mt-4'>


                    <div className='lg:w-3/5 sm:w-full md:w-4/5'>


                        <div className='w-full'>
                            <Header title='Student Satisfaction Survey' academicYear={academicYear} schoolName={schoolName} />

                            <div className='mt-3'>
                                <GreetParagraph userType="studentSurvey" />
                            </div>

                            <form onSubmit={(e) => { e.preventDefault(); validateForm(surveyQuestions, setLoading, 'alumniFeedback', formData, setFormData, { academicYear, schoolName }, navigate, setActiveStep, handleSubmit) }} className='w-full mt-5'>

                                <div id="part-1" >
                                    {
                                        surveyQuestions.map((question) => {
                                            return <QuestionHandler question={question} formData={formData} setFormData={setFormData} />
                                        })
                                    }
                                </div>

                                <br /><br /><br /><br />

                                <ActionButtons loading={loading} setFormData={setFormData} academicYear={academicYear} schoolName={schoolName} responseType="alumniFeedback" />

                            </form>
                        </div>

                    </div>
                </div >

            </FeedbackHome>


        </div>
    )
}

export default StudentSatisfactionSurvey

const surveyQuestions = [

    {
        type: 'text',
        required: true,
        question: 'Email',
    },
    {
        type: 'radio',
        required: true,
        question: 'Please confirm this is the first and only time you answer this survey.',
        options: ["Yes", "No"],
    },
    {
        type: 'text',
        required: true,
        question: 'Age',
    },
    {
        type: 'text',
        required: false,
        question: 'Mobile number',
    },
    {
        type: 'radio',
        required: true,
        question: 'Gender',
        options: ['Male', 'Female', 'Other']

    },
    {
        type: 'radio',
        required: true,
        question: 'What degree program are you pursuing?',
        options: ["Bachelor's", "Master’s", "M. Phil.", "Doctorate", "Diploma", "Vocational"]

    },
    {
        type: 'radio',
        required: true,
        question: 'What subject area are you currently pursuing?',
        options: ["Arts", "Commerce", "Science and Technology", "Interdisciplinary"]

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
        options: ["Always fair", "Usually fair", "Sometimes unfair", "Usually unfair", "Unfair"]

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
        options: ["Regularly", "Often", "Sometimes", "Rarely", "Never"]
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
        options: ["Strongly agree", "Agree", "Neutral", "Disagree", "Strongly disagree"]
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
        options: ["Fully", "Reasonably", "Partially", "Slightly", "Unable to"]

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
        options: ["To a great extent", "Moderate", "Somewhat", "Very little", "Not at all"]
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
        options: ["To a great extent", "Moderate", "Somewhat", "Very little", "Not at all"]
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
        options: ["To a great extent", "Moderate", "Somewhat", "Very little", "Not at all"]
    },
    {
        type: 'text',
        required: false,
        question: 'Give three observation / suggestions to improve the overall teaching – learning experience in your institution.',
    },

]

export { surveyQuestions }
