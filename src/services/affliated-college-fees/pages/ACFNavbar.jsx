import React, { useState } from 'react'
import ArrowButton from '../../../components/ArrowButton'
import { submitDetails } from '../js/acfDataHandler'
import { useParams } from 'react-router-dom'

const ACFNavbar = ({ programsOffered, setCurrentProgram, currentProgram, showSubmitButton }) => {

    const [isLoading, setIsLoading] = useState(false)
    const { collegeCode, collegeCodeHash, academicYear } = useParams()

    const submitDetailsHandler = async () => {
        const filter = { collegeCode, collegeCodeHash };

        submitDetails(filter, academicYear, setIsLoading)
    }


    return (
        <div className="sm:bg-gray-100 rounded-lg p-2 flex items-center justify-end">
            <div className="hidden md:flex items-center justify-center gap-10 text-center flex-1">
                {
                    programsOffered?.map((program, index) => {
                        return <span onClick={() => setCurrentProgram(program)} className={`${program === currentProgram && 'border-b-2 text-blue-600 border-b-blue-600'}  hover:bg-gray-50 p-2 cursor-pointer text-xs md:text-sm text-center font-medium select-none`} key={index}>{program} Program</span>
                    })
                }
            </div>
            {showSubmitButton && <ArrowButton disabled={isLoading} onClickFunction={submitDetailsHandler} title={isLoading ? 'Submitting...' : "Submit All Details"} />}
        </div>
    )
}

export default ACFNavbar
