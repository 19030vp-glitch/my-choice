import React, { useState, useEffect } from 'react'
import FileViewer from '../../../components/FileViewer';
import sortByAcademicYear from '../../../js/sortByAcademicYear'
import EmptyBox from '../../../components/EmptyBox'
import Loader from '../../../components/Loader'
import siteLinks from '../../../components/siteLinks';
import { api } from '../../../js/api';


const AdminTable = ({ tableHead, data, year, proof, proof2, serviceName, isLoading, headColor = '#ae7e28', SendReq, tableHeight = "100%", forPDF = false, link = null, }) => {

  const [tblCells, setTblCells] = useState();

  useEffect(() => {
    let tblCells = [];
    const cellsrm = ["index", "Upload_Proof", "Proof", "Proof2", "proof", link, "Action"]
    Object.keys(tableHead).forEach((e) => {
      tblCells.push(e)
    })
    cellsrm.forEach((e) => {
      var index = tblCells.indexOf(e);
      if (index !== -1) {
        tblCells.splice(index, 1);
      }
    })

    setTblCells(tblCells)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableHead && tableHead])



  return (
    <>
      <div className='table-responsive' style={{ maxHeight: tableHeight }}>
        <table className={`table table-bordered ${forPDF && 'table-sm text-sm'}`} >
          <thead className="sticky-top" style={{ background: `${window.location.pathname === siteLinks.fdc.link ? '#28359b' : headColor}`, color: '#FFF' }}>
            {
              SendReq === "ReservedSeats" && <tr>
                <th colSpan={tableHead.hasOwnProperty("SchoolName") ? 4 : 3}></th>
                <th colSpan={6}>Number of seats earmarked for reserved category as per GOI or State Government rule</th>
                <th colSpan={6}>Number of students admitted from the reserved category</th>
                <th colSpan={1}></th>
              </tr>
            }
            <tr>
              {
                Object.values(tableHead)?.map((item) => {
                  return <th key={item}>{item}</th>
                })
              }

            </tr>

          </thead>
          <tbody>
            {data && sortByAcademicYear(data, year).map((row, index) => {
              if (row[link] !== undefined && SendReq === "ResearchPaper") {
                var linkObj = row[link] ? row[link]?.split(', ')?.reduce((acc, entry) => (parts => (acc[parts[0]?.trim()] = parts[1]?.trim(), acc))(entry.split(': ')), {})
                  : {}
              }
              return <tr key={index}>
                <td>{index + 1}</td>
                {
                  tblCells?.map(key => <td key={key}>{key === "userId.name" ? row.userId?.name : key === "userId.department" ? row.userId?.department : key === "userId.username" ? row.userId?.username : row[key]}</td>)

                }
                {Object.keys(tableHead).includes(link) && (<td>{
                  linkObj ?
                    Object.keys(linkObj).map((e, i) => {
                      return <><a key={`${e} ${i}`} href={linkObj[e]} target="_blank" style={{ color: "blue", cursor: "pointer" }} rel="noreferrer">{e}</a><br /><br /></>
                    }) : row[link] === "N/A" ? row[link] : <a href={row[link]} target="_blank" style={{ color: "blue", cursor: "pointer" }} rel="noreferrer">Click Me</a>}
                </td>
                )}
                {
                  proof ? forPDF ? <td>{row[proof] ? <a href={`${api}/showFile/${row[proof]}/${serviceName}`} target="_blank" style={{ color: "blue" }} rel="noreferrer">View File</a> : "No Proof"}</td> :
                    <td><FileViewer fileName={row[proof]} serviceName={serviceName} /></td> : ""
                }
                {
                  proof2 ? forPDF ? <td>{row[proof2] ? <a href={`${api}/showFile/${row[proof2]}/${serviceName}`} target="_blank" style={{ color: "blue" }} rel="noreferrer">View File</a> : "No Proof"}</td> :
                    <td><FileViewer fileName={row[proof2]} serviceName={serviceName} /></td> : ""
                }
              </tr>
            }
            )}
          </tbody>
        </table>
        {isLoading && <Loader />}
        {(!isLoading && data?.length === 0) && <EmptyBox />}
      </div>
    </>
  )
}

export default AdminTable