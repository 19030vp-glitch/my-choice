import React from 'react'
import GoBack from '../../../components/GoBack'
import siteLinks from '../../../components/siteLinks'
import useOtherServiceAuth from '../../../hooks/useOtherServiceAuth'
import { swayamAuthParams } from './SwayamHome'
import title from '../../../js/title'
import TableAccordion from '../../faculty/reports/aqar/components/TableAccordion'
import UserLoading from '../../../pages/UserLoading'
import { useSelector } from 'react-redux'
import OtherMainTable from '../../../components/OtherMainTable'

const SwayamDataCenter = () => {
    useOtherServiceAuth({ ...swayamAuthParams, shouldNavigate: false })
    const bredLinks = [siteLinks.welcome, siteLinks.swayamHome, siteLinks.swayamFillData]
    title(siteLinks.swayamFillData.title)
    const user = useSelector((state) => state.user?.swayamUser)

    const tables = [
        {
            title: "Value Added Courses",
            component: <OtherMainTable model='ValueAddedCource' extraInitialFilds={{SchoolName: 'Swayam'}} />
        },
        {
            title: "E-content developed by teachers",
            component: <OtherMainTable model="EContentDeveloped" extraInitialFilds={{otherUser: 'Swayam'}} />
        },
        {
            title: "Details of online courses",
            component: <OtherMainTable model='SwayamDetailsOfOnlineCourses' extraInitialFilds={{portalName: "SWAYAM-NPTEL"}} />
        },
    ]


    return (
        <div>
            <GoBack pageTitle={siteLinks.swayamFillData.title} bredLinks={bredLinks} />
            <div className="min-h-screen">

                {user ?
                    <div>
                        <TableAccordion AQARTables={tables} />
                    </div>
                    :
                    <UserLoading title="Fetching User Details" />}
            </div>
        </div>
    )
}

export default SwayamDataCenter
