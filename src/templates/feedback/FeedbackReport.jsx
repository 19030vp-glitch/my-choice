import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { getFeedbackData } from '../../services/feedback/js/getFeedbackData'
import UserLoading from '../../pages/UserLoading'
import StudentAnalysis from '../../services/feedback/analysis/StudentAnalysis'
import OtherResponseAnalysis from '../../services/feedback/analysis/OtherResponseAnalysis'
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import { useQuery } from 'react-query';
import { useEffect } from 'react'



const FeedbackReport = () => {

    const { schoolName, academicYear, feedbackUser } = useParams()


    let param = { filter: { schoolName: schoolName, academicYear }, feedbackUser }
    const { data } = useQuery([param.model, param], () => getFeedbackData(param))

    const [chartData, setChartData] = useState(null)


    useEffect(() => {

        if (data?.data?.data) {
            setChartData(() => data?.data?.data?.analysis)
        }
    }, [data])




    return (
        <div>
            <div>
                <p className='mb-3 mt-5 text-lg font-semibold rounded-md text-center flex items-center justify-center gap-3 p-2 bg-blue-800 text-white'> <AnalyticsRoundedIcon /> {feedbackUser} Feedback Analysis for {schoolName} {`(${academicYear})`}</p>

                {!chartData ?
                    <div className='my-5'>
                        <UserLoading title="Analyzing data" />
                    </div>
                    :
                    <div>
                        {(feedbackUser === "Student" && chartData[feedbackUser]) && <div className="mb-5 w-full">
                            <StudentAnalysis forReport={true} showDownloadButtons={false} chartData={chartData[feedbackUser]} schoolName={schoolName} />
                        </div>}

                        {(feedbackUser !== "Student" && chartData[feedbackUser]) && <div className="mb-5">
                            <OtherResponseAnalysis forReport={true} showDownloadButtons={false} questionsWithData={chartData[feedbackUser]} schoolName={schoolName} />
                        </div>}

                    </div>
                }
            </div>


        </div >
    )
}

export default FeedbackReport




