import React from 'react'
import GenerateReportTemplate from '../../../../../components/GenerateReportTemplate'
import siteLinks from '../../../../../components/siteLinks'
import Footer from '../../../../../components/Footer'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import getAQARData from '../../../../director/reports/aqar/js/getAQARData'
import { useSelector } from 'react-redux'
import SelectYear from '../components/SelectYear'

const GenerateAQARReport = ({ auth }) => {

    const { userType } = useParams()
    const navigate = useNavigate()

    auth?.[userType](userType === 'faculty' ? false : true)

    const [aqarDataFromServer, setAqarDataFromServer] = useState(null)
    const [error, setError] = useState(false)
    const user = useSelector((state) => state.user.user)
    const directorUser = useSelector((state) => state.user.directorUser)



    const userSpecificDetails = {
        faculty: {
            links: [siteLinks.welcome, siteLinks.facultyHome, siteLinks.aqar, siteLinks.aqarReport],
            backLink: siteLinks.facultyHome.link,
            title: "Generate Faculty AQAR Report",
            filter: { userId: user?._id }
        },
        director: {
            links: [siteLinks.welcome, siteLinks.directorHome, siteLinks.directorAqar, siteLinks.directorAqarReport],
            backLink: siteLinks.directorHome.link,
            title: "Generate Director AQAR Report",
            department: directorUser?.department,
            filter: { schoolName: directorUser?.department }

        },
    }

    console.log(aqarDataFromServer)
    const [reportLoading, setReportLoading] = useState(false)

    useEffect(() => {
        if (userType !== 'faculty' && userType !== 'director') {
            navigate('/')
        }
    }, [userType])

    useEffect(() => {
        userType && getAQARData(setAqarDataFromServer, false, userSpecificDetails[userType]?.filter, null, userType);
    }, [userType])

    return (
        <div >
            <div>

                <GenerateReportTemplate bredLinks={userSpecificDetails[userType]?.links} backLink={userSpecificDetails[userType]?.backLink} title={userSpecificDetails[userType]?.title} loading={reportLoading} >
                    <div className='h-screen'>
                        <SelectYear userType={userType} error={error} aqarData={aqarDataFromServer && aqarDataFromServer} aqarYear={aqarDataFromServer && aqarDataFromServer.aqarData} setReportLoading={setReportLoading} />
                    </div>
                </GenerateReportTemplate>


            </div>

            <Footer />
        </div>
    )
}

export default GenerateAQARReport
