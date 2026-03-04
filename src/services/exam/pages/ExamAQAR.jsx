import React, { useState } from 'react'
import title from '../../../js/title';
import siteLinks from '../../../components/siteLinks';
import TableAccordion from '../../faculty/reports/aqar/components/TableAccordion';
import Footer from '../../../components/Footer';
import { useSelector } from 'react-redux';
import useOtherServiceAuth from '../../../hooks/useOtherServiceAuth';
import AQARStepper from '../../dsd/components/AQARStepper';
import FileViewer from '../../../components/FileViewer';
import AQARTextMatter from '../../aqar-naac/components/AQARTextMatter';
import OtherMainTable from '../../../components/OtherMainTable';
import authParamsObject from '../../../js/authParamsObject';



const ExamAQAR = () => {

    title(siteLinks.examAQAR.title)
    const bredLinks = [siteLinks.welcome, siteLinks.examHome, siteLinks.examAQAR]
    const user = useSelector((state) => state.user.examUser)
    useOtherServiceAuth({ ...authParamsObject.exam, shouldNavigate: false })
    const [aqarYearState, setAqarYearState] = useState(null)


    const AQARTables = [
        {
            title: "2.5.1 - Days from the date of last semester-end/ year- end examination till the declaration of  results during the year",
            hasSupportingDocument: true,
            proofData: {
                academicYear: aqarYearState, proofType: '2.5.1', userType: 'exam', school: "BOEE"
            },
            component: <OtherMainTable model="DateOfResultDiclaration" />
        },
        {
            title: "2.5.2 - Student complaints/grievances about evaluation against total number appeared in the examinations during the year ",
            hasSupportingDocument: true,
            proofData: {
                academicYear: aqarYearState, proofType: '2.5.2', userType: 'exam', school: "BOEE"
            },
            component: <OtherMainTable model="StudentComplaintsGrievances" />
        },
        {
            title: "2.5.3 - IT integration and reforms in the examination procedures and processes (continuous internal assessment and end-semester assessment) have brought in considerable improvement in examination management system of the institution",
            hasSupportingDocument: true,
            proofData: {
                academicYear: aqarYearState, proofType: '2.5.3', userType: 'exam', school: "BOEE"
            },
            component: <AQARTextMatter academicYear={aqarYearState} isAdmin={false}
                school="BOEE" matterType='2.5.3' userType='exam' />

        },
        {
            title: "2.6.3 - Students passed during the year",
            hasSupportingDocument: true,
            proofData: {
                academicYear: aqarYearState, proofType: '2.6.3', userType: 'exam', school: "BOEE"
            },
            component: <OtherMainTable model="ExamPassedDuringYear" />
        },
    ]

    const tableTitles = AQARTables.map((table) => table.title)


    return (
        <div>
            <div className="min-h-screen">
                <AQARStepper setAqarYearState={setAqarYearState} aqarYearState={aqarYearState} bredLinks={bredLinks} submitModel="ExamAQAR" user={user} tableTitles={tableTitles} navigateToAfterSubmission={siteLinks.examHome.link} >
                    <TableAccordion AQARTables={AQARTables} showIndex={false} />
                </AQARStepper>

                <Footer />
            </div>
        </div>
    )
}

export default ExamAQAR


const TableSupportingProof = ({ file, setFile, title = "Upload a supporting / relevant document here for the table below  ", proof = false, isAdmin = false }) => {
    return <div className="my-3">
        {!isAdmin && <>
            <label htmlFor="resultFile">{title}</label>
            < input onChange={(e) => setFile(() => e.target.files[0])} type="file" name="file" id="resultFile" className='form-control mt-1' />
        </>}
        {
            proof && <div className="mt-3">
                <p className="my-1 text-xs text-muted">Uploaded Document</p>
                <FileViewer fileName={proof} showFullFileName={true} serviceName="aqar" />
            </div>
        }

    </div>
}


export { TableSupportingProof }


