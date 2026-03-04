import React, { useState } from 'react'
import GoBack from '../../../components/GoBack'
import CTextField from '../../director/components/FormComponents/CTextField';
import SYTextField from '../../director/components/FormComponents/SYTextField';
import SCTextField from '../../director/components/FormComponents/SCTextField';
import Lists from '../../../components/tableComponents/Lists';
import { Grid } from '@mui/material';
import ArrowButton from '../../../components/ArrowButton';
import useLocalStorage from '../../../hooks/useLocalStorage';
import StepStatus from '../../../components/StepStatus';
import IntroStep from '../../feedback/components/IntroStep';
import { academicYearGenerator } from '../../../inputs/Year';
import { useNavigate } from 'react-router-dom';
import { handleUMPSCRegistration } from '../js/UMPSCRegistration';
import Acknowledgement from '../../../components/Acknowledgement';
import title from '../../../js/title';
import siteLinks from '../../../components/siteLinks';

const UMPSCStudentRegistration = () => {
    title(siteLinks.skillUMPSCRegistration.title)
    const initialState = { studentName: "", gender: "", category: "", isMinority: "", mobile: "", email: "", address: "", district: "" }
    const [values, setvalues] = useState(initialState);
    const navigate = useNavigate()
    const [shouldUpdate, setShouldUpdate] = useState(false)
    const [academicYear, setAcademicYear] = useState(null)
    const [activeStep, setActiveStep] = useState(0)
    const steps = ["Choose Academic Year", "Fill Registration Form", "Acknowledgement"]

    const titleOfStorage = `UMPSC-Registration-${academicYear}`
    useLocalStorage({ titleOfStorage, formData: values, setFormData: setvalues, initialState, shouldUpdate, setShouldUpdate, dependancies: [] })

    const handleRegistration = (e) => {
        e.preventDefault();
        handleUMPSCRegistration({ ...values, academicYear }, titleOfStorage, handleNext, setAcademicYear)
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const navigateTabs = () => {
        if (activeStep === 2) {
            setActiveStep(0)
            setAcademicYear(null)
            setvalues(initialState)
        } else if (activeStep === 1) {
            handleBack()
        } else if (activeStep === 0) {
            navigate(-1)
        }
    }

    const links = [siteLinks.welcome, siteLinks.skillUMPSCRegistration]

    return (
        <div>
            <GoBack bredLinks={links} pageTitle={siteLinks.skillUMPSCRegistration.title} functionOnBack={navigateTabs} />

            <div className="my-3">
                <StepStatus activeStep={activeStep} steps={steps} />
            </div>


            {
                activeStep === 0 && <div className='w-full'>
                    <IntroStep setAcademicYear={setAcademicYear} setActiveStep={setActiveStep} schoolName="donotshow" academicYear={academicYear} customYears={academicYearGenerator(2, false, true)} />
                </div>
            }

            {
                activeStep === 1 && <div className="my-3">

                    <form onSubmit={handleRegistration} className="mt-4 bg-gray-50 rounded-md p-2 border">
                        <p className="text-center font-bold my-3 text-lg">Registration Form {`(${academicYear})`} </p>
                        <Grid container >
                            <CTextField label="Name of the Student" type="text" value={values.studentName} id="studentName" required={true} onch={setvalues} />
                            <SCTextField label="Gender" value={values.gender} id="gender" required={true} type="text" onch={setvalues} select={["Male", "Female", "Other"]} />
                            <SCTextField label="Category" value={values.category} id="category" required={true} type="text" onch={setvalues} select={Lists.casts} />
                            <SCTextField label="Do you belong to Minority Community?" value={values.isMinority} id="isMinority" required={true} type="text" onch={setvalues} select={["Yes", "No"]} />
                            <CTextField label="WhatsApp Mobile Number" type="text" value={values.mobile} id="mobile" required={true} onch={setvalues} />
                            <CTextField label="Email ID" type="text" value={values.email} id="email" required={true} onch={setvalues} />
                            <CTextField label="Present full address" type="text" value={values.address} id="address" required={true} onch={setvalues} />
                            <CTextField label="In which district do you live?" type="text" value={values.district} id="district" required={true} onch={setvalues} />

                            <ArrowButton className="m-3" title="Submit Form" type="submit" />
                        </Grid>
                    </form>
                </div>
            }

            {
                activeStep === 2 && <div>
                    <Acknowledgement title="UPSC MPSC Foundation Course Registration Successful" navigateTo="/" >
                        <p className="my-3">Thank you, <b>{values.studentName}</b>, your registration for <b>UPSC-MPSC Foundation course {`(${academicYear})`}</b> is successful. </p>
                    </Acknowledgement>
                </div>
            }
        </div >
    )
}

export default UMPSCStudentRegistration
