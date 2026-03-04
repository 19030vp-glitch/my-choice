import React from 'react'
import SchoolsProgram from '../../../components/SchoolsProgram'

const SchoolList = ({ school, setSchool }) => {
    return (
        <div className="p-3 rounded-xl">
            <ul className="list-group">
                <li className="list-group-item text-white bg-primary" aria-current="true">Choose School to check the status</li>
                {
                    Object.keys(SchoolsProgram).map((schoolName, index) => {
                        return <li onClick={() => setSchool(schoolName)} className={`hover:text-blue-800 cursor-pointer list-group-item d-flex justify-content-between align-items-center ${schoolName === school && 'bg-blue-100 text-blue-800 font-semibold'}`}>
                            {schoolName}
                        </li>
                    })
                }

            </ul>
        </div>
    )
}

export default SchoolList
