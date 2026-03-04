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

const alumniQuestions = [

    {
        type: 'text',
        required: true,
        question: 'Email',
    },
    {
        type: 'text',
        required: true,
        question: 'Name of the Alumni',
    },
    {
        type: 'date',
        required: true,
        question: 'Duration from',
    },
    {
        type: 'date',
        required: true,
        question: 'Duration to',
    },
    {
        type: 'text',
        required: true,
        question: 'Contact Number',
    },
    {
        type: 'radio',
        required: true,
        question: 'The Course objectives & outcomes  were clearly defined / identified',
        options: ['Excellent', 'Good', 'Average', 'Below Average',]
    },
    {
        type: 'text',
        required: true,
        question: 'Any suggestions on course objectives and course outcomes',
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
        question: 'Would you suggest any courses to be introduced',
    },
    {
        type: 'text',
        required: true,
        question: 'Any other comments towards the  betterment of the curriculum',
    },

]


const AlumniFeedback = () => {

    title('Alumni Feedback')

    const [formData, setFormData] = useState({})
    const [academicYear, setAcademicYear] = useState(null)
    const [schoolName, setSchoolName] = useState(null)

    const [shouldUpdate, setShouldUpdate] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        shouldUpdate && localStorage.setItem(`alumniFeedback-FormData-${academicYear}-${schoolName}`, JSON.stringify(formData))
    }, [formData])

    useEffect(() => {
        setFormData(JSON.parse(localStorage.getItem(`alumniFeedback-FormData-${academicYear}-${schoolName}`)) ? JSON.parse(localStorage.getItem(`alumniFeedback-FormData-${academicYear}-${schoolName}`)) : {})
        setShouldUpdate(true)
    }, [schoolName, academicYear])

    const navigate = useNavigate()

    const [activeStep, setActiveStep] = useState(0);
    const links = [siteLinks.welcome, siteLinks.alumniFeedack]


    return (
        <div>
            <FeedbackHome userType="Alumni" academicYear={academicYear} setAcademicYear={setAcademicYear} schoolName={schoolName} setSchoolName={setSchoolName} setActiveStep={setActiveStep} activeStep={activeStep} links={links} >

                <div className='w-full md:flex items-center justify-center mt-4'>


                    <div className='lg:w-3/5 sm:w-full md:w-4/5'>


                        <div className='w-full'>
                            <Header title='Alumni Feedback Form' academicYear={academicYear} schoolName={schoolName} />

                            <div className='mt-3'>
                                <GreetParagraph userType="alumni" />
                            </div>

                            <form onSubmit={(e) => { e.preventDefault(); validateForm(alumniQuestions, setLoading, 'alumniFeedback', formData, setFormData, { academicYear, schoolName }, navigate, setActiveStep) }} className='w-full mt-5'>

                                <div id="part-1" >
                                    {
                                        alumniQuestions.map((question) => {
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

export default AlumniFeedback

export { alumniQuestions }