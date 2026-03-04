import React, { useEffect, useState } from 'react'
import AcadmicYearSelect from '../components/AcadmicYearSelect';
import { downloadExcelZip } from './AdminFaculty';
import CircularProgress from '@mui/material/CircularProgress';
import BtnAdminTable from '../components/BtnAdminTable';
import allTableHeads from '../js/allTableHeads';
import { modifyObject as modifyObjectFaculty } from '../../faculty/components/FacultyMainTable';


const modifyTableObject =  (obj, elementsToAdd) =>{
  delete obj['userId.name']
  delete obj['userId.department']
  const {index, ...rest} = obj
  return {index, ...elementsToAdd, ...rest}
 }

const AdminOthers = () => {

  const [childData, setChildData] = useState({ ResearchProject: null, JrfSrf: null, DSDSports: null, SportsAndCulturalEvents: null, EsttFullTimeTeacherAgainstSanctioned: null, EsttFullTimeTeacher: null, EsttFullTimeTeacherWhoLeft: null, DateOfResultDiclaration: null, ExamPassedDuringYear: null, StudentComplaintsGrievances: null, SubscriptionForKRC: null, AwardForExtensionActivities: null, ExtensionActivities: null, TotalExpenditure: null, PhdAwarded: null, ResearchGuideAdmin: null, ProgressionToHE: null, DemandRatio: null, ValueAddedCource: null, EContentDeveloped: null, SwayamDetailsOfOnlineCourses: null, CounselingAndGuidance: null })
  const [values, setValues] = useState({ yearFilter: [] })
  const { yearFilter } = values

  const loadedInitial = { ResearchProject: false, JrfSrf: false, DSDSports: false, SportsAndCulturalEvents: false, EsttFullTimeTeacherAgainstSanctioned: false, EsttFullTimeTeacher: false, EsttFullTimeTeacherWhoLeft: false, DateOfResultDiclaration: false, ExamPassedDuringYear: false, StudentComplaintsGrievances: false, SubscriptionForKRC: false, AwardForExtensionActivities: false, ExtensionActivities: false, TotalExpenditure: false, PhdAwarded: false, ResearchGuideAdmin: false, ProgressionToHE: false, DemandRatio: false, ValueAddedCource: false, EContentDeveloped: false, SwayamDetailsOfOnlineCourses: false, CounselingAndGuidance: false }
  const [loaded, setLoaded] = useState(loadedInitial)

  const loading = !(Object.values(loaded).every((value) => value === true));

  const factyNameAndDepartment = {guideName: 'Faculty Name', schoolName: 'Faculty School',}

  const allOtherComponents = [
    {
      element: <BtnAdminTable values={values} heads={modifyTableObject(allTableHeads.JrfSrf, factyNameAndDepartment)} model="JrfSrf" setState={setChildData} customParams={{ model: "JrfSrf", module: "Admin", filter: yearFilter.length > 0 ? { year: { $in: yearFilter }, otherUser: 'Admin' } : {otherUser: 'Admin'} }} heading='JRF, SRF & PDF (APDS)' setLoaded={setLoaded} proof="proof" serviceName="faculty" />,
      childData: childData?.JrfSrf, filename: 'JRF, SRF & PDF (APDS).xlsx', SendReq: "JrfSrf", module: "faculty"
    },
    {
      element: <BtnAdminTable values={values} heads={modifyTableObject(allTableHeads.ResearchProject, factyNameAndDepartment)} model="ResearchProject" setState={setChildData} customParams={{ model: "ResearchProject", module: "Admin", filter: yearFilter.length > 0 ? { year: { $in: yearFilter }, otherUser: 'Admin' } : {otherUser: 'Admin'} }} heading='Research Projects (APDS)' setLoaded={setLoaded} proof="proof" serviceName="faculty" />,
      childData: childData?.ResearchProject, filename: 'Research Projects (APDS).xlsx', SendReq: "ResearchProject", module: "faculty"
    },
    {
      element: <BtnAdminTable values={values} model="DSDSports" setState={setChildData} customParams={{ model: "DSDSports", module: "Admin", filter: yearFilter.length > 0 ? { academicYear: { $in: yearFilter } } : {} }} heading='Students Awards & Medals (DSD)' setLoaded={setLoaded} proof="proof" serviceName="dsd" />,
      childData: childData?.DSDSports, filename: 'Students Awards & Medals (DSD).xlsx', SendReq: "DSDSports", module: "dsd" 
    },
    {
      element: <BtnAdminTable values={values} model="SportsAndCulturalEvents" setState={setChildData} customParams={{ model: "SportsAndCulturalEvents", module: "Admin", filter: yearFilter.length > 0 ? { academicYear: { $in: yearFilter } } : {} }} heading='Information of Sports And Cultural Event (DSD)' setLoaded={setLoaded} proof="proof" serviceName="dsd" />,
      childData: childData?.SportsAndCulturalEvents, filename: 'Information of Sports And Cultural Event (DSD).xlsx', SendReq: "SportsAndCulturalEvents", module: "dsd"
    },
    {
      element: <BtnAdminTable values={values} model="EsttFullTimeTeacherAgainstSanctioned" setState={setChildData} customParams={{ model: "EsttFullTimeTeacherAgainstSanctioned", module: "Admin", filter: yearFilter.length > 0 ? { academicYear: { $in: yearFilter } } : {} }} heading='Full Time Teachers Against Sanctioned Posts (Establishment)' setLoaded={setLoaded} serviceName="estt" />,
      childData: childData?.EsttFullTimeTeacherAgainstSanctioned, filename: 'Full Time Teachers Against Sanctioned Posts (Establishment).xlsx', SendReq: "EsttFullTimeTeacherAgainstSanctioned", module: "estt"
    },
    {
      element: <BtnAdminTable values={values} model="EsttFullTimeTeacher" setState={setChildData} customParams={{ model: "EsttFullTimeTeacher", module: "Admin", filter: yearFilter.length > 0 ? { academicYear: { $in: yearFilter } } : {} }} heading='Full Time Teachers (Establishment)' setLoaded={setLoaded} serviceName="estt" />,
      childData: childData?.EsttFullTimeTeacher, filename: 'Full Time Teachers (Establishment).xlsx', SendReq: "EsttFullTimeTeacher", module: "estt"
    },
    {
      element: <BtnAdminTable values={values} model="EsttFullTimeTeacherWhoLeft" setState={setChildData} customParams={{ model: "EsttFullTimeTeacherWhoLeft", module: "Admin", filter: yearFilter.length > 0 ? { academicYear: { $in: yearFilter } } : {} }} heading='Full Time Teachers who left joined the institution (Establishment)' setLoaded={setLoaded} serviceName="estt" />,
      childData: childData?.EsttFullTimeTeacherWhoLeft, filename: 'Full Time Teachers who left joined the institution (Establishment).xlsx', SendReq: "EsttFullTimeTeacherWhoLeft", module: "estt"
    },
    {
      element: <BtnAdminTable values={values} model="DateOfResultDiclaration" setState={setChildData} customParams={{ model: "DateOfResultDiclaration", module: "Admin", filter: yearFilter.length > 0 ? { academicYear: { $in: yearFilter } } : {} }} heading='Date Of Result Declaration (Exam)' setLoaded={setLoaded} proof="Proof" serviceName="exam" />,
      childData: childData?.DateOfResultDiclaration, filename: 'Date Of Result Declaration (Exam).xlsx', SendReq: "DateOfResultDiclaration", module: "exam"
    },
    {
      element: <BtnAdminTable values={values} model="ExamPassedDuringYear" setState={setChildData} customParams={{ model: "ExamPassedDuringYear", module: "Admin", filter: yearFilter.length > 0 ? { academicYear: { $in: yearFilter } } : {} }} heading='Students Passed During The Year (Exam)' setLoaded={setLoaded} serviceName="exam" />,
      childData: childData?.ExamPassedDuringYear, filename: 'Students Passed During The Year (Exam).xlsx', SendReq: "ExamPassedDuringYear", module: "exam"
    },
    {
      element: <BtnAdminTable values={values} model="StudentComplaintsGrievances" setState={setChildData} customParams={{ model: "StudentComplaintsGrievances", module: "Admin", filter: yearFilter.length > 0 ? { academicYear: { $in: yearFilter } } : {} }} heading='Student Complaints Grievances (Exam)' setLoaded={setLoaded} proof="Proof" serviceName="exam" />,
      childData: childData?.StudentComplaintsGrievances, filename: 'Student Complaints Grievances (Exam).xlsx', SendReq: "StudentComplaintsGrievances", module: "exam"
    },
    {
      element: <BtnAdminTable values={values} model="SubscriptionForKRC" setState={setChildData} customParams={{ model: "SubscriptionForKRC", module: "Admin", filter: yearFilter.length > 0 ? { academicYear: { $in: yearFilter } } : {} }} heading='Institution has subscription (KRC)' setLoaded={setLoaded} proof="proof" serviceName="krc" />,
      childData: childData?.SubscriptionForKRC, filename: 'Institution has subscription (KRC).xlsx', SendReq: "SubscriptionForKRC", module: "krc"
    },
    {
      element: <BtnAdminTable values={values} model="AwardForExtensionActivities" setState={setChildData} customParams={{ model: "AwardForExtensionActivities", module: "Admin", filter: yearFilter.length > 0 ? { academicYear: { $in: yearFilter } } : {} }} heading='Award For Extension Activities (NSS)' setLoaded={setLoaded} proof="proof" serviceName="nss" />,
      childData: childData?.AwardForExtensionActivities, filename: 'Award For Extension Activities (NSS).xlsx', SendReq: "AwardForExtensionActivities", module: "nss"
    },
    {
      element: <BtnAdminTable values={values} model="ExtensionActivities" setState={setChildData} customParams={{ model: "ExtensionActivities", module: "Admin", filter: { Year_of_activity: { $in: yearFilter }, otherUser: "NSS" } }} heading='Extension Activities (NSS)' setLoaded={setLoaded} serviceName="director" proof="Upload_Proof" />,
      childData: childData?.ExtensionActivities, filename: 'Extension Activities (NSS).xlsx', SendReq: "ExtensionActivities", module: "director"
    },
    {
      element: <BtnAdminTable values={values} model="TotalExpenditure" setState={setChildData} customParams={{ model: "TotalExpenditure", module: "Admin", filter: yearFilter.length > 0 ? { academicYear: { $in: yearFilter } } : {} }} heading='Total Expenditure (FAO)' setLoaded={setLoaded} serviceName="other" />,
      childData: childData?.TotalExpenditure, filename: 'Total Expenditure (FAO).xlsx', SendReq: "TotalExpenditure", module: "other"
    },
    {
      element: <BtnAdminTable values={values} heads={modifyTableObject(allTableHeads.PhdAwarded, {guideName: 'Guide Name', departmentName: 'School',})} model="PhdAwarded" setState={setChildData} customParams={{ model: "PhdAwarded", module: "Admin", filter: yearFilter.length > 0 ? { year: { $in: yearFilter }, otherUser: "Admin" } : {} }} heading='Ph.D. Scholars (PG Section)' setLoaded={setLoaded} serviceName="faculty" proof="proof" />,
      childData: childData?.PhdAwarded, filename: 'Ph.D. Scholars (PG Section).xlsx', SendReq: "PhdAwarded", module: "faculty"
    },
    {
      element: <BtnAdminTable values={values} model="ResearchGuideAdmin" setState={setChildData} customParams={{ model: "ResearchGuideAdmin", module: "Admin", filter: yearFilter.length > 0 ? { year: { $in: yearFilter } } : {} }} heading='Research Guide (PG Section)' setLoaded={setLoaded} serviceName="admin" proof="proof" />,
      childData: childData?.ResearchGuideAdmin, filename: 'Research Guide (PG Section).xlsx', SendReq: "ResearchGuideAdmin", module: "Admin"
    },
    {
      element: <BtnAdminTable values={values} model="ProgressionToHE" setState={setChildData} customParams={{ model: "ProgressionToHE", module: "Admin", filter: yearFilter.length > 0 ? { year: { $in: yearFilter }, otherUser: "PG" } : { otherUser: "PG" } }} heading='Progression To HE (PG Section)' setLoaded={setLoaded} serviceName="faculty" proof="proof" />,
      childData: childData?.ProgressionToHE, filename: 'Progression To HE (PG Section).xlsx', SendReq: "ProgressionToHE", module: "faculty"
    },
    {
      element: <BtnAdminTable values={values} model="DemandRatio" setState={setChildData} customParams={{ model: "DemandRatio", module: "Admin", filter: yearFilter.length > 0 ? { year: { $in: yearFilter }, otherUser: "PG" } : {otherUser: "PG"} }} heading='Demand Ratio (PG Section)' setLoaded={setLoaded} serviceName="director" proof="proof" />,
      childData: childData?.DemandRatio, filename: 'Demand Ratio (PG Section).xlsx', SendReq: "DemandRatio", module: "director"
    },
    {
      element: <BtnAdminTable values={values} model="CounselingAndGuidance" setState={setChildData} customParams={{ model: "CounselingAndGuidance", module: "Admin", filter: yearFilter.length > 0 ? { year: { $in: yearFilter }, otherUser: "Placement" } : { otherUser: "Placement" } }} heading='Counseling And Guidance (Placement)' setLoaded={setLoaded} serviceName="director" proof="proof" />,
      childData: childData?.CounselingAndGuidance, filename: 'Counseling And Guidance (Placement).xlsx', SendReq: "CounselingAndGuidance", module: "director"
    },
    {
      element: <BtnAdminTable values={values} model="ValueAddedCource" setState={setChildData} customParams={{ model: "ValueAddedCource", module: "Admin", filter: yearFilter.length > 0 ? { Academic_year: { $in: yearFilter }, SchoolName: 'Swayam' } : {SchoolName: 'Swayam'} }} heading='Value Added Courses (Swayam)' setLoaded={setLoaded} serviceName="director" proof="Upload_Proof" />,
      childData: childData?.ValueAddedCource, filename: 'Value Added Courses (Swayam).xlsx', SendReq: "ValueAddedCource", module: "diirector"
    },
    {
      element: <BtnAdminTable values={values} model="EContentDeveloped" setState={setChildData} customParams={{ model: "EContentDeveloped", module: "Admin", filter: yearFilter.length > 0 ? { year: { $in: yearFilter }, otherUser: 'Swayam' } : {otherUser: 'Swayam'} }} heading='E-Content Developed (Swayam)' setLoaded={setLoaded} serviceName="faculty" proof="proof" heads={modifyObjectFaculty(allTableHeads.EContentDeveloped)} />,
      childData: childData?.EContentDeveloped, filename: 'E-Content Developed (Swayam).xlsx', SendReq: "EContentDeveloped", module: "faculty"
    },
    {
      element: <BtnAdminTable values={values} model="SwayamDetailsOfOnlineCourses" setState={setChildData} customParams={{ model: "SwayamDetailsOfOnlineCourses", module: "Admin", filter: yearFilter.length > 0 ? { academicYear: { $in: yearFilter } } : {} }} heading='Details of online courses (Swayam)' setLoaded={setLoaded} serviceName="swayam" proof="proof" />,
      childData: childData?.SwayamDetailsOfOnlineCourses, filename: 'Details of online courses (Swayam).xlsx', SendReq: "SwayamDetailsOfOnlineCourses", module: "faculty"
    },
  ]

  useEffect(() => {
    setLoaded(loadedInitial);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.yearFilter]);

  return (
    <div className='sub-main'>
      <div className='flex px-3 flex-wrap gap-2'>
        <AcadmicYearSelect className="col-md-4 col-lg-4 col-12" value={yearFilter} setState={setValues} id="yearFilter" label="Filter by Academic Year" />
        <button className='col-md-3 col-lg-3 col-12 btn btn-sm btn-success align-middle' style={{ margin: "37px 0px auto 0px" }} onClick={() => { downloadExcelZip(allOtherComponents, 'All Other Section Excels',) }} disabled={loading} >{loading ? <CircularProgress color="inherit" size={18} /> : "Export All Excels"}</button>
      </div>
      <div style={{ padding: "10px" }}>

        <div className='button-wraper'>

          <div className='grid grid-cols-4 gap-3 p-2'>
            {
              allOtherComponents?.map(((item) => item?.element))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminOthers
export { modifyTableObject }