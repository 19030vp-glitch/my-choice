const express = require('express');
const excel = require('exceljs');
const { multerConfig } = require('../../utility/multerConfig');
const router = express.Router();
const models = { ...require('../director-routes/director-routes').models, ...require('../faculty-routes/routes').models, ...require('../swayam-routes/swayam-routes').models, ...require('../admin-routes/admin-routes').AdminModels, ...require('../exam-routes/exam-routes').models, ...require('../dsd-routes/dsd-routes').models, ...require('../estt-routes/estt-routes').models }
const path = require('path')


const excelUpload = multerConfig(`../../excels/`)

function swapKeyAndValue(obj) {
    const result = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            result[obj[key]] = key;
        }
    }
    return result;
}


router.post('/bulktableentry/Excel', (req, res) => {
    const { commonFilds, model, tableData } = req.body
    try {
        // console.log(models)
        tableData.forEach(async (e) => {
            const singleItem = new models[model]({ ...e, ...commonFilds });
            await singleItem.save();
        })
        res.status(201).send("Bulk Entry Suceeed")
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
})


router.post('/excel/parseExcelData', excelUpload.single('excelFile'), async (req, res) => {
    const excelFile = req.file.filename;
    const { tableHead } = JSON.parse(JSON.stringify(req.body));


    try {
        const workbook = new excel.Workbook();
        await workbook.xlsx.readFile(path.join(__dirname, `../../../excels/${excelFile}`));
        const worksheet = workbook.getWorksheet(1); // Assuming the data is in the first worksheet

        let data = [];
        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber > 1) {
                let hasNonEmptyValue = false; // Flag to check if any cell in the row has a non-empty value
                row.eachCell((cell, colNumber) => {
                    if (cell.value !== '') {
                        hasNonEmptyValue = true;
                        return false; // Exit the cell loop early if a non-empty value is found
                    }
                });
        
                if (hasNonEmptyValue) {
                    const rowData = {};
                    row.eachCell((cell, colNumber) => {
                        const header = worksheet.getRow(1).getCell(colNumber).value;
                        rowData[header] = cell.value;
                    });
        
                    data.push(rowData);
                }
            }
        });
        

        const swappedTableHeads = swapKeyAndValue(JSON.parse(tableHead));
        let tableData = []
        data.forEach((item) => {

            const obj = {}
            Object.keys(swappedTableHeads).forEach((key) => {
                obj[swappedTableHeads[key]] = item[key]
            })

            tableData.push(obj)


        })

        // console.log('Table Data :', tableData)




        res.status(201).send(tableData);
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
})




module.exports = router