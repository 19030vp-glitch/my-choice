import React, { useEffect, useState } from 'react'
import useAuth from '../../../../hooks/useAuth'
import AcademicScore from './content/AcademicScore'
import Teaching from './content/Teaching'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { IconButton, Tooltip } from '@mui/material'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { useSelector } from 'react-redux'
import FinalPage from './content/FinalPage'
import { getCASData } from './PBASServices'
import Footer from '../../../../components/Footer'
import Bred from '../../../../components/Bred'
import OnlyNav from '../../../../components/OnlyNav'
import StepStatus from '../../../../components/StepStatus'
import title from '../../../../js/title'
import { useNavigate } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons'
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import SelectCASYear from './components/SelectCASYear'
import BasicInfo from './content/BasicInfo'
import siteLinks from '../../../../components/siteLinks'
import Acknowledgement from '../cas/components/Acknowledgement';
import ShowModal from '../../../../components/ShowModal';
import CheckFacultyDataValidity from '../../components/CheckFacultyDataValidity';


const PbasReportHome = () => {
    useAuth(false)
    const [tabName, setTabName] = useState('intro')
    const [casYearState, setCasYearState] = useState(null)
    // years mentioned below are not allowed to fill form
    const prohabitatedYears = []
    const [isDoNotProceed, setIsDoNotProceed] = useState(false)

    const steps = ['Basic Info', 'Select Year', 'Teaching Activities', 'Academic/ Research Score', 'Summary Sheet', "Acknowledgement"];
    title("PBAS Report")
    const [serverCasData, setServerCasData] = useState(null)
    const [serverCasError, setServerCasError] = useState(null)
    const user = useSelector((state) => state.user.user)
    const [activeStep, setActiveStep] = useState(0);
    const navigate = useNavigate()
    const [saveLoader, setSaveLoader] = useState(false)
    const [shouldProceed, setShouldProceed] = useState(false)
    const [teachingData, setTeachingData] = useState({
        checkBoxCount: 0, checkBoxSelected: [], teachingGrade: null, totalClasses: null,
        classesTaught: null, teachingRemark: null, teachingRemarkColor: null, uploadInputs: {
            'file-A': null,
            'file-B': null,
            'file-C': null,
            'file-D': null,
            'file-E': null,
            'file-F': null,
            'file-G': null,
        },

        uploadedAttendance: null,
        selectedAttendance: null

    })

    let initialTeaching = {
        checkBoxCount: 0, checkBoxSelected: [], teachingGrade: null, totalClasses: null,
        classesTaught: null, teachingRemark: null, teachingRemarkColor: null, uploadInputs: {
            'file-A': null,
            'file-B': null,
            'file-C': null,
            'file-D': null,
            'file-E': null,
            'file-F': null,
            'file-G': null,
        },

        uploadedAttendance: null,
        selectedAttendance: null

    }


    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [tabName])


    const navigateTabs = () => {
        if (tabName === 'year') {
            setTabName('intro')
            handleBack()
        } else if (tabName === 'first') {
            setShouldProceed(false)
            setCasYearState(null)
            setTabName('year')
            handleBack()
        } else if (tabName === 'second') {
            setTabName('first')
            handleBack()
        } else if (tabName === 'final') {
            setTabName('second')
            handleBack()
        }
        else if (tabName === 'ack') {
            setTabName('final')
            handleBack()
        }

    }

    useEffect(() => {
        setServerCasData(() => {
            return null
        })

        setTeachingData(() => {
            return initialTeaching
        })

        if (casYearState) {
            if (!prohabitatedYears.includes(casYearState)) {
                getCASData(user?._id, setServerCasData, setServerCasError, true, casYearState, setShouldProceed)
            } else {
                setShouldProceed(true)
            }
        }

    }, [casYearState])





    return (
        <div className="w-full">
            <CheckFacultyDataValidity user={user} />

            {/* PBAS Navtools */}
            <div className={`${tabName === 'year' ? "" : "sticky-top bg-white"}`}>
                <OnlyNav user={user} li={[siteLinks.facultyHome, siteLinks.pbas]}
                    logout={{ token: 'faculty-token', link: siteLinks.welcome.link }}>
                    <div className="flex items-center justify-start gap-2">
                        <div className={`${tabName === 'intro' ? 'hidden' : 'block'}`}>
                            <IconButton onClick={() => { navigateTabs() }}>
                                <ArrowBackRoundedIcon />
                            </IconButton>

                        </div>
                        <div className={`${tabName === 'intro' ? 'block' : 'hidden'}`}>
                            <IconButton onClick={() => { navigate(siteLinks.facultyHome.link) }}>
                                <ArrowBackRoundedIcon />
                            </IconButton>

                        </div>
                        <span className="sm:text-sm md:text-lg font-bold">PBAS Report Form {casYearState && <span>({casYearState})</span>}</span>

                        {
                            tabName === 'first' || tabName === 'second' || tabName === 'final' ? (saveLoader ? <div className='flex items-center justify-start gap-2 border-l-2 pl-5 ml-5'>
                                <Tooltip placement="bottom" title="Saving...">
                                    <div className='flex items-center justify-start gap-2 cursor-pointer bg-gray-100 rounded-md p-2'>
                                        <LoadingOutlined style={{ fontSize: 20, }} spin />
                                        <span>Saving...</span>
                                    </div>
                                </Tooltip>
                            </div> : <div className='border-l-2 pl-5 ml-5'>
                                <Tooltip title='Save Progress' placement='bottom'>
                                    <div onClick={() => { setSaveLoader(true) }} className='flex items-center justify-start gap-2 cursor-pointer bg-blue-100 hover:bg-blue-200 ease-in-out duration-200 text-blue-800 rounded-md p-2'>
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
                <Bred links={[siteLinks.welcome, siteLinks.facultyHome, siteLinks.pbas]} />
            </div>
            <div className='mt-3'>
                <StepStatus activeStep={activeStep} steps={steps} />
            </div>


            {/* BASIC INTRO */}
            <div className={`${tabName === 'intro' ? 'block' : 'hidden'}`}>
                <BasicInfo />

                <div className='mt-5'>
                    <SaveButton title={'Save and Proceed'}
                        onClickFunction={() => { setTabName('year'); handleNext() }} />
                </div>
            </div>




            {/* CONTENT */}

            {/* // prohabitatedYears Modal */}
            <div className='z-50'>
                <ShowModal isModalOpen={isDoNotProceed} setIsModalOpen={setIsDoNotProceed} title="Regarding PBAS Form submission" okText="Ok" onOkFunc={() => { }} >

                    <div id="alert-additional-content-2" className="p-4 mb-4 mt-4 text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                        <div className="flex items-center">
                            <svg className="flex-shrink-0 w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span className="sr-only">Info</span>
                            <h3 className="text-lg font-medium">Edit Deadline Passed for PBAS ({casYearState}) Form </h3>
                        </div>
                        <div className="mt-2 mb-4 text-sm">
                            The last date to edit the PBAS ({casYearState}) form has passed. You can no longer make changes to the form, however you will be able to download the last updated PBAS ({casYearState}) report. If you have any concerns or need further assistance, please reach out to the relevant authorities.
                        </div>

                    </div>

                </ShowModal>
            </div>

            <div className={`${tabName === 'year' ? 'block' : 'hidden'}`}>
                <div className='mt-3 flex-col items-center justify-center gap-3 w-full text-center h-screen'>


                    <form className='flex flex-col items-center justify-center mt-5' onSubmit={(e) => {
                        e.preventDefault();
                        if (prohabitatedYears.includes(casYearState)) {
                            setIsDoNotProceed(true)
                        } else {
                            setTabName('first');
                            handleNext()
                        }
                    }}>
                        <SelectCASYear casYearState={casYearState} setCasYearState={setCasYearState} space='col-md-3' title="Choose PBAS Year" />

                        {
                            casYearState && <div className='mt-5'>
                                {(shouldProceed) ?
                                    <SaveButton title={'Save and Proceed'} />
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

            <div className={`${tabName === 'first' ? 'block' : 'hidden'}`}>
                <Teaching setTabName={setTabName} tabName={tabName} handleNext={handleNext} serverCasData={serverCasData && serverCasData} casYearState={casYearState} teachingData={teachingData} setTeachingData={setTeachingData} saveLoader={saveLoader} setSaveLoader={setSaveLoader} />
            </div>

            <div className={`${tabName === 'second' ? 'block' : 'hidden'}`}>
                <AcademicScore setTabName={setTabName} tabName={tabName} handleNext={handleNext} serverCasData={serverCasData && serverCasData} casYearState={casYearState} teachingData={teachingData} setTeachingData={setTeachingData} saveLoader={saveLoader} setSaveLoader={setSaveLoader} />
            </div>

            <div className={`${tabName === 'final' ? 'block' : 'hidden'}`}>
                <div>
                    <FinalPage casYear={casYearState} handleNext={handleNext} setTabName={setTabName} casYearState={casYearState} setSaveLoader={setSaveLoader} />
                </div>
            </div>

            <div className={`${tabName === 'ack' ? 'block' : 'hidden'}`}>
                <div>
                    <Acknowledgement casYear={casYearState} handleNext={handleNext} setTabName={setTabName} serviceName="PBAS" />
                </div>
            </div>


            <Footer />
        </div >
    )
}

export default PbasReportHome



const SaveButton = ({ type = "submit", title, onClickFunction, icon = <ArrowForwardRoundedIcon />, iconClasses = "mr-2" }) => {
    return (
        <button className="flex items-center justify-start p-2 rounded-xl text-blue-900 font-bold bg-blue-200 hover:gap-2 duration-200 ease-in-out" type={type} onClick={onClickFunction}><span className={`${iconClasses}`}>{title}</span> {icon}</button>
    )
}

export { SaveButton }