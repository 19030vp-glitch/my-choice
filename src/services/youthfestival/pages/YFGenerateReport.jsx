import React, { useEffect, useState } from 'react'
import GenerateReportTemplate from '../../../components/GenerateReportTemplate'
import siteLinks from '../../../components/siteLinks'
import yfGeneratePDF, { getYears } from '../js/yfGeneratePDF'
import { useQuery } from 'react-query'
import EngineeringRoundedIcon from '@mui/icons-material/EngineeringRounded';
import { useSelector } from 'react-redux'
import useYouthAuth from '../../../hooks/useYouthAuth'
import UserLoading from '../../../pages/UserLoading'
import { Link } from 'react-router-dom'
import Note from '../../director/reports/academic-audit/components/Note'


const YFGenerateReport = () => {
    const bredLinks = [siteLinks.welcome, siteLinks.yfCollegeHome, siteLinks.yfCollegeReport]
    const [reportLoading, setReportLoading] = useState(false)
    const [selectedYear, setSelectedYear] = useState(null)
    useYouthAuth(false)
    const user = useSelector((state) => state.user?.youthUser)
    const filter = { college: user?._id }
    const { data, isLoading } = useQuery('YFSubmittedYears', () => getYears(filter))

    return (
        <div>
            <GenerateReportTemplate bredLinks={bredLinks} backLink={siteLinks.yfCollegeHome.link} title="Generate Youth Festival Participation PDF" loading={reportLoading} >
                <div className='h-screen w-full'>

                    <div className='bg-blue-100 rounded-xl p-5 mt-4 sm:w-[90%] md:w-[80%] lg:w-[60%] w-full sm:mx-auto'>

                        <p className='text-base md:text-lg text-center'>Select Year(s) of which Youth Festival Report to be generated</p>
                        <p className='text-center text-muted text-xs md:text-sm'>Click on the respective year to select, and click the button below to generate report.</p>
                        <div className='flex items-center justify-center gap-3 mt-3'>

                            {
                                isLoading ?
                                    <UserLoading title="Fetching Years" />
                                    :
                                    (data?.data?.data[0])
                                        ?
                                        <SelectYearRadio sortedYear={data?.data?.data?.[0].submitted} setSelectedYear={setSelectedYear} selectedYear={selectedYear} />
                                        :
                                        <div className="text-center">
                                            <Link to={siteLinks.yfCollegeYouthForm.link} className="text-red-600">No Youth Festival Form Submitted Yet, Click to Fill Form</Link> <br /><br />
                                            <Note title="जोपर्यंत तुम्ही संपूर्ण फॉर्म सबमिट करत नाही, तोपर्यंत तुम्ही अर्ज किंवा अहवाल तयार करू शकणार नाही." />


                                        </div>
                            }


                        </div>

                        {selectedYear &&
                            <div className="flex items-center justify-center mt-3">
                                <button className='flex gap-2 items-center justify-center my-1 rounded-full bg-blue-800 px-3 py-2 hover:bg-blue-900 text-white' onClick={() => { yfGeneratePDF(selectedYear[0], user, setReportLoading) }}>
                                    <EngineeringRoundedIcon /> Download Youth Festival Application Form
                                </button>
                            </div>
                        }

                    </div>

                </div>
            </GenerateReportTemplate>
        </div>
    )
}

export default YFGenerateReport

const SelectYearRadio = ({ sortedYear, selectedYear, setSelectedYear }) => {

    return (
        <div className="flex flex-col sm:flex-row items-center justify-center mt-2  flex-wrap">
            {sortedYear && sortedYear?.map((item) => {

                return (

                    <div className="form-check sm:px-8 py-2" key={item}>

                        <div className="form-check">
                            <input className="form-check-input text-lg border-2 border-blue-500" type="radio" name="flexRadioDefault" id={item} checked={selectedYear?.includes(item)} onChange={() => { setSelectedYear([item]) }} />
                            <label className="form-check-label text-lg text-blue-900 font-bold" htmlFor={item}>
                                {item}
                            </label>
                        </div>
                    </div>
                )

            })}

        </div >
    )
}
