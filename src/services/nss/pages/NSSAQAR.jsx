import React, { useState } from 'react'
import title from '../../../js/title';
import siteLinks from '../../../components/siteLinks';
import TableAccordion from '../../faculty/reports/aqar/components/TableAccordion';
import Footer from '../../../components/Footer';
import { useSelector } from 'react-redux';
import useOtherServiceAuth from '../../../hooks/useOtherServiceAuth';
import AQARStepper from '../../dsd/components/AQARStepper';
import AQARTextMatter from '../../aqar-naac/components/AQARTextMatter';
import authParamsObject from '../../../js/authParamsObject';
import OtherMainTable from '../../../components/OtherMainTable';


const NSSAQAR = () => {
    title(siteLinks.nssAQAR.title)
    const bredLinks = [siteLinks.welcome, siteLinks.nssHome, siteLinks.nssAQAR]
    const user = useSelector((state) => state.user.nssUser)
    useOtherServiceAuth({ ...authParamsObject.nss, shouldNavigate: false })
    const [aqarYearState, setAqarYearState] = useState(null)


    const AQARTables = [
        {
            title: "3.6.1 - Extension activities in the neighbourhood community in terms of impact and  sensitising students to social issues and holistic development during the year",
            hasSupportingDocument: true,
            proofData: {
                academicYear: aqarYearState, proofType: '3.6.1', userType: 'director', school: "NSS"
            },
            component: <AQARTextMatter academicYear={aqarYearState} school="NSS" matterType='3.6.1' userType='director' />
        },
        {
            title: "3.6.2 - Awards received by the Institution, its teachers and students from Government / Government recognised bodies in recognition of the extension activities carried out  during the year",
            hasSupportingDocument: true,
            proofData: {
                academicYear: aqarYearState, proofType: '3.6.2', userType: 'nss', school: "NSS"
            },
            component: <OtherMainTable model="AwardForExtensionActivities" academicYear={[aqarYearState]} />
        },
        {
            title: "3.6.3 - Extension and outreach programs conducted  by the institution through NSS/NCC/Red cross/YRC etc. during the year ( including  Government initiated programs such as Swachh Bharat, Aids Awareness, Gender Issue, etc. and those organised in collaboration with industry, community and NGOs) ",
            hasSupportingDocument: true,
            proofData: {
                academicYear: aqarYearState, proofType: '3.6.3', userType: 'nss', school: "NSS"
            },
            component: <OtherMainTable model="ExtensionActivities" extraInitialFilds={{otherUser: "NSS", SchoolName: "NSS"}} academicYear={[aqarYearState]} />
        },
    ]

    const tableTitles = AQARTables.map((table) => table.title)


    return (
        <div>
            <div className="min-h-screen">
                <AQARStepper setAqarYearState={setAqarYearState} aqarYearState={aqarYearState} bredLinks={bredLinks} submitModel="NSSAQAR" user={user} tableTitles={tableTitles} navigateToAfterSubmission={siteLinks.nssHome.link} >
                    <TableAccordion AQARTables={AQARTables} showIndex={false} />
                </AQARStepper>

            </div>
            <Footer />
        </div>
    )
}

export default NSSAQAR
