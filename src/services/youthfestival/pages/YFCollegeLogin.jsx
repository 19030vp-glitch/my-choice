import React from 'react'
import CredSkeleton from '../../../components/CredSkeleton'
import CredInput from '../../../inputs/CredInput'
import CredButton from '../../../inputs/CredButton'
import DomainAddRoundedIcon from '@mui/icons-material/DomainAddRounded';
import siteLinks from '../../../components/siteLinks';
import CredHeading from '../../../inputs/CredHeading';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { setYouthUser } from '../../../redux/slices/UserSlice';
import Axios from 'axios'
import { useDispatch } from 'react-redux';
import useYouthAuth from '../../../hooks/useYouthAuth';
import title from '../../../js/title';
import { api } from '../../../js/api';


const YFCollegeLogin = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useYouthAuth()
    title(siteLinks.yfCollegeLogin.title)


    // handle submit
    function handleSubmit(e) {
        e.preventDefault()
        setIsLoading(true)
        Axios.post(`${api}/api/auth/youthfestival-login`, { email, password }).then(function (res) {
            if (res.data.status === 'ok') {
                dispatch(setYouthUser(res.data.user))
                localStorage.setItem('youthfestival-token', res.data.token)
                navigate(siteLinks.yfCollegeHome.link, { replace: true })
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
        <div>
            <CredSkeleton bred={[siteLinks.welcome, siteLinks.yfCollegeLogin]} onSubmit={handleSubmit} linkLine={null} head={<CredHeading spacing="mb-3 mt-6" icon={<DomainAddRoundedIcon className='text-orange-700' />}
                title="Youth Festival College Login" />}>

                <CredInput state={email} setState={setEmail} placeholder="Email as Username" type="email" spacing="mb-2" />

                <CredInput state={password} setState={setPassword} placeholder="Enter Password" type="password" spacing="mb-3" />

                <CredButton title="Login" isLoading={isLoading} />

            </CredSkeleton>
        </div>
    )
}

export default YFCollegeLogin

