const TableData = {

  // new tables head (simple)

  programs: {
    auditHead: ["Sr.No.", "Name of the Program", "Intake", "Action"],
    childHead: ["ProgramName", "Intake",],
    fieldOptions: [
      { field: 'Text', keyName: "ProgramName", label: "Program Name" },
      { field: 'Text', keyName: "Intake", label: "Intake" }
    ]

  },

  aqarPrograms: {
    auditHead: ["Sr.No.", "Program Code", "Name of the Program", "Action"],
    childHead: ["ProgramCode", "ProgramName",],
    fieldOptions: [
      { field: 'Text', keyName: "ProgramCode", label: "Program Code" },
      { field: 'Text', keyName: "ProgramName", label: "Program Name" },
    ]

  },

  aqarCourse: {
    auditHead: ["Sr.No.", "Program Code", "Name of the Program", "Course Code", "Course Name", "Action"],
    childHead: ["ProgramCode", "ProgramName", "CourseCode", "CourseName"],
    fieldOptions: [
      { field: 'Text', keyName: "ProgramCode", label: "Program Code" },
      { field: 'Text', keyName: "ProgramName", label: "Program Name" },
      { field: 'Text', keyName: "CourseCode", label: "Course Code" },
      { field: 'Text', keyName: "CourseName", label: "Course Name" },
    ]

  },

  // new tables head and child (complex)
  appointmentGovtPost: {
    auditHead: ["Sr.No.", "Name", "Designation", "Qualification", "Nature of Appointment", "Action"],
    childHead: ["Name", "Designation", "Qualification", "appointmentNature"],
    fieldOptions: [{ field: 'Text', keyName: "Name", label: "Name" }, { field: 'Text', keyName: "Designation", label: "Designation" }, { field: 'Text', keyName: "Qualification", label: "Qualification" }, { field: 'Select', keyName: "appointmentNature", label: "Nature of Appointment", options: ['Permanent', 'Temporary (Contractual)', 'Temporary (CHB)'] },]

  },

  listOfVisitingTeachers: {
    auditHead: ["Sr.No.", "Teacher Name", "Designation", "Qualification", "Gender", "Institute Address", "Action"],
    childHead: ["TeacherName", "Designation", "Qualification", "Gender", "InstituteAddress"]
  },

  sabMember: {
    auditHead: ["Sr.No.", "Member Name", "Member Position", "Action"],
    childHead: ["MemberName", "MemberPosition"],
    fieldOptions: [{ field: 'Text', keyName: "MemberName", label: "Name of the Member" },
    { field: 'Text', keyName: "MemberPosition", label: "Position of the Member" },
    ]
  },

  alumniList: {
    auditHead: ["Sr.No.", "Alumni Name", "Current Position / Status", "Action"],
    childHead: ["Name", "Position"],
    fieldOptions: [{ field: 'Text', keyName: "Name", label: "Name of the Alumni" },
    { field: 'Text', keyName: "Position", label: "Current Position / Status" },
    ]
  },

  academicSupportStaff: {
    auditHead: ["Sr. No.", "Name of the Post", "Number of Sanctioned Posts", "Number of Filled Posts", "Number of Vacant Posts", "Action"],
    childHead: ["PostName", "SanctionedPost", "Filled", "Vacant"]
  },

  sabMember: {
    auditHead: ["Sr. No.", "Name of the Member", "Position of the Member", "Action"],
    childHead: ["MemberName", "MemberPosition",],
    fieldOptions: [{ field: 'Text', keyName: "MemberName", label: "Name of the Member" }, { field: 'Text', keyName: "MemberPosition", label: "Name of the Position" },]
  },

  meetingDetails: {
    auditHead: ["Sr. No.", "Meeting Date", "Briefing of the Meeting", "Proof of Minutes of Meeting", "Action"],
    childHead: ["MeetingDate", "MeetingBriefing", "proof"],
    fieldOptions: [{ field: 'Text', keyName: "MeetingDate", label: "Meeting Date" }, { field: 'Text', keyName: "MeetingBriefing", label: "Briefing of the Meeting" }, { field: 'File', keyName: "proof", label: "Proof of Minutes of Meeting" },]
  },

  facilities: {
    auditHead: ["Sr. No.", "Name of the Research Facility", "Action"],
    childHead: ["Facilities",],
    fieldOptions: [{ field: 'Text', keyName: "Facilities", label: "Name of the Research Facility" },
    ]
  },

  alumniActivities: {
    auditHead: ["Sr. No.", "Activity Date", "Type of Activity", "No of Alumni / Participants", "Briefing", "Proof", "Action"],
    childHead: ["date", "type", "number", "briefing", "proof"],
    fieldOptions: [
      { field: 'Text', keyName: "date", label: "Activity Date" },
      { field: 'Select', keyName: "type", label: "Type of Activity", options: ['Alumni Meet', 'Alumni Talk / Interaction'] },
      { field: 'Text', keyName: "number", label: "No of Alumni / Participants" },
      { field: 'Text', keyName: "briefing", label: "Briefing" },
      { field: 'File', keyName: "proof", label: "Proof of Activity" }
    ]
  },


  academicActivityParticipation: {
    auditHead: ["Sr No.", "Name of the teacher",
      "Name of the committee",
      "Position In The Committee( Director, Coordinator, Member, etc)",
      "Level", "Action"],
    childHead: ["teacherName", "committeeName", "position", "level",],
    fieldOptions: [{ field: 'Text', keyName: "teacherName", label: "Name of the Teacher" },
    { field: 'Text', keyName: "committeeName", label: "Name of the Committee" },
    { field: 'Select', keyName: "position", label: "Choose Position in Committee", options: ["Director", "Co-ordinator", "Member", 'Chairman', "Other"] },
    { field: 'Select', keyName: "level", label: "Choose Level", options: ["University Level", "State Level", "National Level", "International Level"] },
    ]
  },

  ethicsAdded: {
    auditHead: ["Sr. No.", "Name of the Program", "Course Code", "Course Name", "Course Description", "Action"],
    childHead: ['programName', 'courseCode', 'courseName', 'courseDescription',],
    fieldOptions: [{ field: 'Text', keyName: "programName", label: "Name of the Program" },
    { field: 'Text', keyName: "courseCode", label: "Course Code" },
    { field: 'Text', keyName: "courseName", label: "Name of the course" },
    { field: 'Text', keyName: "courseDescription", label: "Course Description" },
    ]
  },

  programOutcomes: {
    auditHead: ["Sr. No.", "Name of the Program", "Program Educational Objectives (PEO)", "Program Objectives (PO)", "Program Specific Outcomes (PSO)", "Action"],
    childHead: ["programName", "peo", "po", "pso"],
    fieldOptions: [{ field: 'Text', keyName: "programName", label: "Name of the Program" },
    { field: 'Text', keyName: "peo", label: "Program Educational Objectives (PEO)" },
    { field: 'Text', keyName: "po", label: "Program Outcomes (PO)" },
    { field: 'Text', keyName: "pso", label: "Program Specific Outcomes (PSO)" },
    ]
  },

  otherInfo: {
    auditHead: ["Sr. No.", "Details (Mention Year, Value etc where relevant)", "Action"],
    childHead: ["details"],
    fieldOptions: [{ field: 'Text', keyName: "details", label: "Write about the contribution, credential or award received which is not mentioned earlier" },]
  },

  courseOutcomes: {
    auditHead: ["Sr. No.", "Relevant Documents / Proofs stating Course Objectives & Outcomes", "Action"],
    childHead: ["proof"],
    fieldOptions: [{ field: 'File', keyName: "proof", label: "Upload proof for Course objectives & outcomes " },]
  },

  yearWiseUGPG: {
    auditHead: ["Sr. No.", "Name of the Program", "Degree", "Year", "Appeared", "Passed", "Percentage %", "Action"],
    childHead: ["programName", "degreeType", "year", "appeared", "passed", "percentage"],
    fieldOptions: [{ field: 'Text', keyName: "programName", label: "Name of the Program" },
    { field: 'Select', keyName: "degreeType", label: "Choose Degree", options: ["UG", "PG", "Diploma", "PG Diploma", "Certificate"] },
    { field: 'Text', keyName: "year", label: "Year" },
    { field: 'Text', keyName: "appeared", label: "Appeared" },
    { field: 'Text', keyName: "passed", label: "Passed" },
    { field: 'Text', keyName: "percentage", label: "Percentage %" },
    ]
  },

  MPhilProgramme: [
    "Year",
    "Applications Received",
    "Intake",
    "No. Of Students Admitted",
    "Male ",
    "Female ",
    "Total",
  ],



  // faculty tables

  ResearchProject: {
    auditHead: ["Sr. No.", "Full Name", "Scheme/Project Name", "Program Title", "Principal Invigilator Name", "Funding Agency Name", "Government / Non-Government",
      "Department", "Award Year", "Provided Funds (INR)", "Major/Minor", "Project Status", "Project Duration",],
    childHead: ["schemeName",
      "programTitle",
      "principalName",
      "fundingName",
      "isGov",
      "department",
      "awardYear",
      "providedFunds",
      "fundType",
      "status",
      "projectDuration",
    ],
    stateHead: ["schemeName",
      "programTitle",
      "principalName",
      "fundingName",
      "isGov",
      "department",
      "awardYear",
      "providedFunds",
      "fundType",
      "status",
      "projectDuration"
    ],
    mainKey: {
      head: ['Full Name', 'Scheme/Project Name'],
      keyName: ['name', 'schemeName'],
    },
    fieldOptions: [
      { field: 'Text', keyName: "name", label: "Faculty Name" },
      { field: 'Text', keyName: "schemeName", label: "Scheme/Project Name" },
      { field: 'Text', keyName: "programTitle", label: "Program Title" },
      { field: 'Text', keyName: "principalName", label: "Principal Invigilator Name" },
      { field: 'Text', keyName: "fundingName", label: "Funding Agency Name" },
      { field: 'Select', keyName: "isGov", label: "Government / Non-Government", options: ['Government', 'Non-Government'] },

      { field: 'Text', keyName: "department", label: "Department" },
      { field: 'Text', keyName: "awardYear", label: "Award Year" },
      { field: 'Text', keyName: "providedFunds", label: "Provided Funds (INR)" },
      { field: 'Select', keyName: "fundType", label: "Major/Minor", options: ['Major', 'Minor'] },

      { field: 'Select', keyName: "status", label: "Project Status", options: ['Completed', 'Ongoing'] },

      { field: 'Text', keyName: "projectDuration", label: "Project Duration" },
    ]


  },

  ResearchPaper: {
    auditHead: [
      "Sr. No.",
      "Name",
      "Paper Title",
      "Journal Name",
      "Publication Year",
      "ISSN Number",
      "Indexed in",
    ],
    childHead: [
      "paperTitle",
      "journalName",
      "publicationYear",
      "issnNumber",
      "indexedIn",
    ],
    mainKey: {
      head: ['Full Name', 'Paper Title'],
      keyName: ['name', 'paperTitle']
    },
    fieldOptions: [{ field: 'Text', keyName: "name", label: "Name" },
    { field: 'Text', keyName: "paperTitle", label: "Paper Title" },
    { field: 'Text', keyName: "journalName", label: "Name of the Journal" },
    { field: 'Text', keyName: "publicationYear", label: "Year of Publication" },
    { field: 'Text', keyName: "issnNumber", label: "ISSN Number" },]
  },

  FinancialSupport: {
    auditHead: [
      "Sr. No.",
      "Name",
      "Name of conference/ workshop attended for which financial support provided",
      "Name of professional body Funds provided for",
      "Amount of support",
      "PAN Number",
    ],
    childHead: [
      "nameOfConference",
      "feeprovider",
      "amountOfSupport",
      "pan",
    ],
    mainKey: {
      head: ['Full Name', 'Name of conference/ workshop attended'],
      keyName: ['name', 'nameOfConference']
    },
    fieldOptions: [{ field: 'Text', keyName: "name", label: "Name" },
    { field: 'Text', keyName: "nameOfConference", label: "Name of conference/ workshop attended for which financial support provided" },
    { field: 'Text', keyName: "feeprovider", label: "Name of professional body Funds provided for" },
    { field: 'Text', keyName: "amountOfSupport", label: "Amount of support" },
    { field: 'Text', keyName: "pan", label: "PAN Number" },]
  },





  // director tables

  UgcSapCasDstFistDBTICSSR: {
    auditHead: ["Sr.No.", "Name of the Scheme/Project/ Endowments/ Chairs", "Name of the Principal Investigator/ Co Investigator", "Name of the Funding agency", "Type of Agency", "Name of Department", "Year of Award", "Funds provided ( ₹ / in lakhs)", "Duration of the project (in Years)",],
    childHead: ["Name_of_the_Scheme_Project_Endowments_Chairs", "Name_of_the_Principal_Investigator_Co_Investigator", "Name_of_the_Funding_agency", "Type_of_Agency", "Name_of_Department", "Year_of_Award", "Funds_provided_in_lakhs", "Duration_of_the_project_in_Years"],
    stateHead: ["schemename", "name", "agency", "agencyType", "department", "yearOfAward", "funds", "duration"],
    mainKey: {
      head: ['Name of the Scheme/Project/ Endowments/ Chairs'],
      keyName: ['Name_of_the_Scheme_Project_Endowments_Chairs']
    },
    fieldOptions: [{ field: 'Text', keyName: "name", label: "Name of the Principal Investigator/ Co Investigator" },
    { field: 'Text', keyName: "schemename", label: "Name of the Scheme/Project/ Endowments/ Chairs" },
    { field: 'Text', keyName: "agency", label: "Name of the Funding Agency" },
    { field: 'Select', keyName: "agencyType", label: "Choose Agency Type", options: ['Government', 'Non-Government'] },
    { field: 'Text', keyName: "department", label: "Department / School" },
    { field: 'Text', keyName: "yearOfAward", label: "Award Year", },
    { field: 'Text', keyName: "funds", label: "Funds provided ( ₹ / in lakhs)", },
    { field: 'Text', keyName: "duration", label: "Duration of the project (in Years)", },]

  },






























  nameOfTheProgramsOffered: [
    "Year",
    "UG",
    "PG",
    "M.Phil",
    "Ph.D.",
    "Diploma/Certificate Course",
  ],
  teachingPostsSanctionedFilledAndVacant: [
    "Designation",
    "Sanctioned",
    "Filled",
    "Filled Under CAS",
  ],
  appointedOnGovernmentSanctionedPost: [
    "Name",
    "Designation",
    "Qualifications",
    "Teaching/Research Experience",
    "Nature Of Appointment",
  ],
  appointedFromUniversityFund: [
    "Name",
    "Designation",
    "Qualifications",
    "Teaching/Research Experience",
    "Nature Of Appointment",
  ],


  fundsReceivedAtSchoolLevel: [
    "Scheme And Funding Agency",
    "Non- Recurring",
    "Recurring",
    "Project Fellow",
    "Total",
  ],

  Patent: {
    auditHead: [
      "Sr. No.",
      "Name",
      "Patenter Name",
      "Patent Number",
      "Patent Title",
      "National / International",
      "Award Year of Patent ",
    ],
    childHead: [
      "patenterName",
      "patentNumber",
      "patentTitle",
      "isNat",
      "awardYear",
    ],
    mainKey: {
      head: ['Full Name', 'Patent Title'],
      keyName: ['name', 'patentTitle'],
    },
    fieldOptions: [
      { field: 'Text', keyName: "name", label: "Faculty Name" },
      { field: 'Text', keyName: "patenterName", label: "Patenter Name" },
      { field: 'Text', keyName: "patentNumber", label: "Patent Number" },
      { field: 'Text', keyName: "patentTitle", label: "Patent Title" },
      { field: 'Select', keyName: "isNat", label: "National / International", options: ['National', 'International'] },
      { field: 'Text', keyName: "awardYear", label: "Award Year of Patent" },]

  },
  ConsultancyServices: {
    auditHead: [
      "Sr. No.",
      "Name",
      "Consultancy Project Name",
      "Consulting / Sponsoring Agency",
      "Consultancy Year",
      "Revenue Generated(INR)",
    ],
    childHead: [
      "cProjectName",
      "cAgency",
      "cYear",
      "revenue",
    ],
    mainKey: {
      head: ['Full Name', 'Consultancy Project Name'],
      keyName: ['name', 'cProjectName']
    },
    fieldOptions: [{ field: 'Text', keyName: "name", label: "Name" },
    { field: 'Text', keyName: "cProjectName", label: "Consultancy Project Name" },
    { field: 'Text', keyName: "cAgency", label: "Consulting / Sponsoring Agency" },
    { field: 'Text', keyName: "cYear", label: "Consultancy Year" },
    { field: 'Text', keyName: "revenue", label: "Revenue Generated(INR)" },
      ,]

  },
  ConferenceOrganized: {
    auditHead: [
      'Sr. No.',
      "Name",
      "Program Title",
      "School Name",
      "Funded By",
      "National / International",
      "No of Participants",
    ],
    childHead: [
      "programTitle",
      "schoolName",
      "fundedBy",
      "isNational",
      "noOfParticipants",
    ],
    mainKey: {
      head: ['Full Name', 'Program Title'],
      keyName: ['name', 'programTitle']
    },
    fieldOptions: [{ field: 'Text', keyName: "name", label: "Name" },
    { field: 'Text', keyName: "programTitle", label: "Program Title" },
    { field: 'Text', keyName: "schoolName", label: "School Name" },
    { field: 'Text', keyName: "fundedBy", label: "Funding Agency" },
    { field: 'Select', keyName: "isNational", label: "Choose Level", options: ['National', 'International'] },
    { field: 'Text', keyName: "noOfParticipants", label: "Number of Participants" },
    ]
  },
  InvitedTalk: {
    auditHead: ['Sr. No.', 'Name',
      "Title of Lecture/Academic Session",
      "Title of Seminar, etc.",
      "Organized by ",
      "Type",
      "Nature",],
    childHead: ["lectureTitle",
      "seminarTitle",
      "organizedBy",
      "isNat",
      "nature",],
    mainKey: {
      head: ["Full Name", 'Title of Lecture/Academic Session'],
      keyName: ['name', 'lectureTitle']
    },
    fieldOptions: [{ field: 'Text', keyName: "name", label: "Name" },
    { field: 'Text', keyName: "lectureTitle", label: "Title of Lecture/Academic Session" },
    { field: 'Text', keyName: "seminarTitle", label: "Title of Seminar" },
    { field: 'Text', keyName: "organizedBy", label: "Organized by" },
    { field: 'Select', keyName: "isNat", label: "Type", options: ["State/University", "National", "International (within country)", "International (Abroad)"] },
    { field: 'Select', keyName: "nature", label: "Nature ", options: ["Invited Talk", "Resource Person", "Paper Presentation"] },
    ]
  },

  Online: {
    auditHead: [
      'Sr. No.',
      "Full Name",
      "Program Title",
      "Organized by",
      "From",
      "To",
    ],
    childHead: [
      "programTitle",
      "nameOfAttendedTeacher",
      "durationFrom",
      "durationTo",
    ],
    mainKey: {
      head: ['Full Name', 'Program Title'],
      keyName: ['name', 'programTitle']
    },
    fieldOptions: [{ field: 'Text', keyName: "name", label: "Name" },
    { field: 'Text', keyName: "programTitle", label: "Program Title" },
    { field: 'Text', keyName: "nameOfAttendedTeacher", label: "Organized by" },
    { field: 'Date', keyName: "durationFrom", label: "From" },
    { field: 'Date', keyName: "durationTo", label: "To" },
    ]
  },


  AwardRecognition: {
    auditHead: [
      'Sr. No.',
      "Name",
      "Award Year",
      "PAN",
      "Designation",
      "Name of the Award, Fellowship, received from Government",
      "Award Agency Name",
      "National / International",
      "Incentives/Type of incentive given by the HEI in recognition of the award",
    ],
    childHead: [
      "awardYear",
      "pan",
      "designation",
      "awardName",
      "agencyName",
      "isNat",
      "incentive",
    ],
    mainKey: {
      head: ['Full Name', 'Name of the Award, Fellowship, received'],
      keyName: ['name', 'awardName']
    },
    fieldOptions: [{ field: 'Text', keyName: "name", label: "Name" },
    { field: 'Text', keyName: "awardYear", label: "Award Year" },
    { field: 'Text', keyName: "pan", label: "PAN" },
    { field: 'Text', keyName: "designation", label: "Designation" },
    { field: 'Text', keyName: "awardName", label: "Name of the Award" },
    { field: 'Text', keyName: "agencyName", label: "Name of the Agency" },
    { field: 'Select', keyName: "isNat", label: "Type", options: ["National", "International"] },
    { field: 'Text', keyName: "incentive", label: "Incentives/Type of incentive given by the HEI in recognition of the award" },]

  },
  JrfSrf: {
    auditHead: [
      'Sr. No.',
      "Full Name",
      "Research Fellow Name",
      "Enrollment Date",
      "Fellowship Duration",
      "Fellowship Type",
      "Granting Agency",
      "Qualifying Exam (if any)",
    ],
    childHead: [
      "researchName",
      "enrolmentYear",
      "fellowshipDuration",
      "fellowshipType",
      "grantingAgency",
      "qualifyingExam",
    ],
    mainKey: {
      head: ['Full Name', 'Research Fellow Name'],
      keyName: ['name', 'researchName']
    },
    fieldOptions: [{ field: 'Text', keyName: "name", label: "Name" },
    { field: 'Text', keyName: "researchName", label: "Research Fellow Name" },
    { field: 'Date', keyName: "enrolmentYear", label: "Enrollment Date" },
    { field: 'Text', keyName: "fellowshipDuration", label: "Fellowship Duration" },
    { field: 'Text', keyName: "fellowshipType", label: "Type of Felloship" },
    { field: 'Text', keyName: "grantingAgency", label: "Granting Agency" },
    { field: 'Text', keyName: "qualifyingExam", label: "Qualifying Exam" },
    ]
  },

  Award: {
    auditHead: ["Sr. No.", "Title of the innovation", "Name of the Award", "Name of the Awarding Agency", "Contact details(Agency)", "Year of Award", "Category"],
    childHead: ["Title_of_the_innovation", "Name_of_the_Award", "Name_of_the_Awarding_Agency", "Contact_details_Agency", "Year_of_Award", "Category"],
    stateHead: ["innovationTitle", "awardName", "agency", "contact", "awardYear", "category"],
    fieldOptions: [{ field: 'Text', keyName: "innovationTitle", label: "Title of the Innovation" },
    { field: 'Text', keyName: "awardName", label: "Name of the Award" },
    { field: 'Text', keyName: "agency", label: "Name of the Awarding Agency" },
    { field: 'Text', keyName: "contact", label: "Contact details(Agency)" },
    { field: 'Text', keyName: "awardYear", label: "Award Year", },
    { field: 'Select', keyName: "category", label: "Choose Category", options: ['Institution', 'Teacher', 'Research Scholar', 'Student'] },
    ],
    mainKey: {
      head: ['Title of the innovation'],
      keyName: ['Title_of_the_innovation']
    }
  },
  SyllabusRevision: {
    auditHead: ["Sr. No.", "Programme Code", "Programme Name", "Year of Introduction", "Status of implementation", "Year of Implimentation", "Year of Revision", "Percentage of content added or replaced"],
    childHead: ["Programme_Code", "Programme_Name", "Year_of_Introduction", "Status_of_implementation", "Year_of_Implimentation", "Year_of_Revision", "Percentage_of_content_added_or_replaced"],
    stateHead: ['programCode', 'programName', 'yearOfIntroduction', 'statusOfImplementation', 'yearOfImplimentation', 'yearOfRevision', 'percentage'],
    fieldOptions: [{ field: 'Text', keyName: "programCode", label: "Programme Code" },
    { field: 'Text', keyName: "programName", label: "Programme Name" },
    { field: 'Text', keyName: "yearOfIntroduction", label: "Year of Introduction" },
    { field: 'Text', keyName: "statusOfImplementation", label: "Status of implementation", },
    { field: 'Text', keyName: "yearOfImplimentation", label: "Year of Implimentation", },
    { field: 'Text', keyName: "yearOfRevision", label: "Year of Revision", },
    { field: 'Text', keyName: "percentage", label: "Percentage of content added or replaced", },
    ],
    mainKey: {
      head: ['Programme Name'],
      keyName: ['Programme_Name']
    }

  },
  Employability: {
    auditHead: ["Sr. No.", "Course Code", "Name of the Course", "Year of introduction",
      "Activities / Employability Content / Entrepreneurship / Skill development"],
    childHead: ["Course_Code", "Name_of_the_Course", "Year_of_introduction",
      "Activities_Content_with_direct_bearing_on_Employability_Entrepreneurship_Skill_development"],
    stateHead: ['courseCode', 'courseName', 'yearOfIntroduction',
      'activity'],
    fieldOptions: [{ field: 'Text', keyName: "courseCode", label: "Course Code" },
    { field: 'Text', keyName: "courseName", label: "Name of the Course" },
    { field: 'Text', keyName: "yearOfIntroduction", label: "Year of Introduction" },
    { field: 'Text', keyName: "activity", label: "Activities /   Employability Content / Entrepreneurship / Skill development" },
    ],
    mainKey: {
      head: ['Name of the Course'],
      keyName: ['Name_of_the_Course']
    }

  },
  ValueAddedCource: {
    auditHead: ["Sr. No.", "Name of the value added courses offered", "Course Code", "Year of offering", "No. of times offered during the same year", "Duration of the course (in Months)", "Number of students enrolled", "Number of Students completing the course"],
    childHead: ["Name_of_the_value_added_courses_offered", 'Course_Code_if_any', "Year_of_offering", "Duration_of_the_course", "No_of_times_offered_during_the_same_year", "Number_of_students_enrolled", "Number_of_Students_completing_the_course"],
    stateHead: ["courseName", "courseCode", 'yearOfOffering', 'courseDuration', 'frequencyOfOffering', 'studentsEnrolled', 'completedCourse'],
    fieldOptions: [
      { field: 'Text', keyName: "courseName", label: "Name of the Value added Course" },
      { field: 'Text', keyName: "courseCode", label: "Course Code" },
      { field: 'Text', keyName: "yearOfOffering", label: "Year of Offering" },
      { field: 'Text', keyName: "courseDuration", label: "Duration of the course (in Months)" },
      { field: 'Text', keyName: "frequencyOfOffering", label: "No. of times offered during the same year" },
      { field: 'Text', keyName: "studentsEnrolled", label: "Number of students enrolled" },
      { field: 'Text', keyName: "completedCourse", label: "Number of Students completing the course", },
    ],
    mainKey: {
      head: ['Name of the value added courses offered'],
      keyName: ['Name_of_the_value_added_courses_offered']
    }
  },
  ProjectsInternships: {
    auditHead: ["Sr. No.", "Program Code", "Programme name", "Name of the student",],
    childHead: ["Programme_Code", "Programme_name", "Name_of_the_student",],
    stateHead: ["programCode", "programName", "studentName",],
    fieldOpions: [{ field: 'Text', keyName: "programCode", label: "Program Code" },
    { field: 'Text', keyName: "programName", label: "Name of the Program" },
    { field: 'Text', keyName: "studentName", label: "Name of the Student" },
    ],
    mainKey: {
      head: ['Program Code', 'Programme name'],
      keyName: ['Programme_Code', 'Programme_name']
    }


  },
  DemandRatio: {
    auditHead: ["Sr. No.", "Programme Code", "Programme name", "Type of Program", "Number of seats available", "Number of eligible applications", "Number of Students admitted"],
    childHead: ["Programme_Code", "Programme_name", 'Type_of_program', "Number_of_seats_available",
      "Number_of_eligible_applications", "Number_of_Students_admitted"],
    stateHead: ["programCode", "programName", 'programType', "numberOfSeatsAvailable", "numberOfApplications",
      "numberOfStudents"],
    fieldOptions: [{ field: 'Text', keyName: "programCode", label: "Program Code" },
    { field: 'Text', keyName: "programName", label: "Name of the Program" },
    { field: 'Select', keyName: "programType", label: "Choose Program Type", options: ['UG', 'PG', 'Ph.D.', 'Diploma', 'PG Diploma', 'Certificate'] },
    { field: 'Text', keyName: "numberOfSeatsAvailable", label: "Number of seats available" },
    { field: 'Text', keyName: "numberOfApplications", label: "Number of eligible applications" },
    { field: 'Text', keyName: "numberOfStudents", label: "Number of Students admitted" },
    ],
    mainKey: {
      head: ["Programme Code", "Programme name"],
      keyName: ["Programme_Code", "Programme_name"]
    }
  },

  ProgressionToHE: {
    auditHead: ["Sr. No.", "Name of student enrolling", "Program graduated from", "Name of institution admitted", "Name of programme admitted",],
    childHead: ['Name_of_student_enrolling', "Program_graduated_from", "Name_of_institution_admitted", "Name_of_programme_admitted"],
    stateHead: ["studentEnrolling", "program", "institute", 'programName',],

    fieldOptions: [{ field: 'Text', keyName: "studentEnrolling", label: "Name of student enrolling" },
    { field: 'Text', keyName: "program", label: "Program graduated from" },
    { field: 'Text', keyName: "institute", label: "Name of institution admitted" },
    { field: 'Text', keyName: "programName", label: "Name of programme admitted" },],

    mainKey: {
      head: ["Name of student enrolling", "Program graduated from"],
      keyName: ["Name_of_student_enrolling", "Program_graduated_from"]
    }

  },

  AlumniContribution: {
    auditHead: ["Sr. No.", "Name Of The Alumni", "Program Graduated From", "Contribution Amount in ₹"],
    childHead: ['Name_of_The_Alumni_Contributed', "Program_graduated_from", "Amount_of_contribution"],
    stateHead: ["name", "program", "amount"],
    fieldOptions: [
      { field: 'Text', keyName: "name", label: "Name Of The Alumni" },
      { field: 'Text', keyName: "program", label: "Program graduated from" },
      { field: 'Text', keyName: "amount", label: "Contribution Amount in ₹" },
    ],

    mainKey: {
      head: ["Name Of The Alumni", "Contribution Amount in ₹"],
      keyName: ["Name_of_The_Alumni_Contributed", "Amount_of_contribution"]
    }
  },


  Placement: {
    auditHead: ["Sr. No.", "Name of student placed", "Program graduated from", "Name of the employer", "Employer contact details", "Pay package ( ₹ / annum)", "Year of Placement",],
    childHead: ['Name_of_student_placed', "Program_graduated_from", "Name_of_the_employer", "Employer_contact_details", "Pay_package_annum", "Year_of_Placement",],
    stateHead: ["name", "program", "employer", 'contact', 'package', 'placementYear', ,],

    fieldOptions: [{ field: 'Text', keyName: "name", label: "Name of student placed" },
    { field: 'Text', keyName: "program", label: "Program graduated from" },
    { field: 'Text', keyName: "employer", label: "Name of the employer" },
    { field: 'Text', keyName: "contact", label: "Employer contact details" },
    { field: 'Text', keyName: "package", label: "Pay package ( ₹ / annum)" },
    { field: 'Text', keyName: "placementYear", label: "Year of Placement" },],

    mainKey: {
      head: ["Name of student placed", "Program graduated from"],
      keyName: ["Name_of_student_placed", "Program_graduated_from"]
    }

  },

  QualifiedExams: {
    auditHead: ["Sr. No.", "Registration number / roll number", "Name of student qualified", "Exam Qualified"],
    childHead: ['Registration_number_roll_number', "Names_of_students_selected_qualified", "Name_of_the_Exam",],
    stateHead: ["rollno", "studentName", "examName",],

    fieldOptions: [{ field: 'Text', keyName: "rollno", label: "Registration number / roll number" },
    { field: 'Text', keyName: "studentName", label: "Name of student qualified" },
    { field: 'Text', keyName: "examName", label: "Exam Qualified" },],

    mainKey: {
      head: ["Name of student qualified", "Qualified Exams"],
      keyName: ["Names_of_students_selected_qualified", "Name_of_the_Exam"]
    }

  },

  detailOfSyllabusRevision: [
    "Year Of Revision",
    "Program",
    "Courses Revised",
    "Courses Added (With Reason)",
    "Courses Removed (With Reason)",
    "Define The Type Of Revision-Content / Assessment Pattern / Any Other Change",
    "% Of Revision",
  ],

  TrainingProgramsOrganized: {
    auditHead: ["Sr. No.", "Title of the Program", "Year", "From Date", "To Date", "Type of staff", "Number of Participants"],
    childHead: ["Title_Of_the_Program", "Year", "From_Date", "To_Date", "Type_of_staff", "Number_of_Participants"],
    stateHead: ['programName', 'year', 'fromDate', 'toDate', 'staffType', 'numberOfParticipants'],
    fieldOptions: [
      { field: 'Text', keyName: "programName", label: "Title of the program" },
      { field: 'Text', keyName: "year", label: "Year" },
      { field: 'Date', keyName: "fromDate", label: "From Date" },
      { field: 'Date', keyName: "toDate", label: "To Date" },
      { field: 'Select', keyName: "staffType", label: "Choose Staff", options: ['Teaching Staff', 'Non-Teaching Staff'] },
      { field: 'Text', keyName: "numberOfParticipants", label: "Number of Participants", },
    ],
    mainKey: {
      head: ['Title of the Program'],
      keyName: ['Title_Of_the_Program'],
    },
  },

  ConferencesSemiWorkshopOrganized: {
    auditHead: ["Sr. No.", "Title of the Program", "Year", "From Date", "To Date", "Level of program", "Number of Participants"],
    childHead: ["Title_Of_the_Program", "Year", "From_Date", "To_Date", "Level_of_program", "Number_of_Participants"],
    stateHead: ['programName', 'year', 'fromDate', 'toDate', 'level', 'numberOfParticipants'],
    fieldOptions: [
      { field: 'Text', keyName: "programName", label: "Title of the program" },
      { field: 'Text', keyName: "year", label: "Year" },
      { field: 'Date', keyName: "fromDate", label: "From Date" },
      { field: 'Date', keyName: "toDate", label: "To Date" },
      { field: 'Select', keyName: "level", label: "Choose Level", options: ['State', 'University', 'National', 'International'] },
      { field: 'Text', keyName: "numberOfParticipants", label: "Number of Participants", },
    ],
    mainKey: {
      head: ['Title of the Program'],
      keyName: ['Title_Of_the_Program'],
    },
  },

  ExtensionActivities: {
    auditHead: ['Sr. No.', 'Name of the activity', 'Organising unit/ agency/ collaborating agency', 'Name of the scheme', 'Year of the activity', 'Number of students participated in such activities'],
    childHead: ["Name_of_the_activity", "Organising_unit", "Name_of_the_scheme", "Year_of_activity", "Number_of_students"],
    stateHead: ['activityName', 'unit', 'schemeName', 'year', 'students'],
    fieldOptions: [
      { field: 'Text', keyName: "activityName", label: "Name of the activity" },
      { field: 'Text', keyName: "unit", label: "Organising unit/ agency/ collaborating agency" },
      { field: 'Text', keyName: "schemeName", label: "Name of the scheme" },
      { field: 'Text', keyName: "year", label: "Year of Activity" },
      { field: 'Text', keyName: "students", label: "Number of students participated in such activities" },],
    mainKey: {
      head: ['Name of the activity'],
      keyName: ['Name_of_the_activity'],
    },
  },




  howManyCoursesInTheSyllabus:
    [
      "Name Of The Ccourse (With No Of Credits)",
      "Program",
      "Details Of Employability / Skill Development / Entrepreneurship Related Activity Carried Out To Support This Course. Give Details Of MoUs With Relevant Organizations For These Courses,(If Any",
    ],
  valueAadditionCoursesForImpartingTransferableAndLifeSkillsOffered: [
    "Name Of The Course",
    "No Of Hours (Minimum 30 Hours)",
    "Run In Year...",
    "No Of Time Per Year",
    "Noof Students Enrolled",
  ],
  hasTheSchoolIncorporatedTopicsCoursesRelevantToProfessionalEthicsGenderHumanValuesEnvironmentAndSustainabilityIntoTheCurriculum:
    [
      "Name Of The Program ",
      "Course Code ",
      "Name Of The Course ",
      "Description Of The Course",
    ],
  programObjectiveAndOutcomes: [
    "Program Name",
    "Program Educational Objectives (PEO)",
    "PROGRAMME OUTCOMES (PO)",
    "PROGRAMME SPECIFIC OUTCOMES (PSO)",
  ],
  courceObjectiveAndOutcomes: [
    "Program Name",
    "Course Code",
    "Course Name",
    "Course Objectives",
    "Course Outcomes (CO)",
  ],
  studentProfileProgrammewiseAtUGAndPG: [
    "UG / PG / Diploma / Certificate",
    "Applications Received",
    "No. Of Students Admitted",
    "Seats Available",
    "Male",
    "Female",
    "Total",
    "Year",
  ],
  yearWiseResultsOfStudentsAtUGAndPG: [
    "Program name",
    "Type : UG / PG / Diploma / PG Diploma/Certificate",
    "Year",
    "Appeared",
    "Passed",
    "Pass %",
  ],
  informationAboutJRFSRFOtherFellowships: [
    "Sr. No.",
    "Name Of Research Fellow",
    "Year Of Enrolment",
    "Duration Of Fellowship",
    "Type of  the fellowship",
    "Granting agency",
    "Qualifying Exam If Any (NET, GATE)",
  ],

  informationAboutPhDProgramme: [
    "Year",
    "Applications Received",
    "Intake",
    "No. Of Students Admitted",
    "Male ",
    "Female ",
    "Total",
  ],
  studentRatio: {
    auditHead: ["Sr. No.", "Name Of The Program",
      "Demand Ratio", "Action"],
    childHead: ["programName", "ratio"],
    fieldOptions: [
      { field: 'Text', keyName: "programName", label: "Name of the Program" },
      { field: 'Text', keyName: "ratio", label: "Student-Demand Ratio" },
    ]
  },
  teacherRatio: {
    auditHead: ["Sr. No.", "Name Of The Program",
      "Student-Teacher Ratio", "Action"],
    childHead: ["programName", "ratio"],
    fieldOptions: [
      { field: 'Text', keyName: "programName", label: "Name of the Program" },
      { field: 'Text', keyName: "ratio", label: "Student-Teacher Ratio" },
    ]
  },

  numberOfStudentsAwardedMPhilPhDDegree: [
    "Year",
    "M.Phil",
    "Ph.D.",
    "Total"
  ],
  numberOfStudentsClearedCivilServicesAndDefenseServicesExaminationsNETSETGATEAndOtherCompetitiveExaminations: [
    "Year",
    "MPSC / UPSC",
    "NET / SET",
    "GATE",
    "Other Exams",
    "Total"
  ],
  studentProgressionPlacementRecordNumberPercentageOfStudentsProceededForHigherStudiesNumberPercentageOfStudentsPlaced: [
    "Year",
    "No Of Students For Higher Studies",
    "No Of Students Placed"
  ],
};


