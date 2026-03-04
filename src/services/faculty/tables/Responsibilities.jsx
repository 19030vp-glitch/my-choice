import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { submitWithFile } from '../js/submit';
import Loader from '../../../components/Loader';
import FormWrapper from '../components/FormWrapper';
import { Dialog, DialogContent } from '@mui/material';
import BulkExcel from '../../../components/BulkExcel';
import File from '../../../inputs/File';
import handleEditWithFile from '../js/handleEditWithFile';
import { toast } from 'react-hot-toast';
import FromToDate from '../../../inputs/FromToDate';
import TableComponent from '../../../components/tableComponents/TableComponent';
import { modifyObject } from '../components/FacultyMainTable';
import allTableHeads from '../../admin/js/allTableHeads';
import AddButton from '../../director/components/UtilityComponents/AddButton';
import useFetchData from '../../../hooks/useFetchData';
import SchoolIcon from '@mui/icons-material/School';


const Responsibities = ({ academicYear, showTable = true, title, extraFilter = {} }) => {
    const model = "Responsibilities";
    const module = "faculty";
    const getproof = "proof";
    const user = useSelector(state => state.user.user)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);

    const filter = { userId: user?._id }
    if (academicYear) {
        filter.year = { $in: academicYear }
    }
    if (extraFilter) {
        Object.assign(filter, extraFilter)
    }
    const [data, setData] = useState(null)
    const { data: serverData, isLoading, refetch } = useFetchData(model, module, filter, showTable, setData)

    // states
    const [committeeName, setCommitteeName] = useState(null)
    const [designation, setDesignation] = useState(null)
    const [institute, setInstitute] = useState(null)
    const [year, setYear] = useState([])
    const [proof, setProof] = useState(null)
    const [duration, setDuration] = useState(null)
    const [fromDate, setFromDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [active, setActive] = useState(false)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [itemToDelete, setItemToDelete] = useState('')
    const [editItem, setEditItem] = useState(null)
    const typeObject = {
        designation: 'text', committeeName: 'text', institute: 'text'
    }
    const tableHead = modifyObject(allTableHeads.Responsibilities)

    useEffect(() => {
        if (active) {
            setDuration(`${fromDate} to Till Date`)
            setYear([fromDate, endDate])
        } else {
            setDuration(`${fromDate} to ${endDate}`)
            setYear([fromDate, endDate])
        }
    }, [fromDate, endDate, active])


    function handleSubmit(e) {
        e.preventDefault();
        if (year.length === 0) {
            toast.error('Please select year(s)')
        } else if (year.length === 1) {
            setYear([fromDate, endDate])
        } else {
            setLoading(true)
            let formData = new FormData()
            formData.append('committeeName', committeeName)
            formData.append('designation', designation)
            formData.append('institute', institute)
            formData.append('duration', duration)
            formData.append('active', active)
            formData.append('durationYears', JSON.stringify(year))
            formData.append('file', proof)
            formData.append('userId', user?._id)
            clearStates()
            submitWithFile(formData, 'Responsibilities', refetch, setLoading, () => { }, setIsFormOpen, clearStates)
        }
    }


    // make states together
    function handleChange(e) {
        e.preventDefault();
        setLoading(true)

        if (year.length === 0) {
            toast.error('Please select year(s)')
        } else if (year.length === 1) {
            setYear([fromDate, endDate])
        } else {
            // arrange form Data
            let formData = new FormData()
            formData.append('itemId', itemToDelete._id)
            formData.append('proof', itemToDelete.proof)
            formData.append('committeeName', committeeName)
            formData.append('designation', designation)
            formData.append('institute', institute)
            formData.append('active', active)
            formData.append('duration', duration)
            formData.append('durationYears', JSON.stringify(year))
            formData.append('file', proof)
            clearStates()

            handleEditWithFile(formData, model, setEditModal, refetch, setLoading, setIsFormOpen)
        }
    }


    function pencilClick(itemId) {
        data?.data?.forEach(function (item) {
            if (item._id === itemId) {
                setEditItem(item)
                setCommitteeName(item.committeeName)
                setInstitute(item.institute)
                setDuration(item.duration)
                setDesignation(item.designation)

                if (item.durationYears?.[0]?.includes(',') || item.durationYears?.[0]?.length > 7) {
                    setYear(() => [])
                    setFromDate(() => null)

                } else {
                    setYear(() => item.durationYears)
                    setFromDate(() => item.durationYears[0] || null)
                }

                setActive(item.active === undefined ? false : item.active)
                setItemToDelete(item)
                setIsFormOpen(true)
                setEditModal("Editing")
            }
        })
    }

    // function to clear states to '' 
    function clearStates() {
        setCommitteeName('')
        setInstitute('')
        setDuration('')
        setDesignation('')
        setYear('')
        setActive(false)
        setFromDate(null)
        setEndDate(null)
        setEditModal(false)
    }



    return (
        <div className="">
            <AddButton icon={<SchoolIcon />} serverData={serverData} setData={setData} getproof={getproof} model={model} module={module} title={title} filter={filter}
                year={year} serviceName={module} onclick={setIsFormOpen} exceldialog={setOpen} customName={title} filterByAcademicYear={true} dataCount={data ? data?.data?.length : 0}
                showTable={showTable} data={data?.data} tableHead={tableHead} />

            <BulkExcel data={data?.data} proof={getproof} tableHead={tableHead} typeObject={typeObject} commonFilds={{ userId: user?._id }} sampleFile={model} title={title} SendReq={model} refetch={refetch} module={module} department={user?._id} open={open} setOpen={setOpen} />
            {/* // 2. FIELDS */}


            <Dialog fullWidth maxWidth='lg' open={isFormOpen}>
                <DialogContent >
                    <FormWrapper action={editModal ? "Editing" : "Adding"} loading={loading} cancelFunc={() => { setEditModal(false); clearStates() }} onSubmit={editModal ? handleChange : handleSubmit} setIsFormOpen={setIsFormOpen}>
                        <p className='text-2xl font-bold my-3'>{editModal ? "Edit Responsibility" : "Add a new Responsibility"}</p>

                        <div className="col-md-4">
                            <label htmlFor="validationCustom02" className="form-label">Designation</label>
                            <input type="text" className="form-control" id="validationCustom02" required value={designation} onChange={(e) => { setDesignation(e.target.value) }} />

                        </div>

                        <div className="col-md-4">
                            <label htmlFor="validationCustom01" className="form-label">Name of the Committee</label>
                            <input type="text" className="form-control" id="validationCustom01" required value={committeeName} onChange={(e) => { setCommitteeName(e.target.value) }} />

                        </div>

                        <div className="col-md-4">
                            <label htmlFor="validationCustom02" className="form-label">Hosting institute name</label>
                            <input type="text" className="form-control" id="validationCustom02" required value={institute} onChange={(e) => { setInstitute(e.target.value) }} />

                        </div>


                        <FromToDate activeTitle="Are you still active under this responsibility?" fromDate={fromDate} setFromDate={setFromDate} endDate={endDate} setEndDate={setEndDate} setActive={setActive} active={active} isYear={true} editModal={editModal} editItem={editItem} />


                        <File space='col-md-7' title='Upload Proof' setState={setProof} />

                    </FormWrapper>
                </DialogContent>
            </Dialog>


            {/* // TABLE OF ResponsibitiesS */}


            {
                showTable &&
                <div className='mt-2 overflow-auto change__scrollbar mb-2 text-sm sm:text-base'>
                    <TableComponent TB={data?.data} module={module} getproof={getproof} proof={module} fatchdata={refetch} setItemToEdit={pencilClick} isLoading={isLoading} tableHead={tableHead} SendReq={model} isMultiYear={true} />

                    {
                        isLoading && <Loader />
                    }
                </div>
            }

        </div>
    )
}

export default Responsibities