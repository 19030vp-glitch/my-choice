import React, { useState } from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import { academicYearGenerator } from '../../../inputs/Year'
import AdminSchoolSelect from '../components/AdminSchoolSelect'
import { Avatar, CircularProgress, Dialog, DialogContent, DialogTitle, IconButton, Tooltip, LinearProgress } from '@mui/material'
import PictureAsPdfRoundedIcon from '@mui/icons-material/PictureAsPdfRounded';
import SimCardDownloadTwoToneIcon from '@mui/icons-material/SimCardDownloadTwoTone';
import toast from 'react-hot-toast'
import ExcelJS from 'exceljs'
import { useParams } from 'react-router-dom'
import ReportLoading from '../../../components/ReportLoading'
import ClearIcon from '@mui/icons-material/Clear';
import AdminTable from '../components/AdminTable';
import GoBack from '../../../components/GoBack';
import allTableHeads from '../js/allTableHeads';
import { api } from '../../../js/api'
const { ResearchPaper, ResearchProject, BookAndChapter, PhdAwarded, JrfSrf, Patent, FinancialSupport, EContentDeveloped, Award, Fellowship, AwardRecognition, InvitedTalk, Placement, ProgressionToHE, QualifiedExams, CounselingAndGuidance, AlumniContribution, ConferenceParticipated, ConferenceOrganized, ConferencesSemiWorkshopOrganized, TrainingProgramsOrganized, ConsultancyServices, Collaboration, ForeignVisit, UgcSapCasDstFistDBTICSSR, ExtensionActivities, Employability, ProjectsInternships, SkillsEnhancementInitiatives, SyllabusRevision, ValueAddedCource, ResearchMethodologyWorkshops, MoUs, } = allTableHeads
const tableHead = {
  ResearchPapers: ResearchPaper, ResearchProjects: ResearchProject, BooksAndChapters: BookAndChapter, PhdAwarded, JrfSrf, Patent, FinancialSupport, EContentDeveloped, Award, Fellowship, AwardRecognition, InvitedTalk, Placement, ProgressionToHE, QualifiedExams, CounselingAndGuidance, AlumniContribution, ConferenceParticipated, ConferenceOrganized, ConferencesSemiWorkshopOrganized, TrainingProgramsOrganized, ConsultancyServices, Collaboration, ForeignVisit, UgcSapCasDstFistDBTICSSR, ExtensionActivities, Employability, ProjectsInternships, SkillsEnhancementInitiatives, SyllabusRevision, ValueAddedCource, ResearchMethodologyWorkshops, MoUs,
}

