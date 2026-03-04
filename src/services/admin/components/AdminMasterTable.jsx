import React, { useState } from 'react'
import AdminTable from './AdminTable'
import { useQuery } from 'react-query'
import getReq from '../../../components/requestComponents/getReq'
import AdminExcelExport from './AdminExcelExport'

//Extra tableHeads
import { tableHead as JrfSrfAdmin } from '../../admin/tables/AdminJRFSRF'
import { tableHead as ResearchProjectsAdmin } from '../../admin/tables/AdminResearchProjects'
import { tableHead as PhdAwardedAdmin } from '../../admin/tables/AdminPhdAwarded'
import allTableHeads from '../js/allTableHeads'
import downloadTablePDF from '../../director/js/downloadTablePDF'
import AdminPublicationCitation from '../tables/AdminPublicationCitation'
import AdminStudentInformation from '../tables/AdminStudentInformation'

const updatedTableHead = { ...allTableHeads, JrfSrfAdmin, ResearchProjectsAdmin, PhdAwardedAdmin }

const AdminMasterTable = ({ module = "Admin", proof = null, proof2 = null, color = "#3d3dff", model, academicYear, heading, school, serviceName, customParams, forPDF = false }) => {


  const params = customParams || {
    model, module, filter: academicYear && { year: { $in: academicYear } },
    filterConditios: school && { department: school }
  }
  const [pdfLoading, setPdfLoading] = useState(false)
  const { data, isLoading } = useQuery(`${model}-${module}-${heading}-${school}-${academicYear}`, () => getReq(params))

  let filterTableHead = { ...updatedTableHead[model] }
  const link = (model === "ResearchPaper" ? "indexLink" : model === "EContentDeveloped" ? "link" : null)
  if (filterTableHead.hasOwnProperty("Action")) {
    delete filterTableHead.Action
  }
  if (module === "faculty") {
    delete filterTableHead['userId.department']
    delete filterTableHead['userId.name']
  }
  if (module === "director") {
    delete filterTableHead.SchoolName
  }


  const downloadTable = async () => {
    const { module } = params
    await downloadTablePDF(heading, params, serviceName || module, proof, setPdfLoading)
  }

  return (
    <div>
      <div className='mr-4 my-3'>
        <div className='flex w-full justify-end'>
          <p className={'px-2 mx-2'} style={{ border: `1px solid ${color}`, color: `${color}`, borderRadius: "5px" }}>{data?.data.length}</p>
          {!forPDF && <div className='flex items-center' style={{ border: `solid 1px ${color}`, borderRadius: "3px" }}>
            <p style={{ fontSize: "15px" }} className='px-3 text-[#2f9163]'>Download Excel & PDF</p>
            <AdminExcelExport pdfLoading={pdfLoading} downloadTable={downloadTable} data={data?.data} fileTitle={heading} SendReq={model} module={module} proof={proof} proof2={proof2} serviceName={serviceName || module} />
          </div>}
        </div>
      </div>
      {
        model === "PublicationCitation" ? <AdminPublicationCitation data={data?.data} year={"year"} isLoading={isLoading} tableHead={filterTableHead} headColor={color} tableHeight='90vh' /> :
          model === "StudentInformation" ? <AdminStudentInformation data={data?.data} year={"year"} isLoading={isLoading} tableHead={filterTableHead} headColor={color} tableHeight='90vh' /> :
            <AdminTable data={data?.data} tableHead={filterTableHead} proof={proof} proof2={proof2} serviceName={serviceName} Heading={heading} SendReq={model} isLoading={isLoading} headColor={color} forPDF={forPDF} tableHeight={!forPDF ? '90vh' : null} link={link} />
      }
    </div>
  )
}

export default AdminMasterTable
export { updatedTableHead }
