import React, { useEffect, useState } from 'react'
import AirlineSeatReclineNormalRoundedIcon from '@mui/icons-material/AirlineSeatReclineNormalRounded';
import { useSelector } from 'react-redux';
import { submitWithFile } from '../js/submit';
import handleEditWithFile from '../js/handleEditWithFile';
import File from '../../../inputs/File';
import FormWrapper from '../components/FormWrapper';
import { Dialog, DialogContent } from '@mui/material';
import BulkExcel from '../../../components/BulkExcel';
import DesignationSelect from '../../../inputs/DesignationSelect';
import FromToDate from '../../../inputs/FromToDate';
import StageSelect from '../../../inputs/StageSelect';
import DeptSelect from '../../../inputs/DeptSelect';
import TableComponent from '../../../components/tableComponents/TableComponent';
import { modifyObject } from '../components/FacultyMainTable';
import allTableHeads from '../../admin/js/allTableHeads';
import AddButton from '../../director/components/UtilityComponents/AddButton';
import useFetchData from '../../../hooks/useFetchData';

const PostHeldAppointment = ({ academicYear, showTable = true, title, extraFilter = {} }) => {
    const user = useSelector(state => state.user.user);


    const [fromDate, setFromDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const module = "faculty";
    const model = "PostHeld";
    const getproof = "proof"
    const filter = { userId: user?._id }
    if (academicYear) {
        filter.year = { $in: academicYear }
    }
    if (extraFilter) {
        Object.assign(filter, extraFilter)
    }
    const [data, setData] = useState(null)
    const { data: serverData, isLoading, refetch } = useFetchData(model, module, filter, showTable, setData)


    const [open, setOpen] = useState(false);

    const tableHead = modifyObject(allTableHeads.PostHeld)
    const typeObject = {
        designation: ["Assistant Professor", "Associate Professor", "Professor", "Senior Professor"], level: "Academic Level", userDepartment: "Department", duration: "Post Duration",
    }


    const [loading, setLoading] = useState(false)
    const [designation, setDesignation] = useState('')
    const [level, setLevel] = useState(null)
    const [department, setDepartment] = useState(null)
    const [proof, setProof] = useState(null)
    const [duration, setDuration] = useState(null)
    const [editModal, setEditModal] = useState(false)
    const [itemToDelete, setItemToDelete] = useState('')
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [active, setActive] = useState(false)
    const [year, setYear] = useState(null)
    const [editItem, setEditItem] = useState(null)


    useEffect(() => {
        if (editModal !== 'Editing') {
            setDesignation(user?.designation)
            setDepartment(user?.department)
        }
    }, [user, editModal, isFormOpen])

    useEffect(() => {
        if (active) {
            setDuration(`${fromDate} to Till Date`)
            setYear([fromDate, endDate])
        } else {
            setDuration(`${fromDate} to ${endDate}`)
            setYear([fromDate, endDate])
        }
    }, [fromDate, endDate, active])

    async function handleSubmit(e) {
        e.preventDefault();

        setLoading(true)
        let formData = new FormData()
        formData.append('designation', designation)
        formData.append('level', level)
        formData.append('durationYears', JSON.stringify(year))
        formData.append('duration', duration)
        formData.append('department', department)
        formData.append('active', active)
        formData.append('file', proof)
        formData.append('userId', user?._id)
        clearStates()

        await submitWithFile(formData, 'PostHeld', refetch, setLoading, () => { }, setIsFormOpen, clearStates)
        refetch()
    }

    // make states together
    async function handleChange(e) {
        e.preventDefault();
        setLoading(true)

        // arrange form Data
        let formData = new FormData()
        formData.append('itemId', itemToDelete._id)
        formData.append('proof', itemToDelete.proof)
        formData.append('designation', designation)
        formData.append('duration', duration)
        formData.append('department', department)
        formData.append('durationYears', JSON.stringify(year))
        formData.append('active', active)
        formData.append('level', level)
        formData.append('file', proof)

        clearStates()
        await handleEditWithFile(formData, 'PostHeld', setEditModal, refetch, setLoading, setIsFormOpen)
        refetch()

    }


    function pencilClick(itemId) {
        data?.data?.forEach(function (item) {
            if (item._id === itemId) {
                setEditItem(item)
                setDesignation(item.designation)
                setLevel((item.level === undefined || item.level === 'undefined') ? null : item.level)
                setDuration(item.duration)
                setYear(item.durationYears)
                if (!item.durationYears?.[0]) {
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

    useEffect(() => {
        setLevel(null)
    }, [designation])

    // function to clear states to '' 
    function clearStates() {
        setDesignation("")
        setLevel(null)
        setDuration(null)
        setYear(null)
        setActive(false)
        setProof(null)
        setFromDate(null)
        setEndDate(null)
        setEditModal(false)
    }


    return (
        <div>
            <AddButton serverData={serverData} setData={setData} getproof={getproof} model={model} module={module} title={title} filter={filter} BulkExcelOption={false} year={year} serviceName={module} onclick={setIsFormOpen} exceldialog={setOpen} customName={title} filterByAcademicYear={true} dataCount={data ? data?.data?.length : 0} showTable={showTable} tableHead={tableHead} icon={<AirlineSeatReclineNormalRoundedIcon className='text-lg' />} />

            <BulkExcel proof={getproof} tableHead={tableHead} typeObject={typeObject} commonFilds={{ userId: user?._id }} sampleFile='PostHeldFaculty' title={title} SendReq={model} refetch={refetch} module={module} department={user?._id} open={open} setOpen={setOpen} />

            {/* // 2. FIELDS */}


            <Dialog fullWidth maxWidth='lg' open={isFormOpen}>
                <DialogContent >
                    <FormWrapper action={editModal ? 'Editing' : 'Adding'} loading={loading} cancelFunc={() => { setEditModal(false); clearStates() }} onSubmit={editModal ? handleChange : handleSubmit} setIsFormOpen={setIsFormOpen}>
                        <p className='text-2xl font-bold my-3'>{editModal ? 'Edit a Post' : 'Add a Post'}</p>


                        <DesignationSelect showLabel={true} classes="col-md-3" id="chooseDesignation" state={designation} setState={setDesignation} />



                        <StageSelect space='col-md-4' state={level} setState={setLevel} forDesignation={designation} />


                        <div className="col-md-4">
                            <DeptSelect title="School / Department" state={department} setState={setDepartment} />
                        </div>


                        <FromToDate activeTitle="Are you still active on this post or level?" fromDate={fromDate} setFromDate={setFromDate} endDate={endDate} setEndDate={setEndDate} setActive={setActive} active={active} editModal={editModal} editItem={editItem} />


                        <File space='col-md-6' title='Appointment Order / CAS Promotion	' setState={setProof} />

                    </FormWrapper>
                </DialogContent>
            </Dialog>

            <TableComponent TB={data?.data} module={module} getproof={getproof} proof={module} fatchdata={refetch} setItemToEdit={pencilClick} isLoading={isLoading} tableHead={tableHead} SendReq={model} />

        </div>
    )
}






export default PostHeldAppointment
