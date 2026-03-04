import React, { Suspense, lazy, useMemo } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from '../components/Navbar'
import useAuth from '../hooks/useAuth';

const Index = lazy(() => import('./Index'));
const UserLoading = lazy(() => import('./UserLoading'));
const CustomReport = lazy(() => import('../services/faculty/pages/CustomReport'));
const FacultyLogin = lazy(() => import('../services/faculty/pages/FacultyLogin'));
const CheckFillData = lazy(() => import('../services/data-validity/pages/CheckFillData'));
const ChangePassword = lazy(() => import('../services/faculty/pages/ChangePassword'));
const Main = lazy(() => import('./Main'));
const ViewFile = lazy(() => import('./ViewFile'));
const PageNotFound = lazy(() => import('./PageNotFound'));
const LoadingPage = lazy(() => import('../components/LoadingPage'));
const CasReportHome = lazy(() => import('../services/faculty/reports/cas/CasReportHome'));
const GenerateCASPage = lazy(() => import('../services/faculty/reports/cas/report/GenerateCASPage'));
const DirectorViewFile = lazy(() => import('../services/director/pages/DirectorViewFile'));
const DirectorLogin = lazy(() => import('../services/director/pages/DirectorLogin'));
const AdminLogin = lazy(() => import('../services/admin/pages/AdminLogin'));
const Home = lazy(() => import('../services/faculty/pages/Home'));
const Test = lazy(() => import('./Test'));
const AuditHome = lazy(() => import('../services/director/reports/academic-audit/AuditHome'));
const DirectorHome = lazy(() => import('../services/director/pages/Home'));
const DirectorMain = lazy(() => import('../services/director/pages/DirectorMain'));
const StudentLogin = lazy(() => import('../services/student/pages/StudentLogin'));
const StudentRegister = lazy(() => import('../services/student/pages/StudentRegistration'));
const StudentHome = lazy(() => import('../services/student/pages/StudentHome'));
const StudentMain = lazy(() => import('../services/student/pages/StudentMain'));
const CASReport = lazy(() => import('../templates/faculty/cas-report/CASReport'));
const PBASReport = lazy(() => import('../templates/faculty/pbas-report/PBASReport'));
const FacultyReport = lazy(() => import('../templates/faculty/faculty-report/FacultyReport'));
const AllFaculties = lazy(() => import('../services/dashboard/pages/AllFaculties'));
const AllDepartments = lazy(() => import('../services/dashboard/pages/AllDepartments'));
const Faculty = lazy(() => import('../services/dashboard/pages/Faculty'));
const AllAlumni = lazy(() => import('../services/dashboard/pages/AllAlumni'));
const PbasReportHome = lazy(() => import('../services/faculty/reports/pbas/PbasReportHome'));
const GeneratePBASPage = lazy(() => import('../services/faculty/reports/pbas/report/GeneratePBASPage'));
const AllStudents = lazy(() => import('../services/dashboard/pages/AllStudents'));
const AlumniModelWise = lazy(() => import('../services/dashboard/pages/AlumniModelWise'));
const DirectorRegistration = lazy(() => import('../services/director/pages/DirectorRegistration'));
const AAAReport = lazy(() => import('../templates/director/aaa-report/AAAReport'));
const GenerateAAAPage = lazy(() => import('../services/director/reports/academic-audit/report/GenerateAAAPage'));
const FacultyRegistration = lazy(() => import('../services/faculty/pages/FacultyRegistration'));
const ContractualFacultyRegistration = lazy(() => import('../services/faculty/pages/ContractualFacultyRegistration'));
const ForgotPassword = lazy(() => import('./ForgotPassword'));
const DeveloperServices = lazy(() => import('./DeveloperServices'));
const OtherDashboardData = lazy(() => import('../services/dashboard/pages/OtherDashboardData'));
const DirectorDashboardData = lazy(() => import('../services/dashboard/pages/DirectorDashboardData'));
const AdminMain = lazy(() => import('../services/admin/pages/AdminMain'));
const NewsPage = lazy(() => import('../services/news/pages/NewsPage'));
const PROLogin = lazy(() => import('../services/news/pages/PROLogin'));
const PROEditor = lazy(() => import('../services/news/pages/PROEditor'));
const SingleNews = lazy(() => import('../services/news/pages/SingleNews'));
const PROHome = lazy(() => import('../services/news/pages/PROHome'));
const DirectorSSM = lazy(() => import('../services/director/pages/DirectorSSM'));
const Gallery = lazy(() => import('../services/photogallery/pages/Gallery'));
const AddEvent = lazy(() => import('../services/photogallery/pages/AddEvent'));
const EventsPage = lazy(() => import('../services/photogallery/pages/EventsPage'));
const SchoolInformation = lazy(() => import('../services/dashboard/pages/SchoolInformation'));
const StudentFeedback = lazy(() => import('../services/feedback/pages/StudentFeedback'));
const AQARHome = lazy(() => import('../services/faculty/reports/aqar/pages/AQARHome'));
const useDirectorAuth = lazy(() => import('../hooks/useDirectorAuth'));
const TeacherFeedback = lazy(() => import('../services/feedback/pages/TeacherFeedback'));
const AlumniFeedback = lazy(() => import('../services/feedback/pages/AlumniFeedback'));
const ParentFeedback = lazy(() => import('../services/feedback/pages/ParentFeedback'));
const EmployerFeedback = lazy(() => import('../services/feedback/pages/EmployerFeedback'));
const StudentResponse = lazy(() => import('../services/feedback/pages/StudentResponse'));
const OtherReponses = lazy(() => import('../services/feedback/pages/OtherReponses'));
const GenerateAQARReport = lazy(() => import('../services/faculty/reports/aqar/pages/GenerateAQARReport'));
const StatusPage = lazy(() => import('../services/status/pages/StatusPage'));
const GenerateFeedbackLink = lazy(() => import('../services/feedback/pages/GenerateFeedbackLink'));
const FeedbackRedirect = lazy(() => import('../services/feedback/pages/FeedbackRedirect'));
const FeedbackDashboard = lazy(() => import('../services/feedback/pages/FeedbackDashboard'));
const DirectorReportStatus = lazy(() => import('../services/director/pages/DirectorReportStatus'));
const FeedbackReport = lazy(() => import('../templates/feedback/FeedbackReport'));
const ExpertFeedback = lazy(() => import('../services/feedback/pages/ExpertFeedback'));
const NSSLogin = lazy(() => import('../services/nss/pages/NSSLogin'));
const NSSStudentAdmission = lazy(() => import('../services/nss/pages/NSSStudentAdmission'));
const ActionOnFeedback = lazy(() => import('../services/feedback/pages/ActionOnFeedback'));
const StudentResume = lazy(() => import('../templates/student/StudentResume'));
const DirectorFRCC = lazy(() => import('../services/director/pages/DirectorFRCC'));
const ProgramHome = lazy(() => import('../services/programs/pages/ProgramHome'));
const ProgramRegistration = lazy(() => import('../services/programs/pages/ProgramRegistration'));
const AddProgram = lazy(() => import('../services/programs/pages/AddProgram'));
const ProgramFlyer = lazy(() => import('../services/programs/pages/ProgramFlyer'));
const SingleProgram = lazy(() => import('../services/programs/pages/SingleProgram'));
const RegistrationAck = lazy(() => import('../services/programs/pages/RegistrationAck'));
const RegistrationDetails = lazy(() => import('../services/programs/pages/RegistrationDetails'));
const AddProgramPhotos = lazy(() => import('../services/programs/pages/AddProgramPhotos'));
const YFCollegeRegistration = lazy(() => import('../services/youthfestival/pages/YFCollegeRegistration'));
const YFCollegeHome = lazy(() => import('../services/youthfestival/pages/YFCollegeHome'));
const YFCollegeLogin = lazy(() => import('../services/youthfestival/pages/YFCollegeLogin'));
const YFForm = lazy(() => import('../services/youthfestival/pages/YFForm'));
const DSDLogin = lazy(() => import('../services/dsd/pages/DSDLogin'));
const KRCLogin = lazy(() => import('../services/krc/pages/KRCLogin'));
const ExamLogin = lazy(() => import('../services/exam/pages/ExamLogin'));
const SportsLogin = lazy(() => import('../services/sports/pages/SportsLogin'));
const PlacementLogin = lazy(() => import('../services/placement/pages/PlacementLogin'));
const DSDHome = lazy(() => import('../services/dsd/pages/DSDHome'));
const KRCHome = lazy(() => import('../services/krc/pages/KRCHome'));
const NSSHome = lazy(() => import('../services/nss/pages/NSSHome'));
const SportsHome = lazy(() => import('../services/sports/pages/SportsHome'));
const ExamHome = lazy(() => import('../services/exam/pages/ExamHome'));
const PlacementHome = lazy(() => import('../services/placement/pages/PlacementHome'));
const Test2 = lazy(() => import('../inputs/Test2'));
const StudentSatisfactionSurvey = lazy(() => import('../services/feedback/pages/StudentSatisfactionSurvey'));
const DSDAQAR = lazy(() => import('../services/dsd/pages/DSDAQAR'));
const SportsAQAR = lazy(() => import('../services/sports/pages/SportsAQAR'));
const KRCAQAR = lazy(() => import('../services/krc/pages/KRCAQAR'));
const NSSAQAR = lazy(() => import('../services/nss/pages/NSSAQAR'));
const ExamAQAR = lazy(() => import('../services/exam/pages/ExamAQAR'));
const PlacementAQAR = lazy(() => import('../services/placement/pages/PlacementAQAR'));
const OtherAQAR = lazy(() => import('../services/other/pages/OtherAQAR'));
const ProgramFeedback = lazy(() => import('../services/programs/pages/ProgramFeedback'));
const ProgramFeedbackDetails = lazy(() => import('../services/programs/pages/ProgramFeedbackDetails'));
const FeedbackAck = lazy(() => import('../services/programs/pages/FeedbackAck'));
const YFGenerateReport = lazy(() => import('../services/youthfestival/pages/YFGenerateReport'));
const YFApplicationForm = lazy(() => import('../templates/youthfestival/YFApplicationForm'));
const PDFNumericalTable = lazy(() => import('../services/admin/pages/PDFNumericalTable'));
const SSSReport = lazy(() => import('../templates/feedback/SSSReport'));
const IILLogin = lazy(() => import('../services/iil/pages/IILLogin'));
const IILHome = lazy(() => import('../services/iil/pages/IILHome'));
const IILAQAR = lazy(() => import('../services/iil/pages/IILAQAR'));
const YouthDashboard = lazy(() => import('../services/dsd/pages/YouthDashboard'));
const DirectorRC = lazy(() => import('../services/director/pages/DirectorRC'));
const DirectorSSS = lazy(() => import('../services/director/pages/DirectorSSS'));
const SkillLogin = lazy(() => import('../services/skilldevelopment/pages/SkillLogin'));
const SkillsHome = lazy(() => import('../services/skilldevelopment/pages/SkillsHome'));
const SkillFillData = lazy(() => import('../services/skilldevelopment/pages/SkillFillData'));
const PGLogin = lazy(() => import('../services/pgsection/pages/PGLogin'));
const PGHome = lazy(() => import('../services/pgsection/pages/PGHome'));
const APDSLogin = lazy(() => import('../services/apds/pages/APDSLogin'));
const APDSHome = lazy(() => import('../services/apds/pages/APDSHome'));
const ServicesList = lazy(() => import('./ServicesList'));
const UMPSCStudentRegistration = lazy(() => import('../services/skilldevelopment/pages/UMPSCStudentRegistration'));
const UMPSCFeedback = lazy(() => import('../services/skilldevelopment/pages/UMPSCFeedback'));
const SwayamLogin = lazy(() => import('../services/swayam/pages/SwayamLogin'));
const SwayamHome = lazy(() => import('../services/swayam/pages/SwayamHome'));
const SwayamDataCenter = lazy(() => import('../services/swayam/pages/SwayamDataCenter'));
const ESTTHome = lazy(() => import('../services/establishment/pages/ESTTHome'));
const ESTTLogin = lazy(() => import('../services/establishment/pages/ESTTLogin'));
const ChooseAQARYear = lazy(() => import('../services/aqar-naac/content/ChooseAQARYear'));
const Stage = lazy(() => import('../services/aqar-naac/content/Stage'));
const SingleOtherAQAR = lazy(() => import('../services/other/pages/SingleOtherAQAR'));
const NIRFContent = lazy(() => import('../services/director/reports/nirf/pages/NIRFContent'));
const ChooseNIRFYear = lazy(() => import('../services/director/reports/nirf/pages/ChooseNIRFYear'));
const FeedbackStatus = lazy(() => import('../services/admin/pages/AdminFeedbackStatus'));
const AdminSSSModule = lazy(() => import('../services/admin/pages/AdminSSS'));
const TablePDF = lazy(() => import('./TablePDF'));
const ACFRegistration = lazy(() => import('../services/affliated-college-fees/pages/ACFRegistration'));
const ACFCollegeHome = lazy(() => import('../services/affliated-college-fees/pages/ACFCollegeHome'));
const ACFFillDetails = lazy(() => import('../services/affliated-college-fees/pages/ACFFillDetails'));
const ACFSelectYear = lazy(() => import('../services/affliated-college-fees/pages/ACFSelectYear'));
const USHALogin = lazy(() => import('../services/pm-usha/pages/USHALogin'))
const USHAHome = lazy(() => import('../services/pm-usha/pages/USHAHome'))
const USHATabDetails = lazy(() => import('../services/pm-usha/pages/USHATabDetails'))
const USHAStatus = lazy(() => import('../services/pm-usha/pages/USHAStatus'))


