import React from 'react'
import useNIRFGetProgram from '../../../../../hooks/director-hooks/useNIRFGetProgram'
import { useSelector } from 'react-redux'
import UserLoading from '../../../../../pages/UserLoading'
import ArrowButton from '../../../../../components/ArrowButton'
import { useNavigate, useParams } from 'react-router-dom'
import programsByNIRF from '../js/programsByNIRF'
import Note from '../../academic-audit/components/Note'
import StudentIntakeYearWise from './StudentIntakeYearWise'
import { fetchStudentIntake } from '../js/studentIntakeHandler'
import { useQuery } from 'react-query'

const StudentIntake = () => {

    const { academicYear } = useParams()
    const user = useSelector((state) => state.user?.directorUser)
    const { programs, isLoading } = useNIRFGetProgram(user, academicYear)



    const { data, isLoading: intakeLoading } = useQuery(['StudentIntake', `Intake-${user?._id}`],
        () => fetchStudentIntake(user?.department), { refetchOnWindowFocus: false });



    return (
        <div>
            {
                isLoading ? <div>
                    <UserLoading title="Getting Data" />
                </div> : programs && programs?.length > 0 ?
                    <div>
                        <Note classes="bg-yellow-100 text-yellow-700 rounded-t-md p-2 mt-2" title="1. Sanctioned approved intake of 1st year to be entered" />
                        <Note classes="bg-yellow-100 text-yellow-700 rounded-b-md p-2 mb-2" title="2. Enter value(s) in all the field(s):If not applicable enter zero[0]" />

                        <div>
                            {intakeLoading ?
                                <UserLoading title="Fetching Student Intake" /> :

                                programs.map((item) => {
                                    const program = programsByNIRF[item]
                                    return <StudentIntakeYearWise serverData={data?.data} program={program} schoolName={user?.department} academicYear={academicYear} />
                                })

                            }
                        </div>

                    </div> :
                    <NotAvailableComponentNIRF academicYear={academicYear} />
            }
        </div>
    )
}

export default StudentIntake


const NotAvailableComponentNIRF = ({ academicYear }) => {
    const navigate = useNavigate()
    return <div className="text-center">
        <p className="my-5 text-yellow-600">No programs are added for the academic year <b>{academicYear}</b>. <br />Please add programs first, and then proceed.</p>

        <ArrowButton title="Add Programs" onClickFunction={() => navigateToURL(academicYear, 'programs', navigate)} />
    </div>
}

const navigateToURL = (academicYear, pageToGo, navigate) => {
    navigate(`/director/nirf/${academicYear}/${pageToGo}`)
}

export { navigateToURL, NotAvailableComponentNIRF }


