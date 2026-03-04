/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import GoBack from '../../../components/GoBack'
import siteLinks from '../../../components/siteLinks'
import title from '../../../js/title'
import Footer from '../../../components/Footer'
import { useQuery } from 'react-query'
import checkData from '../js/checkData'
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import useAuth from '../../../hooks/useAuth'
import { useSelector } from 'react-redux'
import FacultyMainTable from '../../faculty/components/FacultyMainTable'
import DirectorFacultyMainTable from '../../director/components/UtilityComponents/DirectorFacultyMainTable'
import ResearchProjects from '../../faculty/tables/ResearchProjects'
import BooksAndChapters from '../../faculty/tables/BooksAndChapters'
import Responsibities from '../../faculty/tables/Responsibilities'
import PostHeldAppointment from '../../faculty/tables/PostHeldAppointment'
import PHDAwarded from '../../faculty/tables/PHDAwarded'
import ResearchPapersUGC from '../../faculty/tables/ResearchPapersUGC'
import AllValidComponent from '../components/AllValidComponent'
import Note from '../../director/reports/academic-audit/components/Note'
import PublicationCitation from '../../faculty/tables/PublicationCitation'
import toast from 'react-hot-toast'


const CheckFillData = () => {
    useAuth(false)
    title(siteLinks.validateData.title)
    const user = useSelector((state) => state.user?.user)
    const [enabled, setEnabled] = useState(false)
    const [tablesToBeChecked, setTablesToBeChecked] = useState([])

    const [active, setActive] = useState(null)

    const filter = { userId: user?._id }

    const { data, isLoading, refetch, isRefetching } = useQuery(`CheckData`, () => checkData(filter, active),
        { refetchOnWindowFocus: false, staleTime: Infinity, enabled })

    useEffect(() => {
        if (user?._id) {
            setEnabled(() => true)
            refetch()
        }
    }, [user])

    useEffect(() => {
        if (data?.data?.result?.tablesToCheck) {
            const tableData = data?.data?.result?.tablesToCheck
            let tables = [];
            Object.entries(tableData).forEach(([key, value]) => {
                if (!value && key !== "__v" && key !== "BookAndChapters") {
                    tables.push(key)
                }
            })
            setTablesToBeChecked(tables)
        }
    }, [data?.data])

    useEffect(() => {
        if (active && data?.data?.result.tablesToCheck[active]) {
            toast.success(data?.data?.result?.message)
            setActive(null)
            refetch()
        }
    }, [data?.data])


    // allTableHeads.
    const extraFilter = data?.data?.result?.invalidDataFilter;
    const tableSetter = {
        facltyMainTable: <FacultyMainTable model={data?.data?.result?.model} extraFilter={extraFilter} />,
        ConferencesSemiWorkshopOrganized: <DirectorFacultyMainTable model="ConferencesSemiWorkshopOrganized" extraFilter={extraFilter} />,
        ResearchProject: <ResearchProjects title="Research Projects" extraFilter={extraFilter} />,
        ResearchPaper: <ResearchPapersUGC title="Research Papers" extraFilter={extraFilter} />,
        BookAndChapter: <BooksAndChapters title="Books and Chapters published and papers in national/international conference proceedings" extraFilter={extraFilter} />,
        Responsibilities: <Responsibities title="Administrative / Academic Responsibilities" extraFilter={extraFilter} />,
        PostHeld: <PostHeldAppointment title="Posts held after appointments at this institution" extraFilter={extraFilter} />,
        PGDessertation: <PHDAwarded type="PG" title="PG Dessertation" tableType="PGDessertation" extraFilter={extraFilter} />,
        ResearchGuidance: <PHDAwarded type="Ph.D." title="Research Guidance" tableType="ResearchGuidance" extraFilter={extraFilter} />,
        PublicationCitation: <PublicationCitation title={`Publication Citations for ${data?.data?.result?.academicYear}`} customAcademicYear={data?.data?.result?.academicYear} disableAcademicYearSelect={true} />
    }

    const bredLinks = [siteLinks.welcome, siteLinks.facultyHome, siteLinks.validateData]

    const handleTableChange = async (model) => {
        setActive(() => model)
    }

    useEffect(() => {
        if (active) {
            refetch()
        }
    }, [active])

    const refreshFunction = () => {
        refetch()
    }

    return (
        <div>
            <GoBack bredLinks={bredLinks} backUrl={-1} pageTitle={siteLinks.validateData.title} >
                <RefreshButton isLoading={isLoading} isRefetching={isRefetching} onClickFunc={refreshFunction} />
            </GoBack>

            {!data?.data?.result?.isEverythingValid && <div className='bg-yellow-100 rounded-md p-2 my-3'>
                <Note mainTitle='Note 1:' title="The Faculty data completeness process is conducted to ensure the accuracy and completeness of records within your Faculty Profile." />
                <Note mainTitle='Note 2:' title="It is important to acknowledge that the table below may contain missing columns, including proofs and that's why it is necessary to fill the blank data. Kindly complete all mandatory fields accordingly." />
                <Note mainTitle='Note 3:' title="Please be advised that the data presented in the table below is indicative of incomplete records, wherein certain fields are absent. However, accurate and complete data is not reflected here." />
                <Note mainTitle='Note 4:' title="After you fill the data then please proceed by clicking on the 'Refresh & Go for Next Table' button to check the completeness of the filled information. Upon validation, if deemed correct, it will transition to the subsequent table containing incomplete data." />
            </div>}

            <div className="min-h-screen">
                {
                    data?.data?.result?.isEverythingValid ? <div className='animate-once animate-fade-up'>
                        <p className="my-10"><AllValidComponent /></p>
                    </div> : data?.data?.result?.model &&
                    <div>

                        {/* LIST OF INCOMPLETE TABLES */}

                        {tablesToBeChecked?.length > 0 &&
                            <div className="accordion" id="accordionExample" >
                                <div className="accordion-item border-2  border-blue-400" style={{ borderRadius: '10px' }}>
                                    <h2 className="accordion-header bg-blue-100" id="headingOne" style={{ borderRadius: '10px' }}>
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                                            Tables with Incomplete Data or Fields
                                        </button>
                                    </h2>

                                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample" >
                                        <div className="accordion-body">
                                            <div className='flex items-center justify-center gap-2 flex-wrap'>
                                                {
                                                    tablesToBeChecked?.map((table) => {
                                                        return <div className='flex items-center justify-center gap-2 flex-wrap'>
                                                            <div onClick={() => { handleTableChange(table) }} className={`flex items-center duration-200 ease-in-out cursor-pointer hover:bg-blue-200 justify-start gap-2 ${(active || data?.data?.result?.model) === table ? 'bg-blue-300' : 'bg-blue-100'} px-2 py-2 text-sm rounded-full`}>
                                                                <p className='text-blue-900'>{table}</p>
                                                            </div>
                                                        </div>
                                                    })
                                                }


                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>}





                        {/* LIST OF INCOMPLETE FIELDS */}
                        <div className='mt-5 mb-2'>
                            {
                                (data?.data?.result?.incompleteFields && data?.data?.result?.incompleteFields?.length > 0)
                                && <div className="bg-red-50 p-2 rounded-md">
                                    {data?.data?.result?.incompleteFields.length > 1
                                        ? "Columns in which data is need to be filled: "
                                        : "Column in which data is needs to be filled: "}
                                    {data?.data?.result?.incompleteFields?.map((field, index) => <span className='mx-2 text-red-600 font-semibold' key={index}>{index + 1}. {field}</span>)}
                                </div>
                            }
                        </div>




                        {/* INCOMPLETE TABLE */}
                        {tableSetter.hasOwnProperty(data?.data?.result?.model) ? tableSetter[data?.data?.result?.model] : tableSetter.facltyMainTable}


                        {/* REFRESH BUTTON FOR BOTTOM */}
                        <div className="mt-3 flex items-center justify-end">
                            <RefreshButton isLoading={isLoading} isRefetching={isRefetching} onClickFunc={refreshFunction} />
                        </div>
                    </div>
                }
            </div>
            <Footer />
        </div>
    )
}

export default CheckFillData


const RefreshButton = ({ onClickFunc, isLoading, isRefetching }) => {
    return <button className='flex items-center justify-start gap-2 p-2 text-white bg-blue-700 hover:bg-blue-600 rounded-md cursor-pointer' onClick={onClickFunc}> {(isLoading || isRefetching) ? <div style={{ height: "18px", width: "18px" }} className="spinner-border text-white" role="status">
        <span className="visually-hidden">Loading...</span>
    </div> : <RefreshRoundedIcon />} Refresh & Go for Next Table</button>
}
