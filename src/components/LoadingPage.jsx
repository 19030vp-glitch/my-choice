import { CircularProgress } from '@mui/material';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import siteLinks from './siteLinks';

const LoadingPage = () => {

    const user = useSelector(state => state.user.user);
    const navigate = useNavigate()
    const { url } = useParams();

    useEffect(() => {

        if (url === siteLinks.facultyLogin.link) {
            if (user) {
                navigate(siteLinks.facultyProfile.link)
            }
            else {
                navigate(siteLinks.facultyLogin.link)
            }
        } else if (url === 'admin-login') {
            const token = localStorage.getItem('admin-token')
            if (token) {
                navigate('/admin/dashboard')
            }
            else {
                navigate('/admin-login')
            }
        }
    }, [])

    return (
        <div className="w-full h-screen ">
            <div className='flex items-center justify-center h-1/2'>
                <CircularProgress />
            </div>
        </div>
    )
}

export default LoadingPage