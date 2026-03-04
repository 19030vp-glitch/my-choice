import React, { useEffect, useState } from 'react'
import MainTable from './MainTable';
import { academicYearGenerator } from '../inputs/Year';
import allTableHeads from '../services/admin/js/allTableHeads';
import Lists from './tableComponents/Lists';
import directorTables from '../services/director/js/directorTables';
import { modifyObject } from '../services/director/components/UtilityComponents/DirectorMainTable';
import { modifyObject as modifyObjectFaculty } from '../services/faculty/components/FacultyMainTable';


const otherTables = {
    //IIL
    IilCollaborativeActivities: {
        title: "Collaborative Activities with other Institutions",
        typeObject: { titleOfActivity: "text", nameOfAgency: "text", nameOfParticipant: "text", duration: "text", natureOfActivity: "text", academicYear: "academicYears", Proof: "proof" },
        year: 'academicYear',
        tableHead: allTableHeads.IilCollaborativeActivities,
        proof: "Proof",
        serviceName: "iil",
        folder: "iil",
    },

    IilRevenueConsultancy: {
        title: "Revenue generated from consultancy",
        typeObject: { nameOfConsultant: "text", nameOfConsultancyProject: "text", agencyName: "text", revenueGenerated: "number", academicYear: "academicYears", Proof: "proof" },
        year: 'academicYear',
        tableHead: allTableHeads.IilRevenueConsultancy,
        proof: "Proof",
        serviceName: "iil",
        folder: "iil",
    },

    IilRevenueCorporateTraining: {
        title: "Revenue generated from corporate training",
        typeObject: { nameOfCorporate: "text", nameOfCorporateProgram: "text", agencyName: "text", revenueGenerated: "number", numberOfTrainees: "number", academicYear: "academicYears", Proof: "proof" },
        year: 'academicYear',
        tableHead: allTableHeads.IilRevenueCorporateTraining,
        proof: "Proof",
        serviceName: "iil",
        folder: "iil",
    },

    ResearchMethodologyWorkshops: {
        ...directorTables.ResearchMethodologyWorkshops,
         proof: "Upload_Proof",
         serviceName: 'director',
         folder: 'director',
     },
     
     MoUs: {
        ...directorTables.MoUs,
         proof: "Upload_Proof",
         serviceName: 'director',
         folder: 'director',
     },
     
     Award: {
        ...directorTables.Award,
         proof: "Upload_Proof",
         serviceName: 'director',
         folder: 'director',
     },

    //EXAM
    DateOfResultDiclaration: {
        title: "Date Of Result Declaration",
        typeObject: { programmeName: "text", programmeCode: "text", lastDate: "date", diclarationDate: "date", academicYear: "academicYears", },
        year: 'academicYear',
        tableHead: allTableHeads.DateOfResultDiclaration,
        serviceName: "exam",
        folder: "exam",
    },

    ExamPassedDuringYear: {
        title: "Students Passed During The Year",
        typeObject: { programCode: "text", programName: "text", studentsAppeared: "number", studentsPassed: "number", academicYear: "academicYears", },
        year: 'academicYear',
        tableHead: allTableHeads.ExamPassedDuringYear,
        serviceName: "exam",
        folder: "exam",
    },

    StudentComplaintsGrievances: {
        title: "Student Complaints Grievances",
        typeObject: { noOfStudents: "number", noOfGrievances: "number", academicYear: "academicYears", },
        year: 'academicYear',
        tableHead: allTableHeads.StudentComplaintsGrievances,
        serviceName: "exam",
        folder: "exam",
    },

    // DSD / Sports
    DSDSports: {
        title: "Awards / Medals achieved by Students",
        typeObject: {
            nameOfAward: "text", teamIndividual: Lists.teamIndividual, isNat: Lists.dsdIsNat, nameOfEvent: "text", nameOfStudnt: "text", academicYear: "academicYears", Proof: 'proof'
        },
        year: 'academicYear',
        tableHead: allTableHeads.DSDSports,
        proof: "proof",
        serviceName: 'dsd',
        folder: 'dsd',
    },

    SportsAndCulturalEvents: {
        title: "Information of Sports And Cultural Event",
        typeObject: {
            dateOfEvent: "date", nameOfEvent: "text", academicYear: "academicYears", Proof: 'proof'
        },
        year: 'academicYear',
        tableHead: allTableHeads.SportsAndCulturalEvents,
        proof: "proof",
        serviceName: 'dsd',
        folder: 'dsd',
    },

    //Estt
    EsttFullTimeTeacher: {
        title: "Full Time Teachers",
        typeObject: {
            name: "text", idNumber: "text", email: "text", gender: "text", designation: "text", natureOfPost: Lists.esttNature, dateOfJoining: "date", academicYear: "academicYears"
        },
        year: 'academicYear',
        tableHead: allTableHeads.EsttFullTimeTeacher,
        proof: "proof",
        serviceName: 'estt',
        folder: 'establishment',
    },

    EsttFullTimeTeacherAgainstSanctioned: {
        title: "Full Time Teachers Against Sanctioned Posts",
        typeObject: { name: "text", pan: "text", designation: "text", yearOfAppointment: "number", natureOfAppointment: Lists.esttNatureOfAppointment, departmentName: "text", experienceInYears: "number", stillWorking: "text", academicYear: "academicYears" },
        year: 'academicYear',
        tableHead: allTableHeads.EsttFullTimeTeacherAgainstSanctioned,
        proof: "proof",
        serviceName: 'estt',
        folder: 'establishment',
    },

    EsttFullTimeTeacherWhoLeft: {
        title: "Full Time Teachers who left/joined the institution",
        typeObject: { name: "text", idNumber: "text", yearInWhich: "number", email: "text", gender: "text", designation: "text", natureOfPost: Lists.esttNatureOfPost, dateOfJoining: "date", dateOfLeaving: "date", academicYear: "academicYears" },
        year: 'academicYear',
        tableHead: allTableHeads.EsttFullTimeTeacherWhoLeft,
        proof: "proof",
        serviceName: 'estt',
        folder: 'establishment',
    },

    //KRC
    SubscriptionForKRC: {
        title: "Institution has subscription for KRC",
        typeObject: { libraryResources: "text", eBooks: "number", eResources: "number", academicYear: 'academicYears', Proof: "proof" },
        year: 'academicYear',
        tableHead: allTableHeads.SubscriptionForKRC,
        proof: "proof",
        serviceName: 'krc',
        folder: 'krc',
    },

    // NSS
    AwardForExtensionActivities: {
        title: "Award For Extension Activities",
        typeObject: { nameOfActivity: "text", nameOfAward: "text", nameOfGovBody: "text", academicYear: 'academicYears', Proof: "proof" },
        year: 'academicYear',
        tableHead: allTableHeads.AwardForExtensionActivities,
        proof: "Upload_Proof",
        serviceName: 'nss',
        folder: 'nss',
    },

    NssAdmission: {
        title: "NSS Student",
        typeObject: { studentName: "text", classes: "text", dob: "date", caste: "text", category: "text", nss1Year: "number", nss2Year: "number", email: "email", projectName: "text", bloodGroup: "text", address: "textarea" },
        year: 'academicYear',
        tableHead: allTableHeads.NssAdmission,
        proof: "Upload_Proof",
        serviceName: 'nss',
        folder: 'nss',
    },

    NssBasicInfo: {
        title: "Student Basic Info",
        typeObject: { studentName: "text", parentName: "text", dob: "date", gender: Lists.gender, state: Object.keys(Lists.statesInIndia), distric: "district", mobileNo: "number", email: "email", createdByEmail: "email", otherAreaOfInterest: "text", address: "textarea", },
        year: 'academicYear',
        tableHead: allTableHeads.NssBasicInfo,
        proof: "Upload_Proof",
        serviceName: 'nss',
        folder: 'nss',
    },

    IQACInstitutionQualityAssurance: {
        title: "Institution adopted Quality assurance",
        typeObject: { conferncesSeminarsWorkshops: "text", aaaFollowUp: "text", participationNIRF: "text", iSOCertification: "text", nBAOtherCertification: "text", collaborativeQuality: "text", from: "date", to: "date", academicYear: 'academicYears', Proof: "proof" },
        year: 'academicYear',
        tableHead: allTableHeads.IQACInstitutionQualityAssurance,
        proof: "proof",
        serviceName: 'other',
        folder: 'other',
    },

    MaintenanceAndInfrastructure: {
        title: "Infrastructure and Maintenance Fundings",
        typeObject: { governmentAgencyName: "text", nonGovernmentAgencyName: "text", grantPurpose: "text", fundsReseived: "number", academicYear: 'academicYears', Proof: "proof" },
        year: 'academicYear',
        tableHead: allTableHeads.MaintenanceAndInfrastructure,
        proof: "proof",
        serviceName: 'other',
        folder: 'other',
    },

    Scholarship: {
        title: "Infrastructure and Maintenance Fundings",
        typeObject: { name: "text", governmentStudnts: "text", governmentAmount: "number", institutionStudnts: "text", institutionAmount: "number", nonGovernmentStudnts: "text", nonGovernmentAmount: "number", nonGovernmentNgo: "text", academicYear: 'academicYears' },
        year: 'academicYear',
        tableHead: allTableHeads.Scholarship,
        proof: "proof",
        serviceName: 'other',
        folder: 'other',
    },

    TotalExpenditure: {
        title: "Infrastructure and Maintenance Fundings",
        typeObject: { budjetAllocated: "number", expenditureInfrastructure: "text", totalExpenditure: "number", academicMaintenance: "number", physicalMaintenance: "number", academicYear: 'academicYears' },
        year: 'academicYear',
        tableHead: allTableHeads.TotalExpenditure,
        proof: "proof",
        serviceName: 'other',
        folder: 'other',
    },

    ExtensionActivities: {
        ...directorTables.ExtensionActivities,
         proof: "Upload_Proof",
         serviceName: 'director',
         folder: 'director',
     },

    // Swayam
    ValueAddedCource: {
        ...directorTables.ValueAddedCource,
        tableHead: modifyObject(allTableHeads.ValueAddedCource),
        proof: "Upload_Proof",
        serviceName: 'director',
        folder: 'director',
    },
    
    EContentDeveloped: {
        title: "E-Content Developed",
        typeObject: { moduleName: 'text', creationType: Lists.eContentCreation, platform: Lists.eContentPlatform, year: 'academicYears', link: 'text', Proof: "proof" },
        year: 'year',
        tableHead: modifyObjectFaculty(allTableHeads.EContentDeveloped),
        proof: "proof",
        serviceName: 'faculty',
        folder: 'faculty',
    },
    
    SwayamDetailsOfOnlineCourses: {
        title: "Details Of Online Courses",
        typeObject: { offeredOnlineCourses: "number", onlineCoursesWhichTrasperedCredit: "number", creditsTransferredToTranscript: "number", academicYear: 'academicYears', Proof: "proof" },
        year: 'academicYear',
        tableHead: allTableHeads.SwayamDetailsOfOnlineCourses,
        proof: "proof",
        serviceName: 'swayam',
        folder: 'swayam',
    },
    
    ResearchGuideAdmin: {
        title: "Details Of Online Courses",
        typeObject: { fullTimeTeacher: 'text', qualification: "text", researchCenterName: "text", year: "academicYears", Proof: "proof" },
        year: 'academicYear',
        tableHead: allTableHeads.ResearchGuideAdmin,
        proof: "proof",
        serviceName: 'admin',
        folder: 'admin',
    },

    //PG
    DemandRatio: {
        ...directorTables.DemandRatio,
        proof: "Upload_Proof",
        serviceName: 'director',
        folder: 'director',
    },
    
    // PG // Placement
    ProgressionToHE: {
       ...directorTables.ProgressionToHE,
        proof: "Upload_Proof",
        serviceName: 'director',
        folder: 'director',
    },
    
    // Placemnt
    CounselingAndGuidance: {
       ...directorTables.CounselingAndGuidance,
        proof: "Upload_Proof",
        serviceName: 'director',
        folder: 'director',
    },
    
    Placement: {
       ...directorTables.Placement,
        proof: "Upload_Proof",
        serviceName: 'director',
        folder: 'director',
    },

    
}

