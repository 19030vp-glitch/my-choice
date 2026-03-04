import React, { useEffect, useState } from 'react'
import { SaveButton } from '../AuditHome'
import AuditTable from '../components/AuditTable';
import Text from '../inputs/Text';
import Note from '../components/Note';
import TableData from '../components/TableData';
import Wrapper from '../components/Wrapper';
import NumberToTextField from '../components/NumberToTextField';
import { useSelector } from 'react-redux';
import useDirectorAuth from '../../../../../hooks/useDirectorAuth'
import { CircularProgress, IconButton, Pagination, PaginationItem } from '@mui/material';
import RichText from '../inputs/RichText'
import { saveAAAData } from '../components/audit-services';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import FileViewer from '../../../../../components/FileViewer';
import toast from 'react-hot-toast';
import FloatButtons from '../components/FloatButtons';
import siteLinks from '../../../../../components/siteLinks';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import submitReportForm from '../../../../../js/submitReportForm';

const InformationHome = ({ tabName, setTabName, handleNext, setAutoSaveLoader, serverAuditData, autoSaveLoader, serverAuditError, allYearAAAData }) => {

    const auditYear = useSelector(state => state.academicAudit.auditYear)
    const directorUser = useSelector(state => state.user.directorUser)
    const navigate = useNavigate()


    // all the states will lie here.
    const [yearOfEstablishment, setYearOfEstablishment] = useState(null)

    const [ugPrograms, setUgPrograms] = useState({ input: 0, ProgramName: {}, Intake: {} })

    const [pgPrograms, setPgPrograms] = useState({ input: 0, ProgramName: {}, Intake: {} })

    const [mphilProgramsSimple, setMphilProgramsSimple] = useState({ input: 0, ProgramName: {}, Intake: {} })

    const [phdProgramsSimple, setPhdProgramsSimple] = useState({ input: 0, ProgramName: {}, Intake: {} })

    const [diplomaPrograms, setDiplomaPrograms] = useState({ input: 0, ProgramName: {}, Intake: {} })

    const [programDuringYear, setProgramDuringYear] = useState({ input: 0, ProgramName: {}, Intake: {} })

    const [civil, setCivil] = useState({ mpsc: 0, net: 0, gate: 0, other: 0 })

    const [mphilPhd, setMphilPhd] = useState({ phd: { female: 0, male: 0 }, mphil: { female: 0, male: 0 } })

    const [placementRecord, setPlacementRecord] = useState({ ug: 0, pg: 0, studentsPlaced: 0 })

    const [facultyAwardsDegree, setFacultyAwardsDegree] = useState(
        { mphil: 0, phd: 0, dsc: 0, dlit: 0 })


    const [appointmentGovtPost, setAppointmentGovtPost] = useState({ input: 0, Name: {}, Designation: {}, Qualification: {}, Experience: {}, appointmentNature: {} })

    const [appointmentUniversityFund, setAppointmentUniversityFund] = useState({ input: 0, Name: {}, Designation: {}, Qualification: {}, Experience: {}, appointmentNature: {} })

    const [teachingPosts, setTeachingPosts] = useState({ seniorProf: { sanctioned: 0, filled: 0, cas: 0 }, prof: { sanctioned: 0, filled: 0, cas: 0 }, associateProf: { sanctioned: 0, filled: 0, cas: 0 }, assistantProf: { sanctioned: 0, filled: 0, cas: 0 }, })


    const [listOfVisitingTeachers, setListOfVisitingTeachers] = useState({ input: 0, TeacherName: {}, Designation: {}, Gender: {}, Qualification: {}, InstituteAddress: {} })

    const [academicSupportStaff, setAcademicSupportStaff] = useState({ input: 0, PostName: {}, SanctionedPost: {}, Filled: {}, Vacant: {} })

    const [researchFundingAgency, setResearchFundingAgency] = useState({ input: 0, name: {}, programTitle: {}, fundingName: {}, isGov: {}, awardYear: {}, projectDuration: {}, providedFunds: {} })

    const [facilities, setFacilities] = useState({ input: 0, Facilities: {} })

    const [publication, setPublication] = useState({
        input: 0, name: {}, paperTitle: {}, journalName: {}, publicationYear: {}, issnNumber: {}, year: {}
    })

    const [patents, setPatents] = useState({ input: 0, name: {}, patentNumber: {}, patentTitle: {}, awardYear: {}, year: {} })

    const [consultancy, setConsultancy] = useState({ input: 0, name: {}, cProjectName: {}, cAgency: {}, cYear: {}, revenue: {}, year: {} })

    const [conference, setConference] = useState({ input: 0, name: {}, programTitle: {}, fundedBy: {}, isNational: {}, noOfParticipants: {}, year: {} })

    const [invitedTalks, setInvitedTalks] = useState({ input: 0, name: {}, lectureTitle: {}, seminarTitle: {}, isNational: {}, organizedBy: {}, year: {} })

    const [onlineFDP, setOnlineFDP] = useState({ input: 0, name: {}, programTitle: {}, nameOfAttendedTeacher: {}, durationFrom: {}, durationTo: {} })

    const [financialSupport, setFinancialSupport] = useState({ input: 0, name: {}, nameOfConference: {}, feeprovider: {}, amountOfSupport: {}, pan: {} })

    const [academicActivityParticipation, setAcademicActivityParticipation] = useState({ input: 0, teacherName: {}, committeeName: {}, position: {}, level: {} })

    const [facultyAwards, setFacultyAwards] = useState({ input: 0, name: {}, awardYear: {}, pan: {}, designation: {}, awardName: {}, agencyName: {}, incentive: {}, year: {} })

    const [facultyJrfSrf, setFacultyJrfSrf] = useState({ input: 0, name: {}, researchName: {}, enrolmentYear: {}, fellowshipDuration: {}, fellowshipType: {}, grantingAgency: {}, qualifyingExam: {}, year: {} })

    const [ethicsAdded, setEthicsAdded] = useState({ input: 0, programName: {}, courseCode: {}, courseName: {}, courseDescription: {} })

    const [programOutcomes, setProgramOutcomes] = useState({ input: 0, programName: {}, peo: {}, po: {}, pso: {} })

    const [courseOutcomes, setCourseOutcomes] = useState({ input: 0, proof: {} })

    const [syllabusFeedback, setSyllabusFeedback] = useState({
        teacher: { checked: false, input: null, },
        expert: { checked: false, input: null, },
        industry: { checked: false, input: null, },
        alumni: { checked: false, input: null, },
        uploadedFiles: {
            teacher: null,
            expert: null,
            industry: null,
            alumni: null
        },
    })

    // submit syllabus feedback
    const submitFeedback = (data) => {
        setSyllabusFeedback({
            teacher: { checked: false, input: null, },
            expert: { checked: false, input: null, },
            industry: { checked: false, input: null, },
            alumni: { checked: false, input: null, },
            uploadedFiles: {
                teacher: data.teacher ? data.teacher : syllabusFeedback.uploadedFiles.teacher,
                expert: data.expert ? data.expert : syllabusFeedback.uploadedFiles.expert,
                industry: data.industry ? data.industry : syllabusFeedback.uploadedFiles.industry,
                alumni: data.alumni ? data.alumni : syllabusFeedback.uploadedFiles.alumni
            }
        })
    }




    // rich text area states start
    const [schoolParticipationDetails, setSchoolParticipationDetails] = useState({ content: '' })


    const [schoolInfra, setschoolInfra] = useState({
        content: '', note: `
    Central Library Books and Journals, relevant to School, Departmental Library (books, journals etc.), Computers and Internet facilities for staff, Total number of class rooms, Class rooms with ICT facility, Students' laboratory, Research laboratories, Seminar Hall, Smart class room, Any other facility LCDs, 
    ` })

    const [alumniList, setAlumniList] = useState({ input: 0, Name: {}, Position: {} })


    const [alumniActivities, setAlumniActivities] = useState({ date: {}, type: {}, number: {}, contri: {}, briefing: {}, proof: {} })

    const [extentionActivities, setExtentionActivities] = useState({ input: 0, activityName: {}, unit: {}, schemeName: {}, year: {}, students: {} })


    const [studentMonitor, setStudentMonitor] = useState({ content: '' })

    const [greenCampus, setGreenCampus] = useState({ content: '' })

    const [commemorative, setCommemorative] = useState({ content: '' })

    const [studentEnrichment, setStudentEnrichment] = useState({ content: '' })

    const [programObjectives, setProgramObjectives] = useState({ content: '' })

    const [schoolFeatures, setSchoolFeatures] = useState({ content: '' })


    const [schoolStrength, setSchoolStrength] = useState({ content: '' })

    const [schoolWeakness, setSchoolWeakness] = useState({ content: '' })

    const [schoolOppos, setSchoolOppos] = useState({ content: '' })

    const [schoolChallenges, setSchoolChallenges] = useState({ content: '' })

    const [futurePlans, setFuturePlans] = useState({
        content: '', note: `Mention these topics : 1. Long term plans, 
    2. Short term plans` })



    // rich text area states end


    const [yearWiseUGPG, setYearWiseUGPG] = useState({ input: 0, programName: {}, degreeType: {}, year: {}, appeared: {}, passed: {}, percentage: {} })

    const [mphilPrograms, setMphilPrograms] = useState({ applications: 0, intake: 0, admissions: 0, male: 0, female: 0, others: 0, })

    const [phdPrograms, setPhdPrograms] = useState({ applications: 0, intake: 0, admissions: 0, male: 0, female: 0, others: 0, })


    const [studentRatio, setStudentRatio] = useState({ input: 0, programName: {}, ratio: {} })


    const [teacherRatio, setTeacherRatio] = useState({ input: 0, programName: {}, ratio: {} })

    const [ugcSap, setUgcSap] = useState({ input: 0, schemename: {}, name: {}, agency: {}, agencyType: {}, department: {}, yearOfAward: {}, funds: {}, duration: {} })

    const [awardsAndPrizes, setAwardsAndPrizes] = useState({ input: 0, innovationTitle: {}, awardName: {}, agency: {}, contact: {}, awardYear: {}, category: {} })

    const [schoolConference, setSchoolConference] = useState({ input: 0, year: {}, fromDate: {}, toDate: {}, programName: {}, staffType: {}, numberOfParticipants: {} })

    const [schoolSeminarOrganized, setSchoolSeminarOrganized] = useState({ input: 0, year: {}, fromDate: {}, toDate: {}, programName: {}, level: {}, numberOfParticipants: {} })

    const [syllabusRevision, setSyllabusRevision] = useState({ input: 0, programCode: {}, programName: {}, year: {}, yearOfIntroduction: {}, statusOfImplementation: {}, yearOfImplimentation: {}, yearOfRevision: {}, percentage: {} })

    const [employability, setEmployability] = useState({
        input: 0, courseCode: {}, courseName: {}, yearOfIntroduction: {},
        activity: {}, year: {}
    })

    const [valueAddedCourse, setValueAddedCourse] = useState({ input: 0, courseName: {}, courseCode: {}, year: {}, yearOfOffering: {}, courseDuration: {}, frequencyOfOffering: {}, studentsEnrolled: {}, completedCourse: {} })

    const [projectAndInternships, setProjectAndInternships] = useState({ input: 0, programCode: {}, programName: {}, studentName: {}, year: {} })

    const [demandRatio, setDemandRatio] = useState({
        input: 0, programCode: {}, programName: {}, year: {},
        programType: {},
        numberOfSeatsAvailable: {},
        numberOfApplications: {}, numberOfStudents: {}
    })

    const [qualifiedExams, setQualifiedExams] = useState({
        input: 0, rollno: {}, studentName: {}, examName: {},
    })

    const [sabMember, setSabMember] = useState({ input: 0, MemberName: {}, MemberPosition: {} })

    const [meetingDetails, setMeetingDetails] = useState({ input: 0, MeetingDate: {}, MeetingBriefing: {}, proof: {}, })

    const [progression, setProgression] = useState({ input: 0, studentEnrolling: {}, program: {}, institute: {}, programName: {} })

    const [placement, setPlacement] = useState({ input: 0, name: {}, program: {}, employer: {}, contact: {}, package: {}, placementYear: {}, })

    const [alumniContribution, setAlumniContribution] = useState({ input: 0, name: {}, program: {}, amount: {} })



    const [shouldSave, setShouldSave] = useState(false)



    //compilation of all states
    const initialState = {
        auditYear,
        AAAData: {
            facultyTables: {
                researchFundingAgency,
                publication,
                patents,
                consultancy,
                conference,
                invitedTalks,
                facultyAwards,
                facultyJrfSrf,
                onlineFDP,
                financialSupport
            },
            directorTables: {
                ugcSap,
                awardsAndPrizes,
                schoolConference,
                schoolSeminarOrganized,
                syllabusRevision,
                employability,
                valueAddedCourse,
                projectAndInternships,
                demandRatio,
                qualifiedExams,
                extentionActivities,
                progression,
                placement,
                alumniContribution
            },
            schoolInfoTables: {
                ugPrograms,
                pgPrograms,
                mphilProgramsSimple,
                phdProgramsSimple,
                diplomaPrograms,
                programDuringYear,
                listOfVisitingTeachers,
                academicSupportStaff,
                facilities,
                ethicsAdded,
                programOutcomes,
                courseOutcomes,
                yearWiseUGPG,
                studentRatio,
                teacherRatio,
                appointmentGovtPost,
                appointmentUniversityFund,
                sabMember,
                alumniList,
                alumniActivities,
                academicActivityParticipation
            },
            cellAsInputTables: {
                teachingPosts,
                mphilPrograms,
                phdPrograms,
                mphilPhd,
                civil,
                facultyAwardsDegree,
            },
            richTextTables: {
                schoolParticipationDetails,
                schoolInfra,
                studentMonitor,
                greenCampus,
                commemorative,
                studentEnrichment,
                programObjectives,
                schoolFeatures,
                schoolStrength,
                schoolWeakness,
                schoolOppos,
                schoolChallenges,
                futurePlans
            },
            fileFeedback: {
                syllabusFeedback,
                yearOfEstablishment,
                meetingDetails
            }

        }
    }

    const [AAAData, setAAAData] = useState(initialState)



    useEffect(() => {

        setYearOfEstablishment(serverAuditData && serverAuditData.auditYear === auditYear ?
            serverAuditData.AAAData.fileFeedback.yearOfEstablishment !== undefined ? serverAuditData.AAAData.fileFeedback.yearOfEstablishment : null : null)


        setUgPrograms(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.schoolInfoTables.ugPrograms !== undefined ? serverAuditData.AAAData.schoolInfoTables.ugPrograms : { input: 0, ProgramName: {}, Intake: {} } : { input: 0, ProgramName: {}, Intake: {} })

        setPgPrograms(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.schoolInfoTables.pgPrograms !== undefined ? serverAuditData.AAAData.schoolInfoTables.pgPrograms : { input: 0, ProgramName: {}, Intake: {} } : { input: 0, ProgramName: {}, Intake: {} })

        setMphilProgramsSimple(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.schoolInfoTables.mphilProgramsSimple !== undefined ? serverAuditData.AAAData.schoolInfoTables.mphilProgramsSimple : { input: 0, ProgramName: {}, Intake: {} } : { input: 0, ProgramName: {}, Intake: {} })

        setPhdProgramsSimple(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.schoolInfoTables.phdProgramsSimple !== undefined ? serverAuditData.AAAData.schoolInfoTables.phdProgramsSimple : { input: 0, ProgramName: {}, Intake: {} } : { input: 0, ProgramName: {}, Intake: {} })

        setDiplomaPrograms(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.schoolInfoTables.diplomaPrograms !== undefined ? serverAuditData.AAAData.schoolInfoTables.diplomaPrograms : { input: 0, ProgramName: {}, Intake: {} } : { input: 0, ProgramName: {}, Intake: {} })

        setProgramDuringYear(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.schoolInfoTables.programDuringYear !== undefined ? serverAuditData.AAAData.schoolInfoTables.programDuringYear : { input: 0, ProgramName: {}, Intake: {} } : { input: 0, ProgramName: {}, Intake: {} })

        setCivil(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.cellAsInputTables.civil !== undefined ? serverAuditData.AAAData.cellAsInputTables.civil : { mpsc: 0, net: 0, gate: 0, other: 0 } : { mpsc: 0, net: 0, gate: 0, other: 0 })


        setMphilPhd(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.cellAsInputTables.mphilPhd !== undefined ? serverAuditData.AAAData.cellAsInputTables.mphilPhd : { phd: { female: 0, male: 0 }, mphil: { female: 0, male: 0 } } : { phd: { female: 0, male: 0 }, mphil: { female: 0, male: 0 } })



        setFacultyAwardsDegree(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.cellAsInputTables.facultyAwardsDegree !== undefined ? serverAuditData.AAAData.cellAsInputTables.facultyAwardsDegree : { mphil: 0, phd: 0, dsc: 0, dlit: 0 } : { mphil: 0, phd: 0, dsc: 0, dlit: 0 })


        setAppointmentGovtPost(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.schoolInfoTables.appointmentGovtPost !== undefined ? serverAuditData.AAAData.schoolInfoTables.appointmentGovtPost : { input: 0, Name: {}, Designation: {}, Qualification: {}, Experience: {}, appointmentNature: {} } : { input: 0, Name: {}, Designation: {}, Qualification: {}, Experience: {}, appointmentNature: {} })

        setAppointmentUniversityFund(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.schoolInfoTables.appointmentUniversityFund !== undefined ? serverAuditData.AAAData.schoolInfoTables.appointmentUniversityFund : { input: 0, Name: {}, Designation: {}, Qualification: {}, Experience: {}, appointmentNature: {} } : { input: 0, Name: {}, Designation: {}, Qualification: {}, Experience: {}, appointmentNature: {} })

        setTeachingPosts(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.cellAsInputTables.teachingPosts !== undefined ? serverAuditData.AAAData.cellAsInputTables.teachingPosts : { seniorProf: { sanctioned: 0, filled: 0, cas: 0 }, prof: { sanctioned: 0, filled: 0, cas: 0 }, associateProf: { sanctioned: 0, filled: 0, cas: 0 }, assistantProf: { sanctioned: 0, filled: 0, cas: 0 }, } : { seniorProf: { sanctioned: 0, filled: 0, cas: 0 }, prof: { sanctioned: 0, filled: 0, cas: 0 }, associateProf: { sanctioned: 0, filled: 0, cas: 0 }, assistantProf: { sanctioned: 0, filled: 0, cas: 0 }, })


        setListOfVisitingTeachers(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.schoolInfoTables.listOfVisitingTeachers !== undefined ? serverAuditData.AAAData.schoolInfoTables.listOfVisitingTeachers : { input: 0, TeacherName: {}, Designation: {}, Gender: {}, Qualification: {}, InstituteAddress: {} } : { input: 0, TeacherName: {}, Designation: {}, Gender: {}, Qualification: {}, InstituteAddress: {} })

        setAcademicSupportStaff(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.schoolInfoTables.academicSupportStaff !== undefined ? serverAuditData.AAAData.schoolInfoTables.academicSupportStaff : { input: 0, PostName: {}, SanctionedPost: {}, Filled: {}, Vacant: {} } : { input: 0, PostName: {}, SanctionedPost: {}, Filled: {}, Vacant: {} })

        setResearchFundingAgency(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.facultyTables.researchFundingAgency !== undefined ? serverAuditData.AAAData.facultyTables.researchFundingAgency : { input: 0, name: {}, programTitle: {}, fundingName: {}, isGov: {}, awardYear: {}, projectDuration: {}, providedFunds: {} } : { input: 0, name: {}, programTitle: {}, fundingName: {}, isGov: {}, awardYear: {}, projectDuration: {}, providedFunds: {} })

        setFacilities(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.schoolInfoTables.facilities !== undefined ? serverAuditData.AAAData.schoolInfoTables.facilities : { input: 0, Facilities: {} } : { input: 0, Facilities: {} })



        setPublication(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.facultyTables.publication !== undefined ? serverAuditData.AAAData.facultyTables.publication : {
            input: 0, name: {}, paperTitle: {}, journalName: {}, publicationYear: {}, issnNumber: {}, year: {}
        } : {
            input: 0, name: {}, paperTitle: {}, journalName: {}, publicationYear: {}, issnNumber: {}, year: {}
        })

        setPatents(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.facultyTables.patents !== undefined ? serverAuditData.AAAData.facultyTables.patents : { input: 0, name: {}, patentNumber: {}, patentTitle: {}, awardYear: {}, year: {} } : { input: 0, name: {}, patentNumber: {}, patentTitle: {}, awardYear: {}, year: {} })

        setConsultancy(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.facultyTables.consultancy !== undefined ? serverAuditData.AAAData.facultyTables.consultancy : { input: 0, name: {}, cProjectName: {}, cAgency: {}, cYear: {}, revenue: {}, year: {} } : { input: 0, name: {}, cProjectName: {}, cAgency: {}, cYear: {}, revenue: {}, year: {} })

        setConference(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.facultyTables.conference !== undefined ? serverAuditData.AAAData.facultyTables.conference : { input: 0, name: {}, programTitle: {}, fundedBy: {}, isNational: {}, noOfParticipants: {}, year: {} } : { input: 0, name: {}, programTitle: {}, fundedBy: {}, isNational: {}, noOfParticipants: {}, year: {} })

        setInvitedTalks(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.facultyTables.invitedTalks !== undefined ? serverAuditData.AAAData.facultyTables.invitedTalks : { input: 0, name: {}, lectureTitle: {}, seminarTitle: {}, isNational: {}, organizedBy: {}, year: {} } : { input: 0, name: {}, lectureTitle: {}, seminarTitle: {}, isNational: {}, organizedBy: {}, year: {} })

        setOnlineFDP(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.facultyTables.onlineFDP !== undefined ? serverAuditData.AAAData.facultyTables.onlineFDP : { input: 0, name: {}, programTitle: {}, nameOfAttendedTeacher: {}, durationFrom: {}, durationTo: {} } : { input: 0, name: {}, programTitle: {}, nameOfAttendedTeacher: {}, durationFrom: {}, durationTo: {} })

        setFinancialSupport(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.facultyTables.financialSupport !== undefined ? serverAuditData.AAAData.facultyTables.financialSupport : { input: 0, name: {}, nameOfConference: {}, feeprovider: {}, amountOfSupport: {}, pan: {} } : { input: 0, name: {}, nameOfConference: {}, feeprovider: {}, amountOfSupport: {}, pan: {} })


        setAcademicActivityParticipation(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.schoolInfoTables.academicActivityParticipation !== undefined ? serverAuditData.AAAData.schoolInfoTables.academicActivityParticipation : { input: 0, teacherName: {}, committeeName: {}, position: {}, level: {} } : { input: 0, teacherName: {}, committeeName: {}, position: {}, level: {} })

        setFacultyAwards(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.facultyTables.facultyAwards !== undefined ? serverAuditData.AAAData.facultyTables.facultyAwards : { input: 0, name: {}, awardYear: {}, pan: {}, designation: {}, awardName: {}, agencyName: {}, incentive: {}, year: {} } : { input: 0, name: {}, awardYear: {}, pan: {}, designation: {}, awardName: {}, agencyName: {}, incentive: {}, year: {} })

        setFacultyJrfSrf(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.facultyTables.facultyJrfSrf !== undefined ? serverAuditData.AAAData.facultyTables.facultyJrfSrf : { input: 0, name: {}, researchName: {}, enrolmentYear: {}, fellowshipDuration: {}, fellowshipType: {}, grantingAgency: {}, qualifyingExam: {}, year: {} } : { input: 0, name: {}, researchName: {}, enrolmentYear: {}, fellowshipDuration: {}, fellowshipType: {}, grantingAgency: {}, qualifyingExam: {}, year: {} })

        setEthicsAdded(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.schoolInfoTables.ethicsAdded !== undefined ? serverAuditData.AAAData.schoolInfoTables.ethicsAdded : { input: 0, programName: {}, courseCode: {}, courseName: {}, courseDescription: {} } : { input: 0, programName: {}, courseCode: {}, courseName: {}, courseDescription: {} })

        setProgramOutcomes(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.schoolInfoTables.programOutcomes !== undefined ? serverAuditData.AAAData.schoolInfoTables.programOutcomes : { input: 0, programName: {}, peo: {}, po: {}, pso: {} } : { input: 0, programName: {}, peo: {}, po: {}, pso: {} })

        setCourseOutcomes(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.schoolInfoTables.courseOutcomes !== undefined ? serverAuditData.AAAData.schoolInfoTables.courseOutcomes : { proof: {} } : { proof: {} })


        setSyllabusFeedback(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.fileFeedback.syllabusFeedback !== undefined ? serverAuditData.AAAData.fileFeedback.syllabusFeedback : {
            teacher: { checked: false, input: null },
            expert: { checked: false, input: null },
            industry: { checked: false, input: null },
            alumni: { checked: false, input: null },
            uploadedFiles: {
                teacher: null,
                expert: null,
                industry: null,
                alumni: null
            },
        } : {
            teacher: { checked: false, input: null },
            expert: { checked: false, input: null },
            industry: { checked: false, input: null },
            alumni: { checked: false, input: null },
            uploadedFiles: {
                teacher: null,
                expert: null,
                industry: null,
                alumni: null
            },
        })



        setFacilities(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.schoolInfoTables.facilities !== undefined ? serverAuditData.AAAData.schoolInfoTables.facilities : { input: 0, Facilities: {} } : { input: 0, Facilities: {} })

        setSchoolParticipationDetails(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.richTextTables.schoolParticipationDetails !== undefined ? serverAuditData.AAAData.richTextTables.schoolParticipationDetails : { content: '' } : { content: '' })


        setschoolInfra(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.richTextTables.schoolInfra !== undefined ? serverAuditData.AAAData.richTextTables.schoolInfra : {
            content: '', note: `
            Central Library Books and Journals, relevant to School, Departmental Library (books, journals etc.), Computers and Internet facilities for staff, Total number of class rooms, Class rooms with ICT facility, Students' laboratory, Research laboratories, Seminar Hall, Smart class room, Any other facility LCDs, 
            ` } : {
            content: '', note: `
                Central Library Books and Journals, relevant to School, Departmental Library (books, journals etc.), Computers and Internet facilities for staff, Total number of class rooms, Class rooms with ICT facility, Students' laboratory, Research laboratories, Seminar Hall, Smart class room, Any other facility LCDs, 
                ` })



        setAlumniList(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.schoolInfoTables.alumniList !== undefined ? serverAuditData.AAAData.schoolInfoTables.alumniList : { input: 0, Name: {}, Position: {} } : { input: 0, Name: {}, Position: {} })

        setAlumniActivities(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.schoolInfoTables.alumniActivities !== undefined ? serverAuditData.AAAData.schoolInfoTables.alumniActivities : { date: {}, type: {}, number: {}, contri: {}, briefing: {}, proof: {} } : { date: {}, type: {}, number: {}, contri: {}, briefing: {}, proof: {} })


        setStudentMonitor(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.richTextTables.studentMonitor !== undefined ? serverAuditData.AAAData.richTextTables.studentMonitor : { content: '' } : { content: '' })

        setGreenCampus(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.richTextTables.greenCampus !== undefined ? serverAuditData.AAAData.richTextTables.greenCampus : { content: '' } : { content: '' })

        setCommemorative(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.richTextTables.commemorative !== undefined ? serverAuditData.AAAData.richTextTables.commemorative : { content: '' } : { content: '' })

        setStudentEnrichment(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.richTextTables.studentEnrichment !== undefined ? serverAuditData.AAAData.richTextTables.studentEnrichment : { content: '' } : { content: '' })

        setProgramObjectives(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.richTextTables.programObjectives !== undefined ? serverAuditData.AAAData.richTextTables.programObjectives : { content: '' } : { content: '' })

        setSchoolFeatures(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.richTextTables.schoolFeatures !== undefined ? serverAuditData.AAAData.richTextTables.schoolFeatures : { content: '' } : { content: '' })

        setSchoolStrength(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.richTextTables.schoolStrength !== undefined ? serverAuditData.AAAData.richTextTables.schoolStrength : { content: '', } : { content: '', })
        setSchoolWeakness(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.richTextTables.schoolWeakness !== undefined ? serverAuditData.AAAData.richTextTables.schoolWeakness : { content: '', } : { content: '', })
        setSchoolOppos(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.richTextTables.schoolOppos !== undefined ? serverAuditData.AAAData.richTextTables.schoolOppos : { content: '', } : { content: '', })
        setSchoolChallenges(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.richTextTables.schoolChallenges !== undefined ? serverAuditData.AAAData.richTextTables.schoolChallenges : { content: '', } : { content: '', })

        setFuturePlans(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.richTextTables.futurePlans !== undefined ? serverAuditData.AAAData.richTextTables.futurePlans : {
            content: '', note: `Mention these topics : 1. Long term plans, 
    2. Short term plans` } : {
            content: '', note: `Mention these topics : 1. Long term plans, 
2. Short term plans` })



        setYearWiseUGPG(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.schoolInfoTables.yearWiseUGPG !== undefined ? serverAuditData.AAAData.schoolInfoTables.yearWiseUGPG : { input: 0, programName: {}, degreeType: {}, year: {}, appeared: {}, passed: {}, percentage: {} } : { input: 0, programName: {}, degreeType: {}, year: {}, appeared: {}, passed: {}, percentage: {} })

        setMphilPrograms(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.cellAsInputTables.mphilPrograms !== undefined ? serverAuditData.AAAData.cellAsInputTables.mphilPrograms : { applications: 0, intake: 0, admissions: 0, male: 0, female: 0, others: 0, } : { applications: 0, intake: 0, admissions: 0, male: 0, female: 0, others: 0, })

        setPhdPrograms(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.cellAsInputTables.phdPrograms !== undefined ? serverAuditData.AAAData.cellAsInputTables.phdPrograms : { applications: 0, intake: 0, admissions: 0, male: 0, female: 0, others: 0, } : { applications: 0, intake: 0, admissions: 0, male: 0, female: 0, others: 0, })


        setStudentRatio(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.cellAsInputTables.studentRatio !== undefined ? serverAuditData.AAAData.cellAsInputTables.studentRatio : { input: 0, programName: {}, ratio: {} } : { input: 0, programName: {}, ratio: {} })


        setTeacherRatio(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.cellAsInputTables.teacherRatio !== undefined ? serverAuditData.AAAData.cellAsInputTables.teacherRatio : { input: 0, programName: {}, ratio: {} } : { input: 0, programName: {}, ratio: {} })

        setUgcSap(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.directorTables.ugcSap !== undefined ? serverAuditData.AAAData.directorTables.ugcSap : { input: 0, schemename: {}, name: {}, agency: {}, agencyType: {}, department: {}, yearOfAward: {}, funds: {}, duration: {} } : { input: 0, schemename: {}, name: {}, agency: {}, agencyType: {}, department: {}, yearOfAward: {}, funds: {}, duration: {} })

        setAwardsAndPrizes(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.directorTables.awardsAndPrizes !== undefined ? serverAuditData.AAAData.directorTables.awardsAndPrizes : { input: 0, innovationTitle: {}, awardName: {}, agency: {}, contact: {}, awardYear: {}, category: {} } : { input: 0, innovationTitle: {}, awardName: {}, agency: {}, contact: {}, awardYear: {}, category: {} })

        setProgression(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.directorTables.progression !== undefined ? serverAuditData.AAAData.directorTables.progression : { input: 0, studentEnrolling: {}, program: {}, institute: {}, programName: {} } : { input: 0, studentEnrolling: {}, program: {}, institute: {}, programName: {} })

        setPlacement(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.directorTables.placement !== undefined ? serverAuditData.AAAData.directorTables.placement : { input: 0, name: {}, program: {}, employer: {}, contact: {}, package: {}, placementYear: {}, } : { input: 0, name: {}, program: {}, employer: {}, contact: {}, package: {}, placementYear: {}, })

        setAlumniContribution(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.directorTables.alumniContribution !== undefined ? serverAuditData.AAAData.directorTables.alumniContribution : { input: 0, name: {}, program: {}, amount: {} } : { input: 0, name: {}, program: {}, amount: {} })


        setExtentionActivities(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.directorTables.extentionActivities !== undefined ? serverAuditData.AAAData.directorTables.extentionActivities : { input: 0, activityName: {}, unit: {}, schemeName: {}, year: {}, students: {} } : { input: 0, activityName: {}, unit: {}, schemeName: {}, year: {}, students: {} })

        setSchoolConference(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.directorTables.schoolConference !== undefined ? serverAuditData.AAAData.directorTables.schoolConference : { input: 0, year: {}, fromDate: {}, toDate: {}, programName: {}, staffType: {}, numberOfParticipants: {} } : { input: 0, year: {}, fromDate: {}, toDate: {}, programName: {}, staffType: {}, numberOfParticipants: {} })

        setSchoolSeminarOrganized(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.directorTables.schoolSeminarOrganized !== undefined ? serverAuditData.AAAData.directorTables.schoolSeminarOrganized : { input: 0, year: {}, fromDate: {}, toDate: {}, programName: {}, level: {}, numberOfParticipants: {} } : { input: 0, year: {}, fromDate: {}, toDate: {}, programName: {}, level: {}, numberOfParticipants: {} })

        setSyllabusRevision(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.directorTables.syllabusRevision !== undefined ? serverAuditData.AAAData.directorTables.syllabusRevision : { input: 0, programCode: {}, programName: {}, year: {}, yearOfIntroduction: {}, statusOfImplementation: {}, yearOfImplimentation: {}, yearOfRevision: {}, percentage: {} } : { input: 0, programCode: {}, programName: {}, year: {}, yearOfIntroduction: {}, statusOfImplementation: {}, yearOfImplimentation: {}, yearOfRevision: {}, percentage: {} })

        setEmployability(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.directorTables.employability !== undefined ? serverAuditData.AAAData.directorTables.employability : {
            input: 0, courseCode: {}, courseName: {}, yearOfIntroduction: {},
            activity: {}, year: {}
        } : {
            input: 0, courseCode: {}, courseName: {}, yearOfIntroduction: {},
            activity: {}, year: {}
        })

        setValueAddedCourse(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.directorTables.valueAddedCourse !== undefined ? serverAuditData.AAAData.directorTables.valueAddedCourse : { input: 0, courseName: {}, courseCode: {}, year: {}, yearOfOffering: {}, courseDuration: {}, frequencyOfOffering: {}, studentsEnrolled: {}, completedCourse: {} } : { input: 0, courseName: {}, courseCode: {}, year: {}, yearOfOffering: {}, courseDuration: {}, frequencyOfOffering: {}, studentsEnrolled: {}, completedCourse: {} })

        setQualifiedExams(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.directorTables.qualifiedExams !== undefined ? serverAuditData.AAAData.directorTables.qualifiedExams : { input: 0, rollno: {}, studentName: {}, examName: {} } : { input: 0, rollno: {}, studentName: {}, examName: {} })

        setProjectAndInternships(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.directorTables.projectAndInternships !== undefined ? serverAuditData.AAAData.directorTables.projectAndInternships : { input: 0, programCode: {}, programName: {}, studentName: {}, year: {} } : { input: 0, programCode: {}, programName: {}, studentName: {}, year: {} })

        setDemandRatio(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.directorTables.demandRatio !== undefined ? serverAuditData.AAAData.directorTables.demandRatio : {
            input: 0, programCode: {}, programName: {}, year: {},
            programType: {},
            numberOfSeatsAvailable: {},
            numberOfApplications: {}, numberOfStudents: {}
        } : {
            input: 0, programCode: {}, programName: {}, year: {},
            programType: {},
            numberOfSeatsAvailable: {},
            numberOfApplications: {}, numberOfStudents: {}
        })

        setStudentRatio(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.schoolInfoTables.studentRatio !== undefined ? serverAuditData.AAAData.schoolInfoTables.studentRatio : { input: 0, programName: {}, ratio: {} } : { input: 0, programName: {}, ratio: {} })

        setTeacherRatio(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.schoolInfoTables.teacherRatio !== undefined ? serverAuditData.AAAData.schoolInfoTables.teacherRatio : { input: 0, programName: {}, ratio: {} } : { input: 0, programName: {}, ratio: {} })

        setSabMember(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.schoolInfoTables.sabMember !== undefined ? serverAuditData.AAAData.schoolInfoTables.sabMember : { input: 0, MemberName: {}, MemberPosition: {} } : { input: 0, MemberName: {}, MemberPosition: {} })

        setMeetingDetails(serverAuditData && serverAuditData.auditYear === auditYear ? serverAuditData.AAAData.fileFeedback.meetingDetails !== undefined ? serverAuditData.AAAData.fileFeedback.meetingDetails : { input: 0, MeetingDate: {}, MeetingBriefing: {}, proof: {}, } : { input: 0, MeetingDate: {}, MeetingBriefing: {}, proof: {}, })


    }, [auditYear, serverAuditData, serverAuditError])



    useEffect(() => {
        if (directorUser && shouldSave) {
            saveAAAData(AAAData, directorUser.department, setAutoSaveLoader)
        }
        setShouldSave(false)
    }, [AAAData])


    const submitData = () => {
        setAAAData({
            auditYear,
            AAAData: {
                facultyTables: {
                    researchFundingAgency,
                    publication,
                    patents,
                    consultancy,
                    conference,
                    invitedTalks,
                    facultyAwards,
                    facultyJrfSrf,
                    onlineFDP,
                    financialSupport
                },
                directorTables: {
                    ugcSap,
                    awardsAndPrizes,
                    schoolConference,
                    schoolSeminarOrganized,
                    syllabusRevision,
                    employability,
                    valueAddedCourse,
                    projectAndInternships,
                    demandRatio,
                    qualifiedExams,
                    extentionActivities,
                    progression,
                    placement,
                    alumniContribution
                },
                schoolInfoTables: {
                    ugPrograms,
                    pgPrograms,
                    mphilProgramsSimple,
                    phdProgramsSimple,
                    diplomaPrograms,
                    programDuringYear,
                    listOfVisitingTeachers,
                    academicSupportStaff,
                    facilities,
                    ethicsAdded,
                    programOutcomes,
                    courseOutcomes,
                    yearWiseUGPG,
                    studentRatio,
                    teacherRatio,
                    appointmentGovtPost,
                    appointmentUniversityFund,
                    academicActivityParticipation,
                    sabMember,
                    alumniList,
                    alumniActivities,

                },
                cellAsInputTables: {
                    teachingPosts,
                    mphilPrograms,
                    phdPrograms,
                    mphilPhd,
                    civil,
                    facultyAwardsDegree,
                },
                richTextTables: {
                    schoolParticipationDetails,
                    schoolInfra,
                    studentMonitor,
                    greenCampus,
                    commemorative,
                    studentEnrichment,
                    programObjectives,
                    schoolFeatures,
                    schoolStrength,
                    schoolWeakness,
                    schoolOppos,
                    schoolChallenges,
                    futurePlans
                },
                fileFeedback: {
                    syllabusFeedback,
                    yearOfEstablishment,
                    meetingDetails
                }

            }
        })
        setShouldSave(true)
    }

    useEffect(() => {
        if (autoSaveLoader) {
            submitData()
        }
    }, [autoSaveLoader])

    const handleSteps = () => {
        if (tabName === '5') {
            navigate(siteLinks.aaaReport.link)
        }
        else if (tabName === '4') {
            setTabName('5')
            handleNext()
        } else if (tabName === '3') {
            setTabName('4')
            handleNext()
        } else if (tabName === '2') {
            setTabName('3')
            handleNext()
        }
        else if (tabName === '1') {
            setTabName('2')
            handleNext()
        }

    }



    const handleChange = (event, value) => {
        console.log(event, value)
        setTabName(value.toString());
    };


    const submitForm = () => {
        submitReportForm(navigate, auditYear, { schoolName: directorUser.department }, 'AAAModel', '/director')
    }


    return (
        <>

            {
                directorUser ?
                    <div className='w-full mt-5'>


                        <div className='flex items-center justify-between gap-5'>
                            <Pagination count={5} page={parseInt(tabName)} onChange={handleChange} />

                            <SaveButton title={tabName === '5' ? "Save & Submit AAA Form" : "Save & Proceed"} onClickFunction={() => {
                                handleSteps(); setAutoSaveLoader(true);
                                if (tabName === '5') {
                                    submitForm()
                                }
                            }} />
                        </div>
                        <FloatButtons setAutoSaveLoader={setAutoSaveLoader} autoSaveLoader={autoSaveLoader} />

                        {/* // MAIN FORM */}
                        <div>


                            {/* STEP 1 */}
                            <div>
                                {
                                    tabName === '1' ? <div>
                                        <Wrapper title="1. Basic School information" className='mt-3' input={yearOfEstablishment}>
                                            <div className='md:flex items-center justify-between gap-3'>
                                                <Text label="Name of the School" classes="md:w-[40%]" value={directorUser?.department} />
                                                <Text label="Year of Establishment" classes="md:w-[40%]" type="number" value={yearOfEstablishment} onChangeFunction={(e) => setYearOfEstablishment(e.target.value)} />
                                            </div>
                                        </Wrapper>

                                        <Wrapper title="2. Name of the Programs offered" className='mt-3'>

                                            <NumberToTextField state={ugPrograms} setState={setUgPrograms} setAutoSaveLoader={setAutoSaveLoader} autoSaveLoader={autoSaveLoader} label="[A] Number of UG Programs offered" isForm={true} classes='my-3'
                                                options={TableData.programs.fieldOptions} fetchPreviousYears={true} allYearAAAData={allYearAAAData && allYearAAAData} tableToFetch={["schoolInfoTables", "ugPrograms"]}
                                            >
                                                <AuditTable setAutoSaveLoader={setAutoSaveLoader} tableHead={TableData.programs.auditHead}
                                                    tableChildHead={TableData.programs.childHead} state={ugPrograms}
                                                    setState={setUgPrograms} cellAsInput={false}
                                                    options={TableData.programs.fieldOptions} isForm={true} editTitle="UG Programs offered"
                                                >

                                                </AuditTable>
                                            </NumberToTextField>
                                            <NumberToTextField state={pgPrograms} setState={setPgPrograms} setAutoSaveLoader={setAutoSaveLoader} autoSaveLoader={autoSaveLoader} label="[B] Number of PG Programs offered" isForm={true} classes='my-3'
                                                options={TableData.programs.fieldOptions} fetchPreviousYears={true} allYearAAAData={allYearAAAData && allYearAAAData} tableToFetch={["schoolInfoTables", "pgPrograms"]}
                                            >
                                                <AuditTable setAutoSaveLoader={setAutoSaveLoader} tableHead={TableData.programs.auditHead}
                                                    tableChildHead={TableData.programs.childHead} state={pgPrograms}
                                                    setState={setPgPrograms} cellAsInput={false}
                                                    options={TableData.programs.fieldOptions} isForm={true} editTitle="PG Programs offered"
                                                >

                                                </AuditTable>
                                            </NumberToTextField>
                                            <NumberToTextField state={mphilProgramsSimple} setState={setMphilProgramsSimple} setAutoSaveLoader={setAutoSaveLoader} autoSaveLoader={autoSaveLoader} label="[C] Number of M.Phil Programs offered" isForm={true} classes='my-3'
                                                options={TableData.programs.fieldOptions} fetchPreviousYears={true} allYearAAAData={allYearAAAData && allYearAAAData} tableToFetch={["schoolInfoTables", "mphilProgramsSimple"]}
                                            >
                                                <AuditTable setAutoSaveLoader={setAutoSaveLoader} tableHead={TableData.programs.auditHead}
                                                    tableChildHead={TableData.programs.childHead} state={mphilProgramsSimple}
                                                    setState={setMphilProgramsSimple} cellAsInput={false}
                                                    options={TableData.programs.fieldOptions} isForm={true} editTitle="M.Phil Programs offered"
                                                >

                                                </AuditTable>
                                            </NumberToTextField>
                                            <NumberToTextField state={phdProgramsSimple} setState={setPhdProgramsSimple} setAutoSaveLoader={setAutoSaveLoader} autoSaveLoader={autoSaveLoader} label="[D] Number of Ph.D. Programs offered" isForm={true} classes='my-3'
                                                options={TableData.programs.fieldOptions} fetchPreviousYears={true} allYearAAAData={allYearAAAData && allYearAAAData} tableToFetch={["schoolInfoTables", "phdProgramsSimple"]}
                                            >
                                                <AuditTable setAutoSaveLoader={setAutoSaveLoader} tableHead={TableData.programs.auditHead}
                                                    tableChildHead={TableData.programs.childHead} state={phdProgramsSimple}
                                                    setState={setPhdProgramsSimple} cellAsInput={false}
                                                    options={TableData.programs.fieldOptions} isForm={true} editTitle="Ph.D. Programs offered"
                                                >

                                                </AuditTable>
                                            </NumberToTextField>
                                            <NumberToTextField state={diplomaPrograms} setState={setDiplomaPrograms} setAutoSaveLoader={setAutoSaveLoader} autoSaveLoader={autoSaveLoader} label="[E] Number of Diploma Programs offered" isForm={true} classes='my-3'
                                                options={TableData.programs.fieldOptions} fetchPreviousYears={true} allYearAAAData={allYearAAAData && allYearAAAData} tableToFetch={["schoolInfoTables", "diplomaPrograms"]}
                                            >
                                                <AuditTable setAutoSaveLoader={setAutoSaveLoader} tableHead={TableData.programs.auditHead}
                                                    tableChildHead={TableData.programs.childHead} state={diplomaPrograms}
                                                    setState={setDiplomaPrograms} cellAsInput={false}
                                                    options={TableData.programs.fieldOptions} isForm={true} editTitle="Diploma Programs offered"
                                                >

                                                </AuditTable>
                                            </NumberToTextField>

                                        </Wrapper>

                                        <Wrapper title="3. Name of the Programs introduced during the year" className='mt-3'>
                                            <NumberToTextField state={programDuringYear} setState={setProgramDuringYear} setAutoSaveLoader={setAutoSaveLoader} autoSaveLoader={autoSaveLoader} label="Number of Programs offered during year" isForm={true} classes='my-3'
                                                options={TableData.programs.fieldOptions} fetchPreviousYears={true} allYearAAAData={allYearAAAData && allYearAAAData} tableToFetch={["schoolInfoTables", "programDuringYear"]}
                                            >
                                                <AuditTable setAutoSaveLoader={setAutoSaveLoader} tableHead={TableData.programs.auditHead}
                                                    tableChildHead={TableData.programs.childHead} state={programDuringYear}
                                                    setState={setProgramDuringYear} cellAsInput={false}
                                                    options={TableData.programs.fieldOptions} isForm={true} editTitle="Programs offered during year"
                                                >

                                                </AuditTable>
                                            </NumberToTextField>
                                        </Wrapper>

                                        <Wrapper title="4. Number of teaching posts sanctioned, filled and vacant" className='mt-3' fetchPreviousYears={true} allYearAAAData={allYearAAAData && allYearAAAData} tableToFetch={["cellAsInputTables", "teachingPosts"]} setState={setTeachingPosts} state={teachingPosts} >
                                            <AuditTable setAutoSaveLoader={setAutoSaveLoader} tableHead={["Designation", "Sanctioned", "Filled", "Filled under CAS"]}>

                                                <EditableTd state={teachingPosts} setState={setTeachingPosts} keyName='seniorProf' title='Senior Professor' />
                                                <EditableTd state={teachingPosts} setState={setTeachingPosts} keyName='prof' title='Professor' />
                                                <EditableTd state={teachingPosts} setState={setTeachingPosts} keyName='associateProf' title='Associate Professor' />
                                                <EditableTd state={teachingPosts} setState={setTeachingPosts} keyName='assistantProf' title='Assistant Professor' />
                                                <tr>
                                                    <th scope="row">Total</th>
                                                    <th scope="row">{(teachingPosts.seniorProf.sanctioned === '' ? 0 : parseInt(teachingPosts.seniorProf.sanctioned)) + (teachingPosts.prof.sanctioned === '' ? 0 : parseInt(teachingPosts.prof.sanctioned)) + (teachingPosts.assistantProf.sanctioned === '' ? 0 : parseInt(teachingPosts.assistantProf.sanctioned)) + (teachingPosts.associateProf.sanctioned === '' ? 0 : parseInt(teachingPosts.associateProf.sanctioned))}</th>

                                                    <th scope="row">{(teachingPosts.seniorProf.filled === '' ? 0 : parseInt(teachingPosts.seniorProf.filled)) + (teachingPosts.prof.filled === '' ? 0 : parseInt(teachingPosts.prof.filled)) + (teachingPosts.assistantProf.filled === '' ? 0 : parseInt(teachingPosts.assistantProf.filled)) + (teachingPosts.associateProf.filled === '' ? 0 : parseInt(teachingPosts.associateProf.filled))}</th>


                                                    <th scope="row">{(teachingPosts.seniorProf.cas === '' ? 0 : parseInt(teachingPosts.seniorProf.cas)) + (teachingPosts.prof.cas === '' ? 0 : parseInt(teachingPosts.prof.cas)) + (teachingPosts.assistantProf.cas === '' ? 0 : parseInt(teachingPosts.assistantProf.cas)) + (teachingPosts.associateProf.cas === '' ? 0 : parseInt(teachingPosts.associateProf.cas))}</th>

                                                </tr>

                                            </AuditTable>
                                        </Wrapper>

                                        <Wrapper title="5. Faculty profile with name, qualification, designation, experience, nature of appointment (confirmed/ probation/temporary)" className='mt-3'  >

                                            {/* part A */}
                                            <NumberToTextField state={appointmentGovtPost} setState={setAppointmentGovtPost} setAutoSaveLoader={setAutoSaveLoader} autoSaveLoader={autoSaveLoader} label="[A]  Appointed on Government Sanctioned Post (Enter number of post sanctioned under Government)" isForm={true} classes='my-3' options={TableData.appointmentGovtPost.fieldOptions}
                                                fetchPreviousYears={true} allYearAAAData={allYearAAAData && allYearAAAData} tableToFetch={["schoolInfoTables", "appointmentGovtPost"]} >
                                                <AuditTable setAutoSaveLoader={setAutoSaveLoader} tableHead={TableData.appointmentGovtPost.auditHead}
                                                    tableChildHead={TableData.appointmentGovtPost.childHead} state={appointmentGovtPost}
                                                    setState={setAppointmentGovtPost} cellAsInput={false}
                                                    options={TableData.appointmentGovtPost.fieldOptions} isForm={true} editTitle="Appointed on Government Sanctioned Post"
                                                >

                                                </AuditTable>
                                            </NumberToTextField>


                                            {/* part B */}

                                            <NumberToTextField state={appointmentUniversityFund} setState={setAppointmentUniversityFund} setAutoSaveLoader={setAutoSaveLoader} autoSaveLoader={autoSaveLoader} label="[B]  Appointed from University Fund (Enter number of post sanctioned under University Fund)" isForm={true} classes='my-3' options={TableData.appointmentGovtPost.fieldOptions}
                                                fetchPreviousYears={true} allYearAAAData={allYearAAAData && allYearAAAData} tableToFetch={["schoolInfoTables", "appointmentUniversityFund"]}>
                                                <AuditTable setAutoSaveLoader={setAutoSaveLoader} tableHead={TableData.appointmentGovtPost.auditHead}
                                                    tableChildHead={TableData.appointmentGovtPost.childHead} state={appointmentUniversityFund}
                                                    setState={setAppointmentUniversityFund} cellAsInput={false}
                                                    options={TableData.appointmentGovtPost.fieldOptions}
                                                    isForm={true} editTitle="Appointed from University Fund"
                                                ></AuditTable>
                                            </NumberToTextField>
                                        </Wrapper>

                                        <Wrapper title="6. List of Visiting Fellows/Teachers, Adjunct and Emeritus Professors" className='mt-3' input={listOfVisitingTeachers.input}>

                                            <NumberToTextField state={listOfVisitingTeachers} setState={setListOfVisitingTeachers} setAutoSaveLoader={setAutoSaveLoader} autoSaveLoader={autoSaveLoader} label="Enter number of Fellows/Teachers, Adjunct and Emeritus Professors visited" isForm={true} classes='my-3'
                                                options={[{ field: 'Text', keyName: "TeacherName", label: "Teacher Name" },
                                                { field: 'Select', keyName: "Designation", label: "Choose Designation", options: ['Visiting', 'Adjunct', 'Emeritus'] },
                                                { field: 'Text', keyName: "Qualification", label: "Qualification" },
                                                { field: 'Select', keyName: "Gender", label: "Choose Gender", options: ['Male', 'Female', 'Other'] },
                                                { field: 'Text', keyName: "InstituteAddress", label: "Institute Address", },
                                                ]} fetchPreviousYears={true} allYearAAAData={allYearAAAData && allYearAAAData} tableToFetch={["schoolInfoTables", "listOfVisitingTeachers"]}>

                                                <AuditTable setAutoSaveLoader={setAutoSaveLoader} tableHead={TableData.listOfVisitingTeachers.auditHead}
                                                    tableChildHead={TableData.listOfVisitingTeachers.childHead} state={listOfVisitingTeachers}
                                                    setState={setListOfVisitingTeachers} cellAsInput={false} options={[{ field: 'Text', keyName: "TeacherName", label: "Teacher Name" },
                                                    { field: 'Select', keyName: "Designation", label: "Choose Designation", options: ['Visiting', 'Adjunct', 'Emeritus'] },
                                                    { field: 'Text', keyName: "Qualification", label: "Qualification" },
                                                    { field: 'Select', keyName: "Gender", label: "Choose Gender", options: ['Male', 'Female', 'Other'] },
                                                    { field: 'Text', keyName: "InstituteAddress", label: "Institute Address", },
                                                    ]} isForm={true} editTitle="List of Visiting Fellows/Teachers, Adjunct and Emeritus Professors, (for last 4 years)" />


                                            </NumberToTextField>

                                        </Wrapper>

                                        <Wrapper title="7. Number of academic support staff (technical) and administrative staff sanctioned, filled and vacant" className='mt-3' >

                                            <NumberToTextField state={academicSupportStaff} setState={setAcademicSupportStaff} setAutoSaveLoader={setAutoSaveLoader} autoSaveLoader={autoSaveLoader} label="Enter number of Staffs" isForm={true} classes='my-3' fetchPreviousYears={true} allYearAAAData={allYearAAAData && allYearAAAData} tableToFetch={["schoolInfoTables", "academicSupportStaff"]}
                                                options={[{ field: 'Text', keyName: "PostName", label: "Name of the Post" },
                                                { field: 'Text', keyName: "SanctionedPost", label: "Number of Sanctioned Posts" },
                                                { field: 'Text', keyName: "Filled", label: "Number of Filled Posts" },
                                                { field: 'Text', keyName: "Vacant", label: "Number of Vacant Posts" },
                                                ]}
                                            >
                                                <AuditTable setAutoSaveLoader={setAutoSaveLoader} tableHead={TableData.academicSupportStaff.auditHead}
                                                    tableChildHead={TableData.academicSupportStaff.childHead} state={academicSupportStaff}
                                                    setState={setAcademicSupportStaff} cellAsInput={false} options={[{ field: 'Text', keyName: "PostName", label: "Name of the Post" },
                                                    { field: 'Text', keyName: "SanctionedPost", label: "Number of Sanctioned Posts" },
                                                    { field: 'Text', keyName: "Filled", label: "Number of Filled Posts" },
                                                    { field: 'Text', keyName: "Vacant", label: "Number of Vacant Posts" },
                                                    ]} isForm={true} editTitle="Academic support staff (technical) and administrative staff sanctioned, filled and vacant" />
                                            </NumberToTextField>

                                        </Wrapper>

                                        <Wrapper title="8. Information about research grants, projects completed and ongoing during the
                year" className='mt-3' input={researchFundingAgency.input}>

                                            <NumberToTextField state={researchFundingAgency} setState={setResearchFundingAgency} setAutoSaveLoader={setAutoSaveLoader} autoSaveLoader={autoSaveLoader} label="Enter number of research grants, projects completed and ongoing during the year" isForm={true} classes='my-3'
                                                options={TableData.ResearchProject.fieldOptions}>

                                                <AuditTable setAutoSaveLoader={setAutoSaveLoader} tableHead={TableData.ResearchProject.auditHead} fetchData={true}
                                                    fetchDetails={{ model: 'ResearchProject', school: directorUser?.department }} tableChildHead={TableData.ResearchProject.childHead}
                                                    state={researchFundingAgency} setState={setResearchFundingAgency}
                                                    isForm={true}
                                                    options={TableData.ResearchProject.fieldOptions} editTitle="Information about research grants, projects completed and ongoing during the year"
                                                >

                                                </AuditTable>

                                            </NumberToTextField>


                                        </Wrapper>

                                        {/* //Director fetch details */}
                                        <Wrapper title="9. Funds received at School level through DST-FIST; CSIR, UGC-SAP/CAS, DAE,
                        DBT, BRNS, ICSSR, AICTE, RGSTC" className='mt-3' input={ugcSap.input} >

                                            <NumberToTextField state={ugcSap} setState={setUgcSap} setAutoSaveLoader={setAutoSaveLoader} autoSaveLoader={autoSaveLoader} label="Enter number of times Funds received" isForm={true} classes='my-3'
                                                options={TableData.UgcSapCasDstFistDBTICSSR.fieldOptions}>

                                                <AuditTable setAutoSaveLoader={setAutoSaveLoader} tableHead={TableData.UgcSapCasDstFistDBTICSSR.auditHead} fetchData={true}
                                                    fetchDetails={{ model: 'UgcSapCasDstFistDBTICSSR', school: directorUser?.department }} tableChildHead={TableData.UgcSapCasDstFistDBTICSSR.childHead} fetchFrom='director' state={ugcSap} stateHead={TableData.UgcSapCasDstFistDBTICSSR.stateHead} setState={setUgcSap} isForm={true} editTitle='Funds received at School level through DST-FIST; CSIR, UGC-SAP/CAS, DAE,
                                        DBT, BRNS, ICSSR, AICTE, RGSTC'
                                                    options={TableData.UgcSapCasDstFistDBTICSSR.fieldOptions}>

                                                </AuditTable>

                                            </NumberToTextField>


                                        </Wrapper>

                                        <Wrapper title="10. Details of Research facilities available in the School and recognition received" className='mt-3' input={facilities.input}>

                                            <NumberToTextField state={facilities} setState={setFacilities} setAutoSaveLoader={setAutoSaveLoader} autoSaveLoader={autoSaveLoader} label="Enter number of research facilities available" isForm={true} classes='my-3'
                                                options={TableData.facilities.fieldOptions} fetchPreviousYears={true} allYearAAAData={allYearAAAData && allYearAAAData} tableToFetch={["schoolInfoTables", "facilities"]}
                                            >
                                                <AuditTable setAutoSaveLoader={setAutoSaveLoader} tableHead={TableData.facilities.auditHead}
                                                    tableChildHead={TableData.facilities.childHead} state={facilities} setState={setFacilities} cellAsInput={false} isForm={true} editTitle='Details of Research facilities available in the School and recognition received'
                                                    options={TableData.facilities.fieldOptions} />
                                            </NumberToTextField>

                                        </Wrapper>
                                    </div> : null
                                }
                            </div>

                            {/* STEP 2 */}
                            <div>
                                {
                                    tabName === '2' ?
                                        <div >
                                            <Wrapper title="11. Publication Details" className='mt-3' input={publication.input}>

                                                <NumberToTextField state={publication} setState={setPublication} setAutoSaveLoader={setAutoSaveLoader} autoSaveLoader={autoSaveLoader} label="Enter number of Publications" isForm={true} classes='my-3'
                                                    options={TableData.ResearchPaper.fieldOptions}>



                                                    <AuditTable setAutoSaveLoader={setAutoSaveLoader} tableHead={TableData.ResearchPaper.auditHead} fetchData={true}
                                                        fetchDetails={{ model: 'ResearchPaper', school: directorUser?.department }} tableChildHead={TableData.ResearchPaper.childHead} state={publication} setState={setPublication} isForm={true} editTitle='Publication Details'
                                                        options={TableData.ResearchPaper.fieldOptions}>

                                                    </AuditTable>

                                                </NumberToTextField>


                                            </Wrapper>

                                            <Wrapper title="12. Patent Details" className='mt-3' input={patents.input}>

                                                <NumberToTextField state={patents} setState={setPatents} setAutoSaveLoader={setAutoSaveLoader} autoSaveLoader={autoSaveLoader} label="Enter number of Patent Published" isForm={true} classes='my-3'
                                                    options={TableData.Patent.fieldOptions}>



                                                    <AuditTable setAutoSaveLoader={setAutoSaveLoader} tableHead={TableData.Patent.auditHead} fetchData={true}
                                                        fetchDetails={{ model: 'Patent', school: directorUser?.department }} tableChildHead={TableData.Patent.childHead} state={patents} setState={setPatents} isForm={true} editTitle='Patent Details'
                                                        options={TableData.Patent.fieldOptions}>

                                                    </AuditTable>

                                                </NumberToTextField>


                                            </Wrapper>

                                            <Wrapper title="13. Consultancy Details" className='mt-3' input={consultancy.input}>

                                                <NumberToTextField state={consultancy} setState={setConsultancy} setAutoSaveLoader={setAutoSaveLoader} autoSaveLoader={autoSaveLoader} label="Enter number of Consultancies" isForm={true} classes='my-3'
                                                    options={TableData.ConsultancyServices.fieldOptions}>



                                                    <AuditTable setAutoSaveLoader={setAutoSaveLoader} tableHead={TableData.ConsultancyServices.auditHead} fetchData={true}
                                                        fetchDetails={{ model: 'ConsultancyServices', school: directorUser?.department }} tableChildHead={TableData.ConsultancyServices.childHead} state={consultancy} setState={setConsultancy} isForm={true} editTitle='Consultancy Details'
                                                        options={TableData.ConsultancyServices.fieldOptions}>

                                                    </AuditTable>

                                                </NumberToTextField>


                                            </Wrapper>

                                            <Wrapper title="14. Details of teachers invited as resource persons for Refresher courses, Orientation
courses, Seminars, Workshops, Conferences" className='mt-3' input={invitedTalks.input}>

                                                <NumberToTextField state={invitedTalks} setState={setInvitedTalks} setAutoSaveLoader={setAutoSaveLoader} autoSaveLoader={autoSaveLoader} label="Enter number of Invited Talks" isForm={true} classes='my-3'
                                                    options={TableData.InvitedTalk.fieldOptions}>



                                                    <AuditTable setAutoSaveLoader={setAutoSaveLoader} tableHead={TableData.InvitedTalk.auditHead} fetchData={true}
                                                        fetchDetails={{ model: 'InvitedTalk', school: directorUser?.department }} tableChildHead={TableData.InvitedTalk.childHead} state={invitedTalks} setState={setInvitedTalks} isForm={true} editTitle='Details of teachers invited as resource persons for Refresher courses, Orientation
        courses, Seminars, Workshops, Conferences'
                                                        options={TableData.InvitedTalk.fieldOptions}>

                                                    </AuditTable>

                                                </NumberToTextField>


                                            </Wrapper>

                                            <Wrapper title="15. Program Participation Details" className='mt-3'>

                                                <NumberToTextField state={onlineFDP} setState={setOnlineFDP} setAutoSaveLoader={setAutoSaveLoader} autoSaveLoader={autoSaveLoader} label="[A] Orientation / Refresher Course / Online FDP (Enter number of Orientation / Refresher Course / Online FDP)" isForm={true} classes='my-3'
                                                    options={TableData.Online.fieldOptions}>

                                                    <AuditTable setAutoSaveLoader={setAutoSaveLoader} tableHead={TableData.Online.auditHead} fetchData={true}
                                                        fetchDetails={{ model: 'Online', school: directorUser?.department }} tableChildHead={TableData.Online.childHead} state={onlineFDP} setState={setOnlineFDP} isForm={true} editTitle='Orientation / Refresher Course / Online FDP'
                                                        options={TableData.Online.fieldOptions}>

                                                    </AuditTable>

                                                </NumberToTextField>

                                                <NumberToTextField state={financialSupport} setState={setFinancialSupport} setAutoSaveLoader={setAutoSaveLoader} autoSaveLoader={autoSaveLoader} label="[C] Financial Support To Attend Conferences (Enter number of Financial Support To Attend Conferences)" isForm={true} classes='my-3'
                                                    options={TableData.FinancialSupport.fieldOptions}>

                                                    <AuditTable setAutoSaveLoader={setAutoSaveLoader} tableHead={TableData.FinancialSupport.auditHead} fetchData={true}
                                                        fetchDetails={{ model: 'FinancialSupport', school: directorUser?.department }} tableChildHead={TableData.FinancialSupport.childHead} state={financialSupport} setState={setFinancialSupport} isForm={true} editTitle='Financial Support To Attend Conferences'
                                                        options={TableData.FinancialSupport.fieldOptions}>

                                                    </AuditTable>

                                                </NumberToTextField>



                                            </Wrapper>

                                            <Wrapper title="16. Participation of teachers in various academic activities as members of committees" className='mt-3' input={academicActivityParticipation.input}>

                                                <NumberToTextField state={academicActivityParticipation} setState={setAcademicActivityParticipation} setAutoSaveLoader={setAutoSaveLoader} autoSaveLoader={autoSaveLoader} label="Enter number of participation of teacher in academic activities" isForm={true} classes='my-3'
                                                    options={TableData.academicActivityParticipation.fieldOptions} fetchPreviousYears={true} allYearAAAData={allYearAAAData && allYearAAAData} tableToFetch={['schoolInfoTables', 'academicActivityParticipation']}
                                                >
                                                    <AuditTable setAutoSaveLoader={setAutoSaveLoader} tableHead={TableData.academicActivityParticipation.auditHead}
                                                        tableChildHead={TableData.academicActivityParticipation.childHead} state={academicActivityParticipation}
                                                        setState={setAcademicActivityParticipation} cellAsInput={false}
                                                        isForm={true} editTitle='Participation of teachers in various academic activities as members of committees'
                                                        options={TableData.academicActivityParticipation.fieldOptions} fetchPreviousYears={true} allYearAAAData={allYearAAAData && allYearAAAData} tableToFetch={["schoolInfoTables", "academicActivityParticipation"]} />
                                                </NumberToTextField>

                                            </Wrapper>

                                            <Wrapper title="17. Awards / Prizes and recognitions received by teachers" className='mt-3' input={facultyAwards.input}>

                                                <NumberToTextField state={facultyAwards} setState={setFacultyAwards} setAutoSaveLoader={setAutoSaveLoader} autoSaveLoader={autoSaveLoader} label="Enter number of Awards / Prices and recognitions" isForm={true} classes='my-3'
                                                    options={TableData.AwardRecognition.fieldOptions}>



                                                    <AuditTable setAutoSaveLoader={setAutoSaveLoader} tableHead={TableData.AwardRecognition.auditHead} fetchData={true}
                                                        fetchDetails={{ model: 'AwardRecognition', school: directorUser?.department }} tableChildHead={TableData.AwardRecognition.childHead}
                                                        state={facultyAwards} setState={setFacultyAwards} isForm={true} editTitle=' Awards / Prizes and recognitions received by teachers'
                                                        options={TableData.AwardRecognition.fieldOptions}>

                                                    </AuditTable>

                                                </NumberToTextField>


                                            </Wrapper>

                                            {/* //Director fetch details */}
                                            <Wrapper title="18. Awards and Prizes received by students" className='mt-3' input={awardsAndPrizes.input} >

                                                <NumberToTextField state={awardsAndPrizes} setState={setAwardsAndPrizes} setAutoSaveLoader={setAutoSaveLoader} autoSaveLoader={autoSaveLoader} label="Enter number of Awards and Prizes received by students" isForm={true} classes='my-3'
                                                    options={TableData.Award.fieldOptions}>

                                                    <AuditTable setAutoSaveLoader={setAutoSaveLoader} tableHead={TableData.Award.auditHead} fetchData={true} isForm={true} editTitle='Awards and Prizes received by students'
                                                        fetchDetails={{ model: 'Award', school: directorUser?.department }} tableChildHead={TableData.Award.childHead} fetchFrom='director' state={awardsAndPrizes} stateHead={TableData.Award.stateHead} setState={setAwardsAndPrizes} options={TableData.Award.fieldOptions}>

                                                    </AuditTable>

                                                </NumberToTextField>


                                            </Wrapper>

                                            {/* //Director fetch details */}
                                            <Wrapper title="19. Programs Organized" className='mt-3' >

                                                <NumberToTextField state={schoolConference} setState={setSchoolConference} setAutoSaveLoader={setAutoSaveLoader} autoSaveLoader={autoSaveLoader} label="Enter number of Professional Development / Administrative Training Programs Organized" isForm={true} classes='my-3'
                                                    options={TableData.TrainingProgramsOrganized.fieldOptions}>

                                                    <AuditTable setAutoSaveLoader={setAutoSaveLoader} tableHead={TableData.TrainingProgramsOrganized.auditHead} fetchData={true}
                                                        fetchDetails={{ model: 'TrainingProgramsOrganized', school: directorUser?.department }} tableChildHead={TableData.TrainingProgramsOrganized.childHead} fetchFrom='director' state={schoolConference}
                                                        stateHead={TableData.TrainingProgramsOrganized.stateHead} setState={setSchoolConference} isForm={true} editTitle='Details of Seminars/ Conferences/Workshops organized'
                                                        options={TableData.TrainingProgramsOrganized.fieldOptions}
                                                    >

                                                    </AuditTable>

                                                </NumberToTextField>

                                                <NumberToTextField state={schoolSeminarOrganized} setState={setSchoolSeminarOrganized} setAutoSaveLoader={setAutoSaveLoader} autoSaveLoader={autoSaveLoader} label="Enter number of Conferences / Seminar / Workshop Organized" isForm={true} classes='my-3'
                                                    options={TableData.ConferencesSemiWorkshopOrganized.fieldOptions}>

                                                    <AuditTable setAutoSaveLoader={setAutoSaveLoader} tableHead={TableData.ConferencesSemiWorkshopOrganized.auditHead} fetchData={true}
                                                        fetchDetails={{ model: 'ConferencesSemiWorkshopOrganized', school: directorUser?.department }} tableChildHead={TableData.ConferencesSemiWorkshopOrganized.childHead} fetchFrom='director' state={schoolSeminarOrganized}
                                                        stateHead={TableData.ConferencesSemiWorkshopOrganized.stateHead} setState={setSchoolSeminarOrganized} isForm={true} editTitle='Details of Seminars/ Conferences/Workshops organized'
                                                        options={TableData.ConferencesSemiWorkshopOrganized.fieldOptions}
                                                    >

                                                    </AuditTable>

                                                </NumberToTextField>


                                            </Wrapper>

                                            {/* //Director fetch details */}
                                            <Wrapper title="20. Detail of syllabus revision" className='mt-3' input={syllabusRevision.input} >

                                                <NumberToTextField state={syllabusRevision} setState={setSyllabusRevision} setAutoSaveLoader={setAutoSaveLoader} autoSaveLoader={autoSaveLoader} label="Enter number of Syllabus Revision" isForm={true} classes='my-3'
                                                    options={TableData.SyllabusRevision.fieldOptions}>

                                                    <AuditTable setAutoSaveLoader={setAutoSaveLoader} tableHead={TableData.SyllabusRevision.auditHead} fetchData={true}
                                                        fetchDetails={{ model: 'SyllabusRevision', school: directorUser?.department }} tableChildHead={TableData.SyllabusRevision.childHead} fetchFrom='director' state={syllabusRevision} stateHead={TableData.SyllabusRevision.stateHead}
                                                        setState={setSyllabusRevision} options={TableData.SyllabusRevision.fieldOptions} editTitle="Detail of syllabus revision" isForm={true}>

                                                    </AuditTable>

                                                </NumberToTextField>


                                            </Wrapper>

                                        </div> : null
                                }
                            </div>

                            {/* STEP 3 */}
                            <div>
                                {
                                    tabName === '3' ? <div>
                                        {/* //Director fetch details */}
                                        <Wrapper title="21. Courses in the syllabus which are identified as skill /entrepreneurship based
                    courses having attached activities during the semester" className='mt-3' input={employability.input} >

                                            <NumberToTextField state={employability} setState={setEmployability} setAutoSaveLoader={setAutoSaveLoader} autoSaveLoader={autoSaveLoader} label="Enter number of Courses in the syllabus which are identified as skill /entrepreneurship based
                        courses having attached activities during the semester" isForm={true} classes='my-3'
                                                options={TableData.Employability.fieldOptions}>

                                                <AuditTable setAutoSaveLoader={setAutoSaveLoader} tableHead={TableData.Employability.auditHead} fetchData={true}
                                                    fetchDetails={{ model: 'Employability', school: directorUser?.department }} tableChildHead={TableData.Employability.childHead} fetchFrom='director' state={employability}
                                                    stateHead={TableData.Employability.stateHead} setState={setEmployability} isForm={true} editTitle='Courses in the syllabus which are identified as skill /entrepreneurship based
                                        courses having attached activities during the semester'
                                                    options={TableData.Employability.fieldOptions}>

                                                </AuditTable>

                                            </NumberToTextField>


                                        </Wrapper>

                                        {/* //Director fetch details */}
                                        <Wrapper title="22. Value addition courses for imparting transferable and life skills offered offered" className='mt-3' input={valueAddedCourse.input} >

                                            <NumberToTextField state={valueAddedCourse} setState={setValueAddedCourse} setAutoSaveLoader={setAutoSaveLoader} autoSaveLoader={autoSaveLoader} label="Enter number of Value added courses" isForm={true} classes='my-3'
                                                options={TableData.ValueAddedCource.fieldOptions}>

                                                <AuditTable setAutoSaveLoader={setAutoSaveLoader} tableHead={TableData.ValueAddedCource.auditHead} fetchData={true}
                                                    fetchDetails={{ model: 'ValueAddedCource', school: directorUser?.department }} tableChildHead={TableData.ValueAddedCource.childHead} fetchFrom='director' state={valueAddedCourse} stateHead={TableData.ValueAddedCource.stateHead} setState={setValueAddedCourse} isForm={true} editTitle='Value addition courses for imparting transferable and life skills offered offered'
                                                    options={TableData.ValueAddedCource.fieldOptions}>

                                                </AuditTable>

                                            </NumberToTextField>


                                        </Wrapper>


                                        <Wrapper title="23. Details of School incorporated topics/courses relevant to Professional Ethics, Gender,
                    Human Values, Environment and Sustainability into the Curriculum" className='mt-3' input={ethicsAdded.input}>

                                            <NumberToTextField state={ethicsAdded} setState={setEthicsAdded} setAutoSaveLoader={setAutoSaveLoader} autoSaveLoader={autoSaveLoader} label="Enter number of Course added" isForm={true} classes='my-3'
                                                options={TableData.ethicsAdded.fieldOptions} fetchPreviousYears={true} allYearAAAData={allYearAAAData && allYearAAAData} tableToFetch={["schoolInfoTables", "ethicsAdded"]}
                                            ><AuditTable tableHead={TableData.ethicsAdded.auditHead}
                                                tableChildHead={TableData.ethicsAdded.childHead} state={ethicsAdded}
                                                setState={setEthicsAdded} cellAsInput={false} isForm={true} editTitle='. Details of School incorporated topics/courses relevant to Professional Ethics, Gender,
                                    Human Values, Environment and Sustainability into the Curriculum'
                                                options={TableData.ethicsAdded.fieldOptions} />
                                            </NumberToTextField>

                                        </Wrapper>

                                        <Wrapper title="24. Program / Course Objectives & Outcomes" className='mt-3' input={programOutcomes.input}>

                                            <NumberToTextField state={programOutcomes} setState={setProgramOutcomes} setAutoSaveLoader={setAutoSaveLoader} autoSaveLoader={autoSaveLoader} label="[A] Program Objectives and Outcomes (Enter number of programs)" isForm={true} classes='my-3'
                                                options={TableData.programOutcomes.fieldOptions}
                                                fetchPreviousYears={true} allYearAAAData={allYearAAAData && allYearAAAData} tableToFetch={["schoolInfoTables", "programOutcomes"]}>
                                                <AuditTable setAutoSaveLoader={setAutoSaveLoader} tableHead={TableData.programOutcomes.auditHead}
                                                    tableChildHead={TableData.programOutcomes.childHead} state={programOutcomes}
                                                    setState={setProgramOutcomes} cellAsInput={false} isForm={true} editTitle='Program Objectives / Outcomes'
                                                    options={TableData.programOutcomes.fieldOptions} />
                                            </NumberToTextField>


                                            <NumberToTextField state={courseOutcomes} setState={setCourseOutcomes} setAutoSaveLoader={setAutoSaveLoader} autoSaveLoader={autoSaveLoader} label="[B] Course Objectives and Outcomes (Enter number of Courses)" isForm={true} classes='my-3' options={TableData.courseOutcomes.fieldOptions}
                                                fileKeyName="proof" tableWithProof={true} fetchPreviousYears={true} allYearAAAData={allYearAAAData && allYearAAAData} tableToFetch={["schoolInfoTables", "courseOutcomes"]} >
                                                <AuditTable setAutoSaveLoader={setAutoSaveLoader} tableHead={TableData.courseOutcomes.auditHead}
                                                    tableChildHead={TableData.courseOutcomes.childHead} state={courseOutcomes} options={TableData.courseOutcomes.fieldOptions} editTitle='Course Objectives / Outcomes' setState={setCourseOutcomes} cellAsInput={false} />
                                            </NumberToTextField>

                                        </Wrapper>

                                        {/* //Director fetch details */}
                                        <Wrapper title="25. Details of students undertaking field Projects / Research projects / Internships" className='mt-3' input={projectAndInternships.input} >

                                            <NumberToTextField state={projectAndInternships} setState={setProjectAndInternships} setAutoSaveLoader={setAutoSaveLoader} autoSaveLoader={autoSaveLoader} label="Enter number of Project / Research projects / Internships" isForm={true} classes='my-3'
                                                options={TableData.ProjectsInternships.fieldOpions} >

                                                <AuditTable setAutoSaveLoader={setAutoSaveLoader} tableHead={TableData.ProjectsInternships.auditHead} fetchData={true}
                                                    fetchDetails={{ model: 'ProjectsInternships', school: directorUser?.department }} tableChildHead={TableData.ProjectsInternships.childHead} fetchFrom='director' state={projectAndInternships} stateHead={TableData.ProjectsInternships.stateHead} setState={setProjectAndInternships} isForm={true} editTitle='Details of students undertaking field Projects / Research projects / Internships'
                                                    options={TableData.ProjectsInternships.fieldOpions} >

                                                </AuditTable>

                                            </NumberToTextField>


                                        </Wrapper>


                                        {/* // Feedback */}
                                        <Wrapper title="26. Feedback taken for syllabus design and revision from teachers, experts, industry & alumni" className='mt-3' input={ethicsAdded.input} type="feedback" setState={setSyllabusFeedback} state={syllabusFeedback} submitFeedback={submitFeedback} >

                                            <FeedbackCheck setState={setSyllabusFeedback} state={syllabusFeedback} title="Teacher" keyName='teacher' id="teacher" />
                                            <FeedbackCheck setState={setSyllabusFeedback} state={syllabusFeedback} title="Expert" keyName='expert' id="expert" />
                                            <FeedbackCheck setState={setSyllabusFeedback} state={syllabusFeedback} title="Industry" keyName='industry' id="industry" />
                                            <FeedbackCheck setState={setSyllabusFeedback} state={syllabusFeedback} title="Alumni" keyName='alumni' id="alumni" />

                                        </Wrapper>


                                        <Wrapper title="27. Details of Participation of the School in the curriculum development." className='mt-3' >
                                            <div>
                                                <RichText id="schoolPartInActivities"
                                                    setState={setSchoolParticipationDetails}
                                                    state={schoolParticipationDetails}
                                                    fetchPreviousYears={true} allYearAAAData={allYearAAAData && allYearAAAData} tableToFetch={["richTextTables", "schoolParticipationDetails"]}
                                                />
                                            </div>
                                        </Wrapper>

                                        {/* //Director fetch details */}
                                        <Wrapper title="28. Student profile programme-wise at UG and PG" className='mt-3' input={demandRatio.input} >

                                            <NumberToTextField state={demandRatio} setState={setDemandRatio} setAutoSaveLoader={setAutoSaveLoader} autoSaveLoader={autoSaveLoader} label="Enter number of Student profile programme-wise at UG and PG" isForm={true} classes='my-3'
                                                options={TableData.DemandRatio.fieldOptions}>

                                                <AuditTable setAutoSaveLoader={setAutoSaveLoader} tableHead={TableData.DemandRatio.auditHead} fetchData={true}
                                                    fetchDetails={{ model: 'DemandRatio', school: directorUser?.department }} tableChildHead={TableData.DemandRatio.childHead} fetchFrom='director' stateHead={TableData.DemandRatio.stateHead} state={demandRatio} setState={setDemandRatio} isForm={true} editTitle='Student profile programme-wise at UG and PG'
                                                    options={TableData.DemandRatio.fieldOptions} />

                                            </NumberToTextField>


                                        </Wrapper>

                                        <Wrapper title="29. Program-wise results of students" className='mt-3' input={yearWiseUGPG.input}>

                                            <NumberToTextField state={yearWiseUGPG} setState={setYearWiseUGPG} setAutoSaveLoader={setAutoSaveLoader} autoSaveLoader={autoSaveLoader} label="Enter number of Year-wise results of students at UG and PG" isForm={true} classes='my-3'
                                                options={TableData.yearWiseUGPG.fieldOptions}
                                                fetchPreviousYears={true} allYearAAAData={allYearAAAData && allYearAAAData} tableToFetch={["schoolInfoTables", "yearWiseUGPG"]}>
                                                <AuditTable setAutoSaveLoader={setAutoSaveLoader} tableHead={TableData.yearWiseUGPG.auditHead}
                                                    tableChildHead={TableData.yearWiseUGPG.childHead} state={yearWiseUGPG}
                                                    setState={setYearWiseUGPG} cellAsInput={false} isForm={true} editTitle='Program-wise results of students'
                                                    options={TableData.yearWiseUGPG.fieldOptions} />
                                            </NumberToTextField>

                                        </Wrapper>

                                        <Wrapper title="30. JRF/SRF/Other fellowships details" className='mt-3' input={facultyJrfSrf.input}>

                                            <NumberToTextField state={facultyJrfSrf} setState={setFacultyJrfSrf} setAutoSaveLoader={setAutoSaveLoader} autoSaveLoader={autoSaveLoader} label="Enter number of JRF/SRF/Other fellowships" isForm={true} classes='my-3'
                                                options={TableData.JrfSrf.fieldOptions}>

                                                <AuditTable setAutoSaveLoader={setAutoSaveLoader} tableHead={TableData.JrfSrf.auditHead} fetchData={true}
                                                    fetchDetails={{ model: 'JrfSrf', school: directorUser?.department }} tableChildHead={TableData.JrfSrf.childHead} state={facultyJrfSrf} setState={setFacultyJrfSrf} isForm={true} editTitle='JRF/SRF/Other fellowships details'
                                                    options={TableData.JrfSrf.fieldOptions}>

                                                </AuditTable>

                                            </NumberToTextField>


                                        </Wrapper>
                                    </div> : null
                                }
                            </div>

                            {/* STEP 4 */}
                            <div>
                                {
                                    tabName === '4' ? <div>
                                        <Wrapper title="31. Information about M.Phil programme" className='mt-3' input={mphilPrograms.input} fetchPreviousYears={true} allYearAAAData={allYearAAAData && allYearAAAData} tableToFetch={["cellAsInputTables", "mphilPrograms"]} state={mphilPrograms} setState={setMphilPrograms}>

                                            <AuditTable setAutoSaveLoader={setAutoSaveLoader} tableHead={["Applications Received", "Intake", "Admissions", "Male", "Female", "Others", "Total"]}>


                                                <tr>
                                                    <EditableTd state={mphilPrograms} setState={setMphilPrograms} keyName='applications' title='MPSC/UPSC' tableName='civil' />
                                                    <EditableTd state={mphilPrograms} setState={setMphilPrograms} keyName='intake' title='NET/SET' tableName='civil' />
                                                    <EditableTd state={mphilPrograms} setState={setMphilPrograms} keyName='admissions' title='GATE' tableName='civil' />
                                                    <EditableTd state={mphilPrograms} setState={setMphilPrograms} keyName='male' title='Other Exams' tableName='civil' />
                                                    <EditableTd state={mphilPrograms} setState={setMphilPrograms} keyName='female' title='Other Exams' tableName='civil' />
                                                    <EditableTd state={mphilPrograms} setState={setMphilPrograms} keyName='others' title='Other Exams' tableName='civil' />

                                                    <th scope="row">{(mphilPrograms.intake === '' ? 0 : parseInt(mphilPrograms.intake))
                                                        + (mphilPrograms.admissions === '' ? 0 : parseInt(mphilPrograms.admissions))
                                                        + (mphilPrograms.male === '' ? 0 : parseInt(mphilPrograms.male))
                                                        + (mphilPrograms.female === '' ? 0 : parseInt(mphilPrograms.female))
                                                        + (mphilPrograms.others === '' ? 0 : parseInt(mphilPrograms.others))
                                                    }
                                                    </th>
                                                </tr>




                                            </AuditTable>


                                        </Wrapper>

                                        <Wrapper title="32. Information about Ph.D. programme" className='mt-3' input={phdPrograms.input} fetchPreviousYears={true} allYearAAAData={allYearAAAData && allYearAAAData} tableToFetch={["cellAsInputTables", "phdPrograms"]} state={phdPrograms} setState={setPhdPrograms} >

                                            <AuditTable setAutoSaveLoader={setAutoSaveLoader} tableHead={["Applications Received", "Intake", "Admissions", "Male", "Female", "Others", "Total"]}>



                                                <tr>
                                                    <EditableTd state={phdPrograms} setState={setPhdPrograms} keyName='applications' title='MPSC/UPSC' tableName='civil' />
                                                    <EditableTd state={phdPrograms} setState={setPhdPrograms} keyName='intake' title='NET/SET' tableName='civil' />
                                                    <EditableTd state={phdPrograms} setState={setPhdPrograms} keyName='admissions' title='GATE' tableName='civil' />
                                                    <EditableTd state={phdPrograms} setState={setPhdPrograms} keyName='male' title='Other Exams' tableName='civil' />
                                                    <EditableTd state={phdPrograms} setState={setPhdPrograms} keyName='female' title='Other Exams' tableName='civil' />
                                                    <EditableTd state={phdPrograms} setState={setPhdPrograms} keyName='others' title='Other Exams' tableName='civil' />

                                                    <th scope="row">{(phdPrograms.intake === '' ? 0 : parseInt(phdPrograms.intake))
                                                        + (phdPrograms.admissions === '' ? 0 : parseInt(phdPrograms.admissions))
                                                        + (phdPrograms.male === '' ? 0 : parseInt(phdPrograms.male))
                                                        + (phdPrograms.female === '' ? 0 : parseInt(phdPrograms.female))
                                                        + (phdPrograms.others === '' ? 0 : parseInt(phdPrograms.others))
                                                    }
                                                    </th>
                                                </tr>




                                            </AuditTable>


                                        </Wrapper>

                                        <Wrapper title="33. Program wise Student-Demand & Student-Teacher Ratio" className='mt-3' input={studentRatio.input} fetchPreviousYears={true} allYearAAAData={allYearAAAData && allYearAAAData} tableToFetch={["schoolInfoTables", "studentRatio"]}>

                                            <NumberToTextField state={studentRatio} setState={setStudentRatio} setAutoSaveLoader={setAutoSaveLoader} autoSaveLoader={autoSaveLoader} label="[A] Student-Demand Ratio (Enter number of Programs)" isForm={true} classes='my-3'
                                                options={TableData.studentRatio.fieldOptions}>

                                                <AuditTable setAutoSaveLoader={setAutoSaveLoader} tableHead={TableData.studentRatio.auditHead}
                                                    tableChildHead={TableData.studentRatio.childHead} state={studentRatio}
                                                    setState={setStudentRatio} cellAsInput={false} editTitle=" Student-Demand Ratio" options={TableData.studentRatio.fieldOptions} />

                                            </NumberToTextField>

                                            <NumberToTextField state={teacherRatio} setState={setTeacherRatio} setAutoSaveLoader={setAutoSaveLoader} autoSaveLoader={autoSaveLoader} label="[B] Student-Teacher Ratio (Enter number of Programs)" isForm={true} classes='my-3' fetchPreviousYears={true} allYearAAAData={allYearAAAData && allYearAAAData} tableToFetch={['schoolInfoTables', 'teacherRatio']}
                                                options={TableData.teacherRatio.fieldOptions}>

                                                <AuditTable setAutoSaveLoader={setAutoSaveLoader} tableHead={TableData.teacherRatio.auditHead}
                                                    tableChildHead={TableData.teacherRatio.childHead} state={teacherRatio}
                                                    setState={setTeacherRatio} cellAsInput={false} editTitle="Student-Teacher Ratio" options={TableData.teacherRatio.fieldOptions} />

                                            </NumberToTextField>


                                        </Wrapper>

                                        <Wrapper title="34. Number of students awarded M.Phil. & Ph.D. Degree" className='mt-3' fetchPreviousYears={true} allYearAAAData={allYearAAAData && allYearAAAData} tableToFetch={['cellAsInputTables', 'mphilPhd']} state={mphilPhd} setState={setMphilPhd} >
                                            <AuditTable setAutoSaveLoader={setAutoSaveLoader} tableHead={["Degree", "Male", "Female", "Total"]}>

                                                <EditableTd state={mphilPhd} setState={setMphilPhd} keyName='phd' title='Ph.D.' tableName='mphilphd' />
                                                <EditableTd state={mphilPhd} setState={setMphilPhd} keyName='mphil' title='M.Phil.' tableName='mphilphd' />

                                            </AuditTable>
                                        </Wrapper>

                                        {/* //Director fetch details */}
                                        <Wrapper title="35. Exams Qualified (Number of students cleared Civil Services and Defense Services examinations, NET, SET, GATE and other competitive examinations)" className='mt-3' input={qualifiedExams.input} >

                                            <NumberToTextField state={qualifiedExams} setState={setQualifiedExams} setAutoSaveLoader={setAutoSaveLoader} autoSaveLoader={autoSaveLoader} label="Enter number of Student qualified exam" isForm={true} classes='my-3'
                                                options={TableData.QualifiedExams.fieldOptions}>

                                                <AuditTable setAutoSaveLoader={setAutoSaveLoader} tableHead={TableData.QualifiedExams.auditHead} fetchData={true}
                                                    fetchDetails={{ model: 'QualifiedExams', school: directorUser?.department }} tableChildHead={TableData.QualifiedExams.childHead} fetchFrom='director' stateHead={TableData.QualifiedExams.stateHead} state={qualifiedExams} setState={setQualifiedExams} isForm={true} editTitle='Qualified Exams'
                                                    options={TableData.QualifiedExams.fieldOptions} />

                                            </NumberToTextField>


                                        </Wrapper>


                                        {/* //Director fetch details */}
                                        <Wrapper title="36. Student progression / placement record: Number / percentage of students proceeded for higher studies Number / percentage of students placed" className='mt-3' >

                                            <NumberToTextField state={progression} setState={setProgression} setAutoSaveLoader={setAutoSaveLoader} autoSaveLoader={autoSaveLoader} label="Enter number of Student Progressions to Higher Education" isForm={true} classes='my-3'
                                                options={TableData.ProgressionToHE.fieldOptions}>

                                                <AuditTable setAutoSaveLoader={setAutoSaveLoader} tableHead={TableData.ProgressionToHE.auditHead} fetchData={true}
                                                    fetchDetails={{ model: 'ProgressionToHE', school: directorUser?.department }} tableChildHead={TableData.ProgressionToHE.childHead} fetchFrom='director' stateHead={TableData.ProgressionToHE.stateHead} state={progression} setState={setProgression} isForm={true} editTitle='Student Progression to Higher Education'
                                                    options={TableData.ProgressionToHE.fieldOptions} />

                                            </NumberToTextField>

                                            <p className='my-5'></p>

                                            <NumberToTextField state={placement} setState={setPlacement} setAutoSaveLoader={setAutoSaveLoader} autoSaveLoader={autoSaveLoader} label="Enter number of Students placed" isForm={true} classes='my-3'
                                                options={TableData.Placement.fieldOptions} qqq>

                                                <AuditTable setAutoSaveLoader={setAutoSaveLoader} tableHead={TableData.Placement.auditHead} fetchData={true}
                                                    fetchDetails={{ model: 'Placement', school: directorUser?.department }} tableChildHead={TableData.Placement.childHead} fetchFrom='director' stateHead={TableData.Placement.stateHead} state={placement} setState={setPlacement} isForm={true} editTitle='Student profile programme-wise at UG and PG'
                                                    options={TableData.Placement.fieldOptions} />

                                            </NumberToTextField>


                                        </Wrapper>

                                        <Wrapper title="37. Number of faculty who were awarded M.Phil., Ph.D., D.Sc. / D.Lit." className='mt-3' fetchPreviousYears={true} allYearAAAData={allYearAAAData && allYearAAAData} tableToFetch={['cellAsInputTables', 'facultyAwardsDegree']} state={facultyAwardsDegree} setState={setFacultyAwardsDegree} >
                                            <AuditTable setAutoSaveLoader={setAutoSaveLoader}
                                                tableHead={["M.Phil.", "Ph.D.", "D.Sc.", "D.Lit."]}>

                                                <tr>
                                                    <EditableTd state={facultyAwardsDegree} setState={setFacultyAwardsDegree} keyName='mphil' tableName='civil' />
                                                    <EditableTd state={facultyAwardsDegree} setState={setFacultyAwardsDegree} keyName='phd' tableName='civil' />
                                                    <EditableTd state={facultyAwardsDegree} setState={setFacultyAwardsDegree} keyName='dsc' tableName='civil' />
                                                    <EditableTd state={facultyAwardsDegree} setState={setFacultyAwardsDegree} keyName='dlit' tableName='civil' />

                                                </tr>




                                            </AuditTable>
                                        </Wrapper>

                                        <Wrapper title="38. Present details of School infrastructural & other facilities with regard of following activities : " className='mt-3'>
                                            <div>
                                                <RichText id="presentDetailsOfSchool"
                                                    setState={setschoolInfra}
                                                    state={schoolInfra}
                                                    note={schoolInfra.note}
                                                    fetchPreviousYears={true} allYearAAAData={allYearAAAData && allYearAAAData} tableToFetch={['richTextTables', 'schoolInfra']}
                                                />
                                            </div>
                                        </Wrapper>


                                        <Wrapper title="39. List the distinguished alumni of the School (maximum 10)" className='mt-3' input={alumniList.input} >

                                            <NumberToTextField state={alumniList} setState={setAlumniList} setAutoSaveLoader={setAutoSaveLoader} autoSaveLoader={autoSaveLoader} label="Enter number of Alumni" isForm={true} classes='my-3' fetchPreviousYears={true} allYearAAAData={allYearAAAData && allYearAAAData} tableToFetch={['schoolInfoTables', 'alumniList']}
                                                options={TableData.alumniList.fieldOptions}
                                            >
                                                <AuditTable setAutoSaveLoader={setAutoSaveLoader} tableHead={TableData.alumniList.auditHead}
                                                    tableChildHead={TableData.alumniList.childHead} state={alumniList}
                                                    setState={setAlumniList} cellAsInput={false}
                                                    options={TableData.alumniList.fieldOptions} />
                                            </NumberToTextField>

                                        </Wrapper>


                                        <Wrapper title="40. Alumni activities for the year and alumni contribution in rupees" className='mt-3' input={alumniActivities.input}>


                                            <NumberToTextField state={alumniActivities} setState={setAlumniActivities} setAutoSaveLoader={setAutoSaveLoader} autoSaveLoader={autoSaveLoader} label="Enter no of Alumni Activities" isForm={true} classes='my-3'
                                                options={TableData.alumniActivities.fieldOptions}
                                                fileKeyName="proof" tableWithProof={true} fetchPreviousYears={true} allYearAAAData={allYearAAAData && allYearAAAData} tableToFetch={['schoolInfoTables', 'alumniActivities']} >
                                                <AuditTable setAutoSaveLoader={setAutoSaveLoader} tableHead={TableData.alumniActivities.auditHead}
                                                    tableChildHead={TableData.alumniActivities.childHead} state={alumniActivities} setState={setAlumniActivities} cellAsInput={false}
                                                    options={TableData.alumniActivities.fieldOptions} editTitle='Alumni activities' />
                                            </NumberToTextField>

                                            <NumberToTextField state={alumniContribution} setState={setAlumniContribution} setAutoSaveLoader={setAutoSaveLoader} autoSaveLoader={autoSaveLoader} label="Enter number of Alumni Contributed" isForm={true} classes='my-3'
                                                options={TableData.AlumniContribution.fieldOptions}>

                                                <AuditTable setAutoSaveLoader={setAutoSaveLoader} tableHead={TableData.AlumniContribution.auditHead} fetchData={true}
                                                    fetchDetails={{ model: 'AlumniContribution', school: directorUser?.department }} tableChildHead={TableData.AlumniContribution.childHead} fetchFrom='director' stateHead={TableData.AlumniContribution.stateHead} state={alumniContribution} setState={setAlumniContribution} isForm={true} editTitle='Alumni Contribution'
                                                    options={TableData.AlumniContribution.fieldOptions} />

                                            </NumberToTextField>



                                        </Wrapper>


                                    </div> : null
                                }
                            </div>

                            {/* STEP 5 */}
                            <div>
                                {
                                    tabName === '5' ? <div>
                                        {/* //Director fetch details */}
                                        <Wrapper title="41. Extension activities in the neighborhood community in terms of impact and sensitizing students to social issues and holistic development" className='mt-3' input={extentionActivities.input} >

                                            <NumberToTextField state={extentionActivities} setState={setExtentionActivities} setAutoSaveLoader={setAutoSaveLoader} autoSaveLoader={autoSaveLoader} label="Enter number of Extension activities" isForm={true} classes='my-3'
                                                options={TableData.ExtensionActivities.fieldOptions}>

                                                <AuditTable setAutoSaveLoader={setAutoSaveLoader} tableHead={TableData.ExtensionActivities.auditHead} fetchData={true}
                                                    fetchDetails={{ model: 'ExtensionActivities', school: directorUser?.department }} tableChildHead={TableData.ExtensionActivities.childHead} fetchFrom='director' stateHead={TableData.ExtensionActivities.stateHead} state={extentionActivities} setState={setExtentionActivities} isForm={true} editTitle='Extension activities in the neighborhood community'
                                                    options={TableData.ExtensionActivities.fieldOptions} />

                                            </NumberToTextField>


                                        </Wrapper>

                                        <Wrapper title="42. Student Mentoring. Give details of the selected Academic Audit Year" className='mt-3' >
                                            <div>
                                                <RichText id="studentMonitor"
                                                    setState={setStudentMonitor}
                                                    state={studentMonitor}
                                                    fetchPreviousYears={true} allYearAAAData={allYearAAAData && allYearAAAData} tableToFetch={['richTextTables', 'studentMonitor']}
                                                />
                                            </div>
                                        </Wrapper>

                                        <Wrapper title="43. Activities programs related to Gender Equality, Green Campus, Constitutional
Values, Tolerance and Harmony for the selected Academic Audit Year" className='mt-3'>
                                            <div>
                                                <RichText id="greenCampus"
                                                    setState={setGreenCampus}
                                                    state={greenCampus}
                                                    fetchPreviousYears={true} allYearAAAData={allYearAAAData && allYearAAAData} tableToFetch={['richTextTables', 'greenCampus']}
                                                />
                                            </div>
                                        </Wrapper>

                                        <Wrapper title="44. Commemorative Events of regional, national and international importance for the selected Academic Audit Year" className='mt-3'>
                                            <div>
                                                <RichText id="commemorative"
                                                    setState={setCommemorative}
                                                    state={commemorative}
                                                    fetchPreviousYears={true} allYearAAAData={allYearAAAData && allYearAAAData} tableToFetch={['richTextTables', 'commemorative']}
                                                />
                                            </div>
                                        </Wrapper>

                                        <Wrapper title="45. Give details of student enrichment programmes (special lectures / workshops / seminar) involving external experts." className='mt-3'>
                                            <div>
                                                <RichText id="studentEnrichment"
                                                    setState={setStudentEnrichment}
                                                    state={studentEnrichment}
                                                    fetchPreviousYears={true} allYearAAAData={allYearAAAData && allYearAAAData} tableToFetch={['richTextTables', 'studentEnrichment']}
                                                />
                                            </div>
                                        </Wrapper>

                                        <Wrapper title="46. How does the School ensure that programme objectives are constantly met and learning outcomes are monitored? Explain." className='mt-3'>
                                            <div>
                                                <RichText id="programObjectives"
                                                    setState={setProgramObjectives}
                                                    state={programObjectives}
                                                    fetchPreviousYears={true} allYearAAAData={allYearAAAData && allYearAAAData} tableToFetch={['richTextTables', 'programObjectives']}
                                                />
                                            </div>
                                        </Wrapper>

                                        <Wrapper title="47. Highlight the unique features and innovative practices of the School." className='mt-3'>
                                            <div>
                                                <RichText id="schoolFeatures"
                                                    setState={setSchoolFeatures}
                                                    state={schoolFeatures}
                                                    fetchPreviousYears={true} allYearAAAData={allYearAAAData && allYearAAAData} tableToFetch={['richTextTables', 'schoolFeatures']}
                                                />
                                            </div>
                                        </Wrapper>

                                        {/* Upload proof */}
                                        <Wrapper title="48. School Advisory Board" className='mt-3' input={sabMember.input}>

                                            <NumberToTextField state={sabMember} setState={setSabMember} setAutoSaveLoader={setAutoSaveLoader} autoSaveLoader={autoSaveLoader} label="Enter number of Members" isForm={true} classes='my-3'
                                                options={TableData.sabMember.fieldOptions}
                                                fetchPreviousYears={true} allYearAAAData={allYearAAAData && allYearAAAData} tableToFetch={['schoolInfoTables', 'sabMember']} >
                                                <AuditTable setAutoSaveLoader={setAutoSaveLoader} tableHead={TableData.sabMember.auditHead}
                                                    tableChildHead={TableData.sabMember.childHead} state={sabMember}
                                                    setState={setSabMember} cellAsInput={false}
                                                    options={TableData.sabMember.fieldOptions} editTitle='Board Members' />
                                            </NumberToTextField>

                                            <NumberToTextField state={meetingDetails} setState={setMeetingDetails} setAutoSaveLoader={setAutoSaveLoader} autoSaveLoader={autoSaveLoader} label="Meeting Details" isForm={true} classes='my-3'
                                                options={TableData.meetingDetails.fieldOptions}
                                                fileKeyName="proof" tableWithProof={true}
                                                fetchPreviousYears={true} allYearAAAData={allYearAAAData && allYearAAAData} tableToFetch={['fileFeedback', 'meetingDetails']}
                                            >
                                                <AuditTable setAutoSaveLoader={setAutoSaveLoader} tableHead={TableData.meetingDetails.auditHead}
                                                    tableChildHead={TableData.meetingDetails.childHead} state={meetingDetails} setState={setMeetingDetails} cellAsInput={false}
                                                    options={TableData.meetingDetails.fieldOptions} editTitle='Meeting Details' />
                                            </NumberToTextField>



                                        </Wrapper>


                                        <Wrapper title="49. Detail five major Strengths, Weaknesses, Opportunities and Challenges (SWOC) of the School" className='mt-3'>
                                            <div className="my-5">
                                                <p className='my-2'>School Strengths</p>
                                                <RichText id="schoolStrength"
                                                    setState={setSchoolStrength}
                                                    state={schoolStrength}
                                                    fetchPreviousYears={true} allYearAAAData={allYearAAAData && allYearAAAData} tableToFetch={['richTextTables', 'schoolStrength']}
                                                />
                                            </div>
                                            <div className="my-5">
                                                <p className='my-2'>School Weaknesses</p>
                                                <RichText id="schoolWeakness"
                                                    setState={setSchoolWeakness}
                                                    state={schoolWeakness}
                                                    fetchPreviousYears={true} allYearAAAData={allYearAAAData && allYearAAAData} tableToFetch={['richTextTables', 'schoolWeakness']}
                                                />
                                            </div>
                                            <div className="my-5">
                                                <p className='my-2'>School Opportunities</p>
                                                <RichText id="schoolOppos"
                                                    setState={setSchoolOppos}
                                                    state={schoolOppos}
                                                    fetchPreviousYears={true} allYearAAAData={allYearAAAData && allYearAAAData} tableToFetch={['richTextTables', 'schoolOppos']}
                                                />
                                            </div>
                                            <div className="my-5">
                                                <p className='my-2'>School Challenges</p>
                                                <RichText id="schoolChallenges"
                                                    setState={setSchoolChallenges}
                                                    state={schoolChallenges}
                                                    fetchPreviousYears={true} allYearAAAData={allYearAAAData && allYearAAAData} tableToFetch={['richTextTables', 'schoolChallenges']}
                                                />
                                            </div>
                                        </Wrapper>

                                        <Wrapper title="50. Future plans of the School" className='mt-3' input={futurePlans.pureHTML}>
                                            <div>
                                                <RichText id="futurePlans"
                                                    setState={setFuturePlans}
                                                    note={futurePlans.note}
                                                    state={futurePlans}
                                                    fetchPreviousYears={true} allYearAAAData={allYearAAAData && allYearAAAData} tableToFetch={['richTextTables', 'futurePlans']}
                                                />
                                            </div>
                                        </Wrapper>
                                    </div> : null
                                }
                            </div>

                            <div className='flex items-center justify-start gap-5'>
                                <SaveButton title={tabName === '5' ? "Save & Submit AAA Form" : "Save & Proceed"} onClickFunction={() => {
                                    handleSteps(); setAutoSaveLoader(true);
                                    if (tabName === '5') {
                                        submitForm()
                                    }
                                }} />

                                <Pagination count={5} page={parseInt(tabName)} onChange={handleChange} />

                            </div>




                        </div>


                    </div>

                    :
                    <div className="w-full h-screen ">
                        <div className='flex items-center justify-center h-1/2'>
                            <CircularProgress />
                        </div>
                    </div>

            }

        </>

    )
}


