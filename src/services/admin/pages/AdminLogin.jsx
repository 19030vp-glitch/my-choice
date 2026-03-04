import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import LocalPoliceRoundedIcon from '@mui/icons-material/LocalPoliceRounded';
import { setAdminUser } from '../../../redux/slices/UserSlice';
import useAdminAuth from '../../../hooks/useAdminAuth';
import useScroll from '../../../hooks/useScroll';
import CredInput from '../../../inputs/CredInput';
import CredSkeleton from '../../../components/CredSkeleton';
import CredButton from '../../../inputs/CredButton';
import CredHeading from '../../../inputs/CredHeading';
import title from '../../../js/title';
import siteLinks from '../../../components/siteLinks';
import { api } from '../../../js/api';


const AdminLogin = () => {
    title("Admin Login")
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useScroll()
    useAdminAuth(false)

    // handle submit
    function handleSubmit(e) {
        e.preventDefault()

        Axios.post(`${api}/api/auth/admin/login`, { username, password }).then(function (res) {
            if (res.data.status === 'ok') {
                dispatch(setAdminUser(res.data.adminUser))
                localStorage.setItem('admin-token', res.data.token)
                navigate('/admin')
                toast.success('Logged in successfully')
            }
            else if (res.data.status === 'notok') {
                toast.error('Username or password is incorrect')
            }
            else {
                toast.error('Username or password is incorrect')
            }
        }).catch(function (err) {
            toast.error('Something went wrong')
        })

    }

    const bred = [siteLinks.welcome, siteLinks.adminLogin]

    return (
        <>

            <CredSkeleton bred={bred} onSubmit={handleSubmit} head={<CredHeading spacing="mb-3 mt-6" icon={<LocalPoliceRoundedIcon className='text-orange-700' />} title="Admin Login" />}>

                <CredInput state={username} setState={setUsername} placeholder="Enter Username" type="text" spacing="mb-2" />

                <CredInput state={password} size="40" setState={setPassword} placeholder="Enter Password" type="password" spacing="mb-3" />

                <CredButton title="Login" />

            </CredSkeleton>



        </>
    )
}

export default AdminLogin