import React from 'react'
import useOtherServiceAuth from '../../../hooks/useOtherServiceAuth'
import { setNSSUser } from '../../../redux/slices/UserSlice'
import siteLinks from '../../../components/siteLinks'
import { useSelector } from 'react-redux'
import HomeProfileButtons from '../../dsd/components/HomeProfileButtons'
import { useNavigate } from 'react-router-dom'
import UserLoading from '../../../pages/UserLoading'
import HomeProfile from '../../dsd/components/HomeProfile'
import title from '../../../js/title'
import Footer from '../../../components/Footer'
import { ServiceTile } from '../../../components/Service'
import authParamsObject from '../../../js/authParamsObject'

const nssAuthParams = authParamsObject.nss

const NSSHome = () => {
    useOtherServiceAuth(nssAuthParams)
    const user = useSelector((state) => state.user.nssUser)
    const bredLinks = [siteLinks.welcome, siteLinks.nssHome]
    const navigate = useNavigate()
    const profileButton1 = <HomeProfileButtons title="Fill AQAR Data" onClick={() => navigate(siteLinks.nssAQAR.link)} />
    title(siteLinks.nssHome.title)
    return (
        <div>
            <div className="min-h-screen">

                {user ?
                    <HomeProfile bredLinks={bredLinks} user={user} setUser={setNSSUser} userType="nss" profileButton1={profileButton1} tokenName="nss-token" >
                        <div className="flex flex-col lg:flex-row items-center justify-between flex-wrap">
                            <ServiceTile fullForm="NSS AQAR Form" title="AQAR" link1={siteLinks.nssAQAR.link} link1Title="Fill AQAR Form" />
                            <ServiceTile fullForm="NSS Student Admission" title="Student Enrollment" link1={siteLinks.nssStudentAdmission.link} link1Title="Enroll Students" />
                        </div>
                    </HomeProfile>
                    :
                    <UserLoading title="Fetching User Details" />}

            </div>
            <Footer />
        </div>
    )
}

export default NSSHome
