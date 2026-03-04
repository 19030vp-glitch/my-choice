import React from 'react'
import CredSkeleton from '../../../components/CredSkeleton'
import CredInput from '../../../inputs/CredInput'
import CredButton from '../../../inputs/CredButton'
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import siteLinks from '../../../components/siteLinks';
import CredHeading from '../../../inputs/CredHeading';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import title from '../../../js/title'
import { useDispatch } from 'react-redux';
import useOtherServiceAuth from '../../../hooks/useOtherServiceAuth';
import { setSwayamUser } from '../../../redux/slices/UserSlice';
import serviceLoginHandler from '../../dsd/js/serviceLoginHandler';
import { swayamAuthParams } from './SwayamHome';


const SwayamLogin = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const navigate = useNavigate()
    title(siteLinks.swayamLogin.title)

    const dispatch = useDispatch()
    useOtherServiceAuth(swayamAuthParams)

    const handleSubmit = (e) => {
        e.preventDefault();
        serviceLoginHandler({ email: username, password, model: "SwayamUser", setUser: setSwayamUser, navigate, navigationLink: siteLinks.swayamHome.link, tokenName: "swayam-token", setIsLoading, dispatch })
    }





    return (
        <div>
            <CredSkeleton bred={[siteLinks.welcome, siteLinks.swayamLogin]} onSubmit={handleSubmit} linkLine={null} head={<CredHeading optimize={true} spacing="mb-3 mt-6" icon={<SchoolRoundedIcon className="text-orange-700" sx={{ fontSize: "30px" }} />}
                title={siteLinks.swayamLogin.title} />}>

                <CredInput state={username} setState={setUsername} placeholder="Enter Email ID" type="text" spacing="mb-2" size={39} />

                <CredInput state={password} setState={setPassword} placeholder="Enter Password" type="password" spacing="mb-3" />

                <CredButton title="Login" isLoading={isLoading} />

            </CredSkeleton>
        </div>
    )
}

export default SwayamLogin
