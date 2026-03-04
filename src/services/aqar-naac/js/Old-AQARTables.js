import SyllabusRevision from '../../director/pages/SyllabusRevision'
import Employability from '../../director/pages/Employability'
import ValueAddedCource from '../../director/pages/ValueAddedCource'
import ProjectsInternships from '../../director/pages/ProjectsInternships'
import DemandRatio from '../../director/pages/DemandRatio'
import ReservedSeats from '../../director/pages/ReservedSeats'
import UgcSapCasDstFistDbtICssr from '../../director/pages/UgcSapCasDstFistDBTICSSR'
import ResearchMethodologyWorkshops from '../../director/pages/ResearchMethodologyWorkshops'
import Awards from '../../director/pages/Awards'
import ExtensionActivities from '../../director/pages/ExtensionActivities'
import MoUs from '../../director/pages/MoUs'
import CounselingAndGuidance from '../../director/pages/CounselingAndGuidance'
import SkillsEnhancementInitiatives from '../../director/pages/SkillsEnhancementInitiatives'
import QualifiedExams from '../../director/pages/QualifiedExams'
import Placements from '../../director/pages/Placements'
import ProgressionToHE from '../../director/pages/ProgressionToHE'
import AlumniContribution from '../../director/pages/AlumniContribution'
import TrainingProgramsOrganized from '../../director/pages/TrainingProgramsOrganized'
import AQARTextMatter from '../components/AQARTextMatter'
import AdminMasterTable from '../../admin/components/AdminMasterTable'