const OtherMainTable = ({ model, academicYear, showTable = true, title = null, extraInitialFilds = {} }) => {

    const [typeObject, setTypeObject] = useState(null);
    const [tableHead, setTableHead] = useState(null);
    const [initialState, setInitialState] = useState({});
    const [excelTypeObject, setExcelTypeObject] = useState(null);
    const academicYears = academicYear || academicYearGenerator(29, true, true);
    const module = "main";
    const getproof = otherTables[model].proof || null;
    const folder = otherTables[model].folder;
    const year = otherTables[model].year;
    const serviceName = otherTables[model].serviceName;
    let filter = {};
    if (extraInitialFilds) {
        filter = {...filter, ...extraInitialFilds}
    }
    if (academicYear) {
        filter[year] = { $in: academicYear };
    }

    useEffect(() => {
        if (model) {
            let newTypeObject = otherTables?.[model]?.typeObject;
            let newTableHead = otherTables?.[model]?.tableHead
            let newExcelTypeObject = {}
            if (!(newTableHead.hasOwnProperty('Action'))){
                newTableHead.Action = 'Action'
            }
            setInitialState(extraInitialFilds)
            for (const key in newTypeObject) {
                if (newTypeObject[key] === 'programs') {
                    newTypeObject[key] = 'school';
                }
                if (newTypeObject[key] === 'academicYears') {
                    newTypeObject[key] = academicYears;
                }
                if (key !== getproof) {
                    newExcelTypeObject[key] = newTypeObject[key]
                }
                setInitialState(prev => ({ ...prev, [key]: '' }));
            }
            setTypeObject(() => newTypeObject);
            setTableHead(() => newTableHead);
            setExcelTypeObject(() => newExcelTypeObject);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [model])


    return (
        <div>
            {(typeObject && tableHead && excelTypeObject) && <MainTable tableHead={tableHead} typeObject={typeObject} model={model} module={module} title={title || otherTables?.[model]?.title} getproof={getproof} initialstate={initialState} filter={filter} excelTypeObject={excelTypeObject} year={year} showTable={showTable} serviceName={serviceName} proofFolder={{ getproof, folder }} />}
        </div>
    )
}

export default OtherMainTable