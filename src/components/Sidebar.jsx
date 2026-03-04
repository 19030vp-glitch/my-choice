import React, { useEffect, } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { useDispatch, useSelector } from 'react-redux';
import { setActive } from '../redux/slices/ActiveSlice';
import SidebarTile from './SidebarTile';
import AirlineSeatReclineNormalRoundedIcon from '@mui/icons-material/AirlineSeatReclineNormalRounded';
import TvRoundedIcon from '@mui/icons-material/TvRounded';
import SentimentVerySatisfiedRoundedIcon from '@mui/icons-material/SentimentVerySatisfiedRounded';
import ScienceRoundedIcon from '@mui/icons-material/ScienceRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import CardMembershipRoundedIcon from '@mui/icons-material/CardMembershipRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import FindInPageRoundedIcon from '@mui/icons-material/FindInPageRounded';
import PersonSearchRoundedIcon from '@mui/icons-material/PersonSearchRounded';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import DocumentScannerRoundedIcon from '@mui/icons-material/DocumentScannerRounded';
import ConnectWithoutContactRoundedIcon from '@mui/icons-material/ConnectWithoutContactRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import HeadsetMicRoundedIcon from '@mui/icons-material/HeadsetMicRounded';
import DuoRoundedIcon from '@mui/icons-material/DuoRounded';
import CoPresentRoundedIcon from '@mui/icons-material/CoPresentRounded';
import CloudIcon from '@mui/icons-material/Cloud';
import { useNavigate } from 'react-router-dom';
import { Skeleton, } from '@mui/material';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import TourRoundedIcon from '@mui/icons-material/TourRounded';


