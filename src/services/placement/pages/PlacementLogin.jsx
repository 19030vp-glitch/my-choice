import React from 'react'
import CredSkeleton from '../../../components/CredSkeleton'
import CredInput from '../../../inputs/CredInput'
import CredButton from '../../../inputs/CredButton'
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import siteLinks from '../../../components/siteLinks';
import CredHeading from '../../../inputs/CredHeading';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import title from '../../../js/title';
import { useDispatch } from 'react-redux';
import { setPlacementUser } from '../../../redux/slices/UserSlice';
import serviceLoginHandler from '../../dsd/js/serviceLoginHandler';
import useOtherServiceAuth from '../../../hooks/useOtherServiceAuth';
import authParamsObject from '../../../js/authParamsObject';


const DSDLogin = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const navigate = useNavigate()
    title(siteLinks.placementLogin.title)
    const dispatch = useDispatch()
    useOtherServiceAuth(authParamsObject.tpo)

    const handleSubmit = (e) => {
        e.preventDefault();
        serviceLoginHandler({ email: username, password, model: "PlacementUser", setUser: setPlacementUser, navigate, navigationLink: siteLinks.placementHome.link, tokenName: "placement-token", setIsLoading, dispatch })
    }

    return (
        <div>
            <CredSkeleton bred={[siteLinks.welcome, siteLinks.placementLogin]} onSubmit={handleSubmit} linkLine={null} head={<CredHeading spacing="mb-3 mt-6" icon={<DirectionsRunIcon className="text-orange-700" />}
                title={siteLinks.placementLogin.title} />}>

                <CredInput state={username} setState={setUsername} placeholder="Enter Email ID" type="text" spacing="mb-2" size={39} />

                <CredInput state={password} setState={setPassword} placeholder="Enter Password" type="password" spacing="mb-3" />

                <CredButton title="Login" isLoading={isLoading} />

            </CredSkeleton>
        </div>
    )
}

export default DSDLogin

