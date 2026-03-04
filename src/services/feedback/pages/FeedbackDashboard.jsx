import React, { useState } from 'react'
import GoBack from '../../../components/GoBack'
import title from '../../../js/title'
import { getFeedbackData } from '../js/getFeedbackData';
import { useQuery } from 'react-query';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useDirectorAuth from '../../../hooks/useDirectorAuth'
import DashboardHeroSection from '../components/DashboardHeroSection';
import StudentAnalysis from '../analysis/StudentAnalysis';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import UserLoading from '../../../pages/UserLoading';
import OtherResponseAnalysis from '../analysis/OtherResponseAnalysis';
import { SelectStatusYear } from '../../status/pages/StatusPage';
import { academicYearGenerator } from '../../../inputs/Year';
import ExcelJS from 'exceljs';
import designationWiseSorting from '../../../js/designationWiseSorting';
import { toast } from 'react-hot-toast';


const FeedbackDashboard = () => {
  title('Feedback Dashboard')
  useDirectorAuth()
  const directorUser = useSelector((state) => state.user.directorUser)
  const [year, setYear] = useState(academicYearGenerator(1)[0])
  const [activeUser, setActiveUser] = useState("Student");

  let param = { filter: { schoolName: directorUser?.department, academicYear: year }, feedbackUser: activeUser }
  const { data, isLoading, refetch } = useQuery([param.model, param], () => getFeedbackData(param))

  const [chartData, setChartData] = useState(null)
  const [response, setResponse] = useState(null)
  const [teachers, setTeachers] = useState(null)

  useEffect(() => {
    setChartData(null)
    setResponse(null)
  }, [activeUser])

  useEffect(() => {
    refetch()
  }, [year])


  useEffect(() => {

    if (data?.data?.data) {
      setResponse(data?.data?.data?.dashboardData[activeUser])
      setChartData(() => data?.data?.data?.analysis)
      setTeachers(designationWiseSorting(data?.data?.data?.dashboardData.Faculties)?.map((teacher) => `${teacher.salutation} ${teacher.name}`))
      
    }
  }, [data, activeUser])


  return (
    <div>
      <GoBack pageTitle={`Feedback Dashboard for ${directorUser?.department}`} showAvatar={{ photoURL: directorUser?.photoURL, userType: 'director' }} />

      <div className="my-2">
        <SelectStatusYear setYear={setYear} year={year} />
      </div>

      <div className="mt-4">
        <DashboardHeroSection year={year} showActive={activeUser} countData={data?.data?.data.dashboardData} isLoading={isLoading} showDetails={true} setActiveUser={setActiveUser} />
      </div>

      <div>
        <p className='mb-3 mt-5 text-lg font-bold rounded-md text-center flex items-center justify-center gap-3 p-2 bg-blue-800 text-white'> <AnalyticsRoundedIcon /> {activeUser} Feedback Analysis</p>

        {!chartData ?
          <div className='my-5'>
            <UserLoading title="Analyzing data" />
          </div>
          :
          <div>
            {(activeUser === "Student" && chartData[activeUser]) && <div className="mb-5 w-full">
              <StudentAnalysis excelClick={()=>{genrateFeedbackExcel(teachers,response,activeUser,directorUser?.department)}} academicYear={year} chartData={chartData[activeUser]} schoolName={directorUser?.department} />
            </div>}

            {(activeUser !== "Student" && chartData[activeUser]) && <div className="mb-5">
              <OtherResponseAnalysis excelClick={()=>{genrateFeedbackExcel(teachers,response,activeUser,directorUser?.department)}} feedbackUser={activeUser} academicYear={year} questionsWithData={chartData[activeUser]} schoolName={directorUser?.department} />
            </div>}

          </div>
        }
      </div>


    </div >
  )
}


