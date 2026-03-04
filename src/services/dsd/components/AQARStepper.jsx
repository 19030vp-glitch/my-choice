import React, { useState } from 'react'
import GoBack from '../../../components/GoBack'
import siteLinks from '../../../components/siteLinks'
import title from '../../../js/title'
import StepStatus from '../../../components/StepStatus'
import Year from '../../../inputs/Year'
import { SaveButton } from '../../faculty/reports/pbas/PbasReportHome'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Acknowledgement from '../../../components/Acknowledgement'
import isReportSubmitted from '../js/isReportSubmitted'


const AQARStepper = ({ children, bredLinks, submitModel, user, tableTitles, navigateToAfterSubmission, setAqarYearState, aqarYearState, showSteps = true }) => {
    const steps = ["Select AQAR Academic Year", "Fill AQAR Form & Submit", "Acknowledgement"]
    const [activeStep, setActiveStep] = useState(0)
    const navigate = useNavigate()

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const navigateTabs = () => {
        if (activeStep === 2) {
            handleBack()
        } else if (activeStep === 1) {
            handleBack()
        } else if (activeStep === 0) {
            navigate(-1)
        }
    }

    const handleFormSubmit = () => {
        isReportSubmitted(aqarYearState, submitModel, handleNext)
    }


    return (
        <div>
            <GoBack pageTitle={`Annual Quality Assurance Report Form ${aqarYearState ? `(${aqarYearState})` : ''}`} bredLinks={bredLinks} functionOnBack={navigateTabs} />
            <div className='w-full'>
                {showSteps && <div className='mt-3'>
                    <StepStatus activeStep={activeStep} steps={steps} />
                </div>}

                {/* FORM BODY */}
                {/* STEP 0 */}
                {
                    activeStep === 0 && <div className='h-screen'>
                        <div className='mx-auto flex items-center text-center justify-center my-5'>
                            <Year state={aqarYearState} setState={setAqarYearState} space='col-md-3'
                                title="Choose AQAR Academic Year" numberOfYearsToDisplay={3} />
                        </div>
                        <div className='mx-auto flex items-center justify-center'>
                            <SaveButton title={`Save and Proceed`} onClickFunction={() => {
                                if (aqarYearState) {
                                    handleNext()
                                } else {
                                    toast.error('Select AQAR Year before you proceed.')
                                }
                            }} />
                        </div>
                    </div>
                }

                {
                    activeStep === 1 && <div className="my-5">
                        <div>{children}</div>
                        {showSteps && <SaveButton title={`Save and Submit`} onClickFunction={() => {
                            if (aqarYearState) {
                                handleFormSubmit();
                            } else {
                                toast.error('Select AQAR Year before you proceed.')
                            }
                        }} />}
                    </div>
                }

                {
                    activeStep === 2 && <Acknowledgement title="Successful AQAR Data Submission" navigateTo={navigateToAfterSubmission}>
                        <>
                            <p>Thank you, <b>{user?.name}</b> for successfully submitting the Annual Quality Assurance Report (AQAR) for the year <b>{aqarYearState}</b> of {user?.department}.</p>

                            <div className='my-5 text-left'>
                                <ul className="list-group">
                                    <li className="list-group-item disabled" aria-disabled="true">Your AQAR Form has following information related to</li>
                                    {
                                        tableTitles?.map((title, index) => {
                                            return <li className="list-group-item">{index + 1}. {title}</li>
                                        })
                                    }

                                </ul>
                            </div>
                        </>
                    </Acknowledgement>
                }

            </div>
        </div>
    )
}

export default AQARStepper
