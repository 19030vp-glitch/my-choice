import React, { useEffect, useState } from 'react'
import CardMembershipRoundedIcon from '@mui/icons-material/CardMembershipRounded';
import { useSelector } from 'react-redux';
import Text from '../../../inputs/Text';
import File from '../../../inputs/File';
import Year, { academicYearGenerator } from '../../../inputs/Year';
import { submitWithFile } from '../js/submit';
import handleEditWithFile from '../js/handleEditWithFile';
import FormWrapper from '../components/FormWrapper';
import { Dialog, DialogContent } from '@mui/material';
import BulkExcel from '../../../components/BulkExcel';
import GenderSelect, { CasteSelect } from '../../../inputs/GenderSelect';
import Lists from '../../../components/tableComponents/Lists'
import TableComponent from '../../../components/tableComponents/TableComponent';
import { modifyObject } from '../components/FacultyMainTable';
import allTableHeads from '../../admin/js/allTableHeads';
import AddButton from '../../director/components/UtilityComponents/AddButton';
import useFetchData from '../../../hooks/useFetchData';

const PHDAwarded = ({ academicYear, showTable = true, title, type = false, extraFilter, tableType }) => {
    const [loading, setLoading] = useState(false)
    const user = useSelector(state => state.user.user);

    const module = "faculty";
    const model = "PhdAwarded";
    const getproof = "proof"

    const [open, setOpen] = useState(false);

    const filter = { userId: user?._id }
    if (academicYear) {
        filter.year = { $in: academicYear }
    }

    if (type === 'Ph.D.') {
        filter.degreeName = { '$ne': 'PG Dissertation' }
    } else if (type === 'PG') {
        filter.degreeName = 'PG Dissertation'
    }
    if (extraFilter) {
        Object.assign(filter, extraFilter)
    }
    const [data, setData] = useState(null)
    const { data: serverData, isLoading, refetch } = useFetchData(model, module, filter, showTable, setData)


    useEffect(() => {
        refetch()
    }, [type])


    const tableHead = modifyObject(allTableHeads?.[tableType || 'PhdAwarded'])


    //states
    const [scholarName, setScholarName] = useState('')
    const [departmentName, setDepartmentName] = useState('')
    const [guideName, setGuideName] = useState('')
    const [thesisTitle, setThesisTitle] = useState('')
    const [degreeName, setDegreeName] = useState('')
    const [awardSubmit, setAwardSubmit] = useState('')
    const [scholarYear, setScholarYear] = useState('')
    const [awardYear, setAwardYear] = useState('')
    const [rac, setRac] = useState('')
    const [gender, setGender] = useState('')
    const [category, setCategory] = useState('')
    const [proof, setProof] = useState(null)
    const [year, setYear] = useState('')
    const [editModal, setEditModal] = useState(false)
    const [itemToDelete, setItemToDelete] = useState('')
    const [isFormOpen, setIsFormOpen] = useState(false)


    const [editId, setEditId] = useState(null);

    const years = academicYearGenerator(29, true, true)

    const typeObject = {
        scholarName: 'text', degreeName: Lists.phdAwardedDegree, awardSubmit: Lists.phdAwardedSubmit, thesisTitle: 'text', rac: "date", gender: Lists.gender, category: Lists.phdAwardedCategory, yearOfScholar: years, phdAwardYear: 'number', year: years,
    }

    useEffect(() => {
        setDepartmentName(() => user?.department)
        setGuideName(`${user?.salutation} ${user?.name}`)
    }, [user])

    function handleSubmit(e) {
        e.preventDefault();

        setLoading(true)
        let formData = new FormData()
        formData.append('scholarName', scholarName)
        formData.append('departmentName', departmentName)
        formData.append('guideName', guideName)
        formData.append('degreeName', type === 'Ph.D.' ? type : type === 'PG' ? 'PG Dissertation' : degreeName)
        formData.append('awardSubmit', awardSubmit)
        formData.append('rac', rac)
        formData.append('gender', gender)
        formData.append('category', category)
        formData.append('thesisTitle', thesisTitle)
        formData.append('yearOfScholar', scholarYear)
        formData.append('phdAwardYear', awardYear)
        formData.append('year', year)
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
        formData.append('scholarName', scholarName)
        formData.append('degreeName', degreeName)
        formData.append('awardSubmit', awardSubmit)
        formData.append('rac', rac)
        formData.append('gender', gender)
        formData.append('category', category)
        formData.append('departmentName', departmentName)
        formData.append('guideName', guideName)
        formData.append('thesisTitle', thesisTitle)
        formData.append('yearOfScholar', scholarYear)
        formData.append('phdAwardYear', awardYear)
        formData.append('year', year)
        formData.append('file', proof)
        clearStates()

        handleEditWithFile(formData, model, setEditModal, refetch, setLoading, setIsFormOpen)
    }
    function pencilClick(itemId) {
        setEditId(itemId)
        data?.data.forEach(function (item) {
            if (item._id === itemId) {
                setScholarName(item.scholarName)
                setDepartmentName(item.departmentName)
                setGuideName(item.guideName)
                setDegreeName(item.degreeName)
                setAwardSubmit(item.awardSubmit)
                setThesisTitle(item.thesisTitle)
                setScholarYear(item.yearOfScholar)
                setAwardYear(item.phdAwardYear)
                setRac(item.rac)
                setGender(item.gender)
                setCategory(item.category)
                setYear(item.year)
                setProof(item.file)
                setItemToDelete(item)
                setIsFormOpen(true)
                setEditModal("Editing")
            }
        })
    }
    // function to clear states to '' 
    function clearStates() {
        setScholarName('')
        setDepartmentName(user?.department)
        setGuideName(`${user?.salutation} ${user?.name}`)
        setThesisTitle('')
        setDegreeName('')
        setAwardSubmit('')
        setScholarYear('')
        setRac('')
        setGender('')
        setCategory('')
        setAwardYear('')
        setYear('')
        setProof(null)
        setEditModal('Adding')
    }

    useEffect(() => {

        if (editModal === 'Editing') {

            data?.data?.forEach(function (item) {
                if (item._id === editId) {
                    if (awardSubmit === 'Awarded') {
                        setAwardYear(() => item.phdAwardYear)
                    } else {
                        setAwardYear("-")
                    }
                    if (degreeName !== 'Ph.D.') {
                        setRac("")
                    } else {
                        setRac(() => item.rac || "-")
                    }
                }
            })
        } else {
            if (awardSubmit === 'Awarded') {
                setAwardYear("")
            } else {
                setAwardYear("-")
            }
            if (degreeName !== 'Ph.D.') {
                setRac("")
            } else {
                setRac("-")
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [awardSubmit, editModal, degreeName])

    return (
        <div>
            {/* // HEADER */}

            <AddButton serverData={serverData} setData={setData} getproof={getproof} model={model} module={module} title={title} filter={filter} year={year} serviceName={module} onclick={setIsFormOpen} exceldialog={setOpen} customName={title} filterByAcademicYear={true} dataCount={data ? data?.data?.length : 0}
                showTable={showTable} tableHead={tableHead} icon={<CardMembershipRoundedIcon className='text-lg' />} />

            <BulkExcel proof={getproof} tableHead={tableHead} typeObject={typeObject} commonFilds={{ userId: user?._id, departmentName: user?.department, guideName: `${user?.salutation} ${user?.name}` }} title={title} SendReq={model} refetch={refetch} module={module} open={open} setOpen={setOpen} />

            {/* // 2. FIELDS */}
            <Dialog fullWidth maxWidth='lg' open={isFormOpen}>
                <DialogContent >
                    <FormWrapper action={editModal === 'Editing' ? 'Editing' : 'Adding'} loading={loading} cancelFunc={() => { setEditModal(false); clearStates() }} onSubmit={editModal === 'Editing' ? handleChange : handleSubmit} setIsFormOpen={setIsFormOpen}>
                        <p className='text-2xl font-bold my-3'>{editModal === 'Editing' ? 'Edit row' : 'Add a new row'}</p>
                        <Text title='Scholar Name' state={scholarName} setState={setScholarName} />
                        <Text title='Department Name' state={departmentName} setState={setDepartmentName} />
                        <Text title='Guide Name' state={guideName} setState={setGuideName} />
                        <Text title='Thesis Title' state={thesisTitle} setState={setThesisTitle} />

                        {
                            !type && <div className="col-md-4">
                                <label htmlFor="degreeName" className="form-label">Degree</label>
                                <select className="form-select" id="degreeName" required
                                    value={degreeName} onChange={(e) => { setDegreeName(e.target.value) }}>
                                    <option selected disabled value="">Choose</option>
                                    <option value="Ph.D.">Ph.D.</option>
                                    <option value="M.Phil">M.Phil</option>
                                    <option value="PG Dissertation">PG Dissertation</option>
                                </select>
                            </div>
                        }


                        <div className="col-md-4">
                            <label htmlFor="awardSubmit" className="form-label">Awarded / Submitted / Ongoing</label>
                            <select className="form-select" id="awardSubmit" required
                                value={awardSubmit} onChange={(e) => { setAwardSubmit(e.target.value) }}>
                                <option selected disabled value="">Choose</option>
                                <option value="Awarded">Awarded</option>
                                <option value="Submitted">Submitted</option>
                                <option value="Ongoing">Ongoing</option>
                            </select>
                        </div>

                        {
                            type === 'Ph.D.' && <Text type="date" title='Date of Registration (RAC)' state={rac} setState={setRac} />
                        }


                        <GenderSelect className="col-md-4" title='Gender' state={gender} setState={setGender} showLabel={true} />

                        <CasteSelect className="col-md-4" title='Category' state={category} setState={setCategory} showLabel={true} />

                        <Year space="col-md-3" title='Year of Scholar Registration' state={scholarYear} setState={setScholarYear} />

                        {
                            awardSubmit === 'Awarded' && <Text title='Year of Award' type="number" state={awardYear} setState={setAwardYear} />
                        }



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






export default PHDAwarded