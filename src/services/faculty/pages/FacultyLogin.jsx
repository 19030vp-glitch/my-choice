import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setActive } from '../../../redux/slices/ActiveSlice';
import { setPage } from '../../../redux/slices/NavbarSlice';
import { setUser } from '../../../redux/slices/UserSlice';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import useAuth from '../../../hooks/useAuth';
import CredInput from '../../../inputs/CredInput';
import CredButton from '../../../inputs/CredButton';
import CredHeading from '../../../inputs/CredHeading';
import CredSkeleton from '../../../components/CredSkeleton';
import title from '../../../js/title';
import siteLinks from '../../../components/siteLinks';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { IconButton } from '@mui/material';
import { api } from '../../../js/api';

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useAuth()
    title("Faculty Login")
    const [isLoading, setIsLoading] = useState(false)
    const [facultyType, setFacultyType] = useState(null)
    const [step, setStep] = useState(1)

    const linkLine = step === 1 ? null : <p className='text-center'>
        {/* Don't have an account ? <Link to={facultyType === 'Regular' ? siteLinks.facultyRegistration.link : siteLinks.contractualFacultyRegistration.link} className='cursor-pointer hover:text-blue-900 text-blue-600'>Register Now</Link> |  */}
        <Link to={siteLinks.facultyPasswordReset.link} className='cursor-pointer hover:text-blue-900 text-blue-600'>Forgot Password</Link> </p>

    // handle submit
    function handleSubmit(e) {
        e.preventDefault()
        setIsLoading(true)
        Axios.post(`${api}/api/auth/login`, { username, password, facultyType }).then(function (res) {
            if (res.data.status === 'ok') {
                dispatch(setUser(res.data.user))
                localStorage.setItem('faculty-token', res.data.token)
                dispatch(setActive('profile'));
                dispatch(setPage('profile'));
                navigate('/faculty')
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

        <CredSkeleton bred={[siteLinks.welcome, siteLinks.facultyLogin]} onSubmit={step === 2 && handleSubmit} linkLine={linkLine} head={<CredHeading spacing="mb-3 mt-6" icon={<PersonRoundedIcon className='text-orange-700' />} title="Faculty Login" />}>

            {
                step === 2 && <div className='float-left'><IconButton onClick={() => { setStep(1) }}><ArrowBackRoundedIcon /></IconButton></div>
            }

            {
                step === 1 && <div>
                    <p className="text-center my-3">Choose Teacher Type</p>
                    <div className="flex lg:flex-row flex-col items-stretch justify-center gap-2">
                        <button className={`bg-blue-600 text-white rounded-lg hover:bg-blue-700 ease-in-out 
            duration-200 p-3`} onClick={() => { setFacultyType('Regular'); setStep(2) }}>Permanent Teacher</button>
                        <button className={`bg-blue-600 text-white rounded-lg hover:bg-blue-700 ease-in-out 
            duration-200 p-3`} onClick={() => { setFacultyType('UF Teacher'); setStep(2) }}>University Fund Teacher</button>
                        <button className={`bg-blue-600 text-white rounded-lg hover:bg-blue-700 ease-in-out 
            duration-200 p-3`} onClick={() => { setFacultyType('Contractual'); setStep(2) }}>Contractual Teacher</button>
                    </div>


                </div>
            }

            {
                step === 2 &&
                <>
                    {
                        facultyType === 'Regular' ? <>
                            <CredInput state={username} setState={setUsername} prefix={true} placeholder="Enter 4 digit Employee ID" type="number" spacing="mb-2" />
                            <CredInput state={password} setState={setPassword} placeholder="Enter Password" type="password" spacing="mb-3" />
                            <CredButton title="Login" isLoading={isLoading} />
                        </>
                            :
                            facultyType === 'UF Teacher' ? <>
                                <CredInput state={username} setState={setUsername} prefix={true} placeholder="Enter 4 digit User ID" type="number" spacing="mb-2" prefixLetter="UFTG" />
                                <CredInput state={password} setState={setPassword} placeholder="Enter Password" type="password" spacing="mb-3" />
                                <CredButton title="Login" isLoading={isLoading} />
                            </>
                                :
                                <>
                                    <CredInput state={username} setState={setUsername} prefix={true} placeholder="Enter 3 digit User ID" type="number" spacing="mb-2" prefixLetter="C" />
                                    <CredInput state={password} setState={setPassword} placeholder="Enter Password" type="password" spacing="mb-3" />
                                    <CredButton title="Login" isLoading={isLoading} />
                                </>
                    }
                </>
            }





        </CredSkeleton>



    )
}

export default Login