import React, { useEffect, useState } from 'react'
import GoBack from '../../../components/GoBack'
import useOtherServiceAuth from '../../../hooks/useOtherServiceAuth'
import title from '../../../js/title'
import siteLinks from '../../../components/siteLinks'
import { useSelector } from 'react-redux'
import Footer from '../../../components/Footer'
import DashboardFilters from '../components/DashboardFilters'
import { useQuery } from 'react-query'
import getYFDashboardData from '../js/yfDashboardHandler'
import UserLoading from '../../../pages/UserLoading'
import CollegeList from '../components/CollegeList'
import IndiGroupList from '../components/IndiGroupList'
import authParamsObject from '../../../js/authParamsObject'

const YouthDashboard = () => {
    useOtherServiceAuth({ ...authParamsObject.dsd, shouldNavigate: false })
    title(siteLinks.dsdDashboard.title)
    const user = useSelector((state) => state.user?.dsdUser)
    const bredLinks = [siteLinks.welcome, siteLinks.dsdHome, siteLinks.dsdDashboard]

    // data filters
    const initialFilter = { district: null, category: null, competitionName: null }
    const [dataFilter, setDataFilter] = useState(initialFilter)

    const { data, isLoading } = useQuery(JSON.stringify(dataFilter), () => getYFDashboardData(dataFilter))

    useEffect(() => {
        setDataFilter({ ...dataFilter, competitionName: null })
    }, [dataFilter?.category])

    return (
        <div>
            <GoBack pageTitle="Youth Festival Dashboard for DSD" bredLinks={bredLinks} showAvatar={{ photoURL: user?.photoURL, userType: 'dsd' }} />

            <div className='animate-fade-up animate-once min-h-screen bg-gray-50 rounded-md mt-4 border p-3'>
                <DashboardFilters initialFilter={initialFilter} colleges={data?.data?.data} setDataFilter={setDataFilter} dataFilter={dataFilter} />
                {
                    isLoading ?
                        <UserLoading title="Fetching Details" />
                        :
                        <div>

                            {((dataFilter.district || dataFilter.district === null) && dataFilter.category === null && dataFilter.competitionName === null) ? <div>
                                <p className="my-2">Colleges {`(${dataFilter?.district ? dataFilter?.district : 'All'})`}</p>
                                <CollegeList collegeData={data?.data?.data} />
                            </div> : <div>
                                <IndiGroupList category={dataFilter?.category} competitionName={dataFilter.competitionName} allCompetitions={data?.data?.data?.allCompetition} />
                            </div>}
                        </div>
                }

            </div>

            <Footer />
        </div>
    )
}

export default YouthDashboard
