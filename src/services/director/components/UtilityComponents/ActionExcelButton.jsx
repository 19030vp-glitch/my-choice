import React, { useRef } from 'react'
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import AdminTable from '../../../admin/components/AdminTable';
import ExcelJS from "exceljs";
import toast from 'react-hot-toast';
import { api } from '../../../../js/api';
import sortByAcademicYear from '../../../../js/sortByAcademicYear';
import AdminPublicationCitation from '../../../admin/tables/AdminPublicationCitation';
import AdminStudentInformation from '../../../admin/tables/AdminStudentInformation';

const ActionExcelButton = ({tableHead, serviceName, data, proof, proof2, year, filterByAcademicYear, academicYear, isMultiYear, title, model, link}) => {
    const tableRef = useRef(null);
    const newTableHead = {...tableHead}
    if(newTableHead.hasOwnProperty('Action')){
        delete newTableHead.Action
    }
    const sortedData = sortByAcademicYear(data, year, filterByAcademicYear, academicYear, isMultiYear)

    const tableSelecter = {
      PublicationCitation: <AdminPublicationCitation tableHead={newTableHead} data={data} year={year} />,
      StudentInformation: <AdminStudentInformation tableHead={newTableHead} data={data} year={year} />,
      allTables: <AdminTable tableHead={newTableHead} serviceName={serviceName} data={data} proof={proof} proof2={proof2} year={year} SendReq={model} link={link} />
    }
  return (
    <><li onClick={()=>{downloadExcel({tableRef, tableHead: newTableHead, serviceName, model, sortedData, proof, proof2, year, title})}} ><span className="dropdown-item inline-flex gap-3 text-green-800"><FileDownloadRoundedIcon size="large" /> Download Table Excel </span></li><div ref={tableRef} style={{display: "none"}} >
      {
        tableSelecter.hasOwnProperty(model)? tableSelecter?.[model] : tableSelecter?.allTables
      }
      </div></>
  )
}

