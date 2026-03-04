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
import FromToDate from '../../../inputs/FromToDate';
import { modifyObject } from '../components/FacultyMainTable';
import allTableHeads from '../../admin/js/allTableHeads';
import TableComponent from '../../../components/tableComponents/TableComponent';
import AddButton from '../../director/components/UtilityComponents/AddButton';
import useFetchData from '../../../hooks/useFetchData';
import Lists from '../../../components/tableComponents/Lists';
import ScienceRoundedIcon from '@mui/icons-material/ScienceRounded';


const ResearchProjects = ({ academicYear, showTable = true, title = false, extraFilter = {} }) => {
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);

    const user = useSelector(state => state.user.user);
    const module = "faculty";
    const model = "ResearchProject";
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


    //states
    const [projectName, setProjectName] = useState('')
    const [programTitle, setProgramTitle] = useState('')
    const [invName, setInvName] = useState('')
    const [coInvName, setCoInvName] = useState('-')
    const [fundingName, setFundingName] = useState('')
    const [fundType, setFundType] = useState('')
    const [gov, setGov] = useState('')
    const [department, setDepartment] = useState('')
    const [awardDate, setAwardDate] = useState('')
    const [guideName, setGuideName] = useState('')
    const [schoolName, setSchoolName] = useState('')
    const [funds, setFunds] = useState('')
    const [status, setStatus] = useState('')
    const [proof, setProof] = useState(null)
    const [year, setYear] = useState('')
    const [fromDate, setFromDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [editItem, setEditItem] = useState(null)
    const [active, setActive] = useState(false)
    const [durationYears, setDurationYears] = useState(null)
    const [duration, setDuration] = useState('')


    const [editModal, setEditModal] = useState(false)
    const [itemToDelete, setItemToDelete] = useState('')
    const [isFormOpen, setIsFormOpen] = useState(false)

    const [isCo, setIsCo] = useState(false)
    const [editId, setEditId] = useState(null)


    const typeObject = {
        schemeName: "text", principalName: "text", fundingName: "text", isGov: Lists.reserchProjectIsGov, awardYear: "number", providedFunds: "number", fundType: Lists.reserchProjectFundType, status: Lists.reserchProjectStatus, year: academicYearGenerator(29, true, true)
    }
    const tableHead = modifyObject(allTableHeads.ResearchProject)

    useEffect(() => {
        if (active) {
            setDuration(`${fromDate} to Till Date`)
            setDurationYears([fromDate, endDate])
        } else {
            setDuration(`${fromDate} to ${endDate}`)
            setDurationYears([fromDate, endDate])
        }
    }, [fromDate, endDate, active])


    function handleSubmit(e) {
        e.preventDefault();

        setLoading(true)
        let formData = new FormData()
        formData.append('schemeName', projectName)
        formData.append('programTitle', programTitle)
        formData.append('principalName', invName)
        formData.append('coInvestigator', coInvName)
        formData.append('guideName', guideName)
        formData.append('schoolName', schoolName)
        formData.append('isCo', isCo)
        formData.append('fundingName', fundingName)
        formData.append('isGov', gov)
        formData.append('department', department)
        formData.append('awardYear', awardDate)
        formData.append('providedFunds', funds)
        formData.append('fundType', fundType)
        formData.append('status', status)
        formData.append('active', active)
        formData.append('duration', duration)
        formData.append('durationYears', JSON.stringify(durationYears))
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
        formData.append('schemeName', projectName)
        formData.append('programTitle', programTitle)
        formData.append('principalName', invName)
        formData.append('coInvestigator', coInvName)
        formData.append('isCo', isCo)
        formData.append('fundingName', fundingName)
        formData.append('isGov', gov)
        formData.append('department', department)
        formData.append('awardYear', awardDate)
        formData.append('guideName', guideName)
        formData.append('schoolName', schoolName)
        formData.append('providedFunds', funds)
        formData.append('fundType', fundType)
        formData.append('status', status)
        formData.append('active', active)
        formData.append('duration', duration)
        formData.append('durationYears', JSON.stringify(durationYears))
        formData.append('year', year)
        formData.append('file', proof)

        clearStates()
        handleEditWithFile(formData, model, setEditModal, refetch, setLoading, setIsFormOpen)
    }

    function pencilClick(itemId) {
        setEditId(itemId)

        data?.data?.forEach(function (item) {
            if (item._id === itemId) {
                console.log(item)
                setEditItem(item)
                setProjectName(item.schemeName)
                setProgramTitle(item.programTitle)
                setInvName(item.principalName)
                setCoInvName(item.coInvestigator)
                setIsCo(item.isCo ? true : false)
                setFundingName(item.fundingName)
                setGov(item.isGov)
                setDepartment(item.department)
                setFundType(item.fundType)
                setAwardDate(item.awardYear)
                setStatus(item.status)
                setFunds(item.providedFunds)
                setDuration(item.duration)
                setYear(item.year)
                if (item.durationYears?.[0]?.includes(',') || item.durationYears?.[0]?.length > 7) {
                    setDurationYears(() => [])
                    setFromDate(() => null)

                } else {
                    setDurationYears(() => item.durationYears)
                    setFromDate(() => item.durationYears[0] || null)
                }

                setActive(item.active === undefined ? false : item.active)
                setProof(item.file)

                setItemToDelete(item)
                setIsFormOpen(true)
                setEditModal("Editing")
            }
        })
    }

    // function to clear states to '' 
    function clearStates() {
        setProjectName('')
        setProgramTitle('')
        setInvName(`${user?.salutation} ${user?.name}`)
        setCoInvName('-')
        setFundingName('')
        setGov('')
        setDepartment('')
        setAwardDate('')
        setFunds('')
        setFundType('')
        setStatus('')
        setDuration('')
        setYear('')
        setActive(false)
        setFromDate(null)
        setEndDate(null)
        setDurationYears(null)
        setIsCo(false)
        setEditModal('Adding')
    }

    useEffect(() => {
        if (user) {
            setGuideName(user.name)
            setSchoolName(user.department)
        }
    }, [user])

    useEffect(() => {
        if (editModal === "Editing") {
            data?.data?.forEach(function (item) {
                if (item._id === editId) {
                    if (isCo) {
                        setCoInvName(item.coInvestigator)
                    } else {
                        setCoInvName("-")
                    }
                }
            })
        } else {
            if (isCo) {
                setCoInvName("")
            } else {
                setCoInvName("-")
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCo, editModal])

    return (
        <div>
            <AddButton icon={<ScienceRoundedIcon />} serverData={serverData} setData={setData} getproof={getproof} model={model} module={module} title={title || "Research Projects"} filter={filter} year={year} serviceName={module} onclick={setIsFormOpen} exceldialog={setOpen} customName={title} filterByAcademicYear={true} dataCount={data ? data?.data?.length : 0}
                showTable={showTable} tableHead={tableHead} />

            <BulkExcel proof={getproof} tableHead={tableHead} typeObject={typeObject} commonFilds={{ userId: user?._id }} sampleFile='ResearchProjectFaculty' title={title} SendReq={model} refetch={refetch} module={module} department={user?._id} open={open} setOpen={setOpen} />

            <Dialog fullWidth maxWidth='lg' open={isFormOpen}>
                <DialogContent >
                    <FormWrapper action={editModal ? 'Editing' : 'Adding'} loading={loading} cancelFunc={() => { setEditModal(false); clearStates() }} onSubmit={editModal === "Editing" ? handleChange : handleSubmit} setIsFormOpen={setIsFormOpen}>
                        <p className='text-2xl font-bold my-3'>{editModal ? 'Edit Project Details' : 'Add a new Project'}</p>


                        <Text title='Scheme / Project Title' state={projectName} setState={setProjectName} />

                        <Text title='Principal Invigilator Name' state={invName} setState={setInvName} />

                        <div className='col-md-4 border rounded-md mt-5'>
                            <div className="form-check form-switch py-[0.20rem] mt-[0.28rem]">
                                <input className="form-check-input" checked={isCo} onChange={(e) => { setIsCo(e.target.checked) }} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                                <label className="form-check-label" for="flexSwitchCheckDefault">Is this Project have a Co-Invigilator?</label>
                            </div>
                        </div>

                        <Text title='Co-Invigilator Name' state={coInvName} setState={setCoInvName} disabled={isCo ? false : true} />

                        <Text title='Funding Agency Name' state={fundingName} setState={setFundingName} />

                        <div className="col-md-4">

                            <label htmlFor="validationCustom05" className="form-label">Wheather Government / Non-Government</label>
                            <select className="form-select" id="validationCustom05" required
                                value={gov} onChange={(e) => { setGov(e.target.value) }}>
                                <option selected disabled value="">Choose</option>
                                <option value="Government">Government</option>
                                <option value="Non-Government">Non-Government</option>
                            </select>
                        </div>


                        <Text type="number" title='Award Year' state={awardDate} setState={setAwardDate} />

                        <Text title='Provided Funds (INR)' state={funds} setState={setFunds} />

                        <div className="col-md-4">

                            <label htmlFor="fundType" className="form-label">Wheather Major / Minor</label>
                            <select className="form-select" id="fundType" required
                                value={fundType} onChange={(e) => { setFundType(e.target.value) }}>
                                <option selected disabled value="">Choose</option>
                                <option value="Major">Major (More than 10 Lacks)</option>
                                <option value="Minor">Minor (Less than 10 Lacks)</option>
                            </select>
                        </div>

                        <Year title="Choose Academic Year" state={year} setState={setYear} />


                        <div className="col-md-4">

                            <label htmlFor="status" className="form-label">Status</label>
                            <select className="form-select" id="status" required
                                value={status} onChange={(e) => { setStatus(e.target.value) }}>

                                <option selected disabled value="">Choose</option>
                                <option value="Completed">Completed</option>
                                <option value="Ongoing">Ongoing</option>
                            </select>
                        </div>


                        <FromToDate activeTitle="Is the project still in progress?" fromDate={fromDate} setFromDate={setFromDate} endDate={endDate} setEndDate={setEndDate} setActive={setActive} active={active} isYear={true} editModal={editModal} editItem={editItem} dateTitles={{ startTitle: "Project Start Year", endTitle: "Project End Year" }} />


                        <File space='col-md-8' title='Upload Proof' setState={setProof} />

                    </FormWrapper>
                </DialogContent>
            </Dialog>




            {/* // TABLE */}

            {
                showTable && <TableComponent TB={data?.data} module={module} getproof={getproof} proof={module} fatchdata={refetch} setItemToEdit={pencilClick} isLoading={isLoading} tableHead={tableHead} SendReq={model} />
            }

        </div>
    )
}

export default ResearchProjects