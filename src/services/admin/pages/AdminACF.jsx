import React, { useEffect, useState } from 'react'
import TabBox from '../../status/components/TabBox'
import { academicYearGenerator, listOfYears } from '../../../inputs/Year'
import { useQuery } from 'react-query'
import { getACFDataForStatus } from '../js/acfHandler'
import UserLoading from '../../../pages/UserLoading'
import ACFFillDetails from '../../affliated-college-fees/pages/ACFFillDetails'

const AdminACF = () => {

    let tabs = ['College Submission Status', 'Detailed College Data']
    const [activePage, setActivePage] = useState(0)
    const [academicYear, setAcademicYear] = useState(academicYearGenerator(1, null, true)[0])
    const [selectedCollege, setSelectedCollege] = useState(null)
    const [customFilters, setCustomFilters] = useState(null)
    const [district, setDistrict] = useState("")
    const [filteredCollege, setFilteredCollege] = useState([])

    const { data, isLoading } = useQuery(`CollegeList-${academicYear}`, () => getACFDataForStatus(), { refetchOnWindowFocus: false })

    useEffect(() => {
        if (activePage === 1 && filteredCollege) {
            filteredCollege?.forEach((college) => {
                if (selectedCollege === college._id) {

                    setCustomFilters(() => {
                        return {
                            collegeName: college.collegeName,
                            collegeCode: college.collegeCode,
                            collegeCodeHash: college.collegeCodeHash
                        }
                    })
                }
            })
        }


    }, [activePage, selectedCollege, data, district, filteredCollege])

    useEffect(() => {
        if (district) {
            setFilteredCollege(() => {
                return data?.data.filter((item) => district === item.district)
            })
        } else {
            setFilteredCollege(data?.data)
        }
    }, [district, selectedCollege, data])


    return (
        <div>
            <div className="border-2 my-1 p-2">
                <div className="lg:flex items-center justify-between w-full pb-2 border-b-2 gap-5">

                    <div>
                        <TabBox tabs={tabs} value={activePage} setValue={setActivePage} />
                    </div>

                    <div className='flex-1 flex items-center gap-3'>
                        <div className='col-md-3'>
                            <div className="relative">
                                <select
                                    className="form-select pr-8" // Add padding for the icon
                                    id="validationCustom04"
                                    required
                                    onChange={(e) => { setDistrict(e.target.value); }}
                                    value={district}
                                >
                                    <option disabled value="">Choose District</option>
                                    {(["Nanded", "Latur", "Parbhani", "Hingoli"]).map((item, index) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </select>
                                {district && (
                                    <button
                                        className="absolute inset-y-0 right-5 px-3 flex items-center bg-transparent"
                                        onClick={() => setDistrict("")} // Clear the selection
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                        </svg>
                                    </button>
                                )}
                            </div>


                        </div>
                        {
                            activePage === 1 && <div className='col-md-4 relative'>
                                <select className="form-select" id="validationCustom04" required onChange={
                                    (e) => { setSelectedCollege(e.target.value); }} value={selectedCollege}>
                                    <option selected disabled value="">Choose Affiliated College</option>

                                    {(filteredCollege)?.map((college) => {
                                        return <option key={college._id} value={college._id}>{college.collegeName}</option>
                                    })}
                                </select>
                                {selectedCollege && (
                                    <button
                                        className="absolute inset-y-0 right-5 px-3 flex items-center bg-transparent"
                                        onClick={() => setSelectedCollege("")} // Clear the selection
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                        </svg>
                                    </button>
                                )}
                            </div>
                        }
                        <div className='col-md-2'>
                            <select className="form-select" id="validationCustom04" required onChange={
                                (e) => { setAcademicYear(e.target.value); }} value={academicYear}>
                                <option selected disabled value="">Choose Academic Year</option>

                                {(listOfYears).map((academicYear, index) => {
                                    return <option key={index} value={academicYear}>{academicYear}</option>
                                })}
                            </select>
                        </div>
                    </div>
                </div>

                {activePage === 0 && <div className='mt-4 ml-2'>
                    <p className='font-medium'>{tabs[activePage]} {` (${academicYear})`}</p>
                    <div className="mt-2">
                        {!isLoading
                            ? filteredCollege?.length > 0 ? <table className='table table-bordered'>
                                <thead className="bg-primary text-light">
                                    <tr>
                                        <th>Sr. No.</th>
                                        <th>College Name</th>
                                        <th>College Code</th>
                                        <th>District</th>
                                        <th>Submission Status</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-light'>
                                    {
                                        filteredCollege.map((item, index) => {
                                            return <tr key={item._id}>
                                                <td>{index + 1}</td>
                                                <td>{item.collegeName}</td>
                                                <td>{item.collegeCode}</td>
                                                <td>{item.district}</td>
                                                <td>{item?.isSubmitted?.includes(academicYear)
                                                    ? <span className="text-green-500 font-semibold p-2 rounded">Submitted</span>
                                                    : <span className="text-red-500 font-semibold p-2 rounded">Pending</span>}
                                                </td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                                : <p className="text-center my-5 text-yellow-500">No Data Found</p>
                            : <UserLoading title="Getting College Data" />
                        }
                    </div>
                </div>}

                {
                    activePage === 1 && ((selectedCollege && customFilters) ? <div className='mt-4 ml-2'>
                        <p className='font-medium'>{tabs[activePage]} {` (${academicYear}) for `} <span className="text-blue-800 font-bold">{customFilters?.collegeName}</span> </p>
                        <div className="mt-2">
                            <ACFFillDetails authenticate={false} customFilter={customFilters}
                                customAcademicYear={academicYear} showAddButton={false} />
                        </div>
                    </div> : <p className='my-5 text-yellow-500 text-center'>Choose an Affiliated College to see their filled information</p>)
                }
            </div>
        </div>
    )
}

export default AdminACF
