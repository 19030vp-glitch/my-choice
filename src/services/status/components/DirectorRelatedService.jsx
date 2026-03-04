import React, { useEffect } from 'react'
import { generateAAAReport, getTotalAAAData } from '../../director/reports/academic-audit/components/audit-services'
import { getTotalDirectorAQARData } from '../../director/reports/aqar/js/getAQARData'
import { useState } from 'react'
import { academicYearGenerator } from '../../../inputs/Year'
import UserLoading from '../../../pages/UserLoading'
import { getReportInfo } from '../../../js/submitReportForm'
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import ReportLoading from '../../../components/ReportLoading'
import CalendarViewDayRoundedIcon from '@mui/icons-material/CalendarViewDayRounded';


const DirectorRelatedService = ({ year, serviceName, school }) => {

    const [serviceDataFromServer, setServiceDataFromServer] = useState(null)
    const [candidates, setCandidates] = useState(null)

    const [serviceLoading, setServiceLoading] = useState(false)
    const [reportLoading, setReportLoading] = useState(false)

    useEffect(() => {
        setCandidates(null)
        setServiceDataFromServer(null)

        if (serviceName === 'AAA') {
            getReportInfo('AAAModel', setServiceDataFromServer, setServiceLoading, 'director')
        } else if (serviceName === 'Director AQAR') {
            getReportInfo('DirectorAQARModel', setServiceDataFromServer, setServiceLoading, 'director')
        }
    }, [serviceName])

    useEffect(() => {
        setCandidates([])
        if (serviceDataFromServer?.length > 0) {
            serviceDataFromServer.forEach((serviceItem) => {
                if (serviceItem.schoolName === school) {
                    setCandidates(() => serviceItem?.submitted ? serviceItem.submitted : [])
                    return
                }
            })
        }
    }, [serviceDataFromServer, year, serviceName, school])

    const generateReport = (aaaYear) => {
        if (serviceName === "AAA") {
            let userData = { department: school }
            setReportLoading({ isLoading: true, title: 'Generating AAA Report' });
            generateAAAReport(userData, [aaaYear], setReportLoading)
        }
    }


    const browseReport = (year) => {
        if (serviceName === "AAA") {
            let link = `${process.env.REACT_APP_REPORT_URL}/report/AAAReport/${school}/${JSON.stringify([year])}`
            window.open(link, '_blank')
        }
    }

    return (
        <div>
            {
                !serviceLoading ? <div>

                    {
                        candidates && <div>
                            {(reportLoading && reportLoading.title.includes(serviceName)) && <div className="my-2">
                                <ReportLoading loading={reportLoading} />
                            </div>}
                            <p className='my-2 bg-[#f5f5f5] border text-black p-2 rounded-md'><b>{school}</b> submitted <b>{candidates?.length ? candidates?.length : 0}</b> years of {serviceName} data</p>

                            <div className="mt-2">
                                <ul className="list-group list-group-flush">

                                    {
                                        (candidates && candidates?.length > 0) ? candidates?.map((yearItem, index) => {
                                            return <li className='flex items-center justify-start gap-5 list-group-item'>
                                                <span> {index + 1}. <b className='ml-3'>{yearItem}</b></span>
                                                <span className='flex items-center font-semibold'>
                                                    <span className="badge bg-success mr-2 p-[10px] cursor-default">Submitted</span>
                                                    <span className="badge mr-2 bg-blue-600 hover:bg-blue-800 cursor-pointer" onClick={() => browseReport(yearItem)} > <CalendarViewDayRoundedIcon sx={{ width: '16px' }} /> View Report</span>
                                                    <span className="badge bg-blue-600 hover:bg-blue-800 cursor-pointer" onClick={() => generateReport(yearItem)} > <FileDownloadRoundedIcon sx={{ width: '16px' }} /> Download Report</span>
                                                </span>
                                            </li>
                                        }) : <div>
                                            <p className='py-3 text-red-600 text-center'>No {serviceName} data submitted yet. </p>
                                        </div>
                                    }
                                </ul>
                            </div>
                        </div>
                    }
                </div> : <UserLoading title={`Fetching ${serviceName} Data`} />
            }
        </div>
    )
}

export default DirectorRelatedService
