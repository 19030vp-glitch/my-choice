const xlsxPopulate = require('xlsx-populate');
const { excelObject: facultyExcelObj } = require("../routes/faculty-routes/routes")
const { excelObject: directorExcelObj } = require("../routes/director-routes/director-routes")
const { excelObject: nssExcelObj } = require("../routes/nss-routes/nss-routes")
const { excelObject: examExcelObj } = require("../routes/exam-routes/exam-routes")
const { excelObject: dsdExcelObj } = require("../routes/dsd-routes/dsd-routes")
const { excelObject: iilExcelObj } = require("../routes/iil-routes/iil-routes")

const path = require("path");


const ExcelObj = { ...directorExcelObj, ...facultyExcelObj, ...nssExcelObj, ...examExcelObj, ...dsdExcelObj, ...iilExcelObj }

const SchoolsProgram = {
    "School of Computational Sciences": '"Ph.D. (Computer Science),M.Phil (Computer Science),MCA,M.Sc.(Computer Science),M.Sc(Computer Applications),M.Sc(Computer Networking)"',

    "School of Chemical Sciences": '"M.Sc.(Chemistry Analytical), M.Sc.(Chemistry Industrial), M.Sc.(Chemistry Medicinal, M.Sc.(Chemistry Organic), M.Sc.(Chemistry Physical, M.Sc.(Polymer chemistry), M. Phil.(Chemistry), Ph.D.(Chemistry)"',

    "School of Commerce and Management Sciences": '"MBA,M.Com,M.Phil(Commerce),M.Phil(Management),Ph.D(Commerce),Ph.D(Management)"',

    "School of Educational Sciences": '"M.P.Ed.,M.Ed.,M.Phil.(Phy.Edu.),M.Phil.(Education),Ph.D.(Phy.Edu.),Ph.D.(Education)"',

    "School of Earth Sciences": '"M.Sc.(Geology),M.Sc.(Environmental Science),M.A/M.Sc.(Geography),M.Sc.(Geophysics),M.Phil.(Geology),M.Phil.(Environmental Science),M.Phil.(Geography),Ph.D.(Geology),Ph.D.(Environmental Science),Ph.D.(Geography),Ph.D.(Geophysics)"',

    "School of Fine and Performing Arts": '"Bachalor in Performing Arts,M.A.(Theater Arts & Film),M.A.(Music),Diploma in Theater Arts,Certificate Course in Music,Certificate Course in Dance"',

    "School of Language, Literature and Culture Studies": '"M.A.(English),M.A.(Marathi),M.Phil.(English),M.Phil.(Marathi),Ph.D.(English),Ph.D.(Marathi),Ph.D.(Hindi),Phd(Urdu),Certificate Course  in French Language,Diploma Course in French Language,Advance Diploma in French Language,Certificate Course  in Spanish Language,Diploma Course in Spanish Language,Advance Diploma in Spanish Language"',

    "School of Life Sciences": '"Post Graduate Diploma in Medical Laboratory Technology (PGDMLT),M.Sc.(Biotechnology),M.Sc.(Zoology),M.Sc.(Botany),M.Sc.(Microbiology),M.Phil.(Biotechnology),M.Phil.(Zoology),M.Phil.(Botany),M.Phil.(Microbiology),Ph.D.(Biotechnology),Ph.D.(Zoology),Ph.D.(Botany),Ph.D.(Microbiology),Ph.D.(Bioinformatics)"',

    "School of Mathematical Sciences": '"M.Sc.(Mathematics), M.Sc.(Statistics), M.Phil.(Mathematics), Ph.D.(Mathematics), Ph.D.(Statistics)"',

    "School of Media Studies": '"M.A./M.Sc(Electronic Media),M.A.(Mass Communication & Journalism),M.Phil.(Mass Communication & Journalism),Ph.D.(Mass Communication & Journalism)"',

    "School of Pharmacy": '"B.Pharm,M.Pharm(Pharmaceutics),M.Pharm(Pharmaceutical Chemistry),M.Pharm(Pharmacology),M.Pharm(Quality Assurance),M.Pharm(Pharmaceutical Sciences),Ph.D.(Pharmaceutical Sciences)"',

    "School of Physical Sciences": '"M.Sc.(Physics),M.Phil.(physics),Ph.D.(Physics)"',

    "School of Social Sciences": '"MSW,M.A.(Applied Economics),M.A.(Sociology),M.A.(Human Rights),M.Phil(Social Work),M.Phil(Sociology),M.Phil(Human Rights),Ph.D.(Social Work),Ph.D.(Sociology),Ph.D.(Applied Economics),Ph.D.(Human Rights)"',

    "School of Management Sciences, Sub-Campus, Latur": "M.B.A,M.Com,PGDDM,M.Phil(Management Sciences),Ph.D(Management Sciences),Certificate Course in Goods and Service Tax (GST)",

    "School of Social Sciences, Sub-Campus, Latur": '"M.A.(Economics),M.A.(Sociology),M.S.W.,Ph.D.(Social Science),Data Interpretation Using MS-Excel and SPSS"',

    "School of Technology, Sub-Campus, Latur": '"B.Voc.(Software Development),M.Sc.(Computer Science Integrated),M.Sc.(Computer Science),M.Sc.(Bioinformatics),M.Phil.(Computer Science),Ph.D.(Computer Science),Ph.D.(Bioinformatics)"',
}

