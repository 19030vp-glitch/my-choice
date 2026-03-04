import React, { useState } from 'react'
import AQARStepper from '../components/AQARStepper'
import title from '../../../js/title';
import siteLinks from '../../../components/siteLinks';
import TableAccordion from '../../faculty/reports/aqar/components/TableAccordion';
import Footer from '../../../components/Footer';
import { useSelector } from 'react-redux';
import useOtherServiceAuth from '../../../hooks/useOtherServiceAuth'
import AQARTextMatter from '../../aqar-naac/components/AQARTextMatter';
import authParamsObject from '../../../js/authParamsObject';
import OtherMainTable from '../../../components/OtherMainTable';

const DSDAQAR = () => {
    title(siteLinks.dsdAQAR.title)
    const bredLinks = [siteLinks.welcome, siteLinks.dsdHome, siteLinks.dsdAQAR]
    const user = useSelector((state) => state.user.dsdUser)

    useOtherServiceAuth({ ...authParamsObject.dsd, shouldNavigate: false })
    const [aqarYearState, setAqarYearState] = useState(null)


    const AQARTables = [
        {
            title: "5.3.1 - Awards/medals won by students for outstanding performance in sports / cultural activities at Inter-university / State / National / International events (award for a team event should be counted as one) during the year",
            hasSupportingDocument: true,
            proofData: {
                academicYear: aqarYearState, proofType: '5.3.1', userType: 'dsd', school: "DSD"
            },
            component: <OtherMainTable model="DSDSports" extraInitialFilds={{userType : 'dsd'}} />
            
        },
        {
            title: "5.3.3 - Information about Sports and cultural events / competitions organised by the institution during the year ",
            hasSupportingDocument: true,
            proofData: {
                academicYear: aqarYearState, proofType: '5.3.3', userType: 'dsd', school: "DSD"
            },
            component: <OtherMainTable model="SportsAndCulturalEvents" extraInitialFilds={{userType : 'dsd'}} />
        },
        {
            title: "7.1.11 - Institution celebrates / organizes national and international commemorative days, events and festivals",
            hasSupportingDocument: true,
            proofData: {
                academicYear: aqarYearState, proofType: '7.1.11', userType: 'nss', school: "NSS"
            },
            component: <AQARTextMatter academicYear={aqarYearState} school="NSS" matterType='7.1.11' userType='nss' />
        },

    ]

    const tableTitles = AQARTables.map((table) => table.title)


    return (
        <div>
            <div className="min-h-screen">
                <AQARStepper setAqarYearState={setAqarYearState} aqarYearState={aqarYearState} bredLinks={bredLinks} submitModel="DSDAQAR" user={user} tableTitles={tableTitles} navigateToAfterSubmission={siteLinks.dsdHome.link} >
                    <TableAccordion AQARTables={AQARTables} showIndex={false} />
                </AQARStepper>

            </div>
            <Footer />
        </div>
    )
}

export default DSDAQAR
