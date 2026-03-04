import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import DialogBox from '../../../components/formComponents/DialogBox'
import Text from '../../../components/formComponents/Text'
import Select from '../../../components/formComponents/Select'
import YearSelect from '../../../components/formComponents/YearSelect'
import UploadFile from '../../../components/formComponents/UploadFile'
import AddButton from '../components/AddButton'
import Table from '../../../components/tableComponents/TableComponent'
import { useQuery } from 'react-query'
import getReq from '../../../components/requestComponents/getReq'
import editReq from '../../../components/requestComponents/editReq'
import addReq from '../../../components/requestComponents/addReq'
import Lists from '../../../components/tableComponents/Lists'


const tableHead = { index: 'Sr.No.', patentNumber: 'Patent Number', patentTitle: 'Patent Title', isNat: 'Wheather National / International', awardYear: 'Award Year of Patent', year: 'Academic Year', Proof: 'Upload Proof', Action: "Action" }

const StudentPatents = () => {
  const model = 'Patent'
  const module = 'studentF'
  const title = 'Patents published / awarded'

  const user = useSelector(state => state.user.studentUser)

  const params = { model, id: user?._id, module}
  const { data, isLoading, refetch } = useQuery([model, params], () => getReq(params))

  const initialstate = { patentNumber: '', patentTitle: '', isNat: '', awardYear: '', year: '', Upload_Proof: '' }
  const [values, setValues] = useState(initialstate)
  const { patentNumber, patentTitle, isNat, awardYear, year } = values
  const [open, setOpen] = useState(false)

  //---------------edit state-------------------
  const [itemToEdit, setItemToEdit] = useState(null)
  const [edit, setEdit] = useState(false);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    if (itemToEdit && data.data) {
      data?.data.forEach((item) => {
        if (item?._id === itemToEdit) {
          const { patentNumber, patentTitle, isNat, awardYear, year } = item
          setEdit(true); setOpen(true);
          setValues({ patentNumber, patentTitle, isNat, awardYear, year })
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
    user.ResearchGuideId=== ''?addReq({ patenterName: user?.name, studentId: user?._id, schoolName: user.schoolName, guideName: user.ResearchGuide }, model, initialstate, values, setValues, refetch, setOpen, setLoading, module):
    addReq({ patenterName: user?.name, studentId: user?._id, userId: user.ResearchGuideId, schoolName: user.schoolName, guideName: user.ResearchGuide }, model, initialstate, values, setValues, refetch, setOpen, setLoading, module)
  }
  //{ patentNumber, patentTitle, isNat, awardYear, year }
  return (
    <>
      <AddButton title={title} onclick={setOpen} dataCount={data ? data?.data.length : 0} />
      <DialogBox title={`${edit ? "Edit" : "Add"} ${title}`} buttonName="Submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={onSubmit} onCancel={onCancel} maxWidth="lg" loading={Loading}>
        <div className='flex flex-wrap'>
          <Text className='col-md-6 col-lg-4' id="patentNumber" value={patentNumber} label={tableHead.patentNumber} setState={setValues} />
          <Text className='col-md-6 col-lg-4' id="patentTitle" value={patentTitle} label={tableHead.patentTitle} setState={setValues} />
          <Select className='col-md-6 col-lg-4' id="isNat" value={isNat} label={tableHead.isNat} setState={setValues} options={Lists.patentIsNat} />
          <Text className='col-md-6 col-lg-4' id="awardYear" value={awardYear} label={tableHead.awardYear} setState={setValues} />

          <YearSelect className='col-md-6 col-lg-4' id="year" value={year} label={tableHead.year} setState={setValues} />
          <UploadFile className='col-md-6 col-lg-4' id="Upload_Proof" label={tableHead.proof} setState={setValues} required={!edit} />
        </div>
      </DialogBox>
      <Table TB={data?.data} module={module} getproof="proof" proof="faculty" fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={model} />
    </>
  )
}

export default StudentPatents