const categorywiseTables = {
  schoolInfoTables: {
    ugPrograms: { title: 'UG Programs offered', tableInfo: TableData.programs },
    pgPrograms: { title: 'PG Programs offered', tableInfo: TableData.programs },
    mphilProgramsSimple: { title: 'M.Phil Programs offered', tableInfo: TableData.programs },
    phdProgramsSimple: { title: 'Ph.D. Programs offered', tableInfo: TableData.programs },
    diplomaPrograms: { title: 'Diploma Programs offered', tableInfo: TableData.programs },
    programDuringYear: { title: 'Programs offered during year', tableInfo: TableData.programs },
    listOfVisitingTeachers: { title: 'List of Visiting Fellows/Teachers, Adjunct and Emeritus Professors', tableInfo: TableData.listOfVisitingTeachers },
    academicSupportStaff: { title: 'Academic support staff (technical) and administrative staff sanctioned, filled and vacant', tableInfo: TableData.academicSupportStaff },
    facilities: { title: 'Details of Research facilities available in the School and recognition received', tableInfo: TableData.facilities },
    ethicsAdded: { title: 'Details of School incorporated topics/courses relevant to Professional Ethics, Gender, Human Values, Environment and Sustainability into the Curriculum', tableInfo: TableData.ethicsAdded },
    programOutcomes: { title: 'Program Objectives and Outcomes', tableInfo: TableData.programOutcomes },
    courseOutcomes: { title: 'Course Objectives and Outcomes', tableInfo: TableData.courseOutcomes },
    yearWiseUGPG: { title: 'Year-wise results of students at UG and PG', tableInfo: TableData.yearWiseUGPG },
    studentRatio: { title: 'Program wise Student-Demand Ratio', tableInfo: TableData.studentRatio },

    teacherRatio: { title: 'Student-Teacher Ratio', tableInfo: TableData.teacherRatio },

    appointmentGovtPost: { title: 'Appointed on Government Sanctioned Post', tableInfo: TableData.appointmentGovtPost },

    appointmentUniversityFund: { title: 'Appointed from University Fund', tableInfo: TableData.appointmentGovtPost },

    academicActivityParticipation: { title: 'Participation of teachers in various academic activities as members of committees', tableInfo: TableData.academicActivityParticipation },

    sabMember: { title: 'School Advisory Board', tableInfo: TableData.sabMember },

    alumniList: { title: 'Distinguished alumni of the School ', tableInfo: TableData.alumniList },

    alumniActivities: { title: 'Various Alumni activities', tableInfo: TableData.alumniActivities },

    meetingDetails: { title: 'School Advisory Board : Meeting details', tableInfo: TableData.meetingDetails, takeFrom: 'fileFeedback' }

  },
  facultyTables: {
    researchFundingAgency: { title: 'Information about research grants, projects completed and ongoing during the year', tableInfo: TableData.ResearchProject, model: 'ResearchProject' },
    publication: { title: 'Publication Details', tableInfo: TableData.ResearchPaper, model: 'ResearchPaper' },
    patents: { title: 'Patent Details', tableInfo: TableData.Patent, model: 'Patent' },
    consultancy: { title: 'Consultancy Details', tableInfo: TableData.ConsultancyServices, model: 'ConsultancyServices' },

    invitedTalks: { title: 'Details of teachers invited as resource persons for Refresher courses, Orientation courses, Seminars, Workshops, Conferences', tableInfo: TableData.InvitedTalk, model: 'InvitedTalk' },

    facultyAwards: { title: 'Awards / Prizes and recognitions received by teachers', tableInfo: TableData.AwardRecognition, model: 'AwardRecognition' },


    facultyJrfSrf: { title: 'JRF/SRF/Other fellowships details', tableInfo: TableData.JrfSrf, model: 'JrfSrf' },

    onlineFDP: { title: 'Orientation / Refresher Course / Online FDP', tableInfo: TableData.Online, model: 'Online' },


    financialSupport: { title: 'Financial Support To Attend Conferences', tableInfo: TableData.FinancialSupport, model: 'FinancialSupport' },



  },
  directorTables: {
    ugcSap: { title: 'Funds received at School level through DST-FIST; CSIR, UGC-SAP/CAS, DAE, DBT, BRNS, ICSSR, AICTE, RGSTC', tableInfo: TableData.UgcSapCasDstFistDBTICSSR, model: 'UgcSapCasDstFistDBTICSSR' },
    schoolConference: { title: 'Professional Development / Administrative Training Programs Organized', tableInfo: TableData.TrainingProgramsOrganized, model: 'TrainingProgramsOrganized' },
    schoolSeminarOrganized: { title: 'Conferences / Seminar / Workshop Organized', tableInfo: TableData.ConferencesSemiWorkshopOrganized, model: 'ConferencesSemiWorkshopOrganized' },
    syllabusRevision: { title: 'Syllabus Revision', tableInfo: TableData.SyllabusRevision, model: 'SyllabusRevision' },
    employability: { title: 'Courses in the syllabus which are identified as skill /entrepreneurship based courses having attached activities during the semester', tableInfo: TableData.Employability },
    valueAddedCourse: { title: 'Value added courses', tableInfo: TableData.ValueAddedCource, model: 'ValueAddedCource' },
    projectAndInternships: { title: 'Project / Research projects / Internships', tableInfo: TableData.ProjectsInternships, model: 'ProjectsInternships' },

    demandRatio: { title: 'Student profile programme-wise at UG and PG', tableInfo: TableData.DemandRatio, model: 'DemandRatio' },

    qualifiedExams: { title: 'Exams Qualified', tableInfo: TableData.QualifiedExams, model: 'QualifiedExams' },

    extentionActivities: { title: 'Extension activities in the neighborhood community in terms of impact and sensitizing students to social issues and holistic development', tableInfo: TableData.ExtensionActivities, model: 'ExtensionActivities' },

    progression: { title: 'Student progression: Number / percentage of students proceeded for higher studies Number', tableInfo: TableData.ProgressionToHE, model: 'ProgressionToHE' },

    placement: { title: 'Placement record: Number / percentage of students placed', tableInfo: TableData.Placement, model: 'Placement' },

    alumniContribution: { title: 'Contribution by Alumni', tableInfo: TableData.AlumniContribution, model: 'AlumniContribution' },

    awardsAndPrizes: { title: 'Awards and Prizes received by students', tableInfo: TableData.Award, model: 'Award' },
  },
  cellAsInputTables: {

    teachingPosts: {
      title: 'Number of teaching posts sanctioned, filled and vacant',
      tableHead: ["Designation", "Sanctioned", "Filled", "Filled under CAS"]
    },

    mphilPrograms: { title: 'Information about M.Phil programme', tableHead: ["Applications Received", "Intake", "Admissions", "Male", "Female", "Others", "Total"] },

    phdPrograms: { title: 'Information about Ph.D. programme', tableHead: ["Applications Received", "Intake", "Admissions", "Male", "Female", "Others", "Total"] },

    mphilPhd: { title: "Number of students awarded M.Phil. & Ph.D. Degree", tableHead: ["Degree", "Male", "Female", "Total"] },

    facultyAwardsDegree: { title: "Number of faculty who were awarded M.Phil., Ph.D., D.Sc. / D.Lit.", tableHead: ["M.Phil.", "Ph.D.", "D.Sc.", "D.Lit."] }
  },
  richTextTables: {
    schoolParticipationDetails: { title: 'Details of Participation of the School in the curriculum development.' },
    schoolInfra: { title: 'Present details of School infrastructural & other facilities' },
    studentMonitor: { title: 'Student Mentoring' },
    greenCampus: { title: 'Activities programs related to Gender Equality, Green Campus, Constitutional Values, Tolerance and Harmony' },
    commemorative: { title: 'Commemorative Events of regional, national and international importance' },
    studentEnrichment: { title: 'Details of student enrichment programmes (special lectures / workshops / seminar) involving external experts.' },
    programObjectives: { title: 'How does the School ensure that programme objectives are constantly met and learning outcomes are monitored?' },
    schoolFeatures: { title: 'Unique features and innovative practices of the School.' },
    schoolStrength: { title: 'School Strengths' },
    schoolWeakness: { title: 'School Weaknesses' },
    schoolOppos: { title: 'School Opportunities' },
    schoolChallenges: { title: 'School Challenges' },
    futurePlans: { title: 'Future plans of the School' },
  }
}


