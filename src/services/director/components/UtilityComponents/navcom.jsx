import DirectorMainTable from './DirectorMainTable';
import StudentInformation from './StudentInformation';

const navcom = {
    SyllabusRevision: {
        element: <DirectorMainTable model='SyllabusRevision' />,
        instruction: [
            "1.1.2 Percentage of programmes where syllabus revision was carried out during the last five years (20)",
            "1.2.2 Percentage of programs in which Choice Based Credit System (CBCS)/elective course system has been implemented (20)"
        ],
    },
    Employability: {
        element: <DirectorMainTable model="Employability" />,
        instruction: [
            "1.1.3 Average percentage of courses having focus on employability/ entrepreneurship/ skill development during the last five years (10)",
            "1.2.1 Percentage of new courses introduced of the total number of courses across all programmes offered during the last five years (30)"
        ],
    },
    ValueAddedCource: {
        element: <DirectorMainTable model="ValueAddedCource" />,
        instruction: [
            "1.3.2 Number of value-added courses for imparting transferable and life skills offered during last five years  (10)",
            "1.3.3 Average Percentage of students enrolled in the courses under 1.3.2 above (10)"
        ],
    },
    ProjectsInternships: {
        element: <DirectorMainTable model="ProjectsInternships" />,
        instruction: [
            "1.3.4 Percentage  of students undertaking field projects / research projects / internships (Data for the latest completed  academic year)(5)",
            "1.3.4.1:Number of students undertaking field project or research projects or internships"
        ],
    },
    DemandRatio: {
        element: <DirectorMainTable model="DemandRatio" extraInitialFilds={{ otherUser: { $ne: "PG" } }} />,
        instruction: [
            "2.1.1 Demand Ratio  (Average of Last five years) (5)",
            "2.1.1.1: Number of seats available year wise during the last five years"
        ],
    },
    ReservedSeats: {
        element: <DirectorMainTable model="ReservedSeats" />,
        instruction: [
            "2.1.2 Average percentage of seats filled  against seats reserved for various categories as per applicable  reservation policy during the last five years.(Excluding Supernumerary",
            "2.1.2.1: Number of actual students admitted from the reserved categories year wise during the last five years "
        ],
    },
    StudentSatisfactionSurvey: {
        element: <DirectorMainTable model="StudentSatisfactionSurvey" />,
        instruction: [
            "2.7 Student Satisfaction Survey (30)",
            "2.7.1 Online student satisfaction survey regarding teaching learning process. (30)"
        ],
    },
    UgcSapCasDstFistDBTICSSR: {
        element: <DirectorMainTable model="UgcSapCasDstFistDBTICSSR" />,
        instruction: [
            "3.1.6 Percentage of departments with UGC-SAP, CAS, DST-FIST, DBT, ICSSR  and other recognitions by  national and international  agencies (Data only for the latest completed",
            "3.2.1 Extramural funding for Research (Grants sponsored by the non-government sources such as industry, corporate houses, international bodies for research projects) endowments, Chairs in the University during the last five years (INR in Lakhs) (5)",
            "3.2.2 Grants  for research projects sponsored by the government agencies during the last five years (INR in Lakhs) (10)",
            "3.2.3 Number of research projects per teacher funded by government and  non-government agencies during the last five years (5)"
        ],
    },
    ResearchMethodologyWorkshops: {
        element: <DirectorMainTable model='ResearchMethodologyWorkshops' />,
        instruction: [
            "3.3.2 Number of workshops/seminars conducted on Research methodology, Intellectual Property Rights (IPR),entrepreneurship, skill development during the last five years",
            "3.3.2 Number of workshops/seminars conducted on Research methodology, Intellectual Property Rights (IPR),entrepreneurship, skill development during the last five years(10)"
        ],
    },
    Award: {
        element: <DirectorMainTable model='Award' />,
        instruction: [
            "3.3.3 Number of awards / recognitions received for research/innovations  by the institution/teachers/research scholars/students during the last five years (10)",
            "3.3.3.1: Total number of awards / recognitions received for research/ innovations  won by institution/teachers/research scholars/students year wise during the last five years"
        ],
    },
    ExtensionActivities: {
        element: <DirectorMainTable model="ExtensionActivities" />,
        instruction: [
            "3.6. 3 Number of extension and outreach programs conducted  by the institution through NSS/NCC/Red cross/YRC etc. during the last five years ( including  Government initiated programs such as Swachh Bharat, Aids Awareness, Gender Issue, etc. and those organised in collaboration with industry, community and NGOs) (12)",
            "3.6.4 Average percentage of students participating in extension activities listed at 3.6.3 above during the last five years(12) "
        ],
    },
    MoUs: {
        element: <DirectorMainTable model="MoUs" />,
        instruction: [
            "3.7.2 Number of functional MoUs with institutions/ industries  in India and abroad for internship, on-the-job training, project work, student / faculty exchange and  collaborative research  during the last five years (10)",
            "3.7.2.1: Number of functional MoUs with institutions/ industries  in India and abroad for internship, on-the-job training, project work, student / faculty exchange and  collaborative research  during the last five years"
        ],
    },
    IctClassrooms: {
        element: <DirectorMainTable model="IctClassrooms" />,
        instruction: [
            "4.3.1 Percentage of classrooms and seminar halls with ICT - enabled facilities  such as  LCD, smart board, Wi-Fi/LAN, audio video recording facilities .(Data only for the latest completed academic year) (5)"
        ],
    },
    CounselingAndGuidance: {
        element: <DirectorMainTable model="CounselingAndGuidance" extraInitialFilds={{ otherUser: { $ne: "Placement" } }} />,
        instruction: [
            "5.1.2 Average percentage of students benefited by career counseling and guidance for competitive examinations offered by the Institution during the last five years"
        ],
    },
    SkillsEnhancementInitiatives: {
        element: <DirectorMainTable model="SkillsEnhancementInitiatives" />,
        instruction: [
            "5.1.3 Following Capacity  development and skills enhancement initiatives are taken by the institution (5)",
            "1. Soft skills, 2. Language and communication skills, 3. Life skills (Yoga, physical fitness, health and hygiene), 4. Awareness of trends in technology"
        ],
    },
    QualifiedExams: {
        element: <DirectorMainTable model="QualifiedExams" />,
        instruction: [
            "5.2.1 Average percentage of students qualifying in state/ national/ international level examinations during the last five years (eg:NET/SLET/GATE/GMAT/CAT/GRE/JAM/IELTS/TOEFL/Civil Services/State government examinations)(10)"
        ],
    },
    Placement: {
        element: <DirectorMainTable model="Placement" />,
        instruction: [
            "5.2.2 Average percentage of placement of outgoing students during the last five years (15)"
        ],

    },
    ProgressionToHE: {
        element: <DirectorMainTable model="ProgressionToHE" extraInitialFilds={{ otherUser: { $nin: ["PG", "Placement"] } }} />,
        instruction: [
            "5.2.3 Percentage of recently graduated students who have progressed to higher education (previous graduating batch)(15)"
        ],

    },
    TrainingProgramsOrganized: {
        element: <DirectorMainTable model="TrainingProgramsOrganized" />,
        instruction: [
            "6.3.3 Average number of professional development / administrative training  programs organized  by the institution for teaching and non teaching staff during the last five years (8)"
        ],

    },
    ConferencesSemiWorkshopOrganized: {
        element: <DirectorMainTable model="ConferencesSemiWorkshopOrganized" />,
        instruction: [],

    },
    AlumniContribution: {
        element: <DirectorMainTable model="AlumniContribution" />,
        instruction: [],

    },
    StudentInformation: {
        element: <StudentInformation />,
        instruction: [],
    },
    CourceInAllProgram: {
        element: <DirectorMainTable model="CourceInAllProgram" />,
        instruction: []
    },
    NewPrograms: {
        element: <DirectorMainTable model="NewPrograms" />,
        instruction: []
    }
}


export default navcom;
