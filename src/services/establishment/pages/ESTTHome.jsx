import React from 'react'
import useOtherServiceAuth from '../../../hooks/useOtherServiceAuth'
import siteLinks from '../../../components/siteLinks'
import { useSelector } from 'react-redux'
import title from '../../../js/title'
import Footer from '../../../components/Footer'
import ESTTSanctionedPostWithProof from '../components/ESTTSanctionedPost'
import AQARStepper from '../../dsd/components/AQARStepper'
import { useState } from 'react'
import TableAccordion from '../../faculty/reports/aqar/components/TableAccordion'
import ESTTFullTimeTeacherWithProof from '../components/ESTTFullTimeTeacherWithProof'
import ESTTFullTimeTeacherAgainstSanctionWithProof from '../components/ESTTFullTimeTeacherAgainstSanctionWithProof'
import EsttFullTimeTeacherWhoLeftWithProof from '../components/EsttFullTimeTeacherWhoLeftWithProof'
import authParamsObject from '../../../js/authParamsObject'

const esttAuthParams = authParamsObject.estt

const ESTTHome = () => {
    useOtherServiceAuth(esttAuthParams)
    const user = useSelector((state) => state.user?.esttUser)
    const bredLinks = [siteLinks.welcome, siteLinks.esttHome]
    title(siteLinks.esttHome.title)
    const [aqarYearState, setAqarYearState] = useState(null)


    const tables = [
        {
            title: "3.2 (A) - Sanctioned posts during the year",
            component: <ESTTFullTimeTeacherWithProof academicYear={aqarYearState} />
        },
        {
            title: "3.2 (B) - Full time teachers who left/joined the institution",
            component: <EsttFullTimeTeacherWhoLeftWithProof academicYear={aqarYearState} />
        },
        {
            title: "3.3 - Sanctioned posts during the year",
            component: <ESTTSanctionedPostWithProof academicYear={aqarYearState} />
        },
        {
            title: "2.4.1 - Full time teachers against sanctioned posts during the year",
            component: <ESTTFullTimeTeacherAgainstSanctionWithProof academicYear={aqarYearState} />
        },

    ]

    const tableTitles = tables.map((table) => table.title)


    return (
        <div>
            <div>
                <div className="min-h-screen">
                    <AQARStepper setAqarYearState={setAqarYearState} aqarYearState={aqarYearState} bredLinks={bredLinks} submitModel="ESTTAQAR" user={user} tableTitles={tableTitles} navigateToAfterSubmission={siteLinks.esttHome.link} >
                        <TableAccordion AQARTables={tables} showIndex={false} />
                    </AQARStepper>

                </div>
                <Footer />
            </div>
        </div>
    )
}

export default ESTTHome
