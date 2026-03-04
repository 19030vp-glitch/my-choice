import React from 'react';
import ExcelJS from 'exceljs';
import SchoolsProgram from '../../components/SchoolsProgram';

function Excelmaker() {

let headings = { index: "Sr. no.", SchoolName: "School Name", Title_of_the_innovation: "Title of the innovation", Name_of_the_Award: "Name of the Award", Year_of_Award: "Year of Award", Name_of_the_Awarding_Agency: "Name of the Awarding Agency", Contact_details_Agency: "Contact details Agency", Category: "Category", Upload_Proof: "Proof", Action: "Action" }

delete headings.index
delete headings.Action

let obj = {
  SchoolName: Object.keys(SchoolsProgram), Title_of_the_innovation: "test", Name_of_the_Award: "text", Year_of_Award: ["2020-21", "2021-22", "2022-23", "2023-24"], Name_of_the_Awarding_Agency: "text", Contact_details_Agency: "text", Category: ["abc", "xyz", "qas"],
}

    
    const generateExcelSampleFile = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sheet1');
        const school = Object.keys(SchoolsProgram)
        const schoolNameReplace = Object.keys(SchoolsProgram).map((e)=>e.replace(/[^a-zA-Z0-9_]/g, "_"));
        const columns = [ 'AB', 'AC', 'AD', 'AE', 'AF', 'AG', 'AH', 'AI', 'AJ', 'AK', 'AL', 'AM', 'AN', 'AO', 'AP', 'AQ', 'AR', 'AS' ]
        const columns2 = [ 'BB', 'BC', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BK', 'BL', 'BM', 'BN', 'BO', 'BP', 'BQ', 'BR', 'BS' ]


        worksheet.getColumn('AA').values = school

     
        let count = 0
        Object.keys(headings).forEach((heading, i) => {
          let objHead = obj[heading]
          if(Array.isArray(objHead)){
            count++
            worksheet.getColumn(columns2[count]).values = objHead
            const rangeStart = `$${columns2[count]}$1`;
            const rangeEnd = `$${columns2[count]}$${objHead.length}`;
            workbook.definedNames.add(`Sheet1!${rangeStart}:${rangeEnd}`, heading);
          }
        });


        for (let rowIndex = 0; rowIndex <= 100; rowIndex++) {
          Object.keys(headings).forEach((heading, colIndex) => {
              // const validationRule = headings[heading];
              const cell = worksheet.getCell(rowIndex + 2, colIndex + 1);
              cell.value = "";
  
              if(Array.isArray(obj[heading])){
                cell.dataValidation = {
                  type: 'list',
                  formulae: [heading], 
                  showDropDown: true,
                }
              }
  
          });
  
      };

        schoolNameReplace.forEach((element, i) => {
          const e = SchoolsProgram[school[i]]?.map(item => item[0])
          worksheet.getColumn(columns[i]).values = e
          const rangeStart = `$${columns[i]}$1`;
          const rangeEnd = `$${columns[i]}$${e.length}`;
          workbook.definedNames.add(`Sheet1!${rangeStart}:${rangeEnd}`, element);
        });

        const cellWithDropdown = worksheet.getCell('A1');
        cellWithDropdown.dataValidation = {
          type: 'list',
          formulae: [`=$AA$1:$AA$16`],  // Reference the named range
          showDropDown: true,
          showErrorMessage: true,
          errorTitle: 'Invalid value',
          error: 'Please select a value from the list',
        };
        const cellWithDynamicValues = worksheet.getCell('B1');
        cellWithDynamicValues.dataValidation = {
          type: 'list',
          formulae: [`=INDIRECT(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE($A$1, " ", "_"), "(", "_"), ")", "_"), ",", "_"))`],  // Reference the named range
          showDropDown: true,
        };
    
        // Generate the Excel workbook
        const buffer = await workbook.xlsx.writeBuffer();
    
        // Create a Blob from the buffer
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    
        // Create a download link and trigger a click event to download the file
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'example_with_dropdown.xlsx';
        link.click();
      };
    
      return (
        <div>
          <button onClick={generateExcelSampleFile} className='btn btn-success'>Generate Excel with Dropdown</button>
        </div>
      );
}

export default Excelmaker;


//<BulkTableEntry tableHead={tableHead} typeObject={typeObject} tableData={tableData} setTableData={setTableData} model={SendReq} />