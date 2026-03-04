import React, { useEffect, useState } from "react";
import { Avatar, Grid, Paper, Table, TableBody, TableContainer, TableRow, Pagination } from '@mui/material';
import TblCellH from "./TblCellH";
import TblCell from "./TblCell";
import TblView from "./TblView";
import TblEditDelete from "./TblEditDelete";
import EmptyBox from "../EmptyBox";
import sortByAcademicYear from "../../js/sortByAcademicYear";
import { api } from "../../js/api";
import UserLoading from "../../pages/UserLoading";

function TableComponent({ title, tableHead, SendReq, TB, year = "year", filterByAcademicYear, academicYear, propic, proof, module, getproof, getproof2, fatchdata, setItemToEdit, editIcon, deleteDisabled, EditDisabled, CheckBox, checkedData, setCheckedData, customDelete, isLoading, proofFolder = {}, link = null, isMultiYear = false }) {

  const [tblCells, setTblCells] = useState();

  const [page, setPage] = useState(1)
  const limit = 20


  const dataLength = TB?.length;
  const totalPageCount = Math.ceil(dataLength / limit)


  useEffect(() => {
    let tblCells = [];
    const cellsToRemove = ["index", "propic", link, "Upload_Proof", "Proof", "Proof2", "Action"];

    Object.keys(tableHead).forEach((e) => {
      tblCells.push(e);
    });

    cellsToRemove.forEach((e) => {
      var index = tblCells.indexOf(e);
      if (index !== -1) {
        tblCells.splice(index, 1);
      }
    });

    setTblCells(tblCells);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableHead]);

  const handlePageChange = (e, p) => {
    setPage(() => p)
  }

  const tableKeys = Object.keys(tableHead);

  return (
    <>
      <Grid container my={2}>
        <div className="my-2 flex items-center justify-end w-full">
          <Pagination className="inline" page={page} count={totalPageCount} color="primary" onChange={handlePageChange} />
        </div>
        <TableContainer component={Paper} sx={{ maxHeight: '80vh' }}>
          <Table area-label='simple tabel' stickyHeader>
            <TblCellH TblH={tableHead} SendReq={SendReq} />
            <TableBody>
              {TB && sortByAcademicYear(TB, year, filterByAcademicYear, academicYear, isMultiYear).map((row, index) => {
                if (row[link] !== undefined && SendReq === "ResearchPaper") {
                  // eslint-disable-next-line no-sequences
                  var linkObj = row[link] ? row[link]?.split(', ')?.reduce((acc, entry) => (parts => (acc[parts[0]?.trim()] = parts[1]?.trim(), acc))(entry.split(': ')), {})
                    : {}
                }
                return index + 1 >= (((page - 1) * limit) + 1) && index + 1 <= (page * limit) ? <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TblCell val={index + 1} />
                  {tableKeys.includes("propic") ? <TblCell val={<Avatar src={`${api}/showFile/${row[propic]}/${proof ? proof : module}`} />} /> : ""}
                  {tblCells?.map((key) => (
                    <TblCell key={key} val={row[key]} />
                  ))}
                  {tableKeys.includes(link) && (<TblCell sx={{ maxWidth: '300px', overflow: 'hidden' }} val={linkObj ?
                    Object.keys(linkObj).map((e, i) => {
                      return <><a key={`${e} ${i}`} href={linkObj[e]} target="_blank" style={{ color: "blue", cursor: "pointer" }} rel="noreferrer">{e}</a><br /><br /></>
                    }) : <a href={row[link]} class="max-w-20 overflow-hidden" target="_blank" style={{ color: "blue", cursor: "pointer" }} rel="noreferrer">{row[link]}</a>} />
                  )}
                  {(tableKeys.includes("Upload_Proof") || tableKeys.includes("Proof")) && (
                    <TblView val={getproof ? row[getproof] : row.Upload_Proof} module={proof ? proof : module} />
                  )}
                  {tableKeys.includes("Proof2") && (
                    <TblView val={row[getproof2]} module={proof ? proof : module} />
                  )}

                  <TblEditDelete val={row._id} loc={SendReq} fatchdata={fatchdata} setItemToEdit={setItemToEdit} module={module} editIcon={editIcon} deleteDisabled={deleteDisabled} EditDisabled={EditDisabled} CheckBox={CheckBox} checkedData={checkedData} setCheckedData={setCheckedData} customDelete={customDelete} proofFolder={proofFolder} />
                </TableRow> : null
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="my-2 flex items-center justify-end w-full">
          <Pagination className="inline" page={page} count={totalPageCount} color="primary" onChange={handlePageChange} />
        </div>

      </Grid>
      {isLoading && <UserLoading title={`Fetching ${title || 'Table'} Contents...`} />}
      {(!isLoading && TB?.length === 0) && <EmptyBox />}
    </>
  );
}

export default TableComponent;