import React from 'react'
// import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import StickyNote2RoundedIcon from '@mui/icons-material/StickyNote2Rounded';
import ScienceRoundedIcon from '@mui/icons-material/ScienceRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import BookmarkAddedRoundedIcon from '@mui/icons-material/BookmarkAddedRounded';
import VideoChatRoundedIcon from '@mui/icons-material/VideoChatRounded';
// import SafetyDividerRoundedIcon from '@mui/icons-material/SafetyDividerRounded';
// import PermContactCalendarRoundedIcon from '@mui/icons-material/PermContactCalendarRounded';
import LightbulbRoundedIcon from '@mui/icons-material/LightbulbRounded';
import CardMembershipRoundedIcon from '@mui/icons-material/CardMembershipRounded';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
// import DialogBox from '../DialogBox';
// import DeptSelect from '../../inputs/DeptSelect'
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-hot-toast';

const facultyTables = [
    {
        id: 1,
        title: 'Research Papers Published',
        count: 1674,
        icon: <StickyNote2RoundedIcon sx={{ color: 'white', fontSize: '35px' }} />
    },
    {
        id: 2,
        title: 'Research Projects',
        count: 172,
        icon: <ScienceRoundedIcon sx={{ color: 'white', fontSize: '35px' }} />
    },
    {
        id: 3,
        title: 'E-content Developed',
        count: 8909,
        icon: <LanguageRoundedIcon sx={{ color: 'white', fontSize: '35px' }} />
    },
    {
        id: 4,
        title: 'Total Patents Published',
        count: 57,
        icon: <BookmarkAddedRoundedIcon sx={{ color: 'white', fontSize: '35px' }} />
    },
    {
        id: 5,
        title: 'Total Conference Organized',
        count: 890,
        icon: <VideoChatRoundedIcon sx={{ color: 'white', fontSize: '35px' }} />
    },
    {
        id: 6,
        title: 'Total Invited Talks ',
        count: 8190,
        icon: <LightbulbRoundedIcon sx={{ color: 'white', fontSize: '35px' }} />
    },
    {
        id: 7,
        title: 'Ph.D. Awarded ',
        count: 211,
        icon: <CardMembershipRoundedIcon sx={{ color: 'white', fontSize: '35px' }} />
    },
    {
        id: 8,
        title: 'Fellowships ',
        count: 12,
        icon: <AttachMoneyRoundedIcon sx={{ color: 'white', fontSize: '35px' }} />
    },
]

const Teachers = ({ loginElement }) => {
    // const [deptModal, setDeptModal] = useState(false)
    // const [dept, setDept] = useState(null)
    // const navigate = useNavigate()

    return (
        <div className='mt-5 border-t border-gray-600 pt-4 w-full'>

            {/* <DialogBox title="Choose Department / School " buttonName="Fetch Faculties"
                onClickFunction={() => { dept === '' || dept === null || dept === undefined ? toast.error('Please select a Department / School') : navigate(`/dashboard/${dept}`) }} isModalOpen={deptModal} setIsModalOpen={setDeptModal} >
                <DeptSelect setState={setDept} state={dept} title="Choose Department / School" selectId="dashboardSelect" />
            </DialogBox>

            <div className='flex items-center justify-between w-full'>
                <span className='text-xl'>All Faculty Analytics (539)</span>
                <button className='flex items-center justift-start gap-2 bg-[#fc4829] text-white
                 border-[#fc4829] border-2 hover:bg-[#fc5b3f] p-2 rounded-lg' onClick={() => { setDeptModal(true) }}><PermContactCalendarRoundedIcon />Explore our Faculties</button>
            </div> */}

            {/* 
            <div className="flex items-start justify-end gap-5 mt-4">
                <TeachersTables />
                <div className=''>{loginElement}</div>
            </div> */}
        </div>
    )
}

export default Teachers



const TeachersTables = () => {
    return (
        <div className='w-full flex items-center justify-between flex-wrap gap-3 mt-1'>
            {
                facultyTables.map((data) => {
                    return <div className="bg-[#fc4829] flex-auto text-white rounded-md p-2 my-2 flex items-center justify-between">
                        <div className='flex items-center justify-start gap-3 flex-col'>
                            <div>
                                <span>{data.icon}</span>
                                <span className='font-bold mx-2 text-2xl'>{data.count}</span>
                            </div>
                            <p> {data.title} </p>
                        </div>
                    </div>
                })
            }
        </div>
    )
}
