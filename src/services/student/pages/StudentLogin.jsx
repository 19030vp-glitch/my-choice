import Axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setStudentUser } from '../../../redux/slices/UserSlice';
import CredSkeleton from '../../../components/CredSkeleton'
import siteLinks from '../../../components/siteLinks'
import useStudentAuth from '../../../hooks/useStudentAuth'
import CredButton from '../../../inputs/CredButton'
import CredHeading from '../../../inputs/CredHeading'
import CredInput from '../../../inputs/CredInput'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import title from '../../../js/title'
import {api} from '../../../js/api'

const StudentLogin = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isAlumniLink = window.location.pathname.includes('alumni')

    title(isAlumniLink ? "Alumni Login" : "Student Login")
    useStudentAuth(true, isAlumniLink ? 'alumni' : 'student')
    const [isLoading, setIsLoading] = useState(false)

    const linkLine = <p className='text-center'>Don't have an account? <Link to={isAlumniLink ? siteLinks.alumniRegistration.link : siteLinks.studentRegistration.link} className='cursor-pointer hover:text-blue-900 text-blue-600'>Register Now.</Link> <br />
        <p className='flex items-center justify-center gap-1'>
            <Link to={isAlumniLink ? siteLinks.alumniPasswordReset.link : siteLinks.studentPasswordReset.link} className='cursor-pointer hover:text-blue-900 text-blue-600'>Forgot Password</Link>
            <span className='text-gray-500' >or</span>
            <Link to={isAlumniLink ? siteLinks.studentLogin.link : siteLinks.alumniLogin.link} className='cursor-pointer hover:text-blue-900 text-blue-600'>{isAlumniLink ? "Login as a Student " : "Login as an Alumni"}</Link></p>
    </p>

    // handle submit
    function handleSubmit(e) {
        e.preventDefault()
        setIsLoading(true)
        Axios.post(`${api}/api/auth/student-login`, { username, password, isAlumniLink }).then(function (res) {
            if (res.data.status === 'ok') {
                dispatch(setStudentUser(res.data.user))
                localStorage.setItem(isAlumniLink ? 'alumni-token' : 'student-token', res.data.token)
                navigate(isAlumniLink ? siteLinks.alumniHome.link : siteLinks.studentHome.link)
                toast.success('Logged in successfully')
                setIsLoading(false)
            }
            else if (res.data.status === 'notok') {
                toast.error(res.data.message)
                setIsLoading(false)
            }
            else {
                toast.error('Username or password is incorrect')
                setIsLoading(false)
            }
        }).catch(function (err) {
            toast.error('Something went wrong')
            setIsLoading(false)
        })

    }

    return (

        <CredSkeleton bred={[siteLinks.welcome, isAlumniLink ? siteLinks.alumniLogin : siteLinks.studentLogin]} onSubmit={handleSubmit} linkLine={linkLine} head={<CredHeading spacing="mb-3 mt-6" icon={<PersonRoundedIcon className='text-orange-700' />} title={isAlumniLink ? "Alumni Login" : "Student Login"} />}>

            <CredInput state={username} setState={setUsername} placeholder="Enter Email ID" type="text" spacing="mb-2" size={39} />

            <CredInput state={password} setState={setPassword} placeholder="Enter Password" type="password" spacing="mb-3" />

            <CredButton title="Login" isLoading={isLoading} />

        </CredSkeleton>

    )
}

export default StudentLogin;
