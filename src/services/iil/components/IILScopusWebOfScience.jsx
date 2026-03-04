import React from 'react'
import ScopusWOSCollection from './ScopusWOSCollection'

const IILScopusWebOfScience = ({ type, academicYear }) => {
    return (
        <div>
            <div className="bg-gray-50 p-2 rounded-md border-2">
                <p className="font-semibold pb-2 border-b">1. Scopus</p>
                <ScopusWOSCollection academicYear={academicYear} type={type} />
            </div>
            <div className="bg-gray-50 p-2 rounded-md border-2 mt-2">
                <p className="font-semibold pb-2 border-b">2. Web of Science</p>
                <ScopusWOSCollection academicYear={academicYear} type={type} isScopus={false} />
            </div>
        </div>
    )
}

export default IILScopusWebOfScience
