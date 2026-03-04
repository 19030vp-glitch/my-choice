import React, { useEffect } from 'react'
import CASDataTable from '../../../services/faculty/reports/cas/components/CASDataTable'
import { ViewFile } from './Tables'


const BasicIntro = ({ academicData, forPrintOut }) => {



    let introTables = [
        {
            model: "Qualification",
            addName: "Qualification",
            activityName: "Qualifications",
        },
        {
            model: "Degree",
            addName: "Degree",
            activityName: "Research Degrees",
        },
        {
            model: "AppointmentsHeldPrior",
            addName: "Appointments held prior",
            activityName: "Appointments held prior to joining this institute",
        },
        {
            model: "PostHeld",
            addName: "Post held after joining",
            activityName: "Posts held after joining this institute",
        },
        {
            model: "Online",
            addName: "Orientation/Refresher Course/FDP",
            activityName: "Orientation/Refresher Course/FDP",
        },
        {
            model: "Experience",
            addName: "Experience",
            activityName: "Teaching / Research Experience & Specialization",
        }


    ]

    return (
        <div className="academic-start">
            <p className="academic-start"></p>
            <p className={`text-center ${forPrintOut === 'false' && 'bg-[#00987936] text-[#009879]'} p-2`}>
                <span className="font-bold">General Information & Academic Background</span>
            </p>


            {/* // tables */}

            {
                introTables.map((item, index) => {
                    return <div className="my-5 mx-auto" key={index} style={{ pageBreakInside: 'avoid' }}>
                        <div className={`bg-white overflow-hidden sm:rounded-lg border ${forPrintOut === 'true' && "border-dark"}`}>

                            <div className={`px-4 py-2 sm:px-6 ${forPrintOut === 'false' && "bg-[#009879] text-white"}`}>
                                <h3 className="sm:text-lg text-base leading-6 font-medium">{index + 1}.  {item.activityName}</h3>
                            </div>

                            <div className={`${forPrintOut === 'true' && "px-2"}`}>
                                <table className={`table table-bordered ${forPrintOut === 'true' && "border-dark"}`}>
                                    <thead className={`${forPrintOut === 'false' && "bg-[#009879] text-white"}`}>
                                        <tr>
                                            <th scope="col">Sr</th>
                                            {
                                                CASDataTable[item.model].tableHeads.map((head) => {
                                                    return <th scope="col">{head}</th>
                                                })
                                            }
                                        </tr>

                                    </thead>
                                    <tbody>
                                        {academicData?.[item.model]?.map((modelItem, index) => {
                                            return <tr>
                                                <th scope="row">{index + 1}</th>
                                                {
                                                    CASDataTable[item.model].tableCells.map((cell, index) => {
                                                        return (<td>{cell === 'proof' ?
                                                            <ViewFile fileName={modelItem['proof']} /> : cell === 'link' ?
                                                                <ViewFile fileName={modelItem['link']}
                                                                    type="linkURL" /> : modelItem[cell]}</td>);
                                                    })
                                                }
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                })
            }
        </div>
    )
}

export default BasicIntro