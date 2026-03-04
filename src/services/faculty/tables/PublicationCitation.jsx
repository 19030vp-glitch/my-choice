import { Paper, TableContainer } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import useFetchData from '../../../hooks/useFetchData';
import AddButton from '../../director/components/UtilityComponents/AddButton';
import TaskRoundedIcon from '@mui/icons-material/TaskRounded';
import { submitCitation } from '../js/handleCitationSubmit';
import { academicYearGenerator } from '../../../inputs/Year';
import ArrowButton from '../../../components/ArrowButton';
import Select from '../../../components/formComponents/Select';
import toast from 'react-hot-toast';
import Note from '../../director/reports/academic-audit/components/Note';
import allTableHeads from '../../admin/js/allTableHeads';
import { modifyObject } from '../components/FacultyMainTable';

const PublicationCitation = ({ title = "Publication Citation", disableAcademicYearSelect = false, customAcademicYear = null }) => {


    const tableHeads = ["Perticulars", "Total Citations", "h-index", "i-10 index", "Average Impact Factor"]
    const module = "faculty";
    const model = "PublicationCitation";

    const innerInitialState = {
        "citation": null,
        "h-index": null,
        "i-10-index": null,
        "aif": null
    }
    const initialState = { google: innerInitialState, wos: innerInitialState, scopus: innerInitialState, ugc: innerInitialState }

    const user = useSelector(state => state.user.user);
    const [academicYear, setAcademicYear] = useState({ academicYear: customAcademicYear || academicYearGenerator(1, true, true)[0] })

    const filter = { userId: user?._id, year: customAcademicYear || academicYear["academicYear"] }

    const [citationData, setCitationData] = useState(initialState)

    const [data, setData] = useState(null)
    const { data: serverData, refetch } = useFetchData(model, module, filter, true, setData, false)

    const perticulars = [{ title: "Google Scholar", abb: "google" }, { title: "WOS", abb: "wos" }, { title: "Scopus", abb: "scopus" }, { title: "UGC Listed Journal", abb: "ugc" }]


    const handleChange = (key, abb, value) => {
        setCitationData((prev) => {
            return { ...prev, [abb]: { ...prev[abb], [key]: value } }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await submitCitation(citationData, customAcademicYear || academicYear["academicYear"], user._id)
        refetch()
    }

    useEffect(() => {
        if (serverData?.data?.[0]?.citationData) {
            setCitationData(() => (serverData?.data?.[0]?.citationData) || initialState)
        } else {
            setCitationData(() => initialState)
        }
    }, [serverData, academicYear])

    useEffect(() => {
        refetch()
    }, [academicYear])


    return (
        <div className="min-h-screen">
            <AddButton BulkExcelOption={null} serverData={serverData} setData={setData} model={model} module={module} title={title} filter={filter} serviceName={module} customName={title} tableHead={modifyObject(allTableHeads?.PublicationCitation)} filterByAcademicYear={true} dataCount={data ? data?.data?.length : 0} onclick={() => {
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

            <div className='flex items-end justify-between mb-2'>
                <div>
                    <Note mainTitle='Note 1:' title="Publication citations are shown Academic Year wise, please change the academic year to see or update the citations for the desired year." />
                    <Note mainTitle='Note 2:' title="The table has Editable Inputs to add or edit the citation values." />
                    <Note mainTitle='Note 3:' title={`Make sure you press the "Submit Details" button after making changes in the table.`} />
                </div>
                {!disableAcademicYearSelect && <Select className='col-md-2' id="academicYear" value={academicYear["academicYear"]} setState={setAcademicYear} options={academicYearGenerator(10, true, true)} />}
            </div>

            <form onSubmit={handleSubmit}>
                <TableContainer component={Paper} sx={{ maxHeight: '80vh' }}>
                    <table className='table table-borderless' style={{ fontSize: "14px" }}>
                        <thead style={{ color: "#1a2421", backgroundColor: "#e7f1ff", margin: '10px' }}>
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
                                citationData && perticulars.map((perticular) => {
                                    return <tr key={perticular.title}>
                                        <th>{perticular.title}</th>
                                        <td><input onChange={(e) => handleChange('citation', perticular.abb, e.target.value)} type="number" className="p-2 border-2 border-blue-200 w-full rounded-md focus:border-blue-500 outline-none auto-expanding-textarea" required value={citationData?.[perticular.abb]?.["citation"] || ''} /></td>

                                        <td><input onChange={(e) => handleChange('h-index', perticular.abb, e.target.value)} type="number" className="p-2 border-2 border-blue-200 w-full rounded-md focus:border-blue-500 outline-none auto-expanding-textarea" required value={citationData?.[perticular.abb]?.["h-index"] || ''} /></td>

                                        <td><input onChange={(e) => handleChange('i-10-index', perticular.abb, e.target.value)} type="number" required className="p-2 border-2 border-blue-200 w-full rounded-md focus:border-blue-500 outline-none auto-expanding-textarea" value={citationData?.[perticular.abb]?.["i-10-index"] || ''} /></td>

                                        <td><input onChange={(e) => handleChange('aif', perticular.abb, e.target.value)} type="number" required className="p-2 border-2 border-blue-200 w-full rounded-md focus:border-blue-500 outline-none auto-expanding-textarea" value={citationData?.[perticular.abb]?.["aif"] || ''} /></td>
                                    </tr>
                                })
                            }

                        </tbody>
                    </table>
                </TableContainer>

                <ArrowButton type="submit" className="mt-3" title="Submit Details" />
            </form>
        </div>
    )
}

export default PublicationCitation
