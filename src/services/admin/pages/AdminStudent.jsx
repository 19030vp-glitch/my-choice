import React, { useEffect, useState } from 'react';
import AcadmicYearSelect from '../components/AcadmicYearSelect';
import AdminSchoolSelect from '../components/AdminSchoolSelect';
import Students from '../tables/Students';
import { downloadExcelZip } from './AdminFaculty';
import CircularProgress from '@mui/material/CircularProgress';
import BtnAdminTable from '../components/BtnAdminTable';
import allTableHeads from '../js/allTableHeads';
import { modifyTableObject } from './AdminOthers';

const AdminStudent = () => {

  const [childData, setChildData] = useState({ student: null, JrfSrf: null, BookAndChapter: null, Patent: null, ResearchProject: null  })

  const [values, setValues] = useState({ yearFilter: [], schoolName: "All Schools" })
  const { yearFilter, schoolName } = values

  const loadedInitial = { student: false, JrfSrf: false, BookAndChapter: false, Patent: false, ResearchProject: false }
  const [loaded, setLoaded] = useState(loadedInitial)

  console.log(loaded);

  const loading = !(Object.values(loaded).every((value) => value === true));

  const GuideNameAndDepartment = {guideName: 'Guide Name', schoolName: 'School',}

  const allStudentComponents = [
    {
      element: <Students id="student" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Students' setLoaded={setLoaded} />,
      childData: childData?.student, filename: 'Student', SendReq: "StudentUser", module: "director",
    },
    {
      element: <BtnAdminTable values={values} model="JrfSrf" setState={setChildData} heads={modifyTableObject(allTableHeads.JrfSrf, GuideNameAndDepartment)} customParams={{model: "JrfSrf", module: "Admin", filter: yearFilter.length === 0? {studentId: {$exists:true ,$ne:"undefined"}} : {year: {$in:yearFilter, $exists:true, $ne:"undefined"}},  filterConditios: schoolName==='All Schools'? null :{department: schoolName}}} heading='JRF, SRF & PDF' setLoaded={setLoaded} serviceName="faculty" proof="proof" />, childData: childData?.JrfSrf, filename: 'JRF, SRF & PDF', SendReq: "JrfSrf", module: "faculty", proof: "proof",
    },
    {
      element: <BtnAdminTable values={values} model="BookAndChapter" setState={setChildData} heads={modifyTableObject(allTableHeads.BookAndChapter, GuideNameAndDepartment)} customParams={{model: "BookAndChapter", module: "Admin", filter: yearFilter.length === 0? {studentId: {$exists:true ,$ne:"undefined"}} : {year: {$in:yearFilter, $exists:true, $ne:"undefined"}},  filterConditios: schoolName==='All Schools'? null :{department: schoolName}}} heading='Books And Chapter' setLoaded={setLoaded} serviceName="faculty" proof="proof" />, childData: childData?.BookAndChapter, filename: 'Books And Chapter', SendReq: "BookAndChapter", module: "faculty", proof: "proof",
    },
    {
      element: <BtnAdminTable values={values} model="Patent" setState={setChildData} heads={modifyTableObject(allTableHeads.Patent, GuideNameAndDepartment)} customParams={{model: "Patent", module: "Admin", filter: yearFilter.length === 0? {studentId: {$exists:true ,$ne:"undefined"}} : {year: {$in:yearFilter, $exists:true, $ne:"undefined"}},  filterConditios: schoolName==='All Schools'? null :{department: schoolName}}} heading='Patents' setLoaded={setLoaded} serviceName="faculty" proof="proof" />, childData: childData?.Patent, filename: 'Patents', SendReq: "Patent", module: "faculty", proof: "proof",
    },
    {
      element: <BtnAdminTable values={values} model="ResearchProject" setState={setChildData} heads={modifyTableObject(allTableHeads.ResearchProject, GuideNameAndDepartment)} customParams={{model: "ResearchProject", module: "Admin", filter: yearFilter.length === 0? {studentId: {$exists:true ,$ne:"undefined"}} : {year: {$in:yearFilter, $exists:true, $ne:"undefined"}},  filterConditios: schoolName==='All Schools'? null :{department: schoolName}}} heading='Research Projects' setLoaded={setLoaded} serviceName="faculty" proof="proof" />, childData: childData?.ResearchProject, filename: 'Research Projects', SendReq: "ResearchProject", module: "faculty", proof: "proof",
    },
    {
      element: <BtnAdminTable values={values} model="ResearchPaper" setState={setChildData} heads={modifyTableObject(allTableHeads.ResearchPaper, GuideNameAndDepartment)} customParams={{model: "ResearchPaper", module: "Admin", filter: yearFilter.length === 0? {studentId: {$exists:true ,$ne:"undefined"}} : {year: {$in:yearFilter, $exists:true, $ne:"undefined"}},  filterConditios: schoolName==='All Schools'? null :{department: schoolName}}} heading='Research Papers' setLoaded={setLoaded} serviceName="faculty" proof="proof" />, childData: childData?.ResearchPaper, filename: 'Research Papers', SendReq: "ResearchPaper", module: "faculty", proof: "proof",
    },
    
  ]

  useEffect(() => {
    if (values.yearFilter) {
      setLoaded({
        ...loadedInitial, student: true,
      });
    } else if (values.schoolName) {
      setLoaded(loadedInitial);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.yearFilter, values.schoolName]);

  return (
    <div className='sub-main'>
      <div className='flex px-3 flex-wrap gap-2'>
        <AcadmicYearSelect className="col-md-4 col-lg-4 col-12" value={yearFilter} setState={setValues} id="yearFilter" label="Filter by Academic Year" />
        <AdminSchoolSelect className="col-md-4 col-lg-4 col-12" value={schoolName} setState={setValues} id="schoolName" label="Filter By School" />
        <button className='col-md-3 col-lg-3 col-12 btn btn-success btn-sm' style={{ margin: "37px 0px auto 0px" }} onClick={() => { downloadExcelZip(allStudentComponents, 'All Student Section Excels') }} disabled={loading} >{loading ? <CircularProgress color="inherit" size={18} /> : "Export All Excels"}</button>
      </div>
      <div style={{ padding: "10px" }}>

        <div className='button-wraper'>

        <div className='grid grid-cols-4 gap-3 p-2'>
            {
              allStudentComponents?.map(((item) => item?.element))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminStudent