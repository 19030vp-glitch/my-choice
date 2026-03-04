import React, { useState } from 'react'
import BookmarkAddedRoundedIcon from '@mui/icons-material/BookmarkAddedRounded';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { saveCASDetails } from '../CASServices';
import { useEffect } from 'react';
import SummarySheet from './SummarySheet';
import Axios from 'axios';
import { toast } from 'react-hot-toast';
import submitReportForm from '../../../../../js/submitReportForm';

const FinalPage = ({ casYear, casYearState, setTabName, handleNext }) => {

    const navigate = useNavigate()
    const casData = useSelector((state) => state.cas)
    const user = useSelector((state) => state.user.user)

    const submitForm = (e) => {
        e.preventDefault()
        let filter = { userId: user._id }
        submitReportForm(navigate, casYearState, filter, 'CASModel')
        handleNext()
        setTabName('ack')

    }


    return (
        <div>
            {/* Summary Table / Sheet */}
            <div>
                <SummarySheet casData={casData} casYearState={casYearState} />
            </div>
            <div className='text-center'>

                <form className='flex flex-col gap-5 items-center justify-center w-full mt-5' onSubmit={submitForm}>
                    <div className="form-check md:w-1/3 w-full">
                        <input className="form-check-input" type="checkbox" value="" id="finalCheckBox1" required />
                        <label className="form-check-label" htmlFor="finalCheckBox1">
                            I have filled all the necessary information and I would like to save it as CAS information for year <span className='font-bold'>{casYear && casYear}</span>.
                        </label>
                    </div>


                    <button type='submit' className="flex items-center justify-start p-2 rounded-xl text-blue-900 font-bold bg-blue-200 hover:gap-2 duration-200 ease-in-out"><BookmarkAddedRoundedIcon /><span className='ml-2'>Submit CAS Form</span></button>


                </form>

            </div>
        </div >
    )
}

export default FinalPage