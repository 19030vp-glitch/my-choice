import React, { useEffect, useState } from 'react';
import DialogBox from '../../../components/formComponents/DialogBox'
import Text from '../../../components/formComponents/Text'
import AddButton from '../../director/components/UtilityComponents/AddButton'
import Table from '../../../components/tableComponents/TableComponent'
import { useQuery } from 'react-query'
import getReq from '../../../components/requestComponents/getReq'
import editReq from '../../../components/requestComponents/editReq'
import addReq from '../../../components/requestComponents/addReq'
import BulkExcel from '../../../components/BulkExcel'
import YearSelect from '../../../components/formComponents/YearSelect'
import UploadFile from '../../../components/formComponents/UploadFile'
import Select from '../../../components/formComponents/Select';
import SchoolsProgram from '../../../components/SchoolsProgram';

const tableHead = { index: "Sr. no.", SchoolName: "School Name", Programme_Code: "Programme Code", Programme_name: "Programme name", Academic_Year: "Academic Year", Type_of_program: "Type of Program", Number_of_seats_available: "Number of seats available", Number_of_eligible_applications: "Number of eligible applications", Number_of_Students_admitted: "Number of Students admitted", Upload_Proof: "Proof", Action: "Action" }

const OtherDemandRatio = ({ filterByAcademicYear = false }) => {
  const model = 'DemandRatio'
  const module = 'nssd';
  const title = "Demand Ratio";
  const Types = ["UG", "PG", "Ph.D", "Diploma", "PG Diploma", "Certificate"]

  let filter = filterByAcademicYear ? { Academic_Year: filterByAcademicYear } : {};
  const params = { model, id: '', module, filter }
  const { data, isLoading, refetch } = useQuery([model, params], () => getReq(params))

  const initialstate = {
    SchoolName: "", Programme_Code: "", Programme_name: "", Academic_Year: "", Type_of_program: "", Number_of_seats_available: "", Number_of_eligible_applications: "", Number_of_Students_admitted: "", Upload_Proof: "",
  }
  const [values, setValues] = useState(initialstate)
  const { SchoolName, Programme_Code, Programme_name, Academic_Year, Type_of_program, Number_of_seats_available, Number_of_eligible_applications, Number_of_Students_admitted, } = values
  const [open, setOpen] = useState(false)
  const [excelOpen, setExcelOpen] = useState(false)

  //---------------edit state-------------------
  const [itemToEdit, setItemToEdit] = useState(null)
  const [edit, setEdit] = useState(false);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    if (itemToEdit && data.data) {
      data?.data.forEach((item) => {
        if (item?._id === itemToEdit) {
          const { Programme_Code, Programme_name, Academic_Year, Type_of_program, Number_of_seats_available, Number_of_eligible_applications, Number_of_Students_admitted, } = item
          setEdit(true); setOpen(true);
          setValues({ Programme_Code, Programme_name, Academic_Year, Type_of_program, Number_of_seats_available, Number_of_eligible_applications, Number_of_Students_admitted, })
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

  return (
    <>
      {/* Programme_Code, Programme_name, Academic_Year, Type_of_program, Number_of_seats_available, Number_of_eligible_applications, Number_of_Students_admitted, Upload_Proof, */}
      <AddButton title={title} onclick={setOpen} exceldialog={setExcelOpen} customName={title} filterByAcademicYear={true}  dataCount={data ? data?.data.length : 0} />
      <DialogBox title={`${edit ? "Edit" : "Add"} ${title}`} buttonName="Submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={onSubmit} onCancel={onCancel} maxWidth="lg"  loading={Loading}>
        <div className='flex flex-wrap'>
          <Select className='col-md-6 col-lg-4' id="SchoolName" value={SchoolName} label={tableHead.SchoolName} options={Object.keys(SchoolsProgram).map(item => { return item })} setState={setValues} />
          <Text className='col-md-6 col-lg-4' id="Programme_Code" value={Programme_Code} label={tableHead.Programme_Code} setState={setValues} />
          <Text className='col-md-6 col-lg-4' id="Programme_name" value={Programme_name} label={tableHead.Programme_name} setState={setValues} />
          <YearSelect className='col-md-6 col-lg-4' id="Academic_Year" value={Academic_Year} label={tableHead.Academic_Year} setState={setValues} />
          <Select className='col-md-6 col-lg-4' id="Type_of_program" value={Type_of_program} label={tableHead.Type_of_program} options={Types} setState={setValues} />
          <Text className='col-md-6 col-lg-4' type="number" id="Number_of_seats_available" value={Number_of_seats_available} label={tableHead.Number_of_seats_available} setState={setValues} />
          <Text className='col-md-6 col-lg-4' type="number" id="Number_of_eligible_applications" value={Number_of_eligible_applications} label={tableHead.Number_of_eligible_applications} setState={setValues} />
          <Text className='col-md-6 col-lg-4' type="number" id="Number_of_Students_admitted" value={Number_of_Students_admitted} label={tableHead.Number_of_Students_admitted} setState={setValues} />
          <UploadFile className='col-md-6 col-lg-4' id="Upload_Proof" label={tableHead.Upload_Proof} setState={setValues} required={!edit} />
        </div>
      </DialogBox>

      <BulkExcel data={data?.data} sampleFile="Demand Ratio" title={title} SendReq={model} refetch={refetch} module={module} department={title} open={excelOpen} setOpen={setExcelOpen} />

      <Table TB={data?.data} module={module} fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={model} proof="director" />
    </>
  )
}

export default OtherDemandRatio