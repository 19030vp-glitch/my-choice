import CredSkeleton from '../../../components/CredSkeleton'
import CredInput from '../../../inputs/CredInput'
import CredButton from '../../../inputs/CredButton'
import siteLinks from '../../../components/siteLinks';
import CredHeading from '../../../inputs/CredHeading';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import title from '../../../js/title';
import { setUSHAUser } from '../../../redux/slices/UserSlice';
import { useDispatch } from 'react-redux';
import useOtherServiceAuth from '../../../hooks/useOtherServiceAuth';
import authParamsObject from '../../../js/authParamsObject';
import serviceLoginHandler from '../../dsd/js/serviceLoginHandler';
import serverLinks from '../../../js/serverLinks';

const ushaLogo = <img src={serverLinks.showFile("pm-usha.png", 'usha')} height="35px" width="35px" alt="nss" />


const USHALogin = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    title(siteLinks.ushaLogin.title)
    useOtherServiceAuth(authParamsObject.usha)

    const handleSubmit = (e) => {
        e.preventDefault();
        serviceLoginHandler({ email: username, password, model: "USHAUser", setUser: setUSHAUser, navigate, navigationLink: siteLinks.ushaHome.link, tokenName: "usha-token", setIsLoading, dispatch })
    }


    return (
        <div>

            <CredSkeleton bred={[siteLinks.welcome, siteLinks.ushaLogin]} onSubmit={handleSubmit} linkLine={null} head={<CredHeading spacing="mb-3 mt-6" icon={ushaLogo}
                title={siteLinks.ushaLogin.title} />}>


                <CredInput state={username} setState={setUsername} placeholder="Enter Username" type="text" spacing="mb-2" size={39} />

                <CredInput state={password} setState={setPassword} placeholder="Enter Password" type="password" spacing="mb-3" />

                <CredButton title="Login" isLoading={isLoading} />


            </CredSkeleton>
        </div>
    )
}

export default USHALogin

