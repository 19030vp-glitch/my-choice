import React from 'react'
import UserLoading from '../../../pages/UserLoading'
import { generateCASReport, getTotalCASData } from '../../faculty/reports/cas/CASServices'
import { useState } from 'react'
import { useEffect } from 'react'
import { generatePBASReport, getTotalPBASData } from '../../faculty/reports/pbas/PBASServices'
import { getTotalFacultyAQARData } from '../../director/reports/aqar/js/getAQARData'
import { getReportInfo, getTotalReportInfo } from '../../../js/submitReportForm'
import designationWiseSorting from '../../../js/designationWiseSorting'
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import { LinearProgress } from '@mui/material'
import ReportLoading from '../../../components/ReportLoading'
import CalendarViewDayRoundedIcon from '@mui/icons-material/CalendarViewDayRounded';

const FacultyRelatedService = ({ teachers, teacherLoading, serviceName, year, school }) => {


    const [serviceDataFromServer, setServiceDataFromServer] = useState(null)
    const [serviceData, setServiceData] = useState({})
    const [candidates, setCandidates] = useState([])
    const [serviceLoading, setServiceLoading] = useState(false)
    const [reportLoading, setReportLoading] = useState(false)


    useEffect(() => {
        setCandidates(null)
        getTotalReportInfo(setServiceData, setServiceLoading)
    }, [serviceName])

    useEffect(() => {
        setCandidates(null)
        console.log('ServiceData :', serviceData)

        // console.log('serviceData: ', serviceData)
        // if (teachers?.data?.data?.length > 0) {
        //     let candidatesArray = []
        //     teachers?.data?.data?.forEach((teacher) => {
        //         serviceDataFromServer?.forEach((serviceItem) => {
        //             if (serviceItem.userId?._id === teacher._id) {
        //                 let hasSubmitted = serviceItem?.submitted ? serviceItem?.submitted.includes(year) : false

        //                 if (hasSubmitted) {
        //                     candidatesArray.push(teacher._id)
        //                 }

        //             }
        //         })
        //     })

        //     setCandidates(() => candidatesArray)



        // }

    }, [serviceData, year, serviceName, teachers])

    const generateReport = (id) => {
        if (serviceName === "PBAS") {
            let userData = { _id: id }
            setReportLoading({ isLoading: true, title: 'Generating PBAS Report' });
            generatePBASReport(userData, [year], setReportLoading, false)
        } else if (serviceName === "CAS") {
            let userData = { _id: id }
            setReportLoading({ isLoading: true, title: 'Generating CAS Report' });
            generateCASReport(userData, [year], setReportLoading, false)
        }
    }

    const browseReport = (id) => {
        if (serviceName === "PBAS") {
            let link = `${process.env.REACT_APP_REPORT_URL}/report/PBASReport/${id}/${JSON.stringify([year])}/false`
            window.open(link, '_blank')
        } else if (serviceName === "CAS") {
            let link = `${process.env.REACT_APP_REPORT_URL}/report/CASReport/${id}/${JSON.stringify([year])}/false`
            window.open(link, '_blank')
        }
    }


    return (
        <div>
            {/* <div>

                {(reportLoading && reportLoading.title.includes(serviceName)) && <div className="my-2">
                    <ReportLoading loading={reportLoading} />
                </div>}

                {teachers?.data?.data && <p className='my-2 bg-[#f5f5f5] border text-black p-2 rounded-md'><b>{candidates?.length ? candidates.length : 0}</b> Teachers out of <b>{teachers?.data?.data?.length}</b> submitted {serviceName} form for year <b>{year}</b> </p>}

                <div>
                    {(teacherLoading || serviceLoading) && <UserLoading title="Loading Data" />}
                    <ul className="list-group list-group-flush">

                        {
                            teachers?.data?.data && designationWiseSorting(teachers?.data?.data).map((teacher, index) => {
                                return <li className='flex items-center justify-between list-group-item'>
                                    <span> {index + 1}. {teacher?.salutation} {teacher?.name}</span>
                                    {
                                        candidates?.includes(teacher?._id) ?
                                            <span className='flex items-center font-semibold'>
                                                <span className="badge bg-success mr-2 p-[10px] cursor-default">Submitted</span>
                                                <span className="badge mr-2 bg-blue-600 hover:bg-blue-800 cursor-pointer" onClick={() => browseReport(teacher._id)} > <CalendarViewDayRoundedIcon sx={{ width: '16px' }} /> View Report</span>
                                                <span className="badge bg-blue-600 hover:bg-blue-800 cursor-pointer" onClick={() => generateReport(teacher._id)} > <FileDownloadRoundedIcon sx={{ width: '16px' }} /> Download Report</span>
                                            </span>
                                            :
                                            <span className='flex items-center font-semibold'>
                                                <span className="badge bg-danger mr-2 p-[10px]">Not Submitted</span>
                                                <span className="badge mr-2 bg-[#0d6efd6b] cursor-default"> <CalendarViewDayRoundedIcon sx={{ width: '16px' }} /> View Report</span>
                                                <span className="badge bg-[#0d6efd6b] cursor-default"> <FileDownloadRoundedIcon sx={{ width: '16px' }} /> Download Report</span>
                                            </span>
                                    }
                                </li>
                            })
                        }
                    </ul>

                </div>
            </div> */}

            <div>
                <table className="table table-striped table-bordered">
                    <thead className="bg-primary text-white">
                        <tr>
                            <th>School Name</th>
                            <th>CAS</th>
                            <th>PBAS</th>
                            <th>AQAR (Faculty)</th>
                            <th>AQAR (Director)</th>
                            <th>AAA</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='cursor-pointer'>
                            <td>School of Mathematical Sciences</td>
                            <td>5</td>
                            <td>7</td>
                            <td>6</td>
                            <td>Submitted</td>
                            <td>Not Submitted</td>
                        </tr>
                        <tr>
                            <td colspan="6">
                                <table className="table mb-0">
                                    <thead>
                                        <tr>
                                            <th>Faculty Name</th>
                                            <th>CAS</th>
                                            <th>PBAS</th>
                                            <th>AQAR (Faculty)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Dr. B. Surendranath Reddy</td>
                                            <td>Submitted</td>
                                            <td>Submitted</td>
                                            <td>Not Submitted</td>
                                        </tr>
                                        <tr>
                                            <td>Dr. Dnyaneshwar Dadaji Pawar</td>
                                            <td>Submitted</td>
                                            <td>Submitted</td>
                                            <td>Not Submitted</td>
                                        </tr>
                                        <tr>
                                            <td>Dr. Aniket Avinash Muley</td>
                                            <td>Submitted</td>
                                            <td>Submitted</td>
                                            <td>Not Submitted</td>
                                        </tr>
                                        <tr>
                                            <td>Dr. Usha K Sangale</td>
                                            <td>Submitted</td>
                                            <td>Submitted</td>
                                            <td>Not Submitted</td>
                                        </tr>

                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td>School of Mathematical Sciences</td>
                            <td>5</td>
                            <td>7</td>
                            <td>6</td>
                            <td>Yes</td>
                            <td>Yes</td>
                        </tr><tr>
                            <td>School of Mathematical Sciences</td>
                            <td>5</td>
                            <td>7</td>
                            <td>6</td>
                            <td>Yes</td>
                            <td>Yes</td>
                        </tr><tr>
                            <td>School of Mathematical Sciences</td>
                            <td>5</td>
                            <td>7</td>
                            <td>6</td>
                            <td>Yes</td>
                            <td>Yes</td>
                        </tr><tr>
                            <td>School of Mathematical Sciences</td>
                            <td>5</td>
                            <td>7</td>
                            <td>6</td>
                            <td>Yes</td>
                            <td>Yes</td>
                        </tr><tr>
                            <td>School of Mathematical Sciences</td>
                            <td>5</td>
                            <td>7</td>
                            <td>6</td>
                            <td>Yes</td>
                            <td>Yes</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default FacultyRelatedService
