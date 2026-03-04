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
import { CircularProgress, LinearProgress, Tooltip } from '@mui/material'
import ReportLoading from '../../../components/ReportLoading'
import CalendarViewDayRoundedIcon from '@mui/icons-material/CalendarViewDayRounded';
import SchoolsProgram from '../../../components/SchoolsProgram'
import { toast } from 'react-hot-toast'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import TaskRoundedIcon from '@mui/icons-material/TaskRounded';

const FacultyRelatedService = ({ year, school, user }) => {


    const [serviceData, setServiceData] = useState({})
    const [serviceLoading, setServiceLoading] = useState(false)
    const [reportLoading, setReportLoading] = useState(false)
    const [dashboardCount, setDashboardCount] = useState(null)

    const [expandedRow, setExpandedRow] = useState(null);

    const toggleRow = (rowIndex) => {
        if (expandedRow === rowIndex) {
            setExpandedRow(null);
        } else {
            setExpandedRow(rowIndex);
        }
    };

    function getCount(data) {
        let CASCount = 0;
        let PBASCount = 0;
        let FAQARCount = 0;

        if (data) {
            (school ? [school] : Object.keys(SchoolsProgram)).forEach((school) => {
                CASCount += data?.CASSchoolWise?.[school]
                PBASCount += data?.PBASSchoolWise?.[school]
                FAQARCount += data?.FAQARSchoolWise?.[school]
            })

            setDashboardCount({ CASCount, PBASCount, FAQARCount })
        }
    }


    useEffect(() => {
        getTotalReportInfo(setServiceData, setServiceLoading, year, school)
    }, [year])

    useEffect(() => {
        getCount(serviceData)
    }, [serviceData, year])



    return (
        <div>
            {
                !serviceLoading ? <div>
                    {
                        serviceData && <div>
                            <div className="flex items-center justify-between gap-5">
                                <TotalTile user={user} year={year} dashboardKey="PBASCount" dashboardCount={dashboardCount} title="PBAS" />
                                <TotalTile user={user} year={year} dashboardKey="FAQARCount" dashboardCount={dashboardCount} title="AQAR (Faculty)" />
                                <TotalTile user={user} year={year} dashboardKey="CASCount" dashboardCount={dashboardCount} title="CAS" />
                            </div>
                            <table className="table table-bordered">
                                <thead className={`${!user ? 'bg-primary' : 'bg-[#ae7e28]'} text-white sticky-top`}>
                                    <tr>
                                        <th>School Name</th>
                                        <th>PBAS</th>
                                        <th>AQAR (Faculty)</th>
                                        <th>AQAR (Director)</th>
                                        <th>CAS</th>
                                        {/* <th>AAA</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        (school ? [school] : Object.keys(SchoolsProgram)).map((school, rowIndex) => {
                                            return <>
                                                <tr className={`cursor-pointer ${user ? 'text-[#ae7e28]' : 'bg-blue-100 hover:text-blue-700'} font-semibold`} onClick={() => toggleRow(rowIndex)}>
                                                    <td>{school}</td>
                                                    <td>{serviceData.PBASSchoolWise?.[school]}</td>
                                                    <td>{serviceData.FAQARSchoolWise?.[school]}</td>
                                                    <td>{serviceData.DAQARSchoolWise?.[school].includes(year) ? <span className="badge bg-success mr-2 p-[10px] cursor-default px-[23px]">Submitted</span> : <span className="badge bg-danger mr-2 p-[10px] cursor-default">Not-Submitted</span>}</td>
                                                    <td>{serviceData.CASSchoolWise?.[school]}</td>
                                                    {/* <td>{serviceData.AAASchoolWise?.[school].includes(year) ? <span className="badge bg-success mr-2 p-[10px] cursor-default px-[23px]">Submitted</span> : <span className="badge bg-danger mr-2 p-[10px] cursor-default">Not-Submitted</span>}</td> */}
                                                </tr>
                                                {/* {expandedRow === rowIndex && ( */}
                                                <tr >
                                                    <td colspan="6" className='p-3'>
                                                        <div className={`${user ? 'bg-[#f1f3f4]' : 'bg-blue-50'} rounded-md p-2`}>
                                                            <table className="table mb-0">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Faculty Name</th>
                                                                        <th>PBAS</th>
                                                                        <th>AQAR (Faculty)</th>
                                                                        <th>CAS</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>


                                                                    {
                                                                        designationWiseSorting(serviceData.UsersSchoolWise?.[school])?.map((user) => {
                                                                            return <tr>
                                                                                <td>{user.salutation} {user.name}</td>
                                                                                <td><Badges serviceName="PBAS" year={year} hasSubmitted={serviceData.PBASUserId.includes(user._id) ? true : false} setReportLoading={setReportLoading} reportLoading={{ reportLoading }} userId={user._id} /> </td>
                                                                                <td><Badges serviceName="FAQAR" year={year} hasSubmitted={serviceData.FAQARUserId.includes(user._id) ? true : false} setReportLoading={setReportLoading} reportLoading={{ reportLoading }} userId={user._id} /> </td>
                                                                                <td><Badges serviceName="CAS" year={year} hasSubmitted={serviceData.CASUserId.includes(user._id) ? true : false} setReportLoading={setReportLoading} reportLoading={{ reportLoading }} userId={user._id} /> </td>
                                                                            </tr>
                                                                        })
                                                                    }

                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </td>
                                                </tr>
                                                {/* )} */}
                                            </>
                                        })
                                    }


                                </tbody>
                            </table>
                        </div>
                    }
                </div> : <UserLoading title={`Fetching service status for ${year}`} />
            }
        </div>
    )
}