const Sidebar = () => {

    const dispatch = useDispatch()
    const active = useSelector(state => state.active.active)
    const user = useSelector(state => state.user.user)
    const navigate = useNavigate()


    return (

        <>

            {
                user ?

                    // <div className="mt-[30px] w-[400px] flex flex-col gap-3 h-[125vh] px-2 overflow-y-auto change__scrollbar mr-26 mb-2" id="style-2">
                    <div className=" flex flex-col gap-3 px-2" id="style-2">


                        {/* // SIDEBAR OPTIONS */}


                        <SidebarTile active={active} setActive={setActive} small={false} state='profile'
                            icon={<PersonIcon className='text-blue-900' />} title='Profile' />

                        <SidebarTile active={active} setActive={setActive} small={false} state='qualification'
                            icon={<SchoolIcon className='text-blue-900' />} title='Qualification' />

                        <SidebarTile active={active} setActive={setActive} small={false} state='degrees'
                            icon={<WorkspacePremiumIcon className='text-blue-900' />} title='Research Degrees' />

                        <SidebarTile active={active} setActive={setActive} small={false} state='appointment_held_prior'
                            icon={<CoPresentRoundedIcon className='text-blue-900' />} title='Appointments prior joining' />

                        <SidebarTile active={active} setActive={setActive} small={false} state='posts_held_after'
                            icon={<AirlineSeatReclineNormalRoundedIcon className='text-blue-900' />} title='Posts held after joining' />

                        <SidebarTile active={active} setActive={setActive} small={false} state='lectures_seminars'
                            icon={<TvRoundedIcon className='text-blue-900' />} title='Lectures' />

                        <SidebarTile active={active} setActive={setActive} small={false} state='online_fdp'
                            icon={<SentimentVerySatisfiedRoundedIcon className='text-blue-900' />} title='Orientation/Refresher Course/FDP' />

                        <SidebarTile active={active} setActive={setActive} small={false} state='conference_participated'
                            icon={<ConnectWithoutContactIcon className='text-blue-900' />} title='Conference Participated' />

                        <SidebarTile active={active} setActive={setActive} small={false} state='financialsupport'
                            icon={<CurrencyRupeeIcon className='text-blue-900' />} title='Financial Support' />

                        <SidebarTile active={active} setActive={setActive} small={false} state='conference_organized'
                            icon={<DuoRoundedIcon className='text-blue-900' />} title='Conference Organized' />

                        <SidebarTile active={active} setActive={setActive} small={false} state='responsibilities'
                            icon={<SchoolIcon className='text-blue-900' />} title='Responsibilities' />

                        <SidebarTile active={active} setActive={setActive} small={false} state='research_projects'
                            icon={<ScienceRoundedIcon className='text-blue-900' />} title='Research Projects' />

                        <SidebarTile active={active} setActive={setActive} small={false} state='research_papers'
                            icon={<FindInPageRoundedIcon className='text-blue-900' />} title='Research Papers' />

                        <SidebarTile active={active} setActive={setActive} small={false} state='book_and_chapters'
                            icon={<MenuBookRoundedIcon className='text-blue-900' />} title='Books / chapters' />

                        <SidebarTile active={active} setActive={setActive} small={false} state='jrf_srf'
                            icon={<PersonSearchRoundedIcon className='text-blue-900' />} title='JRF, SRF, PDF' />

                        <SidebarTile active={active} setActive={setActive} small={false} state='phd_awarded'
                            icon={<CardMembershipRoundedIcon className='text-blue-900' />} title='Research Guidance' />

                        <SidebarTile active={active} setActive={setActive} small={false} state='e_content_development'
                            icon={<CloudIcon className='text-blue-900' />} title='E-Content Developed' />

                        <SidebarTile active={active} setActive={setActive} small={false} state='patents'
                            icon={<DocumentScannerRoundedIcon className='text-blue-900' />} title='Patents' />

                        <SidebarTile active={active} setActive={setActive} small={false} state='consultancy'
                            icon={<ConnectWithoutContactRoundedIcon className='text-blue-900' />} title='Consultancy' />

                        <SidebarTile active={active} setActive={setActive} small={false} state='collab'
                            icon={<GroupRoundedIcon className='text-blue-900' />} title='Collaborations' />

                        <SidebarTile active={active} setActive={setActive} small={false} state='award_and_recognition'
                            icon={<EmojiEventsRoundedIcon className='text-blue-900' />} title='Award / Recognition' />

                        <SidebarTile active={active} setActive={setActive} small={false} state='fellowship'
                            icon={<AttachMoneyRoundedIcon className='text-blue-900' />} title='Fellowship' />

                        <SidebarTile active={active} setActive={setActive} small={false} state='invited_talk'
                            icon={<HeadsetMicRoundedIcon className='text-blue-900' />} title='Invited Talk' />

                        <SidebarTile active={active} setActive={setActive} small={false} state='foreign_visit'
                            icon={<TourRoundedIcon className='text-blue-900' />} title='Foreign Visit' />


                    </div> :

                    <div className="mt-[30px] w-[400px] flex flex-col h-[125vh] gap-3 px-2 overflow-y-auto change__scrollbar mr-26" id="style-2">


                        {/* // SIDEBAR OPTIONS */}


                        <SidebarTile active={active} setActive={setActive} small={false} state='profile'
                            icon={<PersonIcon className='text-blue-900' />} title='Teacher Profile' />

                        <Skeleton height={60} variant="rectangular" sx={{ borderRadius: '30px' }} />
                        <Skeleton height={60} variant="rectangular" sx={{ borderRadius: '30px' }} />
                        <Skeleton height={60} variant="rectangular" sx={{ borderRadius: '30px' }} />
                        <Skeleton height={60} variant="rectangular" sx={{ borderRadius: '30px' }} />
                        <Skeleton height={60} variant="rectangular" sx={{ borderRadius: '30px' }} />
                        <Skeleton height={60} variant="rectangular" sx={{ borderRadius: '30px' }} />
                        <Skeleton height={60} variant="rectangular" sx={{ borderRadius: '30px' }} />
                        <Skeleton height={60} variant="rectangular" sx={{ borderRadius: '30px' }} />
                        <Skeleton height={60} variant="rectangular" sx={{ borderRadius: '30px' }} />
                        <Skeleton height={60} variant="rectangular" sx={{ borderRadius: '30px' }} />




                    </div>

            }

        </>
    )
}

export default Sidebar