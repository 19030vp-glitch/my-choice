import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import title from '../../../../../js/title'
import GoBack from '../../../../../components/GoBack'
import useDirectorAuth from '../../../../../hooks/useDirectorAuth'
import { useSelector } from 'react-redux'
import NIRFNavbar, { navbarLinks } from '../components/NIRFNavbar'
import nirfTablesObject from '../js/nirfTablesObject'
import Footer from '../../../../../components/Footer'
import siteLinks from '../../../../../components/siteLinks'
import ArrowButton from '../../../../../components/ArrowButton'
import { navigateToURL } from '../components/StudentIntake'
import redirectObjectNIRF from '../js/redirectObject'
import Acknowledgement from '../../../../../components/Acknowledgement'
import isReportSubmitted from '../../../../dsd/js/isReportSubmitted'
import UserLoading from '../../../../../pages/UserLoading'

const NIRFContent = () => {

    useDirectorAuth()
    const { academicYear, module } = useParams()
    useDirectorAuth()
    title('National Institutional Ranking Framework (NIRF)')
    const user = useSelector((state) => state.user?.directorUser)
    const stageTitle = navbarLinks?.[module]?.title
    const navigate = useNavigate()
    const NIRFTables = nirfTablesObject(user?.department, academicYear)
    const bredLinks = [siteLinks.welcome, siteLinks.directorHome, siteLinks.nirfSelectYear, { title: stageTitle || 'Acknowledgement' }]

    const navigationHandler = () => {

        let data = {
            schoolName: user?.department
        }

        if (module === 'programs-organized') {
            try {
                isReportSubmitted(academicYear, 'SchoolNIRF', () => { }, null, data, data)
            } catch (error) {
                return
            }
        }
        navigateToURL(academicYear, redirectObjectNIRF?.[module]?.url, navigate)
    }


    return (
        <div>
            <GoBack pageTitle={`NIRF Report (${academicYear})`} showAvatar={{ photoURL: user?.photoURL, userType: 'director' }} bredLinks={bredLinks} />

            <div className="my-3 sticky-top">
                <NIRFNavbar />
            </div>

            <div className="bg-gray-100 p-2 rounded-lg min-h-screen">
                <div>
                    {
                        module !== 'acknowledgement' && <>
                            <p className="text-center mt-3 font-bold text-xl">
                                {NIRFTables?.[module]?.title}</p>
                        </>
                    }
                </div>

                {
                    module === 'acknowledgement' && <div>
                        <Acknowledgement
                            title="NIRF Report has been submitted successfully"
                            navigateTo={'/director'}
                        >
                            <div className='my-5  text-center mx-auto'>
                                <p>Thank you, <b>{user?.salutation} {user?.name}</b> (Director) for successfully submitting the National Institutional Ranking Framework (NIRF) for the year <b>{academicYear}</b> for <b>{user?.department}</b>. </p>
                            </div>
                        </Acknowledgement>
                    </div>
                }

                <div>
                    {
                        user ? NIRFTables?.[module]?.component : <UserLoading title="Getting user" />
                    }
                </div>


                {
                    Object.keys(redirectObjectNIRF).includes(module) ?
                        <div className="my-5 flex items-center justify-center">
                            <ArrowButton
                                title={redirectObjectNIRF?.[module]?.title}
                                onClickFunction={navigationHandler} />
                        </div> : null
                }


            </div>

            <Footer />





        </div>
    )
}

export default NIRFContent

