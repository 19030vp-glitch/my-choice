import React from 'react'
import useOtherServiceAuth from '../../../hooks/useOtherServiceAuth'
import { setSportsUser } from '../../../redux/slices/UserSlice'
import siteLinks from '../../../components/siteLinks'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import HomeProfileButtons from '../../dsd/components/HomeProfileButtons'
import title from '../../../js/title'
import HomeProfile from '../../dsd/components/HomeProfile'
import UserLoading from '../../../pages/UserLoading'
import authParamsObject from '../../../js/authParamsObject'

const sportsAuthParams = authParamsObject.sports

const SportsHome = () => {
    useOtherServiceAuth(sportsAuthParams)
    const user = useSelector((state) => state.user.sportsUser)
    const bredLinks = [siteLinks.welcome, siteLinks.sportsHome]
    const navigate = useNavigate()
    const profileButton1 = <HomeProfileButtons title="Fill AQAR Data" onClick={() => navigate(siteLinks.sportsAQAR.link)} />
    title(siteLinks.sportsHome.title)
    return (
        <div>
            {user ?
                <HomeProfile bredLinks={bredLinks} user={user} setUser={setSportsUser} userType="sports" profileButton1={profileButton1} tokenName="sports-token" />
                :
                <UserLoading title="Fetching User Details" />}
        </div>
    )
}
export default SportsHome

