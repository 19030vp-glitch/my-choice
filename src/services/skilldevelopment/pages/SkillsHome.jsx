import React from 'react'
import useOtherServiceAuth from '../../../hooks/useOtherServiceAuth'
import { setSkillUser } from '../../../redux/slices/UserSlice'
import siteLinks from '../../../components/siteLinks'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import HomeProfileButtons from '../../dsd/components/HomeProfileButtons'
import title from '../../../js/title'
import HomeProfile from '../../dsd/components/HomeProfile'
import UserLoading from '../../../pages/UserLoading'
import Footer from '../../../components/Footer'
import authParamsObject from '../../../js/authParamsObject'

const skillsAuthParams = authParamsObject.skill

const SkillsHome = () => {
    useOtherServiceAuth(skillsAuthParams)
    const user = useSelector((state) => state.user.skillUser)
    const bredLinks = [siteLinks.welcome, siteLinks.skillHome]
    const navigate = useNavigate()
    title(siteLinks.skillHome.title)
    const profileButton1 = <HomeProfileButtons title="Fill Data" onClick={() => navigate(siteLinks.skillFillData.link)} />
    return (
        <div>
            <div className="min-h-screen">
                {user ?
                    <HomeProfile profileButton1={profileButton1} bredLinks={bredLinks} user={user} setUser={setSkillUser} userType="skill" tokenName="skill-token" />
                    :
                    <UserLoading title="Fetching User Details" />}
            </div>
            <Footer />
        </div>
    )
}
export default SkillsHome

export { skillsAuthParams }
