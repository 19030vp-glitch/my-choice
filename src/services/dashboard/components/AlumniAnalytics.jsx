import React from 'react';
import Diversity3RoundedIcon from '@mui/icons-material/Diversity3Rounded';
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';
import TimelineRoundedIcon from '@mui/icons-material/TimelineRounded';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';

import { useNavigate } from 'react-router-dom';
import siteLinks from '../../../components/siteLinks'
import { useEffect } from 'react';


const AlumniAnalytics = ({ stats }) => {
    const navigate = useNavigate()

    useEffect(() => {
        console.log("Stats:", stats)
    }, [stats])


    const dashboardInfo = [
        {
            title: 'Placements',
            countModelName: 'PlacementCount',
            color: 'cyan',
            url: `/dashboard/select-department/placements`,
            icon: <WorkRoundedIcon sx={{ color: 'white', fontSize: '38px' }} />
        },
        {
            title: 'Qualified Exams',
            countModelName: 'QualifiedExamCount',
            color: 'cyan',
            url: `/dashboard/select-department/qualifiedExams`,
            icon: <AssignmentTurnedInRoundedIcon sx={{ color: 'white', fontSize: '38px' }} />
        },
        {
            title: 'Progressed to H.E.',
            countModelName: 'ProgressionToHECount',
            color: 'cyan',
            url: `/dashboard/select-department/progessionToHigherEducation`,
            icon: <TimelineRoundedIcon sx={{ color: 'white', fontSize: '38px' }} />
        },
        {
            title: 'Alumni Contributions',
            countModelName: 'ContributionCount',
            color: 'cyan',
            url: `/dashboard/select-department/AlumniContribution`,
            icon: <AccountBalanceWalletRoundedIcon sx={{ color: 'white', fontSize: '38px' }} />
        },
    ]

    return (
        <div id="alert-additional-content-1" className="p-4 mb-4 text-blue-800 border border-blue-300 rounded-lg bg-blue-50 " role="alert">
            <div className="flex flex-col mb-3 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                <div onClick={() => { navigate(siteLinks.alumniLogin.link) }} className="inline-flex justify-center items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 cursor-pointer dark:focus:ring-blue-900">
                    Login as Alumni
                    <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </div>
                <div onClick={() => { navigate(siteLinks.alumniRegistration.link) }} className="inline-flex justify-center items-center px-3 py-2 text-sm font-medium text-center text-blue-800 rounded-lg border-2 border-blue-700 hover:bg-blue-700 hover:text-white cursor-pointer">
                    Alumni Registration
                </div>
            </div>

            <hr />


            <h3 className="text-lg font-bold ml-1 mt-3">Alumni Dashboard</h3>
            <div>
                <div className="my-4 text-sm flex items-start gap-3 ">
                    {
                        dashboardInfo.map((card, index) => {
                            return <div className={`flex-auto p-3 md:pl-3 md:pr-11 rounded-md cursor-pointer border border-[#d8d5d5] duration-200 ease-in-out hover:bg-blue-600 bg-blue-800 text-white`} key={`dashboardCard-${index}`}
                                onClick={() => { card.url && navigate(card.url) }}>
                                <div className='w-full'>
                                    <div className='flex items-start justify-start gap-2 flex-col'>
                                        <div className='flex items-center justify-start gap-2'>{card.icon} <span className='text-xl md:text-3xl font-bold'>
                                            {stats?.[card.countModelName]}
                                        </span></div>
                                        <p className='text-center '>{card.title}</p>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>

            </div>
        </div>
    );
};

export default AlumniAnalytics;

