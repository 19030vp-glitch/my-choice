import { LinearProgress } from '@mui/material'
import React from 'react'

const Loading = () => {
    return (
        <div className='mt-3'>
            <p className='text-center mb-3 text-gray-500'>Generating Report, Please wait...</p>
            <LinearProgress />
        </div>
    )
}

export default Loading