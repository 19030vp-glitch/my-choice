import { Skeleton, Typography } from '@mui/material'
import React from 'react'
import FacebookLoader from '../services/director/reports/academic-audit/components/FacebookLoader'

const Loader = ({ classes = '' }) => {
    return (
        // <div className={`w-full flex items-center justify-center ${classes}`}>
        //     <div className="flex items-center justify-center flex-col">
        //         <FacebookLoader />
        //         <p className='text-[#0783f7]'>Loading Data...</p>
        //     </div>
        // </div>
        <div className="w-full">
            <Typography variant="h2"><Skeleton /></Typography>
            <Typography variant="h2"><Skeleton /></Typography>
            <Typography variant="h2"><Skeleton /></Typography>
            <Typography variant="h2"><Skeleton /></Typography>
            <Typography variant="h2"><Skeleton /></Typography>
        </div>
    )
}

export default Loader