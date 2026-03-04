import React from 'react'
import CredSkeleton from '../../../components/CredSkeleton'
import CredInput from '../../../inputs/CredInput'
import CredButton from '../../../inputs/CredButton'
import ScienceRoundedIcon from '@mui/icons-material/ScienceRounded';
import siteLinks from '../../../components/siteLinks';
import CredHeading from '../../../inputs/CredHeading';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import title from '../../../js/title';
import useOtherServiceAuth from '../../../hooks/useOtherServiceAuth';
import { setIILUser } from '../../../redux/slices/UserSlice';
import { useDispatch } from 'react-redux';
import serviceLoginHandler from '../../dsd/js/serviceLoginHandler';
import authParamsObject from '../../../js/authParamsObject';


const IILLogin = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const navigate = useNavigate()
    title(siteLinks.iilLogin.title)
    const dispatch = useDispatch()
    useOtherServiceAuth(authParamsObject.iil)



    const handleSubmit = (e) => {
        e.preventDefault();
        serviceLoginHandler({ email: username, password, model: "IILUser", setUser: setIILUser, navigate, navigationLink: siteLinks.iilHome.link, tokenName: "iil-token", setIsLoading, dispatch })
    }





    return (
        <div>
            <CredSkeleton bred={[siteLinks.welcome, siteLinks.iilLogin]} onSubmit={handleSubmit} linkLine={null} head={<CredHeading spacing="mb-3 mt-6" icon={<ScienceRoundedIcon className="text-orange-700" />}
                title={siteLinks.iilLogin.title} />}>

                <CredInput state={username} setState={setUsername} placeholder="Enter Email ID" type="text" spacing="mb-2" size={39} />

                <CredInput state={password} setState={setPassword} placeholder="Enter Password" type="password" spacing="mb-3" />

                <CredButton title="Login" isLoading={isLoading} />

            </CredSkeleton>
        </div>
    )
}

export default IILLogin
