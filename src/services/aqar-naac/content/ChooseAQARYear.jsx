import React from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import GoBack from '../../../components/GoBack'
import siteLinks from '../../../components/siteLinks'
import title from '../../../js/title'
import Year, { academicYearGenerator } from '../../../inputs/Year'
import { SaveButton } from '../../faculty/reports/cas/CasReportHome'
import Footer from '../../../components/Footer'
import { useSelector } from 'react-redux'
import { setAdminUser, setDirectorUser } from '../../../redux/slices/UserSlice'
import useOtherServiceAuth from '../../../hooks/useOtherServiceAuth'

const ChooseAQARYear = () => {

    const { userType } = useParams()
    const pageTitle = `${userType === 'admin' ? 'Admin' : 'Director'} AQAR Form`
    title(pageTitle)
    const [academicYear, setAcademicYear] = useState(null)
    const bredLinks = [siteLinks.welcome, siteLinks[userType === 'admin' ? 'adminHome' : 'directorHome'], { title: "Select AQAR Year", link: `/${userType}/aqar` }]
    useOtherServiceAuth({ ...authParams[userType], shouldNavigate: false })
    const navigate = useNavigate()

    useOtherServiceAuth({ ...authParams[userType], shouldNavigate: false })


    return (
        <div>

            <GoBack pageTitle={pageTitle} bredLinks={bredLinks} />

            <div className='h-screen'>
                <div className='mx-auto flex items-center text-center justify-center my-5'>
                    <Year state={academicYear} setState={setAcademicYear} space='col-md-3'
                        title="Choose AQAR Academic Year" customYears={['2022-23']} />
                </div>
                <div className='mx-auto flex items-center justify-center'>
                    <SaveButton title={`Save and Proceed`} onClickFunction={() => {
                        if (academicYear) {
                            navigate(`/${userType}/aqar/${academicYear}/extended-profile`)
                        } else {
                            toast.error('Select AQAR Year before you proceed.')
                        }
                    }} />
                </div>
            </div>





            <Footer />
        </div>
    )
}

export default ChooseAQARYear


const authParams = {
    director: { shouldNavigate: true, tokenName: "director-token", setUser: setDirectorUser, navigationHomeLink: siteLinks.directorHome.link, navigationLoginLink: siteLinks.directorLogin.link, model: "DirectorUser", filterName: 'department' },
    admin: { shouldNavigate: true, tokenName: "admin-token", setUser: setAdminUser, navigationHomeLink: siteLinks.adminHome.link, navigationLoginLink: siteLinks.adminLogin.link, model: "AdminUser", filterName: 'username' }
}

export { authParams }