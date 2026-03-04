import React, { useEffect, useState } from 'react'

import Directors from '../tables/Directors';
import AcadmicYearSelect from '../components/AcadmicYearSelect';
import AdminSchoolSelect from '../components/AdminSchoolSelect';
import { downloadExcelZip } from './AdminFaculty';
import CircularProgress from '@mui/material/CircularProgress';
import allTableHeads from '../js/allTableHeads';
import BtnAdminTable from '../components/BtnAdminTable';
import SchoolsProgram from '../../../components/SchoolsProgram';


const AdminDirector = () => {

  const [childData, setChildData] = useState({ director: null, AlumniContribution: null, Award: null, ConferencesSemiWorkshopOrganized: null, CounselingAndGuidance: null, DemandRatio: null, Employability: null, ExtensionActivities: null, IctClassrooms: null, MoUs: null, Placement: null, ProgressionToHE: null, ProjectsInternships: null, QualifiedExams: null, ResearchMethodologyWorkshops: null, ReservedSeats: null, SkillsEnhancementInitiatives: null, StudentSatisfactionSurvey: null, SyllabusRevision: null, TrainingProgramsOrganized: null, UgcSapCasDstFistDBTICSSR: null, ValueAddedCource: null, CourceInAllProgram: null, StudentInformation: null })
  const [values, setValues] = useState({ yearFilter: [], schoolName: "All Schools" })
  const { yearFilter, schoolName } = values

  const loadedInitial = { director: false, AlumniContribution: false, Award: false, ConferencesSemiWorkshopOrganized: false, CounselingAndGuidance: false, DemandRatio: false, Employability: false, ExtensionActivities: false, IctClassrooms: false, MoUs: false, Placement: false, ProgressionToHE: false, ProjectsInternships: false, QualifiedExams: false, ResearchMethodologyWorkshops: false, ReservedSeats: false, SkillsEnhancementInitiatives: false, StudentSatisfactionSurvey: false, SyllabusRevision: false, TrainingProgramsOrganized: false, UgcSapCasDstFistDBTICSSR: false, ValueAddedCource: false, CourceInAllProgram: false, StudentInformation: false }
  const [loaded, setLoaded] = useState(loadedInitial)

  const loading = !(Object.values(loaded).every((value) => value === true));
  const Schools = Object.keys(SchoolsProgram)

  const allDirectorComponents = [
    //all proofs remaining
    {
      element: <Directors id="director" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} heading='Directors' setLoaded={setLoaded} />,
      childData: childData?.director, filename: 'Directors.xlsx', SendReq: "DirectorUser", module: "faculty"
    },
    {
      element: <BtnAdminTable values={values} model="AlumniContribution" setState={setChildData} yearField='Academic_Year' academicYear={yearFilter} school={schoolName} heading='Alumni Contribution' setLoaded={setLoaded} heads={allTableHeads.AlumniContribution} proof="Upload_Proof" serviceName='director' />,
      childData: childData?.AlumniContribution, filename: 'Alumni Contribution.xlsx', SendReq: "AlumniContribution", proof: "Upload_Proof", module: "director"
    },
    {
      element: <BtnAdminTable values={values} model="Award" setState={setChildData} yearField='Year_of_Award' academicYear={yearFilter} school={schoolName} heading='Awards' setLoaded={setLoaded} heads={allTableHeads.Award} proof="Upload_Proof" serviceName='director' />,
      childData: childData?.Award, filename: 'Awards.xlsx', SendReq: "Award", proof: "Upload_Proof", module: "director"
    },
    {
      element: <BtnAdminTable values={values} model="ConferencesSemiWorkshopOrganized" setState={setChildData} yearField='Year' academicYear={yearFilter} school={schoolName} heading='Conferences Seminar Workshop Organized' setLoaded={setLoaded} heads={allTableHeads.ConferencesSemiWorkshopOrganized} proof="Upload_Proof" serviceName='director' />,
      childData: childData?.ConferencesSemiWorkshopOrganized, filename: 'Conferences Seminar Workshop Organized.xlsx', SendReq: "ConferencesSemiWorkshopOrganized", module: "director", proof: "Upload_Proof",
    },
    {
      element: <BtnAdminTable values={values} model="CounselingAndGuidance" setState={setChildData} yearField='Year_of_Activity' academicYear={yearFilter} school={schoolName} heading='Counseling And Guidance' setLoaded={setLoaded} heads={allTableHeads.CounselingAndGuidance} proof="Upload_Proof" serviceName='director' />,
      childData: childData?.CounselingAndGuidance, filename: 'Counseling And Guidance.xlsx', SendReq: "CounselingAndGuidance", module: "director", proof: "Upload_Proof",
    },
    {
      element: <BtnAdminTable values={values} model="DemandRatio" setState={setChildData} yearField='Academic_Year' academicYear={yearFilter} school={schoolName} heading='Demand Ratio' setLoaded={setLoaded} heads={allTableHeads.DemandRatio} proof="Upload_Proof" serviceName='director' />,
      childData: childData?.DemandRatio, filename: 'Demand Ratio.xlsx', SendReq: "DemandRatio", module: "director", proof: "Upload_Proof",
    },
    {
      element: <BtnAdminTable values={values} model="Employability" setState={setChildData} yearField='Academic_Year' academicYear={yearFilter} school={schoolName} heading='Employability' setLoaded={setLoaded} heads={allTableHeads.Employability} proof="Upload_Proof" serviceName='director' />,
      childData: childData?.Employability, filename: 'Employability.xlsx', SendReq: "Employability", module: "director", proof: "Upload_Proof",
    },
    {
      element: <BtnAdminTable values={values} model="ExtensionActivities" setState={setChildData} yearField='Year_of_activity' academicYear={yearFilter} school={schoolName} heading='Extension Activities' setLoaded={setLoaded} heads={allTableHeads.ExtensionActivities} proof="Upload_Proof" serviceName='director' />,
      childData: childData?.ExtensionActivities, filename: 'Extension Activities.xlsx', SendReq: "ExtensionActivities", module: "director", proof: "Upload_Proof",
    },
    {
      element: <BtnAdminTable values={values} model="IctClassrooms" setState={setChildData} yearField='academicYear' academicYear={yearFilter} school={schoolName} heading='Ict Classrooms' setLoaded={setLoaded} heads={allTableHeads.IctClassrooms} proof="Upload_Proof" serviceName='director' />,
      childData: childData?.IctClassrooms, filename: 'IctClassrooms.xlsx', SendReq: "IctClassrooms", module: "director", proof: "Upload_Proof",
    },
    {
      element: <BtnAdminTable values={values} model="MoUs" setState={setChildData} yearField='Year_of_signing_MoU' academicYear={yearFilter} school={schoolName} heading='MoUs' setLoaded={setLoaded} heads={allTableHeads.MoUs} proof="Upload_Proof" serviceName='director' />,
      childData: childData?.MoUs, filename: 'MoUs.xlsx', SendReq: "MoUs", module: "director", proof: "Upload_Proof",
    },
    {
      element: <BtnAdminTable values={values} model="Placement" setState={setChildData} yearField='Academic_Year' academicYear={yearFilter} school={schoolName} heading='Placements' setLoaded={setLoaded} heads={allTableHeads.Placement} proof="Upload_Proof" serviceName='director' />,
      childData: childData?.Placement, filename: 'Placements.xlsx', SendReq: "Placement", module: "director", proof: "Upload_Proof",
    },
    {
      element: <BtnAdminTable values={values} model="ProgressionToHE" setState={setChildData} yearField='Academic_Year' academicYear={yearFilter} school={schoolName} heading='Progression To HE' setLoaded={setLoaded} heads={allTableHeads.ProgressionToHE} proof="Upload_Proof" serviceName='director' />,
      childData: childData?.ProgressionToHE, filename: 'Progression To HE.xlsx', SendReq: "ProgressionToHE", module: "director", proof: "Upload_Proof",
    },
    {
      element: <BtnAdminTable values={values} model="ProjectsInternships" setState={setChildData} yearField='Academic_Year' academicYear={yearFilter} school={schoolName} heading='Projects Internships' setLoaded={setLoaded} heads={allTableHeads.ProjectsInternships} proof="Upload_Proof" serviceName='director' />,
      childData: childData?.ProjectsInternships, filename: 'Projects Internships.xlsx', SendReq: "ProjectsInternships", module: "director", proof: "Upload_Proof",
    },
    {
      element: <BtnAdminTable values={values} model="QualifiedExams" setState={setChildData} yearField='Acadmic_year' academicYear={yearFilter} school={schoolName} heading='Qualified Exams' setLoaded={setLoaded} heads={allTableHeads.QualifiedExams} proof="Upload_Proof" serviceName='director' />,
      childData: childData?.QualifiedExams, filename: 'Qualified Exams.xlsx', SendReq: "QualifiedExams", module: "director", proof: "Upload_Proof",
    },
    {
      element: <BtnAdminTable values={values} model="ResearchMethodologyWorkshops" setState={setChildData} yearField='year' academicYear={yearFilter} school={schoolName} heading='Research Methodology Workshops' setLoaded={setLoaded} heads={allTableHeads.ResearchMethodologyWorkshops} proof="Upload_Proof" serviceName='director' />,
      childData: childData?.ResearchMethodologyWorkshops, filename: 'Research Methodology Workshops.xlsx', SendReq: "ResearchMethodologyWorkshops", module: "director", proof: "Upload_Proof",
    },
    {
      element: <BtnAdminTable values={values} model="ReservedSeats" setState={setChildData} yearField='Academic_Year' academicYear={yearFilter} school={schoolName} heading='Reserved Seats' setLoaded={setLoaded} heads={allTableHeads.ReservedSeats} proof="Upload_Proof" serviceName='director' />,
      childData: childData?.ReservedSeats, filename: 'Reserved Seats.xlsx', SendReq: "ReservedSeats", module: "director", proof: "Upload_Proof",
    },
    {
      element: <BtnAdminTable values={values} model="SkillsEnhancementInitiatives" setState={setChildData} yearField='Academic_Year' academicYear={yearFilter} school={schoolName} heading='Skills Enhancement Initiatives' setLoaded={setLoaded} heads={allTableHeads.SkillsEnhancementInitiatives} proof="Upload_Proof" serviceName='director' />,
      childData: childData?.SkillsEnhancementInitiatives, filename: 'Skills Enhancement Initiatives.xlsx', SendReq: "SkillsEnhancementInitiatives", module: "director", proof: "Upload_Proof",
    },
    {
      element: <BtnAdminTable values={values} model="StudentSatisfactionSurvey" setState={setChildData} yearField='Year_of_joining' academicYear={yearFilter} school={schoolName} heading='Student Satisfaction Survey' setLoaded={setLoaded} heads={allTableHeads.StudentSatisfactionSurvey} proof="Upload_Proof" serviceName='director' />,
      childData: childData?.StudentSatisfactionSurvey, filename: 'Student Satisfaction Survey.xlsx', SendReq: "StudentSatisfactionSurvey", module: "director", proof: "Upload_Proof",
    },
    {
      element: <BtnAdminTable values={values} model="SyllabusRevision" setState={setChildData} yearField='Academic_Year' academicYear={yearFilter} school={schoolName} heading='Syllabus Revision' setLoaded={setLoaded} heads={allTableHeads.SyllabusRevision} proof="Upload_Proof" serviceName='director' />,
      childData: childData?.SyllabusRevision, filename: 'Syllabus Revision.xlsx', SendReq: "SyllabusRevision", module: "director", proof: "Upload_Proof",
    },
    {
      element: <BtnAdminTable values={values} model="TrainingProgramsOrganized" setState={setChildData} yearField='Year' academicYear={yearFilter} school={schoolName} heading='Administrative Training Programs Organized' setLoaded={setLoaded} heads={allTableHeads.TrainingProgramsOrganized} proof="Upload_Proof" serviceName='director' />,
      childData: childData?.TrainingProgramsOrganized, filename: 'Administrative Training Programs Organized.xlsx', SendReq: "TrainingProgramsOrganized", module: "director", proof: "Upload_Proof",
    },
    {
      element: <BtnAdminTable values={values} model="UgcSapCasDstFistDBTICSSR" setState={setChildData} yearField='Year_of_Award' academicYear={yearFilter} school={schoolName} heading='UGC-SAP, CAS, DST-FIST, DBT, ICSSR' setLoaded={setLoaded} heads={allTableHeads.UgcSapCasDstFistDBTICSSR} proof="Upload_Proof" serviceName='director' />,
      childData: childData?.UgcSapCasDstFistDBTICSSR, filename: 'UGC-SAP, CAS, DST-FIST, DBT, ICSSR.xlsx', SendReq: "UgcSapCasDstFistDBTICSSR", module: "director", proof: "Upload_Proof",
    },
    {
      element: <BtnAdminTable values={values} model="ValueAddedCource" setState={setChildData} yearField='Academic_year' heading='Value Added Course' setLoaded={setLoaded} heads={allTableHeads.ValueAddedCource} proof="Upload_Proof" serviceName='director' customParams={{ model: "ValueAddedCource", module: "Admin", filter: yearFilter.length === 0 && schoolName==="All Schools" ?{SchoolName: {$in: Schools}}:yearFilter.length !== 0 && schoolName==="All Schools" ?{ Academic_year: {$in : yearFilter}, SchoolName: {$in: Schools}}: yearFilter.length === 0 && schoolName!=="All Schools" ? {SchoolName: schoolName} :{SchoolName: schoolName, Academic_year: {$in : yearFilter}}}} />,
      childData: childData?.ValueAddedCource, filename: 'Value Added Course.xlsx', SendReq: "ValueAddedCource", module: "director", proof: "Upload_Proof",
    },
    {
      element: <BtnAdminTable values={values} model="CourceInAllProgram" setState={setChildData} yearField="academicYear" heading="Courses In All Programs" setLoaded={setLoaded} heads={allTableHeads.CourceInAllProgram} serviceName='director' customParams={{ model: "CourceInAllProgram", module: "Admin", filter: yearFilter.length === 0 && schoolName==="All Schools" ?{SchoolName: {$in: Schools}}:yearFilter.length !== 0 && schoolName==="All Schools" ?{ academicYear: {$in : yearFilter}, SchoolName: {$in: Schools}}: yearFilter.length === 0 && schoolName!=="All Schools" ? {SchoolName: schoolName} :{SchoolName: schoolName, academicYear: {$in : yearFilter}}}} />,
      childData: childData?.CourceInAllProgram, filename: 'Courses In All Programs.xlsx', SendReq: "CourceInAllProgram", module: "director",
    },
    {
      element: <BtnAdminTable values={values} model="NewPrograms" setState={setChildData} yearField="academicYear" heading="New Programs" setLoaded={setLoaded} heads={allTableHeads.NewPrograms} serviceName='director' customParams={{ model: "NewPrograms", module: "Admin", filter: yearFilter.length === 0 && schoolName==="All Schools" ?{SchoolName: {$in: Schools}}:yearFilter.length !== 0 && schoolName==="All Schools" ?{ academicYear: {$in : yearFilter}, SchoolName: {$in: Schools}}: yearFilter.length === 0 && schoolName!=="All Schools" ? {SchoolName: schoolName} :{SchoolName: schoolName, academicYear: {$in : yearFilter}}}} />,
      childData: childData?.NewPrograms, filename: 'New Programs.xlsx', SendReq: "NewPrograms", module: "director",
    },
    {
      element: <BtnAdminTable values={values} model="StudentInformation" setState={setChildData} yearField="year" heading="Student Information" setLoaded={setLoaded} heads={allTableHeads.StudentInformation} serviceName='director' customParams={{ model: "StudentInformation", module: "Admin", filter: yearFilter.length === 0 && schoolName==="All Schools" ?{SchoolName: {$in: Schools}}:yearFilter.length !== 0 && schoolName==="All Schools" ?{ year: {$in : yearFilter}, SchoolName: {$in: Schools}}: yearFilter.length === 0 && schoolName!=="All Schools" ? {SchoolName: schoolName} :{SchoolName: schoolName, year: {$in : yearFilter}}}} />,
      childData: childData?.StudentInformation, filename: 'Student Information.xlsx', SendReq: "StudentInformation", module: "director",
    },
  ]

  useEffect(() => {
    if (values.yearFilter) {
      setLoaded({
        ...loadedInitial, director: true, ictclassrooms: true,
      });
    } else if (values.schoolName) {
      setLoaded(loadedInitial);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.yearFilter, values.schoolName]);

  return (

    <div className='sub-main'>
      <div className='flex px-3 flex-wrap gap-2'>
        <AcadmicYearSelect className="col-md-4 col-lg-4 col-12" value={yearFilter} setState={setValues} id="yearFilter" label="Filter By Acadmic Year" />
        <AdminSchoolSelect className="col-md-4 col-lg-4 col-12" value={schoolName} setState={setValues} id="schoolName" label="Filter By School" />
        <button className='col-md-3 col-lg-3 col-12 btn btn-sm btn-success align-middle' style={{ margin: "37px 0px auto 0px" }} onClick={() => { downloadExcelZip(allDirectorComponents, 'All Director Section Excels') }} disabled={loading} >{loading ? <CircularProgress color="inherit" size={18} /> : "Export All Excels"}</button>
      </div>
      <div style={{ padding: "10px" }}>

        <div className='button-wraper'>
          <div className='grid grid-cols-4 gap-3 p-2'>
            {
              allDirectorComponents?.map(((item, i) => <div key={`${item}${i}`}>{item?.element}</div>))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDirector