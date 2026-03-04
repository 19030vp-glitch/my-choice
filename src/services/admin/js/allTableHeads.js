const allTableHeads = {
    Qualification: { index: 'Sr.No.', "userId.name": "Name Of Faculty", "userId.department": "School Of Faculty", exam: 'Exams', institute: 'Institute/Boards', year: 'Year', percentage: 'Percentage', subjects: 'Subjects' },

    Degree: { index: 'Sr.No.', "userId.name": "Name Of Faculty", "userId.department": "School Of Faculty", degreeName: 'Research Degree', title: 'Title', subject: 'Subject', university: 'University', awardDate: 'Award Year', Proof: 'Uploaded Proof' },

    EContentDeveloped: { index: 'Sr.No.', 'userId.name': 'Faculty Name', 'userId.department': 'Faculty School', moduleName: 'Name of the Module / Course developed', creationType: 'Type of Creation', platform: 'Platform on which the module is developed', year: 'Academic Year', link: 'Link to the content', Proof: "Proof" },

    AppointmentsHeldPrior: { index: 'Sr.No.', "userId.name": "Name Of Faculty", "userId.department": "School Of Faculty", designation: 'Designation', employerName: 'Employer Name', joiningDate: 'From', leavingDate: 'To', salaryWithGrade: 'Salary with Grade', leavingReason: 'Leaving Reason' },

    AwardRecognition: { index: 'Sr.No.', "userId.name": "Name Of Faculty", "userId.department": "School Of Faculty", teacherName: 'Name of full-time teachers receiving award', awardYear: 'Award Date', pan: 'PAN', designation: 'Designation', awardName: 'Name of the Award, Fellowship, received', isNat: 'National / International', agencyName: "Award Agency Name", incentive: "Incentives/Type of incentive given by the HEI in recognition of the award", year: "Year", Proof: 'Proof' },

    BookAndChapter: { index: 'Sr.No.', "userId.name": "Name Of Faculty", "userId.department": "School Of Faculty", type: 'Type', titleOfBook: 'Title of Book / Chapter / Edited Book / Translation', chapterTitle: "Title of Chapter / Translation", paperTitle: 'Paper Title', transType: "Translation work", titleOfProceeding: 'Title of proceedings of the conference', conName: 'Conference Name', isNat: 'Wheather National / International', publicationYear: 'Year of Publication', issnNumber: 'ISBN/ISSN number of proceeding', aff: 'Affiliation Institute at the time of publication', publisherName: 'Publisher Name', year: 'Academic Year', Proof: "Proof", Action: "Action" },

    Collaboration: { index: 'Sr.No.', 'userId.name': 'Faculty Name', 'userId.department': 'Faculty School', collabTitle: 'Title of the collaborative activity', agencyName: 'Name of the collaborating agency with contact details', participantName: 'Participant Name', collabYear: 'Year of Collaboration', duration: 'Duration', activityNature: 'Nature of the activity', year: 'Year', Proof: 'Proof' },

    ConferenceOrganized: { index: "Sr.No.", 'userId.name': 'Faculty Name', 'userId.department': 'Faculty School', programTitle: 'Program Title', schoolName: 'School Name', fundedBy: 'Funded By', isNational: 'National / International', noOfParticipants: 'No of Participants', year: 'Year', Proof: "Proof" },

    ConferenceParticipated: { index: 'Sr.No.', 'userId.name': 'Faculty Name', 'userId.department': 'Faculty School', programTitle: 'Program Title', organizingInstitute: 'Organizing Institute', fundedBy: 'Funded By', isNational: 'National / International', year: 'Year', Proof: 'Proof' },

    ConsultancyServices: { index: 'Sr.No.', 'userId.name': 'Faculty Name', 'userId.department': 'Faculty School', cName: 'Consultant Name', cProjectName: 'Consultancy Project Name', cAgency: 'Consulting / Sponsoring Agency with contact', cYear: 'Consultancy Year', revenue: 'Revenue Generated(INR)', year: 'Year', Proof: 'Proof' },

    Fellowship: { index: 'Sr.No.', 'userId.name': 'Faculty Name', 'userId.department': 'Faculty School', teacherName: 'Name of the teacher awarded national/international fellowship/financial support', awardName: 'Name of the award/fellowship', awardingAgency: 'Awarding Agency', awardYear: 'Award Year', isNat: 'National / International', year: 'Year', Proof: 'Proof' },

    ResearchProject: { index: 'Sr.No.', 'userId.name': 'Faculty Name', 'userId.department': 'Faculty School', schemeName: "Scheme or Project Title", principalName: "Principal Invigilator Name", coInvestigator: "Co-Invigilator", fundingName: "Funding Agency Name", isGov: "Govt. / Non-Govt.", awardYear: "Award Year", duration: "Project Duration", providedFunds: "Funds (INR)", fundType: "Major / Minor", status: "Status", year: "Year", Proof: 'Upload Proof', },

    PostHeld: { index: 'Sr.No.', 'userId.name': 'Faculty Name', 'userId.department': 'Faculty School', designation: "Designation", level: "Academic Level", userDepartment: "Department", duration: "Post Duration", Proof: 'Upload Proof' },

    Lectures: { index: 'Sr.No.', 'userId.name': 'Faculty Name', 'userId.department': 'Faculty School', course: 'Course/Paper', level: 'Level', teachingMode: 'Teaching Mode', noOfClasses: 'No of classes alloted', classesTaken: "No of classes taken", year: 'Year' },

    ResearchPaper: { index: 'Sr.No.', 'userId.name': 'Faculty Name', 'userId.department': 'Faculty School', paperTitle: 'Paper Title', journalName: 'Journal Name', authors: "Author(s)", publicationYear: 'Publication Year', issnNumber: 'ISSN Number', year: 'Year', impactFactor: 'Impact Factor', indexedIn: "Indexed in", indexLink: "Links", Proof: 'Proof', Proof2: "IF Proof" },

    PhdAwarded: { index: 'Sr.No.', 'userId.name': 'Faculty Name', 'userId.department': 'Faculty School', scholarName: 'Scholar Name', departmentName: 'Department Name', guideName: 'Guide Name', thesisTitle: 'Thesis Title', rac: "Date of Registration (RAC)", gender: "Gender", category: "Category", degreeName: 'Degree', awardSubmit: 'Awarded / Submitted', yearOfScholar: 'Year of Scholar Registration', phdAwardYear: 'Year of Award', year: 'Year', Proof: 'Proof' },
    ResearchGuidance: { index: 'Sr.No.', 'userId.name': 'Faculty Name', 'userId.department': 'Faculty School', scholarName: 'Scholar Name', departmentName: 'Department Name', guideName: 'Guide Name', thesisTitle: 'Thesis Title', rac: "Date of Registration (RAC)", gender: "Gender", category: "Category", degreeName: 'Degree', awardSubmit: 'Awarded / Submitted', yearOfScholar: 'Year of Scholar Registration', phdAwardYear: 'Year of Award', year: 'Year', Proof: 'Proof' },
    PGDessertation: { index: 'Sr.No.', 'userId.name': 'Faculty Name', 'userId.department': 'Faculty School', scholarName: 'Scholar Name', departmentName: 'Department Name', guideName: 'Guide Name', thesisTitle: 'Thesis Title', gender: "Gender", category: "Category", degreeName: 'Degree', awardSubmit: 'Awarded / Submitted', yearOfScholar: 'Year of Scholar Registration', phdAwardYear: 'Year of Award', year: 'Year', Proof: 'Proof' },

    JrfSrf: { index: 'Sr.No.', 'userId.name': 'Faculty Name', 'userId.department': 'Faculty School', researchName: 'Research Fellow Name', enrolmentYear: 'Enrolment Date', fellowshipDuration: 'Fellowship Duration', fellowshipType: 'Fellowship Type', grantingAgency: 'Granting Agency', qualifyingExam: 'Qualifying Exam (if any)', year: 'Year', Proof: 'Proof' },

    Patent: { index: 'Sr.No.', 'userId.name': 'Faculty Name', 'userId.department': 'Faculty School', type: "Type", patenterName: 'Patenter/ Copyrighter Name', patentNumber: 'Patent/ Copyright Number', fieldDate: "Patent/ Copyright Filing Date", publishedDate: "Patent/ Copyright Published Date", patentTitle: 'Patent/ Copyright Title', status: "Status", isNat: 'Wheather National / International', awardYear: 'Award Year of Patent/ Copyright', year: 'Academic Year', Proof: 'Proof' },

    InvitedTalk: { index: 'Sr.No.', 'userId.name': 'Faculty Name', 'userId.department': 'Faculty School', lectureTitle: 'Title of Lecture/Academic Session', seminarTitle: 'Title of Seminar, etc.', organizedBy: 'Organized by', talkDate: 'Date of Talk', isNat: 'Type', nature: 'Nature', year: 'Year', Proof: 'Proof' },

    Online: { index: 'Sr.No.', 'userId.name': 'Faculty Name', 'userId.department': 'Faculty School', programTitle: 'Program Title', nameOfAttendedTeacher: 'Organized by', durationFrom: 'Duration From', durationTo: 'Duration To', year: 'Year', Proof: 'Proof' },

    FinancialSupport: { index: 'Sr.No.', 'userId.name': 'Faculty Name', 'userId.department': 'Faculty School', nameOfConference: 'Name of Conference', feeprovider: 'Name of professional body Funds provided for', amountOfSupport: 'Amount of support', pan: 'PAN No.', year: 'Year', Proof: 'Proof' },

    Responsibilities: { index: 'Sr.No.', 'userId.name': 'Faculty Name', 'userId.department': 'Faculty School', designation: 'Designation', committeeName: 'Name of the Committee', duration: "Duration", institute: 'Hosting institute name', Proof: 'Proof' },

    ForeignVisit: { index: 'Sr.No.', 'userId.name': 'Faculty Name', 'userId.department': 'Faculty School', purposeOfVisit: 'Purpose Of Visit', nameOfTheInstitutionVisited: 'Name Of The Institute Visited', fromDate: 'From', toDate: 'To', year: 'Year' },

    PolicyDocuments: { index: 'Sr.No.', 'userId.name': 'Faculty Name', 'userId.department': 'Faculty School', policyName: 'Policy Name', organizationName: 'Organisation Name', isNat: 'Wheather National / International', year: 'Academic Year', Proof: "Proof" },

    PublicationCitation: {index: "Sr. no.", 'userId.name': 'Faculty Name', 'userId.department': 'Faculty School', year: "Year",  perticulars: "Perticulars", totalCitations: "Total Citations", hindex: "h-index", i10index: "i-10 index", averageImpactFactor: "Average Impact Factor"},

    //Director 
    AlumniContribution: { index: "Sr. no.", SchoolName: "School", Name_of_The_Alumni_Contributed: "Name Of The Alumni", Program_graduated_from: "Program Graduated From", Amount_of_contribution: "Contribution Ammount in ₹", Academic_Year: "Academic Year of Contribution", Proof: "Proof" },

    Award: { index: "Sr. no.", SchoolName: "School", Title_of_the_innovation: "Title of the innovation", Name_of_the_Award: "Name of the Award", Year_of_Award: "Year of Award", Name_of_the_Awarding_Agency: "Name of the Awarding Agency", Contact_details_Agency: "Contact details Agency", Category: "Category", Proof: "Proof" },

    ConferencesSemiWorkshopOrganized: { index: "Sr. no.", SchoolName: 'School', Year: "Year", fundedBy: 'Funded By', From_Date: "From Date", To_Date: "To Date", Title_Of_the_Program: "Title Of the Program", Level_of_program: "Level of Program", Number_of_Participants: "Number of Participants", Proof: "Proof" },

    CounselingAndGuidance: { index: "Sr. no.", SchoolName: 'School', activityType: "Type Of Activity", Name_of_the_Activity_conducted_by_the_HEI: "Name of the Activity conducted by the HEI", Number_of_Students_Attended: "Number of Students Attended", Year_of_Activity: "Year of Activity", Proof: "Link to the relevant document" },

    DemandRatio: { index: "Sr. no.", SchoolName: 'School', Programme_Code: "Programme Code", Programme_name: "Programme name", Academic_Year: "Academic Year", Type_of_program: "Type of Program", Number_of_seats_available: "Number of seats available", Number_of_eligible_applications: "Number of eligible applications", Number_of_Students_admitted: "Number of Students admitted", Proof: "Proof" },

    Employability: { index: "Sr. no.", SchoolName: 'School', Program_Name: 'Program Name', Course_Code: "Course Code", Name_of_the_Course: "Course name", Academic_Year: "Academic Year", Year_of_introduction: "Year of introduction", Activities_Content_with_direct_bearing_on_Employability_Entrepreneurship_Skill_development: "Activities / Content with direct bearing on Employability / Entrepreneurship / Skill development", Proof: "Proof" },

    ExtensionActivities: { index: "Sr. no.", SchoolName: 'School', Name_of_the_activity: "Name of the activity", Organising_unit: "Organising unit/ agency/ collaborating agency", Name_of_the_scheme: "Name of the scheme", Year_of_activity: "Year of the activity ", Number_of_students: "Number of students participated in such activities", Proof: "Proof" },

    IctClassrooms: { index: "Sr. no.", SchoolName: 'School', Room_number_or_Name_of_Classrooms: "Room number or Name of Classrooms", Type_of_ICT_facility: "Type of ICT facility ", academicYear: "Academic Year", Proof: "Gio taged photo" },

    MoUs: { index: "Sr. no.", SchoolName: 'School', Name_of_Organisation_with_whome_mou_signed: "Name of Organisation with whome mou signed", Duration_of_MoU: "Duration of MoU", Year_of_signing_MoU: "Year of signing MoU", Proof: "Actual activity list" },

    Placement: { index: "Sr. no.", SchoolName: 'School', Name_of_student_placed: "Name of student placed/started Business", Program_graduated_from: "Program graduated from", Name_of_the_employer: "Name of the employer/business", Employer_contact_details: "Employer/business contact details", Pay_package_annum: "Pay package ( ₹ / annum)", Academic_Year: "Year of Placement", Type_Of_Placement: "Type of placemnt", Proof: "Upload Proof" },

    ProgressionToHE: { index: "Sr. no.", SchoolName: 'School', Name_of_student_enrolling: "Name of student enrolling", Program_graduated_from: "Program graduated from", Name_of_institution_admitted: "Name of institution admitted", Name_of_programme_admitted: "Name of programme admitted", Academic_Year: "Academic Year", Proof: "Upload Proof" },

    ProjectsInternships: { index: "Sr. no.", SchoolName: 'School', Programme_Code: "Program Code", Programme_name: "Program Name", Name_of_the_student: "Name of the student", Academic_Year: "Academic Year", Proof: "Document proof" },

    QualifiedExams: { index: "Sr. no.", SchoolName: 'School', Registration_number_roll_number: "Registration number / roll number", Names_of_students_selected_qualified: "Name of student qualified", Name_of_the_Exam: "Exam Qualified", Acadmic_year: "Acadmic Year", Proof: "Upload Proof" },

    ResearchMethodologyWorkshops: { index: "Sr. no.", SchoolName: 'School', Name_of_the_workshop_seminar: "Name of the workshop/ seminar", Number_of_Participants: "Number of Participants", year: "year", From_Date: "From Date", To_Date: "To Date", Proof: "Upload Proof" },

    ReservedSeats: { index: "Sr. no.", SchoolName: 'School', Academic_Year: "Academic Year", Program_Name: "Program Name", NseSC: "SC", NseST: "ST", NseOBC: "OBC(VJNT)", NseDivyngjan: "Divyngjan", NseGeneral: "General", NseOthers: "Others", NsaSC: " SC", NsaST: " ST", NsaOBC: " OBC(VJNT)", NsaDivyngjan: " Divyngjan", NsaGeneral: " General", NsaOthers: " Others", Proof: "Upload Proof" },

    SkillsEnhancementInitiatives: { index: "Sr. no.", SchoolName: 'School', Name_of_the_capacity_development_schemes: "Name of the capacity development schemes", Academic_Year: "Academic Year", Date_of_implementation: "Date of implementation", Number_of_students_enrolled: "Number of students enrolled", Proof: "Upload proof" },

    StudentSatisfactionSurvey: { index: "Sr. no.", SchoolName: 'School', Name_of_the_student: "Name of the student", Year_of_joining: "Year of joining", Category: "Category", State_of_Domicile: "State of Domicile", Nationality: "Nationality", Email_ID: "Email ID", Programme_name: "Programme name", Student_Unique_Enrolment_ID: "Student Unique Enrolment ID", Mobile_Number: "Mobile Number", Gender: "Gender", Proof: "Upload proof" },

    SyllabusRevision: { index: "Sr. no.", SchoolName: 'School', Programme_Code: "Programme Code", Programme_Name: "Programme Name", Academic_Year: "Academic Year", Year_of_Introduction: "Year of Introduction", Status_of_implementation: "Status of implementation", Year_of_Implimentation: "Year of Implimentation", Year_of_Revision: "Year of Revision", Percentage_of_content_added_or_replaced: "Percentage of content added or replaced", Proof: "Upload Proof" },

    TrainingProgramsOrganized: { index: "Sr. no.", SchoolName: 'School', Year: "Year", From_Date: "From Date", To_Date: "To Date", Title_Of_the_Program: "Title Of the Program", Type_of_staff: "Type of staff", Number_of_Participants: "Number of Participants", Proof: "Upload proof" },

    UgcSapCasDstFistDBTICSSR: { index: "Sr. no.", SchoolName: 'School', Name_of_the_Scheme_Project_Endowments_Chairs: "Name of the Scheme/Project/ Endowments/ Chairs", Name_of_the_Principal_Investigator_Co_Investigator: "Name of the Principal Investigator/ Co Investigator", Name_of_the_Funding_agency: "Name of the Funding agency ", Type_of_Agency: "Type of Agency", Name_of_Department: "Name of Department", Year_of_Award: "Year of Award", Funds_provided_in_lakhs: "Funds provided ( ₹ / in lakhs)", Duration_of_the_project_in_Years: "Duration of the project (in Years)", Proof: "Upload proof" },

    ValueAddedCource: { index: "Sr. no.", SchoolName: 'School', Program_Name: 'Program Name', Name_of_the_value_added_courses_offered: "Name of the value added courses offered", Course_Code_if_any: "Course Code (if any)", Academic_year: "Academic year", Year_of_offering: "Year of offering", No_of_times_offered_during_the_same_year: "No. of times offered during the same year", Duration_of_the_course: "Duration of the course (in Months)", Number_of_students_enrolled: "Number of students enrolled", Number_of_Students_completing_the_course: "Number of Students completing the course", Proof: "Upload proof" },

    CourceInAllProgram: { index: "Sr. no.", SchoolName: 'School', programName: "Program Name", programCode: "Program Code", courseName: "Course Name", courseCode: "Course Code", academicYear: "Academic Year" },

    NewPrograms: { index: "Sr. no.", SchoolName: 'School', programCode: "Program Code", programName: "Name of the Program", academicYear: "Academic Year" },
    
    StudentInformation: { index: "Sr. no.", SchoolName: 'School', year: "Academic Year", category: "Category", male: "Total Male", female: "Total Female", total: "Total Students" },

    //IIL
    IilCollaborativeActivities: { index: "Sr. no.", titleOfActivity: "Title of the collaborative activity", nameOfAgency: "Name of the collaborating agency with contact details", nameOfParticipant: "Name of the participant ", duration: "Duration", natureOfActivity: "Nature of the activity", academicYear: 'Year of collaboration', Proof: "Proof", Action: "Action" },

    IilRevenueConsultancy: { index: "Sr. no.", nameOfConsultant: "Name of the consultant", nameOfConsultancyProject: "Name of consultancy project", agencyName: "Consulting/Sponsoring agency with contact details", revenueGenerated: "Revenue generated (INR in Lakhs)", academicYear: 'Year', Proof: "Proof", Action: "Action" },

    IilRevenueCorporateTraining: { index: "Sr. no.", nameOfCorporate: "Names of the teacher-consultants/corporate trainers", nameOfCorporateProgram: "Title of the corporate training program", agencyName: "Agency seeking training with contact details", revenueGenerated: "Revenue generated (amount in rupees)", numberOfTrainees: "Number of trainees", academicYear: 'Year', Proof: "Proof", Action: "Action" },

    // EXAM
    DateOfResultDiclaration: { index: "Sr. no.", programmeName: "Programme Name", programmeCode: "Programme Code", academicYear: "Semester/ year", lastDate: "Last date of the last semester-end/ year- end examination", diclarationDate: "Date of declaration of results of semester-end/ year- end examination", Proof: "Proof", Action: "Action" },

    ExamPassedDuringYear: { index: "Sr. no.", programCode: "Program Code", programName: "Program Name", studentsAppeared: "Number of Students Appeared in Final Year Examination", studentsPassed: "Number of Students Passed in Final Year Examination", academicYear: 'Year', Action: "Action" },

    StudentComplaintsGrievances: { index: "Sr. no.", noOfStudents: "No Of Students Appeared", noOfGrievances: "No Of Grievances", academicYear: 'Year', Proof: "Proof", Action: "Action" },

    // DSD
    DSDSports: { index: "Sr. no.", nameOfAward: "Name of the award/ medal", teamIndividual: "Team / Individual", isNat: "Inter-university / state / National / International", nameOfEvent: "Name of the event", nameOfStudnt: "Name of the student", academicYear: "Year", Proof: "Proof of Award", Action: "Action" },

    SportsAndCulturalEvents: { index: "Sr. no.", dateOfEvent: "Date of event/competition", nameOfEvent: "Name  of the event/competition", academicYear: "Academic Year", Proof: "Proof of Report", Action: "Action" },

    //ESTT
    EsttFullTimeTeacher: { index: "Sr. no.", name: "Name", idNumber: "ID number/Aadhar number", email: "Email", gender: "Gender", designation: "Designation", natureOfPost: "Nature of Post", dateOfJoining: "Date of joining institution", academicYear: "Academic Year", Action: "Action" },

    EsttFullTimeTeacherAgainstSanctioned: { index: "Sr. no.", name: "Name of the Full-time teacher", pan: "PAN", designation: "Designation", yearOfAppointment: "Year of appointment", natureOfAppointment: "Nature of Appointment", departmentName: "Name of the Department", experienceInYears: "Total years of Experience in the same institution", stillWorking: "Is the teacher still serving the institution/If not last year of the service of Faculty to the Institution", academicYear: "Academic Year", Action: "Action" },

    EsttFullTimeTeacherWhoLeft: { index: "Sr. no.", name: "Name", idNumber: "ID number/Aadhar number", yearInWhich: "Year in which left/joined/resigned/ retired etc.", email: "Email", gender: "Gender", designation: "Designation", natureOfPost: "Nature of Post", dateOfJoining: "Date of joining institution", dateOfLeaving: "Date of leaving", academicYear: "Academic Year", Action: "Action" },

    //KRC
    SubscriptionForKRC: { index: "Sr. no.", libraryResources: "Library resources	If yes, details of memberships/subscriptions", eBooks: "Expenditure on subscription to e-journals, e-books (INR in lakhs)", eResources: "Expenditure on subscription to other e-resources (INR in lakhs)", academicYear: 'Year', Proof: "Total Library Expenditure Link to the relevant document", Action: "Action" },

    //NSS
    AwardForExtensionActivities: { index: "Sr. no.", nameOfActivity: "Name of the activity", nameOfAward: "Name of the Award/ recognition", nameOfGovBody: "Name of the Awarding government/ government recognised bodies", academicYear: "Year of award", Proof: "Proof", Action: "Action" },

    NssAdmission: { index: "Sr. no.", studentName: "Student Name", classes: "Class", dob: "Date of Birth", caste: "Caste", category: "Category", nss1Year: "Year of NSS-1", nss2Year: "Year of NSS-2", address: "Address", email: "Email", projectName: "Project Assigned", bloodGroup: "Blood Group", Action: "Action" },

    NssBasicInfo: { index: "Sr. no.", studentName: "Student Name", parentName: "Father/Mother Name", dob: "Date of Birth", gender: "Gender", state: "State", distric: "District", mobileNo: "Mobile No", address: "Address", email: "Email", createdByEmail: "Created by Programme. Officer Email", otherAreaOfInterest: "Other Area Of Interest", Action: "Action" },

    // OTHER
    IQACInstitutionQualityAssurance: { index: "Sr. no.", academicYear: "Year", conferncesSeminarsWorkshops: "Confernces, Seminars, Workshops on quality conducted", aaaFollowUp: "Academic Administrative Audit (AAA) and initiation of follow up action", participationNIRF: "Participation in NIRF along with Status", iSOCertification: "ISO Certification. and nature and validity period", nBAOtherCertification: "NBA or any other certification received with program specifications", collaborativeQuality: "Collaborative quality initiatives with other institution(s) (Provide name of the institution and activity)", from: "Orientation programme on quality issues fromDate (DD-MM-YYYY)", to: "Orientation programme on quality issues ToDate (DD-MM-YYYY)", Proof: "Upload Proof", Action: "Action" },

    MaintenanceAndInfrastructure: { index: "Sr. no.", academicYear: "Year", governmentAgencyName: "Name of the government funding agencies", nonGovernmentAgencyName: "Name of the non government funding agencies/ individuals", grantPurpose: "Purpose of the Grant", fundsReseived: "Funds/ Grants received (INR in lakhs)", Proof: "Link to Audited Statement of Accounts reflecting the receipts", Action: "Action" },

    Scholarship: { index: "Sr. no.", academicYear: "Year", name: "Name of the scheme", governmentStudnts: "Number of students", governmentAmount: "Amount", institutionStudnts: "Number of students", institutionAmount: "Amount", nonGovernmentStudnts: "Number of students", nonGovernmentAmount: "Amount", nonGovernmentNgo: "Name of the NGO/agency", Proof: "Link to relevant document", Action: "Action" },

    TotalExpenditure: { index: "Sr. no.", academicYear: "Year", budjetAllocated: "Budget allocated for infrastructure augmentation", expenditureInfrastructure: "Expenditure for infrastructure augmentation", totalExpenditure: "Total expenditure excluding Salary", academicMaintenance: "Expenditure on maintenace of academic facilities (excluding salary for human resources)", physicalMaintenance: "Expenditure on maintenace of physical facilities (excluding salary for human resources)", Action: "Action" },

    //Swayam
    SwayamDetailsOfOnlineCourses: { index: "Sr. no.", portalName: "Portal Name", offeredOnlineCourses: "No. of students offered online courses which have credit transferred to transcript", onlineCoursesWhichTrasperedCredit: "Total no. of online courses which have credit transferred to the transcript", creditsTransferredToTranscript: "Total no. of credits transferred to transcript", academicYear: "Academic Year", Proof: "Upload Proof", Action: "Action" },

    ResearchGuideAdmin: { index: "Sr. no.", fullTimeTeacher: 'Name of the full time teacher', qualification: "Qualification", researchCenterName: "Research Center Name", year: "Year of recognition as Research Guide", Proof: "Guideship Letter", Action: "Action" },

    //PM-USHA
    Equipment: {index: "Sr. No.", name: "Name of the Equipment", location: "Location of installation/use", quantity: "Quantity", status: "Status", To_Date: "Date Of Installation", outCome: "Outcome", Proof: "Installation Report", Proof2: "Upload Invoice", Action: "Action"},
    
    Soft: {index: "Sr. No.", activity: "Activity", event: "Tentative Month and year of organizing event", centerName: "Name of the organizing school / center", coordinater: "Convenor / Co-ordinator", status: "Status",From_Date: "Duration From", To_Date: "Duration Upto", durationInDays: "Duration In Days", noOfStudentBeneficiary: "No Of Student Beneficiary", noOfFacultyBeneficiary: "No Of Faculty Beneficiary", objective: "Objective", outCome: "Outcome", Proof: "Financial Approval", Proof2: "Detailed Report Of Event", Action: "Action"},
    
}
export default allTableHeads
