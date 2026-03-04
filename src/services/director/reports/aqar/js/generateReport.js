import axios from "axios";
import ExcelJS from 'exceljs';
import excelObject from "../../../../../components/excelObject";
import { toast } from "react-hot-toast";
import { api } from "../../../../../js/api";

const generateReport = (aqarData, selectedYear) => {
  let isFaculty = aqarData.hasOwnProperty("userId")
  let filter = isFaculty ? { userId: aqarData["userId"], year: { $in: selectedYear } } : { SchoolName: aqarData["schoolName"], years: selectedYear }

  axios.post(`${api}${isFaculty ? "/faculty/aqar/excel" : "/director/aqar/excel"}`, { filter }).then(async (res) => {
    let data = res.data.report;
    let sheets = Object.keys(data).filter((model => data[model].length > 0))
    try {
      const names = {
        ResearchPaper: "3.4.5",
        ResearchProject: "Research Project",
        AwardRecognition: "2.4.4",
        Fellowship: "3.1.3",
        JrfSrf: "3.1.4",
        Patent: "3.4.3",
        PhdAwarded: "5.1.2",
        BookAndChapter: "3.4.6",
        EContentDeveloped: "3.4.7",
        ConsultancyServices: "Consultancy Services",
        FinancialSupport: "6.3.2",
        Online: "6.3.4",
        Award: "3.3.3",
        MoUs: "3.7.2",
        CounselingAndGuidance: "5.1.2",
        ProgressionToHE: "5.2.3",
        DemandRatio: "2.1.1",
        ProjectsInternships: "1.3.4",
        Employability: "1.2.1",
        ReservedSeats: "2.1.2",
        TrainingProgramsOrganized: "6.3.3",
        UgcSapCasDstFistDBTICSSR: "3.1.6",
        ResearchMethodologyWorkshops: "1.3.2",
        ExtensionActivities: "3.6.3_and_3.6.4",
        SyllabusRevision: "1.2.2",
        Placement: "5.2.2",
        ValueAddedCource: "1.3.3",
        QualifiedExams: "5.3.1",
        SkillsEnhancementInitiatives: "5.1.3",
        AlumniContribution: "Alumni Contribution",
        CourceInAllProgram: "Courses In All Program",
        NewPrograms: "New Programs"
      }
      const workbook = new ExcelJS.Workbook();

      function addDataToSheet(data, sheet) {
        const columnMapping = excelObject[sheet];
        if (!columnMapping) {
          throw new Error(`Column mapping '${sheet}' not found.`);
        }
        const worksheet = workbook.addWorksheet(names[sheet]);

        const columnNames = Object.values(columnMapping);
        columnNames.unshift('Sr.No.');

        // Set column headers and formatting
        const headerRow = worksheet.addRow(columnNames);
        headerRow.font = { bold: true, size: 12 };

        // Apply formatting to all cells
        worksheet.columns.forEach((column) => {
          column.width = 20;
          column.alignment = { wrapText: true, vertical: 'middle', horizontal: 'center' };
        });

        // Add data rows with auto-incrementing numbers
        data.forEach((rowData, index) => {
          const values = Object.keys(columnMapping).map((columnName) => rowData[columnName]);
          values.unshift(index + 1);
          worksheet.addRow(values);
        });
        let proof = isFaculty ? "proof" : "Upload_Proof"
        if (proof) {
          const lastColumnIndex = Object.keys(columnMapping).length + 2;
          const proofColumnName = "Link Of Proof";

          worksheet.getColumn(lastColumnIndex).header = proofColumnName;

          for (let i = 2; i <= data.length + 1; i++) {
            const proofValue = data[i - 2][proof] == undefined || data[i - 2][proof] == "undefined" ? 'Not Uploaded' : 'View Proof';
            const cell = worksheet.getCell(`${String.fromCharCode(65 + lastColumnIndex - 1)}${i}`);
            if (proofValue === 'View Proof') {
              const proofURL = `${api}/showFile/${data[i - 2][proof]}/${isFaculty ? "faculty" : "director"}`;
              cell.value = { text: proofValue, hyperlink: proofURL };
              cell.font = { color: { argb: 'FF0000FF' }, underline: true };
            } else {
              cell.value = proofValue;
            }
          }

          // Set width and alignment for the last column
          worksheet.getColumn(lastColumnIndex).width = 20;
          worksheet.getColumn(lastColumnIndex).alignment = { wrapText: true, vertical: 'middle', horizontal: 'center' };
        }
        worksheet.getRow(1).font = { bold: true, size: 12 };
        worksheet.getRow(1).height = 30;

        for (let i = 2; i <= data.length; i++) {
          worksheet.getRow(i).commit();
        }
      }

      for (const sheet of sheets) {
        addDataToSheet(data[sheet], sheet)
      }

      // Save the workbook as a file
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.       sheet' });
      const url = URL.createObjectURL(blob);

      // Download the Excel file with the specified fileName
      const link = document.createElement('a');
      link.href = url;
      link.download = isFaculty ? `${aqarData["userId"]} Faculty AQAR Data.xlsx` : `${aqarData["schoolName"]} AQAR data.xlsx`
      link.click();

      console.log('Excel file generated and downloaded successfully.');
      toast.success("Excel generated successfully")
    }
    catch (err) {
      console.error('Error generating Excel file:', err);
      toast.error("Error while generating try again")
    }
  })
}
export default generateReport;