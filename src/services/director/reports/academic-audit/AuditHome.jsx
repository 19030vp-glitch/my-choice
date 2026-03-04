import React, { useEffect, useState } from 'react'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { IconButton } from '@mui/material'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { useDispatch, useSelector } from 'react-redux'
import Footer from '../../../../components/Footer'
import Year from '../../../../inputs/Year'
import Bred from '../../../../components/Bred'
import OnlyNav from '../../../../components/OnlyNav'
import StepStatus from '../../../../components/StepStatus';
import { setAuditData, setAuditYear } from '../../../../redux/slices/AuditSlice';
import MainForm from './content/InformationHome';
import FinalPage from './content/FinalPage';
import useDirectorAuth from '../../../../hooks/useDirectorAuth';
import title from '../../../../js/title';
import FacebookLoader from './components/FacebookLoader'
import { getAuditData } from './components/audit-services';
import { useLocation, useNavigate } from 'react-router-dom';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import { Tooltip, } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import siteLinks from '../../../../components/siteLinks';

const AuditHome = () => {
    title("AAA | Academic & Administrative Audit")

    const [tabName, setTabName] = useState('year')
    const [auditYearState, setAuditYearState] = useState(null)
    const steps = ['Select Audit Year', 'Basic School Details', 'Publications, Awards & Programs', 'CO-PO, JRF-SRF & Projects', 'Alumni Placements & HE', 'Activities & Future plans'];
    const [serverAuditData, setServerAuditData] = useState(null)
    const [serverAuditError, setServerAuditError] = useState(null)
    const dispatch = useDispatch()
    const [activeStep, setActiveStep] = React.useState(0);
    useDirectorAuth()
    const directorUser = useSelector(state => state.user.directorUser)
    const [autoSaveLoader, setAutoSaveLoader] = useState(false)
    const [allYearAAAData, setAllYearAAAData] = useState(null)
    const navigate = useNavigate()
    const location = useLocation()
    const [shouldProceed, setShouldProceed] = useState(false)


    useEffect(() => {
        console.log('Location is :', location)
        if (location?.state?.academicYear) {
            setAuditYearState(location.state.academicYear)
        }
    }, [location])



    useEffect(() => {
        window.scrollTo(0, 0);
    }, [tabName])


    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const navigateTabs = () => {
        if (tabName === '5') {
            setTabName('4')
            handleBack()
        }
        else if (tabName === '4') {
            setTabName('3')
            handleBack()
        } else if (tabName === '3') {
            setTabName('2')
            handleBack()
        } else if (tabName === '2') {
            setTabName('1')
            handleBack()
        }
        else if (tabName === '1') {
            setShouldProceed(false)
            setAuditYearState(null)
            setTabName('year')
            handleBack()
        }

    }

    useEffect(() => {
        if (directorUser) {
            auditYearState &&
                getAuditData(directorUser.department, auditYearState, setServerAuditData, setServerAuditError, true, setAllYearAAAData, setShouldProceed)
        }

    }, [auditYearState])

    const handleSteps = () => {
        if (tabName === '5') {
            alert('This is final save')
        }
        else if (tabName === '4') {
            setTabName('5')
            handleNext()
        } else if (tabName === '3') {
            setTabName('4')
            handleNext()
        } else if (tabName === '2') {
            setTabName('3')
            handleNext()
        }
        else if (tabName === '1') {
            setTabName('2')
            handleNext()
        }

    }




    return (
        <div className="w-full">

            <div style={{ position: 'sticky', top: 0, zIndex: 1 }} className='bg-white'>
                <OnlyNav user={directorUser} logout={{ token: 'director-token', link: siteLinks.welcome.link }}
                    li={[siteLinks.directorHome, siteLinks.sdm]} userType="director" >
                    <div className="flex items-center justify-start gap-2">
                        <div className={`${tabName === 'year' ? 'hidden' : 'block'}`}>
                            <IconButton onClick={() => { navigateTabs() }}>
                                <ArrowBackRoundedIcon />
                            </IconButton>

                        </div>
                        <div className={`${tabName === 'year' ? 'block' : 'hidden'}`}>
                            <IconButton onClick={() => { navigate(siteLinks.directorHome.link) }}>
                                <ArrowBackRoundedIcon />
                            </IconButton>

                        </div>
                        <span className="sm:text-sm md:text-lg font-bold">Academic & Administrative Audit {auditYearState && <span>({auditYearState})</span>}
                        </span>

                        {
                            tabName !== 'year' ? (autoSaveLoader ? <div className='flex items-center justify-start gap-2 border-l-2 pl-5 ml-5'>
                                <Tooltip placement="bottom" title="Saving...">
                                    <div className='flex items-center justify-start gap-2 cursor-pointer bg-gray-100 rounded-md p-2'>
                                        <LoadingOutlined style={{ fontSize: 20, }} spin />
                                        <span>Saving...</span>
                                    </div>
                                </Tooltip>
                            </div> : <div className='border-l-2 pl-5 ml-5'>
                                <Tooltip title='Save Progress' placement='bottom'>
                                    <div onClick={() => { setAutoSaveLoader(true) }} className='flex items-center justify-start gap-2 cursor-pointer bg-blue-100 hover:bg-blue-200 ease-in-out duration-200 text-blue-800 rounded-md p-2'>
                                        <SaveRoundedIcon />
                                        <span className='font-medium'>Save</span>
                                    </div>
                                </Tooltip>
                            </div>) : null
                        }
                    </div>
                </OnlyNav>
            </div>

            <div className='mt-2 mb-3'>
                <Bred links={[siteLinks.welcome, siteLinks.directorHome, siteLinks.aaa]} />
            </div>
            <div className='mt-3'>
                <StepStatus activeStep={activeStep} steps={steps} />
            </div>



            {/* CONTENT */}

            <div className={`${tabName === 'year' ? 'block' : 'hidden'}`}>
                <div className='mt-3 flex-col items-center justify-center gap-3 w-full text-center h-screen'>

                    <form className='flex flex-col items-center justify-center mt-5' onSubmit={(e) => { e.preventDefault(); setTabName('1'); handleNext() }}>

                        <Year state={auditYearState} setState={setAuditYearState} space='col-md-3' title="Choose Audit Year" numberOfYearsToDisplay={4} />

                        {
                            auditYearState && <div className='mt-5'>
                                {(shouldProceed) ?
                                    <SaveButton title={'Save and Proceed'}
                                        onClickFunction={() => { dispatch(setAuditYear(auditYearState)); }} />
                                    :
                                    <SaveButton type='button' icon={
                                        <div>
                                            <span className="spinner-border mr-3 spinner-border-sm text-xs" role="status" aria-hidden="true"></span>
                                            Loading...
                                        </div>
                                    } />
                                }
                            </div>
                        }

                    </form>
                </div>
            </div>

            {/* ALL FIELDS HERE */}
            <div className={`${tabName === 'year' ? 'hidden' : 'block'}`}>



                <MainForm setTabName={setTabName} tabName={tabName} handleNext={handleNext} serverAuditData={serverAuditData ? serverAuditData : null} setAutoSaveLoader={setAutoSaveLoader} autoSaveLoader={autoSaveLoader} auditYearState={auditYearState} serverAuditError={serverAuditError} allYearAAAData={allYearAAAData} />


            </div>

            <Footer />
        </div >
    )
}

export default AuditHome



const SaveButton = ({ type = "submit", title, onClickFunction, icon = <ArrowForwardRoundedIcon />, iconClasses = "mr-2" }) => {
    return (
        <button className="flex items-center justify-start p-2 rounded-xl text-blue-900 font-bold bg-blue-200 hover:gap-2 duration-200 ease-in-out" type={type} onClick={onClickFunction}><span className={`${iconClasses}`}>{title}</span> {icon}</button>
    )
}

export { SaveButton }