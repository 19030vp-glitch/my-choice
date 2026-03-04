import React, { useState } from 'react'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { Alert, AlertTitle } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import toast from 'react-hot-toast';
import siteLinks from '../../../components/siteLinks'
import Bred from '../../../components/Bred';
import DeptSelect from '../../../inputs/DeptSelect';
import Footer from '../../../components/Footer'
import DesignationSelect from '../../../inputs/DesignationSelect';
import GenderSelect from '../../../inputs/GenderSelect';
import SalutationSelect from '../../../inputs/SalutationSelect';
import title from '../../../js/title';
import CredInput from '../../../inputs/CredInput';
import LocalLibraryRoundedIcon from '@mui/icons-material/LocalLibraryRounded';
import checkPasswordStrength from '../../../js/passwordChecker';
import ProfileCroper from '../../../components/ProfileCroper';
import { api } from '../../../js/api';

const DirectorRegistration = () => {

    const [step, setStep] = useState(2)
    const navigate = useNavigate();
    title("Director Registration")

    // all states
    const [salutation, setSalutation] = useState('')
    const [name, setName] = useState('')
    const [designation, setDesignation] = useState('')
    const [department, setDepartment] = useState('')
    const [gender, setGender] = useState('')
    const [password, setPassword] = useState('')
    const [cPassword, setCPassword] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [email, setEmail] = useState('')
    const [info, setInfo] = useState(null)
    const [avatar, setAvatar] = useState(null)
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [otp, setOtp] = useState({ serverOTP: null, clientOTP: null })
    const [verifyLoading, setVerifyLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    const [open, setOpen] = useState(false)


    // send otp
    function sendOTP() {
        console.log('in send otp')
        setLoading(true)
        Axios.post(`${api}/sendOTPOnEMail`, { emailId: email, userType: "Director" })
            .then((res) => {
                console.log('Email sent successfully : ', res.data)
                if (res.data.status === 'success') {
                    setOtp({ ...otp, serverOTP: res.data.otp })
                    toast.success(res.data.message)
                    setLoading(false)
                    setStep(3)
                }
                else {
                    setLoading(false)
                    toast.error(res.data.message)
                }

            }).catch((err) => {
                console.log(err);
                setLoading(false)
                toast.error('Internal Server Error while sending mail')
            })
    }

    // Handle first step of registration
    function handleFirstStep(e) {
        e.preventDefault()

        if (checkPasswordStrength(password, cPassword, setErrorMessage)) {
            setErrorMessage(null)
            setStep(2);

            const info = { salutation, name: name, designation, department, gender, password, }
            setInfo(info)
        }
    }

    function handleSecondStep(e) {
        e.preventDefault()

        // check if file is selected
        if (file) {

            setLoading(true)

            // check if mobileNumber already exists
            Axios.post(`${api}/service/checkAndEmail`, { email, modelToCheck: 'DirectorUser', filter: { department }, type: 'director' }).then(function (res) {
                if (res.data.status === 'taken') {
                    toast.error(res.data.message)
                    setLoading(false)
                    return
                }
                else {
                    console.log('Before send otp');
                    sendOTP()
                }
            })
        } else {
            setLoading(false)
            toast.error('Please select a photo')
            return
        }
    }

    // Handle Registration Form
    function handleRegistration(e) {
        e.preventDefault()

        setVerifyLoading(true)

        // upload file
        const formData = new FormData()
        formData.append('file', file)
        formData.append('mobileNumber', mobileNumber)
        formData.append('email', email)
        formData.append('salutation', info.salutation)
        formData.append('name', info.name)
        formData.append('designation', info.designation)
        formData.append('department', info.department)
        formData.append('gender', info.gender)
        formData.append('password', info.password)
        formData.append('serverOTP', otp.serverOTP)
        formData.append('clientOTP', otp.clientOTP)


        Axios.post(`${api}/api/auth/director-register`, formData).then(function (response) {
            if (response.data.status === 'success') {
                navigate('/director-login')
                toast.success(response.data.message)
            }
            else {
                toast.error(response.data.message)
                setVerifyLoading(false)
            }
        }).catch(function (err) {
            toast.error('Internal Server Error while registeration')
            setVerifyLoading(false)

        })
    }

    // Handle Avatar
    function handleAvatar() {
        document.getElementById('avatar').click();
    }

    // Handle Avatar change
    function handleAvatarChange(e) {
        setAvatar(null)
        const file = e.target.files[0];
        setOpen(true)
        if (e.target.files[0].size >= 10485760) {
            toast.error('Photo size should be less than 10 MB')
            setOpen(false)
            return
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setAvatar(reader.result)
            setFile(e.target.files[0])
        }
    }

    return (
        <div>

            <div className='mt-3'>
                <Bred links={[siteLinks.welcome, siteLinks.directorLogin, siteLinks.directorRegistration]} />
            </div>
            <div className='flex items-center justify-center gap-2 mb-3 mt-6 mx-auto'>
                <LocalLibraryRoundedIcon className='text-orange-700 mb-1' />
                <p className='text-orange-700 font-bold text-xl'>Director Registration</p>
            </div>

            <div className='mt-3 flex items-center justify-center mb-4'>
                <div className='w-[750px] p-3 rounded-xl bg-gray-100'>

                    <div className='my-4 mx-2'>
                        {
                            (step !== 1 && step !== 2) && otp.serverOTP && <Alert severity="success" sx={{ borderRadius: '5px', border: '2px solid green' }}>
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


                    {
                        step === 1 ?


                            <form className="row g-3 needs-validation sm:p-3" onSubmit={handleFirstStep}   >

                                <div className="col-md-2">
                                    <label htmlFor="chooseSalutation" className="form-label" >Salutation</label>
                                    <SalutationSelect id="chooseSalutation" state={salutation} setState={setSalutation} />

                                </div>
                                <div className="col-md-10">
                                    <label htmlFor="fname" className="form-label">Full Name</label>
                                    <input type="text" className="form-control" id="fname" required onChange={(e) => { setName(e.target.value) }} value={name} />

                                </div>



                                <div className="col-md-6">
                                    <label htmlFor="chooseDesignation" className="form-label">Designation</label>
                                    <DesignationSelect id="chooseDesignation" state={designation} setState={setDesignation} />

                                </div>




                                <div className="col-md-6">


                                    <DeptSelect title={'School'} setState={setDepartment} state={department} selectId="registerDept" />


                                </div>

                                <div className="col-md-2">
                                    <label htmlFor="validationCustom04" className="form-label" >Gender</label>
                                    <GenderSelect id="selectGender" state={gender} setState={setGender} />


                                </div>
                                <div className="col-md-5">
                                    <label htmlFor="validationCustom02" className="form-label" >Create Password</label>
                                    <input type="password" className="form-control" id="validationCustom02" required value={password} onChange={(e) => setPassword(e.target.value)} />

                                </div>
                                <div className="col-md-5">
                                    <label htmlFor="validationCustom02" className="form-label" id='confirmPassword'>Confirm Password</label>
                                    <input type="password" className="form-control" id="validationCustom02" value={cPassword} onChange={(e) => { setCPassword(e.target.value) }} required />

                                </div>



                                <div className="col-12 flex items-center justify-center">
                                    <button className="flex items-center justify-start mt-3 gap-2 hover:bg-blue-800 bg-blue-600 text-white p-2 rounded-lg" type="submit"> Next <ArrowForwardRoundedIcon sx={{ fontSize: '20px' }} className='mt-1' /></button>
                                </div>

                            </form>
                            : step === 2 ?
                                <div>
                                    <div>
                                        <div>
                                            {!avatar ?

                                                gender && gender === 'Male' ?
                                                    <img className="h-[90px] w-[90px] rounded-full object-cover mx-auto sm:h-[110px] sm:w-[110px] sm:mx-0" src={`/assets/male.jpg`} /> :
                                                    <img className="h-[90px] w-[90px] rounded-full object-cover mx-auto sm:h-[110px] sm:w-[110px] sm:mx-0" src={`/assets/female.jpg`} />
                                                :

                                                <img className="h-[90px] w-[90px] rounded-full object-cover mx-auto sm:h-[110px] sm:w-[110px] sm:mx-0" src={avatar} />


                                            }
                                            <p htmlFor='avatar' className="text-blue-800 text-center cursor-pointer hover:text-blue-900 p-2 bg-blue-200 rounded-xl my-2 hover:bg-blue-200 duration-200 ease-in-out col-sm-6 mx-auto" onClick={handleAvatar} >Choose Photo (Required)*</p>
                                            <div className='text-xs text-muted text-center my-2'>Photo size should be less than 10MB</div>
                                        </div>

                                        <ProfileCroper open={open} setOpen={setOpen} file={file} setFile={setFile} setAvatar={setAvatar} />

                                        <div className="w-full flex items-center justify-center ">
                                            <form className="row g-3 needs-validation" onSubmit={handleSecondStep} type="multipart/form-data">


                                                <input onChange={handleAvatarChange} type="file" name="file" id='avatar' accept='image/png, image/jpeg, image/jpg' style={{ 'display': 'none' }} />

                                                <div>
                                                    <div className="col-sm-8 mx-auto">
                                                        <label htmlFor="validationCustomMobileNumber" className="form-label">Mobile Number</label>
                                                        <CredInput state={mobileNumber} setState={setMobileNumber} placeholder="Enter your mobile number" type="text" spacing="mb-2" size={25} />

                                                    </div>
                                                    <div className="col-sm-8 mx-auto mt-3">
                                                        <label htmlFor="validationCustomMobileNumber" className="form-label">Email ID</label>
                                                        <div className="input-group has-validation">

                                                            <input type="email" className="form-control py-3" id="validationCustomMobileNumber" aria-describedby="inputGroupPrepend" placeholder="example@gmail.com" required value={email} onChange={(e) => setEmail(e.target.value)} />

                                                        </div>

                                                    </div>
                                                </div>


                                                <div className='mx-auto flex flex-col items-center justify-center'>
                                                    <div className='w-full flex items-center justify-center gap-2'>
                                                        <div className="flex items-center justify-center">
                                                            <button onClick={() => { setStep(1); setLoading(false) }} className="flex items-center justify-start mt-3 gap-1 hover:bg-blue-800 bg-blue-600 text-white p-2 rounded-lg" type="submit"><ArrowBackRoundedIcon sx={{ fontSize: '20px' }} className='mt-1' /> Back  </button>

                                                        </div>
                                                        <div className="flex items-center justify-center">

                                                            {
                                                                loading ?
                                                                    <button className="btn btn-primary py-2 px-3 mt-3 rounded-lg flex items-center justify-center" type="button" disabled>
                                                                        <span className="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="true"></span>
                                                                        Sending OTP...
                                                                    </button>

                                                                    :

                                                                    <button className="flex items-center justify-start mt-3 gap-3 hover:bg-blue-800  bg-blue-600 text-white py-2 px-4 rounded-lg" type="submit" >
                                                                        Send OTP
                                                                    </button>

                                                            }

                                                        </div>


                                                    </div>


                                                </div>
                                            </form>
                                        </div>
                                    </div>


                                </div>
                                :
                                <div >
                                    <div className="w-full flex items-center justify-center h-52">
                                        <form className="row g-3 needs-validation" onSubmit={handleRegistration} type="multipart/form-data">

                                            <div className='mx-auto flex flex-col items-center justify-center'>
                                                <div className="col-sm-8 mx-auto mb-3">
                                                    <label htmlFor="validationCustomMobileNumber" className="form-label">Enter OTP</label>
                                                    <div className="input-group has-validation">

                                                        <input type="number" className="form-control py-3" id="validationCustomMobileNumber" aria-describedby="inputGroupPrepend" placeholder="Enter OTP" required value={otp.clientOTP} onChange={(e) => setOtp({ ...otp, clientOTP: e.target.value })} />

                                                    </div>

                                                </div>
                                                <div className='w-full flex items-center justify-center gap-2'>
                                                    <div className="flex items-center justify-center">
                                                        <button onClick={() => { setStep(2); setVerifyLoading(false); setLoading(false); setOtp({ ...otp, clientOTP: null }) }} className="flex items-center justify-start mt-3 gap-1 hover:bg-blue-800 bg-blue-600 text-white p-2 rounded-lg" type="submit"><ArrowBackRoundedIcon sx={{ fontSize: '20px' }} className='mt-1' /> Back  </button>

                                                    </div>
                                                    <div className="flex items-center justify-center">

                                                        {
                                                            verifyLoading ?
                                                                <button className="btn btn-primary py-2 px-3 mt-3 rounded-lg flex items-center justify-center" type="button" disabled>
                                                                    <span className="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="true"></span>
                                                                    Verifying OTP...
                                                                </button>

                                                                :

                                                                <button className="flex items-center justify-start mt-3 gap-3 hover:bg-blue-800  bg-blue-600 text-white py-2 px-4 rounded-lg" type="submit" >
                                                                    Verify OTP
                                                                </button>

                                                        }

                                                        {
                                                            loading ?
                                                                <button className="btn btn-primary py-2 px-3 mt-3 rounded-lg mx-4 flex items-center justify-center" type="button" disabled>
                                                                    <span className="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="true"></span>
                                                                    Resending OTP...
                                                                </button>

                                                                :

                                                                <button className="flex items-center justify-start mx-4 mt-3 gap-3 hover:bg-blue-800  bg-blue-600 text-white py-2 px-4 rounded-lg" type="button" onClick={sendOTP} >
                                                                    Resend OTP
                                                                </button>
                                                        }

                                                    </div>


                                                </div>


                                            </div>
                                        </form>
                                    </div>
                                </div>
                    }


                    <p className='text-center mt-2'>Already have an account? <Link to="/director-login" className='cursor-pointer hover:text-blue-900 text-blue-600'>Login Now.</Link></p>

                </div>

            </div>

            <div className='pt-10'>
                <Footer />
            </div>
        </div>
    )
}

export default DirectorRegistration