import { Avatar } from '@mui/material'
import React from 'react'
import serverLinks from '../../../js/serverLinks'

const ShowImage = ({ fileName, serviceName }) => {
    return (
        <Avatar src={serverLinks.showFile(fileName, serviceName)} sx={{ width: 90, height: 90, borderRadius: '50%', border: '2px solid #2563eb' }} />
    )
}

export default ShowImage