import React, { useEffect, useState } from 'react'
import DialogBox from '../../../components/formComponents/DialogBox'
import Text from '../../../components/formComponents/Text'
import YearSelect from '../../../components/formComponents/YearSelect'
import UploadFile from '../../../components/formComponents/UploadFile'
import AddButton from '../../director/components/UtilityComponents/AddButton'
import TableComponent from '../../../components/tableComponents/TableComponent'
import editReq from '../../../components/requestComponents/editReq'
import addReq from '../../../components/requestComponents/addReq'
import Select from '../../../components/formComponents/Select'
import SchoolsProgram from '../../../components/SchoolsProgram'
import { fetchFacutys } from '../../student/pages/StudentHome'
import BulkExcel from '../../../components/BulkExcel'
import useFetchData from '../../../hooks/useFetchData'


const tableHead = { index: "Sr. no.", researchName: "Research Fellow Name", schoolName: "School / Research Center Name", guideName: "Research Guide", enrolmentYear: "Enrollment Date (RAC)", fellowshipDate: "Fellowship Starting Date", fellowshipDuration: "Fellowship Duration (in Years)", fellowshipType: "Fellowship Type", grantingAgency: "Granting Agency", qualifyingExam: "Qualifying Exam", year: "Academic Year", Proof: "Uploaded Proof", Action: "Action" }
const AdminJRFSRF = () => {

    const model = 'JrfSrf'
    const module = 'main'
    const title = 'JRF, SRF & PDF'
    const getproof = 'proof'
    const serviceName = 'faculty'

    const filter = { otherUser: 'Admin' }
    const [data, setData] = useState([])
    const { data: serverData, isLoading, refetch } = useFetchData(model, module, filter, true, setData)

    const initialstate = { researchName: '', guideName: '', otherGuide: '', otherSchool: '', schoolName: '', enrolmentYear: '', fellowshipDate: '', fellowshipDuration: '', fellowshipType: '', grantingAgency: '', qualifyingExam: '', year: '', Proof: '' }
    const [values, setValues] = useState(initialstate)
    const { researchName, guideName, otherGuide, otherSchool, schoolName, enrolmentYear, fellowshipDuration, fellowshipType, grantingAgency, qualifyingExam, year, fellowshipDate } = values
    const [open, setOpen] = useState(false)
    const [excelOpen, setExcelOpen] = useState(false)

    //---------------edit state-------------------
    const [itemToEdit, setItemToEdit] = useState(null)
    const [edit, setEdit] = useState(false);
    const [Loading, setLoading] = useState(false);
    const [guides, setGuides] = useState([]);
    const schools = Object.keys(SchoolsProgram)

    const typeObject = {

    }

    useEffect(() => {
        if (schoolName !== "Other") {
            fetchFacutys({ model: "User", id: "", module, filter: { department: schoolName, salutation: "Dr." }, }, null, setGuides);
        }
    }, [schoolName]);

    useEffect(() => {
        if (itemToEdit && data.data) {
            data?.data.forEach((item) => {
                if (item?._id === itemToEdit) {
                    const { researchName, schoolName, enrolmentYear, fellowshipDuration, fellowshipType, grantingAgency, qualifyingExam, year, guideName, fellowshipDate } = item
                    setEdit(true); setOpen(true);
                    setValues({
                        researchName, schoolName, enrolmentYear, fellowshipDuration, fellowshipType, grantingAgency, qualifyingExam, year, guideName, fellowshipDate
                    })
                }
            })
        }
    }, [itemToEdit, data?.data])

    const onCancel = () => {
        setValues(initialstate); setItemToEdit(null); setEdit(false); setOpen(false)
    }
    const onSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        edit ?
            editReq({ getproof, folder: serviceName, id: itemToEdit, otherUser: "Admin" }, model, initialstate, { ...values, guideName: guideName === "Other" ? otherGuide : guideName, schoolName: schoolName === "Other" ? otherSchool : schoolName }, setValues, refetch, setOpen, setEdit, setItemToEdit, setLoading, module) :
            addReq({ getproof, folder: serviceName, otherUser: "Admin" }, model, initialstate, { ...values, guideName: guideName === "Other" ? otherGuide : guideName, schoolName: schoolName === "Other" ? otherSchool : schoolName }, setValues, refetch, setOpen, setLoading, module)
    }

    return (
        <>
            <AddButton serverData={serverData} setData={setData} getproof={getproof} model={model} module={module} title={title} filter={filter} year={year} serviceName={serviceName} customName={title} onclick={setOpen} exceldialog={setExcelOpen} dataCount={data ? data?.data?.length : 0} tableHead={tableHead} />

            <DialogBox title={`${edit ? "Edit" : "Add"} JRF, SRF`} buttonName="Submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={onSubmit} onCancel={onCancel} maxWidth="lg" loading={Loading}>
                <div className='flex flex-wrap'>
                    <Text className='col-md-6 col-lg-4' id="researchName" value={researchName} label={tableHead.researchName} setState={setValues} />
                    <Select options={schools
                        ? [
                            ...new Set([...schools, schoolName || '', "Other"]),
                        ].filter((item) => item !== "")
                        : []
                    } className='col-md-6 col-lg-4' id="schoolName" value={schoolName} label="School / Research Center Name" setState={setValues} />
                    {
                        schoolName === "Other" &&
                        <>
                            <Text className='col-md-6 col-lg-4' id="otherSchool" value={otherSchool} label="Name of School / Research Center" setState={setValues} />
                            <Text className='col-md-6 col-lg-4' id="guideName" value={guideName} label="Guide Name" setState={setValues} />
                        </>
                    }
                    {
                        schoolName !== "Other" && <Select options={guides
                            ? [
                                ...new Set([...guides, guideName || '', "Other"]),
                            ].filter((item) => item !== "")
                            : []
                        } className='col-md-6 col-lg-4' id="guideName" value={guideName} label="Guide Name" setState={setValues} />
                    }
                    {
                        guideName === "Other" && <Text className='col-md-6 col-lg-4' id="otherGuide" value={otherGuide} label="Name of Guide" setState={setValues} />
                    }

                    <Text className='col-md-6 col-lg-4' id="enrolmentYear" value={enrolmentYear} type="date" label={tableHead.enrolmentYear} setState={setValues} />
                    <Text className='col-md-6 col-lg-4' id="fellowshipDate" value={fellowshipDate} type="date" label={tableHead.fellowshipDate} setState={setValues} />
                    <Select options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} className='col-md-6 col-lg-4' id="fellowshipDuration" value={fellowshipDuration} label={tableHead.fellowshipDuration} setState={setValues} />
                    <Select options={["JRF", "SRF"]} className='col-md-6 col-lg-4' id="fellowshipType" value={fellowshipType} label={tableHead.fellowshipType} setState={setValues} />
                    <Text className='col-md-6 col-lg-4' id="grantingAgency" value={grantingAgency} label={tableHead.grantingAgency} setState={setValues} />
                    <Text className='col-md-6 col-lg-4' id="qualifyingExam" value={qualifyingExam} label={tableHead.qualifyingExam} setState={setValues} />
                    <YearSelect className='col-md-6 col-lg-4' id="year" value={year} label={tableHead.year} setState={setValues} />
                    <UploadFile className='col-md-6 col-lg-4' id="Proof" label={tableHead.Proof} setState={setValues} required={!edit} />
                </div>
            </DialogBox>

            <BulkExcel data={data?.data} proof={getproof} title={title} SendReq={model} refetch={refetch} module={module} commonFilds={{}} open={excelOpen} setOpen={setExcelOpen} tableHead={tableHead} typeObject={typeObject} serviceName={serviceName} />

            <TableComponent TB={data?.data} module={module} getproof={getproof} proof={serviceName} fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={model} />
        </>
    )
}

export default AdminJRFSRF
export { tableHead }