import React, { Suspense, lazy } from 'react'
import { useSelector } from 'react-redux'
import Profile from '../services/faculty/tables/Profile'
import UserLoading from '../pages/UserLoading';
import PublicationCitation from '../services/faculty/tables/PublicationCitation';
const PostHeldAppointment = lazy(() => import('../services/faculty/tables/PostHeldAppointment'));
const ResearchProject = lazy(() => import('../services/faculty/tables/ResearchProjects'));
const ResearchPapersUGC = lazy(() => import('../services/faculty/tables/ResearchPapersUGC'));
const BooksAndChapters = lazy(() => import('../services/faculty/tables/BooksAndChapters'));
const PHDAwarded = lazy(() => import('../services/faculty/tables/PHDAwarded'));
const JRFSRF = lazy(() => import('../services/faculty/tables/JRFSRF'));
const Responsibilities = lazy(() => import('../services/faculty/tables/Responsibilities'));
const FacultyMainTable = lazy(() => import('../services/faculty/components/FacultyMainTable'));
const DirectorFacultyMainTable = lazy(() => import('../services/director/components/UtilityComponents/DirectorFacultyMainTable'));

const Rightbar = () => {

    const page = useSelector(state => state.navbar.page)

    let rightBarObj = {
        profile: <Profile />,
        research_projects: <ResearchProject title="Research Projects" />,
        book_and_chapters: <BooksAndChapters title={"Books and Chapters published and papers in national/international conference proceedings"} />,
        publication_citation: <PublicationCitation title={"Publication Citations"} />,
        research_papers: <ResearchPapersUGC title={"Research Papers in the Journals notified by UGC"} />,
        pg_dessertation: <PHDAwarded type="PG" title={"PG Dessertation"} tableType="PGDessertation" />,
        phd_awarded: <PHDAwarded type="Ph.D." title={"Research Guidance"} tableType="ResearchGuidance" />,
        jrf_srf: <JRFSRF title={"JRF, SRF, Post Doctoral Fellows, Research Associate"} />,
        posts_held_after: <PostHeldAppointment title={"Posts held after appointments at this institution"} />,
        responsibilities: <Responsibilities title={'Administrative / Academic Responsibilities'} />,
        qualification: <FacultyMainTable model="Qualification" getproof={null} />,
        degrees: <FacultyMainTable model="Degree" />,
        appointment_held_prior: <FacultyMainTable model="AppointmentsHeldPrior" getproof={null} />,
        online_fdp: <FacultyMainTable model="Online" />,
        award_and_recognition: <FacultyMainTable model="AwardRecognition" />,
        patents: <FacultyMainTable model="Patent" />,
        consultancy: <FacultyMainTable model="ConsultancyServices" />,
        collab: <FacultyMainTable model="Collaboration" />,
        invited_talk: <FacultyMainTable model="InvitedTalk" />,
        conference_organized: <DirectorFacultyMainTable model="ConferencesSemiWorkshopOrganized" />,
        fellowship: <FacultyMainTable model="Fellowship" />,
        lectures_seminars: <FacultyMainTable model="Lectures" getproof={null} />,
        e_content_development: <FacultyMainTable model="EContentDeveloped" />,
        financialsupport: <FacultyMainTable model="FinancialSupport" />,
        policy_documents: <FacultyMainTable model="PolicyDocuments" />,
        conference_participated: <FacultyMainTable model="ConferenceParticipated" />,
        foreign_visit: <FacultyMainTable model="ForeignVisit" getproof={null} />,
        mous: <DirectorFacultyMainTable model="MoUs" />,
        extension_activities: <DirectorFacultyMainTable model="ExtensionActivities" />,
    }

    return (
        <div className="mt-2 w-full relative">
            <div className="h-[75vh] animate-fade-up animate-once">
                {
                    page === 'profile' ? rightBarObj[page] : rightBarObj?.[page] ?
                        <Suspense fallback={<UserLoading title="Loading" />}>
                            {rightBarObj?.[page]}
                        </Suspense> : <p>Table not found</p>
                }
            </div>
        </div>
    )
}

export default Rightbar