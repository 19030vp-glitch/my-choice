import React, { useEffect } from 'react'
import programsByNIRF from '../../director/reports/nirf/js/programsByNIRF'
import { useQuery } from 'react-query'
import { studentIntakeFetch } from '../../director/reports/nirf/js/fetchNIRFData'
import SchoolsProgram from '../../../components/SchoolsProgram'
import UserLoading from '../../../pages/UserLoading'
import { academicYearGeneratorBackwards } from '../../../inputs/Year'

const AdminStudentIntake = ({ academicYear }) => {
    const { data, isLoading, refetch } = useQuery(`student-intake`, () => studentIntakeFetch(academicYear),
        { refetchOnWindowFocus: false })

    useEffect(() => {
        if (academicYear) {
            refetch()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [academicYear])


    return (
        <div>
            <div className="table-responsive">
                {
                    !isLoading ? <table className='table table-bordered'>
                        <thead className='bg-[#ae7e28]  text-light'>
                            <tr>
                                <th>Schools</th>
                                {
                                    Object.keys(programsByNIRF).map((program, i) => {
                                        return <th key={`${program} ${i}`}>{programsByNIRF[program].abbv}</th>
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(SchoolsProgram).map((school) => {
                                    return <tr>
                                        <th>{school}</th>
                                        {
                                            Object.keys(programsByNIRF).map((program) => {
                                                const academicYears = academicYearGeneratorBackwards(programsByNIRF[program].year, false, academicYear)
                                                return <td>
                                                    <div>
                                                        {academicYears.map((year) => {
                                                            return <div>
                                                                {year} : <b>{(data?.data?.['intakeData'][school]?.[program]?.[year]) || 0}</b>
                                                            </div>
                                                        })}
                                                    </div>

                                                </td>
                                            })
                                        }
                                    </tr>
                                })
                            }
                        </tbody>
                    </table> : <UserLoading title="Getting Data" />
                }

            </div>
        </div>
    )
}

export default AdminStudentIntake