async function genrateFeedbackExcel(teachers,response,activeUser,school){
  try{
    const excelObject={
      Student:{
        'Name of the student':'Name of the student',
        'Email address': 'Email address',
        'Contact number': 'Contact number',
        'Choose the program you are currently enrolled in':'Choose the program you are currently enrolled in',
        '`Rate the course`': ['Depth of the course content including project work if any', 'Extent of coverage of course', 'Applicability/relevance to real life situations', 'Learning value (in terms of knowledge, concepts, manual skills, analytical abilities and broadening perspectives', 'Clarity and relevance of textual reading', 'Relevance of additional source material (Library)', 'Extent of effort required by students', 'Overall rating'],
        'Is your background benefiting from this course?':'Is your background benefiting from this course?',
        'The syllabus was?':'The syllabus was?',
        'How helpful was the internal assesssment?':'How helpful was the internal assesssment?',
        'Rate the Facilities available': ['Sufficient number of prescribed books are available in the Library.', 'The books prescribed/listed as reference materials are relevant, updated and appropriate', 'Infrastructural facilities, such as student’s room/ girls room/carrels, class rooms, reading rooms and toilets are available in the Department.', 'Laboratory facilities / Field Visits provided	'],
        'Were are you provided with a course and lecture outline at the beginning?':'Were are you provided with a course and lecture outline at the beginning?',
        'If Yes, was it followed?':'If Yes, was it followed?',
        'If followed, was it helpful?':'If followed, was it helpful?',
        'If you have other major comments to offer':'If you have other major comments to offer',
      },
      Teacher:{
        'Your Name':'Your Name',
        'Designation':'Designation',
        'Contact Number':'Contact Number',
        'For each item please indicate your level of satisfaction with the following statement':['Syllabus is suitable to the course', 'Syllabus is need based', 'Objectives & outcome of the syllabi are well defined and clear to teachers and students.', 'Course content is followed by corresponding reference materials.', 'Sufficient number of prescribed books are available in the Library.', 'The course/syllabus has good balance between theory and application.', 'The course/syllabus has made me interested in the subject area.', 'The course/syllabus of this subject increased my knowledge and perspective in the subject area', 'The course/programme of studies carries sufficient number of optional papers.', 'The books prescribed/listed as reference materials are relevant, updated and appropriate', 'Infrastructural facilities, such as teacher’s rooms/carrels, class rooms, reading rooms and toilets are available in the Department.', 'Staff canteen is available at the faculty level.', 'Tests and examinations are conducted well in time with proper coverage of all units in the syllabus.', 'I have the freedom to propose, modify, suggest and incorporate new topics in the syllabus', 'I have the freedom to adopt new techniques/strategies of teaching such as seminar presentations, group discussions and learners’ participations.', 'I have the freedom to adopt/adapt new techniques/strategies of testing and assessment of students.', 'The environment in the department is conducive to teaching and research.', 'The administration is teacher friendly', 'The University provides adequate and smooth support for projects and research facilities.', 'The University provides adequate funding and support to faculty members for upgrading their skills and qualifications.', 'Provisions for professional development are non-discriminatory and fair.'],
        'If you have other major comments to offer':'If you have other major comments to offer',
      },
      Alumni:{
        'Email':'Email',
        'Name of the Alumni':'Name of the Alumni',
        'Duration from':'Duration from',
        'Duration to':'Duration to',
        'Contact Number':'Contact Number',
        'The Course objectives & outcomes  were clearly defined / identified':'The Course objectives & outcomes  were clearly defined / identified',
        'Any suggestions on course objectives and course outcomes':'Any suggestions on course objectives and course outcomes',
        'The books prescribed/listed as reference materials are relevant, updated and appropriate.':'The books prescribed/listed as reference materials are relevant, updated and appropriate.',
        'The program of studies carries sufficient number of elective(optional) papers.':'The program of studies carries sufficient number of elective(optional) papers.',
        'Size / quantum of curriculum according to course duration':'Size / quantum of curriculum according to course duration',
        'Weightage and usefulness of curriculum towards Research and Innovation':'Weightage and usefulness of curriculum towards Research and Innovation',
        'The program provides focus on skill Development /Employability/ Entrepreneurship':'The program provides focus on skill Development /Employability/ Entrepreneurship',
        'Would you suggest any courses to be introduced':'Would you suggest any courses to be introduced',
        'Any other comments towards the  betterment of the curriculum':'Any other comments towards the  betterment of the curriculum',
      },
      Parent:{
        'Your full name(Parent)':'Your full name(Parent)',
        'Residential address':'Residential address',
        'Contact Number':'Contact Number',
        'Name of your son/daughter':'Name of your son/daughter',
        'Any suggestions on course objectives and course outcomes':'Any suggestions on course objectives and course outcomes',
        'The books prescribed/listed as reference materials are relevant, updated and appropriate.':'The books prescribed/listed as reference materials are relevant, updated and appropriate.',
        'The program of studies carries sufficient number of elective(optional) papers.':'The program of studies carries sufficient number of elective(optional) papers.',
        'Size / quantum of curriculum according to course duration':'Size / quantum of curriculum according to course duration',
        'Weightage and usefulness of curriculum towards Research and Innovation':'Weightage and usefulness of curriculum towards Research and Innovation',
        'The program provides focus on skill Development /Employability/ Entrepreneurship':'The program provides focus on skill Development /Employability/ Entrepreneurship',
        'Would you suggest any courses to be introduced':'Would you suggest any courses to be introduced',
        'Any other comments towards the  betterment of the curriculum':'Any other comments towards the  betterment of the curriculum',
      },
      Employer:{
        'Name of the Employer':'Name of the Employer',
        'Address of the Employer':'Address of the Employer',
        'Contact Number':'Contact Number',
        'The Course objectives & outcomes  were clearly defined / identified':'The Course objectives & outcomes  were clearly defined / identified',
        'Any suggestions on course objectives and course outcomes':'Any suggestions on course objectives and course outcomes',
        'The books prescribed/listed as reference materials are relevant, updated and appropriate.':'The books prescribed/listed as reference materials are relevant, updated and appropriate.',
        'The program of studies carries sufficient number of elective(optional) papers.':'The program of studies carries sufficient number of elective(optional) papers.',
        'Size / quantum of curriculum according to course duration':'Size / quantum of curriculum according to course duration',
        'Weightage and usefulness of curriculum towards Research and Innovation':'Weightage and usefulness of curriculum towards Research and Innovation',
        'The program provides focus on skill Development /Employability/ Entrepreneurship':'The program provides focus on skill Development /Employability/ Entrepreneurship',
        'Would you suggest any courses to be introduced':'Would you suggest any courses to be introduced',
        'Any other comments towards the  betterment of the curriculum':'Any other comments towards the  betterment of the curriculum',
      },
      Expert:{
        'Email':'Email',
        'Name of the Teacher/Scientist/Industrialist':'Name of the Teacher/Scientist/Industrialist',
        'Designation':'Designation',
        'Name and address of the University/Institute/Industry':'Name and address of the University/Institute/Industry',
        'Contact Number':'Contact Number',
        'The Course objectives & outcomes  were clearly defined / identified':'The Course objectives & outcomes  were clearly defined / identified',
        'Any suggestions on course objectives and course outcomes':'Any suggestions on course objectives and course outcomes',
        'The books prescribed/listed as reference materials are relevant, updated and appropriate.':'The books prescribed/listed as reference materials are relevant, updated and appropriate.',
        'The program of studies carries sufficient number of elective(optional) papers.':'The program of studies carries sufficient number of elective(optional) papers.',
        'Size / quantum of curriculum according to course duration':'Size / quantum of curriculum according to course duration',
        'The Curriculum is need base and balanced':'The Curriculum is need base and balanced',
        'Curriculum is designed in view of  employability, Research and Innovation':'Curriculum is designed in view of  employability, Research and Innovation',
        'The program provides focus on skill Development /Employability/ Entrepreneurship':'The program provides focus on skill Development /Employability/ Entrepreneurship',
        'Would you suggest any courses to be introduced':'Would you suggest any courses to be introduced',
        'Any other comments towards the  betterment of the curriculum':'Any other comments towards the  betterment of the curriculum',
      },
      SSS:{
        'Email': 'Email',
        'Please confirm this is the first and only time you answer this survey.': 'Please confirm this is the first and only time you answer this survey.',
        'Age': 'Age',
        'Mobile number': 'Mobile number',
        'Gender': 'Gender',
        'What degree program are you pursuing?': 'What degree program are you pursuing?',
        'What subject area are you currently pursuing?': 'What subject area are you currently pursuing?',
        'How much of the syllabus was covered in the class?': 'How much of the syllabus was covered in the class?',
        'How well did the teachers prepare for the classes?': 'How well did the teachers prepare for the classes?',
        'How well were the teachers able to communicate?': 'How well were the teachers able to communicate?',
        'Fairness of the internal evaluation process by the teachers.': 'Fairness of the internal evaluation process by the teachers.',
        'Was your performance in assignments discussed with you?': 'Was your performance in assignments discussed with you?',
        'The institute takes active interest in promoting internship, student exchange, field visit opportunities for students.': 'The institute takes active interest in promoting internship, student exchange, field visit opportunities for students.',
        'The teaching and mentoring process in your institution facilitates you in cognitive, social and emotional growth.': 'The teaching and mentoring process in your institution facilitates you in cognitive, social and emotional growth.',
        'The institution provides multiple opportunities to learn and grow.': 'The institution provides multiple opportunities to learn and grow.',
        'Teachers inform you about your expected competencies, course outcomes and programme outcomes.': 'Teachers inform you about your expected competencies, course outcomes and programme outcomes.',
        'Your mentor does a necessary follow-up with an assigned task to you.': 'Your mentor does a necessary follow-up with an assigned task to you.',
        'The teachers illustrate the concepts through examples and applications.': 'The teachers illustrate the concepts through examples and applications.',
        'The teachers identify your strengths and encourage you with providing right level of challenges.': 'The teachers identify your strengths and encourage you with providing right level of challenges.',
        'Teachers are able to identify your weaknesses and help you to overcome them.': 'Teachers are able to identify your weaknesses and help you to overcome them.',
        'The institution makes effort to engage students in the monitoring, review and continuous quality improvement of the teaching learning process.': 'The institution makes effort to engage students in the monitoring, review and continuous quality improvement of the teaching learning process.',
        'The institute/ teachers use student centric methods, such as experiential learning, participative learning and problem solving methodologies for enhancing learning experiences.': 'The institute/ teachers use student centric methods, such as experiential learning, participative learning and problem solving methodologies for enhancing learning experiences.',
        'Teachers encourage you to participate in extracurricular activities.': 'Teachers encourage you to participate in extracurricular activities.',
        'Efforts are made by the institute/ teachers to inculcate soft skills, life skills and employabilityskills to make you ready for the world of work.': 'Efforts are made by the institute/ teachers to inculcate soft skills, life skills and employabilityskills to make you ready for the world of work.',
        'What percentage of teachers use ICT tools such as LCD projector, Multimedia, etc. while teaching.': 'What percentage of teachers use ICT tools such as LCD projector, Multimedia, etc. while teaching.',
        'The overall quality of teaching-learning process in your institute is very good.': 'The overall quality of teaching-learning process in your institute is very good.',
        'Give three observation / suggestions to improve the overall teaching – learning experience in your institution.': 'Give three observation / suggestions to improve the overall teaching – learning experience in your institution.',
      }
    }
    let Headings = excelObject[activeUser] 
  if(activeUser==="Student"){
      let arr = ['Subject/Paper taught by ','About the teacher','How much of the syllabus was covered in class by ','If you have other major comments for ']
      teachers.forEach((teacher)=>{
      arr.forEach((question)=>{
         let obj={
          'Subject/Paper taught by ':`Subject/Paper taught by  ${teacher}`,
          'About the teacher': ['The teacher is generally well-organized and prepared for class.', 'Knowledge base of the teacher (as perceived by you)', 'Communication skills (in terms of articulation and comprehensibility', 'Ability to integrate content with other courses', 'Provision of sufficient time for feedback', 'Interest generated by the teacher'],
          'How much of the syllabus was covered in class by ':`How much of the syllabus was covered in class by  ${teacher}`,
          'If you have other major comments for ':`If you have other major comments for  ${teacher}`
          }
          Headings[`${question} ${teacher}`]= obj[question]
        })
      })
  }
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sheet 1');

  const columnNames = Object.keys(Headings);

  let firstIndex= 1 
  let secondIndex = 1
  let rowIndex = 1
  columnNames.forEach((columnName)=>{

    if (Array.isArray(Headings[columnName])) {
      const colspan = Headings[columnName].length;
      worksheet.mergeCells(rowIndex, firstIndex, rowIndex, firstIndex + colspan - 1);
      
      worksheet.getCell(rowIndex, firstIndex).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      worksheet.getCell(rowIndex, firstIndex).value = columnName;
      worksheet.getCell(rowIndex, firstIndex).font = { bold: true, size: 12 };
      firstIndex += colspan;
    } else {
      worksheet.getCell(rowIndex, firstIndex).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      worksheet.getCell(rowIndex, firstIndex).value = columnName;
      worksheet.getCell(rowIndex, firstIndex).font = { bold: true, size: 12 };
      firstIndex++;
    }
    rowIndex++;
    if(Array.isArray(Headings[columnName])) {
      Headings[columnName].forEach((value) => {
        worksheet.getCell(rowIndex, secondIndex).border = {
          bottom: { style: 'thin' },
        };
        worksheet.getCell(rowIndex, secondIndex).value = value;
        worksheet.getCell(rowIndex, secondIndex).font = { bold: true, size: 12 };
        secondIndex++;
      });
    } else {
      worksheet.getCell(rowIndex, secondIndex).border = {
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      worksheet.getCell(rowIndex, secondIndex).value = Headings[columnName];
      worksheet.getCell(rowIndex, secondIndex).font = { bold: true, size: 12 };
      secondIndex++;
    }
    rowIndex--;
  })

  const firstRow = worksheet.getRow(1);
  let lastCol;
  firstRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
      if (cell.value) {
          lastCol = colNumber;
      }
  });
  response.forEach((res,i)=>{
    let singleRes = JSON.parse(res.response)
    for(let col=1;col<=lastCol;col++){
      let row1cellval = worksheet.getCell(1,col).value
      let row2cellval = worksheet.getCell(2,col).value
      if(row1cellval === row2cellval){
        worksheet.getCell(i+3, col).border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
        worksheet.getCell(i+3,col).value = singleRes.hasOwnProperty(row2cellval)?Array.isArray(singleRes[row2cellval])?singleRes[row2cellval].join(','):singleRes[row2cellval]:"N.A.";
      }
      else{
        worksheet.getCell(i+3, col).border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
        worksheet.getCell(i + 3, col).value = singleRes.hasOwnProperty(row1cellval)?singleRes[row1cellval][row2cellval]:"N.A.";
      }

    } 
  })

  for(let col=1;col<=lastCol;col++){
    let row1cellval = worksheet.getCell(1,col).value
    let row2cellval = worksheet.getCell(2,col).value
    if(row1cellval === row2cellval){
      worksheet.getCell(1,col).value = "";
    }
  }

  // Apply formatting to all cells
  worksheet.columns.forEach((column) => {
    column.width = 20;
    column.alignment = { wrapText: true, vertical: 'middle', horizontal: 'center' };
  });

   // Save the workbook as a file
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = URL.createObjectURL(blob);

  // Download the Excel file with the specified fileName
  const link = document.createElement('a');
  link.href = url;
  link.download = `${activeUser} Feedback Data Of ${school}.xlsx`; 
  link.click();

  console.log('Excel file generated and downloaded successfully.');
  toast.success("Excel generated successfully");
  }
  catch(err){
    console.error('Error generating Excel file:', err);
    toast.error("Error while generating try again")
  }
}

export {genrateFeedbackExcel}

export default FeedbackDashboard