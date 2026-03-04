import { CircularProgress } from '@mui/material'
import React from 'react'

const UserLoading = ({ title }) => {
    return (
        <div className="flex flex-col items-center justify-center mt-5">
            <CircularProgress />
            <p className='text-muted mt-2'>{title}, Please Wait...</p>
        </div>
    )
}

export default UserLoading