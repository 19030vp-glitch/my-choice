import React from 'react'

// other imports
import { useSelector } from 'react-redux'
import UserLoading from '../../../../../pages/UserLoading'
import useScroll from '../../../../../hooks/useScroll'

// importing faculty components
import PHDAwarded from '../../../tables/PHDAwarded'
import ResearchProjects from '../../../tables/ResearchProjects'
import ResearchPapersUGC from '../../../tables/ResearchPapersUGC'
import BooksAndChapters from '../../../tables/BooksAndChapters'
import TableAccordion from './TableAccordion'
import FacultyMainTable from '../../../components/FacultyMainTable'
import JRFSRF from '../../../tables/JRFSRF'

const AQARForm = ({ userType = 'faculty' }) => {

    useScroll()
    const aqarYear = useSelector((state) => state.aqar.aqarYear)


    const AQARTables = {
        faculty: [
            {
                title: "Research papers per teacher in the Journals notified on UGC website during the year",
                component: <ResearchPapersUGC filterByAcademicYear={true} academicYear={aqarYear} />,
            },
            {
                title: "The institution provides seed money to its teachers for research (amount INR in Lakhs)",
                component: <ResearchProjects filterByAcademicYear={true} academicYear={aqarYear} />,
            },
            {
                title: "Full time teachers who received awards, recognition, fellowships at State, National, International level from Government/Govt. recognised bodies during the year",
                component: <FacultyMainTable model="AwardRecognition" academicYear={[aqarYear]} />,
            },
            {
                title: "Teachers receiving national/ international fellowship/financial support by various agencies for advanced studies/ research during the year",
                component: <FacultyMainTable model="Fellowship" academicYear={[aqarYear]} />,
            },
            {
                title: "JRFs, SRFs, Post-Doctoral Fellows, Research Associates and other research fellows enrolled in the institution during the year",
                component: <JRFSRF filterByAcademicYear={true} academicYear={aqarYear} />,
            },
            {
                title: "Patents published/awarded during the year",
                component: <FacultyMainTable model="Patent" academicYear={[aqarYear]} />,
            },
            {
                title: 'Ph.D Awarded during the year',
                component: <PHDAwarded filterByAcademicYear={true} academicYear={aqarYear} />,
            },
            {
                title: "Books and chapters in edited volumes published per teacher during the year",
                component: <BooksAndChapters filterByAcademicYear={true} academicYear={aqarYear} />,
            },
            {
                title: 'E-content is developed by teachers',
                component: <FacultyMainTable model="EContentDeveloped" academicYear={[aqarYear]} />,
            },
            {
                title: 'Consultancy Services',
                component: <FacultyMainTable model="ConsultancyServices" academicYear={[aqarYear]} />,
            },
            {
                title: "Teachers provided with financial support to attend conferences / workshops and towards membership fee of professional bodies during the year",
                component: <FacultyMainTable model="FinancialSupport" academicYear={[aqarYear]} />,
            },
            {
                title: 'Teachers undergoing online/ face-to-face Faculty Development Programmes (FDP) during the year',
                component: <FacultyMainTable model="Online" academicYear={[aqarYear]} />,
            },
        ],
        director: [
        ]
    }

    return (
        <div>



            {
                !aqarYear ? <UserLoading title="Loading Form" /> :
                    <div className="my-5">
                        <TableAccordion AQARTables={AQARTables[userType]} />
                    </div>

            }


        </div>
    )
}


export default AQARForm
