import React, { useEffect, useState } from 'react'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import { LinearProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCASData } from '../CASServices';
import SelectYear from './SelectYear';
import Footer from '../../../../../components/Footer';
import useAuth from '../../../../../hooks/useAuth';
import Bred from '../../../../../components/Bred';
import siteLinks from '../../../../../components/siteLinks';
import GenerateReportTemplate from '../../../../../components/GenerateReportTemplate';
import title from '../../../../../js/title';


const GenerateCASPage = () => {

    let links = [siteLinks.welcome, siteLinks.facultyHome, siteLinks.cas, siteLinks.casReport,]
    const [casDataFromServer, setCasDataFromServer] = useState(null)
    const user = useSelector((state) => state.user.user)
    const [reportLoading, setReportLoading] = useState(false)

    const [error, setError] = useState(null)
    title('Generate CAS Report')
    useAuth(false)

    useEffect(() => {
        user && getCASData(user && user._id, setCasDataFromServer, setError);
    }, [user])



    useEffect(() => {
        // scroll top on refresh
        window.scrollTo(0, 0)
    }, [])




    return (
        <div >
            <div>

                <GenerateReportTemplate bredLinks={links} backLink={siteLinks.facultyHome.link} title="Generate Your CAS Report" loading={reportLoading} >
                    <div className='h-screen'>
                        <SelectYear userData={user && user} error={error} casYear={casDataFromServer && casDataFromServer.casData} setReportLoading={setReportLoading} />

                    </div>
                </GenerateReportTemplate>


            </div>

            <Footer />
        </div>
    )
}

export default GenerateCASPage