import React from 'react'
import GoBack from '../../../components/GoBack'
import Bred from '../../../components/Bred'
import Acknowlegement from './Acknowlegement';
import IntroStep from './IntroStep';
import StepStatus from '../../../components/StepStatus';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const FeedbackHome = ({ children, userType, links, academicYear, setAcademicYear, schoolName, setSchoolName, activeStep, setActiveStep, customfunctionOnBack = false, customSteps = false, customYears = false }) => {

    const steps = ['Choose School & Year', `${userType} Feedback Form`, 'Acknowlegement'];


    const navigate = useNavigate()

    const functionOnBack = () => {
        if (activeStep === 2) {
            // setActiveStep(1);
            toast.error("You can not go back after successfull form submission.")
        } else if (activeStep === 1) {
            setActiveStep(0);
        } else if (activeStep === 0) {
            navigate(-1)
        }
    }

    return (
        <div>
            <div>
                <div>
                    <GoBack functionOnBack={customfunctionOnBack || functionOnBack} pageTitle={`${userType} Feedback Form ${academicYear ? `(${academicYear})` : ''} `} shouldScroll={true} />
                </div>

                <div className='mt-2 mb-3'>
                    <Bred links={links} />
                </div>
                <div className='mt-3'>
                    <StepStatus activeStep={activeStep} steps={customSteps || steps} />
                </div>


                {
                    activeStep === 0 && <div>
                        <IntroStep customYears={customYears} setActiveStep={setActiveStep} setAcademicYear={setAcademicYear} academicYear={academicYear} schoolName={schoolName} setSchoolName={setSchoolName} />
                    </div>
                }


                {
                    activeStep === 1 && <>
                        {children}
                    </>
                }


                {
                    activeStep === 2 && <div>
                        <Acknowlegement />
                    </div>
                }



            </div>
        </div>
    )
}

export default FeedbackHome
