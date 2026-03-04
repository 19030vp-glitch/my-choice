import React from 'react';
import ShortcutRoundedIcon from '@mui/icons-material/ShortcutRounded';
import toast from 'react-hot-toast';
import { Button } from '@mui/material';

const ShareLink = ({ linkToNavigate, title }) => {

    const copyLink = () => {
        const link = `${process.env.REACT_APP_REPORT_URL}/${linkToNavigate}`
        navigator.clipboard.writeText(link)
        toast.success('Link copied successfully')
    }

    return <Button variant='contained' className='flex items-center gap-2 bg-green-50 text-green-800 p-2 rounded-full border-2 border-green-600' onClick={copyLink} style={{ textTransform: 'none' }} >
        <ShortcutRoundedIcon sx={{ fontSize: '20px' }} /> {title || "Share this module"}
    </Button>
}

export default ShareLink