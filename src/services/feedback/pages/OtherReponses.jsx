import React from 'react'
import { designations } from '../../../inputs/DesignationSelect'
import { useParams } from 'react-router-dom'
import fetchData from '../../dashboard/js/fetchData'
import { useQuery } from 'react-query'
import { useState } from 'react'
import GoBack from '../../../components/GoBack'
import { ResponseHandler } from './StudentResponse'
import { useEffect } from 'react'
import { teacherQuestions } from './TeacherFeedback'
import { alumniQuestions } from './AlumniFeedback'
import { parentQuestions } from './ParentFeedback'
import { employerQuestions } from './EmployerFeedback'

const OtherReponses = () => {

    const { responseType, schoolName, academicYear } = useParams()
    const [res, setRes] = useState([])

    const basicInfo = {
        teacher: { model: 'TeacherFeedback', title: 'Teacher', questions: teacherQuestions },
        alumni: { model: 'AlumniFeedback', title: 'Alumni', questions: alumniQuestions },
        parent: { model: 'ParentFeedback', title: 'Parent', questions: parentQuestions },
        employer: { model: 'EmployerFeedback', title: 'Employer', questions: employerQuestions }
    }



    const param = { model: basicInfo[responseType].model, filter: { schoolName, academicYear } }
    const { data, isLoading, isError, error, refetch } = useQuery([param.model, param], () => fetchData(param))

    useEffect(() => {
        setRes(data?.data?.data ? data?.data?.data?.map(({ response }) => (JSON.parse(response))) : [])
    }, [data])


    return (
        <div>
            <div>
                <div>
                    <GoBack pageTitle={`${basicInfo[responseType].title} Feedback Response ${res.length > 0 ? `(${res.length})` : `(0)`}`} />
                </div>

                <div>
                    {
                        basicInfo[responseType].questions?.map((question, index) => {

                            return <div className="bg-blue-50 border-t-2 rounded-t-md border-t-blue-400 p-3 m-3">
                                <p className='font-semibold'>{question.question}</p>

                                <div className='border-l-2 ml-1 border-l-blue-500 '>
                                    <div className='ml-4'>
                                        {
                                            res.map((resItem) => {
                                                return <ResponseHandler question={question} resItem={resItem} />
                                            })
                                        }
                                    </div>
                                </div>



                            </div>
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default OtherReponses
