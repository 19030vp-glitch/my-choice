import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Footer from '../../../../../components/Footer';
import GenerateReportTemplate from '../../../../../components/GenerateReportTemplate';
import siteLinks from '../../../../../components/siteLinks';
import useDirectorAuth from '../../../../../hooks/useDirectorAuth';
import { getAuditData } from '../components/audit-services';
import SelectYear from './SelectYear';


const GenerateAAAPage = () => {

    useDirectorAuth()
    let links = [siteLinks.welcome, siteLinks.directorHome, siteLinks.aaa, siteLinks.aaaReport,]
    const [aaaDataFromServer, setAaaDataFromServer] = useState(null)
    const navigate = useNavigate()
    const user = useSelector(state => state.user.directorUser)

    const [reportLoading, setReportLoading] = useState(false)
    const [error, setError] = useState(null)


    useEffect(() => {
        user && getAuditData(user && user.department, null, setAaaDataFromServer, setError, false);
    }, [user])

    useEffect(() => {
        console.log('AAA Data is : ', aaaDataFromServer)
    }, [aaaDataFromServer])



    useEffect(() => {
        // scroll top on refresh
        window.scrollTo(0, 0)

    }, [])



    return (
        <div >
            <div>

                <GenerateReportTemplate bredLinks={links} backLink={siteLinks.directorHome.link} title="Generate Your AAA Report" loading={reportLoading} >
                    <div className='h-screen'>
                        <SelectYear userData={user && user} error={error} aaaData={aaaDataFromServer && aaaDataFromServer} aaaYear={aaaDataFromServer && aaaDataFromServer.AAAData} setReportLoading={setReportLoading} />
                    </div>
                </GenerateReportTemplate>


            </div>

            <Footer />
        </div>
    )
}

export default GenerateAAAPage