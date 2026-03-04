import React from 'react'
import GoBack from '../../../components/GoBack'
import { useSelector } from 'react-redux'
import siteLinks from '../../../components/siteLinks'
import StepStatus from '../../../components/StepStatus'
import { useState } from 'react'
import Year from '../../../inputs/Year'
import { SaveButton } from '../../faculty/reports/cas/CasReportHome'
import { toast } from 'react-hot-toast'
import useDirectorAuth from '../../../hooks/useDirectorAuth'
import UploadActionReport from '../components/UploadActionReport'
import Footer from '../../../components/Footer'
import title from '../../../js/title'
import Acknowledgement from '../../../components/Acknowledgement'
import { useNavigate } from 'react-router'

const ActionOnFeedback = () => {

    const user = useSelector((state) => state.user.directorUser)
    title('Action Taken Report')
    const [activeStep, setActiveStep] = useState(0)
    const [tabName, setTabName] = useState('year')
    const [actionYear, setActionYear] = useState(null)
    const navigate = useNavigate()
    useDirectorAuth()


    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const steps = ["Choose Academic Year", "Upload Action Taken Report for Feedback", "Acknowledgment"]

    const navigateTabs = () => {
        if (tabName === 'ack') {
            setTabName('action')
            handleBack()
        }
        else if (tabName === 'action') {
            setTabName('year')
            handleBack()
        } else if (tabName === 'year') {
            navigate(siteLinks.directorHome.link)
        }

    }

    return (
        <div>
            <GoBack functionOnBack={navigateTabs} bredLinks={[siteLinks.welcome, siteLinks.directorHome, siteLinks.feedbackAction]} pageTitle={`Feedback Action Taken Report by Director ${actionYear ? `(${actionYear})` : ''}`} showAvatar={{ photoURL: user?.photoURL, userType: 'director' }} />

            <div className="mt-3">
                <StepStatus activeStep={activeStep} steps={steps} />
            </div>

            <div>
                {
                    tabName === 'year' && <div className='h-screen'>
                        <div className='mx-auto flex items-center text-center justify-center my-5'>
                            <Year state={actionYear} setState={setActionYear} space='col-md-3'
                                title="Choose Academic Year" numberOfYearsToDisplay={3} />
                        </div>
                        <div className='mx-auto flex items-center justify-center'>
                            <SaveButton title={`Proceed to Upload`} onClickFunction={() => {
                                if (actionYear) {
                                    setTabName('action'); handleNext()
                                } else {
                                    toast.error('Please choose the year for which you would like to upload the action report.')
                                }
                            }} />
                        </div>
                    </div>
                }
            </div>

            <div>
                {
                    tabName === 'action' && <div>
                        <UploadActionReport academicYear={actionYear} schoolName={user?.department} handleNext={handleNext} setTabName={setTabName} />
                    </div>
                }
            </div>

            <div>
                {
                    tabName === 'ack' && <div>
                        <Acknowledgement title={`Successfull submission of Action Taken Reports for Feedback of year ${actionYear}.`} navigateTo={siteLinks.directorHome.link} >
                            <div className='my-5 text-left'>
                                <ul className="list-group">
                                    <li className="list-group-item disabled" aria-disabled="true">You have submitted Action Taken Reports for</li>
                                    <li className="list-group-item">01. Student</li>
                                    <li className="list-group-item">02. Teacher</li>
                                    <li className="list-group-item">03. Alumni</li>
                                    <li className="list-group-item">04. Parent</li>
                                    <li className="list-group-item">05. Employer</li>
                                    <li className="list-group-item">06. Expert</li>
                                </ul>
                            </div>
                        </Acknowledgement>
                    </div>
                }
            </div>

            <Footer />
        </div>
    )
}

export default ActionOnFeedback
