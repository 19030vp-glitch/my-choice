import React from 'react'
import Note from '../services/director/reports/academic-audit/components/Note'

const ArrowButton = ({ title, onClickFunction, className, type = "button", colorClasses = "text-white bg-blue-700 hover:bg-blue-800", note = null, showArrow = true, disabled }) => {
    return (
        <>
            <button onClick={onClickFunction} type={type} className={`${colorClasses} font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center ${className}`} disabled={disabled} >
                {title}
                {
                    showArrow && <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                }

            </button>
            {
                note && <Note title={note} />
            }
        </>
    )
}

export default ArrowButton
