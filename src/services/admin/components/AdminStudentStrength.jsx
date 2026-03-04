import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import { studentStrengthFetch } from '../../director/reports/nirf/js/fetchNIRFData'
import UserLoading from '../../../pages/UserLoading'
import { tableHeadStudentStrength } from '../../director/reports/nirf/components/TotalAnnualStudentStrength'


const AdminStudentStrength = ({ academicYear }) => {

    const { data, isLoading, refetch } = useQuery(`student-strength`, () => studentStrengthFetch(academicYear),
        { refetchOnWindowFocus: false })

    useEffect(() => {
        if (academicYear) {
            refetch()
        }
    }, [academicYear])


    return (
        <div>
            {
                isLoading ? <UserLoading title="Loading" /> :
                    data?.data?.strengthData ? <div>
                        {
                            Object.keys(data?.data?.strengthData)?.map((program) => {
                                return <div className="mb-5 border-2 rounded-md p-2">
                                    <p className="my-2 font-bold">{program}</p>
                                    <div className='table-responsive'>
                                        <table className='table table-bordered'>
                                            <thead className='bg-[#ae7e28] text-light'>
                                                <tr>
                                                    <th>School</th>
                                                    {Object.keys(tableHeadStudentStrength).map((e, i) => {
                                                        return <th key={`head-${i}`}>{tableHeadStudentStrength[e]}</th>
                                                    })}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    Object.keys(data?.data?.strengthData?.[program]).map((school) => {
                                                        return <tr>
                                                            <th>{school}</th>
                                                            {
                                                                Object.keys(tableHeadStudentStrength).map((head) => {
                                                                    return <td>{data?.data?.strengthData?.[program]?.[school]?.[head] || 0}</td>
                                                                })
                                                            }

                                                        </tr>
                                                    })
                                                }
                                                {
                                                    Object.keys(data?.data?.totalData?.[program]).map((total) => {
                                                        return <tr>
                                                            <th>{total}</th>
                                                            {
                                                                Object.keys(tableHeadStudentStrength).map((head) => {
                                                                    return <td>{data?.data?.totalData?.[program]?.['Total']?.[head] || 0}</td>
                                                                })
                                                            }

                                                        </tr>
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            })
                        }

                    </div> : <p className='my-5 text-center'>No data available for {academicYear}</p>
            }
        </div>
    )
}

export default AdminStudentStrength
