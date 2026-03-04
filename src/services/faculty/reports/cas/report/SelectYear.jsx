import React, { useEffect, useState } from 'react'
import EngineeringRoundedIcon from '@mui/icons-material/EngineeringRounded';
import { Alert, CircularProgress } from '@mui/material';
import { generateCASReport, getProofs } from '../CASServices';
import { useNavigate } from 'react-router-dom';
import siteLinks from '../../../../../components/siteLinks';
import ShowModal from '../../../../../components/ShowModal';
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';


const SelectYear = ({ casYear, setLoadingTitle, userData, setReportLoading, error }) => {

    const [selectedYear, setSelectedYear] = useState([])
    let sortedYear = null;


    if (casYear) {

        const filteredYear = casYear.filter((item) => JSON.parse(item).casYear !== null);

        // Sort the array in ascending order
        sortedYear = filteredYear.sort((a, b) => {
            const yearA = JSON.parse(a).casYear;
            const yearB = JSON.parse(b).casYear;

            if (yearA < yearB) {
                return -1;
            }
            if (yearA > yearB) {
                return 1;
            }
            return 0;
        });
    }


    const navigate = useNavigate()
    const [forPrintOut, setForPrintOut] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleGeneration = () => {
        setReportLoading({ isLoading: true, title: 'Generating CAS Report' });
        generateCASReport(userData, selectedYear, setReportLoading, forPrintOut)
    }

    const handleProofsGeneration = () => {
        setReportLoading({ isLoading: true, title: 'Collecting your CAS Proofs' });
        getProofs(userData, selectedYear, setReportLoading, 'CAS')

    }



    return (
        <div>

            <div className='bg-blue-100 rounded-xl p-5 mt-4 sm:w-[90%] md:w-[80%] lg:w-[60%] w-full sm:mx-auto'>
                {
                    sortedYear ?
                        <div>
                            <p className='text-base md:text-lg text-center'>Select Year(s) of which CAS Report to be generated</p>
                            <p className='text-center text-blue-900 text-xs md:text-sm'>Click on the respective year to select, click again to unselect.</p>
                            <div className='flex items-center justify-center gap-3 mt-3'>

                                <SelectYearRadio sortedYear={sortedYear} setSelectedYear={setSelectedYear} selectedYear={selectedYear} />

                            </div>

                            <ShowModal okText={"Download Report"} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} title="Choose report type" onOkFunc={handleGeneration}>
                                <div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="printableOrNot" id="standard" checked={forPrintOut ? false : true} onChange={(e) => { setForPrintOut(false) }} />
                                        <label className="form-check-label" htmlFor="standard">
                                            Standard Report
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="printableOrNot" id="printable" checked={forPrintOut ? true : false} onChange={(e) => { setForPrintOut(true) }} />
                                        <label className="form-check-label" htmlFor="printable">
                                            Printable Report (Specially designed for printing purposes)
                                        </label>
                                    </div>
                                </div>
                            </ShowModal>

                            {selectedYear.length > 0 &&
                                <div className='flex flex-col sm:flex-row items-center justify-center gap-3 flex-wrap mt-5 w-full'>
                                    <button className='flex items-center justify-center my-1 rounded-full bg-blue-800 px-3 py-2 hover:bg-blue-900 text-white' onClick={() => { setIsModalOpen(true); setForPrintOut(false) }}>
                                        <EngineeringRoundedIcon /> Download CAS Report
                                    </button>
                                    <button className='flex items-center justify-center my-1 rounded-full bg-green-800 px-3 py-2 hover:bg-green-900 text-white' onClick={() => { handleProofsGeneration() }}>
                                        <FileDownloadRoundedIcon /> Download Proofs
                                    </button>
                                </div>
                            }
                        </div>
                        :
                        <div className='flex flex-col items-center justify-center mt-3'>
                            {
                                error === null && <CircularProgress />
                            }
                            {
                                error !== null &&
                                <div className='flex flex-col gap-1 items-center justify-center'>
                                    <Alert severity="error"><span className='text-red-600'>{error.message}</span></Alert>
                                    <button className='flex items-center justify-center mx-auto gap-2 mt-5 rounded-full bg-blue-800 px-3 py-2 hover:bg-blue-900 text-white' onClick={() => { navigate(siteLinks.casReport) }}>
                                        Fill CAS Form
                                    </button>
                                </div>
                            }

                        </div>
                }
            </div>
        </div>
    )
}

export default SelectYear



const SelectYearRadio = ({ sortedYear, selectedYear, setSelectedYear }) => {

    const selectCheckBox = (year) => {


        // Check if the checkbox is checked 
        if (document.getElementById(year).checked) {
            setSelectedYear([...selectedYear, year])
        }
        else {
            setSelectedYear(selectedYear.filter(y => y !== year))
        }


    }
    return (
        <div className="flex flex-col sm:flex-row items-center justify-center mt-2 flex-wrap">
            {sortedYear && sortedYear.map((item) => {

                return (

                    <div className="form-check sm:px-8 py-2" key={JSON.parse(item).casYear}>
                        <input className="form-check-input text-lg border-2 border-blue-500" type="checkbox" value="" id={JSON.parse(item).casYear}
                            onChange={(e) => { selectCheckBox(e.target.id) }} />
                        <label className="form-check-label text-lg text-blue-900 font-bold" htmlFor={JSON.parse(item).casYear}>
                            {JSON.parse(item).casYear}
                        </label>
                    </div>
                )

            })}

        </div >
    )
}

