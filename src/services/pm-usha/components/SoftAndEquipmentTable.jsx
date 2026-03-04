import React, { useEffect, useState, useRef } from 'react'
import allTableHeads from '../../admin/js/allTableHeads'
import { IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import { useQuery } from 'react-query';
import getReq from '../../../components/requestComponents/getReq';
import Loader from '../../../components/Loader';
import DialogBox from '../../../components/formComponents/DialogBox';
import addReq from '../../../components/requestComponents/addReq';
import editReq from '../../../components/requestComponents/editReq';
import Text from '../../../components/formComponents/Text';
import Select from '../../../components/formComponents/Select';
import UploadFile from '../../../components/formComponents/UploadFile';
import FileViewer from '../../../components/FileViewer';
import TextArea from '../../../components/formComponents/TextArea';
import DateRangePicker from '../../../components/formComponents/DateRangePicker';
import { staticData, statusColor } from '../js/saeStaticData'
import dateDifference from '../js/dateDifference';
import '../css/pm-usha.css';
import { downloadExcel } from '../../director/components/UtilityComponents/ActionExcelButton';
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';



export const softActivities = Object.keys(staticData.Soft)
function func() {

  let data = {}

  Object.entries(staticData.Soft).forEach(([key, value]) => {
    const keyArr = Object.keys(value)
    data[key] = keyArr
  })
  // console.log(data)
}

const SoftAndEquipmentTable = ({type= "Equipment", isEditable, subType="Equipment1" }) => {

  const serviceName = "usha";
  const model = "SoftAndEquipment";
  const module = "pm-usha"
  const getproof = "proof"
  const getproof2 = "proof2"
  const proofFolder = { getproof, getproof2, folder: serviceName }
  const title = `Details of ${type}`

  const tableRef = useRef(null);

  const tableHead = { ...allTableHeads[type] }
  if (!isEditable) {
    delete tableHead.Action;
  }
  const { index, status, outCome, event, centerName, coordinater, From_Date, To_Date, durationInDays, objective, noOfStudentBeneficiary, noOfFacultyBeneficiary, Proof2, Proof, Action, ...SortedHead } = tableHead

  const [itemToEdit, setItemToEdit] = useState(null);
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [Loading, setLoading] = useState(false);
  const initialState = type === "Equipment" ? {status: null, Proof: null, elementId: null, outCome: null,  Proof2: "", type, subType } : {activity: "", event: "", centerName: "", coordinater: "",From_Date: "", To_Date: "", objective: "", noOfStudentBeneficiary: "", noOfFacultyBeneficiary: "", status: null, Proof: null, elementId: null, outCome: null,  Proof2: "", type, subType}
  const [values, setValues] = useState(initialState);

  const filter = { type, subType /*academicYear*/ }
  const params = { model, module, filter, id: "" };
  const { data, isLoading, refetch } = useQuery(`pm-usha ${type}${subType}`, () => getReq(params))

  const setItem = (element, key) => {

    if (key !== "_id") {
      for (let i = 0; i < data?.data.length; i++) {
        const item = data.data[i];
        if (Number(item.elementId) === Number(element)) {
          return data.data[i][key];
        }
      }
    }
    else if (key === '_id') {
      for (let i = 0; i < data?.data.length; i++) {
        const item = data.data[i];
        if (Number(item.elementId) === Number(element)) {
          if (item.hasOwnProperty("_id")) {
            setEdit(true); setOpen(true);
            setValues({ ...item, Proof: undefined })
            return item._id
          }
        }
      }
        setItemToEdit(null); setOpen(true); setEdit(false); setValues(type==="Soft"?{...initialState, activity: staticData[type][subType][element].activity, elementId: element}: {...initialState, elementId: element});
        return null;
    }
  };

  const onCancel = () => {
    setOpen(false); setValues(initialState); setEdit(false); setItemToEdit(null);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    edit ? editReq({ id: itemToEdit, ...proofFolder }, model, initialState, values, setValues, refetch, setOpen, setEdit, setItemToEdit, setLoading, module) :
      addReq({ ...proofFolder }, model, initialState, values, setValues, refetch, setOpen, setLoading, module)


    setOpen(false); setValues(initialState); setEdit(false); setItemToEdit(null); setLoading(false);
  };

useEffect(()=>{
  const startDate = values.From_Date
  const endDate = values.To_Date
  if(startDate && endDate){
    const difference = dateDifference(startDate, endDate)
    setValues(prev=>{
      return {
       ...prev,
        durationInDays: difference
      }
    })
  }
}, [values.From_Date, values.To_Date]);

  return (
    <div>
        <div className='w-full flex justify-end'>
          <div className='my-2 mr-2 flex pm-usha-actionButton'>
            <div className='pm-usha-title'>Actions</div>
            <div className='dropin-soft-equipment dropdown'>
              <button className="btn dropin-soft-equipment dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                {/* <ArrowDropDownSharpIcon /> */}
              </button>
              <ul className="dropdown-menu mt-2" style={{zIndex: "25"}}>
                <li><button className="dropdown-item text-green-800" onClick={()=>{
                  const {Action, ...head} = tableHead
                  downloadExcel({ tableRef, tableHead: head, serviceName, model, data, title, proof:getproof, proof2:getproof2 })}}><FileDownloadRoundedIcon/> Download Excel</button></li>
                <li><button className="dropdown-item text-red-600" ><FileDownloadRoundedIcon/> Download PDF</button></li>
              </ul>
            </div>
          </div>
        </div>
        
      
      <DialogBox title={`${edit ? "Edit" : "Add"} ${title}`} buttonName="Submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={onSubmit} onCancel={onCancel} maxWidth="lg" loading={Loading}>
        <div className='flex flex-wrap'>
          {type==="Soft" && <>
          <Text className='col-md-6 col-lg-4' id="activity" value={values.activity} label={tableHead.activity} setState={setValues} />
          <Text className='col-md-6 col-lg-4' id="event" value={values.event} label={tableHead.event} setState={setValues} />
          <Text className='col-md-6 col-lg-4' id="centerName" value={values.centerName} label={tableHead.centerName} setState={setValues} />
          <Text className='col-md-6 col-lg-4' id="coordinater" value={values.coordinater} label={tableHead.coordinater} setState={setValues} /></>}
          <Select className='col-md-6 col-lg-4' id="status" value={values.status} label={tableHead.status} setState={setValues} options={type==="Soft"?["Not yet Started", "Ongoing", "Completed"]:["Not yet purchased", "Tender Invited", "Purchased", "Installation completed"]} />
          {(type==="Soft"&&values.status==="Completed")&&<DateRangePicker className='col-md-6 col-lg-4' id="From_Date" value={values.From_Date} label={tableHead.From_Date} setState={setValues}/>}
          {["Completed", "Installation completed"].includes(values.status)&&<DateRangePicker className='col-md-6 col-lg-4' id="To_Date" value={values.To_Date} label={tableHead.To_Date} setState={setValues}/>}
          {type==="Soft"&&<><Text className='col-md-6 col-lg-4' type='number' id="noOfStudentBeneficiary" value={values.noOfStudentBeneficiary} label={tableHead.noOfStudentBeneficiary} setState={setValues} />
          <Text className='col-md-6 col-lg-4' type='number' id="noOfFacultyBeneficiary" value={values.noOfFacultyBeneficiary} label={tableHead.noOfFacultyBeneficiary} setState={setValues} />
          <Text className='col-md-6 col-lg-4' id="objective" value={values.objective} label={tableHead.objective} setState={setValues} /></>}
          <TextArea className='col-md-6 col-lg-4' id="outCome" value={values.outCome} label={tableHead.outCome} setState={setValues} />
          {((type==="Equipment" && values.status==="Installation completed")||type==="Soft")&&<UploadFile className='col-md-6 col-lg-4' id="Proof" label={tableHead.Proof} setState={setValues} required={!edit} />}
          {["Completed", "Installation completed", "Purchased"].includes(values.status)&&<UploadFile className='col-md-6 col-lg-4' id="Proof2" label={tableHead.Proof2} setState={setValues} required={!edit} />}
        </div>
      </DialogBox>

      {isLoading ? <Loader /> : <div ref={tableRef} className='table-responsive' style={{ maxHeight: '110vh' }}>
        <table className={`table table-bordered`} style={{ fontSize: "15px" }} >
          <thead className="sticky-top" style={{ background: '#2a4dd0', color: "#fff", zIndex: "20" }}>
            <tr>
              {Object.keys(tableHead)?.map((e, i) => {
                return <th key={`${e}${i}`} sx={{ fontSize: "12px", fontWeight: "bold" }}>{tableHead?.[e]}</th>
              })}
            </tr>
          </thead>
          <tbody style={{color: "#545454"}}>
                {
                  Object.keys(staticData?.[type]?.[subType])?.map((element, i) => {
                    const status = setItem(element, 'status')
                    return <tr key={`${element}${i}`} style={{background: "#f2f2f2"}}>
                      <td>{i + 1}</td>
                      {
                        Object.keys(SortedHead).map((key, i) => {
                          const valueData = setItem(element, key)
                          return <td key={`${key}${i}`} style={{maxWidth: type==="Equipment"?"220px": "1000px"}} className='pl-4' >{valueData || staticData[type][subType][element][key]}</td>
                        })
                      }

                  {
                    type === "Soft" && <>
                      <td>{setItem(element, 'event')}</td>
                      <td>{setItem(element, 'centerName')}</td>
                      <td>{setItem(element, 'coordinater')}</td>
                    </>
                  }
                  <td style={{ color: statusColor[status] }} className='font-semibold'>{status}</td>
                  {
                    type === "Soft" && <td>{setItem(element, 'From_Date')}</td>
                  }
                  <td>{setItem(element, 'To_Date')}</td>
                  {
                    type === "Soft" && <>
                      <td>{setItem(element, 'durationInDays')}</td>
                      <td>{setItem(element, 'noOfStudentBeneficiary')}</td>
                      <td>{setItem(element, 'noOfFacultyBeneficiary')}</td>
                      <td>{setItem(element, 'objective')}</td>
                    </>
                  }
                  <td>{setItem(element, 'outCome')}</td>
                  <td><FileViewer fileName={setItem(element, 'proof')} serviceName={serviceName} /></td>
                  <td><FileViewer fileName={setItem(element, 'proof2')} serviceName={serviceName} /></td>
                  {isEditable && <td sx={{ fontSize: "12px" }}>
                    <IconButton onClick={() => setItemToEdit(setItem(element, '_id'))} sx={{ color: "primary" }}>
                      <EditIcon />
                    </IconButton>
                  </td>}
                </tr>
              })
            }

          </tbody>
        </table>
      </div>
      }
    </div>
  )
}

export default SoftAndEquipmentTable