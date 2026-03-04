import React from 'react'
import Diversity3RoundedIcon from '@mui/icons-material/Diversity3Rounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import TodayRoundedIcon from '@mui/icons-material/TodayRounded';
import siteLinks from '../../../components/siteLinks';
import { useNavigate } from 'react-router-dom';

const PriorityServices = () => {

    const navigate = useNavigate()


    const services = [
        {
            title: 'University Teachers',
            phrase: "Login, Data, CAS, PBAS & AQAR",
            countModelName: 'usersCount',
            color: 'cyan',
            buttonTitle: "Teacher Login",
            url: siteLinks.facultyLogin.link,
            icon: <GroupsRoundedIcon sx={{ color: 'green', fontSize: '36px' }} />
        },
        {
            title: 'University Students',
            phrase: "University Student Information",
            countModelName: 'StudentCount',
            color: 'orange',
            buttonTitle: "Student Information",
            url: `/dashboard/select-department/students`,
            icon: <GroupRoundedIcon sx={{ color: 'orange', fontSize: '36px' }} />
        },
        {
            title: 'Alumni Connect',
            phrase: "Placements, Status & Contributions",
            countModelName: 'AlumniCount',
            color: 'cyan',
            buttonTitle: "Alumni Information",
            url: `/dashboard/select-department/alumni`,
            icon: <Diversity3RoundedIcon sx={{ color: 'red', fontSize: '32px' }} />
        },
        // {
        //     title: 'Academic Working Processes',
        //     phrase: "Timetables, Academic Activities etc.",
        //     countModelName: 'AlumniCount',
        //     color: 'cyan',
        //     buttonTitle: "Check Management",
        //     url: "",
        //     icon: <TodayRoundedIcon sx={{ color: 'blue', fontSize: '30px' }} />
        // },
    ]

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4 justify-between'>
            {
                services.map((service, index) => {
                    return <div onClick={() => navigate(service.url)} key={index} className="relative bg-[#fff6] w-full cursor-pointer rounded-lg border py-2 px-[6px] border-[#d8d5d5]  hover:bg-[#ffffff91] flex-auto md:max-w-md h-full md:h-auto">
                        <div className="text-center ">
                            <div className='mb-3'>
                                <div className="flex items-center justify-center mx-auto">
                                    {service.icon}
                                </div>
                                <div className='rounded-md mt-2'>
                                    <p className="text-lg font-semibold text-gray-900 leading-5">{service.title} </p>
                                    <p className='text-xs text-muted mt-2'>{service.phrase}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                })
            }

        </div>
    )
}

export default PriorityServices