export default FacultyRelatedService

const Badges = ({ hasSubmitted, userId, reportLoading, setReportLoading, serviceName, year }) => {

    const generateReport = (id) => {
        if (serviceName === "PBAS") {
            let userData = { _id: id }
            toast.success('Generating report, please wait...')
            setReportLoading({ isLoading: true, title: 'Generating PBAS Report', userId });
            generatePBASReport(userData, [year], setReportLoading, false)
        } else if (serviceName === "CAS") {
            let userData = { _id: id }
            toast.success('Generating report, please wait...')
            setReportLoading({ isLoading: true, title: 'Generating CAS Report', userId });
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

    return hasSubmitted ? <span className='flex items-center font-semibold'>
        <span className="badge bg-success mr-2 cursor-default "><Tooltip placement='top' disableInteractive title="Report Submitted"><CheckCircleRoundedIcon sx={{ width: '16px' }} /></Tooltip></span>
        <span className="badge mr-2 bg-blue-600 hover:bg-blue-800 cursor-pointer" onClick={() => browseReport(userId)} > <Tooltip placement='top' disableInteractive title="View / Explore Report"><CalendarViewDayRoundedIcon sx={{ width: '16px' }} /></Tooltip></span>
        <span className="badge bg-blue-600 hover:bg-blue-800 cursor-pointer" onClick={() => generateReport(userId)} > <Tooltip placement='top' disableInteractive title="Generate / Download Report">
            {reportLoading && reportLoading.userId === userId ? <CircularProgress sx={{ width: '16px' }} /> : <FileDownloadRoundedIcon
                sx={{ width: '16px' }} />}
        </Tooltip>
        </span>
    </span>
        :
        <span className='flex items-center font-semibold'>
            <span className="badge bg-danger mr-2"><Tooltip placement='top' disableInteractive title="Report Not-Submitted"><CancelRoundedIcon sx={{ width: '16px' }} /></Tooltip></span>

            <span className="badge mr-2 bg-[#0d6efd6b] cursor-default">
                <Tooltip placement='top' disableInteractive title="View / Explore Report">
                    <CalendarViewDayRoundedIcon sx={{ width: '16px' }} /></Tooltip></span>
            <span className="badge bg-[#0d6efd6b] cursor-default"> <Tooltip placement='top' disableInteractive title="Generate / Download Report"><FileDownloadRoundedIcon sx={{ width: '16px' }} /></Tooltip> </span>
        </span>
}

const TotalTile = ({ year, dashboardCount, dashboardKey, title, user }) => {
    return <div id="alert-border-1" className={`flex flex-auto items-start p-4 mb-4 border-t-4 ${user ? 'border-[#deb66f] bg-[#f1f3f4] text-[#ae7e28]' : 'border-blue-300 bg-blue-50 text-blue-800'}  dark:text-blue-400 dark:bg-gray-800 dark:border-blue-800`} role="alert">
        <TaskRoundedIcon sx={{ fontSize: '40px' }} />
        <div className="ml-3 text-sm font-medium">
            <p className="font-extrabold text-2xl">{dashboardCount && dashboardCount?.[dashboardKey] || 0}</p>
            <p>{title} for {year}</p>
        </div>
    </div>
}
