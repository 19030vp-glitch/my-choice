import { TableCell } from '@mui/material'
import React from 'react'

export default function TblCell(Props) {
  return (
    <TableCell sx={{ fontSize: "13px", ...Props.sx }}>
      {Props.val}
    </TableCell>
  )
}
