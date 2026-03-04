import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ImportExportRoundedIcon from '@mui/icons-material/ImportExportRounded';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import downloadTablePDF from '../../js/downloadTablePDF';
import getProofPDF from '../../js/downloadProofPDF';
import directorTables from '../../js/directorTables';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SearchOffRoundedIcon from '@mui/icons-material/SearchOffRounded';
import searchTable from '../../js/searchTable';
import ActionExcelButton from './ActionExcelButton';

const TableTitle = ({ setData, serverData, getproof, getproof2, title, clickd, excelClicked, customName, dataCount, showTable, params, serviceName, data, tableHead, icon, year, BulkExcelOption = true, link = null, showActionButton, showAddButton = true }) => {

    const { model, module, filter } = params

    const [currentPage, setCurrentPage] = useState(null)
    const DirectorActive = useSelector(state => state.directorActive.directorActive)
    const [loading, setLoading] = useState({})
    const [search, setSearch] = useState({ [model]: { isSearchOpen: false, query: null } })

    useEffect(() => {
        searchChange({ target: { value: search?.[model]?.query || null } })
    }, [serverData])


    useEffect(() => {
        setCurrentPage(directorTables?.[DirectorActive]?.title)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [DirectorActive])

    const downloadTable = async () => {
        await downloadTablePDF(title, params, serviceName || module, getproof, getproof2, setLoading)
    }

    const downloadProof = async () => {
        getProofPDF(model, filter, getproof, serviceName || module, setLoading)
    }

    // const downloadExcel = async () => {
    //     await downloadTableExcel(data, tableHead, title, getproof, getproof2, serviceName || module, model, setLoading)
    // }

    const toggleSearch = () => {
        setSearch((prev) => {
            return { ...prev, [model]: { isSearchOpen: !prev?.[model]?.isSearchOpen, query: null } }
        })

    }

    const searchChange = (e) => {
        setSearch((prev) => {
            return { ...prev, [model]: { ...prev?.[model], query: e.target.value } }
        })

        if (e.target.value === null || e.target.value === undefined || e.target.value === "") {
            setData(() => serverData || [])
            return
        }

        const result = searchTable(e.target.value, serverData?.data, tableHead)
        setData(() => {
            return { data: result || [] }
        })
    }


    return (
        <div className='my-3'>
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-2'>
                <div className="bg-blue-300 p-3 text-blue-900 rounded-full w-full flex items-center justify-between">
                    <div className='flex items-center justify-between flex-auto gap-2'>
                        <div className='flex items-center justify-start gap-2 text-sm md:text-base lg:text-lg flex-1'>
                            {icon}
                            <p>{customName ? customName : currentPage} {showTable && <span className="mx-2 px-2 rounded-md bg-blue-200 text-blue-900 font-semibold">
                                {dataCount ? dataCount : 0}
                            </span>} </p>
                        </div>
                        {
                            loading?.[model] && <div className="spinner-border" style={{ width: "1.5rem", height: "1.5rem", fontSize: '12.31px' }} role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        }
                        {
                            search?.[model] && search?.[model]?.isSearchOpen ? <SearchOffRoundedIcon onClick={toggleSearch} sx={{ fontSize: "28px", color: '#1e3a8a', cursor: 'pointer' }} /> : <SearchRoundedIcon onClick={toggleSearch} sx={{ fontSize: "28px", color: '#1e3a8a', cursor: 'pointer' }} />
                        }

                    </div>
                </div>

                <div className='flex items-center justify-start md:mt-0 mt-2 gap-2'>
                    {
                        showAddButton && <button onClick={() => { clickd() }} className='bg-blue-100 px-5 text-blue-800 hover:bg-blue-200 border-2 border-blue-200 ease-in-out duration-200 p-1 whitespace-nowrap sm:whitespace-normal rounded-full w-full'>
                            <AddRoundedIcon className='text-blue-800' />
                            Add </button>
                    }

                    {
                        showActionButton &&
                        <div className="btn-group w-full">
                            <button type="button" className="bg-orange-100 px-5 text-orange-800  hover:bg-orange-200 border-2 border-orange-200 ease-in-out duration-200 p-1 whitespace-nowrap sm:whitespace-normal rounded-full  w-full" data-bs-toggle="dropdown" aria-expanded="false">
                                <ImportExportRoundedIcon className='text-orange-800' />
                                <span className='whitespace-nowrap'>Actions</span>
                            </button>
                            <ul className="dropdown-menu cursor-pointer">
                                {BulkExcelOption && <li onClick={excelClicked} ><span className="dropdown-item inline-flex gap-3 text-green-800"><FileUploadRoundedIcon size="large" /> Upload Bulk Excel </span></li>}
                                <ActionExcelButton tableHead={tableHead} data={data} serviceName={serviceName || module} proof={getproof} proof2={getproof2} model={model} year={year} title={title} link={link} />
                                <li onClick={downloadTable} ><span className="dropdown-item inline-flex gap-3 text-red-800"><FileDownloadRoundedIcon size="large" /> Download Table PDF </span></li>

                                {
                                    getproof && <li onClick={downloadProof}><span className="dropdown-item inline-flex gap-3 text-red-800"><FileDownloadRoundedIcon size="large" /> Download Proofs PDF </span></li>
                                }

                            </ul>
                        </div>
                    }

                </div>
            </div>

            {
                search?.[model]?.isSearchOpen && <div className='my-2 border-2 border-blue-400 rounded-full flex items-center gap-2 overflow-hidden p-3 bg-blue-50 animate-fade-up animate-once'>
                    <SearchRoundedIcon sx={{ color: '#4c99f7' }} />
                    <input className="w-full outline-none border-none bg-transparent" placeholder={`Search any column of ${title}`} type="search" value={search?.[model]?.query || null} autoFocus onChange={searchChange} name="search" id="search" />
                </div>
            }


            {
                (search?.[model]?.isSearchOpen && (search?.[model]?.query?.length > 0)) && <p className="mt-3 text-sm">Showing results for <span className='font-medium'>"{search?.[model]?.query}"</span> </p>
            }


        </div>
    )
}

export default TableTitle