export default InformationHome


const EditableTd = ({ setState, title, state, keyName, tableName = 'program' }) => {
    return (
        tableName === 'program' ?
            <tr >
                <th scope="row">{title}</th>
                <td className='p-1'>
                    <input type="number"
                        className='p-2 w-full m-0 outline-2 outline-indigo-200 border-2 hover:border-blue-100 rounded-md'
                        value={state[keyName].sanctioned ? state[keyName].sanctioned : ''}
                        onChange={((e) => { setState({ ...state, [keyName]: { ...state[keyName], sanctioned: e.target.value } }) })} />
                </td>
                <td className='p-1'>
                    <input type="number"
                        className='p-2 w-full m-0 outline-2 outline-indigo-200 border-2 hover:border-blue-100 rounded-md'
                        value={state[keyName].filled ? state[keyName].filled : ''}
                        onChange={((e) => { setState({ ...state, [keyName]: { ...state[keyName], filled: e.target.value } }) })} />
                </td>
                <td className='p-1'>
                    <input type="number"
                        className='p-2 w-full outline-2 outline-indigo-200 border-2 hover:border-blue-100 rounded-md'
                        value={state[keyName].cas ? state[keyName].cas : ''}
                        onChange={((e) => { setState({ ...state, [keyName]: { ...state[keyName], cas: e.target.value } }) })} />
                </td>

            </tr>
            : tableName === 'civil' ?

                <td className='p-1'>
                    <input type="number"
                        className='p-2 w-full m-0 outline-2 outline-indigo-200 border-2 hover:border-blue-100 rounded-md'
                        value={state[keyName]}
                        onChange={((e) => { setState({ ...state, [keyName]: e.target.value }) })} />
                </td>

                : tableName === 'mphilphd' ?
                    <tr >
                        <th scope="row">{title}</th>
                        <td className='p-1'>
                            <input type="number"
                                className='p-2 w-full m-0 outline-2 outline-indigo-200 border-2 hover:border-blue-100 rounded-md'
                                value={state[keyName].male}
                                onChange={((e) => { setState({ ...state, [keyName]: { ...state[keyName], male: e.target.value } }) })} />
                        </td>
                        <td className='p-1'>
                            <input type="number"
                                className='p-2 w-full m-0 outline-2 outline-indigo-200 border-2 hover:border-blue-100 rounded-md'
                                value={state[keyName].female}
                                onChange={((e) => { setState({ ...state, [keyName]: { ...state[keyName], female: e.target.value } }) })} />
                        </td>

                        <th scope="row">{(state[keyName].male === '' ? 0 : parseInt(state[keyName].male)) + (state[keyName].female === '' ? 0 : parseInt(state[keyName].female))}</th>


                    </tr> : null



    )
}

