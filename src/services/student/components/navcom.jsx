//Icons
import SchoolIcon from '@mui/icons-material/School';
import BusinessIcon from '@mui/icons-material/Business';
import WorkIcon from '@mui/icons-material/Work';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TaskIcon from '@mui/icons-material/Task';
import PersonSearchRoundedIcon from '@mui/icons-material/PersonSearchRounded';

//components

import StudentJRFSRF from "../pages/StudentJRFSRF";
import CombineQualification from '../pages/CombineQualification';
import AlumniHE from '../pages/AlumniHE'
import AlumniExamQualified from '../pages/AlumniExamQualified';
import AlumniBusiness from '../pages/AlumniBusiness';
import AlumniJobs from '../pages/AlumniJobs';
import AlumniContribution from '../pages/AlumniContribution';
import StudentPatents from '../pages/StudentPatents';
import SrtudentBooksAndChapters from '../pages/SrtudentBooksAndChapters';
import StudentResearchProjects from '../pages/StudentResearchProjects';
import StudentResearchPapers from '../pages/StudentResearchPapers';

const PhDStudent = [
    {
        element: <CombineQualification />,
        icon: <PersonSearchRoundedIcon style={{ fontSize: '20px', color: "#1E3A8A" }} />,
        name: 'studentQualification',
        value: 'Qualification',
    },
    {
        element: <StudentJRFSRF />,
        icon: <PersonSearchRoundedIcon style={{ fontSize: '20px', color: "#1E3A8A" }} />,
        name: 'studentJRFSRF',
        value: 'JRF, SRF, Post Doctoral Fellows, Research Associate',
    },
    {
        element: <AlumniHE />,
        icon: <SchoolIcon style={{ fontSize: '20px', color: "#1E3A8A" }} />,
        name: 'higherEducation',
        value: 'Higher Education',
    },
    {
        element: <AlumniExamQualified />,
        icon: <TaskIcon style={{ fontSize: '20px', color: "#1E3A8A" }} />,
        name: 'examQualified',
        value: 'Exam Qualified',
    },
    {
        element: <AlumniJobs />,
        icon: <WorkIcon style={{ fontSize: '20px', color: "#1E3A8A" }} />,
        name: 'jobs',
        value: 'Jobs',
    },
    {
        element: <AlumniBusiness />,
        icon: <BusinessIcon style={{ fontSize: '20px', color: "#1E3A8A" }} />,
        name: 'business',
        value: 'Business',
    },
    {
        element: <AlumniContribution />,
        icon: <AccountBalanceWalletIcon style={{ fontSize: '20px', color: "#1E3A8A" }} />,
        name: 'alumniContribution',
        value: 'Alumni Contribution',
    },
]

const ResearchCenter = [
    {
        element: <StudentPatents />,
        icon: <PersonSearchRoundedIcon style={{ fontSize: '20px', color: "#1E3A8A" }} />,
        name: 'studentPatents',
        value: 'Patents',
    },
    {
        element: <SrtudentBooksAndChapters />,
        icon: <PersonSearchRoundedIcon style={{ fontSize: '20px', color: "#1E3A8A" }} />,
        name: 'studentBooksAndChapters',
        value: 'Books and Chapters published and papers in national/international conference proceedings',
    },
    {
        element: <StudentResearchProjects />,
        icon: <PersonSearchRoundedIcon style={{ fontSize: '20px', color: "#1E3A8A" }} />,
        name: 'studentResearchProjects',
        value: 'Research Projects',
    },
    {
        element: <StudentResearchPapers />,
        icon: <PersonSearchRoundedIcon style={{ fontSize: '20px', color: "#1E3A8A" }} />,
        name: 'studentResearchPapers',
        value: 'Research Papers in the Journals notified by UGC',
    },
]
export default PhDStudent;
export {ResearchCenter}