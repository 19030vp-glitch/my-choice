import { LinearProgress } from '@mui/material'
import React from 'react'

const ReportLoading = ({ loading }) => {
    return (
        <>
            <p className='text-center mb-3 text-gray-500'>{loading.title ? loading.title : "Generating Report"}, Please wait...</p>
            <LinearProgress />
        </>
    )
}

export default ReportLoading
