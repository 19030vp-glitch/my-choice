import React, { useState } from 'react'
import { useQuery } from 'react-query'
import Select from '../../../components/formComponents/Select'
import YearSelect from '../../../components/formComponents/YearSelect'
import NumberToTextField from '../../director/reports/academic-audit/components/NumberToTextField'
import AuditTable from '../../director/reports/academic-audit/components/AuditTable'
import addReq from '../../../components/requestComponents/addReq'
import Lists from '../../../components/tableComponents/Lists'
import getReq from '../../../components/requestComponents/getReq'
import DialogBox from '../../../components/formComponents/DialogBox'
import AddButton from '../../student/components/AddButton'

const thead = ["स्पर्धकाचे नाव", "कायमचा पत्ता", "भ्रमणध्वनी क्रमांक", "लिंग", "जन्म दिनांक", "१ जुलै २०२३ रोजी स्पर्धकांचे वय", "रक्त गट"]
const accessor = ['name', 'address', 'mobile', 'gender', 'dob', 'age', 'bloodGroup']


const YFGroupTable = ({ user, filterByAcademicYear }) => {


    let studentsInfo = {
        auditHead: ["Sr. No.", "स्पर्धकाचे नाव", "कायमचा पत्ता", "भ्रमणध्वनी क्रमांक", "लिंग", "जन्म दिनांक", "१ जुलै २०२३ रोजी स्पर्धकांचे वय", "रक्त गट", "Action"],
        childHead: ['name', 'address', 'mobile', 'gender', 'dob', 'age', 'bloodGroup',],
        fieldOptions: [
            { field: 'Text', keyName: "name", label: "स्पर्धकाचे नाव" },
            { field: 'Text', keyName: "address", label: "कायमचा पत्ता" },
            { field: 'Text', keyName: "mobile", label: "भ्रमणध्वनी क्रमांक" },
            { field: 'Select', keyName: "gender", label: "लिंग", options: Lists.gender },
            { field: 'Date', keyName: "dob", label: "जन्म दिनांक" },
            { field: 'Text', keyName: "age", label: "१ जुलै २०२३ रोजी स्पर्धकांचे वय" },
            { field: 'Select', keyName: "bloodGroup", label: "रक्त गट", options: Lists.bloodGr },
        ]

    }
    const module = "youth"
    const model = "YfGroup"

    let filter = filterByAcademicYear ? { academicYear: filterByAcademicYear, college: user?._id } : { college: user?._id }

    const params = { model, id: '', module, filter }
    const { data, isLoading, refetch } = useQuery([model, params], () => getReq(params))

    const [edit, setEdit] = useState(false);


    const [students, setStudents] = useState({ input: 0 })
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const initialstate = {
        namesOfCompetition: "", academicYear: "",
    }
    const [values, setValues] = useState(initialstate)
    const { namesOfCompetition, academicYear } = values

    const onCancel = () => {
        setValues(initialstate);
        setStudents({ input: 0 })
        //  setItemToEdit(null); 
        setEdit(false); setOpen(false)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        addReq({ participantNames: JSON.stringify(students), college: user?._id }, model, initialstate, values, setValues, refetch, setOpen, setLoading, module)
    }

    return (


        <div>
            <DialogBox title={`${edit ? "Edit" : "Add"} युवक महोत्सवात सहभागी गट (Group)`} buttonName="Submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={onSubmit} onCancel={onCancel} maxWidth="lg" loading={loading} >
                <div>
                    <div className='row px-4'>
                        <Select className="col-md-5" id="namesOfCompetition" value={namesOfCompetition} label="स्पर्धकाचे नाव" setState={setValues} options={Lists.yfGgroup} />
                        <YearSelect className='col-md-5' id="academicYear" value={academicYear} label="शैक्षणिक वर्ष" setState={setValues} />
                    </div>
                    <NumberToTextField state={students} setState={setStudents} setAutoSaveLoader={() => { }} autoSaveLoader={null} label="Add Data बटण वर क्लिक करून स्पर्धेत सहभागी होणाऱ्या विद्यार्थ्यांची संख्या प्रविष्ट करा" isForm={true} classes='my-3'
                        options={studentsInfo.fieldOptions}>

                        <AuditTable setAutoSaveLoader={() => { }} tableHead={studentsInfo.auditHead}
                            tableChildHead={studentsInfo.childHead} state={students}
                            setState={setStudents} cellAsInput={false} options={studentsInfo.fieldOptions} isForm={true} editTitle="Students" />

                    </NumberToTextField>
                </div>
            </DialogBox>

            <AddButton onclick={() => setOpen(true)} title="युवक महोत्सवात सहभागी गट (Group)" dataCount={data ? data?.data.length : 0} />
            <div className='mt-3'>
                <table className='table table-bordered'>
                    <thead className='bg-primary text-light'>
                        <tr>
                            <th>क्रमांक</th>
                            <th>स्पर्धेचे नाव</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.data?.map((item, index) => {
                                return <tr>
                                    <th>{index + 1}</th>
                                    <td>
                                        <table className="table table-bordered text-sm caption-top">
                                            <caption className='font-semibold text-black'>{item?.namesOfCompetition}</caption>
                                            <thead>
                                                <tr>
                                                    <th>क्रमांक</th>

                                                    {
                                                        thead.map((head) => {
                                                            return <th>{head}</th>
                                                        })
                                                    }</tr>
                                            </thead>
                                            <tbody>

                                                {
                                                    JSON.parse(item.participantNames)?.data?.map((student, index) => {
                                                        return <tr>

                                                            <th>{index + 1}</th>
                                                            {accessor?.map((get) => {
                                                                return <td> {student?.[get]} </td>
                                                            })}
                                                        </tr>


                                                    })
                                                }

                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default YFGroupTable

export {thead, accessor}



