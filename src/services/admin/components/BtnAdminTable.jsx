import React, { useEffect, useRef, useState } from 'react'
import AdminTable from './AdminTable'
import { useQuery } from 'react-query'
import getReq from '../../../components/requestComponents/getReq'
import { updatedTableHead as tableHead } from './AdminMasterTable'
import ClearIcon from '@mui/icons-material/Clear';
import TextSnippetRoundedIcon from '@mui/icons-material/TextSnippetRounded';
import PictureAsPdfRoundedIcon from '@mui/icons-material/PictureAsPdfRounded';
import { styled } from '@mui/system';
import { Dialog, DialogTitle, DialogContent, Button, IconButton, Tooltip, CircularProgress } from '@mui/material';
import downloadTablePDF from '../../director/js/downloadTablePDF'
import AdminPublicationCitation from '../tables/AdminPublicationCitation'
import AdminStudentInformation from '../tables/AdminStudentInformation'
import { downloadExcel } from '../../director/components/UtilityComponents/ActionExcelButton'
import sortByAcademicYear from '../../../js/sortByAcademicYear'

const IBtn = styled(IconButton)({
  padding: "3px"
});

const BtnAdminTable = ({ module = "Admin", proof = null, proof2, color = "#ae7e28", model, academicYear, heading, school, serviceName, customParams, setState, setLoaded, values, heads, yearField, link = null }) => {
  const updatedTableHead = { ...tableHead }
  const [open, setOpen] = useState(false);
  const [displayTable, setDisplayTable] = useState("block");
  const [pdfLoading, setPdfLoading] = useState({})
  const tableRef = useRef(null);

  const params = customParams ? customParams : yearField ?

    { model, module, filter: (academicYear.length === 0 && school === 'All Schools') ? null : (academicYear.length !== 0 && school === 'All Schools') ? { [yearField]: { $in: academicYear } } : (academicYear.length === 0 && school !== 'All Schools') ? { SchoolName: school } : { [yearField]: { $in: academicYear }, SchoolName: school } } :
    {
      model, module, filter: (values.yearFilter.length > 0 ? { year: { $in: values.yearFilter } } : {}),
      filterConditios: (values.schoolName !== "All Schools" ? { department: values.schoolName } : {})
    }


  const { data, isLoading, refetch } = useQuery(`${model}-${JSON.stringify(params)}`, () => getReq(params), { refetchOnWindowFocus: false })

  let filterTableHead = heads ? heads : { ...updatedTableHead[model] }
  if (filterTableHead.hasOwnProperty("Action")) {
    delete filterTableHead.Action
  }


  const sortedData = sortByAcademicYear(data?.data, yearField, null, academicYear, null)

  useEffect(() => {

    if (data) {
      setState((pri) => {
        return {
          ...pri,
          [model]: data?.data
        }
      })
      if (!isLoading) {
        setLoaded((pre) => { return { ...pre, [model]: true } });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  useEffect(() => {
    if (values) {
      refetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values])

  const downloadTable = async () => {
    const { module } = params
    await downloadTablePDF(heading, params, serviceName || module, proof, proof2, setPdfLoading)
  }


  return (
    <div className='h-full w-full'>
      <div style={{ border: `solid 2px #997024`, borderRadius: "6px", display: "flex" }}>
        <Button className='adminBtn normalBtn' sx={{ background: '#f3e9d5' }} size="small" onClick={() => { setOpen(true) }} >
          <div>{heading}<span className='px-2' style={{ border: '1px solid', borderRadius: '4px', margin: '0 5px', color: '#ae7e28', fontWeight: '700' }}>{data?.data?.length}</span></div>
        </Button>
        <ExcelPdfButtons tableRef={tableRef} setOpen={setOpen} setDisplayTable={setDisplayTable} tableHead={filterTableHead} data={data?.data} sortedData={sortedData} title={heading} SendReq={model} module={module} proof={proof} proof2={proof2} isLoading={isLoading} serviceName={serviceName} pdfLoading={pdfLoading} downloadTable={downloadTable} model={model} />
      </div>
      <Dialog sx={{ display: displayTable }} fullScreen open={open} onClose={() => { setOpen(false) }}>
        <DialogTitle className='flex gap-4 items-center'>
          <IconButton onClick={() => { setOpen(false) }}>
            <ClearIcon />
          </IconButton>
          {heading}
          <div className='flex w-full justify-end overflow-hidden'>
            <p className='px-3 py-2 mx-2 text-[#ae7e28]' style={{ border: "1px solid", borderRadius: "7px" }}>{data?.data?.length}</p>
            <div className='flex items-center' style={{ border: "solid 1px #ae7e28", borderRadius: "3px", paddingInline: "5px" }}>
              <p style={{ fontSize: "15px" }} className='px-3 text-[#2f9163]'>Download Excel & PDF</p>
              <ExcelPdfButtons tableRef={tableRef} tableHead={filterTableHead} pdfLoading={pdfLoading} data={data?.data} sortedData={sortedData} title={heading} SendReq={model} module={module} proof={proof} proof2={proof2} serviceName={serviceName} downloadTable={downloadTable} model={model} />
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <div ref={tableRef} >
            {
              model === "PublicationCitation" ? <AdminPublicationCitation data={data?.data} year={yearField} isLoading={isLoading} tableHead={filterTableHead} headColor={color} tableHeight='90vh' /> :
                model === "StudentInformation" ? <AdminStudentInformation data={data?.data} year={yearField} isLoading={isLoading} tableHead={filterTableHead} headColor={color} tableHeight='90vh' /> :
                  <AdminTable data={data?.data} tableHead={filterTableHead} proof={proof} proof2={proof2} serviceName={serviceName} SendReq={model} isLoading={isLoading} headColor={color} tableHeight='90vh' link={link} year={yearField} />
            }
          </div>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default BtnAdminTable

const ExcelPdfButtons = ({ tableRef, tableHead, serviceName, model, sortedData, proof, proof2, year, title, isLoading, downloadTable, pdfLoading, setOpen, setDisplayTable }) => {

  const [singleLoading, setSingleLoading] = useState(false);
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", backgroundColor: "#f3e9d5", borderRadius: "5px" }} >
      <Tooltip title="Download Excel">
        <IBtn onClick={() => {
          if (setOpen) {
            setDisplayTable("none"); setOpen(true); setSingleLoading(true);
            setTimeout(() => {
              downloadExcel({ tableRef, tableHead, serviceName, model, sortedData, proof, proof2, year, title })
              setOpen(false); setDisplayTable("block"); setSingleLoading(false);
            }, 4000)
          } else {
            downloadExcel({ tableRef, tableHead, serviceName, model, sortedData, proof, proof2, year, title })
          }
        }} disabled={isLoading}>{
            isLoading || singleLoading ? <CircularProgress size={17} /> : <TextSnippetRoundedIcon sx={{ color: 'green' }} />
          }
        </IBtn>
      </Tooltip>
      <Tooltip title="Download PDF">
        <IBtn onClick={downloadTable} disabled={pdfLoading?.[model]}>{
          pdfLoading?.[model] ? <CircularProgress size={17} /> : <PictureAsPdfRoundedIcon sx={{ color: 'red' }} />
        }
        </IBtn>
      </Tooltip>
    </div>
  )
}