import React from 'react'
import { useParams } from 'react-router-dom'

const Header = ({ title, academicYear, schoolName }) => {

    return (
        <div className='border-t-[7px] border-t-blue-700 rounded-md mt-3'>
            <div className='text-center rounded-b-md p-2 bg-blue-50'>
                <p className='text-2xl pb-2 border-b font-semibold '>{title} <span>{academicYear ? `(${academicYear})` : ""}</span> </p>
                <p className='py-2'>{schoolName}</p>
                <p className="text-xs text-muted">Form is saved automatically. You will not lose your progress.</p>
            </div>
        </div>
    )
}

export default Header
