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
import Select from '../../../components/formComponents/Select'


const tableHead = { index: "Sr. no.", enrolmentYear: "Enrollment Date", fellowshipDuration: "Fellowship Duration", fellowshipType: "Fellowship Type", grantingAgency: "Granting Agency", qualifyingExam: "Qualifying Exam", year: "Academic Year", Proof: "Uploaded Proof", Action: "Action" }
const StudentJRFSRF = () => {

  const model = 'JrfSrf'
  const module = 'studentF'

  const user = useSelector(state => state.user.studentUser)

  const params = { model, id: user?._id, module }
  const { data, isLoading, refetch } = useQuery([model, params], () => getReq(params))

  const initialstate = { enrolmentYear: '', fellowshipDuration: '', fellowshipType: '', grantingAgency: '', qualifyingExam: '', year: '', Upload_Proof: '' }
  const [values, setValues] = useState(initialstate)
  const { enrolmentYear, fellowshipDuration, fellowshipType, grantingAgency, qualifyingExam, year } = values
  const [open, setOpen] = useState(false)

  //---------------edit state-------------------
  const [itemToEdit, setItemToEdit] = useState(null)
  const [edit, setEdit] = useState(false);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    if (itemToEdit && data.data) {
      data?.data.forEach((item) => {
        if (item?._id === itemToEdit) {
          const { enrolmentYear, fellowshipDuration, fellowshipType, grantingAgency, qualifyingExam, year } = item
          setEdit(true); setOpen(true);
          setValues({ enrolmentYear, fellowshipDuration, fellowshipType, grantingAgency, qualifyingExam, year })
        }
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemToEdit])

  const onCancel = () => {
    setValues(initialstate); setItemToEdit(null); setEdit(false); setOpen(false)
  }
  const onSubmit = (e) => {
    e.preventDefault();
    edit ? editReq({ id: itemToEdit }, model, initialstate, values, setValues, refetch, setOpen, setEdit, setItemToEdit, setLoading, module) :
      user.ResearchGuideId === '' ? addReq({ researchName: user?.name, studentId: user?._id, schoolName: user.schoolName, guideName: user.ResearchGuide }, model, initialstate, values, setValues, refetch, setOpen, setLoading, module) :
        addReq({ researchName: user?.name, studentId: user?._id, userId: user.ResearchGuideId, schoolName: user.schoolName, guideName: user.ResearchGuide }, model, initialstate, values, setValues, refetch, setOpen, setLoading, module)
  }

  return (
    <>
      <AddButton title="JRF, SRF, Post Doctoral Fellows, Research Associate" onclick={setOpen} dataCount={data ? data?.data.length : 0} />
      <DialogBox title={`${edit ? "Edit" : "Add"} JRF, SRF, Post Doctoral Fellows, Research Associate`} buttonName="Submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={onSubmit} onCancel={onCancel} maxWidth="lg" loading={Loading}>
        <div className='flex flex-wrap'>
          <Text className='col-md-6 col-lg-4' id="enrolmentYear" value={enrolmentYear} type="date" label="Enrollment Year" setState={setValues} />
          <Text className='col-md-6 col-lg-4' id="fellowshipDuration" type='number' value={fellowshipDuration} label="Fellowship Duration (in Months)" setState={setValues} />
          <Select options={["JRF", "SRF", "Post Doctoral Fellows", "Research Associate"]} className='col-md-6 col-lg-4' id="fellowshipType" value={fellowshipType} label="Fellowship Type" setState={setValues} />
          <Text className='col-md-6 col-lg-4' id="grantingAgency" value={grantingAgency} label="Granting Agency" setState={setValues} />
          <Text className='col-md-6 col-lg-4' id="qualifyingExam" value={qualifyingExam} label="Qualified Exam" setState={setValues} />
          <YearSelect className='col-md-6 col-lg-4' id="year" value={year} label="Choose Year" setState={setValues} />
          <UploadFile className='col-md-6 col-lg-4' id="Upload_Proof" label="Upload Proof" setState={setValues} required={!edit} />
        </div>
      </DialogBox>
      <Table TB={data?.data} module={module} getproof="proof" proof="faculty" fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={model} />
    </>
  )
}

export default StudentJRFSRF