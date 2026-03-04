import React from 'react'
import CredSkeleton from '../../../components/CredSkeleton'
import CredInput from '../../../inputs/CredInput'
import CredButton from '../../../inputs/CredButton'
import Groups3RoundedIcon from '@mui/icons-material/Groups3Rounded';
import siteLinks from '../../../components/siteLinks';
import CredHeading from '../../../inputs/CredHeading';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import title from '../../../js/title'
import { useDispatch } from 'react-redux';
import useOtherServiceAuth from '../../../hooks/useOtherServiceAuth';
import { setSkillUser } from '../../../redux/slices/UserSlice';
import serviceLoginHandler from '../../dsd/js/serviceLoginHandler';
import { skillsAuthParams } from './SkillsHome';


const SkillLogin = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const navigate = useNavigate()
    title(siteLinks.skillLogin.title)

    const dispatch = useDispatch()
    useOtherServiceAuth(skillsAuthParams)

    const handleSubmit = (e) => {
        e.preventDefault();
        serviceLoginHandler({ email: username, password, model: "SkillUser", setUser: setSkillUser, navigate, navigationLink: siteLinks.skillHome.link, tokenName: "skill-token", setIsLoading, dispatch })
    }





    return (
        <div>
            <CredSkeleton bred={[siteLinks.welcome, siteLinks.skillLogin]} onSubmit={handleSubmit} linkLine={null} head={<CredHeading optimize={true} spacing="mb-3 mt-6" icon={<Groups3RoundedIcon className="text-orange-700" sx={{fontSize:"30px"}} />}
                title={siteLinks.skillLogin.title} />}>

                <CredInput state={username} setState={setUsername} placeholder="Enter Email ID" type="text" spacing="mb-2" size={39} />

                <CredInput state={password} setState={setPassword} placeholder="Enter Password" type="password" spacing="mb-3" />

                <CredButton title="Login" isLoading={isLoading} />

            </CredSkeleton>
        </div>
    )
}

export default SkillLogin
