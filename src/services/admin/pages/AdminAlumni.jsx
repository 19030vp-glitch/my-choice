import React, { useEffect, useState } from 'react'
import AcadmicYearSelect from '../components/AcadmicYearSelect'
import AdminSchoolSelect from '../components/AdminSchoolSelect'
import AlumniBusiness from '../tables/AlumniBusiness'
import Alumnies from '../tables/Alumnies'
import AlumniJobs from '../tables/AlumniJobs'
import { downloadExcelZip } from './AdminFaculty'
import CircularProgress from '@mui/material/CircularProgress';
import BtnAdminTable from '../components/BtnAdminTable'
import allTableHeads from '../js/allTableHeads'

const AdminAlumni = () => {
  const [childData, setChildData] = useState({ alumni: null, AlumniContribution: null, ProgressionToHE: null, QualifiedExams: null, Jobs: null, Buisness: null, })
  const [values, setValues] = useState({ yearFilter: [], schoolName: "All Schools" })
  const { yearFilter, schoolName } = values

  const loadedInitial = { alumni: false, AlumniContribution: false, ProgressionToHE: false, QualifiedExams: false, Jobs: false, Buisness: false, }
  const [loaded, setLoaded] = useState(loadedInitial)

  console.log(loaded);

  const loading = !(Object.values(loaded).every((value) => value === true));

  const allAlumniComponents = [
    {
      element: <Alumnies id="alumni" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Alumni' setLoaded={setLoaded} />,
      childData: childData?.alumni, filename: 'Alumni.csv', SendReq: "AlumniUser", module: "director",
    },
    {
      element: <BtnAdminTable values={values} model="ProgressionToHE" setState={setChildData} heads={allTableHeads.ProgressionToHE} customParams={{model: "ProgressionToHE", module: "Admin", filter: yearFilter.length === 0 && schoolName === 'All Schools' ? {AlumniId:{$exists:true ,$ne:"undefined"}} : yearFilter.length !== 0 && schoolName === 'All Schools' ? { Academic_Year: {$in:yearFilter}, AlumniId:{$exists:true ,$ne:"undefined"}} : yearFilter.length === 0 && schoolName !== 'All Schools' ? { SchoolName: schoolName, AlumniId:{$exists:true ,$ne:"undefined"} } : { Academic_Year: {$in:yearFilter}, SchoolName: schoolName, AlumniId:{$exists:true ,$ne:"undefined"}}}} heading='Progression To HE' setLoaded={setLoaded} serviceName="director" proof="Upload_Proof" />, childData: childData?.ProgressionToHE, filename: 'Progression To HE', SendReq: "ProgressionToHE", module: "director", proof: "Upload_Proof",
    },
    {
      element: <BtnAdminTable values={values} model="QualifiedExams" setState={setChildData} heads={allTableHeads.QualifiedExams} customParams={{model: "QualifiedExams", module: "Admin", filter: yearFilter.length === 0 && schoolName === 'All Schools' ? {AlumniId:{$exists:true ,$ne:"undefined"}} : yearFilter.length !== 0 && schoolName === 'All Schools' ? { Acadmic_year: {$in:yearFilter}, AlumniId:{$exists:true ,$ne:"undefined"} } : yearFilter.length === 0 && schoolName !== 'All Schools' ? { SchoolName: schoolName, AlumniId:{$exists:true ,$ne:"undefined"} } : { Acadmic_year: {$in:yearFilter}, SchoolName: schoolName, AlumniId:{$exists:true ,$ne:"undefined"} }}} heading='Qualified Exams' setLoaded={setLoaded} serviceName="director" proof="Upload_Proof" />, childData: childData?.QualifiedExams, filename: 'Qualified Exams', SendReq: "QualifiedExams", module: "director", proof: "Upload_Proof",
    },
    {
      element: <BtnAdminTable values={values} model="AlumniContribution" setState={setChildData} heads={allTableHeads.AlumniContribution} customParams={{model: "AlumniContribution", module: "Admin", filter:  yearFilter.length === 0 && schoolName === 'All Schools'? {AlumniId:{$exists:true ,$ne:"undefined"}} : yearFilter.length !== 0  && schoolName === 'All Schools' ?{Academic_Year: {$in:yearFilter},AlumniId:{$exists:true ,$ne:"undefined"}}: yearFilter.length === 0 && schoolName !== 'All Schools'? {SchoolName: schoolName, AlumniId:{$exists:true ,$ne:"undefined"}} : {Academic_Year: {$in:yearFilter},SchoolName: schoolName, AlumniId:{$exists:true ,$ne:"undefined"}}}} heading='Alumni Contribution' setLoaded={setLoaded} serviceName="director" proof="Upload_Proof" />, childData: childData?.AlumniContribution, filename: 'Alumni Contribution', SendReq: "AlumniContribution", module: "director", proof: "Upload_Proof",
    },
    {
      element: <AlumniJobs id="Jobs" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Alumni Jobs' setLoaded={setLoaded} />,
      childData: childData?.Jobs, filename: 'Alumni Jobs', SendReq: "Placement", proof: "Upload_Proof", module: "director"
    },
    {
      element: <AlumniBusiness id="Buisness" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Alumni Business' setLoaded={setLoaded} />,
      childData: childData?.Buisness, filename: 'Alumni Business', SendReq: "Placement", proof: "Upload_Proof", module: "director"
    },

  ]

  useEffect(() => {
    if (values.yearFilter) {
      setLoaded({
        ...loadedInitial, alumni: true,
      });
    } else if (values.schoolName) {
      setLoaded(loadedInitial);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.yearFilter, values.schoolName]);

  return (
    <div className='sub-main' >
      <div className='flex px-3 flex-wrap gap-2'>
        <AcadmicYearSelect className="col-md-4 col-lg-4 col-12" value={yearFilter} setState={setValues} id="yearFilter" label="Filter by Academic Year" />
        <AdminSchoolSelect className="col-md-4 col-lg-4 col-12" value={schoolName} setState={setValues} id="schoolName" label="Filter By School" />
        <button className='col-md-3 col-lg-3 col-12 btn btn-success btn-sm' style={{ margin: "37px 0px auto 0px" }} onClick={() => { downloadExcelZip(allAlumniComponents, 'All Alumni Section Excels') }} disabled={loading} >{loading ? <CircularProgress color="inherit" size={18} /> : "Export All Excels"}</button>
      </div>
      <div style={{ padding: "10px" }}>

        <div className='button-wraper'>

        <div className='grid grid-cols-4 gap-3 p-2'>
            {
              allAlumniComponents?.map(((item) => item?.element))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminAlumni