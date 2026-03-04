import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Text from '../../../inputs/Text';
import File from '../../../inputs/File';
import Year, { academicYearGenerator } from '../../../inputs/Year';
import { submitWithFile } from '../js/submit';
import handleEditWithFile from '../js/handleEditWithFile';
import FormWrapper from '../components/FormWrapper';
import { Dialog, DialogContent } from '@mui/material';
import BulkExcel from '../../../components/BulkExcel';
import Lists from '../../../components/tableComponents/Lists';
import allTableHeads from '../../admin/js/allTableHeads';
import TableComponent from '../../../components/tableComponents/TableComponent';
import AddButton from '../../director/components/UtilityComponents/AddButton';
import useFetchData from '../../../hooks/useFetchData';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';


const tableHead = { index: 'Sr.No.', type: 'Type', titleOfBook: 'Title of Book / Chapter / Edited Book / Translation', chapterTitle: "Title of Chapter / Translation", paperTitle: 'Paper Title', transType: "Translation work", titleOfProceeding: 'Title of proceedings of the conference', conName: 'Conference Name', isNat: 'Wheather National / International', publicationYear: 'Year of Publication', issnNumber: 'ISBN/ISSN number of proceeding', aff: 'Affiliation Institute at the time of publication', publisherName: 'Publisher Name', year: 'Academic Year', Proof: "Uploaded Proof", Action: "Action" }

