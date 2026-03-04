import React from 'react'
import { useQuery } from 'react-query'
import TableComponent from '../../../components/TableComponent'
import sortByAcademicYear from '../../../js/sortByAcademicYear'
import UserLoading from '../../../pages/UserLoading'
import { departmentWiseFetching } from '../js/fetchData'

const OtherDashboardData = ({ model, school }) => {


    // const { model, title: pageTitle, school } = useParams()
    const param = { model, school, userType: 'faculty' }
    const { data, isLoading, } = useQuery([param.model, param], () => departmentWiseFetching(param))

    return (
        <div>
            <div className="sticky-top bg-white text-[19px] font-bold pt-2 flex justify-center">
                {school}
            </div>

            <div className='mt-3'>

                {
                    isLoading ? <UserLoading title="Fetching data" /> : <TableComponent model={model && model} data={sortByAcademicYear(data?.data?.data, 'year')} takeFromModal={true} />
                }

            </div>
        </div>
    )
}

export default OtherDashboardData