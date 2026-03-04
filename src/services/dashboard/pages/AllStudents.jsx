import React from 'react'
import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import GoBack from '../../../components/GoBack'
import fetchData, { fetchSchoolData } from '../js/fetchData'
import UserLoading from '../../../pages/UserLoading'
import { dashboardData } from '../../../templates/faculty/cas-report/Header'
import { useState } from 'react'
import EmptyBox from '../../../components/EmptyBox'
import ServiceDashboard from './ServiceDashboard'
import serverLinks from '../../../js/serverLinks'
import title from '../../../js/title'
import ShowImage from './ShowImage'
import capitalizeText from '../../../js/capitalizeText'



const AllStudents = ({ showImage = false, school }) => {

    // const { school } = useParams()
    // title(`About Students of ${school}`)
    const param = { model: 'Student', filter: { schoolName: school, isAlumni: false, isActiveStudent: true } }
    const { data, isLoading, isError, error, refetch } = useQuery([param.model, param], () => fetchData(param))
    const [studentData, setStudentData] = useState(null)


    useEffect(() => {
        setStudentData(data?.data?.data?.sort((a, b) => (a.programGraduated > b.programGraduated) ? 1 : ((b.programGraduated > a.programGraduated) ? -1 : 0)))
    }, [school, data])

    return (
        <div>
            <div className="sticky-top bg-white text-[19px] font-bold pt-2 flex justify-center">
                {school}
            </div>
            <div>
                <div className='mt-3'>
                    <div className='table-responsive'>
                        <table className="table table-bordered css-serial">
                        <thead className='bg-[#1d4ed8] text-white'>
                                <tr>
                                    <th scope="col">Sr No.</th>
                                    {
                                        showImage && <th scope="col">Photo</th>
                                    }
                                    <th scope="col">Student Name</th>
                                    <th scope="col">Gender</th>
                                    <th scope="col">Enrolled Program</th>
                                    <th scope="col">Enrolment year</th>
                                    <th scope="col">Current Status</th>


                                </tr>
                            </thead>
                            <tbody>


                                {
                                    studentData?.map((item) => {
                                        return <tr>
                                            <td className='font-bold'></td>
                                            {
                                                showImage && <td className='min-w-32'><ShowImage fileName={item?.photoURL} serviceName={'student'} /></td>
                                            }
                                            <td>{capitalizeText(item?.name)}</td>
                                            <td>{item?.gender}</td>
                                            <td>{item?.programGraduated}</td>
                                            <td>{item?.programEnroledOn|| '--'}</td>
                                            <td>{item.currentIn ? item.currentIn : '--'}</td>
                                        </tr>
                                    })
                                }




                            </tbody>
                        </table>
                        {isLoading && <UserLoading title="Fetching data" />}

                        {
                            studentData?.length === 0 && <EmptyBox />
                        }

                    </div>
                </div>
            </div>

        </div>
    )
}

export default AllStudents