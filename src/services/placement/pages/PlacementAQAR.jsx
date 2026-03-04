import React, { useState } from 'react'
import title from '../../../js/title';
import siteLinks from '../../../components/siteLinks';
import TableAccordion from '../../faculty/reports/aqar/components/TableAccordion';
import Footer from '../../../components/Footer';
import { useSelector } from 'react-redux';
import useOtherServiceAuth from '../../../hooks/useOtherServiceAuth';
import AQARStepper from '../../dsd/components/AQARStepper';
import authParamsObject from '../../../js/authParamsObject';
import OtherMainTable from '../../../components/OtherMainTable';

const PlacementAQAR = () => {
    title(siteLinks.placementAQAR.title)
    const bredLinks = [siteLinks.welcome, siteLinks.placementHome, siteLinks.placementAQAR]
    const user = useSelector((state) => state.user.placementUser)
    useOtherServiceAuth({ ...authParamsObject.tpo, shouldNavigate: false })
    const [aqarYearState, setAqarYearState] = useState(null)




    const AQARTables = [
        {
            title: '5.1.2 - Career Councelling & Guidance',
            component: <OtherMainTable model="CounselingAndGuidance" academicYear={[aqarYearState]} extraInitialFilds={{otherUser: "Placement"}} />
        },
        {
            title: '5.2.2 - Placements',
            component: <OtherMainTable model="Placement" academicYear={[aqarYearState]} extraInitialFilds={{otherUser: "Placement"}} />
        },
        {
            title: '5.1.3 - Progression to Higher Education',
            component: <OtherMainTable model="ProgressionToHE" academicYear={[aqarYearState]} extraInitialFilds={{otherUser: "Placement"}} />
        },
    ]

    const tableTitles = AQARTables.map((table) => table.title)


    return (
        <div>
            <div className="min-h-screen">
                <AQARStepper setAqarYearState={setAqarYearState} aqarYearState={aqarYearState} bredLinks={bredLinks} submitModel="PlacementAQAR" user={user} tableTitles={tableTitles} navigateToAfterSubmission={siteLinks.placementHome.link} >
                    <TableAccordion AQARTables={AQARTables} showIndex={false} />
                </AQARStepper>

            </div>
            <Footer />
        </div>
    )
}

export default PlacementAQAR
