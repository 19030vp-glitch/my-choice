import React, { useEffect, useState } from 'react'
import DialogBox from '../../../components/formComponents/DialogBox'
import Text from '../../../components/formComponents/Text'
import YearSelect from '../../../components/formComponents/YearSelect'
import UploadFile from '../../../components/formComponents/UploadFile'
import AddButton from '../../director/components/UtilityComponents/AddButton'
import Table from '../../../components/tableComponents/TableComponent'
import editReq from '../../../components/requestComponents/editReq'
import addReq from '../../../components/requestComponents/addReq'
import Select from '../../../components/formComponents/Select'
import SchoolsProgram from '../../../components/SchoolsProgram'
import { fetchFacutys } from '../../student/pages/StudentHome'
import Lists from '../../../components/tableComponents/Lists'
import BulkExcel from '../../../components/BulkExcel'
import { academicYearGenerator } from '../../../inputs/Year'
import useFetchData from '../../../hooks/useFetchData'

const tableHead = {
    index: 'Sr.No.', scholarName: 'Scholar Name', departmentName: 'School / Department Name', guideName: 'Guide Name', degreeName: 'Degree', awardSubmit: 'Awarded / Submitted / Ongoing', thesisTitle: 'Thesis Title', rac: "Date of Registration (RAC)", gender: "Gender", category: "Category",
    // yearOfScholar: 'Year of Scholar Registration', 
    phdAwardYear: 'Year of Award', year: 'Year', Proof: 'Uploaded Proof', Action: "Action"
}

