import React, { useEffect, useState } from 'react'
import PersonSearchRoundedIcon from '@mui/icons-material/PersonSearchRounded';
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
import { modifyObject } from '../components/FacultyMainTable';
import TableComponent from '../../../components/tableComponents/TableComponent';
import AddButton from '../../director/components/UtilityComponents/AddButton';
import useFetchData from '../../../hooks/useFetchData';

const JRFSRF = ({ filterByAcademicYear = false, academicYear, showTable = true, title }) => {

    const user = useSelector(state => state.user.user);
    const module = "faculty";
    const model = "JrfSrf";
    const getproof = "proof"
    const [data, setData] = useState(null)


    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);

    const filter = { userId: user?._id }
    if (academicYear) {
        filter.year = { $in: academicYear }
    }

    const { data: serverData, isLoading, refetch } = useFetchData(model, module, filter, showTable, setData)

    // states
    const [fellowName, setFellowName] = useState('')
    const [enDate, setEnDate] = useState('')
    const [fellowDuration, setFellowDuration] = useState('')
    const [fellowType, setFellowType] = useState('')
    const [grantingAgency, setGrantingAgency] = useState('')
    const [guideName, setGuideName] = useState('')
    const [schoolName, setSchoolName] = useState('')
    const [exam, setExam] = useState('')
    const [proof, setProof] = useState(null)
    const [year, setYear] = useState('')
    const [editModal, setEditModal] = useState(false)
    const [itemToDelete, setItemToDelete] = useState('')
    const [isFormOpen, setIsFormOpen] = useState(false)


    const typeObject = {
        researchName: 'text', enrolmentYear: 'date', fellowshipDuration: 'text', fellowshipType: Lists.jrfsrfFellowshipType, grantingAgency: 'text', qualifyingExam: 'text', year: academicYearGenerator(29, true, true),
    }
    const tableHead = modifyObject(allTableHeads.JrfSrf)

    useEffect(() => {
        if (user) {
            setGuideName(user.name)
            setSchoolName(user.department)
        }
    }, [user])

    function handleSubmit(e) {
        e.preventDefault();

        setLoading(true)
        let formData = new FormData()
        formData.append('researchName', fellowName)
        formData.append('enrolmentYear', enDate)
        formData.append('fellowshipDuration', fellowDuration)
        formData.append('fellowshipType', fellowType)
        formData.append('grantingAgency', grantingAgency)
        formData.append('qualifyingExam', exam)
        formData.append('guideName', guideName)
        formData.append('schoolName', schoolName)
        formData.append('year', year)
        formData.append('file', proof)
        formData.append('userId', user?._id)
        clearStates();

        submitWithFile(formData, 'jrfsrf', refetch, setLoading, () => { }, setIsFormOpen, clearStates)
    }

    // make states together
    function handleChange(e) {
        e.preventDefault();
        setLoading(true)

        // arrange form Data
        let formData = new FormData()
        formData.append('itemId', itemToDelete._id)
        formData.append('proof', itemToDelete.proof)
        formData.append('researchName', fellowName)
        formData.append('enrolmentYear', enDate)
        formData.append('fellowshipDuration', fellowDuration)
        formData.append('fellowshipType', fellowType)
        formData.append('grantingAgency', grantingAgency)
        formData.append('guideName', guideName)
        formData.append('schoolName', schoolName)
        formData.append('qualifyingExam', exam)
        formData.append('year', year)
        formData.append('file', proof)

        clearStates();
        handleEditWithFile(formData, 'JrfSrf', setEditModal, refetch, setLoading, setIsFormOpen)
    }


    function pencilClick(itemId) {
        data?.data?.forEach(function (item) {
            if (item._id === itemId) {
                setFellowName(item.researchName)
                setEnDate(item.enrolmentYear)
                setFellowDuration(item.fellowshipDuration)
                setFellowType(item.fellowshipType)
                setGrantingAgency(item.grantingAgency)
                setExam(item.qualifyingExam)
                setProof(item.file)
                setYear(item.year)

                setItemToDelete(item)
                setIsFormOpen(true)
                setEditModal('Editing')

            }
        })
    }

    // function to clear states to '' 
    function clearStates() {
        setFellowName('')
        setEnDate('')
        setFellowDuration('')
        setFellowType('')
        setGrantingAgency('')
        setExam('')
        setProof(null)
        setYear('')
        setEditModal('Editing')
    }


    return (
        <div>
            <AddButton serverData={serverData} setData={setData} getproof={getproof} model={model} module={module} title={title} filter={filter}
                year={year} serviceName={module} onclick={setIsFormOpen} exceldialog={setOpen} customName={title} filterByAcademicYear={true} dataCount={data ? data?.data?.length : 0}
                showTable={showTable} tableHead={tableHead} icon={<PersonSearchRoundedIcon className='text-lg' />} />

            <BulkExcel proof={getproof} tableHead={allTableHeads.JrfSrf} typeObject={typeObject} commonFilds={{ userId: user?._id }} title={title} SendReq={model} refetch={refetch} open={open} setOpen={setOpen} />

            {/* // 2. FIELDS */}



            <Dialog fullWidth maxWidth='lg' open={isFormOpen}>
                <DialogContent >
                    <FormWrapper action={editModal === 'Editing' ? 'Editing' : 'Adding'} loading={loading} cancelFunc={() => { setEditModal(false); clearStates() }} onSubmit={editModal ? handleChange : handleSubmit} setIsFormOpen={setIsFormOpen}>
                        <p className='text-2xl font-bold my-3'>{editModal === 'Editing' ? 'Edit Fellow' : 'Add a new Fellow'}</p>

                        <Text title='Research Fellow Name' state={fellowName} setState={setFellowName} />
                        <Text title='Enrolment Date' type='date' state={enDate} setState={setEnDate} />
                        <Text title='Fellowship Duration' state={fellowDuration} setState={setFellowDuration} />
                        <Text title='Fellowship Type' state={fellowType} setState={setFellowType} />
                        <Text title='Granting Agency' state={grantingAgency} setState={setGrantingAgency} />
                        <Text title='Qualifying Exam (if any)' state={exam} setState={setExam} />
                        <Year state={year} setState={setYear} />

                        <File space='col-md-6' title='Upload Proof' setState={setProof} />

                    </FormWrapper>
                </DialogContent>
            </Dialog>

            {/* TABLE */}



            {
                showTable && <div className='mt-2 overflow-auto change__scrollbar mb-2  text-sm sm:text-base'>
                    <TableComponent TB={data?.data} module={module} getproof={getproof} proof={module} fatchdata={refetch} setItemToEdit={pencilClick} isLoading={isLoading} tableHead={tableHead} SendReq={model} />
                </div>
            }

        </div>
    )
}


export default JRFSRF