const years = '"2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010,2009,2008,2007,2006,2005,2004,2003,2002,2001,2000,1999,1998,1997,1996,1995,1994"'
const academicYears = '"2023-24,2022-23,2021-22,2020-21,2019-20,2018-19,2017-18,2016-17,2015-16,2014-15,2013-14,2012-13,2011-12,2010-11,2009-10,2008-09,2007-08,2006-07,2005-06,2004-05,2003-04,2002-03,2001-02,2000-01,1999-00,1998-99,1997-98,1996-97,1995-96,1994-95"'
const exams = '"NET,SLET,GATE,GMAT,GPAT,NIPER,CAT,GRE,JAM,IELTS,TOEFL,Civil Services,State Gov exams,Any Such Other Exams"'

async function acadmicYearArr() {
    const d = new Date();
    let year = d.getMonth() <= 5 ? d.getFullYear() : d.getFullYear() + 1;
    const ly = year - 29;
    let i = 1;
    let arr = [];
    for (year; year >= ly; year--) {
        let privyear = year.toString().slice(-2);
        let last = year - 1 + "-" + privyear;
        last = last.toString();

        arr.push(last);
        i++;
    }
    return arr;
}

async function generateExcelFile(filename, model, school) {

    const columnMapping = await ExcelObj[model];

    const validationObject = {
        Award: {
            'Year of Award': 'academicYear',
            'Category': 'awardCategory',
        },
        ConferencesSemiWorkshopOrganized: {
            'Year': 'academicYear',
            'Level of Program': 'confSemiOrg',
            'Number of Participants': 'number'
        },
        CounselingAndGuidance: {
            'Number of Students Attended': 'number',
            'Year of Activity': 'academicYear',
        },
        DemandRatio: {
            'Programme name': 'programNames',
            'Academic Year': 'academicYear',
            'Number of seats available': 'number',
            'Number of eligible applications': 'number',
            'Number of Students admitted': 'number',
            'Type of program': 'typeOfProgram',
        },
        Employability: {
            'Program Name': 'programNames',
            'Academic Year': 'academicYear',
            'Year of introduction': 'year',
        },
        ExtensionActivities: { 'Year of activity': 'academicYear' },
        MoUs: { 'Year of signing MoU': 'academicYear' },
        Placement: {
            "Program graduated from": "programNames",
            "Academic Year": "academicYear",
            "Type Of Placement": 'typeOfPlacement',
        },
        ProgressionToHE: {
            'Program graduated from': 'programNames',
            'Academic Year': 'academicYear',
        },
        ProjectsInternships: {
            "Programme name": "programNames",
            "Academic Year": "academicYear",
        },
        QualifiedExams: {
            "Acadmic year": 'academicYear',
            "Name of the Exam": 'qualifiedExams',
        },
        ReservedSeats: {
            "Academic Year": "academicYear",
            "Program Name": "programNames",
            "SC1": "number",
            "ST1": "number",
            "OBC(VJNT)1": "number",
            "Divyngjan1": "number",
            "General1": "number",
            "Others1": "number",
            "SC2": "number",
            "ST2": "number",
            "OBC(VJNT)2": "number",
            "Divyngjan2": "number",
            "General2": "number",
            "Others2": "number",
        },
        ResearchMethodologyWorkshops: {
            "Number of Participants": "number",
            "year": "academicYear",
        },
        TrainingProgramsOrganized: {
            "Year": "academicYear",
            "Type of staff": "typeOfStaff",
            "Number of Participants": "number",
        },
        UgcSapCasDstFistDBTICSSR: {
            "Type of Agency": "govNonGov",
            "Year of Award": "academicYear",
            "Funds provided in lakhs": "number",
            "Duration of the project in Years": "number",
        },
        StudentSatisfactionSurvey: {
            "Year of joining": "academicYear",
            "Category": "category",
            "Programme name": "programNames",
            "Mobile Number": "number",
            "Gender": "gender",
        },
        SkillsEnhancementInitiatives: {
            "Academic Year": "academicYear",
            "Number of students enrolled": "number",
        },
        ValueAddedCource: {
            "Programme name": "programNames",
            "Academic year": "academicYear",
            "Year of offering": "year",
            "No of times offered during the same year": "number",
            "Duration of the course (in Months)": "number",
            "Number of students enrolled": "number",
            "Number of Students completing the course": "number",
        },
        SyllabusRevision: {
            "Programme Name": "programNames",
            "Academic Year": "academicYear",
            "Year of Introduction": "year",
            "Status of implementation": "statusOfImplimentation",
            "Year of Implimentation": "year",
            "Year of Revision": "year",
            "Percentage of content added or replaced": "number",
        },
        AlumniContribution: {
            "Program Graduated From": "programNames",
            "Contribution Ammount in ₹": "number",
            "Year of Contribution": "academicYear",
        },
        CourceInAllProgram: {
            "Program Name": 'programNames',
            "Academic Year": 'academicYear',
        },
        NewPrograms: {
            "Program Name": 'programNames',
            "Academic Year": 'academicYear',
        },
        ResearchProject: {
            "Wheather Government / Non-Government": 'govNonGov',
            "Award Year": 'year',
            "Project Duration (In Year)": 'number',
            "Provided Funds (INR)": 'number',
            "Wheather Major / Minor": 'mejorMinor',
            "Status": 'rProjectStatus',
            "Choose Year": 'academicYear',
        },
        PostHeld: {
            "Designation": 'designation',
            "Academic Level": 'academicLevel',
            "Department": 'department',
        },
        Lectures: { ' Year': 'academicYear' },
        EContentDeveloped: {
            'Type of Creation': 'creationType',
            'Choose Year': 'academicYear',
        },
        ResearchPaper: { 'Choose Year': 'academicYear' },
        JrfSrf: { 'Choose Year': 'academicYear' },
        AwardRecognition: {
            'Wheather National / International': 'isNat',
            'Choose Year': 'academicYear',
        },
        Patent: {
            'Wheather National / International': 'isNat',
            'Choose Year': 'academicYear',
        },
        ConsultancyServices: { 'Year': 'academicYear' },
        Collaboration: {
            'Year of Collaboration': 'number',
            'Year': 'academicYear',
        },
        InvitedTalk: {
            'Wheather National / International': 'isNat2',
            'Nature': 'talkNature',
            'Year': 'academicYear',
        },
        ConferenceOrganized: {
            'National / International': 'confSemiOrg',
            'Year': 'academicYear',
        },
        Fellowship: {
            'National / International': 'isNat',
            'Year': 'academicYear',
        },
        Online: { 'Year': 'academicYear' },
        FinancialSupport: {
            'Amount of support': 'number',
            'Year': 'academicYear',
        },
        ForeignVisit: { 'Year': 'academicYear' },
        ConferenceParticipated: {
            'Level': 'isNat',
            'Year': 'academicYear',
        },
        policyDocument: {
            "Wheather National / International": "isNat3",
            "Choose Year": "academicYear",
        },
        //Nss
        NssBasicInfo: {
            "Gender": 'gender',
            "Mobile No": 'number',
        },
        AwardForExtensionActivities:{
            "Year of award": 'academicYear',
        },
        //Exam
        DateOfResultDiclaration: {
            "Semester/ year": "academicYear",
        },
        StudentComplaintsGrievances: {
            "No Of Students Appeared": 'number',
            "No Of Grievances": 'number',
            'Year': "academicYear",
        },
        ExamPassedDuringYear: {
            "Number of Students Appeared in Final Year Examination": 'number',
            "Number of Students Passed in Final Year Examination": 'number',
            'Year': "academicYear",
        },
        //Dsd
        DSDSports: {
            "Team / Individual": 'teamIndividual',
            "Inter-university / state / National / International": 'isNat4',
            "Year": 'academicYear',
        },
        SportsAndCulturalEvents: {
            "Academic Year": "academicYear",
        },
        //Iil
        IilRevenueCorporateTraining:{
            "Revenue generated (amount in rupees)": 'number',
            "Number of trainees": 'number', 
            'Year': 'academicYear',
        },
        IilRevenueConsultancy:{
            "Revenue generated (INR in Lakhs)": 'number', 
            'Year': 'academicYear',
        },
        IilCollaborativeActivities:{
            'Year of collaboration': 'academicYear',
        }

    };
    const headings = Object.keys(columnMapping);
    // Create a new workbook
    const workbook = await xlsxPopulate.fromBlankAsync();

    // Get the first sheet
    const sheet = workbook.sheet(0);

    // Set column headers and formatting
    for (let i = 0; i < headings.length; i++) {
        const cell = sheet.cell(1, i + 1);
        cell.value(headings[i]);
        cell.style({ bold: true });
    }

    // Apply formatting to all cells
    headings.forEach((e, i) => {
        sheet.column(i + 1).width(20);
        sheet.column(i + 1).style({ wrapText: true, verticalAlignment: 'middle', horizontalAlignment: 'center' });
    })

    const validationRules = {
        number: {
            type: 'whole',
            operator: 'greaterThanOrEqual',
            formula1: 0,
            showErrorMessage: true,
            errorTitle: 'Invalid Number',
            error: 'Please enter a number greater than or equal to 0',
        },
        gender: {
            type: 'list',
            formula1: '"Male,Female"',
            showErrorMessage: true,
            errorTitle: 'Invalid Gender',
            error: 'Please select a value from the list: Male, Female',
        },
        academicYear: {
            type: 'list',
            formula1: academicYears,
            showErrorMessage: true,
            errorTitle: 'Invalid Academic Year',
            error: 'Please select a value from the list',
        },
        year: {
            type: 'list',
            formula1: years,
            showErrorMessage: true,
            errorTitle: 'Invalid Year',
            error: 'Please select a value from the list',
        },
        confSemiOrg: {
            type: 'list',
            formula1: '"University,State,National,International"',
            showErrorMessage: true,
            errorTitle: 'Invalid option',
            error: 'Please select a value from the list',
        },
        programNames: {
            type: 'list',
            formula1: SchoolsProgram[school],
            showErrorMessage: true,
            errorTitle: 'Invalid option',
            error: 'Please select a value from the list',
        },
        typeOfProgram: {
            type: 'list',
            formula1: '"UG,PG,Ph.D,Diploma,PG Diploma,Certificate"',
            showErrorMessage: true,
            errorTitle: 'Invalid option',
            error: 'Please select a value from the list',
        },
        typeOfPlacement: {
            type: 'list',
            formula1: '"Placement,Business Started"',
            showErrorMessage: true,
            errorTitle: 'Invalid value',
            error: 'Please select a value from the list',
        },
        awardCategory: {
            type: 'list',
            formula1: '"Institution,Teacher,Research Scholar,Student"',
            showErrorMessage: true,
            errorTitle: 'Invalid value',
            error: 'Please select a value from the list',
        },
        qualifiedExams: {
            type: 'list',
            formula1: exams,
            showErrorMessage: true,
            errorTitle: 'Invalid value',
            error: 'Please select a value from the list',
        },
        typeOfStaff: {
            type: 'list',
            formula1: '"Teaching staff & Student,Non-Teaching Staff"',
            showErrorMessage: true,
            errorTitle: 'Invalid value',
            error: 'Please select a value from the list',
        },
        govNonGov: {
            type: 'list',
            formula1: '"Government,Non-Government"',
            showErrorMessage: true,
            errorTitle: 'Invalid value',
            error: 'Please select a value from the list',
        },
        category: {
            type: 'list',
            formula1: '"Genral,OBC,SC,ST,NT,Others"',
            showErrorMessage: true,
            errorTitle: 'Invalid value',
            error: 'Please select a value from the list',
        },
        statusOfImplimentation: {
            type: 'list',
            formula1: '"CBCS,ECS"',
            showErrorMessage: true,
            errorTitle: 'Invalid value',
            error: 'Please select a value from the list',
        },
        designation: {
            type: 'list',
            formula1: '"Assistant Professor,Associate Professor,Professor,Professor & Director,Senior Professor"',
            showErrorMessage: true,
            errorTitle: 'Invalid value',
            error: 'Please select a value from the list',
        },
        mejorMinor: {
            type: 'list',
            formula1: '"Major,Minor"',
            showErrorMessage: true,
            errorTitle: 'Invalid value',
            error: 'Please select a value from the list',
        },
        rProjectStatus: {
            type: 'list',
            formula1: '"Completed,Ongoing"',
            showErrorMessage: true,
            errorTitle: 'Invalid value',
            error: 'Please select a value from the list',
        },
        academicLevel: {
            type: 'list',
            formula1: '"Assistant Professor (AL 10 to AL 11),Assistant Professor (AL 11 to AL 12),Associate Professor,Professor,Professor & Director,Senior Professor"',
            showErrorMessage: true,
            errorTitle: 'Invalid value',
            error: 'Please select a value from the list',
        },
        creationType: {
            type: 'list',
            formula1: '"Development of Innovative Pedagogy,Design of new curriculla & courses,MOOCS,E-Content"',
            showErrorMessage: true,
            errorTitle: 'Invalid value',
            error: 'Please select a value from the list',
        },
        isNat: {
            type: 'list',
            formula1: '"National,International"',
            showErrorMessage: true,
            errorTitle: 'Invalid value',
            error: 'Please select a value from the list',
        },
        isNat2: {
            type: 'list',
            formula1: '"State/University,National,International (within country),International (Abroad)"',
            showErrorMessage: true,
            errorTitle: 'Invalid value',
            error: 'Please select a value from the list',
        },
        isNat3: {
            type: 'list',
            formula1: '"State,National,International"',
            showErrorMessage: true,
            errorTitle: 'Invalid option',
            error: 'Please select a value from the list',
        },
        isNat4: {
            type: 'list',
            formula1: '"Inter-university,State,National,International"',
            showErrorMessage: true,
            errorTitle: 'Invalid option',
            error: 'Please select a value from the list',
        },
        talkNature: {
            type: 'list',
            formula1: '"Invited Talk,Resource Person,Paper Presentation"',
            showErrorMessage: true,
            errorTitle: 'Invalid value',
            error: 'Please select a value from the list',
        },
        teamIndividual: {
            type: 'list',
            formula1: '"Team,Individual"',
            showErrorMessage: true,
            errorTitle: 'Invalid value',
            error: 'Please select a value from the list',
        }

    };

    for (let rowIndex = 0; rowIndex <= 100; rowIndex++) {
        headings.forEach((heading, colIndex) => {
            const validationRule = validationObject[model]?.[heading];
            const cell = sheet.cell(rowIndex + 2, colIndex + 1);
            cell.value("");

            cell.dataValidation(validationRules[validationRule]);

        });

    };

    const filePath = path.join(__dirname, '../../sampleExcels/', `${filename}.xlsx`);

    await workbook.toFileAsync(filePath);

    return filePath;
}

module.exports = { generateExcelFile }