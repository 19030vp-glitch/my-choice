import { useEffect } from "react"

const initialState = {
    auditYear : 2019-20,
    AAAData : {
        facultyTables : {
            researchFundingAgency : { input: 0, name: {}, programTitle: {}, fundingName: {}, isGov: {}, awardYear: {}, projectDuration: {}, providedFunds: {} },
            publication : {
                input: 0, name: {}, paperTitle: {}, journalName: {}, publicationYear: {}, issnNumber: {}, year: {}
            },
            patents : { input: 0, name: {}, patentNumber: {}, patentTitle: {}, awardYear: {}, year: {} },
            consultancy : { input: 0, name: {}, cProjectName: {}, cAgency: {}, cYear: {}, revenue: {}, year: {} },
            conference : { input: 0, name: {}, programTitle: {}, fundedBy: {}, isNational: {}, noOfParticipants: {}, year: {} },
            invitedTalks : { input: 0, name: {}, lectureTitle: {}, seminarTitle: {}, isNational: {}, organizedBy: {}, year: {} },
            facultyAwards : { input: 0, name: {}, awardYear: {}, pan: {}, designation: {}, awardName: {}, agencyName: {}, incentive: {}, year: {} },
            facultyJrfSrf: { input: 0, name: {}, enrolmentYear: {}, fellowshipDuration: {}, fellowshipType: {}, grantingAgency: {}, qualifyingExam: {}, year: {} }
        },
        directorTables :{
            ugcSap : { input: 0, schemename: {}, name: {}, agency: {}, agencyType: {}, department: {}, yearOfAward: {}, funds: {}, duration: {} },
            awardsAndPrizes : { input: 0, innovationTitle: {}, awardName: {}, agency: {}, contact: {}, awardYear: {}, category: {} },
            schoolConference : { input: 0, year: {}, fromDate: {}, toDate: {}, programName: {}, staffType: {}, levelOfProgram: {}, numberOfParticipants: {} },
            syllabusRevision : { input: 0, programCode: {}, programName: {}, year: {}, yearOfIntroduction: {}, statusOfImplementation: {}, yearOfImplimentation: {}, yearOfRevision: {}, percentage: {} },
            employability : {
                input: 0, courseCode: {}, courseName: {}, yearOfIntroduction: {},
                activity: {}, year: {}
            },
            valueAddedCourse : { input: 0, courseName: {}, courseCode: {}, year: {}, yearOfOffering: {}, courseDuration: {}, frequencyOfOffering: {}, studentsEnrolled: {}, completedCourse: {} },
            projectAndInternships : { input: 0, programCode: {}, programName: {}, studentName: {}, year: {} },
            demandRatio : {
                input: 0, programCode: {}, programName: {}, year: {},
                programType: {},
                numberOfSeatsAvailable: {},
                numberOfApplications: {}, numberOfStudents: {}
            },
        },
        programTables : {
            degreePrograms : programs,
            programDuringYear
        },
        schoolInfoTables : {
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
            appointmentUniversityFund
        },
        cellAsInputTables : {
            teachingPosts,
            mphilPrograms,
            phdPrograms,
            mphilPhd,
            civil,
            placementRecord,
            facultyAwardsDegree,
        },
        richTextTables : {
            schoolParticipationDetails,
            schoolInfra,
            alumniList,
            alumniActivities,
            alumniActivities,
            extenstionActivities,
            studentMonitor,
            greenCampus,
            commemorative,
            studentEnrichment,          
            programObjectives,
            schoolFeatures,
            schoolAdvisory,
            schoolStrength,
            futurePlans
        },
        fileFeedback : {
            syllabusFeedback,
            yearOfEstablishment
        }
            
    }
}






