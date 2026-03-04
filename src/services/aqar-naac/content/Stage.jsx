import React, { useState } from 'react'
import GoBack from '../../../components/GoBack'
import siteLinks from '../../../components/siteLinks'
import AQARNavbar, { navbarLinks } from '../components/AQARNavbar'
import { useNavigate, useParams } from 'react-router-dom'
import Footer from '../../../components/Footer'
import { authParams } from '../content/ChooseAQARYear'
import useOtherServiceAuth from '../../../hooks/useOtherServiceAuth'
import TableAccordion from '../../faculty/reports/aqar/components/TableAccordion'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import AQARTablesObject from '../js/AQARTablesObject'
import { SaveButton } from '../../faculty/reports/pbas/PbasReportHome'
import toast from 'react-hot-toast'
import isReportSubmitted from '../../dsd/js/isReportSubmitted'
import Acknowledgement from '../../../components/Acknowledgement'
import title from '../../../js/title'


const Stage = () => {
    const { academicYear, userType, stageName } = useParams();
    const stageTitle = navbarLinks?.[stageName]?.title
    const navigate = useNavigate()
    const usernames = {
        admin: 'adminUser',
        director: 'directorUser'
    }
    const bredLinks = [siteLinks.welcome, siteLinks[userType === 'admin' ? 'adminHome' : 'directorHome'], { title: "Select AQAR Year", link: `/${userType}/aqar` }, { title: `AQAR Form (${stageTitle || 'Acknowledgement'})`, link: null }]

    useOtherServiceAuth({ ...authParams[userType], shouldNavigate: false })
    const users = useSelector((state) => state.user)
    const userDirector = useSelector((state) => state.user?.directorUser)
    const isDirector = userType === 'director'

    let school = users?.directorUser?.department;
    title('AQAR')


    const AQARTables = AQARTablesObject({ academicYear, userType, school, isDirector })

    if (!Object.keys(AQARTables).includes(stageName) && stageName !== "acknowledgement") {
        toast.error('URL was not valid')
        navigate('/')
    } else if (stageName === "acknowledgement" && userType === 'admin') {
        navigate('/')
    }

    const [expandedAccordion, setExpandedAccordion] = useState();

    const handleChangeAccordion = (index) => {
        setExpandedAccordion(index === expandedAccordion ? null : index);
    };

    const handleFormSubmit = () => {
        const link = `/${userType}/aqar/${academicYear}/acknowledgement`
        let data = {
            schoolName: userDirector?.department
        }
        isReportSubmitted(academicYear, 'SchoolAQAR', () => { navigate(link) }, null, data, data)
    }


    return (
        <div>
            <GoBack pageTitle={`Annual Quality Assurance Report (${academicYear})`} bredLinks={bredLinks} showAvatar={{ photoURL: users[usernames[userType]]?.photoURL, userType }} />

            <div className="my-3 sticky-top">
                <AQARNavbar />
            </div>

            <div className="bg-gray-100 p-2 rounded-lg">
                {
                    stageName !== 'acknowledgement' && <>
                        <p className="text-center mt-3 font-bold text-xl">
                            {stageTitle}{navbarLinks?.[stageName]?.subtitle ? `: ${navbarLinks?.[stageName]?.subtitle}` : ''}</p>
                        <p className="text-center mb-3 text-sm text-muted">
                            Categories: {`(${AQARTables?.[stageName]?.length})`}
                        </p>
                    </>
                }


                {/* // Render your tables here dynamically  */}
                <div className="my-5">

                    {
                        stageName === 'acknowledgement' && <div>
                            <Acknowledgement
                                title="AQAR has been submitted successfully"
                                navigateTo={'/director'}
                            >
                                <div className='my-5  text-center mx-auto'>
                                    <p>Thank you, <b>{userDirector?.salutation} {userDirector?.name}</b> (Director) for successfully submitting the Annual Quality Assurance Report for the year <b>{academicYear}</b> for <b>{userDirector?.department}</b>. </p>
                                </div>
                            </Acknowledgement>
                        </div>
                    }


                    {
                        AQARTables?.[stageName]?.map((mainPoint, mainIndex) => {
                            return <div className={`border-[#8c8cd9] rounded-lg p-1 border-2 my-3 text-sm lg:text-base w-full`}>
                                <Accordion sx={{ boxShadow: 'none' }} TransitionProps={{ unmountOnExit: true }} expanded={expandedAccordion === mainIndex} onChange={() => handleChangeAccordion(mainIndex)}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}
                                        aria-controls={`main-content-${stageName}-${mainIndex}`}
                                        id={`main-accordion-${stageName}-${mainIndex}`}
                                    >
                                        <Typography sx={{ color: 'blue', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}> {mainPoint.title}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <TableAccordion AQARTables={mainPoint?.components} showIndex={false} />
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        })
                    }


                </div>

            </div>
            <div className='mt-4'>
                {
                    (stageName === 'criterion-7' && userType !== 'admin') && <SaveButton title={`Save and Submit`} onClickFunction={() => { handleFormSubmit(); }} />
                }
            </div>
            <Footer />


        </div>
    )
}

export default Stage