const AdminPhdAwarded = () => {
    const model = 'PhdAwarded'
    const module = 'main'
    const title = "Ph.D. Scholars"
    const getproof = "proof"
    const serviceName = "faculty"

    const filter = { otherUser: 'Admin' }
    const [data, setData] = useState([])
    const { data: serverData, isLoading, refetch } = useFetchData(model, module, filter, true, setData)


    const initialstate = { scholarName: "", schoolName: "", otherSchool: "", guideName: "", otherGuide: "", degreeName: "Ph.D.", awardSubmit: "", thesisTitle: "", rac: "", gender: "", category: "", yearOfScholar: "", phdAwardYear: "", year: "", Proof: "" }
    const [values, setValues] = useState(initialstate)
    const { scholarName, schoolName, otherSchool, guideName, otherGuide, degreeName, awardSubmit, thesisTitle, rac, gender, category, yearOfScholar, phdAwardYear, year, } = values
    const [open, setOpen] = useState(false)
    const [excelOpen, setExcelOpen] = useState(false)

    //---------------edit state-------------------
    const [itemToEdit, setItemToEdit] = useState(null)
    const [edit, setEdit] = useState(false);
    const [Loading, setLoading] = useState(false);
    const [guides, setGuides] = useState([]);
    const [allGuides, setAllGuides] = useState([]);
    const schools = Object.keys(SchoolsProgram)

    useEffect(() => {
        fetchFacutys({ model: "User", id: "", module, filter: { salutation: "Dr." }, }, null, setAllGuides)
    }, [])

    useEffect(() => {
        // setValues((pri)=>{
        //     return{...pri, guideName: ""} 

        // })
        if (schoolName !== "Other") {
            fetchFacutys({ model: "User", id: "", module, filter: { department: schoolName, salutation: "Dr." }, }, null, setGuides);
        }
    }, [schoolName]);

    const typeObject = {
        scholarName: 'text', schoolName: schools, guideName: allGuides, degreeName: Lists.phdAwardedDegree, awardSubmit: Lists.phdAwardedSubmit, thesisTitle: 'text', rac: "date", gender: Lists.gender, category: Lists.phdAwardedCategory, yearOfScholar: 'number', phdAwardYear: 'number', year: academicYearGenerator(29, true, true),
    }

    useEffect(() => {
        if (itemToEdit && data.data) {
            data?.data.forEach((item) => {
                if (item?._id === itemToEdit) {
                    const { scholarName, schoolName, guideName, degreeName, awardSubmit, thesisTitle, rac, gender, category, yearOfScholar, phdAwardYear, year, } = item
                    setEdit(true); setOpen(true);
                    setValues({ scholarName, schoolName, guideName, degreeName, awardSubmit, thesisTitle, rac, gender, category, yearOfScholar, phdAwardYear, year, })
                }
            })
        }
    }, [itemToEdit])

    const onCancel = () => {
        setValues(initialstate); setItemToEdit(null); setEdit(false); setOpen(false)
    }
    const onSubmit = (e) => {
        e.preventDefault();
        edit ? editReq({ getproof, folder: serviceName, otherUser: "Admin", id: itemToEdit }, model, initialstate, { ...values, guideName: guideName === "Other" ? otherGuide : guideName, departmentName: schoolName === "Other" ? otherSchool : schoolName }, setValues, refetch, setOpen, setEdit, setItemToEdit, setLoading, module) :
            addReq({ getproof, folder: serviceName, otherUser: "Admin" }, model, initialstate, { ...values, guideName: guideName === "Other" ? otherGuide : guideName, departmentName: schoolName === "Other" ? otherSchool : schoolName }, setValues, refetch, setOpen, setLoading, module)
    }

    return (
        <>
            <AddButton serverData={serverData} setData={setData} getproof={getproof} model={model} module={module} title={title} filter={filter} year={year} serviceName={serviceName} customName={title} onclick={setOpen} exceldialog={setExcelOpen} dataCount={data ? data?.data?.length : 0} tableHead={tableHead} />
            <DialogBox title={`${edit ? "Edit" : "Add"} ${title}`} buttonName="Submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={onSubmit} onCancel={onCancel} maxWidth="lg" loading={Loading}>
                <div className='flex flex-wrap'>
                    <Text className='col-md-6 col-lg-4' id="scholarName" value={scholarName} label={tableHead.scholarName} setState={setValues} />
                    <Select options={schools
                        ? [
                            ...new Set([...schools, schoolName || "", "Other"]),
                        ].filter((item) => item !== "")
                        : []
                    } className='col-md-6 col-lg-4' id="schoolName" value={schoolName} label="School / Research Center Name" setState={setValues} />
                    {
                        schoolName === "Other" && <><Text className='col-md-6 col-lg-4' id="otherSchool" value={otherSchool} label="Name of School / Research Center" setState={setValues} /> <Text className='col-md-6 col-lg-4' id="guideName" value={guideName} label="Guide Name" setState={setValues} /></>
                    }
                    {
                        schoolName !== "Other" && <Select options={guides
                            ? [
                                ...new Set([...guides, guideName || "", "Other"]),
                            ].filter((item) => item !== "")
                            : []
                        } className='col-md-6 col-lg-4' id="guideName" value={guideName} label="Guide Name" setState={setValues} />
                    }
                    {
                        guideName === "Other" && <Text className='col-md-6 col-lg-4' id="otherGuide" value={otherGuide} label="Name of Guide" setState={setValues} />
                    }

                    <Text className='col-md-6 col-lg-4' id="thesisTitle" value={thesisTitle} label={tableHead.thesisTitle} setState={setValues} />
                    {/* <Select options={Lists.phdAwardedDegree} className='col-md-6 col-lg-4' id="degreeName" value={degreeName} label={tableHead.degreeName} setState={setValues} /> */}
                    {
                        degreeName === 'Ph.D.' && <Text label="Date of RAC" className='col-md-6 col-lg-4' type="date" id="rac" title={tableHead.rac} value={rac} setState={setValues} />
                    }
                    <Select options={Lists.phdAwardedSubmit} className='col-md-6 col-lg-4' id="awardSubmit" value={awardSubmit} label={tableHead.awardSubmit} setState={setValues} />
                    <Select options={Lists.gender} className='col-md-6 col-lg-4' id="gender" value={gender} label={tableHead.gender} setState={setValues} />
                    <Select options={Lists.phdAwardedCategory} className='col-md-6 col-lg-4' id="category" value={category} label={tableHead.category} setState={setValues} />
                    {/* <YearSelect className='col-md-6 col-lg-4' id="yearOfScholar" value={yearOfScholar} label={tableHead.yearOfScholar} setState={setValues} /> */}
                    {
                        awardSubmit === 'Awarded' && <Text className='col-md-6 col-lg-4' id="phdAwardYear" label={tableHead.phdAwardYear} type="number" value={phdAwardYear} setState={setValues} />
                    }
                    <YearSelect className='col-md-6 col-lg-4' id="year" value={year} label={tableHead.year} setState={setValues} />
                    <UploadFile className='col-md-6 col-lg-4' id="Proof" label="Upload Proof" setState={setValues} required={!edit} />
                </div>
            </DialogBox>
            <BulkExcel data={data?.data} title={title} SendReq={model} refetch={refetch} module={module} commonFilds={{}} tableHead={tableHead} typeObject={typeObject} open={excelOpen} setOpen={setExcelOpen} proof={getproof} serviceName={serviceName} />
            <Table TB={data?.data} module={module} getproof={getproof} proof={serviceName} fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={model} year='year' />
        </>
    )
}

export default AdminPhdAwarded
export { tableHead }
