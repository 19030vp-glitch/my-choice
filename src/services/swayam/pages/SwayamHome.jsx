import React from 'react'
import useOtherServiceAuth from '../../../hooks/useOtherServiceAuth'
import { setSwayamUser } from '../../../redux/slices/UserSlice'
import siteLinks from '../../../components/siteLinks'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import HomeProfileButtons from '../../dsd/components/HomeProfileButtons'
import title from '../../../js/title'
import HomeProfile from '../../dsd/components/HomeProfile'
import UserLoading from '../../../pages/UserLoading'
import Footer from '../../../components/Footer'
import authParamsObject from '../../../js/authParamsObject'

const swayamAuthParams = authParamsObject.swayam

const SwayamHome = () => {
    useOtherServiceAuth(swayamAuthParams)
    const user = useSelector((state) => state.user.swayamUser)
    const bredLinks = [siteLinks.welcome, siteLinks.swayamHome]
    const navigate = useNavigate()
    title(siteLinks.swayamHome.title)
    const profileButton1 = <HomeProfileButtons title="Fill Data" onClick={() => navigate(siteLinks.swayamFillData.link)} />
    return (
        <div>
            <div className="min-h-screen">
                {user ?
                    <HomeProfile profileButton1={profileButton1} bredLinks={bredLinks} user={user} setUser={setSwayamUser} userType="swayam" tokenName="swayam-token" />
                    :
                    <UserLoading title="Fetching User Details" />}
            </div>
            <Footer />
        </div>
    )
}
export default SwayamHome

export { swayamAuthParams }
