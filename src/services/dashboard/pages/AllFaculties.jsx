import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import GoBack from '../../../components/GoBack'
import fetchData from '../js/fetchData'
import UserLoading from '../../../pages/UserLoading'
import capitalizeText from '../../../js/capitalizeText'
import EmptyBox from '../../../components/EmptyBox'
import ShowImage from './ShowImage'
import designationWiseSorting from '../../../js/designationWiseSorting'
import { convertToURLFormat } from '../js/prettifyTextForLink'

const AllFaculties = ({ school: sch }) => {

    const { school } = useParams()

    const param = { model: 'User', filter: { department: school || sch } }
    const { data, isLoading } = useQuery([`${param.model}-${school || sch}`, school || sch], () => fetchData(param), { staleTime: 600000 })



    return (
        <div>
            {sch ? <div className=" bg-white text-lg font-bold py-2 border-b flex justify-center">
                {`Faculties of ${sch}  ${data && `(${data?.data?.data?.length})`}`}
            </div> : <div className=" bg-white">
                <GoBack backUrl={-1} pageTitle={`Faculties of ${school}`} />
            </div>}

            <div>

                <div className='mt-5'>
                    <AllFacultyTable data={data} isLoading={isLoading} />
                </div>
            </div>

        </div>
    )
}

export default AllFaculties

const AllFacultyTable = ({ data, isLoading }) => {


    return <div className='table-responsive w-full'>
        <table className="table table-bordered css-serial">
            <thead className='bg-blue-600 text-white'>
                <tr>
                    <th scope="col">Sr No.</th>
                    <th scope="col">Photo</th>
                    <th scope="col">Faculty Name</th>
                    <th scope="col">Employee ID</th>
                    <th scope="col">Designation</th>
                    <th scope="col">Field of Specialization</th>

                </tr>
            </thead>
            <tbody>

                {
                    designationWiseSorting(data?.data?.data)?.map((item) => {
                        return <tr>
                            <td className='font-bold'></td>
                            <td className='min-w-32'><ShowImage fileName={item?.photoURL} serviceName={'faculty'} /></td>

                            <td className='w-[25%]'>
                                <div>
                                    <p>{item?.salutation} {capitalizeText(item?.name)}</p>
                                    <button className='p-2 my-2 text-sm rounded-md bg-blue-200 text-blue-800 hover:bg-blue-100' onClick={() => {
                                        const url = '/dashboard/faculty/' + (item ? convertToURLFormat(item.name) : '');
                                        window.open(url, '_blank');
                                    }}>View Profile</button>
                                </div>
                            </td>
                            <td>{item?.username.includes('UFTG') || item.username.includes('C-') ? item.username : `TG-${item.username}`}</td>
                            <td>{item?.designation === 'Contractual' ? 'Assistant Professor (Contractual)' : item?.designation}</td>
                            <td>{item?.specialization}</td>
                        </tr>
                    })
                }

            </tbody>
        </table>
        {isLoading && <UserLoading title="Fetching data" />}


        {
            data?.data?.data?.length === 0 && <EmptyBox />
        }

    </div>
}


export { AllFacultyTable }