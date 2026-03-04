import React, { useEffect, useState } from 'react'
import useDirectorAuth from '../../../hooks/useDirectorAuth'
import GoBack from '../../../components/GoBack'
import title from '../../../js/title'
import { academicYearGenerator } from '../../../inputs/Year';
import EngineeringRoundedIcon from '@mui/icons-material/EngineeringRounded';
import { Alert, AlertTitle } from '@mui/material';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import siteLinks from '../../../components/siteLinks';
import GenerateReportTemplate from '../../../components/GenerateReportTemplate';
import Footer from '../../../components/Footer';
import { api } from '../../../js/api';

const GenerateFeedbackLink = () => {
    useDirectorAuth()
    title('Generate Feedback Links')

    const [userType, setUserType] = useState(null)
    const [academicYear, setAcademicYear] = useState(null)
    const [link, setLink] = useState(null)
    const user = useSelector((state) => state.user.directorUser)

    useEffect(() => {
        console.log("userType :", userType)
    }, [userType])

    const generateLink = () => {
        if (user) {
            let generatedLink = `${api}/feedback/${userType}/${academicYear}/${user?.department}`

            setLink(generatedLink)
        }
    }

    const copyLink = () => {
        navigator.clipboard.writeText(link)
        toast.success('Link copied successfully.')
    }

    let links = [siteLinks.welcome, siteLinks.directorHome, siteLinks.generateFeedbackLinksDirector,]


    return (
        <div>

            <GenerateReportTemplate bredLinks={links} backLink={siteLinks.directorHome.link} title="Generate Feedback Links" >
                <div className="mb-5">
                    {
                        link && <div className="my-3 w-1/2 mx-auto">
                            <Alert severity="success">
                                <AlertTitle>
                                    <div className='flex items-center justify-between'>
                                        <p className='whitespace-nowrap'>Feedback Link Generated Successfully</p>
                                        <p className='text-sm bg-green-600 text-white hover:bg-green-700 px-2 rounded-full cursor-pointer' onClick={copyLink}>Copy Link</p>
                                    </div>
                                </AlertTitle>
                                <hr />
                                <p className="pt-2 text-green-900">
                                    {link && link}
                                </p>
                            </Alert>
                        </div>
                    }


                    <div className='bg-blue-100 rounded-xl py-5 mt-4 sm:w-[80%] md:w-[50%] w-full sm:mx-auto'>
                        <div className='mb-2 w-full'>
                            <div className='text-center'>
                                <label>I want to generate the feedback link for:</label>

                                <div className="flex items-center justify-center gap-4 flex-wrap mt-3">
                                    <NameRadio userType={userType} setUserType={setUserType} title="Teacher" />
                                    <NameRadio userType={userType} setUserType={setUserType} title="Student" />
                                    <NameRadio userType={userType} setUserType={setUserType} title="Alumni" />
                                    <NameRadio userType={userType} setUserType={setUserType} title="Parent" />
                                    <NameRadio userType={userType} setUserType={setUserType} title="Employer" />
                                </div>
                            </div>
                        </div>

                        <div className='mt-5 w-full'>
                            <div className='text-center'>
                                <label>For Academic Year:</label>

                                <div className="flex items-center justify-center">
                                    <div className='my-3 col-md-4'>
                                        <select onChange={(e) => setAcademicYear(e.target.value)} className="form-select" aria-label="Default select example">
                                            <option selected>Choose Year</option>
                                            {
                                                academicYearGenerator(2).map((year) => {
                                                    return <option value={year}>{year}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>



                        {
                            (userType && academicYear) ? <div className="mb-3">
                                <button onClick={generateLink} className='flex items-center justify-center mx-auto gap-2 mt-4 rounded-full bg-blue-800 px-3 py-2 hover:bg-blue-900 text-white'>
                                    <EngineeringRoundedIcon /> Generate {userType.charAt(0).toUpperCase() + userType.slice(1)} Feedback Link
                                </button>
                            </div> : null
                        }


                    </div>


                </div>
            </GenerateReportTemplate>

            <Footer />





        </div>
    )
}

export default GenerateFeedbackLink

const NameRadio = ({ title, userType, setUserType }) => {
    return <div className="form-check text-left">
        <input className="form-check-input" type="radio" name="Feedback" id={title} onChange={() => { setUserType(title.toLowerCase()) }} checked={title.toLowerCase() === userType} />
        <label className="form-check-label" for={title}>
            {title}
        </label>
    </div>
}
