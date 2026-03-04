import React from 'react'
import CredSkeleton from '../../../components/CredSkeleton'
import CredInput from '../../../inputs/CredInput'
import CredButton from '../../../inputs/CredButton'
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import siteLinks from '../../../components/siteLinks';
import CredHeading from '../../../inputs/CredHeading';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import title from '../../../js/title';
import { useDispatch } from 'react-redux';
import { setExamUser } from '../../../redux/slices/UserSlice';
import useOtherServiceAuth from '../../../hooks/useOtherServiceAuth';
import serviceLoginHandler from '../../dsd/js/serviceLoginHandler';
import authParamsObject from '../../../js/authParamsObject';


const ExamLogin = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const navigate = useNavigate()
    title(siteLinks.examLogin.title)

    const dispatch = useDispatch()
    useOtherServiceAuth(authParamsObject.exam)

    const handleSubmit = (e) => {
        e.preventDefault();
        serviceLoginHandler({ email: username, password, model: "ExamUser", setUser: setExamUser, navigate, navigationLink: siteLinks.examHome.link, tokenName: "exam-token", setIsLoading, dispatch })
    }


    return (
        <div>
            <CredSkeleton bred={[siteLinks.welcome, siteLinks.examLogin]} onSubmit={handleSubmit} linkLine={null} head={<CredHeading spacing="mb-3 mt-6" icon={<GroupsRoundedIcon className="text-orange-700" />}
                title={siteLinks.examLogin.title} />}>

                <CredInput state={username} setState={setUsername} placeholder="Enter Email ID" type="text" spacing="mb-2" size={39} />

                <CredInput state={password} setState={setPassword} placeholder="Enter Password" type="password" spacing="mb-3" />

                <CredButton title="Login" isLoading={isLoading} />

            </CredSkeleton>
        </div>
    )
}

export default ExamLogin
