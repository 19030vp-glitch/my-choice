import React from 'react'
import { useSelector } from 'react-redux';
import SidebarTile from './SidebarTile';
import AirlineSeatReclineNormalRoundedIcon from '@mui/icons-material/AirlineSeatReclineNormalRounded';
import TvRoundedIcon from '@mui/icons-material/TvRounded';
import SentimentVerySatisfiedRoundedIcon from '@mui/icons-material/SentimentVerySatisfiedRounded';
import ScienceRoundedIcon from '@mui/icons-material/ScienceRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import CardMembershipRoundedIcon from '@mui/icons-material/CardMembershipRounded';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
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
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import TourRoundedIcon from '@mui/icons-material/TourRounded';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import TaskRoundedIcon from '@mui/icons-material/TaskRounded';


import { setActive } from '../redux/slices/ActiveSlice';
import useScroll from '../hooks/useScroll';


const HorizontalNavbar = () => {
    const active = useSelector(state => state.active.active)
    const user = useSelector(state => state.user.user)
    useScroll()

    return (
        <>

            {
                user ?
                    <div className='w-full mt-3 hidden sm:block'>

                        <div className="accordion" id="accordionExample" >
                            <div className="accordion-item border-2  border-blue-400" style={{ borderRadius: '10px' }}>
                                <h2 className="accordion-header bg-blue-100" id="headingOne" style={{ borderRadius: '10px' }}>
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                                        Academic Profile
                                    </button>
                                </h2>

                                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample" >
                                    <div className="accordion-body">
                                        <div className='flex items-center justify-center gap-2 flex-wrap'>


                                            <SidebarTile active={active} setActive={setActive} state='profile'
                                                icon={<PersonIcon fontSize={`small`} className='text-blue-900' />} title='Profile' />

                                            <SidebarTile active={active} setActive={setActive} state='qualification'
                                                icon={<SchoolIcon fontSize={`small`} className='text-blue-900' />} title='Qualification' />

                                            <SidebarTile active={active} setActive={setActive} state='degrees'
                                                icon={<WorkspacePremiumIcon fontSize={`small`} className='text-blue-900' />} title='Research Degrees' />


                                            <SidebarTile active={active} setActive={setActive} state='appointment_held_prior'
                                                icon={<CoPresentRoundedIcon fontSize={`small`} className='text-blue-900' />} title='Appointments prior joining' />

                                            <SidebarTile active={active} setActive={setActive} state='posts_held_after'
                                                icon={<AirlineSeatReclineNormalRoundedIcon fontSize={`small`} className='text-blue-900' />} title='Posts held after joining' />

                                            <SidebarTile active={active} setActive={setActive} state='lectures_seminars'
                                                icon={<TvRoundedIcon fontSize={`small`} className='text-blue-900' />} title='Lectures' />


                                            <SidebarTile active={active} setActive={setActive} state='online_fdp'
                                                icon={<SentimentVerySatisfiedRoundedIcon fontSize={`small`} className='text-blue-900' />} title='Orientation/Refresher Course/FDP' />

                                            <SidebarTile active={active} setActive={setActive} state='conference_participated'
                                                icon={<ConnectWithoutContactIcon fontSize={`small`} className='text-blue-900' />} title='Conference Participated' />

                                            <SidebarTile active={active} setActive={setActive} state='financialsupport'
                                                icon={<CurrencyRupeeIcon fontSize={`small`} className='text-blue-900' />} title='Financial Support' />

                                            <SidebarTile active={active} setActive={setActive} state='conference_organized'
                                                icon={<DuoRoundedIcon fontSize={`small`} className='text-blue-900' />} title='Conference Organized' />

                                            <SidebarTile active={active} setActive={setActive} state='responsibilities'
                                                icon={<SchoolIcon fontSize={`small`} className='text-blue-900' />} title='Responsibilities' />

                                            <SidebarTile active={active} setActive={setActive} state='research_projects'
                                                icon={<ScienceRoundedIcon fontSize={`small`} className='text-blue-900' />} title='Research Projects' />

                                            <SidebarTile active={active} setActive={setActive} state='research_papers'
                                                icon={<FindInPageRoundedIcon fontSize={`small`} className='text-blue-900' />} title='Research Papers' />

                                            <SidebarTile active={active} setActive={setActive} state='book_and_chapters'
                                                icon={<MenuBookRoundedIcon fontSize={`small`} className='text-blue-900' />} title='Books / chapters' />

                                            <SidebarTile active={active} setActive={setActive} state='publication_citation'
                                                icon={<TaskRoundedIcon fontSize={`small`} className='text-blue-900' />} title='Publication Citation' />

                                            <SidebarTile active={active} setActive={setActive} state='jrf_srf'
                                                icon={<PersonSearchRoundedIcon fontSize={`small`} className='text-blue-900' />} title='JRF, SRF, PDF' />

                                            <SidebarTile active={active} setActive={setActive} state='phd_awarded'
                                                icon={<CardMembershipRoundedIcon fontSize={`small`} className='text-blue-900' />} title='Research Guidance' />

                                            <SidebarTile active={active} setActive={setActive} state='pg_dessertation'
                                                icon={<DescriptionRoundedIcon fontSize={`small`} className='text-blue-900' />} title='PG Dissertation' />

                                            <SidebarTile active={active} setActive={setActive} state='e_content_development'
                                                icon={<CloudIcon fontSize={`small`} className='text-blue-900' />} title='E-Content Developed' />


                                            <SidebarTile active={active} setActive={setActive} state='patents'
                                                icon={<DocumentScannerRoundedIcon fontSize={`small`} className='text-blue-900' />} title='Patents' />

                                            <SidebarTile active={active} setActive={setActive} state='consultancy'
                                                icon={<ConnectWithoutContactRoundedIcon fontSize={`small`} className='text-blue-900' />} title='Consultancy' />

                                            <SidebarTile active={active} setActive={setActive} state='collab'
                                                icon={<GroupRoundedIcon fontSize={`small`} className='text-blue-900' />} title='Collaborations' />

                                            <SidebarTile active={active} setActive={setActive} state='award_and_recognition'
                                                icon={<EmojiEventsRoundedIcon fontSize={`small`} className='text-blue-900' />} title='Award / Recognition' />

                                            <SidebarTile active={active} setActive={setActive} state='fellowship'
                                                icon={<AttachMoneyRoundedIcon fontSize={`small`} className='text-blue-900' />} title='Fellowship' />

                                            <SidebarTile active={active} setActive={setActive} state='invited_talk'
                                                icon={<HeadsetMicRoundedIcon fontSize={`small`} className='text-blue-900' />} title='Invited Talk' />

                                            <SidebarTile active={active} setActive={setActive} state='policy_documents'
                                                icon={<ArticleRoundedIcon fontSize={`small`} className='text-blue-900' />} title='Policy Documents' />


                                            <SidebarTile active={active} setActive={setActive} state='foreign_visit'
                                                icon={<TourRoundedIcon fontSize={`small`} className='text-blue-900' />} title='Foreign Visit' />

                                            <SidebarTile active={active} setActive={setActive} state='mous'
                                                icon={<Diversity3Icon fontSize={`small`} className='text-blue-900' />} title='MoUs' />

                                            <SidebarTile active={active} setActive={setActive} state='extension_activities'
                                                icon={<AssignmentIcon fontSize={`small`} className='text-blue-900' />} title='Extension Activity' />

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>



                    </div> : null
            }


        </>
    )
}

export default HorizontalNavbar