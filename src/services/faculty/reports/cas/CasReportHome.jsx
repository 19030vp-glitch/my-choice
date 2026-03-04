import React, { useEffect, useState } from 'react'
import useAuth from '../../../../hooks/useAuth'
import AcademicScore from './content/AcademicScore'
import Teaching from './content/Teaching'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { IconButton, Tooltip } from '@mui/material'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { useDispatch, useSelector } from 'react-redux'
import { setCasYear, setFetchYears } from '../../../../redux/slices/CASSlice'
import FinalPage from './content/FinalPage'
import { getCASData, saveEligibilityData } from './CASServices'
import Footer from '../../../../components/Footer'
import Year from '../../../../inputs/Year'
import Bred from '../../../../components/Bred'
import OnlyNav from '../../../../components/OnlyNav'
import StepStatus from '../../../../components/StepStatus'
import title from '../../../../js/title'
import { useNavigate } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons'
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import SelectCASYear from './components/SelectCASYear'
import siteLinks from '../../../../components/siteLinks'
import AgreePopup from './components/AgreePopup'
import ApplyLevel, { stageObj } from './components/ApplyLevel'
import { toast } from 'react-hot-toast';
import Acknowledgement from './components/Acknowledgement';
import BasicInfo from '../pbas/content/BasicInfo';
import CheckFacultyDataValidity from '../../components/CheckFacultyDataValidity';


