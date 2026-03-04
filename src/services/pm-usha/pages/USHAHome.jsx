import React from 'react'
import USHANavbar from '../components/USHANavbar'
import authParamsObject from '../../../js/authParamsObject'
import useOtherServiceAuth from '../../../hooks/useOtherServiceAuth'
import siteLinks from '../../../components/siteLinks'
import title from '../../../js/title'
import GoBack from '../../../components/GoBack'
import USHACards from './USHACards'
import Footer from '../../../components/Footer'
import USHADashboard from '../components/USHADashboard'

const USHAHome = () => {
    const ushaAuthParams = authParamsObject.usha
    useOtherServiceAuth(ushaAuthParams)
    const bredLinks = [siteLinks.welcome, siteLinks.ushaHome]
    title(siteLinks.ushaHome.title)

    return (
        <div>
            <div className="min-h-screen">
                <GoBack pageTitle={siteLinks.ushaHome.title} bredLinks={bredLinks} >
                    <USHANavbar />
                </GoBack>
                <div className='animate-once animate-fade-up'>
                    <div className="space-y-2">
                        <USHACards />
                        <USHADashboard />
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default USHAHome
