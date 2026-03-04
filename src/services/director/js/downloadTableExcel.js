
import ExcelJS from "exceljs";
import toast from "react-hot-toast";
import { api } from "../../../js/api";


async function downloadTableExcel(data, tableHeadAll, fileName, proof, proof2, serviceName, model, setLoading) {


    if (!data || data.length === 0) {
        toast.error("No data to download")
        return
    }


    const tableHead = { ...tableHeadAll }
    delete tableHead.index;
    delete tableHead.Action;
    if (proof) { delete tableHead.Proof; }
    if (proof2) { delete tableHead.Proof2; }


    setLoading((prev) => {
        return { ...prev, [model]: true }
    })

    try {

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
                (columnName) => rowData[columnName]
            );
            values.unshift(index + 1);
            worksheet.addRow(values);
        });

        if (proof) {
            const lastColumnIndex = Object.keys(columnMapping).length + 2;
            const proofColumnName = "Link Of Proof";

            worksheet.getColumn(lastColumnIndex).header = proofColumnName;

            for (let i = 2; i <= data.length + 1; i++) {
                const proofValue =
                    data[i - 2][proof] === undefined || data[i - 2][proof] === "undefined"
                        ? "Not Uploaded"
                        : "View Proof";
                const cell = worksheet.getCell(
                    `${String.fromCharCode(65 + lastColumnIndex - 1)}${i}`
                );
                if (proofValue === "View Proof") {
                    const proofURL = `${api}/showFile/${data[i - 2][proof]
                        }/${serviceName ? serviceName : module}`;
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
        }
        if (proof2) {
            const lastColumnIndex = Object.keys(columnMapping).length + 3;
            const proofColumnName = "Link Of Proof2";

            worksheet.getColumn(lastColumnIndex).header = proofColumnName;

            for (let i = 2; i <= data.length + 1; i++) {
                const proofValue =
                    data[i - 2][proof2] === undefined || data[i - 2][proof2] === "undefined"
                        ? "Not Uploaded"
                        : "View Proof";
                const cell = worksheet.getCell(
                    `${String.fromCharCode(65 + lastColumnIndex - 1)}${i}`
                );
                if (proofValue === "View Proof") {
                    const proofURL = `${api}/showFile/${data[i - 2][proof2]
                        }/${serviceName ? serviceName : module}`;
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
        }
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
        link.download = fileName;
        link.click();

        toast.success("Excel generated successfully");
    } catch (error) {
        console.error("Error generating Excel file:", error);
        toast.error("Error while generating try again");
    } finally {
        setLoading((prev) => {
            return { ...prev, [model]: false }
        })
    }
}


export default downloadTableExcel