import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SchoolIcon from '@mui/icons-material/School';
import SearchIcon from '@mui/icons-material/Search';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import SchoolsProgram from '../../../components/SchoolsProgram';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import { yearArray } from '../components/FormComponents/YearPicker';
import Lists from '../../../components/tableComponents/Lists';
import allTableHeads from '../../admin/js/allTableHeads';

const years = yearArray();
const allSchools = Object.keys(SchoolsProgram)

const directorTables = {
    SyllabusRevision: {
        title: 'Syllabus Revision',
        typeObject: { SchoolName: allSchools, Programme_Code: "text", Programme_Name: 'programs', Academic_Year: 'academicYears', Year_of_Introduction: years, Status_of_implementation: Lists.cbcsEcs, Year_of_Implimentation: years, Year_of_Revision: years, Percentage_of_content_added_or_replaced: "number", Proof: "proof" },
        tableHead: allTableHeads.SyllabusRevision,
        year: "Academic_Year",
        icon: <AutoStoriesIcon style={{ fontSize: '18px', color: "#1E3A8A" }} />
    },

    Employability: {
        title: 'Courses focusing employability / entrepreneurship / skill development',
        typeObject: { SchoolName: allSchools, Program_Name: 'programs', Course_Code: "text", Name_of_the_Course: "text", Academic_Year: 'academicYears', Year_of_introduction: years, Activities_Content_with_direct_bearing_on_Employability_Entrepreneurship_Skill_development: "text", Proof: "proof" },
        tableHead: allTableHeads.Employability,
        year: "Academic_Year",
        icon: <AccessibilityIcon style={{ fontSize: '18px', color: "#1E3A8A" }} />
    },

    ValueAddedCource: {
        title: 'Value Added Courses',
        typeObject: { SchoolName: allSchools, Program_Name: 'programs', Name_of_the_value_added_courses_offered: "text", Course_Code_if_any: "text", Academic_year: 'academicYears', Year_of_offering: years, No_of_times_offered_during_the_same_year: "number", Duration_of_the_course: "number", Number_of_students_enrolled: "number", Number_of_Students_completing_the_course: "number", Proof: "proof" },
        tableHead: allTableHeads.ValueAddedCource,
        year: "Academic_year",
        icon: <WorkspacePremiumIcon style={{ fontSize: '18px', color: "#1E3A8A" }} />
    },

    ProjectsInternships: {
        title: 'Projects / Internships',
        typeObject: { SchoolName: allSchools, Programme_Code: "text", Programme_name: 'programs', Name_of_the_student: "text", Academic_Year: 'academicYears', Proof: "proof" },
        tableHead: allTableHeads.ProjectsInternships,
        year: "Academic_Year",
        icon: <CreateNewFolderIcon style={{ fontSize: '18px', color: "#1E3A8A" }} />
    },

    DemandRatio: {
        title: 'Demand Ratio',
        typeObject: { SchoolName: allSchools, Programme_Code: "text", Programme_name: 'programs', Academic_Year: 'academicYears', Type_of_program: Lists.typeOfProgram, Number_of_seats_available: "number", Number_of_eligible_applications: "number", Number_of_Students_admitted: "number", Proof: "proof" },
        tableHead: allTableHeads.DemandRatio,
        year: "Academic_Year",
        icon: <TrendingUpIcon style={{ fontSize: '18px', color: "#1E3A8A" }} />
    },

    ReservedSeats: {
        title: 'Reserved Seats',
        typeObject: { SchoolName: allSchools, Academic_Year: 'academicYears', Program_Name: 'programs', NseSC: "number", NseST: "number", NseOBC: "number", NseDivyngjan: "number", NseGeneral: "number", NseOthers: "number", NsaSC: "number", NsaST: "number", NsaOBC: "number", NsaDivyngjan: "number", NsaGeneral: "number", NsaOthers: "number", Proof: "proof" },
        tableHead: allTableHeads.ReservedSeats,
        year: "Academic_Year",
        icon: <AirlineSeatReclineNormalIcon style={{ fontSize: '18px', color: "#1E3A8A" }} />
    },

    StudentSatisfactionSurvey: {
        title: 'Student Satisfaction Survey',
        typeObject: { SchoolName: allSchools, Name_of_the_student: "text", Year_of_joining: 'academicYears', Category: Lists.SSSCategory, State_of_Domicile: "text", Nationality: Lists.countrys, Email_ID: "text", Programme_name: 'programs', Student_Unique_Enrolment_ID: "text", Mobile_Number: "number", Gender: Lists.gender, Proof: "proof" },
        tableHead: allTableHeads.StudentSatisfactionSurvey,
        year: "Year_of_joining",
        icon: <SchoolIcon style={{ fontSize: '18px', color: "#1E3A8A" }} />
    },

    UgcSapCasDstFistDBTICSSR: {
        title: 'UGC-SAP, CAS, DST-FIST, DBT, ICSSR',
        typeObject: { SchoolName: allSchools, Name_of_the_Scheme_Project_Endowments_Chairs: "text", Name_of_the_Principal_Investigator_Co_Investigator: "text", Name_of_the_Funding_agency: "text", Type_of_Agency: Lists.reserchProjectIsGov, Name_of_Department: allSchools, Year_of_Award: 'academicYears', Funds_provided_in_lakhs: "number", Duration_of_the_project_in_Years: "number", Proof: "proof" },
        tableHead: allTableHeads.UgcSapCasDstFistDBTICSSR,
        year: "Year_of_Award",
        icon: <ContentPasteIcon style={{ fontSize: '18px', color: "#1E3A8A" }} />
    },

    ResearchMethodologyWorkshops: {
        title: 'Research Methodology Workshops',
        typeObject: { SchoolName: allSchools, Name_of_the_workshop_seminar: "text", Number_of_Participants: "number", year: 'academicYears', From_Date: "date", To_Date: "date", Proof: 'proof' },
        tableHead: allTableHeads.ResearchMethodologyWorkshops,
        year: "year",
        icon: <SearchIcon style={{ fontSize: '18px', color: "#1E3A8A" }} />
    },

    Award: {
        title: 'Awards',
        typeObject: {
            SchoolName: allSchools, Title_of_the_innovation: "text", Name_of_the_Award: "text", Year_of_Award: 'academicYears', Name_of_the_Awarding_Agency: "text", Contact_details_Agency: "text", Category: Lists.Cate, Proof: 'proof'
        },
        tableHead: allTableHeads.Award,
        year: "Year_of_Award",
        icon: <EmojiEventsIcon style={{ fontSize: '18px', color: "#1E3A8A" }} />
    },

    ExtensionActivities: {
        title: 'Extension Activities',
        typeObject: { SchoolName: allSchools, Name_of_the_activity: "text", Organising_unit: "text", Name_of_the_scheme: "text", Year_of_activity: 'academicYears', Number_of_students: "number", Proof: 'proof' },
        tableHead: allTableHeads.ExtensionActivities,
        year: "Year_of_activity",
        icon: <AssignmentIcon style={{ fontSize: '18px', color: "#1E3A8A" }} />
    },

    MoUs: {
        title: 'MoUs',
        typeObject: { SchoolName: allSchools, Name_of_Organisation_with_whome_mou_signed: "text", Duration_of_MoU: "text", Year_of_signing_MoU: 'academicYears', Proof: "proof" },
        tableHead: allTableHeads.MoUs,
        year: "Year_of_signing_MoU",
        icon: <Diversity3Icon style={{ fontSize: '18px', color: "#1E3A8A" }} />
    },

    IctClassrooms: {
        title: 'ICT Classrooms',
        typeObject: { SchoolName: allSchools, Room_number_or_Name_of_Classrooms: "text", Type_of_ICT_facility: "text", academicYear: 'academicYears', Proof: "proof" },
        tableHead: allTableHeads.IctClassrooms,
        year: "academicYear",
        icon: <CoPresentIcon style={{ fontSize: '18px', color: "#1E3A8A" }} />
    },

    CounselingAndGuidance: {
        title: 'Counseling And Guidance',
        typeObject: { SchoolName: allSchools, activityType: Lists.counselingActivities, Name_of_the_Activity_conducted_by_the_HEI: "text", Number_of_Students_Attended: "number", Year_of_Activity: 'academicYears', Proof: "proof" },
        tableHead: allTableHeads.CounselingAndGuidance,
        year: "Year_of_Activity",
        icon: <Diversity3Icon style={{ fontSize: '18px', color: "#1E3A8A" }} />
    },

    SkillsEnhancementInitiatives: {
        title: 'Skills Enhancement Initiatives',
        typeObject: { SchoolName: allSchools, Name_of_the_capacity_development_schemes: "text", Academic_Year: 'academicYears', Date_of_implementation: "date", Number_of_students_enrolled: "number", Proof: "proof" },
        tableHead: allTableHeads.SkillsEnhancementInitiatives,
        year: "Academic_Year",
        icon: <WorkspacePremiumIcon style={{ fontSize: '18px', color: "#1E3A8A" }} />
    },

    QualifiedExams: {
        title: 'Qualified Exams',
        typeObject: { SchoolName: allSchools, Registration_number_roll_number: "text", Names_of_students_selected_qualified: "text", Name_of_the_Exam: Lists.exams, Acadmic_year: 'academicYears', Proof: "proof" },
        tableHead: allTableHeads.QualifiedExams,
        year: "Acadmic_year",
        icon: <SchoolIcon style={{ fontSize: '18px', color: "#1E3A8A" }} />
    },

    Placement: {
        title: 'Placements',
        typeObject: { SchoolName: allSchools, Name_of_student_placed: "text", Program_graduated_from: 'programs', Name_of_the_employer: "text", Employer_contact_details: "text", Pay_package_annum: "number", Academic_Year: 'academicYears', Type_Of_Placement: Lists.typesOfPlacements, Proof: "proof" },
        tableHead: allTableHeads.Placement,
        year: "Academic_Year",
        icon: <SchoolIcon style={{ fontSize: '18px', color: "#1E3A8A" }} />
    },

    ProgressionToHE: {
        title: 'Progression To HE',
        typeObject: { SchoolName: allSchools, Name_of_student_enrolling: "text", Program_graduated_from: 'programs', Name_of_institution_admitted: "text", Name_of_programme_admitted: "text", Academic_Year: 'academicYears', Proof: "proof" },
        tableHead: allTableHeads.ProgressionToHE,
        year: "Academic_Year",
        icon: <Diversity3Icon style={{ fontSize: '18px', color: "#1E3A8A" }} />
    },

    TrainingProgramsOrganized: {
        title: 'Professional Development / Administrative Training Programs Organized',
        typeObject: { SchoolName: allSchools, Year: 'academicYears', From_Date: "date", To_Date: "date", Title_Of_the_Program: "text", Type_of_staff: Lists.StaffType, Number_of_Participants: "number", Proof: "proof" },
        tableHead: allTableHeads.TrainingProgramsOrganized,
        year: "Year",
        icon: <SavedSearchIcon style={{ fontSize: '18px', color: "#1E3A8A" }} />
    },

    ConferencesSemiWorkshopOrganized: {
        title: 'Conferences / Seminar / Workshop Organized',
        typeObject: { SchoolName: allSchools, Year: 'academicYears', fundedBy: "text", From_Date: "date", To_Date: "date", Title_Of_the_Program: "text", Level_of_program: Lists.ConferenceOrganisedIsNational, Number_of_Participants: "number", Proof: "proof" },
        tableHead: allTableHeads.ConferencesSemiWorkshopOrganized,
        year: "Year",
        icon: <SavedSearchIcon style={{ fontSize: '18px', color: "#1E3A8A" }} />
    },

    AlumniContribution: {
        title: 'Alumni Contribution',
        typeObject: { SchoolName: allSchools, Name_of_The_Alumni_Contributed: "text", Program_graduated_from: 'programs', Amount_of_contribution: "number", Academic_Year: 'academicYears', Proof: "proof" },
        tableHead: allTableHeads.AlumniContribution,
        year: "Academic_Year",
        icon: <AccountBalanceWalletIcon style={{ fontSize: '18px', color: "#1E3A8A" }} />
    },
    StudentInformation: {
        title: 'Student Information',
        icon: <GroupsRoundedIcon style={{ fontSize: '18px', color: "#1E3A8A" }} />
    },
    CourceInAllProgram: {
        title: 'Courses In All Programs',
        typeObject: { SchoolName: allSchools, programName: "text", programCode: "text", courseName: "text", courseCode: "text", academicYear: 'academicYears' },
        tableHead: allTableHeads.CourceInAllProgram,
        year: "academicYear",
        icon: <LibraryAddIcon style={{ fontSize: '18px', color: "#1E3A8A" }} />
    },

    NewPrograms: {
        title: 'New Programs',
        typeObject: { SchoolName: allSchools, programCode: "text", programName: "text", academicYear: 'academicYears' },
        tableHead: allTableHeads.NewPrograms,
        year: "academicYear",
        icon: <ImportContactsIcon style={{ fontSize: '18px', color: "#1E3A8A" }} />
    },
}

export default directorTables

export { years }