const RoutesHandler = () => {

    const routes = useRoutesGenerator()


    return (
        <div className='mr-3 ml-3 sm:mx-3 md:mx-10 lg:mx-10 xl:mx-20'>


            <Navbar />
            <Routes>
                {routes}
            </Routes>


        </div>
    )
}

function useRoutesGenerator() {

    const routes = [
        { path: "/", element: <Index /> },
        { path: "/services-list", element: <ServicesList /> },
        { path: "/load/:url", element: <LoadingPage /> },
        { path: "/faculty/faculty-profile", element: <Main /> },
        { path: "/faculty-login", element: <FacultyLogin /> },
        { path: "/faculty/service/cas-report", element: <CasReportHome /> },
        { path: "/faculty/service/pbas-report", element: <PbasReportHome /> },
        { path: "/faculty/service/generateCASReport", element: <GenerateCASPage /> },
        { path: "/faculty/service/generatePBASReport", element: <GeneratePBASPage /> },
        { path: "/director/service/generateAAAReport", element: <GenerateAAAPage /> },
        { path: "/faculty", element: <Home /> },
        { path: "/admin-login", element: <AdminLogin /> },
        { path: "/Test2", element: <Test2 /> },
        { path: "/director-login", element: <DirectorLogin /> },
        { path: "/faculty-registration", element: <FacultyRegistration /> },
        { path: "/contractual-faculty-registration", element: <ContractualFacultyRegistration /> },
        { path: "/:userType/change-password", element: <ChangePassword /> },
        { path: "/faculty/service/generateFacultyReport", element: <CustomReport /> },
        { path: "/viewFile", element: <ViewFile /> },
        { path: "/director/viewFile/:fileName", element: <DirectorViewFile /> },
        { path: "/*", element: <PageNotFound /> },
        { path: "/test", element: <Test /> },
        { path: "/director/service/academic-audit", element: <AuditHome /> },
        { path: "/alumni-login", element: <StudentLogin /> },
        { path: "/alumni-registration", element: <StudentRegister /> },
        { path: "/alumni", element: <StudentHome /> },
        { path: "/student-login", element: <StudentLogin /> },
        { path: "/student-registration", element: <StudentRegister /> },
        { path: '/student', element: <StudentHome /> },
        { path: '/student/resume', element: <StudentResume /> },
        { path: "/student/student-status", element: <StudentMain /> },
        { path: '/admin', element: <AdminMain /> },
        { path: '/admin/numericalData/:School', element: <PDFNumericalTable /> },
        { path: '/director/numericalData/:School', element: <PDFNumericalTable isDirector={true} /> },
        { path: "/IQAC-NAAC/DEVELOPERS", element: <DeveloperServices /> },
        { path: '/director', element: <DirectorHome /> },
        { path: '/director/sdm', element: <DirectorMain /> },
        { path: '/director/fdc', element: <DirectorFRCC /> },
        { path: '/director/ssm', element: <DirectorSSM /> },
        { path: '/director/research-center', element: <DirectorRC /> },
        { path: '/director-registration', element: <DirectorRegistration /> },
        { path: '/director/sss/:schoolName', element: <DirectorSSS /> },
        { path: "/report/CASReport/:userId/:selectedYear/:forPrintOut", element: <CASReport /> },
        { path: "/report/PBASReport/:userId/:selectedYear/:forPrintOut", element: <PBASReport /> },
        { path: "/report/facultyReport/:userId/:years/:otherOptions", element: <FacultyReport /> },
        { path: "/report/AAAReport/:department/:selectedYear", element: <AAAReport /> },
        { path: "/dashboard/select-department/:serviceName", element: <AllDepartments /> },
        { path: "/dashboard/:school", element: <AllFaculties /> },
        { path: "/dashboard/faculty/:facultyName", element: <Faculty /> },
        { path: "/dashboard/:school/students", element: <AllStudents /> },
        { path: "/dashboard/:school/alumni", element: <AllAlumni /> },
        { path: "/dashboard/schoolInformation/:schoolName", element: <SchoolInformation /> },
        { path: "/dashboard/alumni/:school/:model/:title", element: <AlumniModelWise /> },
        { path: "/dashboard/information/:school/:model/:title", element: <OtherDashboardData /> },
        { path: "/dashboard/director/information/:school/:model/:title", element: <DirectorDashboardData /> },
        { path: "/services/forgot-password/:serviceName", element: <ForgotPassword /> },
        { path: '/news', element: <NewsPage /> },
        { path: '/pro-login', element: <PROLogin /> },
        { path: '/pro', element: <PROHome /> },
        { path: '/pro-editor', element: <PROEditor /> },
        { path: '/news/:newsId', element: <SingleNews /> },
        { path: '/event/:eventId', element: <Gallery /> },
        { path: '/upload-event', element: <AddEvent /> },
        { path: '/events', element: <EventsPage /> },
        { path: '/feedback/student', element: <StudentFeedback /> },
        { path: '/feedback/teacher', element: <TeacherFeedback /> },
        { path: '/feedback/alumni', element: <AlumniFeedback /> },
        { path: '/feedback/parent', element: <ParentFeedback /> },
        { path: '/feedback/employer', element: <EmployerFeedback /> },
        { path: '/feedback/expert', element: <ExpertFeedback /> },
        { path: '/feedback/:userType/:year/:school', element: <FeedbackRedirect /> },
        { path: '/feedback/response/student/:academicYear/:schoolName', element: <StudentResponse /> },
        { path: '/feedback/response/:responseType/:academicYear/:schoolName', element: <OtherReponses /> },
        { path: "/director/service/feedback/generateFeebackLinks", element: <GenerateFeedbackLink /> },
        { path: "/director/service/feedback/dashboard", element: <FeedbackDashboard /> },
        { path: "/director/service/feedback/action", element: <ActionOnFeedback /> },
        { path: "director/feedback/dashboard", element: <StatusPage auth={{ director: useDirectorAuth }} /> },
        { path: "/feedback/generateFeedbackReport/:schoolName/:feedbackUser/:academicYear", element: <FeedbackReport /> },
        { path: "/SSS/report/:schoolName/:academicYear", element: <SSSReport /> },
        { path: "/feedback/analysis-and-atr/:feedbackYear", element: <FeedbackStatus /> },
        { path: "/faculty/service/aqar-report", element: <AQARHome auth={useAuth} /> },
        { path: "/director/service/aqar-report", element: <AQARHome userType='director' auth={useDirectorAuth} /> },
        { path: "/:userType/service/generateAQARReport", element: <GenerateAQARReport auth={{ faculty: useAuth, director: useDirectorAuth }} /> },
        { path: "/director/service/status", element: <DirectorReportStatus /> },
        { path: "/programs", element: <ProgramHome /> },
        { path: "/program/:programId/program-flyer", element: <ProgramFlyer /> },
        { path: "/program/:programId", element: <SingleProgram /> },
        { path: "/program/:programId/registration-form", element: <ProgramRegistration /> },
        { path: "/program/:programId/registration-details", element: <RegistrationDetails /> },
        { path: "/program/:programId/registration-details/participants", element: <RegistrationDetails forPublic={true} /> },
        { path: "/program/:programId/feedback-details", element: <ProgramFeedbackDetails /> },
        { path: "/program/:programId/program-feedback", element: <ProgramFeedback /> },
        { path: "/program/:programId/upload-program-photos", element: <AddProgramPhotos /> },
        { path: "/program/:programId/registration-form/acknowledgement", element: <RegistrationAck /> },
        { path: "/program/:programId/feedback-form/acknowledgement", element: <FeedbackAck /> },
        { path: "/addProgram", element: <AddProgram /> },
        { path: "/youthfestival/college-registration", element: <YFCollegeRegistration /> },
        { path: "/youthfestival/college-login", element: <YFCollegeLogin /> },
        { path: "/youthfestival", element: <YFCollegeHome /> },
        { path: "/youthfestival/participant-details-form", element: <YFForm /> },
        { path: "/youthfestival/generate-report", element: <YFGenerateReport /> },
        { path: "/youthfestival/application-form/:collegeId/:academicYear", element: <YFApplicationForm /> },
        { path: "/pm-usha-login", element: <USHALogin /> },
        { path: "/pm-usha", element: <USHAHome /> },
        { path: "/pm-usha/:tabName/details", element: <USHATabDetails /> },
        { path: "/pm-usha/:tabName/status", element: <USHAStatus /> },
        { path: "/nss-login", element: <NSSLogin /> },
        { path: "/nss", element: <NSSHome /> },
        { path: "/nss/aqar", element: <NSSAQAR /> },
        { path: "/nss/student-admission", element: <NSSStudentAdmission /> },
        { path: "/dsd-login", element: <DSDLogin /> },
        { path: "/dsd", element: <DSDHome /> },
        { path: "/dsd/aqar", element: <DSDAQAR /> },
        { path: "/dsd/youthfestival/dashboard", element: <YouthDashboard /> },
        { path: "/iil-login", element: <IILLogin /> },
        { path: "/iil", element: <IILHome /> },
        { path: "/iil/aqar", element: <IILAQAR /> },
        { path: "/krc-login", element: <KRCLogin /> },
        { path: "/krc", element: <KRCHome /> },
        { path: "/krc/aqar", element: <KRCAQAR /> },
        { path: "/boee-login", element: <ExamLogin /> },
        { path: "/boee", element: <ExamHome /> },
        { path: "/boee/aqar", element: <ExamAQAR /> },
        { path: "/sports-login", element: <SportsLogin /> },
        { path: "/sports", element: <SportsHome /> },
        { path: "/sports/aqar", element: <SportsAQAR /> },
        { path: "/pg-login", element: <PGLogin /> },
        { path: "/pg", element: <PGHome /> },
        { path: "/establishment-login", element: <ESTTLogin /> },
        { path: "/establishment", element: <ESTTHome /> },
        { path: "/apds-login", element: <APDSLogin /> },
        { path: "/apds", element: <APDSHome /> },
        { path: "/competativeExams-training-skillsDevelopment-login", element: <SkillLogin /> },
        { path: "/competativeExams-training-skillsDevelopment", element: <SkillsHome /> },
        { path: "/competativeExams-training-skillsDevelopment/data-center", element: <SkillFillData /> },
        { path: "/competativeExams-training-skillsDevelopment/upsc-mpsc-studentRegistration", element: <UMPSCStudentRegistration /> },
        { path: "/competativeExams-training-skillsDevelopment/upsc-mpsc-feedback", element: <UMPSCFeedback /> },
        { path: "/training-and-placement-login", element: <PlacementLogin /> },
        { path: "/training-and-placement", element: <PlacementHome /> },
        { path: "/training-and-placement/aqar", element: <PlacementAQAR /> },
        { path: "/aqar/other", element: <OtherAQAR /> },
        { path: "/aqar/other/:academicYear/:tableId", element: <SingleOtherAQAR /> },
        { path: "/student-satisfaction-survey", element: <StudentSatisfactionSurvey /> },
        { path: "/SSS/student-satisfaction-survey/:surveyYear", element: <AdminSSSModule /> },
        { path: "/swayam-nptel-login", element: <SwayamLogin /> },
        { path: "/swayam-nptel", element: <SwayamHome /> },
        { path: "/swayam-nptel/data-center", element: <SwayamDataCenter /> },
        { path: "/:userType/aqar", element: <ChooseAQARYear /> },
        { path: "/:userType/aqar/:academicYear/:stageName", element: <Stage /> },
        { path: "/director/nirf", element: <ChooseNIRFYear /> },
        { path: "/director/nirf/:academicYear/:module", element: <NIRFContent /> },
        { path: "/tablepdf/:title/:serviceName/:proof/:proof2/:paramsObject", element: <TablePDF /> },
        { path: "/service/faculty/validate-data", element: <CheckFillData /> },
        { path: "/affiliated-college/college-registration", element: <ACFRegistration /> },
        { path: "/affiliated-college/fee-details/:collegeCode/:collegeCodeHash", element: <ACFCollegeHome /> },
        { path: "/affiliated-college/fee-details/:collegeCode/:collegeCodeHash/select-year", element: <ACFSelectYear /> },
        { path: "/affiliated-college/fee-details/:collegeCode/:collegeCodeHash/:academicYear/fill-details", element: <ACFFillDetails /> },
    ];


    const renderRoutes = useMemo(() => {
        return routes.map((route) => {
            const suspenseElement = <Suspense fallback={<UserLoading title="Loading" />}>
                {route.element}
            </Suspense>
            return <Route key={route} path={route.path} exact element={suspenseElement} />
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return renderRoutes
}


export default RoutesHandler