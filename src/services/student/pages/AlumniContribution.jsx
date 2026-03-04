import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import DialogBox from '../../../components/formComponents/DialogBox'
import Text from '../../../components/formComponents/Text'
import YearSelect from '../../../components/formComponents/YearSelect'
import UploadFile from '../../../components/formComponents/UploadFile'
import AddButton from '../components/AddButton'
import Table from '../../../components/tableComponents/TableComponent'
import { useQuery } from 'react-query'
import getReq from '../../../components/requestComponents/getReq'
import editReq from '../../../components/requestComponents/editReq'
import addReq from '../../../components/requestComponents/addReq'

const tableHead = { index: "Sr. no.", Amount_of_contribution: "Contribution Ammount in ₹", Academic_Year: "Academic Year of Contribution", Upload_Proof: "Upload Proof", Action: "Action" }
const AlumniContribution = () => {
    const model = 'AlumniContribution'
  const module = 'alumni'
  const user = useSelector(state => state.user.alumniUser)

  const params = { model, id: user?._id, module }
  const { data, isLoading, isError, error, refetch } = useQuery([model, params], () => getReq(params))

  const initialstate = { Amount_of_contribution: '', Academic_Year: '', Upload_Proof: '' }
  const [values, setValues] = useState(initialstate)
  const { Amount_of_contribution, Academic_Year } = values
  const [open, setOpen] = useState(false)

  //---------------edit state-------------------
  const [itemToEdit, setItemToEdit] = useState(null)
  const [edit, setEdit] = useState(false);
  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    if (itemToEdit && data.data) {
      data?.data.forEach((item) => {
        if (item?._id === itemToEdit) {
          const { Amount_of_contribution, Academic_Year } = item
          setEdit(true); setOpen(true);
          setValues({ Amount_of_contribution, Academic_Year })
        }
      })
    }
  }, [itemToEdit])

//   console.log(values)

  const onCancel = () => {
    setValues(initialstate);
    setItemToEdit(null);
  }
  const onSubmit = (e) => {
    e.preventDefault();
    edit ?
      editReq({ id: itemToEdit }, model, initialstate, values, setValues, refetch, setOpen, setEdit, setItemToEdit, setLoading, module) :
      addReq({ Name_of_The_Alumni_Contributed: user.name, Program_graduated_from: user?.programGraduated, SchoolName: user?.schoolName, AlumniId: user?._id }, model, initialstate, values, setValues, refetch, setOpen, setLoading, module)
  }

  return (
    <>
      <AddButton onclick={setOpen} title="Your Alumni Contribution" dataCount={data ? data?.data.length : 0} />
      <DialogBox title="Alumni Contribution" buttonName="submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={onSubmit} onCancel={onCancel} maxWidth="lg" loading={Loading} >
        <div className='flex flex-wrap'>
          <Text className='col-md-6 col-lg-4' type='number' id="Amount_of_contribution" value={Amount_of_contribution} label="Contribution Ammount in ₹" setState={setValues} />
          <YearSelect className='col-md-6 col-lg-4' id="Academic_Year" value={Academic_Year} label="Acadmic Year" setState={setValues} />
          <UploadFile className='col-md-6 col-lg-4' id="Upload_Proof" label="Upload Proof" setState={setValues} required={!edit} />
        </div>
      </DialogBox>
      <Table TB={data?.data} module={module} fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={model} />
    </>
  )
}

export default AlumniContribution