import React from 'react'
import CASDataTable from '../../../services/faculty/reports/cas/components/CASDataTable';
import { useEffect } from 'react';
import { Remark } from '../../../services/faculty/reports/cas/content/Teaching';
import { ViewFile } from './Tables';

const TeachingAndActivities = ({ forPrintOut, lectures, casArray, showFileURL }) => {

    let activities = {

        A: "Administrative responsibilities such as Head / Chairperson / Dean / Director / Coordinator / Warden etc.",

        B: "Examination and evaluation duties assigned by the college / university or attending the examination paper evaluation.",

        C: "Student related co-curricular, extension and field based activities such as student clubs, career counselling, study visits, student seminars and other events, cultural,sports, NCC, NSS and community services.",

        D: "Organising seminars / conferences / workshops and other college or university activities.",

        E: "Evidence of actively involved in guiding Ph.D. students.",

        F: "At least one single or joint publication in peer-reviewed or UGC list of journals.",

        G: "Conducting minor or major research project sponsored by National or International agencies."
    }



    return (
        <div className="academic-start">
            <p className={`text-center ${forPrintOut === 'false' && 'bg-[#00987936] text-[#009879]'} p-2`}>
                <span className="font-bold">Teaching and Related Activities</span>
            </p>

            <div className="mt-3">


                <div>
                    <div className={`p-2 ${forPrintOut === 'false' && "bg-[#009879] text-white"} flex items-center justify-between rounded-t-lg`}>
                        <div>
                            <h3 className="sm:text-lg text-base leading-6 font-medium">
                                1. Teaching
                            </h3>
                        </div>
                    </div>

                    <div className={`${forPrintOut === 'true' && "px-1"}`}>
                        <table className={`table table-bordered text-sm`}>
                            <thead className={`${forPrintOut === 'false' && "bg-[#009879] text-white"}`}>
                                <tr>
                                    <th scope="col">Year</th>
                                    <th scope="col">Lectures & Teaching</th>
                                </tr>
                            </thead>
                            <tbody>

                                {casArray?.map((casItem) => {
                                    return (
                                        <tr className={`${forPrintOut === 'true' ? "text-black" : "table-light"} `}>
                                            <th scope="row" className='w-20 text-sm text-[#009879]'>{casItem.casYear}</th>
                                            <td>

                                                <table className={`table table-bordered ${forPrintOut === 'true' && "border-dark"}`}>
                                                    <thead className={`${forPrintOut === 'false' && "bg-[#009879] text-white"}`}>
                                                        <tr>
                                                            <th scope="col">Sr.</th>
                                                            {CASDataTable.Lectures.tableHeads?.map((item) => { return (<th>{item}</th>); })}
                                                        </tr>
                                                    </thead>
                                                    <tbody className='text-sm'>

                                                        {
                                                            lectures?.map((modelItem, index) => {
                                                                return <tr>
                                                                    <th scope="row">{index + 1}</th>
                                                                    {CASDataTable.Lectures.tableCells.map((item) => { return (<td>{modelItem?.[item]}</td>); })}
                                                                </tr>
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                                <div className={`${forPrintOut === 'false' && "bg-[#00987a19] text-[#009879]"} w-full rounded-lg p-3`}>
                                                    <b className='mr-3'>{casItem?.teachingData?.teachingGrade}%</b>
                                                    <Remark title={casItem?.teachingData?.teachingRemark} color={casItem?.teachingData?.teachingRemarkColor} />
                                                </div>

                                            </td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

            <div className="mt-5">
                <div>
                    <div className={`p-2 ${forPrintOut === 'false' && "bg-[#009879] text-white"} flex items-center justify-between rounded-t-lg`}>
                        <div>
                            <h3 className="sm:text-lg text-base leading-6 font-medium">
                                2. Involvement in University / College students related activities / Research activities
                            </h3>
                        </div>
                    </div>

                    <div className={`${forPrintOut === 'true' && "px-1"}`}>
                        <table className={`table table-bordered text-sm`}>
                            <thead className={`${forPrintOut === 'false' && "bg-[#009879] text-white"}`}>
                                <tr>
                                    <th scope="col">Year</th>
                                    <th scope="col">Activities</th>
                                </tr>
                            </thead>
                            <tbody>

                                {casArray?.map((casItem) => {
                                    return (
                                        <tr className={`${forPrintOut === 'true' ? "text-black" : "table-light"} `}>
                                            <th scope="row" className='w-20 text-sm text-[#009879]'>{casItem.casYear}</th>
                                            <td className='text-[#009879]'>Involved in <span className='font-bold'>{casItem?.teachingData?.checkBoxCount}</span> {casItem?.teachingData?.checkBoxCount > 1 ? 'Activities' : 'Activity'} <span className="mx-2">
                                                {
                                                    casItem?.teachingData?.checkBoxCount > 2 ?
                                                        <Remark title='Good' color='green' /> :
                                                        casItem?.teachingData?.checkBoxCount >= 1 ?
                                                            <Remark title='Satisfactory' color='yellow' /> :
                                                            <Remark title='Not-Satisfactory' color='red' />
                                                }
                                            </span>
                                                {casItem?.teachingData?.checkBoxSelected?.length < 1 ?
                                                    <b>0</b> :
                                                    <ul className="list-group list-group-flush mt-4">
                                                        {casItem?.teachingData?.checkBoxSelected?.map((checkBoxId) => {
                                                            return <li className="list-group-item flex items-center bg-transparent justify-start gap-2 px-3">
                                                                <p className="text-black"> <b>{`[${checkBoxId}]`}</b> : {activities[checkBoxId]} </p>
                                                                <div>
                                                                    {
                                                                        casItem?.teachingData?.uploadedFiles?.[`file-${checkBoxId}`]?.filename ? <ViewFile fileName={casItem?.teachingData?.uploadedFiles?.[`file-${checkBoxId}`]?.filename} type={showFileURL} small={true} /> : <p className='text-red-600'>Proof N/A</p>
                                                                    }

                                                                </div>
                                                            </li>
                                                        })}
                                                    </ul>

                                                }
                                            </td >
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default TeachingAndActivities
