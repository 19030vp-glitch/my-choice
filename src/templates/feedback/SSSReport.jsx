import React from 'react'
import ChartsPieGenerator from '../../services/feedback/analysis/ChartsPieGenerator'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { getSSSAnalytics } from '../../services/feedback/js/getFeedbackData'

const SSSReport = () => {

    const { schoolName, academicYear } = useParams()

    const { data: analytics } = useQuery('GETSSSReportdata', () => getSSSAnalytics(schoolName, academicYear),)
    return (
        <div>
            <p className="text-center mt-3 font-bold text-3xl">Student Satisfaction Survey Analysis for</p>
            <p className="text-center mb-3 font-bold text-xl">{schoolName} {`(${academicYear})`}</p>
            {analytics?.data?.data && <ChartsPieGenerator forReport={true} analytics={analytics?.data?.data} />}
        </div>
    )
}

export default SSSReport
