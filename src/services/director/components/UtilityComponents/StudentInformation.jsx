import { Paper, TableContainer } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import TaskRoundedIcon from '@mui/icons-material/TaskRounded';
import toast from 'react-hot-toast';
import { academicYearGenerator } from '../../../../inputs/Year';
import useFetchData from '../../../../hooks/useFetchData';
import Note from '../../reports/academic-audit/components/Note';
import Select from '../../../../components/formComponents/Select';
import AddButton from './AddButton';
import ArrowButton from '../../../../components/ArrowButton';
import { tableUpsert } from '../../js/tableUpsert';
import allTableHeads from '../../../admin/js/allTableHeads';
import { modifyObject3 } from './DirectorMainTable';

const StudentInformation = ({ title = "Student Information" }) => {


    const tableHeads = ["Category", "Total Male", "Total Female", "Total Students"]
    const module = "faculty";
    const model = "StudentInformation";

    const innerInitialState = {
        "SC": null,
        "ST": null,
        "VTA": null,
        "NTB": null,
        "NTC": null,
        "NTD": null,
        "OBC": null,
        "SEBC": null,
        "EWS": null,
        "General/Open": null,
        "Specially-abled Students": null,
        "Transgender": null,
    }
    const initialState = {}

    const user = useSelector(state => state.user.directorUser);
    const [academicYear, setAcademicYear] = useState({ academicYear: academicYearGenerator(1, true)[0] })

    const filter = { schoolName: user?.department, year: academicYear["academicYear"] }
    const totalValues = {}

    const [studentInfoData, setStudentInfoData] = useState(initialState)

    const [data, setData] = useState(null)
    const { data: serverData, refetch } = useFetchData(model, module, filter, true, setData, false)

    const handleChange = (key, abb, value) => {
        setStudentInfoData((prev) => {
            return { ...prev, [abb]: { ...prev[abb], [key]: value } }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            studentData: studentInfoData,
            totalValues: totalValues,
            year: academicYear["academicYear"],
            schoolName: user?.department,
        }

        await tableUpsert(data, filter, 'StudentInformation')
        refetch()
    }

    useEffect(() => {
        if (serverData?.data?.[0]?.studentData) {
            setStudentInfoData(() => (serverData?.data?.[0]?.studentData) || initialState)
        } else {
            setStudentInfoData(() => initialState)
        }
    }, [serverData, academicYear])

    useEffect(() => {
        refetch()
    }, [academicYear])



    return (
        <div className="min-h-screen">
            <AddButton BulkExcelOption={null} serverData={serverData} setData={setData} model={model} module={module} title={title} filter={filter} serviceName={module} customName={title}tableHead={modifyObject3(allTableHeads?.StudentInformation)} filterByAcademicYear={true} dataCount={data ? data?.data?.length : 0} onclick={() => {
                toast('Inputs are in the table, you cannot add from here.',
                    {
                        icon: '📢',
                        style: {
                            borderRadius: '10px',
                            background: '#0065f4',
                            color: '#fff',
                        },
                    }
                );
                return
            }}
                icon={<TaskRoundedIcon className='text-lg' />} />

            <div className='flex md:flex-row flex-col items-end justify-between mb-2'>
                <div>
                    <Note mainTitle='Note 1:' title="Student Information is shown Academic Year wise, please change the academic year to see or update the information for the desired year." />
                    <Note mainTitle='Note 2:' title="The table has Editable Inputs to add or edit the values." />
                    <Note mainTitle='Note 3:' title={`Make sure you press the "Submit Details" button after making changes in the table.`} />
                </div>
                <Select className='col-md-2' id="academicYear" value={academicYear["academicYear"]} setState={setAcademicYear} options={academicYearGenerator(10, true)} />
            </div>

            <form onSubmit={handleSubmit}>
                <TableContainer component={Paper} sx={{ maxHeight: '80vh' }}>
                    <table className='table table-borderless' style={{ fontSize: "14px" }}>
                        <thead className='sticky-top' style={{ color: "#1a2421", backgroundColor: "#e7f1ff", margin: '10px' }}>
                            <tr>
                                {
                                    tableHeads.map((item, index) => {
                                        return <th key={`${item}-${index}`}>{item}</th>
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>

                            {
                                studentInfoData && Object.keys(innerInitialState).map((category) => {

                                    const male = parseInt(studentInfoData?.[category]?.["male"] || 0)
                                    const female = parseInt(studentInfoData?.[category]?.["female"] || 0);

                                    let innerTotal = male + female;

                                    totalValues[category] = {
                                        male,
                                        female,
                                        total: innerTotal
                                    }

                                    totalValues["total"] = {
                                        total: (totalValues["total"]?.total || 0) + innerTotal,
                                        male: (totalValues["total"]?.male || 0) + male,
                                        female: (totalValues["total"]?.female || 0) + female,
                                    }

                                    return <>
                                        <tr key={category}>
                                            <th>{category}</th>
                                            {
                                                ["male", "female", "total"].map((cell) => {

                                                    return <td> {
                                                        cell !== "total"
                                                            ? <input onChange={(e) => handleChange(cell, category, e.target.value)} type="number" className="p-2 border-2 border-blue-200 w-full rounded-md focus:border-blue-500 outline-none auto-expanding-textarea" required value={studentInfoData?.[category]?.[cell] || ''} />
                                                            : <b> {innerTotal} </b>
                                                    } </td>
                                                })
                                            }
                                        </tr>
                                    </>
                                })
                            }



                        </tbody>
                        <tfoot className='bg-[#e7f1ff]' style={{ position: 'sticky', bottom: '0' }}>
                            <tr>
                                <th>Total</th>
                                <th>{totalValues?.total?.male || 0}</th>
                                <th>{totalValues?.total?.female || 0}</th>
                                <th>{totalValues?.total?.total || 0}</th>
                            </tr>
                        </tfoot>
                    </table>
                </TableContainer>

                <ArrowButton type="submit" className="my-3" title="Submit Details" />
            </form>
        </div>
    )
}

export default StudentInformation
