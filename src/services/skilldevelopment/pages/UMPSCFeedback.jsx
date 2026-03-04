import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import QuestionHandler from '../../feedback/components/QuestionHandler';
import FeedbackHome from '../../feedback/components/FeedbackHome';
import GreetParagraph from '../../feedback/components/GreetParagraph';
import ActionButtons from '../../feedback/components/ActionButtons';
import siteLinks from '../../../components/siteLinks';
import validateForm from '../../feedback/js/validateAndSubmit';
import title from '../../../js/title';
import Header from '../../feedback/components/Header';
import handleUMPSCFeedback from '../js/UMPSCFeedback';
import { academicYearGenerator } from '../../../inputs/Year';

const UMPSCFeedback = () => {

    title(siteLinks.skillUMPSCFeedback.title)

    const [formData, setFormData] = useState({})
    const [academicYear, setAcademicYear] = useState(null)
    const [schoolName, setSchoolName] = useState('donotshow')

    const [shouldUpdate, setShouldUpdate] = useState(false)
    const [loading, setLoading] = useState(false)
    const localStorageTitle = `UMPSCFeedback-FormData-${academicYear}`

    useEffect(() => {
        shouldUpdate && localStorage.setItem(localStorageTitle, JSON.stringify(formData))
    }, [formData])

    useEffect(() => {
        setFormData(JSON.parse(localStorage.getItem(localStorageTitle)) ? JSON.parse(localStorage.getItem(localStorageTitle)) : {})
        setShouldUpdate(true)
    }, [academicYear])

    const navigate = useNavigate()

    const [activeStep, setActiveStep] = useState(0);
    const links = [siteLinks.welcome, siteLinks.skillUMPSCFeedback]

    const handleSubmit = () => {
        handleUMPSCFeedback(setLoading, formData, academicYear, setActiveStep, localStorageTitle)
    }


    return (
        <div>
            <FeedbackHome userType="UPSC MPSC Foundation Course Feedback" academicYear={academicYear} setAcademicYear={setAcademicYear} schoolName={schoolName} setActiveStep={setActiveStep} activeStep={activeStep} links={links} customYears={academicYearGenerator(2, null, true)} >

                <div className='w-full md:flex items-center justify-center mt-4'>


                    <div className='lg:w-3/5 sm:w-full md:w-4/5'>


                        <div className='w-full'>
                            <Header title="UPSC MPSC Foundation Course Feedback" academicYear={academicYear} />

                            <div className='mt-3'>
                                <GreetParagraph userType="upmsc" />
                            </div>

                            <form onSubmit={(e) => { e.preventDefault(); validateForm(surveyQuestions, setLoading, 'UMPSC', formData, setFormData, { academicYear }, navigate, setActiveStep, handleSubmit) }} className='w-full mt-5'>

                                <div id="part-1" >
                                    {
                                        surveyQuestions.map((question) => {
                                            return <QuestionHandler question={question} formData={formData} setFormData={setFormData} />
                                        })
                                    }
                                </div>

                                <br /><br /><br /><br />

                                <ActionButtons loading={loading} setFormData={setFormData} academicYear={academicYear} responseType="alumniFeedback" />

                            </form>
                        </div>

                    </div>
                </div >

            </FeedbackHome>


        </div>
    )
}

export default UMPSCFeedback

const surveyQuestions = [

    {
        type: 'text',
        required: true,
        question: "Name of the Student (विद्यार्थ्याचे नाव)",
    },
    {
        type: 'text',
        required: true,
        question: "Student's Whatsapp Mobile Number (विद्यार्थ्याचा व्हॉट्स-ऍप मोबाईल नंबर)"
    },
    {
        type: 'text',
        required: true,
        question: "Student's E-mail ID (विद्यार्थ्याचा मेल आय.डी.)"
    },
    {
        type: 'text',
        required: true,
        question: 'In which district do you live? (तुम्ही कोणत्या जिल्ह्यात राहता?)',
    },
    {
        type: 'radio',
        required: false,
        question: 'Do all the classes begin and complete on time as per the given schedule? (दिलेल्या वेळापत्रकाप्रमाणे सर्व तासिका वेळेवर सुरू व समाप्त होतात का?)',
        options: ["Yes", "No"]
    },
    {
        type: 'radio',
        required: true,
        question: 'Is coverage of syllabus as per the given circular? (दिलेल्या परिपत्रकानुसार अभ्यासक्रम शिकविला जात आहे का?)',
        options: ["Yes", "No"]

    },
    {
        type: 'radio',
        required: true,
        question: 'Have you observed any improvements in your knowledge since joining the course? (सदर कोर्सला प्रवेश घेतल्यापासून तुम्ही तुमच्या ज्ञानात काही सुधारणा झाल्याचे निरीक्षण नोंदविले आहे का?)',
        options: ["Yes", "No"]

    },
    {
        type: 'radio',
        required: true,
        question: 'How would you rate the overall course on scale of 1 to 5? 1 Lowest, 5 Highest (तुम्ही सदर अभ्यासक्रमास किती गुण द्याल? (सर्वात कमी १ तर सर्वोच्च ५ गुण)) ',
        options: ["1", "2", "3", "4", "5"]

    },
]

export { surveyQuestions }
