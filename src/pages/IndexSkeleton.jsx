import { LinearProgress } from '@mui/material'
import React from 'react'

const IndexSkeleton = () => {
    return (
        <div className='flex flex-col items-center justify-center h-[70vh] w-[100vw]'>
            <img src="/assets/logo.png" alt="srtmun" className="h-24 w-24" />
            <div className="mt-4 md:w-[20%] sm:w-[30%] w-[35%] index-skeleton">
                <LinearProgress variant="indeterminate" />
            </div>
            <p className='inline text-xs my-4 font-medium'>Getting SRTMUN-UIMS ready...</p>
        </div>
    )
}

export default IndexSkeleton
