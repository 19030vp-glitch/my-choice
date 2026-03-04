import React from 'react'
import useOtherServiceAuth from '../../../hooks/useOtherServiceAuth'
import siteLinks from '../../../components/siteLinks'
import { setPlacementUser } from '../../../redux/slices/UserSlice'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import HomeProfileButtons from '../../dsd/components/HomeProfileButtons'
import HomeProfile from '../../dsd/components/HomeProfile'
import UserLoading from '../../../pages/UserLoading'
import title from '../../../js/title'
import Footer from '../../../components/Footer'
import authParamsObject from '../../../js/authParamsObject'

const placementAuthParams = authParamsObject.tpo

const PlacementHome = () => {
    useOtherServiceAuth(placementAuthParams)
    const user = useSelector((state) => state.user.placementUser)
    const bredLinks = [siteLinks.welcome, siteLinks.placementHome]
    const navigate = useNavigate()
    const profileButton1 = <HomeProfileButtons title="Fill AQAR Data" onClick={() => navigate(siteLinks.placementAQAR.link)} />
    title(siteLinks.placementHome.title)
    return (
        <div>
            <div className="min-h-screen">

                {user ?
                    <HomeProfile bredLinks={bredLinks} user={user} setUser={setPlacementUser} userType="placement" profileButton1={profileButton1} tokenName="placement-token" />
                    :
                    <UserLoading title="Fetching User Details" />}
            </div>
            <Footer />

        </div>
    )
}

export default PlacementHome
