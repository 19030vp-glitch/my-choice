import React from 'react'
import serverLinks from '../../../js/serverLinks'

const YFStudentsList = ({ students }) => {
    return (
        <div>
            <p className="text-muted text-sm">सर्व विद्यार्थी</p>
            <div className="grid grid-cols-4 mt-3">
                {
                    students?.map((student) => {
                        return <div className="p-2 m-2 sm:pb-4 bg-blue-50 rounded-md">
                            <StudentInfo student={student} />
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default YFStudentsList


const StudentInfo = ({ student }) => {
    return <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
            <img className="w-8 h-8 rounded-full" src={serverLinks.showFile(student?.photoURL, 'youth')} alt="Neil image" />
        </div>
        <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
                {student?.ParticpantName}
            </p>
            <p className="text-sm text-gray-500 truncate">
                <span className={student?.competitions?.length === 4 ? `text-red-600 text-medium` : `text-medium text-green-700`}><b>{student?.competitions?.length ? student?.competitions?.length : 0}</b> मध्ये भाग घेतला</span>
            </p>
        </div>
    </div>
}


export { StudentInfo }