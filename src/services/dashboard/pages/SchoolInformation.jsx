import React, { useEffect, useState } from 'react'
import GoBack from '../../../components/GoBack'
import { useNavigate, useParams } from 'react-router-dom'
import title from '../../../js/title'
import ServiceDashboard from './ServiceDashboard'
import fetchData, { fetchSchoolData } from '../js/fetchData'
import { useQuery } from 'react-query'
import { dashboardObj } from '../../../templates/faculty/cas-report/Header'
import { AllFacultyTable } from './AllFaculties'
import { Avatar } from '@mui/material'
import fetchEvents from '../../photogallery/js/fetchEvents'
import serverLinks from '../../../js/serverLinks'


const SchoolInformation = () => {
    const { schoolName } = useParams()
    title(`${schoolName} Details`)
    const navigate = useNavigate()

    const [animate, setAnimate] = useState(false);

    // school data for count
    const newParam = { school: schoolName }
    const { data: schoolData, isLoading: isLoadingSchoolData, } = useQuery([newParam.school, newParam],
        () => { return fetchSchoolData(newParam) })

    // faculties data
    const param = { model: 'User', filter: { department: schoolName } }
    const { data, isLoading } = useQuery([param.model, param], () => fetchData(param))

    // events data
    let eventParams = { filter: {} }
    const { data: eventData, loading: eventLoading } = useQuery([eventParams, eventParams.filter], () => fetchEvents(eventParams))


    useEffect(() => {
        setAnimate(true);
    }, []);

    const mapLinks = {
        'School of Computational Sciences': "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.1383029011527!2d77.28467166423795!3d19.101587694720784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bce29f5413d94bf%3A0x62bc94952eab20c1!2sSchool%20Of%20Computational%20Sciences%20SRTM%20University%20Nanded!5e0!3m2!1sen!2sin!4v1686666170395!5m2!1sen!2sin",

        'School of Chemical Sciences': "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2523.5733938996386!2d77.2864158430002!3d19.099609568340647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bce298a9d702be3%3A0x1d9466fb1cb3906f!2sSchool%20of%20Chemical%20Sciences!5e0!3m2!1sen!2sin!4v1686666242757!5m2!1sen!2sin",

        'School of Commerce and Management Sciences': "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1675.0144559215141!2d77.28692962336676!3d19.102224394746184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bce29f560e4dcc5%3A0xbf412dae33df0842!2sSchool%20of%20Commerce%20%26%20Management%20Sciences%20(SCMS)!5e0!3m2!1sen!2sin!4v1686666794854!5m2!1sen!2sin",

        'School of Educational Sciences': "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2401.9055687124305!2d77.28700958250282!3d19.101560914107655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bce298b25399cf7%3A0xdff1ce476162168!2sSchool%20of%20Educational%20Sciences!5e0!3m2!1sen!2sin!4v1686666889161!5m2!1sen!2sin",

        'School of Earth Sciences': "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1433.70683617566!2d77.28709999915363!3d19.09764726413249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bce298a7ce9e9bd%3A0x778b4f24d29dd5df!2sSchool%20of%20Earth%20Sciences!5e0!3m2!1sen!2sin!4v1686666962485!5m2!1sen!2sin",

        'School of Fine and Performing Arts': "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1540.4847091134332!2d77.28933164991908!3d19.097143381224523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bce298bbd068d1b%3A0xe93c0cab244f6eae!2sSchool%20of%20Fine%20and%20Performing%20Arts!5e0!3m2!1sen!2sin!4v1686667020516!5m2!1sen!2sin",

        'School of Language, Literature and Culture Studies': "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1540.4847091134332!2d77.28933164991908!3d19.097143381224523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bce298a49eff5a5%3A0x548a51a0e69e5eda!2sSchool%20of%20Languages%20%26%20Literature!5e0!3m2!1sen!2sin!4v1686667061018!5m2!1sen!2sin",

        'School of Life Sciences': "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2756.504716255735!2d77.2850567399271!3d19.1015716799517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bce2a1f8a0d7213%3A0xade4474a16952765!2sSchool%20of%20Life%20Sciences!5e0!3m2!1sen!2sin!4v1686667113217!5m2!1sen!2sin",

        'School of Mathematical Sciences': "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.2388568202973!2d77.28536467465143!3d19.097174582111712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bce2962cf4bbb59%3A0xcd772585f87db5c6!2sSchool%20of%20mathematical%20sciences!5e0!3m2!1sen!2sin!4v1686667218681!5m2!1sen!2sin",

        'School of Media Studies': "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.2388568202973!2d77.28536467465143!3d19.097174582111712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bce298bc82321f9%3A0x592fd424a8a3e219!2sSchool%20Of%20Media%20And%20Mass%20Communication!5e0!3m2!1sen!2sin!4v1686667260127!5m2!1sen!2sin",

        'School of Pharmacy': "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.155697352127!2d77.2848711481927!3d19.100824356887227!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bce2a1fc2f998c5%3A0xd48bf018d28b1b9b!2sSchool%20of%20Pharmacy!5e0!3m2!1sen!2sin!4v1686667303187!5m2!1sen!2sin",

        'School of Physical Sciences': "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1084.033054667297!2d77.28472672947773!3d19.100752153908036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bce2a201a7cf723%3A0x531b6aabf4a60398!2sSchool%20of%20Physical%20Sciences!5e0!3m2!1sen!2sin!4v1686667368476!5m2!1sen!2sin",

        'School of Social Sciences': "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1519.5878691112598!2d77.28658448126734!3d19.10144447596967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bce29f52a8fceff%3A0xf0aa327126c8a1a5!2sSchool%20Of%20Social%20Sciences!5e0!3m2!1sen!2sin!4v1686667416906!5m2!1sen!2sin",

        'School of Management Sciences, Sub-Campus, Latur': "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3510.437817656255!2d76.55021779691295!3d18.333742523275294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcf820207df373d%3A0x9286075c80edc97f!2sUniversity%20Sub%20Center%20Latur!5e0!3m2!1sen!2sin!4v1686667668746!5m2!1sen!2sin",

        'School of Social Sciences, Sub-Campus, Latur': "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3510.437817656255!2d76.55021779691295!3d18.333742523275294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcf820207df373d%3A0x9286075c80edc97f!2sUniversity%20Sub%20Center%20Latur!5e0!3m2!1sen!2sin!4v1686667668746!5m2!1sen!2sin",

        'School of Technology, Sub-Campus, Latur': "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3510.437817656255!2d76.55021779691295!3d18.333742523275294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcf820207df373d%3A0x9286075c80edc97f!2sUniversity%20Sub%20Center%20Latur!5e0!3m2!1sen!2sin!4v1686667668746!5m2!1sen!2sin",
    }





    return (
        <div>
            <GoBack pageTitle={`Details about ${schoolName}`} />

            {/* Tabs */}
            <div className="my-3 flex items-center gap-4 justify-center">
                <p onClick={() => { document.getElementById('dashboard-count-school-info').scrollIntoView({ behavior: 'smooth', block: 'start' }); }} className="hover:bg-slate-50 p-1 rounded-md bg-slate-100 text-sm border cursor-pointer">Dashboard Count</p>
                <p onClick={() => { document.getElementById("faculty-info-page").scrollIntoView({ behavior: 'smooth', block: 'start' }); }} className="hover:bg-slate-50 p-1 rounded-md bg-slate-100 text-sm border cursor-pointer">Faculties</p>
                <p onClick={() => { document.getElementById("events-info-page").scrollIntoView({ behavior: 'smooth', block: 'start' }); }} className="hover:bg-slate-50 p-1 rounded-md bg-slate-100 text-sm border cursor-pointer">School Events</p>
                <p onClick={() => { document.getElementById("student-alumni-info-page").scrollIntoView({ behavior: 'smooth', block: 'start' }); }} className="hover:bg-slate-50 p-1 rounded-md bg-slate-100 text-sm border cursor-pointer">Students & Alumni</p>
                <p onClick={() => { document.getElementById("school-location-info-page").scrollIntoView({ behavior: 'smooth', block: 'start' }); }} className="hover:bg-slate-50 p-1 rounded-md bg-slate-100 text-sm border cursor-pointer">School Location</p>
            </div>

            {/* Hero BG */}
            <div className={`relative h-[70vh] bg-cover bg-center flex items-center justify-center 
                transition duration-1000 ease-in-out rounded-md
                ${animate ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
                style={{
                    backgroundImage:
                        `url(${`'${serverLinks.showFile(`${schoolName}.jpg`, 'school')}'`})`,
                    // backgroundImage: `url(${imageUrl})`,
                    // filter: 'brightness(0.8) contrast(1.2)',
                }}
            >
                <div className="absolute bottom-0 text-center left-0 w-full p-4 text-white">
                    <h1 className="text-4xl font-bold">{schoolName}</h1>
                    <p>The school where technology and education meet for an easier learning experience</p>
                </div>
                <div className="absolute top-0 left-0 w-full h-full z-0">
                    <div className="absolute inset-0 bg-[#00000038] rounded-md"></div>
                </div>
            </div>



            {/* Dashboard */}
            <div className='flex gap-2'>
                <div className='my-4 bg-slate-100 rounded-md p-3 border flex-auto' id="dashboard-count-school-info">
                    <p className='mb-3 font-semibold text-lg'>School Publications, Talks, Awards etc.</p>
                    <div >
                        <ServiceDashboard data={schoolData} iconDataObj={dashboardObj['faculty']} isLoading={isLoadingSchoolData} showHeading={false} detailsPage={true} />
                    </div>
                </div>
                <div className='my-4 bg-slate-100 rounded-md p-3 border flex-auto'>
                    <p className='mb-3 font-semibold text-lg'>School Events</p>
                    <div >
                        {eventData?.data?.data?.map((event, index) => {
                            return <div onClick={() => navigate(`/event/${event._id}`)}>
                                <p className='text-blue-700 bg-blue-100 my-1 p-1 rounded-md text-sm cursor-pointer hover:bg-blue-200'>{index + 1}.  {event.eventTitle}</p>
                            </div>
                        })}
                    </div>
                </div>
            </div>

            <div className='my-4 bg-slate-100 rounded-md p-3 border' id="faculty-info-page">
                <p className='mb-3 font-semibold text-lg'>School Faculty Information</p>
                <div>
                    <AllFacultyTable data={data} isLoading={isLoading} />
                </div>
            </div>


            <div className='my-4 bg-slate-100 rounded-md p-3 border' id="school-location-info-page">
                <p className='mb-3 font-semibold text-lg'>School Location</p>
                <div>
                    {
                        mapLinks?.[schoolName] && <iframe src={mapLinks?.[schoolName]} width="100%" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    }
                </div>
            </div>


        </div >
    )
}

export default SchoolInformation