const AdminNumaricalData = ({ isDirector = false }) => {

  const { School } = useParams();
  const [values, setValues] = useState({ schoolName: School ? School : "All Schools" })
  const { schoolName } = values
  const [reportLoading, setReportLoading] = useState(false)
  const [tileData, setTileData] = useState(null)
  const [tileDataLoading, setTileDataLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [module, setModule] = useState(null)
  const [model, setModel] = useState(null)
  const [proof, setProof] = useState(null)
  const fiveYears = academicYearGenerator(5, true, true)
  const generateAcademicYears = [...fiveYears, 'Total']

  const getCountData = async (filter) => {
    return await axios.post(`${api}/Admin/getFiveYearData`, filter)
  }

  const feedbackModels = ["StudentFeedback", "AlumniFeedback", "TeacherFeedback", "ParentFeedback", "EmployerFeedback", "ExpertFeedback", "FeedbackStudentSatisfactionSurvey"]

  const getTileData = async (tdData, year, model) => {
    if (!(feedbackModels.includes(model)) && tdData !== 0 && !(isNaN(tdData))) {
      setModel(model)
      setTileDataLoading(true)
      const yearFilter = year === "Total" ? fiveYears : [year]
      const Filter = schoolName === "All Schools" ? { year: { $in: yearFilter }, model } : { year: { $in: yearFilter }, schoolName, model }
      axios.post(`${api}/Admin/getNumaricalTileData`, Filter)
        .then((res) => {
          const { status, data } = res
          if (status === 200) {
            setModule(data.module)
            setProof(data.proof)
            setTileData(data?.data)
            setOpen(true)
            setTileDataLoading(false)
          }
          else if (status === 500) {
            setTileDataLoading(false)
            toast.error('Error while get data...')
          }
        })
    }
    else if (tdData === 0 || isNaN(tdData)) {
      toast.success("No data available")
    }
    else if (feedbackModels.includes(model)) {
      if (schoolName === "All Schools" || year === "Total") {
        toast.error('Feedback is only avalable for single School and single year.')
      }
      else {
        if (model !== "FeedbackStudentSatisfactionSurvey") {

          const userSelecter = { "StudentFeedback": "Student", "AlumniFeedback": "Alumni", "TeacherFeedback": "Teacher", "ParentFeedback": "Parent", "EmployerFeedback": "Employer", "ExpertFeedback": "Expert", }
          window.open(`/feedback/generateFeedbackReport/${schoolName}/${userSelecter[model]}/${year}`, '_blank');
        }
        else if (model === "FeedbackStudentSatisfactionSurvey") {
          window.open(`/SSS/report/${schoolName}/${year}`, '_blank')
        }
      }
    }
  }

  const pdfHandler = () => {
    setReportLoading(true)
    axios.post(`${api}/admin/pdf/numericalData`, { schoolName })
      .then(function (res) {
        if (res.data.status === 'generated') {
          setReportLoading(false)
          toast.success('File generated successfully');
          window.open(`${api}/downloadPdf/${res.data.fileName}`, '_blank');
        }
        else if (res.data.status === 'error') {
          setReportLoading(false)
          toast.error(res.data.message);
        }
      })
      .catch(function (err) {
        setReportLoading(false)
        toast.error('Something went wrong');
      })
  }

  const countFilter = schoolName === "All Schools" ? {} : { schoolName }
  const { data, isLoading } = useQuery(['getFiveYearData', schoolName], () => getCountData(countFilter))

  const modelNames = {
    JrfSrf: 'JRF, SRF, Post Doctoral Fellows,',
    Placement: 'Placement',
    ProgressionToHE: 'Progression To HE',
    QualifiedExams: 'Qualified Exams',
    FeedbackStudentSatisfactionSurvey: 'Student Satisfaction Survey',
    AlumniContribution: 'Alumni Contribution',
    StudentFeedback: "Student Feedback", 
    AlumniFeedback: "Alumni Feedback", 
    TeacherFeedback: "Teacher Feedback", 
    ParentFeedback: "Parent Feedback", 
    EmployerFeedback: "Employer Feedback", 
    ExpertFeedback: "Expert Feedback",
    ValueAddedCource: 'Value Added Course',
    Patent: 'Patents',
    ResearchPapers: 'Research Papers',
    ResearchProjects: 'Research Projects',
    BooksAndChapters: 'Books And Chapters',
    PhdAwarded: 'Ph.D. Awarded',
    FinancialSupport: 'Financial Support',
    EContentDeveloped: 'E-Content Developed',
    Award: 'Innovation and Research Awards',
    Fellowship: 'Teachers Fellowship',
    AwardRecognition: 'Award Recognition',
    InvitedTalk: 'Invited Talk',
    StudentUser: 'Students',
    CounselingAndGuidance: 'Counseling And Guidance',
    AlumniUser: 'Registered Alumni',
    ConferenceParticipated: 'Conference Participated',
    ConferenceOrganized: 'Conference Organized',
    ConferencesSemiWorkshopOrganized: 'Conferences Seminar Workshop Organized',
    TrainingProgramsOrganized: 'Training Programs Organized',
    ConsultancyServices: 'Consultancy Services',
    Collaboration: 'Collaboration',
    ForeignVisit: 'Foreign Visits',
    UgcSapCasDstFistDBTICSSR: 'UGC-SAP, CAS, DST-FIST, DBT, ICSSR',
    ExtensionActivities: 'Extension Activities',
    Employability: 'Employability Courses',
    ProjectsInternships: 'Projects Internships',
    SkillsEnhancementInitiatives: 'Skills Enhancement Initiatives',
    SyllabusRevision: 'Syllabus Revision',
    ResearchMethodologyWorkshops: 'Research Methodology Workshops',
    MoUs: 'MoUs',
  }

  const excelHandler = async (data) => {
    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Sheet 1');

      const columnNames = generateAcademicYears;
      columnNames.unshift('Particulars');
      columnNames.unshift('Sr.No.');

      // Set column headers and formatting
      const headerRow = worksheet.addRow(columnNames);
      headerRow.font = { bold: true, size: 12 };

      // Apply formatting to all cells
      worksheet.columns.forEach((column) => {
        column.width = 20;
        column.alignment = {
          wrapText: true, vertical: 'middle',
          horizontal: 'center'
        };
      });

      // Add data rows with auto-incrementing numbers
      Object.keys(data)?.forEach((tableRowKey, index) => {

        const values = generateAcademicYears.map((year) => data[tableRowKey][year]);
        values.unshift(modelNames[tableRowKey])
        values.unshift(index + 1);
        worksheet.addRow(values);
      });

      worksheet.getRow(1).font = { bold: true, size: 12 };
      worksheet.getRow(1).height = 30;

      for (let i = 2; i <= data.length; i++) {
        worksheet.getRow(i).commit();
      }

      // Save the workbook as a file
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(blob);

      // Download the Excel file with the specified fileName
      const link = document.createElement('a');
      link.href = url;
      link.download = "Numarical Data";
      link.click();

      console.log('Excel file generated and downloaded successfully.');
      toast.success("Excel generated successfully")
    } catch (error) {
      console.error('Error generating Excel file:', error);
      toast.error("Error while generating try again")
    }
  }

  return (
    <div>
      {isDirector && <div className='mb-4'><GoBack pageTitle="School Numerical Dashboard" /></div>}
      <div className='sub-main' >
        <div className='flex justify-end pb-2'>
          {!School && <>
            <AdminSchoolSelect className="col-md-4 col-lg-4 col-12" value={schoolName} setState={setValues} id="schoolName" label="Filter By School" />
            <Tooltip title="PDF Download" placement="top" >
              <IconButton sx={{ height: "100%", bottom: "-25px", marginLeft: "15px" }} onClick={pdfHandler} >
                <PictureAsPdfRoundedIcon color='error' sx={{ fontSize: 30 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Excel Download" placement="top" >
              <IconButton sx={{ height: "100%", bottom: "-25px" }} onClick={() => { excelHandler(data?.data) }}>
                <SimCardDownloadTwoToneIcon color='success' sx={{ fontSize: 30 }} />
              </IconButton>
            </Tooltip>
          </>}
        </div>
        <div className="mb-2">
          {reportLoading && <ReportLoading loading={reportLoading} />}
          {tileDataLoading && <LinearProgress />}
        </div>
        <p className="text-center my-2 font-bold">{schoolName}</p>
        <div className='table-responsive' style={{ height: School ? 'fit-content' : `90vh` }}>
          <table className='table table-bordered pb-3'>
            <thead className='sticky-top'>
              <tr className='bg-[#ae7e28] text-[#FFF]'>
                <th>Sr.No.</th>
                <th>Particulars</th>
                {generateAcademicYears.map((year, i) => {
                  return <th key={`${year}${i}`} >{year}</th>
                })}
              </tr>
            </thead>

            <tbody>

              {
                data?.data && Object.keys(modelNames)?.map((tableName, i) => {
                  return <tr key={`${tableName}${i}`}>
                    <td className='text-center font-bold'>{i + 1}</td>
                    <td style={{ background: "#f4f4f4" }} className='font-semibold' > {modelNames?.[tableName]} </td>

                    {generateAcademicYears.map((year) => {
                      return (<td key={`${year}${i}`} className={`text-center cursor-pointer ${year === 'Total' ? 'font-bold text-[#ae7e28]' : 'text-center'}`} style={{ background: year === 'Total' ? "#f4f4f4" : "" }} onClick={(e) => { let tdData = parseInt(e.target.textContent); getTileData(tdData, year, tableName) }} >{data?.data[tableName][year]}</td>)
                    })}

                  </tr>
                })
              }

            </tbody>
          </table>
          {isLoading && <div className='flex justify-center'><CircularProgress /></div>}
        </div>
      </div>
      <Dialog fullScreen open={open} onClose={() => { setOpen(false) }}>
        <DialogTitle className='flex gap-4 items-center'>
          <IconButton onClick={() => { setOpen(false) }}>
            <ClearIcon />
          </IconButton>
          {modelNames[model]}
          <div className='flex w-full justify-end'>
            <p className='px-2 mx-2 text-[#ae7e28]' style={{ border: "1px solid", borderRadius: "5px" }}>{tileData?.length}</p>
          </div>
        </DialogTitle>
        <DialogContent>
          {["StudentUser", "AlumniUser"].includes(model) ?
            <div className='table-responsive' style={{ height: "100%" }}>
              <table className="table">
                <thead className="sticky-top" style={{ background: "#ae7e28", color: '#FFF' }}>
                  <tr>
                    <th>Sr. No.</th>
                    <th>profile Pic</th>
                    <th>Name</th>
                    <th>School</th>
                    <th>Gender</th>
                    <th>Email</th>
                    <th>Eanroled Program</th>
                    <th>{`Program ${model === "StudentUser" ? 'Enroled' : 'completed'} on`}</th>

                  </tr>
                </thead>
                <tbody>
                  {
                    tileData?.map((item, index) => <tr>
                      <td>{index + 1}</td>
                      <td><Avatar src={`${api}/showFile/${item.photoURL}/student`} /></td>
                      <td>{`${item.salutation} ${item.name}`}</td>
                      <td>{item.schoolName}</td>
                      <td>{item.gender}</td>
                      <td>{item.email}</td>
                      <td>{item.programGraduated}</td>
                      <td>{model === "StudentUser" ? item.programEnroledOn : item.programCompletedOn}</td>
                    </tr>
                    )
                  }
                </tbody>
              </table>
            </div>
            : <AdminTable data={tileData} tableHead={tableHead[model]} proof={proof} serviceName={module} Heading={modelNames[model]} SendReq={model} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AdminNumaricalData
