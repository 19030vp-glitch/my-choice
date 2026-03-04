import React from 'react'
import { api } from '../js/api'
import { useQuery } from 'react-query'
import allTableHeads from '../services/admin/js/allTableHeads'
import ExcelJS from "exceljs";
import Axios from 'axios'

const Test = () => {

  // can be found in faculty/routes
  const fetcher = async () => {
    return Axios.get(`${api}/getExcelData`)
  }

  const { data } = useQuery('Datainexcel', () => fetcher())
  const tableHead = allTableHeads.BookAndChapter

  const download = async (data) => {
    const columnMapping = tableHead;

    if (!columnMapping) {
      throw new Error(`Column mapping '${module}' not found.`);
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet 1");

    const columnNames = Object.values(columnMapping);
    columnNames.unshift("Sr.No.");

    const headerRow = worksheet.addRow(columnNames);
    headerRow.font = { bold: true, size: 12 };

    data.forEach((rowData, index) => {
      const values = Object.keys(columnMapping).map(
        (columnName) => {
          console.log(columnName)
          return columnName === "userId.name" ? rowData?.["userId"]?.["name"] : columnName === "userId.department" ? rowData?.["userId"]?.["department"] : rowData[columnName]

        }
      );
      values.unshift(index + 1);
      worksheet.addRow(values);
    });

    const lastColumnIndex = Object.keys(columnMapping).length + 2;
    const proofColumnName = "Link Of Proof";

    worksheet.getColumn(lastColumnIndex).header = proofColumnName;

    for (let i = 2; i <= data.length + 1; i++) {
      const proofValue =
        data[i - 2]["proof"] === undefined || data[i - 2]["proof"] === "undefined"
          ? "Not Uploaded"
          : "View Proof";
      const cell = worksheet.getCell(
        `${String.fromCharCode(65 + lastColumnIndex - 1)}${i}`
      );
      if (proofValue === "View Proof") {
        const proofURL = `${api}/showFile/${data[i - 2]["proof"]
          }/faculty`;
        cell.value = { text: proofValue, hyperlink: proofURL };
        cell.font = { color: { argb: "FF0000FF" }, underline: true };
      } else {
        cell.value = proofValue;
      }
    }

    worksheet.getColumn(lastColumnIndex).width = 20;
    worksheet.getColumn(lastColumnIndex).alignment = {
      wrapText: true,
      vertical: "middle",
      horizontal: "center",
    };
    worksheet.getRow(1).font = { bold: true, size: 12 };
    worksheet.getRow(1).height = 30;

    for (let i = 2; i <= data.length; i++) {
      worksheet.getRow(i).commit();
    }

    // Save the workbook as a file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);

    // Download the Excel file with the specified fileName
    const link = document.createElement("a");
    link.href = url;
    link.download = 'Book and Chapters';
    link.click();
  }

  return (
    <div>
      <button onClick={() => { download(data?.data) }}>Excel</button>
    </div>
  )
}

export default Test
