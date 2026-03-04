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
import { academicYearGenerator } from '../../../inputs/Year';


const tableHead = { index: "Sr. no.", dateOfEvent: "Date of event/competition", nameOfEvent: "Name  of the event/competition", academicYear: "Academic Year", Proof: "Proof of Report", Action: "Action" }


const SportsAndCulturalEvents = ({ userType = 'dsd', filterByAcademicYear = false }) => {
  const model = 'SportsAndCulturalEvents'
  const module = 'dsd';
  const title = "Information of Sports And Cultural Event"
  const typeObject = { dateOfEvent: "date", nameOfEvent: "text", academicYear: academicYearGenerator(29, true, true) }

  let filter = filterByAcademicYear ? { userType, academicYear: filterByAcademicYear } : { userType };
  const params = { model, id: '', module, filter }
  const { data, isLoading, refetch } = useQuery([model, params], () => getReq(params))

  const initialstate = {
    dateOfEvent: "", nameOfEvent: "", academicYear: "", Proof: "",
  }
  const [values, setValues] = useState(initialstate)
  const { dateOfEvent, nameOfEvent, academicYear, } = values
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
          const { dateOfEvent, nameOfEvent, academicYear, } = item
          setEdit(true); setOpen(true);
          setValues({ dateOfEvent, nameOfEvent, academicYear, })
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
      addReq({ userType }, model, initialstate, values, setValues, refetch, setOpen, setLoading, module)
  }

  return (
    <>
      {/* dateOfEvent, nameOfEvent, academicYear, */}
      <AddButton title={title} onclick={setOpen} exceldialog={setExcelOpen} customName={title} filterByAcademicYear={true} dataCount={data ? data?.data.length : 0} />
      <DialogBox title={`${edit ? "Edit" : "Add"} ${title}`} buttonName="Submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={onSubmit} onCancel={onCancel} maxWidth="lg" loading={Loading}>
        <div className='flex flex-wrap'>
          <Text className='col-md-6 col-lg-4' type='date' id="dateOfEvent" value={dateOfEvent} label={tableHead.dateOfEvent} setState={setValues} />
          <Text className='col-md-6 col-lg-4' id="nameOfEvent" value={nameOfEvent} label={tableHead.nameOfEvent} setState={setValues} />
          <YearSelect className='col-md-6 col-lg-4' id="academicYear" value={academicYear} label={tableHead.academicYear} setState={setValues} />
          <UploadFile className='col-md-6 col-lg-4' id="Proof" label={tableHead.Proof} setState={setValues} required={!edit} />
        </div>
      </DialogBox>

      <BulkExcel data={data?.data} proof="proof" title={title} SendReq={model} refetch={refetch} module={module} department={title} open={excelOpen} setOpen={setExcelOpen} typeObject={typeObject} tableHead={tableHead} commonFilds={{userType}} />

      <Table TB={data?.data} module={module} fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={model} getproof="proof" />
    </>
  )
}

export default SportsAndCulturalEvents
export {tableHead}