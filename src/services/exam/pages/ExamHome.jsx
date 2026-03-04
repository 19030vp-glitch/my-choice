import React from 'react'
import useOtherServiceAuth from '../../../hooks/useOtherServiceAuth'
import { setExamUser } from '../../../redux/slices/UserSlice'
import siteLinks from '../../../components/siteLinks'
import { useSelector } from 'react-redux'
import UserLoading from '../../../pages/UserLoading'
import HomeProfile from '../../dsd/components/HomeProfile'
import HomeProfileButtons from '../../dsd/components/HomeProfileButtons'
import title from '../../../js/title'
import { useNavigate } from 'react-router-dom'
import { Footer } from 'antd/es/layout/layout'
import authParamsObject from '../../../js/authParamsObject'

const examAuthParams = authParamsObject.exam

const ExamHome = () => {
    useOtherServiceAuth(examAuthParams)
    const user = useSelector((state) => state.user.examUser)
    const bredLinks = [siteLinks.welcome, siteLinks.examHome]
    const navigate = useNavigate()
    const profileButton1 = <HomeProfileButtons title="Fill AQAR Data" onClick={() => navigate(siteLinks.examAQAR.link)} />
    title(siteLinks.examHome.title)
    return (
        <div>
            <div className="min-h-screen">

                {user ?
                    <HomeProfile bredLinks={bredLinks} user={user} setUser={setExamUser} userType="exam" profileButton1={profileButton1} tokenName="exam-token" />
                    :
                    <UserLoading title="Fetching User Details" />}
            </div>
            <Footer />
        </div>
    )
}

export default ExamHome

