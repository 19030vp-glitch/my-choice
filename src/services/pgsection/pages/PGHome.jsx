import React from 'react'
import useOtherServiceAuth from '../../../hooks/useOtherServiceAuth'
import siteLinks from '../../../components/siteLinks'
import UserLoading from '../../../pages/UserLoading'
import { useSelector } from 'react-redux'
import title from '../../../js/title'
import Footer from '../../../components/Footer'
import GoBack from '../../../components/GoBack'
import TableAccordion from '../../faculty/reports/aqar/components/TableAccordion'
import AdminPhdAwarded from '../../admin/tables/AdminPhdAwarded'
import authParamsObject from '../../../js/authParamsObject'
import OtherMainTable from '../../../components/OtherMainTable'

const pgAuthParams = authParamsObject.pg

const PGHome = () => {
    useOtherServiceAuth(pgAuthParams)
    const user = useSelector((state) => state.user.pgUser)
    const bredLinks = [siteLinks.welcome, siteLinks.pgHome]
    title(siteLinks.pgHome.title)

    const tables = [
        {
            title: "Ph.D. Scholars",
            component: <AdminPhdAwarded />
        },
        {
            title: "Research Guidance",
            component: <OtherMainTable model="ResearchGuideAdmin" />
        },
        {
            title: "Progression to Higher Education",
            component: <OtherMainTable model="ProgressionToHE" extraInitialFilds={{otherUser: 'PG'}} />
        },
        {
            title: "Demand Ratio",
            component: <OtherMainTable model="DemandRatio" extraInitialFilds={{otherUser: 'PG'}} />
        },
    ]
    return (
        <div>
            <GoBack bredLinks={bredLinks} pageTitle={siteLinks.pgHome.title} />
            <div className="min-h-screen">

                {user ?
                    <div>
                        <TableAccordion AQARTables={tables} />
                    </div>
                    :
                    <UserLoading title="Fetching User Details" />}
            </div>
            <Footer />
        </div>
    )
}

export default PGHome

export { pgAuthParams }