const downloadExcel = async ({ tableRef, tableHead, serviceName, model, sortedData, proof, proof2, year, title }) => {
  try{
    const containerNode = tableRef.current;
    const tableElement = containerNode.querySelector('table');
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet 1");
    let rowCount = 0;
    let colCount = 0;
    const thead = tableElement.querySelector('thead');
    const htrs = thead.querySelectorAll('tr');
    const htrsLength = htrs.length
   
    const rowSetter = (trs, datatrs = false) => {
      trs.forEach((tr, rowIndex) => {
        let colSpanIndex = 1 
        ++rowCount
        const obj = {}
       if(proof&&datatrs){
          obj[`${tableHead.Proof}`] = proof
       }
       if(proof2&&datatrs){
        obj[`${tableHead.Proof2}`] = proof2
       }

        const innerTags = tr.querySelectorAll('th, td');
    
        innerTags.forEach((tag,i) => {
          const content = tag.textContent;
          const allSideBorder = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
          };
          const cell = worksheet.getCell(`${String.fromCharCode(65 + i)}${rowCount}`)
          if (tag.tagName.toLowerCase() === 'th') {
            const thfont = {bold: true, size: 12}
            if( !datatrs && trs.length > 1 && rowIndex===0){
              const colSpan = tag.colSpan;
              worksheet.mergeCells(rowCount, colSpanIndex, rowCount, colSpanIndex + colSpan-1);
              const colSpanCell = worksheet.getCell(`${String.fromCharCode(65 + colSpanIndex)}${rowCount}`)
              colSpanCell.value = content
              colSpanCell.font = thfont
              colSpanCell.border = allSideBorder
              colSpanIndex+=colSpan
            }
            else{
              cell.font = thfont
              cell.value = content
              cell.border = allSideBorder
            }
          } 
          else if (tag.tagName.toLowerCase() === 'td') {
            if (tag.children.length > 0) {
                const divInTag = tag.children[0];
            if(divInTag.tagName.toLowerCase()==="div"){
              if(divInTag.children[0].tagName.toLowerCase()==="button"){
                const header = worksheet.getCell(`${String.fromCharCode(65 + i)}${htrsLength}`);
                let index = rowCount-(htrsLength+1)
                if(index+1 <= sortedData?.length){
                const dbproof = sortedData[index][obj[header.value]]
                  const text = [undefined, "undefined"].includes(dbproof)? "Not Uploaded" : "View Proof"
                  if (text === "View Proof") {
                    const proofURL = `${api}/showFile/${dbproof}/${serviceName}`;
                    cell.value = { text: text, hyperlink: proofURL };
                    cell.font = { color: { argb: "FF0000FF" }, underline: true };
                  } else {
                    cell.value = text;
                  }
                }
                else{
                  cell.value = "Not Uploaded";
                }
                }
            }
            if(divInTag.tagName.toLowerCase()==="a"){
              const aTags = tag.querySelectorAll('a');
              if(aTags.length > 1){
                let text = ""
                aTags.forEach((aTag,i) => {
                  const cellValue = `${aTag.innerText}:\t ${aTag.getAttribute('href')} \n\n`
                  text += cellValue
                })
                cell.value = text
              }
              else{
                cell.value = aTags[0].getAttribute('href')?{text: aTags[0].innerText, hyperlink: aTags[0].getAttribute('href')}: "N.A.";
                if(aTags[0].getAttribute('href')){
                  cell.font = { color: { argb: "FF0000FF" }, underline: true };
                }
              }
            }
            
          }
          else if (model==="PublicationCitation"|| model === "StudentInformation"){
            let rowSpanCell = null;
            if(tag.rowSpan>1&&(rowCount === 2 || (rowCount - 2) % (model==="PublicationCitation"?4: 13) === 0)){
              let rowSpan = tag.rowSpan
              worksheet.mergeCells(rowCount, i+1, rowCount + rowSpan-1, i+1);
              rowSpanCell = worksheet.getCell(`${String.fromCharCode(65 + i)}${rowCount}`)
              if(rowCount === 2){
                colCount++
              }
            }
            else {
              let cellCount = (rowCount === 2 || (rowCount - 2) % (model==="PublicationCitation"?4: 13)  === 0) ? 0 : colCount
              rowSpanCell = worksheet.getCell(`${String.fromCharCode(65 + cellCount + i)}${rowCount}`)
            }
            rowSpanCell.value = content
            rowSpanCell.font = { size: 12 }
            rowSpanCell.border = allSideBorder
            
          }
          else{
            cell.value = content
          }
          cell.border = allSideBorder
          }
        });
      });
    }
    await rowSetter(htrs)
    const tbody = tableElement.querySelector('tbody')
    const btrs = tbody.querySelectorAll('tr')
    rowSetter(btrs, true)
    Object.keys(tableHead).forEach((key, i) => {
      const width = {
        index : 7, [year] : 10, Proof: 15, Proof2 : 15, NseSC : 7, NseST : 7, NseOBC : 15, NseDivyngjan : 15, NseGeneral : 10, NseOthers : 10, NsaSC : 7, NsaST : 7, NsaOBC : 15, NsaDivyngjan : 15, NsaGeneral : 10, NsaOthers : 10, xyz : 20
      }
      worksheet.getColumn(i+1).width = width.hasOwnProperty(key) ? width[key] : width.xyz;
        worksheet.getColumn(i+1).alignment = {
            wrapText: true,
            vertical: "middle",
            horizontal: "center",
        };
  });
const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);

    // Download the Excel file with the specified fileName
    const link = document.createElement("a");
    link.href = url;
    link.download = title;
    link.click();

    toast.success("Excel generated successfully");
} catch (error) {
    console.error("Error generating Excel file:", error);
    toast.error("Error while generating try again");
} 
}

export default ActionExcelButton

export { downloadExcel }
