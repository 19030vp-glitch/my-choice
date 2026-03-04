import React, { useState } from 'react'
import { navbarLinks } from '../../director/reports/nirf/components/NIRFNavbar'
import AdminStudentIntake from '../components/AdminStudentIntake'
import { SelectStatusYear } from '../../status/pages/StatusPage'
import { academicYearGenerator } from '../../../inputs/Year'
import AdminStudentStrength from '../components/AdminStudentStrength'
import AdminProgressionNIRF from '../components/AdminProgressionNIRF'

const AdminNIRF = () => {

    const [currentPage, setCurrentPage] = useState("sanctioned-intake")
    const [academicYear, setAcademicYear] = useState(academicYearGenerator(1, false)[0])

    const tables = {
        "sanctioned-intake": <AdminStudentIntake academicYear={academicYear} />,
        "student-strength": <AdminStudentStrength academicYear={academicYear} />,
        "placement-and-higher-education": <AdminProgressionNIRF academicYear={academicYear} />,
        "patents": <AdminProgressionNIRF academicYear={academicYear} module="patents" />,
        "consultancy": <AdminProgressionNIRF academicYear={academicYear} module="consultancy" />,
        "programs-organized": <AdminProgressionNIRF academicYear={academicYear} module="programs-organized" />,
    }


    return (
        <div>
            <div className="border-2 my-1 p-2">
                <div className="my-2">
                    <AdminNavbarNIRF currentPage={currentPage} setCurrentPage={setCurrentPage} />
                </div>

                <SelectStatusYear setYear={setAcademicYear} year={academicYear} className="mb-2" />

                <div>
                    {
                        tables[currentPage] || <div className='text-center my-5'>Under Construction</div>
                    }
                </div>
            </div>
        </div>
    )
}

export default AdminNIRF


const AdminNavbarNIRF = ({ setCurrentPage, currentPage }) => {
    return <div className="sm:bg-gray-100 rounded-lg p-2">
        <div className="hidden md:flex items-center justify-between gap-2 text-center">
            {
                Object.keys(navbarLinks).map((item, index) => {
                    return navbarLinks[item].title !== "School Programs" &&
                        <span onClick={() => setCurrentPage(navbarLinks[item].abbv)}
                            className={`${item === currentPage && 'border-b-2 text-blue-600 border-b-blue-600'}  hover:bg-gray-50 p-2 cursor-pointer text-xs md:text-sm text-center font-medium select-none`} key={index}>{navbarLinks[item].title}</span>
                })
            }
        </div>
    </div>
}
