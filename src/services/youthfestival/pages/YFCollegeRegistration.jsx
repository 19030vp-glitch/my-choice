import React, { useEffect, useState } from 'react'
import siteLinks from '../../../components/siteLinks'
import DomainAddRoundedIcon from '@mui/icons-material/DomainAddRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import Footer from '../../../components/Footer';
import { Alert, AlertTitle, IconButton } from '@mui/material';
import Axios from 'axios'
import { toast } from 'react-hot-toast';
import EnterOTPComponent from '../../student/components/EnterOTPComponent';
import useLocalStorage from '../../../hooks/useLocalStorage';
import checkPasswordStrength from '../../../js/passwordChecker';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { Link, useNavigate } from 'react-router-dom';
import Text from '../../../components/formComponents/Text';
import Bred from '../../../components/Bred';
import StepStatus from '../../../components/StepStatus';
import Note from '../../director/reports/academic-audit/components/Note';
import title from '../../../js/title';
import Select from '../../../components/formComponents/Select';
import { api } from '../../../js/api';


const CollegeRegistration = () => {

    // all states
    const initialState = { collegeName: "", principalName: "", password: "", cPassword: "", mobile: "", email: "", address: "" }
    const [values, setValues] = useState(initialState)
    const { collegeName, principalName, password, cPassword, mobile, email, address, district, collegeCode } = values
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [otp, setOtp] = useState({ serverOTP: null, clientOTP: null })
    const [enteredOTP, setEnteredOTP] = useState('')
    const [verifyLoading, setVerifyLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)
    const [step, setStep] = useState(1)

    console.log('Step:', step)

    const [shouldUpdate, setShouldUpdate] = useState(false)

    useLocalStorage({ titleOfStorage: "CollegeRegistrationForm", formData: values, setFormData: setValues, shouldUpdate, setShouldUpdate, initialState, dependancies: [] })

    // send otp
    function sendOTP() {
        setLoading(true)
        Axios.post(`${api}/sendOTPOnEMail`, { emailId: email, userType: "College" })
            .then((res) => {
                if (res.data.status === 'success') {
                    setOtp({ ...otp, serverOTP: res.data.otp })
                    toast.success(res.data.message)
                    setLoading(false)
                    setStep(2)
                }
                else {
                    setLoading(false)
                    toast.error(res.data.message)
                }

            }).catch((err) => {
                console.log(err);
                setLoading(false)
                toast.error('Internal Server Error')
            })
    }

    // Handle first step of registration
    function handleFirstStep(e) {
        e.preventDefault()

        if (checkPasswordStrength(password, cPassword, setErrorMessage)) {
            setErrorMessage(null)
            handleSecondStep()
        }

    }

    function handleSecondStep() {

        // check if file is selected
        setLoading(true)
        // check if username already exists
        Axios.post(`${api}/service/youthfestival-checkAndEmail`, { email }).then(function (res) {
            if (res.data.status === 'taken') {
                toast.error(res.data.message)
                setLoading(false)
                return
            }
            else {
                sendOTP()
            }
        })

    }

    // Handle Registration Form
    function handleRegistration() {

        setVerifyLoading(true)

        let formData = new FormData();
        Object.keys(values).map((key) => {
            formData.append(key, values[key]);
        });
        formData.append('serverOTP', otp.serverOTP)
        formData.append('clientOTP', otp.clientOTP)

        // route at student-auth file line 136
        Axios.post(`${api}/api/auth/youthfestival-register`, formData).then(function (response) {
            if (response.data.status === 'success') {
                localStorage.removeItem("CollegeRegistrationForm")
                toast.success(response.data.message)
                setStep(3)
            }
            else {
                setEnteredOTP(() => '')
                toast.error(response.data.message)
                setVerifyLoading(false)
            }
        }).catch(function (err) {
            toast.error('Internal Server Error')
            setVerifyLoading(false)

        })
    }


    useEffect(() => {

        setOtp((prev) => {
            return { ...prev, clientOTP: enteredOTP }
        })

    }, [enteredOTP])

    useEffect(() => {
        if (otp.clientOTP?.length === 6 && step === 2) {
            handleRegistration()
        }
    }, [otp])

    useEffect(() => {
        const element = document.getElementById('top');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }, [step])

    const bredLinks = [siteLinks.welcome, siteLinks.yfCollegeRegistration]
    const steps = ["College Information", "Email Verification", "Registration Successful"]
    title(siteLinks.yfCollegeRegistration.title)

    return (
        <div>

            <div className='mt-2'>
                <Bred links={bredLinks} />
            </div>

            <div className="mt-2">
                <StepStatus steps={steps} activeStep={step - 1} />
            </div>

            <div className='flex items-center justify-center gap-2 mb-3 mt-6 mx-auto' id="top">
                <DomainAddRoundedIcon className='text-orange-700 mb-1' />
                <p className='text-orange-700 font-bold text-xl'> Youth Festival College Registration </p>
            </div>

            <div>
                <div className='mt-3 flex items-center justify-center mb-4 animate-fade-up animate-once'>
                    <div className='w-[750px] p-3 rounded-xl bg-gray-100'>

                        <div className='my-3 mx-2'>
                            {
                                (step === 2) && otp.serverOTP && <Alert severity="success" sx={{ borderRadius: '5px', border: '2px solid green' }}>
                                    <AlertTitle>Success</AlertTitle>
                                    OTP has been successfully sent on — <strong>{email}</strong>
                                </Alert>
                            }
                            {
                                (errorMessage && step === 1) && <Alert severity="warning" sx={{ borderRadius: '5px', border: '2px solid orange' }}>
                                    <AlertTitle>Password is not strong</AlertTitle>
                                    {errorMessage}
                                </Alert>
                            }
                        </div>


                        <div>
                            {step === 1 &&
                                <form className="row g-3 needs-validation sm:p-3" onSubmit={handleFirstStep}   >

                                    <Text className="col-md-6" id="collegeName" value={collegeName} setState={setValues} label="College Name" />
                                    <Text className="col-md-3" id="collegeCode" value={collegeCode} setState={setValues} label="College Code" />
                                    <Select options={["Nanded", "Latur", "Parbhani", "Hingoli"]} className="col-md-3" id="district" value={district} setState={setValues} label="Distict" />

                                    <Text className="col-md-6" id="principalName" value={principalName} setState={setValues} label="Principal Name" />

                                    <Text className="col-md-6" id="email" value={email} setState={setValues} label="Principal / College Email" type='email' />

                                    <Note title="Please ensure that you provide a valid email address, as an OTP and password will be sent to it." />

                                    <Text className="col-md-3" id="mobile" value={mobile} setState={setValues} label="Mobile Number" type='number' />

                                    <Text className="col-md-9" id="address" value={address} setState={setValues} label="College Address" />


                                    <Text className='col-md-6' id="password" value={password} label="Create Password" type='password' setState={setValues} />

                                    <Text className='col-md-6' id="cPassword" value={cPassword} label="Confirm Password" type='password' setState={setValues} />



                                    <div className="w-full my-4 flex items-center justify-center">
                                        {
                                            loading ?
                                                <button className="btn btn-primary py-2 px-3 rounded-lg mx-4 flex items-center justify-center" type="button" disabled>
                                                    <span className="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="true"></span>
                                                    Sending OTP...
                                                </button>

                                                :

                                                <button className="flex items-center justify-start mx-4 gap-3 hover:bg-blue-800  bg-blue-600 text-white py-2 px-4 
                                                rounded-lg" type="submit" >
                                                    Send OTP on Email
                                                </button>
                                        }
                                    </div>

                                </form>}

                            {step == 2 &&
                                <div >
                                    <div className="w-full flex items-center justify-center h-52">
                                        <form className="row g-3 needs-validation" type="multipart/form-data">

                                            <div className='mx-auto flex flex-col items-center justify-center'>
                                                <div className="mx-auto mb-3">
                                                    <label htmlFor="validationCustomUsername" className="form-label">Enter OTP</label>
                                                    <EnterOTPComponent otp={enteredOTP} setOtp={setEnteredOTP} onOTPEntered={handleRegistration} />
                                                </div>
                                                <div className='w-full flex items-center justify-center gap-2 mt-3'>
                                                    <div onClick={() => { setOtp(() => { return { ...otp, clientOTP: null } }); setStep(1); setVerifyLoading(false); setLoading(false); }} type="submit" className='bg-gray-200 rounded-full'>
                                                        <IconButton>
                                                            <ArrowBackRoundedIcon />
                                                        </IconButton>
                                                    </div>
                                                    <div className="flex items-center justify-center">
                                                        {
                                                            verifyLoading ?
                                                                <button className="btn btn-primary py-2 px-3 rounded-lg flex items-center justify-center" type="button" disabled>
                                                                    <span className="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="true"></span>
                                                                    Verifying...
                                                                </button>
                                                                :
                                                                <button className="flex items-center justify-start gap-3 hover:bg-blue-800  bg-blue-600 text-white py-2 px-4 rounded-lg" >
                                                                    Verify
                                                                </button>
                                                        }

                                                        {
                                                            loading ?
                                                                <button className="btn btn-primary py-2 px-3 rounded-lg mx-4 flex items-center justify-center" type="button" disabled>
                                                                    <span className="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="true"></span>
                                                                    Resending...
                                                                </button>

                                                                :

                                                                <button className="flex items-center justify-start mx-4 gap-3 hover:bg-blue-800  bg-blue-600 text-white py-2 px-4 rounded-lg" type="button" onClick={sendOTP} >
                                                                    Resend
                                                                </button>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>}

                            {step === 3 &&
                                <div className="w-full flex items-center justify-center h-67">
                                    <div>
                                        <div className='flex flex-col text-center items-center justify-center'>
                                            <CheckCircleRoundedIcon className='text-green-700'
                                                sx={{ fontSize: 65 }} />

                                            <b className="text-xl mb-3">Congratulations!</b>
                                            <p> Your College has been successfully registered at  <b>SRTMUN-UIMS</b> </p>
                                        </div>
                                        <div className='text-center mb-3 mt-3'>
                                            {
                                                <div>
                                                    <strong>Email</strong> is your Username and
                                                    remember your password that you entered. <br />


                                                    <div className="my-5 flex items-center justify-center md:gap-4 gap-2">
                                                        <button onClick={() => { navigate('/') }} className="flex items-center justify-start gap-3 hover:bg-blue-800 md:text-base text-sm bg-blue-600 text-white py-2 px-4 rounded-lg" >
                                                            Home Page
                                                        </button>
                                                        <button onClick={() => { navigate(siteLinks.yfCollegeLogin.link) }} className="flex items-center justify-start gap-3 hover:bg-blue-800 md:text-base text-sm bg-blue-600 text-white py-2 px-4 rounded-lg" >
                                                            Login to Fill Details
                                                        </button>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>}
                        </div>

                        <p className='text-center mt-2'>Already have an account? <Link to={siteLinks.yfCollegeLogin.link} className='cursor-pointer hover:text-blue-900 text-blue-600'>Login Now.</Link></p>
                    </div>
                </div>
                <div className='pt-10'>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default CollegeRegistration
