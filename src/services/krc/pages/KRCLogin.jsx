import React from 'react'
import CredSkeleton from '../../../components/CredSkeleton'
import CredInput from '../../../inputs/CredInput'
import CredButton from '../../../inputs/CredButton'
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import siteLinks from '../../../components/siteLinks';
import CredHeading from '../../../inputs/CredHeading';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import title from '../../../js/title';
import useOtherServiceAuth from '../../../hooks/useOtherServiceAuth';
import { setKRCUser } from '../../../redux/slices/UserSlice';
import { useDispatch } from 'react-redux';
import serviceLoginHandler from '../../dsd/js/serviceLoginHandler';
import authParamsObject from '../../../js/authParamsObject';


const KRCLogin = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const navigate = useNavigate()
    title(siteLinks.krcLogin.title)
    const dispatch = useDispatch()
    useOtherServiceAuth(authParamsObject.krc)



    const handleSubmit = (e) => {
        e.preventDefault();
        serviceLoginHandler({ email: username, password, model: "KRCUser", setUser: setKRCUser, navigate, navigationLink: siteLinks.krcHome.link, tokenName: "krc-token", setIsLoading, dispatch })
    }





    return (
        <div>
            <CredSkeleton bred={[siteLinks.welcome, siteLinks.krcLogin]} onSubmit={handleSubmit} linkLine={null} head={<CredHeading spacing="mb-3 mt-6" icon={<AutoStoriesRoundedIcon className="text-orange-700" />}
                title={siteLinks.krcLogin.title} />}>

                <CredInput state={username} setState={setUsername} placeholder="Enter Email ID" type="text" spacing="mb-2" size={39} />

                <CredInput state={password} setState={setPassword} placeholder="Enter Password" type="password" spacing="mb-3" />

                <CredButton title="Login" isLoading={isLoading} />

            </CredSkeleton>
        </div>
    )
}

export default KRCLogin
