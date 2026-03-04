import React, { useEffect } from 'react'
import GoBack from '../../../components/GoBack'
import Footer from '../../../components/Footer'
import siteLinks from '../../../components/siteLinks'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { fetchPrograms } from '../js/fetchPrograms'
import title from '../../../js/title'
import UserLoading from '../../../pages/UserLoading'
import { Empty } from 'antd'

const ProgramHome = () => {
    let bredLinks = [siteLinks.welcome, siteLinks.programs]

    const params = { filter: {}, select: "title programDate arrangedBy createdAt" }
    const { data, isLoading } = useQuery("FetchingAllThePrograms", () => fetchPrograms(params))

    title('University Programs')

    return (
        <div>
            <GoBack backUrl={-1} pageTitle="Programs" bredLinks={bredLinks} />
            <div className="animate-fade-up animate-once h-screen">
                {
                    isLoading ? <UserLoading title="Fetching University Programs" /> :
                        data?.data?.data?.length > 0 ?
                            <section className='mt-4 grid-cols-2 gap-3 md:grid'>

                                {data?.data?.data?.map((programData, index) => {
                                    return <ProgramTile key={index} programData={programData} />
                                })
                                }
                            </section>

                            : <div className='mt-5'>
                                <Empty description="No Programs Found at the moment." />
                            </div>
                }

            </div>

            <div className="mt-5">
                <Footer />
            </div>

        </div>
    )
}

export default ProgramHome

const ProgramTile = ({ programData }) => {

    const navigate = useNavigate()

    return <div onClick={() => navigate(`/program/${programData._id}`)} className="rounded-lg cursor-pointer hover:bg-blue-100 animate-fade-up animate-once p-2 text-gray-800 border-2 mb-2 md:mb-0 border-gray-300 hover:border-blue-300 bg-gray-50" role="alert">

        <p className="text-lg">{programData.title} </p>

        <div className="my-2 w-full">
            <span class="bg-green-100 text-green-800 text-sm mr-2 px-2.5 py-0.5 rounded ">Organized by <b>{programData.arrangedBy}</b>
            </span>
            <span class=" bg-yellow-100 inline-flex items-center text-yellow-800 text-sm mr-2 px-2.5 py-0.5 rounded ">
                <b> {programData?.programDate} </b>
            </span>

        </div>


    </div>
}