export { EditableTd }


const FeedbackCheck = ({ setState, state, keyName, title, id }) => {

    const deleteFeedbackFile = () => {
        var answer = window.confirm("Are you sure you want to delete this file ?");
        if (answer) {
            setState({ ...state, uploadedFiles: { ...state.uploadedFiles, [keyName]: null } })
            toast.success('File deleted successfully.')
        }
        else {
            return
        }
    }
    return (
        <div className='bg-blue-50 rounded-xl p-3 my-2'>
            <div>
                <div className="form-check">
                    <input className="form-check-input text-base cursor-pointer" type="checkbox" id={id}
                        onChange={(e) => { setState({ ...state, [keyName]: { ...state[keyName], checked: e.target.checked } }) }} checked={state[keyName]?.checked} />

                    <label className="form-check-label text-base cursor-pointer" htmlFor={id}>
                        <div>
                            {title}
                        </div>
                    </label>
                </div>
                <div>
                    {state?.uploadedFiles && state?.uploadedFiles[keyName] ?
                        <div className='text-green-700 bg-green-100 rounded-xxl text-sm p-1 flex items-center justify-between'>
                            <FileViewer fileName={state?.uploadedFiles[keyName][0].filename} serviceName="AAA" />
                            <IconButton onClick={deleteFeedbackFile}>
                                <CloseRoundedIcon fontSize='10' />
                            </IconButton>
                        </div>
                        : null}
                </div>
            </div>

            {
                state[keyName]?.checked &&
                <div className="bg-white p-3 rounded-xl mt-3">
                    <div className="mb-3">
                        <label for={`formFile-${id}`} className="form-label">Upload Analysis & Action taken Report</label>
                        <input className="form-control" type="file" id={`formFile-${id}`} onChange={(e) => { setState({ ...state, [keyName]: { ...state[keyName], input: e.target.files[0], } }) }} />
                    </div>
                </div>
            }



        </div>
    )
}


