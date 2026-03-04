import React from 'react'
import CredSkeleton from '../../../components/CredSkeleton'
import CredInput from '../../../inputs/CredInput'
import CredButton from '../../../inputs/CredButton'
import siteLinks from '../../../components/siteLinks';
import CredHeading from '../../../inputs/CredHeading';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import title from '../../../js/title';
import { setNSSUser } from '../../../redux/slices/UserSlice';
import { useDispatch } from 'react-redux';
import serviceLoginHandler from '../../dsd/js/serviceLoginHandler';
import useOtherServiceAuth from '../../../hooks/useOtherServiceAuth';
import authParamsObject from '../../../js/authParamsObject';


let nssLogo = <img src="/assets/nsslogo.png" height="22px" width="22px" alt="nss" />


const NSSLogin = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    title(siteLinks.nssLogin.title)
    useOtherServiceAuth(authParamsObject.nss)



    const handleSubmit = (e) => {
        e.preventDefault();
        serviceLoginHandler({ email: username, password, model: "NSSUser", setUser: setNSSUser, navigate, navigationLink: siteLinks.nssHome.link, tokenName: "nss-token", setIsLoading, dispatch })
    }


    return (
        <div>
            <CredSkeleton bred={[siteLinks.welcome, siteLinks.nssLogin]} onSubmit={handleSubmit} linkLine={null} head={<CredHeading spacing="mb-3 mt-6" icon={nssLogo}
                title="NSS Login" />}>

                <CredInput state={username} setState={setUsername} placeholder="Enter Email ID" type="text" spacing="mb-2" size={39} />

                <CredInput state={password} setState={setPassword} placeholder="Enter Password" type="password" spacing="mb-3" />

                <CredButton title="Login" isLoading={isLoading} />

            </CredSkeleton>
        </div>
    )
}

export default NSSLogin

