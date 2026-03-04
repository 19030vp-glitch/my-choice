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

const tableHead = { index: "Sr. no.", Registration_number_roll_number: "Registration number / roll number", Name_of_the_Exam: "Exam Qualified", Acadmic_year: "Acadmic Year", Upload_Proof: "Upload Proof", Action: "Action" }

const Exams = ["NET", "SLET", "GATE", "GMAT", "GPAT", "NIPER", "CAT", "GRE", "JAM", "IELTS", "TOEFL", "Civil Services", "Centeral Gov exams", "State Gov exams", "Any Such Other Exams"]

const AlumniExamQualified = () => {

    const model = 'QualifiedExams'
    const module = 'alumni'
    const user = useSelector(state => state.user.alumniUser)

    const params = { model, id: user?._id, module }
    const { data, isLoading, refetch } = useQuery([model, params], () => getReq(params))

    const initialstate = { Registration_number_roll_number: '', Name_of_the_Exam: '', Acadmic_year: '', Upload_Proof: '' }
    const [values, setValues] = useState(initialstate)
    const { Registration_number_roll_number, Name_of_the_Exam, Acadmic_year } = values
    const [open, setOpen] = useState(false)

    //---------------edit state-------------------
    const [itemToEdit, setItemToEdit] = useState(null)
    const [edit, setEdit] = useState(false);
    const [Loading, setLoading] = useState(false);

    useEffect(() => {
        if (itemToEdit && data.data) {
            data?.data.forEach((item) => {
                if (item?._id === itemToEdit) {
                    const { Registration_number_roll_number, Name_of_the_Exam, Acadmic_year } = item
                    setEdit(true); setOpen(true);
                    setValues({ Registration_number_roll_number, Name_of_the_Exam, Acadmic_year })
                }
            })
        }
    }, [itemToEdit])

    const onCancel = () => {
        setValues(initialstate); setItemToEdit(null);
    }
    const onSubmit = (e) => {
        e.preventDefault();
        edit ? editReq({ id: itemToEdit }, model, initialstate, values, setValues, refetch, setOpen, setEdit, setItemToEdit, setLoading, module) :
            addReq({ Names_of_students_selected_qualified: user?.name, SchoolName: user?.schoolName, AlumniId: user?._id, }, model, initialstate, values, setValues, refetch, setOpen, setLoading, module)
    }
    return (
        <>
            <AddButton onclick={setOpen} title="Your Exam Qualified" dataCount={data ? data?.data.length : 0} />
            <DialogBox title="Exam Qualified" buttonName="submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={onSubmit} onCancel={onCancel} maxWidth="lg" loading={Loading} >
                <div className='flex flex-wrap'>
                    <Text className='col-md-6 col-lg-4' id="Registration_number_roll_number" value={Registration_number_roll_number} label="Registration no / roll no." setState={setValues} />
                    <Select className='col-md-6 col-lg-4' id="Name_of_the_Exam" value={Name_of_the_Exam} label="Select Exam" setState={setValues} options={Exams} />
                    <YearSelect className='col-md-6 col-lg-4' id="Acadmic_year" value={Acadmic_year} label="Academic Year" setState={setValues} />
                    <UploadFile className='col-md-6 col-lg-4' id="Upload_Proof" label="Upload Proof" setState={setValues} required={!edit} />
                </div>
            </DialogBox>
            <Table TB={data?.data} module={module} fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={model} />
        </>
    )
}
export default AlumniExamQualified