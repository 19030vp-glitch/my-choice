import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import GoBack from '../../../components/GoBack'
import fetchData, { fetchAlumniData } from '../js/fetchData'
import UserLoading from '../../../pages/UserLoading';
import TableComponent from '../../../components/TableComponent';
import serverLinks from '../../../js/serverLinks';
import capitalizeText from '../../../js/capitalizeText';

const AllAlumni = ({ school }) => {

    // const { school } = useParams()

    const param = { school }
    const { data, isLoading, isError, error, refetch } = useQuery([param.school, param], () => fetchAlumniData(param))
    const [DATA, setData] = useState([])

    useEffect(() => {
        setData(data?.data?.data?.Alumni?.sort((a, b) => (a.programGraduated > b.programGraduated) ? 1 : ((b.programGraduated > a.programGraduated) ? -1 : 0)))
    }, [data]);

    return (
        <div>
            <div className="sticky-top bg-white text-[19px] font-bold pt-2 flex justify-center">
                {school}
            </div>

            <div className='mt-11'>

                <TableComponent tableHeads={["Name", "Gender", "Program Graduated", "Completed In"]} tableCells={false}>
                    {
                        DATA?.map((item) => {
                            return <tr>
                                <td className='font-bold'></td>
                                <td className='w-[40%]'>
                                    <div>
                                        <p>{item?.salutation} {capitalizeText(item?.name)}</p>
                                    </div>
                                </td>
                                <td>{item?.gender}</td>
                                <td>{item?.programGraduated}</td>
                                <td>{`${item && item.doCompletion === undefined || item.doCompletion === null || item.doCompletion === '' ? "-" : item.doCompletion}`}</td>

                            </tr>
                        })
                    }
                </TableComponent>
                {isLoading && <UserLoading title="Fetching data" />}


            </div>

        </div>
    )
}

export default AllAlumni