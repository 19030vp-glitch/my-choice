import React from 'react'
import { useQuery } from 'react-query'
import fetchData from '../js/fetchData'
import UserLoading from '../../../pages/UserLoading'
import DirectorTableComponent from '../../../components/DirectorTableComponent'

const DirectorDashboardData = ({ model, filter, school }) => {

    const param = { model, filter }
    const { data, isLoading } = useQuery(["DirectorDasboardData", school], () => fetchData(param))

    return (
        <div>
            <div className="sticky-top bg-white text-[19px] font-bold pt-2 flex justify-center">
                {school}
            </div>

            <div className='mt-3'>

                {
                    isLoading ? <UserLoading title="Fetching data" /> : <DirectorTableComponent model={model && model} data={data?.data?.data} />
                }

            </div>
        </div>
    )
}

export default DirectorDashboardData