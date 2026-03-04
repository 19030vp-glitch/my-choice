/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import FindInPageRoundedIcon from '@mui/icons-material/FindInPageRounded';
import { useSelector } from 'react-redux';
import Text from '../../../inputs/Text';
import File from '../../../inputs/File';
import Year, { academicYearGenerator } from '../../../inputs/Year';
import { submitWithFile } from '../js/submit';
import handleEditWithFile from '../js/handleEditWithFile';
import Loader from '../../../components/Loader';
import FormWrapper from '../components/FormWrapper';
import { Dialog, DialogContent } from '@mui/material';
import BulkExcel from '../../../components/BulkExcel';
import TableComponent from '../../../components/tableComponents/TableComponent';
import { modifyObject } from '../components/FacultyMainTable';
import allTableHeads from '../../admin/js/allTableHeads';
import AddButton from '../../director/components/UtilityComponents/AddButton';
import useFetchData from '../../../hooks/useFetchData';

const ResearchPapersUGC = ({ filterByAcademicYear = false, academicYear, showTable = true, title, extraFilter }) => {


    const user = useSelector(state => state.user.user);
    const module = "faculty";
    const model = "ResearchPaper";
    const getproof = "proof"
    const getproof2 = "ifProof"
    const link = "indexLink"


    const filter = { userId: user?._id }
    if (academicYear) {
        filter.year = { $in: academicYear }
    }
    if (extraFilter) {
        Object.assign(filter, extraFilter)
    }

    const [data, setData] = useState(null)
    const { data: serverData, isLoading, refetch } = useFetchData(model, module, filter, showTable, setData)

    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);

    //states
    const [paperTitle, setPaperTitle] = useState('')
    const [authors, setAuthors] = useState('')
    const [journalName, setJournalName] = useState('')
    const [pubYear, setPubYear] = useState('')
    const [issn, setIssn] = useState('')
    const [ugc, setUgc] = useState('')
    const [proof, setProof] = useState(null)
    const [year, setYear] = useState('2024-25')
    const [active, setActive] = useState(false);
    const [impactFactor, setImpactFactor] = useState('');
    const [ifProof, setIFProof] = useState(null)

    const [editModal, setEditModal] = useState(false)
    const [itemToDelete, setItemToDelete] = useState('')
    const [isFormOpen, setIsFormOpen] = useState(false)


    const tableHead = modifyObject(allTableHeads.ResearchPaper)
    const typeObject = {
        paperTitle: 'text', journalName: 'text', authors: "text", publicationYear: 'number', issnNumber: 'text', year: academicYearGenerator(29, true, true)
    }


    // indexedIn management
    const [indexData, setIndexData] = useState([])
    const [indexLinkData, setIndexLinkData] = useState({})


    //functions

    function handleSubmit(e) {
        e.preventDefault();

        setLoading(true)
        let formData = new FormData()
        formData.append('paperTitle', paperTitle)
        formData.append('journalName', journalName)
        formData.append('authors', authors)
        formData.append('publicationYear', pubYear)
        formData.append('indexedIn', indexData?.join(", "))
        formData.append('indexData', indexData)
        formData.append('indexLink', Object.entries(indexLinkData).map(([key, value]) => `${key}: ${value}`).join(", "))
        formData.append('indexLinkData', indexLinkData)
        formData.append('issnNumber', issn)
        formData.append('recLink', ugc)
        formData.append('year', year)
        formData.append('impactFactor', impactFactor)
        formData.append('active', active)
        formData.append('ifProof', ifProof)
        formData.append('file', proof)
        formData.append('userId', user?._id)

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
        formData.append('paperTitle', paperTitle)
        formData.append('authors', authors)
        formData.append('indexedIn', indexData?.join(", "))
        formData.append('indexData', indexData)
        formData.append('indexLink', indexData[0] === "Not Indexed" ? "N/A" : Object.entries(indexLinkData).map(([key, value]) => value && `${key}: ${value}`).join(", "))
        formData.append('indexLinkData', indexLinkData)
        formData.append('journalName', journalName)
        formData.append('publicationYear', pubYear)
        formData.append('issnNumber', issn)
        formData.append('recLink', ugc)
        formData.append('impactFactor', impactFactor)
        formData.append('ifProof', ifProof ? ifProof : itemToDelete?.proof)
        formData.append('active', active)
        formData.append('year', year)
        formData.append('file', proof ? proof : itemToDelete?.proof)

        clearStates()
        handleEditWithFile(formData, model, setEditModal, refetch, setLoading, setIsFormOpen)

    }


    function pencilClick(itemId) {
        data?.data?.forEach(function (item) {
            if (item._id === itemId) {
                setPaperTitle(item.paperTitle)
                setJournalName(item.journalName)
                setPubYear(item.publicationYear)
                setIssn(item.issnNumber)
                setAuthors(item.authors)
                setActive(item?.isIFActive)
                setUgc(item.recLink)
                setIndexData(item.indexedIn ? item.indexedIn?.split(', ')?.map(item => item.trim()) : [])
                setIndexLinkData(item.indexLink ? item.indexLink?.split(', ')?.reduce((acc, entry) => (parts => (acc[parts[0].trim()] = parts[1]?.trim(), acc))(entry.split(': ')), {})
                    : {})
                setYear(item.year)
                setProof(item.file)
                setIFProof(item?.ifProof)
                setImpactFactor(item?.impactFactor || '')
                setItemToDelete(item)
                setIsFormOpen(true)
                setEditModal("Editing")
            }
        })
    }

    // function to clear states to '' 
    function clearStates() {
        setPaperTitle('')
        setAuthors('')
        setJournalName('')
        setPubYear('')
        setIndexData([])
        setIndexLinkData({})
        setIssn('')
        setUgc('')
        setYear('')
        setImpactFactor('')
        setActive(false)
        setProof(null)
        setIFProof(null)
        setEditModal(false)
    }


    useEffect(() => {
        if (!editModal) {
            setImpactFactor('');
        }

        if (indexData.includes("Not Indexed") && !indexData.every(item => item === "Not Indexed")) {
            setIndexData(["Not Indexed"]);
            setIndexLinkData(() => null)
        }

    }, [editModal, indexData]);

    console.log(indexLinkData)



    return (
        <div>
            <AddButton serverData={serverData} setData={setData} getproof={getproof} getproof2={getproof2} model={model} module={module} title={title} filter={filter} year={year} serviceName={module} onclick={setIsFormOpen} exceldialog={setOpen} customName={title} filterByAcademicYear={true} dataCount={data ? data?.data?.length : 0}
                showTable={showTable} tableHead={tableHead} icon={<FindInPageRoundedIcon className='text-lg' />} link={link} />

            <BulkExcel proof={getproof} tableHead={tableHead} typeObject={typeObject} commonFilds={{ userId: user?._id }} sampleFile='ResearchPaperFaculty' title='Research Paper' SendReq={model} refetch={refetch} module={module} department={user?._id} open={open} setOpen={setOpen} link={link} />

            {/* // 2. FIELDS */}

            <Dialog fullWidth maxWidth='lg' open={isFormOpen}>
                <DialogContent >
                    <FormWrapper action={editModal ? 'Editing' : 'Adding'} loading={loading} cancelFunc={() => { setEditModal(false); clearStates() }} onSubmit={editModal === 'Editing' ? handleChange : handleSubmit} setIsFormOpen={setIsFormOpen}>
                        <p className='text-2xl font-bold my-3'>{editModal === 'Editing' ? 'Edit Row' : 'Add a new Content'}</p>

                        <Text title='Paper Title' state={paperTitle} setState={setPaperTitle} />
                        <Text title='Journal Name' state={journalName} setState={setJournalName} />
                        <Text title='Author(s)' state={authors} setState={setAuthors} />
                        <Text title='Publication Year' type="number" state={pubYear} setState={setPubYear} />
                        <Text title='ISSN Number' state={issn} setState={setIssn} />
                        <Year state={year} setState={setYear} />

                        <div className="col-md-4">
                            <label htmlFor="indexedIn">Indexed in</label>
                            <div id="indexedIn" className="border mt-2 p-1 rounded-sm border-gray-400">
                                <FormCheck setIndexData={setIndexData} indexData={indexData} id="Scopus" />
                                <FormCheck setIndexData={setIndexData} indexData={indexData} id="Web of Science" />
                                <FormCheck setIndexData={setIndexData} indexData={indexData} id="UGC Care List" />
                                <FormCheck setIndexData={setIndexData} indexData={indexData} id="Not Indexed" title="Not indexed in above list" />
                            </div>
                        </div>

                        <div className="row g-2">

                            <IndexLink placeholder="Enter Scopus Link" indexLinkData={indexLinkData} setIndexLinkData={setIndexLinkData} id="Scopus" indexData={indexData} />
                            <IndexLink placeholder="Enter Web of Science Link" indexLinkData={indexLinkData} setIndexLinkData={setIndexLinkData} id="Web of Science" indexData={indexData} />
                            <IndexLink placeholder="Enter UGC Care List Link" indexLinkData={indexLinkData} setIndexLinkData={setIndexLinkData} id="UGC Care List" indexData={indexData} />

                        </div>
                        <div className='col-md-5 border rounded-md mt-5'>
                            <div className="form-check form-switch py-[0.20rem] mt-[0.28rem]">
                                <input className="form-check-input" checked={active} onChange={(e) => { setActive(e.target.checked) }} type="checkbox" role="switch" id={"IF"} />
                                <label className="form-check-label" htmlFor={"IF"}>Do you have Impact Factor for this paper?</label>
                            </div>
                        </div>
                        {
                            active && <>
                                <Text space="col-md-2" title='Impact Factor' state={impactFactor} setState={setImpactFactor} />
                                <File space='col-md-5' title='Upload Impact Factor Proof' setState={setIFProof} />
                            </>
                        }
                        <File space='col-md-16' title='Upload Proof' setState={setProof} />

                    </FormWrapper>
                </DialogContent>
            </Dialog>



            {/* Table */}
            {
                showTable && <div className='mt-2 overflow-auto change__scrollbar mb-2  text-sm sm:text-base'>
                    <TableComponent TB={data?.data} module={module} getproof={getproof} proof={module} fatchdata={refetch} setItemToEdit={pencilClick} isLoading={isLoading} tableHead={tableHead} SendReq={model} link={link} getproof2={getproof2} />
                    {
                        isLoading && <Loader />
                    }
                </div>
            }
        </div>
    )
}

export default ResearchPapersUGC


const FormCheck = ({ id, setIndexData, indexData, title = null }) => {
    return <div className="form-check">
        <input className="form-check-input" type="checkbox"
            onChange={(e) => {
                e.target.checked ? setIndexData([...indexData, id]) : setIndexData(indexData.filter(item => item !== id))
            }} checked={indexData?.includes(id)} id={id} />
        <label className="form-check-label" htmlFor={id}>
            {title || id}
        </label>
    </div>
}

const IndexLink = ({ placeholder, id, indexLinkData, setIndexLinkData, indexData }) => {
    useEffect(() => {
        if (indexData) {
            if (!indexData.includes(id)) {
                setIndexLinkData((prev) => {
                    return { ...prev, [id]: '' }
                })
            }
        }
    }, [indexData])



    return <div className="col">
        <input type="text" value={indexLinkData?.[id] || ""} className='form-control col-md-4' onChange={(e) => {
            setIndexLinkData({ ...indexLinkData, [id]: e.target.value })
        }} placeholder={placeholder} disabled={!indexData.includes(id)} />
    </div>
}

export { FormCheck, IndexLink }