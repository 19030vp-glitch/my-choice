import { Skeleton } from '@mui/material'
import React from 'react'

const USHADashboardSkeleton = () => {
    return (
        <div className='mt-4 space-y-4'>
            <div className='flex items-start justify-between gap-4'>
                <Skeleton className='flex-1 rounded-lg' variant="rectangular" width="55%">
                    <div style={{ height: '40vh' }} />
                </Skeleton>
                <Skeleton className='rounded-lg' variant="rectangular" width="35%">
                    <div style={{ height: '40vh' }} />
                </Skeleton>
            </div>
            <div className='flex items-start justify-between gap-4'>
                <Skeleton className='flex-1 rounded-lg' variant="rectangular" width="55%">
                    <div style={{ height: '40vh' }} />
                </Skeleton>
                <Skeleton className='rounded-lg' variant="rectangular" width="35%">
                    <div style={{ height: '40vh' }} />
                </Skeleton>
            </div>

            <Skeleton className='rounded-lg' variant="rectangular" width="100%">
                <div style={{ height: '40vh' }} />
            </Skeleton>

        </div>
    )
}

export default USHADashboardSkeleton
