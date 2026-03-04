import React, { useState } from 'react'
import QuestionHandler from '../components/QuestionHandler'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import GoBack from '../../../components/GoBack'
import Note from '../../director/reports/academic-audit/components/Note'
import { designations } from '../../../inputs/DesignationSelect'
import ActionButtons from '../components/ActionButtons';
import validateForm from '../js/validateAndSubmit';
import Header from '../components/Header'
import FeedbackHome from '../components/FeedbackHome'
import siteLinks from '../../../components/siteLinks'
import title from '../../../js/title'

const teacherQuestions = [
    {
        type: 'text',
        required: true,
        question: 'Your Name',
    },
    {
        type: 'radio',
        required: true,
        question: 'Designation',
        options: designations
    },
    {
        type: 'text',
        required: true,
        question: 'Contact Number',
    },
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

const TeacherFeedback = () => {

    title('Teacher Feedback')

    const [formData, setFormData] = useState({})

    const [academicYear, setAcademicYear] = useState(null)
    const [schoolName, setSchoolName] = useState(null)

    const [shouldUpdate, setShouldUpdate] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        shouldUpdate && localStorage.setItem(`teacherFeedback-FormData-${academicYear}-${schoolName}`, JSON.stringify(formData))
    }, [formData])

    useEffect(() => {
        setFormData(JSON.parse(localStorage.getItem(`teacherFeedback-FormData-${academicYear}-${schoolName}`)) ? JSON.parse(localStorage.getItem(`teacherFeedback-FormData-${academicYear}-${schoolName}`)) : {})
        setShouldUpdate(true)
    }, [schoolName, academicYear])

    const navigate = useNavigate()

    const [activeStep, setActiveStep] = useState(0);
    const links = [siteLinks.welcome, siteLinks.teacherFeedack]

    return (
        <div>

            <FeedbackHome userType="Teacher" academicYear={academicYear} setAcademicYear={setAcademicYear} schoolName={schoolName} setSchoolName={setSchoolName} setActiveStep={setActiveStep} activeStep={activeStep} links={links} >
                <div className='w-full md:flex items-center justify-center mt-4'>
                    <div className='lg:w-3/5 sm:w-full md:w-4/5'>
                        <div className='w-full'>
                            <Header title='Teacher Feedback Form' academicYear={academicYear} schoolName={schoolName} />


                            <Note classes="mb-8 mt-5" title="This questionnaire is intended to collect information relating to your satisfaction towards the curriculum,teaching, learning and evaluation. The information provided by you will be kept confidential and will be used as important feedback for quality improvement of the programme of studies/institution." />


                            <form onSubmit={(e) => { e.preventDefault(); validateForm(teacherQuestions, setLoading, 'teacherFeedback', formData, setFormData, { academicYear, schoolName }, navigate, setActiveStep) }} className='w-full mt-5'>

                                <div id="part-1" >
                                    {
                                        teacherQuestions.map((question) => {
                                            return <QuestionHandler question={question} formData={formData} setFormData={setFormData} />
                                        })
                                    }
                                </div>

                                <br /><br /><br /><br />

                                <ActionButtons loading={loading} setFormData={setFormData} academicYear={academicYear} schoolName={schoolName} responseType="teacherFeedback" />


                            </form>
                        </div>

                    </div>
                </div >
            </FeedbackHome>



        </div>
    )
}

export default TeacherFeedback

export { teacherQuestions }