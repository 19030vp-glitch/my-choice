import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import FeedbackHome from '../../feedback/components/FeedbackHome'
import Header from '../../feedback/components/Header'
import GreetParagraph from '../../feedback/components/GreetParagraph'
import QuestionHandler from '../../feedback/components/QuestionHandler'
import ActionButtons from '../../feedback/components/ActionButtons'
import title from '../../../js/title'
import siteLinks from '../../../components/siteLinks'
import validateForm from '../../feedback/js/validateAndSubmit'
import GoBack from '../../../components/GoBack'
import { fetchPrograms } from '../js/fetchPrograms'
import { useQuery } from 'react-query'
import UserLoading from '../../../pages/UserLoading'
import handleRegistration, { handleFeedback } from '../js/registrationHandler'

const ProgramFeedback = () => {

    title('Program Feedback Form')

    const [formData, setFormData] = useState({})
    const [academicYear, setAcademicYear] = useState(null)
    const [schoolName, setSchoolName] = useState(null)
    const [program, setProgram] = useState(null)

    const [shouldUpdate, setShouldUpdate] = useState(false)
    const [loading, setLoading] = useState(false)

    const { programId } = useParams()

    const params = { filter: { _id: programId }, singleItem: true }
    const { data, isLoading } = useQuery(["SingleProgram", programId], () => fetchPrograms(params), {
        staleTime: 60000,
        cacheTime: 60000
    })

    useEffect(() => {
        shouldUpdate && localStorage.setItem(`${programId}-ProgramFeedback-FormData`, JSON.stringify(formData))
    }, [formData])

    useEffect(() => {
        setFormData(JSON.parse(localStorage.getItem(`${programId}-ProgramFeedback-FormData`)) ? JSON.parse(localStorage.getItem(`${programId}-ProgramFeedback-FormData`)) : {})
        setShouldUpdate(true)
    }, [schoolName, academicYear])

    const navigate = useNavigate()

    const [activeStep, setActiveStep] = useState(0);
    let links = [siteLinks.welcome, siteLinks.programs,
    { title: program?.title ? `${program?.title?.slice(0, 40)}...` : 'Loading Program...', link: `/program/${programId}` }, { title: 'Program Feedback Form' }];

    useEffect(() => {
        if (data?.data?.data === null) {
            navigate(siteLinks.programs.link)
        } else {
            setProgram(data?.data?.data)
        }
    }, [data])


    const handleFormRegistration = () => {
        handleFeedback(setLoading, formData, programId, program, navigate)
    }

    return (
        <div>
            <GoBack pageTitle="Program Registration Form" bredLinks={links} />

            {
                isLoading ? <UserLoading title="Creating Form for you" /> :

                    <div className='w-full md:flex items-center justify-center mt-4'>


                        <div className='lg:w-3/5 sm:w-full md:w-4/5'>
                            <div className='w-full'>

                                <div className='animate-fade-up animate-once'>
                                    <div className='bg-blue-50 text-center rounded-xl p-2 border-2 border-blue-700'>
                                        <p className='font-semibold text-sm mb-2'>{program?.prefix}</p>
                                        <p className='font-semibold text-xl leading-5'>{program?.title}</p>
                                        <p className='font-semibold text-lg leading-5'>{program?.programDate}</p>
                                        <p className="text-sm mt-2">
                                            Organized by {program?.arrangedBy}
                                        </p>
                                    </div>
                                    <Header title='Program Feedback Form' schoolName={program?.arrangedBy} />
                                </div>


                                <form onSubmit={(e) => { e.preventDefault(); validateForm(questions, setLoading, 'feedback', formData, setFormData, { academicYear, schoolName }, navigate, setActiveStep, handleFormRegistration) }} className='w-full mt-5'>

                                    <div id="part-1" className='animate-fade-up animate-once' >
                                        {
                                            questions.map((question) => {
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

            }


        </div>
    )
}

export default ProgramFeedback

const questions = [

    {
        type: 'radio',
        required: true,
        question: 'The objectives of the workshop were clearly stated',
        options: ['Strongly Agree', 'Agree', 'Disagree', 'Strongly Disagree']
    },
    {
        type: 'radio',
        required: true,
        question: 'The lectures were organized properly and easy to follow',
        options: ['Strongly Agree', 'Agree', 'Disagree', 'Strongly Disagree']
    },
    {
        type: 'radio',
        required: true,
        question: 'Resource persons were well prepared their lectures',
        options: ['Strongly Agree', 'Agree', 'Disagree', 'Strongly Disagree']
    },
    {
        type: 'radio',
        required: true,
        question: 'Lunch/refreshment arrangements were good',
        options: ['Strongly Agree', 'Agree', 'Disagree', 'Strongly Disagree']
    },
    {
        type: 'radio',
        required: true,
        question: 'Performance of the Resource Person',
        options: ['Excellent', 'Good', 'Satisfactory', 'Not Satisfactory']
    },
    {
        type: 'radio',
        required: true,
        question: 'Are you going to prepare MOOCs after this workshop?',
        options: ['Yes', 'No', 'Not decided yet']
    },
    {
        type: 'text',
        required: false,
        question: 'Your suggestions for the betterment',
    },

]


export { questions }