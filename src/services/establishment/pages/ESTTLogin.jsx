import React from 'react'
import CredSkeleton from '../../../components/CredSkeleton'
import CredInput from '../../../inputs/CredInput'
import CredButton from '../../../inputs/CredButton'
import GppGoodIcon from '@mui/icons-material/GppGood';
import siteLinks from '../../../components/siteLinks';
import CredHeading from '../../../inputs/CredHeading';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import title from '../../../js/title';
import useOtherServiceAuth from '../../../hooks/useOtherServiceAuth';
import { setESTTUser } from '../../../redux/slices/UserSlice';
import { useDispatch } from 'react-redux';
import serviceLoginHandler from '../../dsd/js/serviceLoginHandler';
import authParamsObject from '../../../js/authParamsObject';


const ESTTLogin = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const navigate = useNavigate()
    title(siteLinks.esttLogin.title)
    const dispatch = useDispatch()
    useOtherServiceAuth(authParamsObject.estt)



    const handleSubmit = (e) => {
        e.preventDefault();
        serviceLoginHandler({ email: username, password, model: "ESTTUser", setUser: setESTTUser, navigate, navigationLink: siteLinks.esttHome.link, tokenName: "estt-token", setIsLoading, dispatch })
    }





    return (
        <div>
            <CredSkeleton bred={[siteLinks.welcome, siteLinks.esttLogin]} onSubmit={handleSubmit} linkLine={null} head={<CredHeading spacing="mb-3 mt-6" icon={<GppGoodIcon className="text-orange-700" />}
                title={siteLinks.esttLogin.title} />}>

                <CredInput state={username} setState={setUsername} placeholder="Enter username" type="text" spacing="mb-2" size={39} />

                <CredInput state={password} setState={setPassword} placeholder="Enter Password" type="password" spacing="mb-3" />

                <CredButton title="Login" isLoading={isLoading} />

            </CredSkeleton>
        </div>
    )
}

export default ESTTLogin
