import React from 'react'
import CredSkeleton from '../../../components/CredSkeleton'
import CredInput from '../../../inputs/CredInput'
import CredButton from '../../../inputs/CredButton'
import SportsHandballRoundedIcon from '@mui/icons-material/SportsHandballRounded';
import siteLinks from '../../../components/siteLinks';
import CredHeading from '../../../inputs/CredHeading';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import title from '../../../js/title'
import { useDispatch } from 'react-redux';
import useOtherServiceAuth from '../../../hooks/useOtherServiceAuth';
import { setSportsUser } from '../../../redux/slices/UserSlice';
import serviceLoginHandler from '../../dsd/js/serviceLoginHandler';
import { sportsAuthParams } from './SportsHome';
import authParamsObject from '../../../js/authParamsObject';


const SportsLogin = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const navigate = useNavigate()
    title(siteLinks.sportsLogin.title)

    const dispatch = useDispatch()
    useOtherServiceAuth(authParamsObject.sports)

    const handleSubmit = (e) => {
        e.preventDefault();
        serviceLoginHandler({ email: username, password, model: "SportsUser", setUser: setSportsUser, navigate, navigationLink: siteLinks.sportsHome.link, tokenName: "sports-token", setIsLoading, dispatch })
    }





    return (
        <div>
            <CredSkeleton bred={[siteLinks.welcome, siteLinks.sportsLogin]} onSubmit={handleSubmit} linkLine={null} head={<CredHeading spacing="mb-3 mt-6" icon={<SportsHandballRoundedIcon className="text-orange-700" />}
                title={siteLinks.sportsLogin.title} />}>

                <CredInput state={username} setState={setUsername} placeholder="Enter Email ID" type="text" spacing="mb-2" size={39} />

                <CredInput state={password} setState={setPassword} placeholder="Enter Password" type="password" spacing="mb-3" />

                <CredButton title="Login" isLoading={isLoading} />

            </CredSkeleton>
        </div>
    )
}

export default SportsLogin