function AQARTablesObject({ academicYear, isDirector, school }) {
    return {
        "extended-profile": [],
        "criterion-1": [
            {
                id: "1.1.1",
                title: "1.1.1 - Curricula developed and implemented have relevance to the local, national, regional and global developmental needs which is reflected in Programme outcomes (POs), Programme Specific Outcomes(PSOs) and Course Outcomes(COs) of the Programmes offered by the University",
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '1.1.1', userType: 'director', school
                },
                component: <AQARTextMatter academicYear={academicYear} isAdmin={!isDirector} school={school} matterType='1.1.1' userType='director' />

            },
            {
                id: "1.1.2",
                title: '1.1.2 - Programmes for which syllabus revision was carried out during the Academic year',
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '1.1.2', userType: 'director', school
                },
                component: isDirector ?
                    <SyllabusRevision filterByAcademicYear={true} academicYear={academicYear} /> : <AdminMasterTable model="SyllabusRevision" customParams={{ model: "SyllabusRevision", module: "Admin", filter: { Academic_Year: academicYear } }} heading='Syllabus Revision' serviceName="director" proof="Upload_Proof" />,
            },
            {
                id: "1.1.3",
                title: '1.1.3 - Programmes/ courses focussed on employability/ entrepreneurship/ skill development during the Academic year',
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '1.1.3', userType: 'director', school
                },
                component: isDirector ? <Employability filterByAcademicYear={true} academicYear={academicYear} /> : <AdminMasterTable model="Employability" customParams={{ model: "Employability", module: "Admin", filter: { Academic_Year: academicYear } }} heading='Courses focusing employability / entrepreneurship / skill development' serviceName="director" proof="Upload_Proof" />
            },
            // ? 1.2
            {
                id: "1.2.1",
                title: '1.2.1 - New programmes/courses introduced during the Academic year',
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '1.2.1', userType: 'director', school
                },
                component: isDirector ? <Employability filterByAcademicYear={true} academicYear={academicYear} /> : <AdminMasterTable model="Employability" customParams={{ model: "Employability", module: "Admin", filter: { Academic_Year: academicYear } }} heading='Courses focusing employability / entrepreneurship / skill development' serviceName="director" proof="Upload_Proof" />
            },
            {
                id: "1.2.2",
                title: '1.2.2 - Programmes in which Choice Based Credit System (CBCS)/Elective Course System implemented at the University level during the Academic year.',
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '1.2.2', userType: 'director', school
                },
                component: isDirector ?
                    <SyllabusRevision filterByAcademicYear={true} academicYear={academicYear} /> : <AdminMasterTable model="SyllabusRevision" customParams={{ model: "SyllabusRevision", module: "Admin", filter: { Academic_Year: academicYear } }} heading='Syllabus Revision' serviceName="director" proof="Upload_Proof" />,
            },
            {
                id: "1.3.1",
                title: "1.3.1 - Institution integrates crosscutting issues relevant to Professional Ethics, Gender, Human Values, Environment and Sustainability into the Curriculum",
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '1.3.1', userType: 'director', school
                },
                component: <AQARTextMatter academicYear={academicYear} isAdmin={!isDirector} school={school} matterType='1.3.1' userType='director' />

            },
            {
                id: "1.3.2",
                title: '1.3.2 - Value-added courses imparting transferable and life skills offered during the year',
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '1.3.2', userType: 'director', school
                },
                component: isDirector ?
                    <ValueAddedCource filterByAcademicYear={true} academicYear={academicYear} /> : <AdminMasterTable model="ValueAddedCource" customParams={{ model: "ValueAddedCource", module: "Admin", filter: { Academic_year: academicYear } }} heading='Value Added Courses' serviceName="director" proof="Upload_Proof" />,
            },
            {
                id: "1.3.3",
                title: '1.3.3 - Total number of students enrolled in the courses under 1.3.2 above',
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '1.3.3', userType: 'director', school
                },
                component: isDirector ?
                    <ValueAddedCource filterByAcademicYear={true} academicYear={academicYear} /> : <AdminMasterTable model="ValueAddedCource" customParams={{ model: "ValueAddedCource", module: "Admin", filter: { Academic_year: academicYear } }} heading='Value Added Courses' serviceName="director" proof="Upload_Proof" />,
            },
            {
                id: "1.3.4",
                title: '1.3.4 - Number of students undertaking field projects / research projects / internships during the year',
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '1.3.4', userType: 'director', school
                },
                component: isDirector ?
                    <ProjectsInternships filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="ProjectsInternships" customParams={{ model: "ProjectsInternships", module: "Admin", filter: { Academic_Year: academicYear } }} heading='Projects / Internships' serviceName="director" proof="Upload_Proof" />,
            },
            // todo 1.4 
            // ? table 1.4.1 - Structured feedback for design and review of syllabus – semester wise / is received from Students, Teachers, Employers, Alumni
            // ? ????? 1.4.2 - Feedback processes of the institution may be classified as follows

        ],
        "criterion-2": [
            // ?   2.1
            {
                id: "2.1.1",
                title: '2.1.1 - Demand Ratio during the year',
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '2.1.1', userType: 'director', school
                },
                component: isDirector ?
                    <DemandRatio filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="DemandRatio" customParams={{ model: "DemandRatio", module: "Admin", filter: { Academic_Year: academicYear } }} heading='Demand Ratio' serviceName="director" proof="Upload_Proof" />,
            },
            {
                id: "2.1.2",
                title: '2.1.2 - Total number of seats filled against reserved categories (SC, ST, OBC, Divyangjan, etc.) as per applicable reservation policy during the year (Excluding Supernumerary Seats)',
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '2.1.2', userType: 'director', school
                },
                component: isDirector ?
                    <ReservedSeats filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="ReservedSeats" customParams={{ model: "ReservedSeats", module: "Admin", filter: { Academic_Year: academicYear } }} heading='Seats reserved for various categories as per applicable reservation policy' serviceName="director" proof="Upload_Proof" />,
            },
            {
                id: "2.2.1",
                title: "2.2.1 - The institution assesses the learning levels of the students and organises special Programmes for advanced learners and slow learners",
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '2.2.1', userType: 'director', school
                },
                component: <AQARTextMatter academicYear={academicYear} isAdmin={!isDirector} school={school} matterType='2.2.1' userType='director' />

            },

            // todo 2.2 
            // ? ????? title - 2.2.2 - Student - Full time teacher ratio during the year

            // todo 2.3 
            {
                id: "2.3.1",
                title: "2.3.1 - Student centric methods, such as experiential learning, participative learning and problem-solving methodologies are used for enhancing learning experiences",
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '2.3.1', userType: 'director', school
                },
                component: <AQARTextMatter academicYear={academicYear} isAdmin={!isDirector} school={school} matterType='2.3.1' userType='director' />

            },
            {
                id: "2.3.2",
                title: "2.3.2 - Teachers use ICT enabled tools including online resources for effective teaching and learning processes during the year",
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '2.3.2', userType: 'director', school
                },
                component: <AQARTextMatter academicYear={academicYear} isAdmin={!isDirector} school={school} matterType='2.3.2' userType='director' />

            },
            // ? ????? title - 2.3.3 - Ratio of students to mentor for academic and other related issues during the year

            // todo 2.4
            {
                id: "2.4.1",
                title: '2.4.1 - Total Number of full time teachers against sanctioned posts during the year',
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '2.4.1', userType: 'estt'
                },
                component: !isDirector && <AdminMasterTable model="EsttFullTimeTeacherAgainstSanctioned" customParams={{ model: "EsttFullTimeTeacherAgainstSanctioned", module: "Admin", filter: { academicYear } }} heading='Full Time Teachers Against Sanctioned Posts' serviceName="estt" />
            },
            // ? table title - 2.4.2 - Total Number of full time teachers withPh.D./D.M/M.Ch./D.N.B Superspeciality/D.Sc./D’Lit. during the year 
            {
                id: "2.4.3",
                title: '2.4.3 - Total teaching experience of full time teachers in the same institution during the year',
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '2.4.3', userType: 'estt'
                },
                component: !isDirector && <AdminMasterTable model="EsttFullTimeTeacherAgainstSanctioned" customParams={{ model: "EsttFullTimeTeacherAgainstSanctioned", module: "Admin", filter: { academicYear } }} heading='Full Time Teachers Against Sanctioned Posts' serviceName="estt" />
            },
            {
                id: "2.4.4",
                title: '2.4.4 - Total number of full time teachers who received awards, recognition, fellowships at State, National, International level from Government/Govt. recognised bodies during the year ',
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '2.4.4', userType: 'faculty', school
                },
                component: <AdminMasterTable model="AwardRecognition" academicYear={academicYear} school={school} heading='Award Recognition' serviceName="faculty" proof="proof" />
            },
            // todo 2.5
            {
                id: "2.5.1",
                title: '2.5.1 - Number of days from the date of last semester-end/ year- end examination till the declaration of results during the year',
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '2.5.1', userType: 'faculty', school
                },
                component: <AdminMasterTable model="DateOfResultDiclaration" customParams={{ model: "DateOfResultDiclaration", module: "Admin", filter: { academicYear } }} heading='Date Of Result Declaration' serviceName="exam" />
            },
            {
                id: "2.5.2",
                title: '2.5.2 - Total number of student complaints/grievances about evaluation against total number appeared in the examinations during the year',
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '2.5.2', userType: 'faculty', school
                },
                component: <AdminMasterTable model="StudentComplaintsGrievances" customParams={{ model: "StudentComplaintsGrievances", module: "Admin", filter: { academicYear } }} heading='Student Complaints Grievances' serviceName="exam" />
            },
            {
                id: "2.5.3",
                title: "2.5.3 - IT integration and reforms in the examination procedures and processes (continuous internal assessment and end-semester assessment) have brought in considerable improvement in examination management system of the institution",
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '2.5.3', userType: 'director', school
                },
                component: <AQARTextMatter academicYear={academicYear} isAdmin={!isDirector} school={school} matterType='2.5.3' userType='director' />

            },
            // ? table title - 2.5.4 - Status of automation of Examination division along with approved Examination Manual
            // todo 2.6
            {
                id: "2.6.1",
                title: "2.6.1 - The institution has stated learning outcomes (generic and programme specific)/graduate attributes which are integrated into the assessment process and widely publicized through the website and other documents ",
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '2.6.1', userType: 'director', school
                },
                component: <AQARTextMatter academicYear={academicYear} isAdmin={!isDirector} school={school} matterType='2.6.1' userType='director' />

            },
            {
                id: "2.6.2",
                title: "2.6.2 - Attainment of Programme outcomes, Programme specific outcomes and course outcomes are evaluated by the institution during the year",
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '2.6.2', userType: 'director', school
                },
                component: <AQARTextMatter academicYear={academicYear} isAdmin={!isDirector} school={school} matterType='2.6.2' userType='director' />

            },
            {
                id: "2.6.3",
                title: '2.6.3 - Number of students passed during the year',
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '2.6.3', userType: 'faculty', school
                },
                component: <AdminMasterTable model="ExamPassedDuringYear" customParams={{ model: "ExamPassedDuringYear", module: "Admin", filter: { academicYear } }} heading='Students passed during the year' serviceName="exam" />
            },
            // todo 2.7
            // ? 2.7.1 - Student Satisfaction Survey (SSS) on overall institutional performance (Institution may design its own questionnaire) (results and details need to be provided as a web link)

        ],
        "criterion-3": [
            // todo 3.1
            {
                id: "3.1.1",
                title: "3.1.1 - The institution Research facilities are frequently updated and there is well defined policy for promotion of research which is uploaded on the institutional website and implemented",
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '3.1.1', userType: 'director', school
                },
                component: <AQARTextMatter academicYear={academicYear} isAdmin={!isDirector} school={school} matterType='3.1.1' userType='director' />

            },
            // ? table  title - 3.1.2 - The institution provides seed money to its teachers for research (amount INR in Lakhs)
            {
                id: "3.1.3",
                title: '3.1.3 - Teachers awarded National/International fellowship for advanced studies/ research during the year',
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '3.1.3', userType: 'faculty', school
                },
                component: <AdminMasterTable model="Fellowship" academicYear={academicYear} school={school} heading='Fellowships' serviceName="faculty" proof="proof" />
            },
            {
                id: "3.1.4",
                title: '3.1.4 - Number of JRFs, SRFs, Post Doctoral Fellows, Research Associates and other fellows in the Institution enrolled during the year',
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '3.1.4', userType: 'faculty', school
                },
                component: <AdminMasterTable model="JrfSrf" academicYear={academicYear} school={school} heading='JRFs, SRFs, PDF, Research Associates' serviceName="faculty" proof="proof" />
            },
            // ? ????? 3.1.5 - Institution has the following facilities to support research
            {
                id: "3.1.6",
                title: '3.1.6 - Number of departments with UGC-SAP, CAS, DST-FIST, DBT, ICSSR and other recognitions by national and international agencies during the year',
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '3.1.6', userType: 'director', school
                },
                component: isDirector ?
                    <UgcSapCasDstFistDbtICssr filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="UgcSapCasDstFistDBTICSSR" customParams={{ model: "UgcSapCasDstFistDBTICSSR", module: "Admin", filter: { Year_of_Award: academicYear } }} heading='UGC-SAP, CAS, DST-FIST, DBT, ICSSR' serviceName="director" proof="Upload_Proof" />,
            },
            // ? 3.2
            {
                id: "3.2.1",
                title: '3.2.1 - Extramural funding for Research (Grants sponsored by the non-government sources such as industry, corporate houses, international bodies for research projects) endowments, Chairs in the University during the year (INR in Lakhs)',
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '3.2.1', userType: 'director', school
                },
                component: isDirector ?
                    <UgcSapCasDstFistDbtICssr filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="UgcSapCasDstFistDBTICSSR" customParams={{ model: "UgcSapCasDstFistDBTICSSR", module: "Admin", filter: { Year_of_Award: academicYear } }} heading='UGC-SAP, CAS, DST-FIST, DBT, ICSSR' serviceName="director" proof="Upload_Proof" />,
            },
            {
                id: "3.2.2",
                title: '3.2.2 - Grants for research projects sponsored by the government agencies during the year (INR in Lakhs)',
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '3.2.2', userType: 'director', school
                },
                component: isDirector ?
                    <UgcSapCasDstFistDbtICssr filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="UgcSapCasDstFistDBTICSSR" customParams={{ model: "UgcSapCasDstFistDBTICSSR", module: "Admin", filter: { Year_of_Award: academicYear } }} heading='UGC-SAP, CAS, DST-FIST, DBT, ICSSR' serviceName="director" proof="Upload_Proof" />,
            },
            {
                id: "3.2.3",
                title: '3.2.3 - Number of research projects per teacher funded by government and non-government agencies during the year',
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '3.2.3', userType: 'director', school
                },
                component: isDirector ?
                    <UgcSapCasDstFistDbtICssr filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="UgcSapCasDstFistDBTICSSR" customParams={{ model: "UgcSapCasDstFistDBTICSSR", module: "Admin", filter: { Year_of_Award: academicYear } }} heading='UGC-SAP, CAS, DST-FIST, DBT, ICSSR' serviceName="director" proof="Upload_Proof" />,
            },
            // todo 3.3
            {
                id: "3.3.1",
                title: "3.3.1 - Institution has created an eco-system for innovations including Incubation centre and other initiatives for creation and transfer of knowledge",
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '3.3.1', userType: 'director', school
                },
                component: <AQARTextMatter academicYear={academicYear} isAdmin={!isDirector} school={school} matterType='3.3.1' userType='director' />

            },
            {
                id: "3.3.2",
                title: '3.3.2 - Number of workshops/seminars conducted on Research Methodology, Intellectual Property Rights (IPR), Entrepreneurship and Skill Development during the year',
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '3.3.2', userType: 'director', school
                },
                component: isDirector ?
                    <ResearchMethodologyWorkshops filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="ResearchMethodologyWorkshops" customParams={{ model: "ResearchMethodologyWorkshops", module: "Admin", filter: { Academic_Year: academicYear } }} heading='Research Methodology Workshops' serviceName="director" proof="Upload_Proof" />,
            },
            {
                id: "3.3.3",
                title: '3.3.3 - Number of awards / recognitions received for research/innovations by the institution/teachers/research scholars/students during the year',
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '3.3.3', userType: 'director', school
                },
                component: isDirector ?
                    <Awards filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="Award" customParams={{ model: "Award", module: "Admin", filter: { Academic_Year: academicYear } }} heading='Awards' serviceName="director" proof="Upload_Proof" />,
            },
            // todo 3.4
            // ? ????? title - 3.4.1 - The institution ensures implementation of its stated Code of Ethics for research
            {
                id: "3.4.2",
                title: '3.4.2 - The institution provides incentives to teachers who receive state, national and international recognitions/awards',
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '3.4.2', userType: 'faculty', school
                },
                component: <AdminMasterTable model="AwardRecognition" academicYear={academicYear} school={school} heading='Award Recognition' serviceName="faculty" proof="proof" />
            },
            {
                id: "3.4.3",
                title: '3.4.3 - Number of Patents published/awarded during the year',
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '3.4.3', userType: 'faculty', school
                },
                component: <AdminMasterTable model="Patent" academicYear={academicYear} school={school} heading='Patents' serviceName="faculty" proof="proof" />
            },
            {
                id: "3.4.4",
                title: '3.4.4 - Number of Ph.D’s awarded per teacher during the year',
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '3.4.4', userType: 'faculty', school
                },
                component: <AdminMasterTable model="PhdAwarded" customParams={{
                    model: "PhdAwarded", module: "Admin", filter: { year: academicYear, degreeName: "Ph.D.", awardSubmit: 'Awarded' },
                    filterConditios: { school }
                }} heading='Ph.D Awarded' serviceName="faculty" proof="proof" />
            },
            {
                id: "3.4.5",
                title: '3.4.5 - Number of research papers per teacher in the Journals notified on UGC website during the year',
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '3.4.5', userType: 'faculty', school
                },
                component: <AdminMasterTable model="ResearchPapers" academicYear={academicYear} school={school} heading='Research papers' serviceName="faculty" proof="proof" />
            },
            {
                id: "3.4.6",
                title: '3.4.6 - Number of books and chapters in edited volumes published per teacher during the year',
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '3.4.6', userType: 'faculty', school
                },
                component: <AdminMasterTable model="BooksAndChapters" academicYear={academicYear} school={school} heading='Books and  Chapters' serviceName="faculty" proof="proof" />
            },
            {
                id: "3.4.7",
                title: '3.4.7 - E-content is developed by teachers',
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '3.4.7', userType: 'faculty', school
                },
                component: <AdminMasterTable model="EContentDeveloped" academicYear={academicYear} school={school} heading='E-content Developed' serviceName="faculty" proof="proof" />
            },
            {
                id: "3.4.8",
                title: "3.4.8 - Bibliometrics of the publications during the year based on average Citation Index in Scopus/ Web of Science/PubMed",
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '3.4.8', userType: 'director', school
                },
                component: <AQARTextMatter academicYear={academicYear} isAdmin={!isDirector} school={school} matterType='3.4.8' userType='director' />

            },
            {
                id: "3.4.9",
                title: "3.4.9 - Bibliometrics of the publications during the year based on Scopus/ Web of Science – h-Index of the University",
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '3.4.9', userType: 'director', school
                },
                component: <AQARTextMatter academicYear={academicYear} isAdmin={!isDirector} school={school} matterType='3.4.9' userType='director' />

            },

            // todo 3.5
            {
                id: "3.5.1",
                title: "3.5.1 - Institution has a policy on consultancy including revenue sharing between the institution and the individual and encourages its faculty to undertake consultancy",
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '3.5.1', userType: 'director', school
                },
                component: <AQARTextMatter academicYear={academicYear} isAdmin={!isDirector} school={school} matterType='3.5.1' userType='director' />

            },

            {
                id: "3.5.2",
                title: '3.5.2 - Revenue generated from consultancy and corporate training during the year (INR in Lakhs)',
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '3.5.2', userType: 'faculty', school
                },
                component: <AdminMasterTable model="ConsultancyServices" academicYear={academicYear} school={school} heading='Consultancy Services' serviceName="faculty" proof="proof" />
            },
            // todo 3.6
            {
                id: "3.6.1",
                title: "3.6.1 - Extension activities in the neighbourhood community in terms of impact and  sensitising students to social issues and holistic development during the year",
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '3.6.1', userType: 'director', school
                },
                component: <AQARTextMatter academicYear={academicYear} isAdmin={!isDirector} school={school} matterType='3.6.1' userType='director' />

            },

            // ? table title - 3.6.2 - Number of awards received by the Institution, its teachers and students from Government /Government recognised bodies in recognition of the extension activities carried out  during the year
            {
                id: "3.6.3",
                title: '3.6.3 - Number of extension and outreach programs conducted by the institution including those through NSS/NCC/Red cross/YRC during the year(including Government initiated programs such as Swachh Bharat, Aids Awareness, Gender Issue, etc. and those organised in collaboration with industry, community and NGOs)',
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '3.6.3', userType: 'director', school
                },
                component: isDirector ?
                    <ExtensionActivities filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="ExtensionActivities" customParams={{ model: "ExtensionActivities", module: "Admin", filter: { Year_of_activity: academicYear } }} heading='Extension Activities' serviceName="director" proof="Upload_Proof" />,
            },
            {
                id: "3.6.4",
                title: '3.6.4 - Total number of students participating in extension activities listed at 3.6.3 above during the year',
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '3.6.4', userType: 'director', school
                },
                component: isDirector ?
                    <ExtensionActivities filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="ExtensionActivities" customParams={{ model: "ExtensionActivities", module: "Admin", filter: { Year_of_activity: academicYear } }} heading='Extension Activities' serviceName="director" proof="Upload_Proof" />,
            },
            // ? 3.7
            {
                id: "3.7.1",
                title: '3.7.1 - Number of collaborative activities with other institutions/ research establishment/industry for research and academic development of faculty and students during the year',
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '3.7.1', userType: 'faculty', school
                },
                component: <AdminMasterTable model="Collaboration" academicYear={academicYear} school={school} heading='Collaborations' serviceName="faculty" proof="proof" />
            },
            {
                id: "3.7.2",
                title: '3.7.2 - Number of functional MoUs with institutions/ industries in India and abroad for internship, on-the-job training, project work, student / faculty exchange and collaborative research during the year',
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '3.7.2', userType: 'director', school
                },
                component: isDirector ?
                    <MoUs filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="MoUs" customParams={{ model: "MoUs", module: "Admin", filter: { Academic_Year: academicYear } }} heading='MoUs' serviceName="director" proof="Upload_Proof" />,
            },
        ],
        "criterion-4": [
            // todo 4.1
            {
                id: "4.1.1",
                title: "4.1.1 - The institution has adequate facilities for teaching - learning. viz., classrooms, laboratories, computing equipment, etc.",
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '4.1.1', userType: 'director', school
                },
                component: <AQARTextMatter academicYear={academicYear} isAdmin={!isDirector} school={school} matterType='4.1.1' userType='director' />

            },
            {
                id: "4.1.2",
                title: "4.1.2 - The institution has adequate facilities for cultural activities, yoga, games (indoor, outdoor) and sports. (gymnasium, yoga centre, auditorium, etc.)",
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '4.1.2', userType: 'director', school
                },
                component: <AQARTextMatter academicYear={academicYear} isAdmin={!isDirector} school={school} matterType='4.1.2' userType='director' />

            },
            {
                id: "4.1.3",
                title: "4.1.3 - Availability of general campus facilities and overall ambience",
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '4.1.3', userType: 'director', school
                },
                component: <AQARTextMatter academicYear={academicYear} isAdmin={!isDirector} school={school} matterType='4.1.3' userType='director' />

            },
            {
                id: "4.1.4",
                title: '4.1.4 - Total expenditure excluding salary for infrastructure augmentation during the year (INR in Lakhs)',
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '4.1.4', userType: 'other'
                },
                component: !isDirector && <AdminMasterTable model="TotalExpenditure" customParams={{ model: "TotalExpenditure", module: "Admin", filter: { academicYear } }} heading='Total Expenditure (FAO)' serviceName="other" />
            },
            // todo 4.2
            {
                id: "4.1.3",
                title: "4.1.3 - Availability of general campus facilities and overall ambience",
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '4.1.3', userType: 'director', school
                },
                component: <AQARTextMatter academicYear={academicYear} isAdmin={!isDirector} school={school} matterType='4.1.3' userType='director' />

            },
            {
                id: "4.2.1",
                title: "4.2.1 - Library is automated using Integrated Library Management System (ILMS) and has digitisation facility",
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '4.2.1', userType: 'director', school
                },
                component: <AQARTextMatter academicYear={academicYear} isAdmin={!isDirector} school={school} matterType='4.2.1' userType='director' />

            },
            // ? ????? title - 4.2.2 - Institution has subscription for e-Library resources Library has regular subscription for the following: e – journals, e-books, e-ShodhSindhu, Shodhganga, Databases
            {
                id: "4.2.3",
                title: '4.2.3 - Annual expenditure for purchase of books/ e-books and subscription to journals/e-journals during the year (INR in Lakhs)',
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '4.2.3', userType: 'krc'
                },
                component: !isDirector && <AdminMasterTable model="SubscriptionForKRC" customParams={{ model: "SubscriptionForKRC", module: "Admin", filter: { academicYear } }} heading='Institution has subscription for KRC' serviceName="krc" proof="proof" />
            },
            // ? ????? title - 4.2.4 - Number of usage of library by teachers and students per day (foot falls and login data for online access)
            // todo 4.3
            // ? table title - 4.3.1 - Number of classrooms and seminar halls with ICT - enabled facilities such as LCD, smart board, Wi-Fi/LAN, audio video recording facilities during the year
            {
                id: "4.2.3",
                title: '4.2.3 - Annual expenditure for purchase of books/ e-books and subscription to journals/e-journals during the year (INR in Lakhs)',
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '4.2.3', userType: 'krc'
                },
                component: !isDirector && <AdminMasterTable model="SubscriptionForKRC" customParams={{ model: "SubscriptionForKRC", module: "Admin", filter: { academicYear } }} heading='Institution has subscription for KRC' serviceName="krc" proof="proof" />
            },
            {
                id: "4.3.2",
                title: "4.3.2 - Institution has an IT policy, makes appropriate budgetary provision and updates its IT facilities including Wi-Fi facility",
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '4.3.2', userType: 'director', school
                },
                component: <AQARTextMatter academicYear={academicYear} isAdmin={!isDirector} school={school} matterType='4.3.2' userType='director' />

            },
            // ? ????? title - 4.3.3 - Student - Computer ratio during the year
            // ? ????? title - 4.3.4 - Available bandwidth of internet connection in the Institution (Leased line)
            {
                id: "4.3.5",
                title: '4.3.5 - Institution has the following Facilities for e-content development 1) Media centre, 2) Audio visual centre, 3) Lecture Capturing System(LCS), 4) Mixing equipment’s and softwares for editing',
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '4.3.5', userType: 'faculty', school
                },
                component: <AdminMasterTable model="EContentDeveloped" academicYear={academicYear} school={school} heading='E-content Developed' serviceName="faculty" proof="proof" />
            },
            // todo 4.4
            {
                id: "4.4.1",
                title: '4.4.1 - Total expenditure incurred on maintenance of physical facilities and academic support facilities excluding salary component during the year',
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '4.4.1', userType: 'other'
                },
                component: !isDirector && <AdminMasterTable model="TotalExpenditure" customParams={{ model: "TotalExpenditure", module: "Admin", filter: { academicYear } }} heading='Total Expenditure (FAO)' serviceName="other" />
            },
            {
                id: "4.4.2",
                title: "4.4.2 - There are established systems and procedures for maintaining and utilizing physical, academic and support facilities - laboratory, library, sports complex, computers, classrooms etc.",
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '4.4.2', userType: 'director', school
                },
                component: <AQARTextMatter academicYear={academicYear} isAdmin={!isDirector} school={school} matterType='4.4.2' userType='director' />

            },
        ],
        "criterion-5": [
            // todo 5.1
            // ? table title - 5.1.1 - Total number of students benefited by scholarships and free ships provided by the institution, Government and non-government agencies (NGOs) during the year (other than the students receiving scholarships under the government schemes for reserved categories)
            {
                id: "5.1.2",
                title: '5.1.2 - Total number of students benefited by career counselling and guidance for competitive examinations offered by the Institution during the year',
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '5.1.2', userType: 'director', school
                },
                component: isDirector ?
                    <CounselingAndGuidance filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="CounselingAndGuidance" customParams={{ model: "CounselingAndGuidance", module: "Admin", filter: { Year_of_Activity: academicYear } }} heading='Counseling and Guidance' serviceName="director" proof="Upload_Proof" />,
            },
            {
                id: "5.1.3",
                title: '5.1.3 - Following Capacity development and skills enhancement initiatives are taken by the institution 1) Soft skills, 2) Language and communication skills, 3) Life skills (Yoga, physical fitness, health and hygiene), 4) Awareness of trends in technology',
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '5.1.3', userType: 'director', school
                },
                component: isDirector ?
                    <SkillsEnhancementInitiatives filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="SkillsEnhancementInitiatives" customParams={{ model: "SkillsEnhancementInitiatives", module: "Admin", filter: { Academic_Year: academicYear } }} heading='Skills Enhancement Initiatives' serviceName="director" proof="Upload_Proof" />,
            },
            // ? ????? title - 5.1.4 - The Institution adopts the following for redressal of student grievances including sexual harassment and ragging cases 1) Implementation of guidelines of statutory/regulatory bodies, 2)Organisation wide awareness and undertakings on policies with zero tolerance, 3) Mechanisms for submission of online/offline students’ grievances, 4) Timely redressal of the grievances through appropriate committees

            // todo 5.2
            {
                id: "5.2.1",
                title: '5.2.1 - Number of students qualifying in state/ national/ international level examinations during the year (eg:NET/SLET/GATE/GMAT/CAT/ GRE/TOEFL/Civil Services/State government examinations)',
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '5.2.1', userType: 'director', school
                },
                component: isDirector ?
                    <QualifiedExams filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="QualifiedExams" customParams={{ model: "QualifiedExams", module: "Admin", filter: { Acadmic_year: academicYear } }} heading='Qualified Exams' serviceName="director" proof="Upload_Proof" />,
            },
            {
                id: "5.2.2",
                title: '5.2.2 - Total number of placement of outgoing students during the year',
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '5.2.2', userType: 'director', school
                },
                component: isDirector ?
                    <Placements filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="Placement" customParams={{ model: "Placement", module: "Admin", filter: { Academic_Year: academicYear } }} heading='Placements' serviceName="director" proof="Upload_Proof" />,
            },
            {
                id: "5.2.3",
                title: '5.2.3 - Number of recently graduated students who have progressed to higher education (previous graduating batch) during the year',
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '5.2.3', userType: 'director', school
                },
                component: isDirector ?
                    <ProgressionToHE filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="ProgressionToHE" customParams={{ model: "ProgressionToHE", module: "Admin", filter: { Academic_Year: academicYear } }} heading='Progression to Higher Education' serviceName="director" proof="Upload_Proof" />,
            },
            // todo 5.3
            {
                id: "5.3.1",
                title: '5.3.1 - Number of awards/medals won by students for outstanding performance in sports/cultural activities at inter-university/state/national/international events (award for a team event should be counted as one) during the year',
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '5.3.1', userType: 'dsd'
                },
                component: !isDirector && <AdminMasterTable model="DSDSports" customParams={{ model: "DSDSports", module: "Admin", filter: { academicYear } }} heading='Awards / Medals achieved by Students' serviceName="dsd" proof="proof" />
            },
            {
                id: "5.3.2",
                title: "5.3.2 - Presence of Student Council and its activities for institutional development and student welfare",
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '5.3.2', userType: 'director', school
                },
                component: <AQARTextMatter academicYear={academicYear} isAdmin={!isDirector} school={school} matterType='5.3.2' userType='director' />

            },
            {
                id: "5.3.3",
                title: '5.3.3 - Number of sports and cultural events / competitions organised by the institution during the year',
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '5.3.3', userType: 'dsd'
                },
                component: !isDirector && <AdminMasterTable model="SportsAndCulturalEvents" customParams={{ model: "SportsAndCulturalEvents", module: "Admin", filter: { academicYear } }} heading='Awards / Medals achieved by Students' serviceName="dsd" proof="proof" />
            },
            // todo 5.4
            {
                id: "5.4.1",
                title: "5.4.1 - The Alumni Association/Chapters (registered and functional)contributes significantly to the development of the institution through financial and other support services during the year",
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '5.4.1', userType: 'director', school
                },
                component: <AQARTextMatter academicYear={academicYear} isAdmin={!isDirector} school={school} matterType='5.4.1' userType='director' />

            },
            {
                id: "5.4.2",
                title: '5.4.2 - Alumni contribution during the year (INR in Lakhs)',
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '5.4.2', userType: 'director', school
                },
                component: isDirector ? <AlumniContribution filterByAcademicYear={true} academicYear={academicYear} /> : <AdminMasterTable model="AlumniContribution" customParams={{ model: "AlumniContribution", module: "Admin", filter: { Academic_Year: academicYear } }} heading='Alumni Contribution' serviceName="director" proof="Upload_Proof" />,
            },
        ],
        "criterion-6": [
            // todo 6.1
            {
                id: "6.1.1",
                title: "6.1.1 - The institution has a clearly stated vision and mission which are reflected in its academic and administrative governance",
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '6.1.1', userType: 'director', school
                },
                component: <AQARTextMatter academicYear={academicYear} isAdmin={!isDirector} school={school} matterType='6.1.1' userType='director' />

            },
            {
                id: "6.1.2",
                title: "6.1.2 - The effective leadership is reflected in various institutional practices such as decentralization and participative management",
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '6.1.2', userType: 'director', school
                },
                component: <AQARTextMatter academicYear={academicYear} isAdmin={!isDirector} school={school} matterType='6.1.2' userType='director' />

            },
            {
                id: "6.2.1",
                title: "6.2.1 - The institutional Strategic plan is effectively deployed",
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '6.2.1', userType: 'director', school
                },
                component: <AQARTextMatter academicYear={academicYear} isAdmin={!isDirector} school={school} matterType='6.2.1' userType='director' />

            },
            {
                id: "6.2.2",
                title: "6.2.2 - The functioning of the institutional bodies is effective and efficient as visible from policies, administrative setup, appointment and service rules, procedures, etc",
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '6.2.2', userType: 'director', school
                },
                component: <AQARTextMatter academicYear={academicYear} isAdmin={!isDirector} school={school} matterType='6.2.2' userType='director' />

            },
            // todo 6.2
            // ? table title - 6.2.3 - Institution Implements e-governance in its areas of operations
            // todo 6.3
            {
                id: "6.3.1",
                title: "6.3.1 - The institution has a performance appraisal system, promotional avenues and effective welfare measures for teaching and non-teaching staff",
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '6.3.1', userType: 'director', school
                },
                component: <AQARTextMatter academicYear={academicYear} isAdmin={!isDirector} school={school} matterType='6.3.1' userType='director' />
            },
            {
                id: "6.3.2",
                title: '6.3.2 - Total number of teachers provided with financial support to attend conferences / workshops and towards membership fee of professional bodies during the year',
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '6.3.2', userType: 'faculty', school
                },
                component: <AdminMasterTable model="FinancialSupport" academicYear={academicYear} school={school} heading='Collaborations' serviceName="faculty" proof="proof" />,
            },
            {
                id: "6.3.3",
                title: '6.3.3 - Number of professional development / administrative training Programmes organized by the institution for teaching and non-teaching staff during the year',
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '6.3.3', userType: 'director', school
                },
                component: isDirector ?
                    <TrainingProgramsOrganized filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="TrainingProgramsOrganized" customParams={{ model: "TrainingProgramsOrganized", module: "Admin", filter: { Year: academicYear } }} heading='Professional Development / Administrative Training Programs Organized' serviceName="director" proof="Upload_Proof" />,
            },
            {
                id: "6.3.4",
                title: '6.3.4 - Teachers undergoing online/ face-to-face  Faculty Development Programmes (FDP)during  the year',
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '6.3.4', userType: 'faculty', school
                },
                component: <AdminMasterTable model="Online" academicYear={academicYear} school={school} heading='Orientation / Refresher Course (FDP)' serviceName="faculty" proof="proof" />
            },
            // todo 6.4
            {
                id: "6.4.1",
                title: "6.4.1 - Institutional strategies for mobilisation of funds and the optimal utilisation of resources",
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '6.4.1', userType: 'director', school
                },
                component: <AQARTextMatter academicYear={academicYear} isAdmin={!isDirector} school={school} matterType='6.4.1' userType='director' />
            },
            // ? !!!!! 6.4.2 - Funds / Grants received from government bodies during the year for development and maintenance of infrastructure (not covered under Criteria III and V) (INR in Lakhs)
            // ? !!!!! 6.4.3 - Funds / Grants received from non-government bodies, individuals,philanthropists during the year for development and maintenance of infrastructure (not covered under Criteria III and V)(INR in Lakhs)
            {
                id: "6.4.4",
                title: "6.4.4 - Institution conducts internal and external financial audits regularly",
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '6.4.4', userType: 'director', school
                },
                component: <AQARTextMatter academicYear={academicYear} isAdmin={!isDirector} school={school} matterType='6.4.4' userType='director' />
            },
            // todo 6.5
            {
                id: "6.5.1",
                title: "6.5.1 - Internal Quality Assurance Cell (IQAC) has contributed significantly for institutionalizing the quality assurance strategies and processes by constantly reviewing the teaching learning process, structures & methodologies of operations and learning outcomes at periodic intervals",
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '6.5.1', userType: 'director', school
                },
                component: <AQARTextMatter academicYear={academicYear} isAdmin={!isDirector} school={school} matterType='6.5.1' userType='director' />
            },
            // ? !!!!! 6.5.2 - Institution has adopted the following for Quality assurance  1) Academic Administrative Audit (AAA) and follow up action taken 2) Confernces, Seminars, Workshops on quality conducted 3) Collaborative quality initiatives with other institution(s) 4) Orientation programme on quality issues for teachers and studens 5) Participation in NIRF 6) Any other quality audit recognized by state, national or international agencies (ISO Certification, NBA)

            {
                id: "6.5.3",
                title: "6.5.3 - Incremental improvements made for the preceding during the year with regard to quality (in case of first cycle) Post accreditation quality initiatives(second and subsequent cycles)",
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '6.5.3', userType: 'director', school
                },
                component: <AQARTextMatter academicYear={academicYear} isAdmin={!isDirector} school={school} matterType='6.5.3' userType='director' />
            },

        ],
        "criterion-7": [
            // todo 7.1
            {
                id: "7.1.1",
                title: "7.1.1 - Measures initiated by the Institution for the promotion of gender equity during the year",
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '7.1.1', userType: 'director', school
                },
                component: <AQARTextMatter academicYear={academicYear} isAdmin={!isDirector} school={school} matterType='7.1.1' userType='director' />
            },
            // ? ????? title - 7.1.2 - The Institution has facilities for alternate sources of energy and energy conservation 1) Solar energy 2) Biogas plant 3) Wheeling to the Grid   4) Sensor-based energy conservation 5) Use of LED bulbs/ power-efficient equipment 

            {
                id: "7.1.3",
                title: "7.1.3 - Describe the facilities in the Institution for the management of the following types of degradable and non-degradable waste (within 200 words) 1) Solid waste management 2) Liquid waste management 3) Biomedical waste management 4) E-waste management 5)  Waste recycling system 6) Hazardous chemicals and radioactive waste management",
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '7.1.3', userType: 'director', school
                },
                component: <AQARTextMatter academicYear={academicYear} isAdmin={!isDirector} school={school} matterType='7.1.3' userType='director' />
            },


            // ? ????? title - 7.1.4 - Water conservation facilities available in the Institution: 1) Rain water harvesting 2) Bore well /Open well recharge 3) Construction of tanks and bunds 4) Waste water recycling 5) Maintenance of water bodies and distribution system in the campus
            // ? ????? title - 7.1.5 - Green campus initiatives include
            // ? ????? title - 7.1.6 - Quality audits on environment and energy are regularly undertaken by the institution
            // ? ????? title - 7.1.7 - The Institution has a disabled-friendly and barrier-free environment 1) Ramps/lifts for easy access to classrooms and centres. 2) Disabled-friendly washrooms 3) Signage including tactile path lights, display boards and signposts 4) Assistive technology and facilities for persons with disabilities: accessible website, screen-reading software,mechanized equipment, etc. 5) Provision for enquiry and information: Human assistance, reader, scribe, soft copies of reading materials, screen reading, etc.

            {
                id: "7.1.8",
                title: "7.1.8 - Describe the Institutional efforts/initiatives in providing an inclusive environment i.e. tolerance and harmony towards cultural, regional, linguistic, communal, socio-economic and other diversities",
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '7.1.8', userType: 'director', school
                },
                component: <AQARTextMatter academicYear={academicYear} isAdmin={!isDirector} school={school} matterType='7.1.8' userType='director' />
            },
            {
                id: "7.1.9",
                title: "7.1.9 - Sensitization of students and employees of the institution to constitutional obligations: values, rights, duties and responsibilities of citizens",
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '7.1.9', userType: 'director', school
                },
                component: <AQARTextMatter academicYear={academicYear} isAdmin={!isDirector} school={school} matterType='7.1.9' userType='director' />
            },

            // ? ????? title - 7.1.10 - The Institution has a prescribed code of conduct for students, teachers, administrators and other staff and conducts periodic programmes in this regard. 1) The Code of Conduct is displayed on the website 2) There is a committee to monitor adherence to the Code of Conduct 3) Institution organizes professional ethics programmes for students, teachers, administrators and other staff 4) Annual awareness programmes on Code of Conduct are organized

            {
                id: "7.1.1",
                title: "7.1.1 - Institution celebrates / organizes national and international commemorative days, events and festivals",
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '7.1.1', userType: 'director', school
                },
                component: <AQARTextMatter academicYear={academicYear} isAdmin={!isDirector} school={school} matterType='7.1.1' userType='director' />
            },

            {
                id: "7.2.1",
                title: "7.2.1 - Describe one best practice successfully implemented by the Institution as per NAAC format provided in the Manual",
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '7.2.1', userType: 'director', school
                },
                component: <AQARTextMatter academicYear={academicYear} isAdmin={!isDirector} school={school} matterType='7.2.1' userType='director' />
            },

            {
                id: "7.3.1",
                title: "7.3.1 - Highlight the performance of the institution in an area distinct to its priority and thrust",
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '7.3.1', userType: 'director', school
                },
                component: <AQARTextMatter academicYear={academicYear} isAdmin={!isDirector} school={school} matterType='7.3.1' userType='director' />
            },
            {
                id: "7.3.2",
                title: "7.3.2 - Plan of action for the next academic year",
                hasSupportingDocument: true,
                isAdmin: !isDirector,
                proofData: {
                    academicYear, proofType: '7.3.2', userType: 'director', school
                },
                component: <AQARTextMatter academicYear={academicYear} isAdmin={!isDirector} school={school} matterType='7.3.2' userType='director' />
            },


        ],
    }
}


export default AQARTablesObject