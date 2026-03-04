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



const SportsAQAR = () => {
    title(siteLinks.sportsAQAR.title)
    const bredLinks = [siteLinks.welcome, siteLinks.sportsHome, siteLinks.sportsAQAR]
    const user = useSelector((state) => state.user.sportsUser)
    useOtherServiceAuth({ ...authParamsObject.sports, shouldNavigate: false })
    const [aqarYearState, setAqarYearState] = useState(null)


    const AQARTables = [
        {
            id: "4.1.2",
            title: "4.1.2 - The institution has adequate facilities for cultural activities, yoga, games (indoor, outdoor) and sports. (gymnasium, yoga centre, auditorium, etc.)",
            hasSupportingDocument: true,
            proofData: {
                academicYear: aqarYearState, proofType: '4.1.2', userType: 'sports', school: "Sports"
            },
            component: <AQARTextMatter academicYear={aqarYearState} school={"Sports"} matterType='4.1.2' userType='sports' />

        },
        {
            title: "5.3.1 - Awards/medals won by students for outstanding performance in sports / cultural activities at Inter-university / State / National / International events (award for a team event should be counted as one) during the year",
            hasSupportingDocument: true,
            proofData: {
                academicYear: aqarYearState, proofType: '5.3.1', userType: 'sports', school: "Sports"
            },
            component: <OtherMainTable model="DSDSports" extraInitialFilds={{userType : 'sports'}} />
        },
        {
            title: "5.3.3 - Information about Sports and cultural events / competitions organised by the institution during the year ",
            hasSupportingDocument: true,
            proofData: {
                academicYear: aqarYearState, proofType: '5.3.3', userType: 'sports', school: "Sports"
            },
            component: <OtherMainTable model="SportsAndCulturalEvents" extraInitialFilds={{userType : 'sports'}} />
        },


    ]

    const tableTitles = AQARTables.map((table) => table.title)


    return (
        <div>
            <div className="min-h-screen">
                <AQARStepper setAqarYearState={setAqarYearState} aqarYearState={aqarYearState} bredLinks={bredLinks} submitModel="SportsAQAR" user={user} tableTitles={tableTitles} navigateToAfterSubmission={siteLinks.sportsHome.link} >
                    <TableAccordion AQARTables={AQARTables} showIndex={false} />
                </AQARStepper>

                <Footer />
            </div>
        </div>
    )
}

export default SportsAQAR
