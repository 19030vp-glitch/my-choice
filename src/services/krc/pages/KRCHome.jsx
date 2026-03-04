import React from 'react'
import useOtherServiceAuth from '../../../hooks/useOtherServiceAuth'
import { setKRCUser } from '../../../redux/slices/UserSlice'
import siteLinks from '../../../components/siteLinks'
import { useNavigate } from 'react-router-dom'
import HomeProfileButtons from '../../dsd/components/HomeProfileButtons'
import HomeProfile from '../../dsd/components/HomeProfile'
import UserLoading from '../../../pages/UserLoading'
import { useSelector } from 'react-redux'
import title from '../../../js/title'
import Footer from '../../../components/Footer'
import authParamsObject from '../../../js/authParamsObject'

const krcAuthParams = authParamsObject.krc

const KRCHome = () => {
    useOtherServiceAuth(krcAuthParams)
    const user = useSelector((state) => state.user.krcUser)
    const bredLinks = [siteLinks.welcome, siteLinks.krcHome]
    const navigate = useNavigate()
    const profileButton1 = <HomeProfileButtons title="Fill AQAR Data" onClick={() => navigate(siteLinks.krcAQAR.link)} />
    title(siteLinks.krcHome.title)
    return (
        <div>
            <div className="min-h-screen">

                {user ?
                    <HomeProfile bredLinks={bredLinks} user={user} setUser={setKRCUser} userType="krc" profileButton1={profileButton1} tokenName="krc-token" />
                    :
                    <UserLoading title="Fetching User Details" />}
            </div>
            <Footer />
        </div>
    )
}

export default KRCHome
