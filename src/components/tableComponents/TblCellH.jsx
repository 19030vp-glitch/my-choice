import React from 'react';
import { TableCell, TableHead, TableRow } from '@mui/material';

export default function TblCellH({ SendReq, TblH }) {
  const reservedSeatsHeader = () => (
    <TableRow sx={{ "& th": { color: "#1a2421", backgroundColor: "#e7f1ff" } }}>
      <TableCell colSpan={3} sx={{ border: "solid 1px #c4d5e1" }} ></TableCell>
      <TableCell colSpan={6} sx={{ fontSize: "12px", fontWeight: "bold", border: "solid 1px #c4d5e1" }}>Number of seats earmarked for reserved category as per GOI or State Government rule</TableCell>
      <TableCell colSpan={6} sx={{ fontSize: "12px", fontWeight: "bold", border: "solid 1px #c4d5e1" }}>Number of students admitted from the reserved category</TableCell>
      <TableCell colSpan={2} sx={{ border: "solid 1px #c4d5e1" }} ></TableCell>
    </TableRow>
  );

  const scholarshipHeader = () => (
    <TableRow sx={{ "& th": { color: "#1a2421", backgroundColor: "#e7f1ff" } }}>
      <TableCell colSpan={3} sx={{ border: "solid 1px #c4d5e1" }} ></TableCell>
      <TableCell colSpan={2} sx={{ fontSize: "12px", fontWeight: "bold", border: "solid 1px #c4d5e1" }}>Number of students benefited by government scheme and amount</TableCell>
      <TableCell colSpan={2} sx={{ fontSize: "12px", fontWeight: "bold", border: "solid 1px #c4d5e1" }}>Number of students benefited by the institution's schemes and amount</TableCell>
      <TableCell colSpan={3} sx={{ fontSize: "12px", fontWeight: "bold", border: "solid 1px #c4d5e1" }}>Number of students benefited by non-government agencies (NGOs) and amount</TableCell>
      <TableCell colSpan={2} sx={{ border: "solid 1px #c4d5e1" }} ></TableCell>
    </TableRow>
  );

  const BorderedHead = ["ReservedSeats", "Scholarship"]

  return (
    <TableHead>
      {SendReq === "ReservedSeats" ? reservedSeatsHeader() : SendReq === "Scholarship" ? scholarshipHeader() : null}
      <TableRow sx={{ "& th": { color: "#1a2421", backgroundColor: "#e7f1ff" } }}>
        {Object.values(TblH).map((e, i) => (
          <TableCell key={`${e}${i}`} sx={{ fontSize: "12px", fontWeight: "bold", border: (BorderedHead.includes(SendReq)) ? "solid 1px #c4d5e1" : "" }}>{e}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}