const BooksAndChapters = ({ academicYear, showTable = true, title, propType = "Book", showConferenceOnly = false, extraFilter = {} }) => {

    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);
    const [data, setData] = useState(null)

    const user = useSelector(state => state.user.user);

    const module = "faculty";
    const model = "BookAndChapter";
    const getproof = "proof"
    const filter = { userId: user?._id }
    if (academicYear) {
        filter.year = { $in: academicYear }
    }
    if (extraFilter) {
        Object.assign(filter, extraFilter)
    }
    const { data: serverData, isLoading, refetch } = useFetchData(model, module, filter, showTable, setData)


    //states
    const [bookTitle, setBookTitle] = useState('')
    const [paperTitle, setPaperTitle] = useState('-')
    const [conTitle, setConTitle] = useState('-')
    const [conName, setConName] = useState('-')
    const [nat, setNat] = useState('')
    const [transType, setTransType] = useState('-')
    const [issn, setIssn] = useState('')
    const [aff, setAff] = useState('')
    const [pubName, setPubName] = useState('')
    const [pubDate, setPubDate] = useState('')
    const [chapterTitle, setChapterTitle] = useState('')
    const [proof, setProof] = useState(null)
    const [year, setYear] = useState('')
    const [type, setType] = useState(null)
    const [editId, setEditId] = useState(null)


    const typeObject = {
        type: Lists.bookCapType, titleOfBook: 'text', paperTitle: 'text', titleOfProceeding: 'text', conName: 'text', isNat: Lists.bookChapConfIsNat, publicationYear: 'number', issnNumber: 'text', aff: 'text', year: academicYearGenerator(29, true, true), publisherName: 'text'
    }
    const [editModal, setEditModal] = useState(false)
    const [itemToDelete, setItemToDelete] = useState('')
    const [isFormOpen, setIsFormOpen] = useState(false)


    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true)

        let formData = new FormData()
        formData.append('type', type)
        formData.append('titleOfBook', bookTitle)
        formData.append('paperTitle', paperTitle)
        formData.append('transType', transType)
        formData.append('titleOfProceeding', conTitle)
        formData.append('conName', conName)
        formData.append('isNat', nat)
        formData.append('chapterTitle', chapterTitle)
        formData.append('publicationYear', pubDate)
        formData.append('issnNumber', issn)
        formData.append('aff', aff)
        formData.append('publisherName', pubName)
        formData.append('year', year)
        formData.append('file', proof)
        formData.append('userId', user?._id)
        console.log(...formData)
        clearStates()
        submitWithFile(formData, model, refetch, setLoading, () => { }, setIsFormOpen, clearStates)
    }

    // make states together
    function handleChange(e) {
        e.preventDefault();
        setLoading(true)

        // arrange form Data
        let formData = new FormData()
        formData.append('itemId', itemToDelete._id)
        formData.append('proof', itemToDelete.proof)
        formData.append('type', type)
        formData.append('transType', transType)
        formData.append('titleOfBook', bookTitle)
        formData.append('chapterTitle', chapterTitle)
        formData.append('paperTitle', paperTitle)
        formData.append('titleOfProceeding', conTitle)
        formData.append('conName', conName)
        formData.append('isNat', nat)
        formData.append('publicationYear', pubDate)
        formData.append('issnNumber', issn)
        formData.append('aff', aff)
        formData.append('publisherName', pubName)
        formData.append('year', year)
        formData.append('file', proof)
        clearStates()

        handleEditWithFile(formData, model, setEditModal, refetch, setLoading, setIsFormOpen)
    }

    function pencilClick(itemId) {
        setEditId(itemId)
        data?.data?.forEach(function (item) {
            if (item._id === itemId) {
                setType(item.type)
                setBookTitle(item.titleOfBook)
                setPaperTitle(item.paperTitle)
                setConTitle(item.titleOfProceeding)
                setTransType(item.transType)
                setChapterTitle(item.chapterTitle)
                setConName(item.conName)
                setNat(item.isNat)
                setIssn(item.issnNumber)
                setAff(item.aff)
                setPubName(item.publisherName)
                setPubDate(item.publicationYear)
                setYear(item.year)
                setProof(item.file)
                setItemToDelete(item)
                setIsFormOpen(true)
            }
        })
        setEditModal("Editing")
    }

    // function to clear states to '' 
    function clearStates() {
        setType(propType)
        setBookTitle('')
        setChapterTitle('')
        setPaperTitle('-')
        setConTitle('-')
        setConName('-')
        setNat('')
        setIssn('')
        setAff('')
        setTransType('-')
        setPubName('')
        setPubDate('')
        setYear('')
        setProof('')
        setEditModal('Adding')
    }

    useEffect(() => {

        if (editModal === 'Editing') {

            data?.data?.forEach(function (item) {
                if (item._id === editId) {
                    console.log(item)
                    setNat(item.isNat)
                    setIssn(item.issnNumber)
                    setAff(item.aff)
                    setPubName(item.publisherName)
                    setPubDate(item.publicationYear)
                    setYear(item.year)
                    if (type === 'Conference') {
                        setBookTitle('-')
                        setChapterTitle('-')
                        setPaperTitle(item.paperTitle)
                        setConTitle(item.titleOfProceeding)
                        setConName(item.conName)
                    } else if (type === 'Chapter' || type === 'Translator') {
                        setPaperTitle('-')
                        setConTitle('-')
                        setConName('-')
                        setBookTitle(item.titleOfBook)
                        setChapterTitle(item.chapterTitle)

                        if (type === 'Translator' && transType === 'Book') {
                            setChapterTitle("-")
                        }
                    } else {
                        setPaperTitle('-')
                        setConTitle('-')
                        setConName('-')
                        setChapterTitle("-")
                        setBookTitle(item.titleOfBook)
                    }
                }
            })

        } else {
            if (type === 'Conference') {
                setBookTitle('-')
                setChapterTitle('-')
                setPaperTitle('')
                setConTitle('')
                setConName('')
            } else if (type === 'Chapter' || type === 'Translator') {
                setPaperTitle('-')
                setConTitle('-')
                setConName('-')
                setChapterTitle('')
                if (type === 'Translator' && transType === 'Book') {
                    setChapterTitle("-")
                }
            } else {
                setPaperTitle('-')
                setConTitle('-')
                setConName('-')
                setBookTitle('')
                setChapterTitle('-')

            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type, editModal, transType])



    return (
        <div>
            <AddButton icon={<MenuBookRoundedIcon />} serverData={serverData} setData={setData} getproof={getproof} model={model} module={module} title={title} filter={filter} year={year} serviceName={module} onclick={setIsFormOpen} exceldialog={setOpen} customName={title} filterByAcademicYear={true} dataCount={data ? data?.data?.length : 0} showTable={showTable} tableHead={tableHead} BulkExcelOption={false} />

            <BulkExcel proof={getproof} tableHead={allTableHeads.BookAndChapter} typeObject={typeObject} commonFilds={{ userId: user?._id, schoolName: user?.department }} title={'Book And Chapter'} SendReq={model} refetch={refetch} module={module} open={open} setOpen={setOpen} />

            <Dialog fullWidth maxWidth='lg' open={isFormOpen}>
                <DialogContent >
                    <FormWrapper action={editModal === 'Editing' ? 'Editing' : 'Adding'} loading={loading} cancelFunc={() => { setEditModal(false); clearStates() }} onSubmit={editModal === 'Editing' ? handleChange : handleSubmit} setIsFormOpen={setIsFormOpen}>
                        <p className='text-2xl font-bold my-3'>{editModal === 'Editing' ? 'Edit Book/Chapter' : 'Add a new Book/Chapter'}</p>


                        <div className="col-md-4">

                            <label htmlFor="type" className="form-label">Choose Type</label>
                            <select className="form-select" id="type" required
                                value={type} onChange={(e) => { setType(e.target.value) }}>
                                <option disabled selected value="">Choose</option>

                                {
                                    showConferenceOnly ? <option value="Conference">Conference</option>
                                        :
                                        <>
                                            <option value="Book">Book</option>
                                            <option value="Chapter">Chapter</option>
                                            <option value="Editor">Editor</option>
                                            <option value="Translator">Translator</option>
                                            <option value="Conference">Conference</option>
                                        </>
                                }

                            </select>
                        </div>

                        <Text title='Title of Book / Edited Book / Translation' state={bookTitle} setState={setBookTitle} disabled={type === 'Conference' ? true : false} />

                        {
                            type === 'Translator' && <div className="col-md-4">

                                <label htmlFor="validationCustom05" className="form-label">Translation work</label>
                                <select className="form-select" id="validationCustom05" required
                                    value={transType} onChange={(e) => { setTransType(e.target.value) }}>
                                    <option selected disabled value="">Choose</option>

                                    <option value="Research Paper / Chapter">Research Paper / Chapter</option>
                                    <option value="Book">Book</option>

                                </select>
                            </div>
                        }


                        <Text title='Title of Chapter / Translation' state={chapterTitle} setState={setChapterTitle} disabled={type === 'Book' || type === 'Editor' || type === 'Conference' || transType === 'Book' ? true : false} />


                        <Text title='Paper Title' state={paperTitle} setState={setPaperTitle} disabled={type !== 'Conference' ? true : false} />
                        <Text title='Title of proceedings of the conference' state={conTitle} setState={setConTitle} disabled={type !== 'Conference' ? true : false} />

                        <Text title='Conference Name' disabled={type !== 'Conference' ? true : false} state={conName} setState={setConName} />

                        <div className="col-md-4">

                            <label htmlFor="validationCustom05" className="form-label">Wheather National / International</label>
                            <select className="form-select" id="validationCustom05" required
                                value={nat} onChange={(e) => { setNat(e.target.value) }}>
                                <option selected disabled value="">Choose</option>
                                {
                                    type === 'Conference' ? <>
                                        <option value="State/University">State/University</option>
                                        <option value="National">National</option>
                                        <option value="International (Abroad)">International (Abroad)</option>
                                        <option value="International (within country)">International (within country)</option>
                                    </> : <>
                                        <option value="National">National</option>
                                        <option value="International">International</option>
                                    </>
                                }
                            </select>
                        </div>
                        <Text space='col-md-4' title='Year of Publication' type="number" state={pubDate} setState={setPubDate} />
                        <Text title='ISBN/ISSN number of proceeding' state={issn} setState={setIssn} />
                        <Text title='Affiliation Institute at the time of publication' state={aff} setState={setAff} />
                        <Year state={year} setState={setYear} />
                        <Text space='col-md-6' title='Publisher Name' state={pubName} setState={setPubName} />

                        <File title='Upload Proof' setState={setProof} />

                    </FormWrapper>
                </DialogContent>
            </Dialog>

            {showTable && <TableComponent TB={data?.data} module={module} getproof={getproof} proof={module} fatchdata={refetch} setItemToEdit={pencilClick} isLoading={isLoading} tableHead={tableHead} SendReq={model} />}
        </div >
    )
}






export default BooksAndChapters
