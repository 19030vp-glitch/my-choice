import React from 'react'
import CredSkeleton from '../../../components/CredSkeleton'
import CredInput from '../../../inputs/CredInput'
import CredButton from '../../../inputs/CredButton'
import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded';
import siteLinks from '../../../components/siteLinks';
import CredHeading from '../../../inputs/CredHeading';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import title from '../../../js/title';
import serviceLoginHandler from '../js/serviceLoginHandler';
import { setDSDUser } from '../../../redux/slices/UserSlice';
import { useDispatch } from 'react-redux';
import useOtherServiceAuth from '../../../hooks/useOtherServiceAuth';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { IconButton } from '@mui/material';
import authParamsObject from '../../../js/authParamsObject';



const DSDLogin = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    title(siteLinks.dsdLogin.title)
    useOtherServiceAuth(authParamsObject.dsd)
    const [step, setStep] = useState(1)
    const [userType, setUserType] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault();
        serviceLoginHandler({ email: username, password, model: "DSDUser", setUser: setDSDUser, navigate, navigationLink: siteLinks.dsdHome.link, tokenName: "dsd-token", setIsLoading, dispatch })
    }

    console.log(step)


    return (
        <div>

            <CredSkeleton bred={[siteLinks.welcome, siteLinks.dsdLogin]} onSubmit={handleSubmit} linkLine={null} head={<CredHeading spacing="mb-3 mt-6" icon={<AutoGraphRoundedIcon className="text-orange-700" />}
                title={siteLinks.dsdLogin.title} />}>


                {
                    step === 2 && <div className='float-left'><IconButton onClick={() => { setStep(1) }}><ArrowBackRoundedIcon /></IconButton></div>
                }

                {
                    step === 1 && <div>
                        <p className="text-center my-3">Choose Teacher Type</p>
                        <div className="flex lg:flex-row flex-col items-stretch justify-center gap-2">
                            <button className={`bg-blue-600 text-white rounded-lg hover:bg-blue-700 ease-in-out 
            duration-200 p-3`} onClick={() => { setUserType('DSD'); setStep(2) }}>Director of DSD Login</button>
                            <button className={`bg-blue-600 text-white rounded-lg hover:bg-blue-700 ease-in-out 
            duration-200 p-3`} onClick={() => { setUserType('YF'); setStep(2) }}>College Youth Festival</button>

                        </div>


                    </div>
                }

                {
                    (step === 2 && userType === 'DSD') ? <>
                        <CredInput state={username} setState={setUsername} placeholder="Enter your email" type="text" spacing="mb-2" size={39} />

                        <CredInput state={password} setState={setPassword} placeholder="Enter Password" type="password" spacing="mb-3" />

                        <CredButton title="Login" isLoading={isLoading} />
                    </> : (userType === 'YF' && step === 2) && <div className='flex flex-col justify-center items-center gap-2'>
                        <button className={`bg-blue-600 text-white rounded-lg hover:bg-blue-700 ease-in-out 
            duration-200 p-3`} onClick={() => { navigate(siteLinks.yfCollegeLogin.link) }}>Youth Festival College Login</button>
                        <button className={`bg-blue-600 text-white rounded-lg hover:bg-blue-700 ease-in-out 
            duration-200 p-3`} onClick={() => { navigate(siteLinks.yfCollegeRegistration.link) }}>Youth Festival College Registration</button>
                    </div>
                }
            </CredSkeleton>
        </div>
    )
}

export default DSDLogin

