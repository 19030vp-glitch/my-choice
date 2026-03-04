import React, { useEffect, useState } from 'react'
import { downloadExcelZip } from './AdminFaculty';
import CircularProgress from '@mui/material/CircularProgress';
import AcadmicYearSelect from '../components/AcadmicYearSelect';
import BtnAdminTable from '../components/BtnAdminTable';
import allTableHeads from '../js/allTableHeads';


const AdminCombine = () => {
  const [childData, setChildData] = useState({ JrfSrf: null, ResearchProject: null, PhdAwarded: null, ProgressionToHE: null, DemandRatio: null, EContentDeveloped: null, ValueAddedCource: null
  })
  const [values, setValues] = useState({ yearFilter: [] })
  const { yearFilter } = values

  const loadedInitial = { JrfSrf: false, ResearchProject: false, PhdAwarded: false, ProgressionToHE: false, DemandRatio: false, EContentDeveloped: false, ValueAddedCource: false 
  }
  const [loaded, setLoaded] = useState(loadedInitial)

  const loading = !(Object.values(loaded).every((value) => value === true));
  const guideNameAndSchool = {guideName: 'Faculty Name', schoolName: 'Faculty School',}

  const modifyObj =  (obj, elementsToAdd) =>{
    delete obj['userId.name']
    delete obj['userId.department']
    const {index, ...rest} = obj
    return {index, ...elementsToAdd, ...rest}
   }

  const allOtherComponents = [
    {
      element: <BtnAdminTable values={values} model="JrfSrf" setState={setChildData} heading='JRF, SRF & PDF' setLoaded={setLoaded} heads={modifyObj(allTableHeads.JrfSrf,guideNameAndSchool)} proof="proof" serviceName="faculty" customParams={{ model: "JrfSrf", module: "Admin", filter: yearFilter?.length === 0 ? {} : {year: {$in: yearFilter}} }} />,
      childData: childData?.JrfSrf, filename: 'JRF, SRF & PDF.xlsx', SendReq: "JrfSrf", proof: "proof", module: "faculty"
    },
    {
      element: <BtnAdminTable values={values} model="ResearchProject" setState={setChildData} heading='Research Projects' setLoaded={setLoaded} heads={modifyObj(allTableHeads.ResearchProject,guideNameAndSchool)} proof="proof" serviceName="faculty" customParams={{ model: "ResearchProject", module: "Admin", filter: yearFilter?.length === 0 ? {} : {year: {$in: yearFilter}} }} />,
      childData: childData?.ResearchProject, filename: 'Research Projects.xlsx', SendReq: "ResearchProject", proof: "proof", module: "faculty"
    },
    {
      element: <BtnAdminTable values={values} model="PhdAwarded" setState={setChildData} heading='Ph.D. Scholars' setLoaded={setLoaded} heads={modifyObj(allTableHeads.PhdAwarded,{guideName: 'Guide Name', departmentName: 'School',})} proof="proof" serviceName="faculty" customParams={{ model: "PhdAwarded", module: "Admin", filter: yearFilter?.length === 0 ? {} : {year: {$in: yearFilter}} }} />,
      childData: childData?.PhdAwarded, filename: 'Ph.D. Scholars.xlsx', SendReq: "PhdAwarded", proof: "proof", module: "faculty"
    },
    {
      element: <BtnAdminTable values={values} model="EContentDeveloped" setState={setChildData} heading='E-Content Developed' setLoaded={setLoaded} heads={modifyObj(allTableHeads.EContentDeveloped, {})} proof="proof" serviceName="faculty" customParams={{ model: "EContentDeveloped", module: "Admin", filter: yearFilter?.length === 0 ? {} : {year: {$in: yearFilter}} }} />,
      childData: childData?.EContentDeveloped, filename: 'E-Content Developed.xlsx', SendReq: "EContentDeveloped", proof: "proof", module: "faculty"
    },
    {
      element: <BtnAdminTable values={values} model="ProgressionToHE" setState={setChildData} heading='Progression To HE' setLoaded={setLoaded} heads={allTableHeads.ProgressionToHE} proof="Upload_Proof" serviceName="director" customParams={{ model: "ProgressionToHE", module: "Admin", filter: yearFilter?.length === 0 ? {} : {Academic_Year: {$in: yearFilter}} }} />,
      childData: childData?.ProgressionToHE, filename: 'Progression To HE.xlsx', SendReq: "ProgressionToHE", proof: "Upload_Proof", module: "director"
    },
    {
      element: <BtnAdminTable values={values} model="DemandRatio" setState={setChildData} heading='Demand Ratio' setLoaded={setLoaded} heads={allTableHeads.DemandRatio} proof="Upload_Proof" serviceName="director" customParams={{ model: "DemandRatio", module: "Admin", filter: yearFilter?.length === 0 ? {} : {Academic_Year: {$in: yearFilter}} }} />,
      childData: childData?.DemandRatio, filename: 'Demand Ratio.xlsx', SendReq: "DemandRatio", proof: "Upload_Proof", module: "director"
    },
    {
      element: <BtnAdminTable values={values} model="ValueAddedCource" setState={setChildData} heading='Value Added Course' setLoaded={setLoaded} heads={allTableHeads.ValueAddedCource} proof="Upload_Proof" serviceName="director" customParams={{ model: "ValueAddedCource", module: "Admin", filter: yearFilter?.length === 0 ? {} : {Academic_year: {$in: yearFilter}} }} />,
      childData: childData?.ValueAddedCource, filename: 'Value Added Course.xlsx', SendReq: "ValueAddedCource", proof: "Upload_Proof", module: "director"
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
        <button className='col-md-3 col-lg-3 col-12 btn btn-sm btn-success align-middle' style={{ margin: "37px 0px auto 0px" }} onClick={() => { downloadExcelZip(allOtherComponents, 'All Combine Section Excels') }} disabled={loading} >{loading ? <CircularProgress color="inherit" size={18} /> : "Export All Excels"}</button>
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

export default AdminCombine
