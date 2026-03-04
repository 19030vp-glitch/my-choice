import Axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setProUser } from '../../../redux/slices/UserSlice';
import CredSkeleton from '../../../components/CredSkeleton'
import siteLinks from '../../../components/siteLinks'
import CredButton from '../../../inputs/CredButton'
import CredHeading from '../../../inputs/CredHeading'
import CredInput from '../../../inputs/CredInput'
import title from '../../../js/title'
import NewspaperRoundedIcon from '@mui/icons-material/NewspaperRounded';
import useProAuth from '../../../hooks/useProAuth'
import { api } from '../../../js/api'

const PROLogin = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    title("PRO Login")
    useProAuth()
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()

    // handle submit
    function handleSubmit(e) {
        e.preventDefault()
        setIsLoading(true)
        Axios.post(`${api}/api/auth/pro-login`, { username, password }).then(function (res) {
            if (res.data.status === 'ok') {
                console.log('Successfully')
                dispatch(setProUser(res.data.user))
                localStorage.setItem('pro-token', res.data.token)
                navigate('/pro')
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

        <CredSkeleton bred={[siteLinks.welcome, siteLinks.proLogin]} onSubmit={handleSubmit} linkLine={null} head={<CredHeading spacing="mb-3 mt-6" icon={<NewspaperRoundedIcon className='text-orange-700' />}
            title="PRO Login" />}>

            <CredInput state={username} setState={setUsername} placeholder="Username" type="text" spacing="mb-2" size={39} />

            <CredInput state={password} setState={setPassword} placeholder="Enter Password" type="password" spacing="mb-3" />

            <CredButton title="Login" isLoading={isLoading} />

        </CredSkeleton>

    )
}

export default PROLogin;
