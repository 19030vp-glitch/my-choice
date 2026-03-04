import React, { useState } from 'react'
import AdminExcelExport from './AdminExcelExport'
import AdminTable from './AdminTable'
import ClearIcon from '@mui/icons-material/Clear';
import { Dialog, DialogTitle, DialogContent, Button, IconButton } from '@mui/material';
import siteLinks from '../../../components/siteLinks';


const AdminAcordinTable = ({ children, Heading, data, SendReq, proof, tableHead, year, module, isLoading }) => {
  let directorLocation = window.location.pathname === siteLinks.fdc.link ? true : false
  let textClass = directorLocation ? "directorBtn" : "adminBtn";
  const [open, setOpen] = useState(false);
  return (
    <div className='h-full w-full'>
      <div style={{ border: `solid 2px ${directorLocation ? '#28359b' : '#997024'}`, borderRadius: "6px", display: "flex" }}>
        <Button className={`${textClass} normalBtn`} sx={{ background: directorLocation ? '#28359b' : '#f3e9d5' }} size="small" onClick={() => { setOpen(true) }} >
          <div>{Heading}<span className='px-2' style={{ border: '1px solid', borderRadius: '4px', margin: '0 5px', color: `${directorLocation ? '#fff' : '#ae7e28'}`, fontWeight: '700' }}>{data?.length}</span></div>
        </Button>
        <AdminExcelExport data={data} fileTitle={Heading} SendReq={SendReq} module={module} proof={proof} isLoading={isLoading} />
      </div>
      <Dialog fullScreen open={open} onClose={() => { setOpen(false) }}>
        <DialogTitle className='flex gap-4 items-center'>
          <IconButton onClick={() => { setOpen(false) }}>
            <ClearIcon />
          </IconButton>
          {Heading}
          <div className='flex w-full justify-end'>
            <p className='px-2 mx-2 text-[#ae7e28]' style={{ border: "1px solid", borderRadius: "5px" }}>{data?.length}</p>
            <div className='flex items-center' style={{ border: "solid 1px #ae7e28", borderRadius: "3px" }}>
              <p style={{ fontSize: "15px" }} className='px-3 text-[#2f9163]'>Download Excel</p>
              <AdminExcelExport data={data} fileTitle={Heading} SendReq={SendReq} module={module} proof={proof} />
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          {children ? children : <AdminTable data={data} tableHead={tableHead} year={year} proof={proof} serviceName={module} Heading={Heading} SendReq={SendReq} isLoading={isLoading} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AdminAcordinTable