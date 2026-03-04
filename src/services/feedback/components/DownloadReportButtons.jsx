import React from 'react'
import PictureAsPdfRoundedIcon from '@mui/icons-material/PictureAsPdfRounded';
import TextSnippetRoundedIcon from '@mui/icons-material/TextSnippetRounded';
import { downloadAnalysisPDF } from '../js/generateFeedbackReport';
import ReportLoading from '../../../components/ReportLoading';
import { useState } from 'react';

const DownloadReportButtons = ({ schoolName, feedbackUser, academicYear, excelClick, customFunction = false, params }) => {

    const [isLoading, setIsLoading] = useState(false)

    const downloadPDFReport = () => {
        if (customFunction) {
            customFunction(params)
        } else {
            setIsLoading({ title: `Generating ${feedbackUser} Feedback Analysis PDF` })
            downloadAnalysisPDF({ schoolName, feedbackUser, academicYear, setIsLoading })
        }

    }



    return (
        <div>

            {
                isLoading && <div className="my-2">
                    <ReportLoading loading={isLoading} />
                </div>
            }


            <div className='flex items-center justify-end gap-3'>
                <button onClick={downloadPDFReport} className='flex items-center justify-start gap-2 rounded-md hover:bg-red-900 p-2 bg-red-800 text-white'>
                    <PictureAsPdfRoundedIcon /> Download Analysis PDF
                </button>
                <button onClick={excelClick} className='flex items-center justify-start gap-2 rounded-md hover:bg-green-900 p-2 bg-green-800 text-white'>
                    <TextSnippetRoundedIcon /> Download Analysis Excel
                </button>
            </div>
        </div>
    )
}

export default DownloadReportButtons