const reportTables = [

  { title: 'UG Programs offered', tableInfo: TableData.programs, tableFromAAA: 'schoolInfoTables', tableName: 'ugPrograms' },

  { title: 'PG Programs offered', tableInfo: TableData.programs, tableFromAAA: 'schoolInfoTables', tableName: 'pgPrograms' },

  { title: 'M.Phil Programs offered', tableInfo: TableData.programs, tableName: 'mphilProgramsSimple', tableFromAAA: 'schoolInfoTables', },

  { title: 'Ph.D. Programs offered', tableInfo: TableData.programs, tableFromAAA: 'schoolInfoTables', tableName: 'phdProgramsSimple' },

  { title: 'Diploma Programs offered', tableInfo: TableData.programs, tableFromAAA: 'schoolInfoTables', tableName: 'diplomaPrograms' },

  { title: 'Programs offered during year', tableInfo: TableData.programs, tableFromAAA: 'schoolInfoTables', tableName: 'programDuringYear' },

  { title: 'Details of School incorporated topics/courses relevant to Professional Ethics, Gender, Human Values, Environment and Sustainability into the Curriculum', tableInfo: TableData.ethicsAdded, tableFromAAA: 'schoolInfoTables', tableName: 'ethicsAdded' },

  { title: 'Program Objectives and Outcomes', tableInfo: TableData.programOutcomes, tableFromAAA: 'schoolInfoTables', tableName: 'programOutcomes' },

  { title: 'Course Objectives and Outcomes', tableInfo: TableData.courseOutcomes, tableFromAAA: 'schoolInfoTables', tableName: 'courseOutcomes' },

  { title: 'Syllabus Revision', tableInfo: TableData.SyllabusRevision, model: 'SyllabusRevision', tableFromAAA: 'directorTables', tableName: 'syllabusRevision' },

  { title: 'Courses in the syllabus which are identified as skill /entrepreneurship based courses having attached activities during the semester', tableInfo: TableData.Employability, tableFromAAA: 'directorTables', tableName: 'employability' },

  { title: 'Value added courses', tableInfo: TableData.ValueAddedCource, model: 'ValueAddedCource', tableFromAAA: 'directorTables', tableName: 'valueAddedCourse' },

  { title: 'Project / Research projects / Internships', tableInfo: TableData.ProjectsInternships, model: 'ProjectsInternships', tableFromAAA: 'directorTables', tableName: 'projectAndInternships' },

  { title: 'Academic support staff (technical) and administrative staff sanctioned, filled and vacant', tableInfo: TableData.academicSupportStaff, tableFromAAA: 'schoolInfoTables', tableName: 'academicSupportStaff' },

  { title: 'Funds received at School level through DST-FIST; CSIR, UGC-SAP/CAS, DAE, DBT, BRNS, ICSSR, AICTE, RGSTC', tableInfo: TableData.UgcSapCasDstFistDBTICSSR, model: 'UgcSapCasDstFistDBTICSSR', tableFromAAA: 'directorTables', tableName: "ugcSap" },

  { title: 'Appointed on Government Sanctioned Post', tableInfo: TableData.appointmentGovtPost, tableName: "appointmentGovtPost", tableFromAAA: 'schoolInfoTables' },

  { title: 'Appointed from University Fund', tableInfo: TableData.appointmentGovtPost, tableName: "appointmentUniversityFund", tableFromAAA: 'schoolInfoTables' },

  { title: 'Participation of teachers in various academic activities as members of committees', tableInfo: TableData.academicActivityParticipation, tableName: "academicActivityParticipation", tableFromAAA: 'schoolInfoTables' },

  { title: 'Information about research grants, projects completed and ongoing during the year', tableInfo: TableData.ResearchProject, model: 'ResearchProject', tableFromAAA: 'facultyTables', tableName: 'researchFundingAgency' },

  { title: 'Publication Details', tableInfo: TableData.ResearchPaper, model: 'ResearchPaper', tableFromAAA: 'facultyTables', tableName: 'publication', },

  { title: 'Patent Details', tableInfo: TableData.Patent, model: 'Patent', tableFromAAA: 'facultyTables', tableName: 'patents', },

  { title: 'Consultancy Details', tableInfo: TableData.ConsultancyServices, model: 'ConsultancyServices', tableFromAAA: 'facultyTables', tableName: 'consultancy', },

  { title: 'Details of teachers invited as resource persons for Refresher courses, Orientation courses, Seminars, Workshops, Conferences', tableInfo: TableData.InvitedTalk, model: 'InvitedTalk', tableFromAAA: 'facultyTables', tableName: 'invitedTalks', },

  { title: 'Awards / Prizes and recognitions received by teachers', tableInfo: TableData.AwardRecognition, model: 'AwardRecognition', tableFromAAA: 'facultyTables', tableName: 'facultyAwards', },


  { title: 'Orientation / Refresher Course / Online FDP', tableInfo: TableData.Online, model: 'Online', tableFromAAA: 'facultyTables', tableName: 'onlineFDP' },

  { title: 'Financial Support To Attend Conferences', tableInfo: TableData.FinancialSupport, model: 'FinancialSupport', tableFromAAA: 'facultyTables', tableName: 'financialSupport' },

  { title: "Number of faculty who were awarded M.Phil., Ph.D., D.Sc. / D.Lit.", tableHead: ["M.Phil.", "Ph.D.", "D.Sc.", "D.Lit."], tableFromAAA: 'cellAsInputTables', tableName: 'facultyAwardsDegree' },

  { title: 'Year-wise results of students at UG and PG', tableInfo: TableData.yearWiseUGPG, tableFromAAA: 'schoolInfoTables', tableName: 'yearWiseUGPG' },

  { title: 'Program wise Student-Demand Ratio', tableInfo: TableData.studentRatio, tableFromAAA: 'schoolInfoTables', tableName: 'studentRatio' },

  { title: 'Student-Teacher Ratio', tableInfo: TableData.teacherRatio, tableFromAAA: 'schoolInfoTables', tableName: 'teacherRatio' },

  { title: 'JRF/SRF/Other fellowships details', tableInfo: TableData.JrfSrf, model: 'JrfSrf', tableFromAAA: 'facultyTables', tableName: 'facultyJrfSrf' },

  { title: 'Awards and Prizes received by students', tableInfo: TableData.Award, model: 'Award', tableFromAAA: 'directorTables', tableName: 'awardsAndPrizes' },

  { title: 'Student profile programme-wise at UG and PG', tableInfo: TableData.DemandRatio, model: 'DemandRatio', tableFromAAA: 'directorTables', tableName: 'demandRatio' },

  { title: 'Exams Qualified', tableInfo: TableData.QualifiedExams, model: 'QualifiedExams', tableFromAAA: 'directorTables', tableName: 'qualifiedExams' },

  { title: 'Student progression: Number / percentage of students proceeded for higher studies Number', tableInfo: TableData.ProgressionToHE, model: 'ProgressionToHE', tableFromAAA: 'directorTables', tableName: 'progression' },

  { title: 'Information about M.Phil programme', tableHead: ["Applications Received", "Intake", "Admissions", "Male", "Female", "Others", "Total"], tableFromAAA: 'cellAsInputTables', tableName: 'mphilPrograms' },

  { title: 'Information about Ph.D. programme', tableHead: ["Applications Received", "Intake", "Admissions", "Male", "Female", "Others", "Total"], tableFromAAA: 'cellAsInputTables', tableName: 'phdPrograms' },

  { title: "Number of students awarded M.Phil. & Ph.D. Degree", tableHead: ["Degree", "Male", "Female", "Total"], tableFromAAA: 'cellAsInputTables', tableName: 'mphilPhd' },

  { title: 'Distinguished alumni of the School ', tableInfo: TableData.alumniList, tableFromAAA: 'schoolInfoTables', tableName: 'alumniList' },

  { title: 'Various Alumni activities', tableInfo: TableData.alumniActivities, tableFromAAA: 'schoolInfoTables', tableName: 'alumniActivities' },

  { title: 'Contribution by Alumni', tableInfo: TableData.AlumniContribution, model: 'AlumniContribution', tableFromAAA: 'directorTables', tableName: 'alumniContribution' },

  { title: 'Placement record: Number / percentage of students placed', tableInfo: TableData.Placement, model: 'Placement', tableFromAAA: 'directorTables', tableName: 'placement' },

  { title: 'List of Visiting Fellows/Teachers, Adjunct and Emeritus Professors', tableInfo: TableData.listOfVisitingTeachers, tableFromAAA: 'schoolInfoTables', tableName: 'listOfVisitingTeachers' },

  { title: 'Details of Research facilities available in the School and recognition received', tableInfo: TableData.facilities, tableFromAAA: 'schoolInfoTables', tableName: 'facilities' },

  { title: 'School Advisory Board', tableInfo: TableData.sabMember, tableFromAAA: 'schoolInfoTables', tableName: 'sabMember' },

  { title: 'School Advisory Board : Meeting details', tableInfo: TableData.meetingDetails, tableFromAAA: 'fileFeedback', tableName: 'meetingDetails' },

  { title: 'Funds received at School level through DST-FIST; CSIR, UGC-SAP/CAS, DAE, DBT, BRNS, ICSSR, AICTE, RGSTC', tableInfo: TableData.UgcSapCasDstFistDBTICSSR, model: 'UgcSapCasDstFistDBTICSSR', tableFromAAA: 'directorTables', tableName: 'ugcSap' },

  { title: 'Professional Development / Administrative Training Programs Organized', tableInfo: TableData.TrainingProgramsOrganized, model: 'TrainingProgramsOrganized', tableFromAAA: 'directorTables', tableName: 'schoolConference' },

  { title: 'Conferences / Seminar / Workshop Organized', tableInfo: TableData.ConferencesSemiWorkshopOrganized, model: 'ConferencesSemiWorkshopOrganized', tableFromAAA: 'directorTables', tableName: 'schoolSeminarOrganized' },

  { title: 'Extension activities in the neighborhood community in terms of impact and sensitizing students to social issues and holistic development', tableInfo: TableData.ExtensionActivities, model: 'ExtensionActivities', tableFromAAA: 'directorTables', tableName: 'extentionActivities' },

  { title: 'Details of Participation of the School in the curriculum development.', tableFromAAA: 'richTextTables', tableName: 'schoolParticipationDetails' },
  { title: 'Present details of School infrastructural & other facilities', tableFromAAA: 'richTextTables', tableName: 'schoolInfra' },
  { title: 'Student Mentoring', tableFromAAA: 'richTextTables', tableName: 'studentMonitor' },
  { title: 'Activities programs related to Gender Equality, Green Campus, Constitutional Values, Tolerance and Harmony', tableFromAAA: 'richTextTables', tableName: 'greenCampus' },
  { title: 'Commemorative Events of regional, national and international importance', tableFromAAA: 'richTextTables', tableName: 'commemorative' },
  { title: 'Details of student enrichment programmes (special lectures / workshops / seminar) involving external experts.', tableFromAAA: 'richTextTables', tableName: 'studentEnrichment' },
  { title: 'How does the School ensure that programme objectives are constantly met and learning outcomes are monitored?', tableFromAAA: 'richTextTables', tableName: 'programObjectives' },
  { title: 'Unique features and innovative practices of the School.', tableFromAAA: 'richTextTables', tableName: 'schoolFeatures' },
  { title: 'School Strengths', tableFromAAA: 'richTextTables', tableName: 'schoolStrength' },
  { title: 'School Weaknesses', tableFromAAA: 'richTextTables', tableName: 'schoolWeakness' },
  { title: 'School Opportunities', tableFromAAA: 'richTextTables', tableName: 'schoolOppos' },
  { title: 'School Challenges', tableFromAAA: 'richTextTables', tableName: 'schoolChallenges' },
  { title: 'Future plans of the School', tableFromAAA: 'richTextTables', tableName: 'futurePlans' },







]

export default TableData
export { categorywiseTables, reportTables }