const CasReportHome = () => {
    useAuth(false)
    const [tabName, setTabName] = useState('level')
    const [casYearState, setCasYearState] = useState(null)
    let links = [{ name: 'Welcome', link: '/' }, { name: 'Home', link: '/faculty' }, { name: 'CAS Report Form', link: '/service/cas-report' }]
    const steps = ['Eligibility', 'Basic Info', 'Select Year', 'Teaching Activities', 'Academic/ Research Score', 'Summary Sheet', 'Acknowledgement'];
    title("CAS Report")
    const [serverCasData, setServerCasData] = useState(null)
    const [serverCasError, setServerCasError] = useState(null)
    const [shouldProceed, setShouldProceed] = useState(false)
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.user)
    const fetchYears = useSelector((state) => state.cas.fetchYears)
    const [activeStep, setActiveStep] = React.useState(0);
    const navigate = useNavigate()
    const [saveLoader, setSaveLoader] = useState(false)
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
    const [firstYear, setFirstYear] = useState({ day: null, month: null })
    const [lastYear, setLastYear] = useState({ day: null, month: null })
    const [agreePopup, setAgreePopup] = useState(false)
    const [level, setLevel] = useState(null)
    const [eligData, setEligData] = useState({ supervisor: 'Main Supervisor' })
    const [fullCASData, setFullCASData] = useState(null)
    const [casDate, setCasDate] = useState(null)
    const [supervisor, setSupervisor] = useState('Main Supervisor')
    const [publicationCriteriaItems, setPublicationCriteriaItems] = useState([])
    const [serverCasDuration, setServerCasDuration] = useState(null)

    const [normalDuration, setNormalDuration] = useState(null)
    const [currentYear, setCurrentYear] = useState(null)
    const [dateInfo, setDateInfo] = useState({ wholeYear: null, startYearCount: null, lastYearCount: null })


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
        if (tabName === 'intro') {
            setTabName('level')
            handleBack()
        } else if (tabName === 'year') {
            setShouldProceed(false)
            setCasYearState(null)
            setTabName('intro')
            handleBack()
        } else if (tabName === 'first') {
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
        setServerCasData((prev) => {
            return null
        })
        casYearState && getCASData(user?._id, setServerCasData, setServerCasError, true, casYearState, setServerCasDuration, setShouldProceed)
    }, [casYearState])

    const verifyDates = () => {
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

        let july = 7
        months.forEach((month, index) => {
            if (firstYear.month === month) {
                if (index + 1 >= july) {
                    let newYear = `${parseInt(casYearState.slice(0, 4)) + 1}-${parseInt(casYearState.slice(5)) + 1}`
                    dispatch(setFetchYears([casYearState, newYear]))
                }
                else {
                    let newYear = `${parseInt(casYearState.slice(0, 4)) - 1}-${parseInt(casYearState.slice(5)) - 1}`
                    dispatch(setFetchYears([newYear, casYearState]))
                }

            }
        })
    }

    const saveEligibility = () => {

        if (level) {

            let shouldAbort = false

            console.log(level)
            if (level !== 'stage4') {
                // level validations
                stageObj[level].inputData.forEach((item) => {
                    if ((eligData[item.name] === undefined || eligData[item.name] === false || eligData[item.name] === '' || eligData[item.name] === null)) {
                        console.log('inside stage3', item.name)
                        shouldAbort = true
                    }

                    if (level === 'stage3' && publicationCriteriaItems.length < 7) {
                        toast.error('Please select at least 7 publications.')
                        shouldAbort = true
                    } else {
                        setEligData(() => {
                            return { ...eligData, "researchPapers": publicationCriteriaItems }
                        })
                    }
                })
            } else {

                if (
                    (eligData['experience'] === undefined || eligData['experience'] === null || eligData['phdDegree'] === undefined || eligData['phdDegree'] === false || eligData['phdDegree'] === '' || eligData['phdDegree'] === null) || (eligData['isPublication'] === undefined || eligData['isPublication'] === '' || eligData['isPublication'] === null)
                ) {
                    shouldAbort = true
                }

                if (publicationCriteriaItems.length < 10) {
                    toast.error('Please select at least 10 publications.')
                    shouldAbort = true
                } else {
                    setEligData(() => {
                        return { ...eligData, "researchPapers": publicationCriteriaItems }
                    })
                }


                if (shouldAbort === false) {
                    if (supervisor === 'Main Supervisor') {
                        if (
                            (eligData['guideProof1'] === undefined || eligData['guideProof1'] === false || eligData['guideProof1'] === '' || eligData['guideProof1'] === null)
                        ) {
                            shouldAbort = true
                        }
                    } else if (supervisor === 'Co-supervisor') {
                        if (
                            (eligData['guideProof1'] === undefined || eligData['guideProof1'] === false || eligData['guideProof1'] === '' || eligData['guideProof1'] === null) || (eligData['guideProof2'] === undefined || eligData['guideProof2'] === false || eligData['guideProof2'] === '' || eligData['guideProof2'] === null)
                        ) {
                            shouldAbort = true
                        }
                    }
                }


            }


            if (shouldAbort === false) {
                saveEligibilityData(level, user?._id, eligData)
                setTabName('intro'); handleNext()
            }
            else {
                toast.error('Complete your Eligibility by filling all the fields below.')
                return
            }


        } else {
            toast.error('Please choose Level')
        }

    }

    useEffect(() => {
        getCASData(user?._id, setFullCASData, setServerCasError, false, casYearState, false, setShouldProceed)
    }, [level])


    function calDate1() {
        if (casYearState) {
            let wholeYear = casYearState.toString().slice(0, -3)
            let startYearCount = casYearState.toString().slice(0, -5)
            let lastYearCount = casYearState.toString().slice(5)
            let duration = `1st July ${wholeYear} to 30th June ${startYearCount}${lastYearCount}`
            setDateInfo({ wholeYear, startYearCount, lastYearCount })
            setCurrentYear(wholeYear)
            setNormalDuration(duration)
        }
    }

    function calDate2() {
        if (firstYear && lastYear) {

            // user cas duration
            let date = `${firstYear?.day} ${firstYear?.month} ${dateInfo?.wholeYear} to ${lastYear?.day} ${lastYear?.month} ${dateInfo?.startYearCount}${dateInfo?.lastYearCount}`



            setCasDate(() => {
                return { casDuration: date, firstYear, lastYear, academicYear: casYearState }
            })

        }
    }

    useEffect(() => {

        if (serverCasDuration) {


            if (serverCasDuration?.firstYear && serverCasDuration?.lastYear) {
                setFirstYear(serverCasDuration ? serverCasDuration?.firstYear : { day: null, month: null })
                setLastYear(serverCasDuration ? serverCasDuration?.lastYear : { day: null, month: null })
            } else {
                calDate2()
            }


        }
    }, [serverCasDuration])


    return (
        <div className="w-full">
            <CheckFacultyDataValidity user={user} />

            {/* CAS Navtools */}
            <div className='sticky-top bg-white'>
                <OnlyNav user={user} li={[siteLinks.facultyHome, siteLinks.pbas]}
                    logout={{ token: 'faculty-token', link: siteLinks.welcome.link }}>
                    <div className="flex items-center justify-start gap-2">
                        <div className={`${tabName === 'level' ? 'hidden' : 'block'}`}>
                            <IconButton onClick={() => { navigateTabs() }}>
                                <ArrowBackRoundedIcon />
                            </IconButton>

                        </div>
                        <div className={`${tabName === 'level' ? 'block' : 'hidden'}`}>
                            <IconButton onClick={() => { navigate(siteLinks.facultyHome.link) }}>
                                <ArrowBackRoundedIcon />
                            </IconButton>

                        </div>
                        <span className="sm:text-sm md:text-lg font-bold">CAS Report Form {casYearState && <span>({casYearState})</span>}</span>

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
                <Bred links={[siteLinks.welcome, siteLinks.facultyHome, siteLinks.cas]} />
            </div>
            <div className='mt-3'>
                <StepStatus activeStep={activeStep} steps={steps} />
            </div>

            <div className={`${tabName === 'level' ? 'block' : 'hidden'}`}>
                <form className='w-full' onSubmit={(e) => {
                    e.preventDefault(); saveEligibility()
                }}>
                    <ApplyLevel setLevel={setLevel} level={level} setEligData={setEligData} eligData={eligData} fullCASData={fullCASData} setSupervisor={setSupervisor} supervisor={supervisor} saveEligibilityData={saveEligibilityData} setPublicationCriteriaItems={setPublicationCriteriaItems} publicationCriteriaItems={publicationCriteriaItems} />
                    <div className='flex items-center justify-center'>
                        {
                            level && <div className='mt-5'>
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
                    </div>


                </form>
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
            <div className={`${tabName === 'year' ? 'block' : 'hidden'}`}>
                <div className='mt-3 flex-col items-center justify-center gap-3 w-full text-center h-screen'>

                    <form className='flex flex-col items-center justify-center mt-5' onSubmit={(e) => {
                        e.preventDefault();
                        setAgreePopup(true);
                    }}>
                        <SelectCASYear calDate1={calDate1} calDate2={calDate2} casYearState={casYearState} setNormalDuration={setNormalDuration} normalDuration={normalDuration} setCasYearState={setCasYearState} currentYear={currentYear} setCurrentYear={setCurrentYear} space='col-md-3' title="Choose CAS Year" lastYear={lastYear} setLastYear={setLastYear} firstYear={firstYear} setFirstYear={setFirstYear} setDateInfo={setDateInfo} dateInfo={dateInfo} userAllDuration={{ firstYear, lastYear }} serverCasData={serverCasData} casDate={casDate} setCasDate={setCasDate} />

                        <div className='mt-5'>

                        </div>

                        {
                            casYearState && <div className='mt-5'>
                                {(shouldProceed) ?
                                    <SaveButton title={'Save and Proceed'}
                                        onClickFunction={() => { verifyDates(); }} />
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
                    {
                        casYearState && <AgreePopup agreePopup={agreePopup} setAgreePopup={setAgreePopup} setTabName={setTabName} handleNext={handleNext} fetchYears={fetchYears} casYearState={casYearState} casDate={casDate} duration={{ firstYear, lastYear }} setSaveLoader={setSaveLoader} />
                    }
                </div>
            </div>

            <div className={`${tabName === 'first' ? 'block' : 'hidden'}`}>
                <Teaching setTabName={setTabName} tabName={tabName} handleNext={handleNext} serverCasData={serverCasData && serverCasData} casYearState={casYearState} teachingData={teachingData} setTeachingData={setTeachingData} saveLoader={saveLoader} setSaveLoader={setSaveLoader} />
            </div>

            <div className={`${tabName === 'second' ? 'block' : 'hidden'}`}>
                <AcademicScore setTabName={setTabName} tabName={tabName} handleNext={handleNext} serverCasData={serverCasData && serverCasData} casYearState={casYearState} teachingData={teachingData} setTeachingData={setTeachingData} saveLoader={saveLoader} setSaveLoader={setSaveLoader} casDate={casDate} />
            </div>

            <div className={`${tabName === 'final' ? 'block' : 'hidden'}`}>
                <div>
                    <FinalPage casYear={casYearState} handleNext={handleNext} setTabName={setTabName} casYearState={casYearState} setSaveLoader={setSaveLoader} />
                </div>
            </div>

            <div className={`${tabName === 'ack' ? 'block' : 'hidden'}`}>
                <div>
                    <Acknowledgement casYear={casYearState} handleNext={handleNext} setTabName={setTabName} serviceName="CAS" />
                </div>
            </div>

            <Footer />
        </div >
    )
}

export default CasReportHome



const SaveButton = ({ type = "submit", title, onClickFunction, icon = <ArrowForwardRoundedIcon />, iconClasses = "mr-2" }) => {
    return (
        <button className="flex items-center justify-start p-2 rounded-xl text-blue-900 font-bold bg-blue-200 hover:gap-2 duration-200 ease-in-out" type={type} onClick={onClickFunction}><span className={`${iconClasses}`}>{title}</span> {icon}</button>
    )
}

export { SaveButton }