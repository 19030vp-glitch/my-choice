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
import { FormCheck, IndexLink } from '../../faculty/tables/ResearchPapersUGC'

const tableHead = { index: "Sr.No.", paperTitle:'Paper Title', journalName:'Journal Name', authors:'Author(s)', publicationYear:'Publication Year', issnNumber:'ISSN Number', indexedIn:'Indexed in', indexLink:'Links', year: 'Academic Year', Proof: 'Upload Proof', Action: "Action" }
const StudentResearchPapers = () => {
  const model = 'ResearchPapers'
  const module = 'studentF'
  const title = 'Research Papers in the Journals notified by UGC'

  const user = useSelector(state => state.user.studentUser)

  const params = { model, id: user?._id, module}
  const { data, isLoading, refetch } = useQuery([model, params], () => getReq(params))

  const initialstate = { paperTitle: '', journalName: '', authors: '', publicationYear: '', issnNumber: '',indexedIn:'', indexLink:'', year: '', Upload_Proof: '' }
  const [values, setValues] = useState(initialstate)
  const { paperTitle, journalName, authors, publicationYear, issnNumber,  year } = values
  const [open, setOpen] = useState(false)

  //---------------edit state-------------------
  const [itemToEdit, setItemToEdit] = useState(null)
  const [edit, setEdit] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [indexData, setIndexData] = useState([])
  const [indexLinkData, setIndexLinkData] = useState({})

  useEffect(() => {
    if (itemToEdit && data.data) {
      data?.data.forEach((item) => {
        if (item?._id === itemToEdit) {
          const { paperTitle, journalName, authors, publicationYear, issnNumber, year } = item
          setEdit(true); setOpen(true);
          setValues({ paperTitle, journalName, authors, publicationYear, issnNumber, year })
          setIndexData(item.indexedIn ? item.indexedIn?.split(', ')?.map(item => item.trim()) : [])
          setIndexLinkData(item.indexLink ? item.indexLink?.split(', ')?.reduce((acc, entry) => (parts => (acc[parts[0].trim()] = parts[1].trim(), acc))(entry.split(': ')), {}): {})
        }
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemToEdit])

  useEffect(()=>{
    if (indexData) {
      setValues((pri)=>{
        return{
          ...pri, indexedIn: indexData?.join(", ")
        }
      })
    }
    else{
      setValues((pri)=>{
        return{
          ...pri, indexLink: Object.entries(indexLinkData).map(([key, value]) => `${key}: ${value}`).join(", ")
        }
      })
    }
  },[indexData,indexLinkData])

  const onCancel = () => {
    setValues(initialstate); setItemToEdit(null); setEdit(false); setOpen(false); setIndexData([]); setIndexLinkData({})
  }
  const onSubmit = (e) => {
    e.preventDefault();
    edit ? editReq({ id: itemToEdit,  indexData, indexLinkData }, model, initialstate, values, setValues, refetch, setOpen, setEdit, setItemToEdit, setLoading, module) :
    user.ResearchGuideId=== ''?addReq({ patenterName: user?.name, studentId: user?._id, schoolName: user.schoolName, guideName: user.ResearchGuide, indexData, indexLinkData }, model, initialstate, values, setValues, refetch, setOpen, setLoading, module):
    addReq({ patenterName: user?.name, studentId: user?._id, userId: user.ResearchGuideId,  indexData, indexLinkData, schoolName: user.schoolName, guideName: user.ResearchGuide}, model, initialstate, values, setValues, refetch, setOpen, setLoading, module)
    setIndexData([]); setIndexLinkData({})
  }
  //{ paperTitle, journalName, authors, publicationYear, issnNumber, indexedIn, indexLink, year }
  return (
    <>
      <AddButton title={title} onclick={setOpen} dataCount={data ? data?.data.length : 0} />
      <DialogBox title={`${edit ? "Edit" : "Add"} ${title}`} buttonName="Submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={onSubmit} onCancel={onCancel} maxWidth="lg" loading={Loading} >
        <div className='flex flex-wrap'>
          <Text className='col-md-6 col-lg-4' id="paperTitle" value={paperTitle} label={tableHead.paperTitle} setState={setValues} />
          <Text className='col-md-6 col-lg-4' id="journalName" value={journalName} label={tableHead.journalName} setState={setValues} />
          <Text className='col-md-6 col-lg-4' id="authors" value={authors} label={tableHead.authors} setState={setValues} />
          <Text className='col-md-6 col-lg-4' type='number' id="publicationYear" value={publicationYear} label={tableHead.publicationYear} setState={setValues} />
          <Text className='col-md-6 col-lg-4' id="issnNumber" value={issnNumber} label={tableHead.issnNumber} setState={setValues} />

          <div className="col-md-4">
              <label htmlFor="indexedIn">Indexed in</label>
              <div id="indexedIn" className="border mt-2 p-1 rounded-sm border-gray-400">
                  <FormCheck setIndexData={setIndexData} indexData={indexData} id="Scopus" />
                  <FormCheck setIndexData={setIndexData} indexData={indexData} id="Web of Science" />
                  <FormCheck setIndexData={setIndexData} indexData={indexData} id="UGC Care List" />
              </div>
          </div>

          <div className="row g-2">
            <IndexLink placeholder="Enter Scopus Link" indexLinkData={indexLinkData} setIndexLinkData={setIndexLinkData} id="Scopus" indexData={indexData} />
            <IndexLink placeholder="Enter Web of Science Link" indexLinkData={indexLinkData} setIndexLinkData={setIndexLinkData} id="Web of Science" indexData={indexData} />
            <IndexLink placeholder="Enter UGC Care List Link" indexLinkData={indexLinkData} setIndexLinkData={setIndexLinkData} id="UGC Care List" indexData={indexData} />
          </div>

          <YearSelect className='col-md-6 col-lg-4' id="year" value={year} label={tableHead.year} setState={setValues} />
          <UploadFile className='col-md-6 col-lg-4' id="Upload_Proof" label={tableHead.Proof} setState={setValues} required={!edit} />
        </div>
      </DialogBox>
      <Table TB={data?.data} module={module} getproof="proof" proof="faculty" fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={model} />
    </>
  )
}

export default StudentResearchPapers
