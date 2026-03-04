import { TableCell } from '@mui/material';
import React from 'react'
import FileViewer from '../FileViewer';

export default function TblView({val, module}) {
  return (
    <TableCell sx={{ fontSize: "12px" }}><FileViewer fileName={val} serviceName={module}/></TableCell>
  )
}