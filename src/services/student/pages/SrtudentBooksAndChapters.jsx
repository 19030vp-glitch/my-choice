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

const tableHead = { index: 'Sr.No.', type: 'Type', titleOfBook: 'Title of Book / Chapter / Edited Book / Translation', chapterTitle: "Title of Chapter / Translation", paperTitle: 'Paper Title', transType: "Translation work", titleOfProceeding: 'Title of proceedings of the conference', conName: 'Conference Name', isNat: 'Wheather National / International', publicationYear: 'Year of Publication', issnNumber: 'ISBN/ISSN number of proceeding', aff: 'Affiliation Institute at the time of publication',publisherName: 'Publisher Name', year: 'Academic Year',  Proof: "Uploaded Proof", Action: "Action" }

const SrtudentBooksAndChapters = () => {
    const model = 'BooksAndChapters'
    const module = 'studentF'
    const title = "Books and Chapters published and papers in national/international conference proceedings"
  
    const user = useSelector(state => state.user.studentUser)
  
    const params = { model, id: user?._id, module}
    const { data, isLoading, refetch } = useQuery([model, params], () => getReq(params))
  
    const initialstate = { type: '', titleOfBook: '', chapterTitle: '', paperTitle: '-', transType: '', titleOfProceeding: '-', conName: '-', isNat: '', authorEditor: '', publicationYear: '', issnNumber: '', aff: '',publisherName: '', year: '', Upload_Proof: '' }
    const [values, setValues] = useState(initialstate)
    const { type, titleOfBook, chapterTitle, paperTitle, transType, titleOfProceeding, conName, isNat, publicationYear, issnNumber, aff,publisherName, year } = values
    const [open, setOpen] = useState(false)
  
    //---------------edit state-------------------
    const [itemToEdit, setItemToEdit] = useState(null)
    const [edit, setEdit] = useState(false);
    const [Loading, setLoading] = useState(false);
  
    useEffect(() => {
      if (itemToEdit && data.data) {
        data?.data.forEach((item) => {
          if (item?._id === itemToEdit) {
            const {type, titleOfBook, chapterTitle, paperTitle, transType, titleOfProceeding, conName, isNat, publicationYear, issnNumber, aff,publisherName, year} = item
            setEdit(true); setOpen(true);
            setValues({type, titleOfBook, chapterTitle, paperTitle, transType, titleOfProceeding, conName, isNat, publicationYear, issnNumber, aff,publisherName, year})
          }
        })
      }
    }, [itemToEdit])

    useEffect(()=>{
      if (type==="Book" || type==="Editor" || (type==="Translator" && transType==="Book")) {
        setValues((pri)=>{
          return{
            ...pri, chapterTitle: '-', paperTitle: '-', transType: transType==='Book'?'Book':"" , titleOfProceeding: '-', conName: '-',
          }
        })
      }
      else if (type==="Chapter" || (type==="Translator" && transType==="Research Paper / Chapter")) {
        setValues((pri)=>{
          return{
            ...pri, chapterTitle: '', paperTitle: '-', transType: transType==="Research Paper / Chapter"?"Research Paper / Chapter":'', titleOfProceeding: '-', conName: '-',
          }
        })
      }
      else if (type=="Conference") {
        setValues((pri)=>{
          return{
            ...pri, titleOfBook: '-', chapterTitle: '-', paperTitle: '', transType: '', titleOfProceeding: '', conName: '',
          }
        }) 
      }
    },[type,transType])
  
    const onCancel = () => {
      setValues(initialstate); setItemToEdit(null); setEdit(false); setOpen(false)
    }
    const onSubmit = (e) => {
      e.preventDefault();
      edit ? editReq({ id: itemToEdit }, model, initialstate, values, setValues, refetch, setOpen, setEdit, setItemToEdit, setLoading, module) :
      user.ResearchGuideId=== ''?addReq({ studentId: user?._id, schoolName: user.schoolName, guideName: user.ResearchGuide }, model, initialstate, values, setValues, refetch, setOpen, setLoading, module):
      addReq({ studentId: user?._id, userId: user.ResearchGuideId, schoolName: user.schoolName, guideName: user.ResearchGuide }, model, initialstate, values, setValues, refetch, setOpen, setLoading, module)
    }
    //{ type, titleOfBook, chapterTitle, paperTitle, transType, titleOfProceeding, conName, isNat, publicationYear, issnNumber, aff,publisherName, year }
    return (
      <>
        <AddButton title={title} onclick={setOpen} dataCount={data ? data?.data.length : 0} />
        <DialogBox title={`${edit ? "Edit" : "Add"} ${title}`} buttonName="Submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={onSubmit} onCancel={onCancel} maxWidth="lg" loading={Loading}>
          <div className='flex flex-wrap'>
            <Select className='col-md-6 col-lg-4' id="type" value={type} label={tableHead.type} setState={setValues} options={Lists.bookCapType} />
            <Text className='col-md-6 col-lg-4' id="titleOfBook" value={titleOfBook} label={tableHead.titleOfBook} setState={setValues} desable={type==="Conference"?true:false} />
            {type==="Translator"&&<Select className='col-md-6 col-lg-4' id="transType" value={transType} label={tableHead.transType} setState={setValues} options={Lists.bookCapTranswork} />}
            <Text className='col-md-6 col-lg-4' id="chapterTitle" value={chapterTitle} label={tableHead.chapterTitle} setState={setValues} desable={["Book", "Editor","Conference"].includes(type)|| transType==="Book"?true:false} />
            <Text className='col-md-6 col-lg-4' id="paperTitle" value={paperTitle} label={tableHead.paperTitle} setState={setValues} desable={type==="Conference"?false:true} />
            <Text className='col-md-6 col-lg-4' id="titleOfProceeding" value={titleOfProceeding} label={tableHead.titleOfProceeding} setState={setValues} desable={type==="Conference"?false:true} />
            <Text className='col-md-6 col-lg-4' id="conName" value={conName} label={tableHead.conName} setState={setValues} desable={type==="Conference"?false:true} />
            <Select className='col-md-6 col-lg-4' id="isNat" value={isNat} label={tableHead.isNat} setState={setValues} options={type==="Conference"?Lists.patentIsNat:Lists.bookChapConfIsNat} />
            <Text className='col-md-6 col-lg-4' type='number' id="publicationYear" value={publicationYear} label={tableHead.publicationYear} setState={setValues} />
            <Text className='col-md-6 col-lg-4' id="issnNumber" value={issnNumber} label={tableHead.issnNumber} setState={setValues} />
            <Text className='col-md-6 col-lg-4' id="aff" value={aff} label={tableHead.aff} setState={setValues} />
            <Text className='col-md-6 col-lg-4' id="publisherName" value={publisherName} label={tableHead.publisherName} setState={setValues} />
            <YearSelect className='col-md-6 col-lg-4' id="year" value={year} label={tableHead.year} setState={setValues} />
            <UploadFile className='col-md-6 col-lg-4' id="Upload_Proof" label={tableHead.Proof} setState={setValues} required={!edit} />
          </div>
        </DialogBox>
        <Table TB={data?.data} module={module} getproof="proof" proof="faculty" fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={model} />
      </>
    )
}

export default SrtudentBooksAndChapters
