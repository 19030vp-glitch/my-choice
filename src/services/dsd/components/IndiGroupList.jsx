import React from 'react'

const IndiGroupList = ({ allCompetitions, competitionName, category }) => {

    const categoryBy = category === "Individual Competitions" ? false : true


    return (
        <div>
            <table className="table table-bordered css-serial">
                <thead>
                    <tr>
                        <th>Sr.</th>
                        <th>Student Name</th>
                        <th>College Name</th>
                        <th>Competition Name</th>
                        <th>Mobile No.</th>
                        <th>Gender</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allCompetitions?.filter((comp) =>
                            competitionName ?
                                comp.competitionName === competitionName :
                                category &&
                                comp.isGroup === categoryBy

                        )?.map((competition, index) => {
                            return competition?.students?.map((student) => {
                                return <tr>
                                    <td></td>
                                    <td>{student?.ParticpantName}</td>
                                    <td>{competition?.college?.collegeName}</td>
                                    <td>{competition?.competitionName}</td>
                                    <td>{student?.mobileNo}</td>
                                    <td>{student?.gender}</td>
                                </tr>
                            })
                        })
                    }


                </tbody>
            </table>
        </div>
    )
}

export default IndiGroupList
