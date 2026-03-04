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

const tableHead = { index: "Sr. no.", Name_of_the_employer: "Name of the employer", Employer_contact_details: "Employer contact details", Pay_package_annum: "Pay package ( ₹ / annum)", Academic_Year: "Year of Placement", Upload_Proof: "Upload Proof", Action: "Action" }

const AlumniJobs = () => {
  const model = 'Placement'
  const module = 'alumni'
  const user = useSelector(state => state.user.alumniUser)

  const params = { model, id: user?._id, module, filter: "placementJob" }
  const { data, isLoading, refetch } = useQuery([model, params], () => getReq(params))

  const initialstate = { Name_of_the_employer: '', Employer_contact_details: '', Pay_package_annum: '', Academic_Year: '', Upload_Proof: '' }
  const [values, setValues] = useState(initialstate)
  const { Name_of_the_employer, Employer_contact_details, Pay_package_annum, Academic_Year } = values
  const [open, setOpen] = useState(false)

  //---------------edit state-------------------
  const [itemToEdit, setItemToEdit] = useState(null)
  const [edit, setEdit] = useState(false);
  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    if (itemToEdit && data.data) {
      data?.data.forEach((item) => {
        if (item?._id === itemToEdit) {
          const { Name_of_the_employer, Employer_contact_details, Pay_package_annum, Academic_Year } = item
          setEdit(true); setOpen(true);
          setValues({ Name_of_the_employer, Employer_contact_details, Pay_package_annum, Academic_Year })
        }
      })
    }
  }, [itemToEdit])


  const onCancel = () => {
    setValues(initialstate); setItemToEdit(null);
  }
  const onSubmit = (e) => {
    e.preventDefault();
    edit ? editReq({ id: itemToEdit }, model, initialstate, values, setValues, refetch, setOpen, setEdit, setItemToEdit, setLoading, module) :
      addReq({ Name_of_student_placed: user?.name, Program_graduated_from: user?.programGraduated, SchoolName: user?.schoolName, AlumniId: user?._id, Type_Of_Placement: 'Placement' }, model, initialstate, values, setValues, refetch, setOpen, setLoading, module)
  }

  return (
    <>
      <AddButton onclick={setOpen} title="Your Jobs" dataCount={data ? data?.data.length : 0} />
      <DialogBox title="Job" buttonName="submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={onSubmit} onCancel={onCancel} maxWidth="lg" loading={Loading} >
        <div className='flex flex-wrap'>
          <Text className='col-md-6 col-lg-4' id="Name_of_the_employer" value={Name_of_the_employer} label="Name of the employer" setState={setValues} />
          <Text className='col-md-6 col-lg-4' id="Employer_contact_details" value={Employer_contact_details} label="Employer contact details" setState={setValues} />
          <Text className='col-md-6 col-lg-4' type="number" id="Pay_package_annum" value={Pay_package_annum} label="Pay package ( ₹ / annum)" setState={setValues} />
          <YearSelect className='col-md-6 col-lg-4' id="Academic_Year" value={Academic_Year} label="Acadmic Year of placement" setState={setValues} />
          <UploadFile className='col-md-6 col-lg-4' id="Upload_Proof" label="Upload Proof" setState={setValues} required={!edit} />
        </div>
      </DialogBox>
      <Table TB={data?.data} module={module} fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={model} />
    </>
  )
}

export default AlumniJobs
