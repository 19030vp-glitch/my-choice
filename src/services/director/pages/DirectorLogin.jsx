import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setDirectorUser } from '../../../redux/slices/UserSlice';
import LocalLibraryRoundedIcon from '@mui/icons-material/LocalLibraryRounded';
import useDirectorAuth from '../../../hooks/useDirectorAuth';
import useScroll from '../../../hooks/useScroll';
import DeptSelect from '../../../inputs/DeptSelect';
import CredSkeleton from '../../../components/CredSkeleton';
import CredInput from '../../../inputs/CredInput';
import CredButton from '../../../inputs/CredButton';
import CredHeading from '../../../inputs/CredHeading';
import title from '../../../js/title';
import siteLinks from '../../../components/siteLinks';
import { api } from '../../../js/api';


const DirectorLogin = () => {
    title("Director Login")

    const [department, setDepartment] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)

    useDirectorAuth(false)
    useScroll()

    // handle submit
    function handleSubmit(e) {
        e.preventDefault()
        setIsLoading(true)
        Axios.post(`${api}/api/auth/director-login`, { department, password }).then(function (res) {
            if (res.data.status === 'ok') {
                console.log('Director :', res.data.user)
                dispatch(setDirectorUser(res.data.user))
                localStorage.setItem('director-token', res.data.token)
                navigate('/director')
                toast.success('Logged in successfully')
                setIsLoading(false)
            }
            else if (res.data.status === 'notok') {
                toast.error(res.data.message)
                setIsLoading(false)
            }
            else {
                toast.error('Something went wrong while loggin in')
                setIsLoading(false)
            }
        }).catch(function (err) {
            toast.error('Something went wrong')
            setIsLoading(false)
        })

    }

    const linkLine = <p className='text-center'>Not Registered? <Link to="/director-registration" className='cursor-pointer hover:text-blue-900 text-blue-600'>Register Now</Link> | <Link to={siteLinks.directorPasswordReset.link} className='cursor-pointer hover:text-blue-900 text-blue-600'>Forgot Password</Link> </p>

    return <>

        <CredSkeleton bred={[siteLinks.welcome, siteLinks.directorLogin]} linkLine={linkLine}
            head={<CredHeading title="Director Login" spacing="my-3" icon={<LocalLibraryRoundedIcon className='text-orange-700' />} />}
            onSubmit={handleSubmit} >
            <DeptSelect title={''} setState={setDepartment} state={department} selectId="registerDept" classes='p-3 rounded-lg mb-2' />
            <CredInput size="40" state={password} setState={setPassword} placeholder="Enter Password" type="password" spacing="mb-3" />
            <CredButton title="Login" isLoading={isLoading} />
        </CredSkeleton>

    </>
}

export default DirectorLogin