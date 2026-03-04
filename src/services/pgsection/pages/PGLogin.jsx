import React from 'react'
import CredSkeleton from '../../../components/CredSkeleton'
import CredInput from '../../../inputs/CredInput'
import CredButton from '../../../inputs/CredButton'
import GppGoodIcon from '@mui/icons-material/GppGood';
import siteLinks from '../../../components/siteLinks';
import CredHeading from '../../../inputs/CredHeading';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import title from '../../../js/title';
import useOtherServiceAuth from '../../../hooks/useOtherServiceAuth';
import { krcAuthParams, pgAuthParams } from './PGHome';
import { setPGUser } from '../../../redux/slices/UserSlice';
import { useDispatch } from 'react-redux';
import serviceLoginHandler from '../../dsd/js/serviceLoginHandler';


const PGLogin = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const navigate = useNavigate()
    title(siteLinks.pgLogin.title)
    const dispatch = useDispatch()
    useOtherServiceAuth(pgAuthParams)



    const handleSubmit = (e) => {
        e.preventDefault();
        serviceLoginHandler({ email: username, password, model: "PGUser", setUser: setPGUser, navigate, navigationLink: siteLinks.pgHome.link, tokenName: "pg-token", setIsLoading, dispatch })
    }





    return (
        <div>
            <CredSkeleton bred={[siteLinks.welcome, siteLinks.pgLogin]} onSubmit={handleSubmit} linkLine={null} head={<CredHeading spacing="mb-3 mt-6" icon={<GppGoodIcon className="text-orange-700" />}
                title={siteLinks.pgLogin.title} />}>

                <CredInput state={username} setState={setUsername} placeholder="Enter username" type="text" spacing="mb-2" size={39} />

                <CredInput state={password} setState={setPassword} placeholder="Enter Password" type="password" spacing="mb-3" />

                <CredButton title="Login" isLoading={isLoading} />

            </CredSkeleton>
        </div>
    )
}

export default PGLogin
