import React from 'react'

const CollegeList = ({ collegeData }) => {
    return (
        <table className='table table-bordered'>
            <thead>
                <tr>
                    <th>Sr No.</th>
                    <th>College Name</th>
                    <th>College Code</th>
                    <th>District</th>
                    <th>Individual Competitions</th>
                    <th>Group Student Participations</th>
                    <th>Total Participations</th>
                </tr>
            </thead>
            <tbody>
                {
                    collegeData?.colleges?.map((college, index) => {
                        return <tr>
                            <th>{index + 1}</th>
                            <td>{college?.collegeName}</td>
                            <td>{college?.collegeCode}</td>
                            <td>{college?.district}</td>
                            <td>{collegeData?.collegeMap?.[college?._id]?.individual}</td>
                            <td>{collegeData?.collegeMap?.[college?._id]?.group}</td>
                            <td>{collegeData?.collegeMap?.[college?._id]?.total}</td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    )
}

export default CollegeList
