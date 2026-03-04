const fs = require('fs')
const path = require('path')

function generateRandomPassword(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:'\",.<>?/";
  let password = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters.charAt(randomIndex);
  }

  return password;
}
const genrateTableComponent = (Obj, isComponent = false, isModel = false, isRoute = false) => {
  const fs = require('fs');
  const { title, model, module, pathOfComponent, pathOfModel, pathOfRoute, tableHead, typeObject, componentName, modelName } = Obj

  const componentFilds = { "text": "Text", "date": "Text", "number": "Text", "select": "Select", "academicYearGenerator( 29, true, true )": "YearSelect" }

  if (isComponent) {
    const commponetContent = `import React, { useState, useEffect } from "react";
import { useQuery } from 'react-query';
  const tableHead = { index: "Sr. no.", ${Object.keys(tableHead).map((key) => { return `${key}: "${tableHead[key]}"` })}, Proof: "Upload Proof", Action: "Action" }
  const ${componentName} = () => {

    const module = "${module}";
    const model = "${model}";
    const title = "${title}";
    let filter = {};

    const params = { model, module, filter };
    const { data, isLoading, refetch } = useQuery(\`\${model}${generateRandomPassword(20)}\`, () => getReq(params));

    const initialstate = { ${Object.keys(tableHead).map((key) => { return `${key}: ""` })}, Proof: "" };
    const [values, setValues] = useState(initialstate);

    const { ${Object.keys(tableHead).map((key) => { return `${key}` })}} = values;

    const [open, setOpen] = useState(false);
    const [excelOpen, setExcelOpen] = useState(false);

    //---------------edit state-------------------
    const [itemToEdit, setItemToEdit] = useState(null);
    const [edit, setEdit] = useState(false);
    const [Loading, setLoading] = useState(false);

    useEffect(() => {
      if (itemToEdit && data.data) {
        data?.data.forEach((item) => {
          if (item?._id === itemToEdit) {
            const { ${Object.keys(tableHead).map((key) => { return `${key}` })} } = item
            setEdit(true); setOpen(true);
            setValues({ ${Object.keys(tableHead).map((key) => { return `${key}` })} })
          }
        })
      }
    }, [itemToEdit])

    const onCancel = () => {
      setValues(initialstate); setItemToEdit(null); setEdit(false); setOpen(false)
    }
    const onSubmit = (e) => {
      e.preventDefault();
      edit ? editReq({ id: itemToEdit }, model, initialstate, values, setValues, refetch, setOpen, setEdit, setItemToEdit, setLoading, module) :
      addReq({}, model, initialstate, values, setValues, refetch, setOpen, setLoading, module)
    }
    
    const typeObject = {${Object.keys(typeObject).map((key) => { return `${key}: "${typeObject[key]}"` })}};
      
    return (
      <>
        <AddButton customName={title} onclick={setOpen} exceldialog={setExcelOpen} dataCount={data ? data?.data.length : 0} />
        <DialogBox title={\`\${edit ? "Edit" : "Add"} ${title}\`} buttonName="Submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={onSubmit} onCancel={onCancel} maxWidth="lg" loading={Loading}>
        <div className='flex flex-wrap'>
         ${Object.keys(tableHead).map((key) => {
      return `<${componentFilds[typeObject[key]]} className='col-md-6 col-lg-4' ${["date", "number"].includes(typeObject[key]) ? `type="${typeObject[key]}"` : ""} id="${key}" value={${key}} label={tableHead.${key}} setState={setValues} ${typeObject[key] === "select" ? "options={}" : ""} />\n\t\t\t\t`
    }).join(' ')}<UploadFile className='col-md-6 col-lg-4' id="Proof" label="Upload Proof" setState={setValues} required={!edit} />
        </div>
        </DialogBox>
        
        <BulkExcel data={data?.data} title={title} SendReq={model} refetch={refetch} module={module} commonFilds={{}} tableHead={tableHead} typeObject={typeObject} open={excelOpen} setOpen={setExcelOpen} proof='proof' />
        
        <TableComponent TB={data?.data} module={module} getproof="proof" proof="${module}" fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={model} />
      </>
    )
  }
  export default ${componentName}`;

    fs.writeFile(pathOfComponent, commponetContent, (err) => {
      if (err) {
        console.error('Error creating the file:', err);
      } else {
        console.log('New file has been created successfully.');
      }
    });
  }
  if (isModel) {

    const modelContent = `const mongoose = require('mongoose');

  const ${modelName}Schema = new mongoose.Schema({
      ${Object.keys(tableHead).map((key) => {
      return `${key}: {
          type: ${typeObject[key] === "number" ? "Number" : "String"},
          required: true
      }\n` })}
      ,proof: {
          type: String,
          required: false
      },
  },{timestamps: true})
  
  module.exports = mongoose.model('${modelName}', ${modelName}Schema);`;

    fs.writeFile(pathOfModel, modelContent, (err) => {
      if (err) {
        console.error('Error creating the file:', err);
      } else {
        console.log('model file has been created successfully.');
      }
    });
  }
  if (isRoute) {
    const routeContent = `const express = require('express');
  const router = express.Router();
  const path = require('path');
  const fs = require('fs');
  const multerConfig = require('../../utility/multerConfig').multerConfig
  
  const ${module}Upload = multerConfig("../uploads/${module}-uploads/")

  const models = {  }
  
  //get
  router.post('/${module}/getData', async (req, res) => {
      const { model, filter } = req.body
      try {
          const fetch = await models[model].find(filter);
          res.status(200).send(fetch);
      } catch (err) {
          console.log(err);
          res.status(500).send();
      }
  })
  
  //set
  router.post("/${module}/newRecord/:model", ${module}Upload.single("Proof"), async (req, res) => {
      try {
          const model = req.params.model
          // console.log(model)
          const data = JSON.parse(JSON.stringify(req.body));
          let SendData = null;
          // const { } = data
          const up = req.file.filename;
          SendData = data
  
          var withUpData = Object.assign(SendData, { proof: up })
          const obj = new models[model](withUpData);
          await obj.save();
          res.status(201).send("Entry Succeed")
      }
      catch (err) {
          console.log(err)
          res.status(500).send()
      }
  });
  
  //reset
  router.post('/${module}/editRecord/:model', ${module}Upload.single('Proof'), async (req, res) => {
      const model = req.params.model
      const data = JSON.parse(JSON.stringify(req.body));
      let SendData = null;
      const { id } = data
      const isfile = req.file;
      if (isfile) {
          var up = req.file.filename
      }
      SendData = data
  
      var alldata = null
      if (up) {
          alldata = Object.assign(SendData, { proof: up })
      }
      else {
          alldata = SendData
      }
      await models[model].findOneAndUpdate({ _id: id }, alldata)
      res.status(200).send("Edited Successfully")
  })
  
  //remove
  router.post('/${module}/deleteRecord', async (req, res) => {
      const { model, id } = req.body
  
      try {
          const Record = await models[model].findOne({ _id: id });
          await models[model].deleteOne({ _id: id })
          const Filename = Record.Proof;
          const link = path.join(__dirname, \`../../uploads/${module}-uploads/\${Filename}\`);
          fs.unlink(link, function (err) {
              if (err) {
                  console.error(err);
              }
              
          });
          res.status(200).send("Entry Deleted Successfully");
      }
      catch (e) {
          res.status(500).send({ massage: e.massage });
      }
  })
  
  module.exports = { router, models };`;

    fs.writeFile(pathOfRoute, routeContent, (err) => {
      if (err) {
        console.error('Error creating the file:', err);
      } else {
        console.log('model file has been created successfully.');
      }
    });
  }
};

genrateTableComponent(
  {
    title: "Details of online courses",
    model: "SwayamDetailsOfOnlineCourses",
    module: "swayam",
    componentName: "SwayamDetailsOfOnlineCourses",
    pathOfComponent: path.join(__dirname, '../../src/services/swayam/pages/SwayamDetailsOfOnlineCourses.jsx'),
    modelName: 'swayamDetailsOfOnlineCourses',
    pathOfModel: path.join(__dirname, '../models/swayam-models/swayamDetailsOfOnlineCoursesSchema.js'),
    pathOfRoute: path.join(__dirname, '../routes/estt-routes/estt-routes.js'),
    tableHead: {
      portalName: "Portal Name", offeredOnlineCourses: "No. of students offered online courses which have credit transferred to transcript", onlineCoursesWhichTrasperedCredit: "Total no. of online courses which have credit transferred to the transcript", creditsTransferredToTranscript: "Total no. of credits transferred to transcript", academicYear: "Academic Year"
    },
    typeObject: {
      portalName: "text", offeredOnlineCourses: "number", onlineCoursesWhichTrasperedCredit: "number", creditsTransferredToTranscript: "number", academicYear: "academicYearGenerator( 29, true, true )",
    }
  }, true, true
)