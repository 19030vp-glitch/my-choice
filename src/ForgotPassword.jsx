import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Bred from '../components/Bred'
import GoBack from '../components/GoBack'
import siteLinks from '../components/siteLinks'
import StepStatus from '../components/StepStatus'
import title from '../js/title'
import HttpsRoundedIcon from '@mui/icons-material/HttpsRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { Alert, AlertTitle } from '@mui/material'
import Footer from '../components/Footer'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import Axios from 'axios'
import { toast } from 'react-hot-toast'
import { api } from './js/api'

const ForgotPassword = () => {

    const services = {
        faculty: { model: 'User', title: "Faculty Password Reset", link: siteLinks.facultyLogin.link },
        director: { model: 'Director', title: "Director Password Reset", link: siteLinks.directorLogin.link },
        student: { model: 'Student', title: "Student Password Reset", link: siteLinks.studentLogin.link },
        alumni: { model: 'Alumni', title: "Alumni Password Reset", link: siteLinks.alumniLogin.link },
    }
    const [activeStep, setActiveStep] = useState(0)

    const { serviceName } = useParams()
    const navigate = useNavigate()
    const steps = ['Provide Email', 'OTP Verification', 'Create new Password', 'Successful'];
    title(services[serviceName]?.title)
    const [otp, setOtp] = useState({ serverOTP: null, clientOTP: null })
    const [email, setEmail] = useState(null)
    const [newPassword, setNewPassword] = useState(null)
    const [newCPassword, setNewCPassword] = useState(null)
    const [loading, setLoading] = useState(false)
    const [verifyLoading, setVerifyLoading] = useState(false)

    useEffect(() => {
        if (serviceName in services === false) {
            navigate(siteLinks.welcome.link)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [serviceName])



    // all functions are here
    const sendOTP = async (e) => {
        setLoading(true)
        e.preventDefault();

        // route in utility/forgotPassword
        const link = `${api}/sendOTPOnEMailForPasswordReset`
        Axios.post(link, { email, model: services[serviceName].model }).then((res) => {
            if (res.data.status === 'success') {
                toast.success(res.data.message);
                setOtp({ ...otp, serverOTP: res.data.otp })
                setActiveStep(1)
                setLoading(false)
            } else {
                toast.error(res.data.message);
                setLoading(false)
            }
        }).catch((err) => {
            toast.error('Something went wrong...')
            setLoading(false)
        })
    }

    const verifyOTP = (e) => {
        e.preventDefault();
        // route in utility/verifyOTP
        const link = `${api}/services/verifyOTP`
        Axios.post(link, { otp }).then((res) => {
            if (res.data.status === 'matched') {
                toast.success(res.data.message);
                setActiveStep(2)
                setLoading(false)
            } else {
                toast.error(res.data.message);
                setLoading(false)
            }
        }).catch((err) => {
            toast.error('Something went wrong...')
            setLoading(false)
        })
    }

    const updatePassword = (e) => {
        e.preventDefault();

        // validate password
        if (newPassword !== newCPassword) {
            toast.error('Passwords does not match')
            return
        }

        // route in utility/forgotPassword
        const link = `${api}/service/forgotPassword`
        Axios.post(link, { email, model: services[serviceName].model, newPassword }).then((res) => {
            if (res.data.status === 'success') {
                toast.success(res.data.message);
                setActiveStep(3)
                setLoading(false)
            } else {
                toast.error(res.data.message);
                setLoading(false)
            }
        }).catch((err) => {
            toast.error('Something went wrong...')
            setLoading(false)
        })

    }

    return (
        <div>
            <GoBack pageTitle={services[serviceName]?.title} />
            <div className="my-3"><Bred links={[siteLinks.welcome, siteLinks.forgotPassword]} /></div>
            <div className='mt-3'>
                <StepStatus activeStep={activeStep} steps={steps} />
            </div>

            <div>
                <div>

                    <div className='flex items-center justify-center gap-2 mb-3 mt-6 mx-auto'>
                        <HttpsRoundedIcon className='text-orange-700' sx={{ fontSize: '20px' }} />
                        <p className='text-orange-700 font-bold text-lg'>{services[serviceName]?.title}</p>
                    </div>

                    <div className='mt-3 flex items-center justify-center mb-4'>
                        <div className='w-[650px] p-3 rounded-xl bg-gray-100'>

                            <div className='m-4'>
                                {
                                    (activeStep === 1) && otp.serverOTP && <Alert severity="success" sx={{ borderRadius: '5px', border: '2px solid green' }}>
                                        <AlertTitle>Success</AlertTitle>
                                        OTP has been successfully sent on — <strong>{email}</strong>
                                    </Alert>
                                }
                            </div>


                            {
                                activeStep === 0 && <div>
                                    <form className="row g-3 needs-validation sm:p-3" onSubmit={sendOTP}   >

                                        <div className="col-md-10 mx-auto mt-3">
                                            <label htmlFor="validationCustomUsername"
                                                className="form-label">Email ID</label>
                                            <div className="input-group has-validation">

                                                <input type="email" className="form-control py-3" id="validationCustomUsername" aria-describedby="inputGroupPrepend" placeholder="example@gmail.com" required value={email} onChange={(e) => setEmail(e.target.value)} />

                                            </div>

                                        </div>

                                        {
                                            loading ?
                                                <div className='flex items-center justify-center gap-3'>
                                                    <button className="btn btn-primary py-2 px-3 mt-3 rounded-lg flex items-center justify-center" type="button" disabled>
                                                        <span className="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="true"></span>
                                                        Sending OTP...
                                                    </button>
                                                </div>


                                                :

                                                <div className='flex items-center justify-center gap-3'>
                                                    <button className="flex items-center justify-start mt-3 gap-3 hover:bg-blue-800  bg-blue-600 text-white py-2 px-4 rounded-lg" type="submit" >
                                                        Send OTP
                                                    </button>
                                                </div>

                                        }

                                    </form>
                                </div>
                            }
                            {
                                activeStep === 1 && <div>
                                    <div className="w-full flex items-center justify-center h-52">
                                        <form className="row g-3 needs-validation" onSubmit={verifyOTP} type="multipart/form-data">

                                            <div className='mx-auto flex flex-col items-center justify-center'>
                                                <div className="col-sm-8 mx-auto mb-3">
                                                    <label htmlFor="validationCustomUsername" className="form-label">Enter OTP</label>
                                                    <div className="input-group has-validation">

                                                        <input type="number" className="form-control py-3" id="validationCustomUsername" aria-describedby="inputGroupPrepend" placeholder="Enter OTP" required value={otp.clientOTP} onChange={(e) => setOtp({ ...otp, clientOTP: e.target.value })} />

                                                    </div>

                                                </div>
                                                <div className='w-full flex items-center justify-center gap-2'>
                                                    <div className="flex items-center justify-center">
                                                        <button onClick={() => { setActiveStep(0); setVerifyLoading(false); setLoading(false); setOtp({ ...otp, clientOTP: null }) }} className="flex items-center justify-start mt-3 gap-1 hover:bg-blue-800 bg-blue-600 text-white p-2 rounded-lg" type="submit"><ArrowBackRoundedIcon sx={{ fontSize: '20px' }} className='mt-1' /> Back  </button>

                                                    </div>
                                                    <div className="flex md:flex-row flex-col items-center justify-center">

                                                        {
                                                            verifyLoading ?
                                                                <button className="btn btn-primary py-2 px-3 mt-3 rounded-lg flex items-center justify-center" type="button" disabled>
                                                                    <span className="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="true"></span>
                                                                    Verifying OTP...
                                                                </button>

                                                                :

                                                                <div className='flex items-center justify-center gap-3'>
                                                                    <button className="flex items-center justify-start mt-3 gap-3 hover:bg-blue-800  bg-blue-600 text-white py-2 px-4 rounded-lg" type="submit" >
                                                                        Verify OTP
                                                                    </button>
                                                                </div>

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

                            {
                                activeStep === 2 && <div>
                                    <div className="w-full flex items-center justify-center">
                                        <form className="row g-3 w-full needs-validation" onSubmit={updatePassword} type="multipart/form-data">


                                            <div className='col-md-8 mx-auto'>

                                                {/* // NEW PASSWORD */}
                                                <input type="password" placeholder="Create a new password" className="p-3 rounded-lg mt-3 form-control" required value={newPassword} onChange={(e) => { setNewPassword(e.target.value) }} />

                                                <input type="password" placeholder="New password, again" className="p-3 mt-3 rounded-lg form-control" required value={newCPassword} onChange={(e) => { setNewCPassword(e.target.value) }} />

                                                <p className="text-muted text-xs text-center mt-3">Create a new password, and use it to login after successfully submitting. </p>


                                                <div className="flex items-center justify-center">

                                                    {
                                                        loading ?
                                                            <button className="btn btn-primary py-2 px-3 mt-3 rounded-lg flex items-center justify-center" type="button" disabled>
                                                                <span className="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="true"></span>
                                                                Verifying OTP...
                                                            </button>

                                                            :

                                                            <div className='flex items-center justify-center gap-3'>
                                                                <button className="flex items-center justify-start mt-3 gap-3 hover:bg-blue-800  bg-blue-600 text-white py-2 px-4 rounded-lg" type="submit" >
                                                                    Submit
                                                                </button>
                                                            </div>

                                                    }

                                                </div>

                                            </div>
                                        </form>
                                    </div>
                                </div>
                            }

                            {
                                activeStep === 3 && <div>
                                    <div className="w-full flex items-center justify-center h-52">
                                        <div>
                                            <div className='flex flex-col items-center justify-center'>
                                                <CheckCircleRoundedIcon className='text-green-700'
                                                    sx={{ fontSize: 65 }} />

                                                Congratulations! Your password has been updated successfully.
                                            </div>
                                            <div className='flex items-center justify-center gap-3 mt-4'>
                                                <Link to={services[serviceName].link} className="flex items-center justify-start mt-3 gap-3 hover:bg-blue-800  bg-blue-600 text-white py-2 px-4 rounded-lg">Log in</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }


                        </div>

                    </div>

                    <div className='pt-10'>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword