import React from 'react'
import { useParams } from 'react-router-dom'
import title from '../../js/title'
import { getYFApplicationData } from '../../services/youthfestival/js/yfGeneratePDF'
import { useQuery } from 'react-query'
import InfoPage from './InfoPage'
import ParticipantDetails from './ParticipantDetails'
import moment from 'moment/moment'
import Lists from '../../components/tableComponents/Lists'

const YFApplicationForm = () => {
    const { collegeId, academicYear } = useParams()
    title('Youth Festival Application Form')

    const { data, isLoading } = useQuery('YFData', () => getYFApplicationData(collegeId, academicYear))

    console.log("YFApplicationData:", data?.data?.data)

    return (
        <div className="my-3">
            {!isLoading &&
                <div>
                    <div className='p-5 border rounded-lg'>
                        <InfoPage data={data?.data?.data} info={data?.data?.data?.info} college={data?.data?.data?.college} />
                    </div>
                    <p className="academic-start"></p>
                    <div className="academic-start">
                        {
                            (data?.data?.data?.students && data?.data?.data?.students?.length > 0)
                                ?
                                data?.data?.data?.students?.map((student) => {
                                    return <div className='p-5 border rounded-lg academic-start mt-5'>
                                        <ParticipantDetails
                                            student={student}
                                            college={data?.data?.data?.college}
                                            academicYear={academicYear}
                                            type="student"
                                        />
                                    </div>
                                })
                                :
                                <p className="my-5 text-red-800 text-center">No Students Registered yet</p>
                        }
                    </div>
                    <div>
                        {
                            (data?.data?.data?.sathidars && data?.data?.data?.sathidars?.length > 0)
                                ?
                                data?.data?.data?.sathidars?.map((student) => {
                                    return <div className='p-5 border rounded-lg mt-5'>
                                        <ParticipantDetails title="युवक महोत्सव सहभाग -- प्रशिक्षक / वादक / साथीदार योग्यता प्रमाणपत्र"
                                            student={student}
                                            college={data?.data?.data?.college}
                                            academicYear={academicYear}
                                            type="sathidar"
                                        />
                                    </div>
                                })

                                :
                                <p className="my-5 text-red-800 text-center">No Students Registered yet</p>
                        }
                    </div>
                    <p className="academic-start"></p>
                    <br />
                    <div>
                        <div className="text-center">
                            <p className="mt-3 text-lg font-semibold">अंतरमहाविद्यालयीन युवक महोत्सव  -- शै. वर्ष {academicYear}</p>
                            <p className="font-medium mb-3">महाविद्यालयाचे नाव: {data?.data?.data?.college?.collegeName}</p>
                        </div>
                        <table className='table table-bordered'>
                            <thead>
                                <tr
                                // className="text-sm"
                                >
                                    <th>Sr.</th>
                                    <td>स्पर्धकाचे नाव</td>
                                    <td>जन्म दिनांक</td>
                                    <th>भाग घेतलेल्या स्पर्धेचे नाव</th>
                                    {/* {
                                        [...Lists.yfIndividual, ...Lists.yfGgroup].map((item) => {
                                            return <td>{item}</td>
                                        })
                                    } */}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data?.data?.data?.students?.map((student, index) => {
                                        return <tr>
                                            <th>{index + 1}</th>
                                            <td>{student?.ParticpantName}</td>
                                            <td>{moment(student?.dob, 'YYYY-MM-DD').format('DD-MM-YYYY')}</td>
                                            <td>
                                                <div>
                                                    {student?.competitions?.map((el, i) => {
                                                        return <p>{i + 1}. {el?.competitionName}</p>
                                                    })}
                                                </div>
                                            </td>
                                            {/* {
                                                [...Lists.yfIndividual, ...Lists.yfGgroup].map((item) => {
                                                    return <td className="text-sm">item</td>
                                                })
                                            } */}
                                        </tr>
                                    })

                                }
                                <tr></tr>
                            </tbody>
                        </table>
                    </div>


                </div>
            }
        </div>
    )
}

export default YFApplicationForm
