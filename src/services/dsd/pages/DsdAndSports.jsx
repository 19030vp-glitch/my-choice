import React, { useEffect, useState } from 'react';
import DialogBox from '../../../components/formComponents/DialogBox'
import Text from '../../../components/formComponents/Text'
import AddButton from '../../director/components/UtilityComponents/AddButton'
import Table from '../../../components/tableComponents/TableComponent'
import { useQuery } from 'react-query'
import getReq from '../../../components/requestComponents/getReq'
import editReq from '../../../components/requestComponents/editReq'
import addReq from '../../../components/requestComponents/addReq'
import Select from '../../../components/formComponents/Select'
import BulkExcel from '../../../components/BulkExcel'
import YearSelect from '../../../components/formComponents/YearSelect'
import UploadFile from '../../../components/formComponents/UploadFile'
import { academicYearGenerator } from '../../../inputs/Year';


const tableHead = { index: "Sr. no.", nameOfAward: "Name of the award/ medal", teamIndividual: "Team / Individual", isNat: "Inter-university / state / National / International", nameOfEvent: "Name of the event", nameOfStudnt: "Name of the student", academicYear: "Year", Proof: "Proof of Award", Action: "Action" }

const DsdAndSports = ({ userType = 'dsd', filterByAcademicYear = false }) => {
  const model = 'DSDSports'
  const module = 'dsd';
  const title = "Awards / Medals achieved by Students"
  const TeamIndividual = ['Team', 'Individual']
  const IsNat = ['Inter-university', 'State', 'National', 'International']
  const typeObject = {
    nameOfAward: "text", teamIndividual: TeamIndividual, isNat: IsNat, nameOfEvent: "text", nameOfStudnt: "text", academicYear: academicYearGenerator(29, true, true)
  }  

  let filter = filterByAcademicYear ? { userType, academicYear: filterByAcademicYear } : { userType };
  const params = { model, id: '', module, filter }
  const { data, isLoading, refetch } = useQuery([model, params], () => getReq(params))

  const initialstate = {
    academicYear: "", nameOfAward: "", teamIndividual: "", isNat: "", nameOfEvent: "", nameOfStudnt: "", Proof: "",
  }
  const [values, setValues] = useState(initialstate)
  const { academicYear, nameOfAward, teamIndividual, isNat, nameOfEvent, nameOfStudnt } = values
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
          const { academicYear, nameOfAward, teamIndividual, isNat, nameOfEvent, nameOfStudnt } = item
          setEdit(true); setOpen(true);
          setValues({ academicYear, nameOfAward, teamIndividual, isNat, nameOfEvent, nameOfStudnt })
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
      {/* academicYear, nameOfAward, teamIndividual, isNat, nameOfEvent, nameOfStudnt, Proof */}
      <AddButton title={title} dataCount={data ? data?.data.length : 0} onclick={setOpen} exceldialog={setExcelOpen} customName={title} filterByAcademicYear={true} loading={Loading} />
      <DialogBox title={`${edit ? "Edit" : "Add"} ${title}`} buttonName="Submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={onSubmit} onCancel={onCancel} maxWidth="lg">
        <div className='flex flex-wrap'>
          <Text className='col-md-6 col-lg-4' id="nameOfAward" value={nameOfAward} label={tableHead.nameOfAward} setState={setValues} />
          <Text className='col-md-6 col-lg-4' id="nameOfEvent" value={nameOfEvent} label={tableHead.nameOfEvent} setState={setValues} />
          <Text className='col-md-6 col-lg-4' id="nameOfStudnt" value={nameOfStudnt} label={tableHead.nameOfStudnt} setState={setValues} />
          <Select className='col-md-6 col-lg-4' id="teamIndividual" value={teamIndividual} label={tableHead.teamIndividual} options={TeamIndividual} setState={setValues} />
          <Select className='col-md-6 col-lg-4' id="isNat" value={isNat} label={tableHead.isNat} options={IsNat} setState={setValues} />
          <YearSelect className='col-md-6 col-lg-4' id="academicYear" value={academicYear} label={tableHead.academicYear} setState={setValues} />
          <UploadFile className='col-md-6 col-lg-4' id="Proof" label={tableHead.Proof} setState={setValues} required={!edit} />
        </div>
      </DialogBox>

      <BulkExcel data={data?.data} proof="proof" title={title} SendReq={model} refetch={refetch} module={module} department={title} open={excelOpen} setOpen={setExcelOpen} typeObject={typeObject} tableHead={tableHead} commonFilds={{ userType }} />

      <Table TB={data?.data} module={module} fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={model} getproof="proof" />
    </>
  )
}

export default DsdAndSports
export { tableHead }
