import { LinearProgress } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import Bred from '../components/Bred'
import HorizontalNavbar from '../components/HorizontalNavbar'
import NavTools from '../components/NavTools'
import Rightbar from '../components/Rightbar'
import siteLinks from '../components/siteLinks'
import title from '../js/title'

const Main = () => {

    const reportLoading = useSelector((state) => state.navbar.reportLoading)
    const Active = useSelector(state => state.active.active)

    title("Faculty Profile")
    const names = {
        profile: 'Profile', qualification: 'Qualification', degrees: 'Degrees', appointment_held_prior: 'Appointments prior joining', posts_held_after: 'Posts held after joining', online_fdp: 'Online / FDP', research_projects: 'Research Projects', research_papers: 'Research Papers', book_and_chapters: 'Books / chapters', phd_awarded: 'Ph.D. Awarded', jrf_srf: 'JRF, SRF, PDF', award_and_recognition: 'Award / Recognition', patents: 'Patents', consultancy: 'Consultancy', collab: 'Collaborations', invited_talk: 'Invited Talk', conference_organized: 'Conference Organized', fellowship: 'Fellowship', lectures_seminars: 'Lectures', e_content_development: 'E-Content Developed', financialsupport: 'Financial Support', responsibilities: "Responsibilities", pg_dessertation: 'PG Dessertation', conference_participated: "ConferenceParticipeted", foreign_visit: "Foreign Visits", policy_documents: "Policy Documents", extension_activities: "Extension Activity", mous: "MoUs", publication_citation: "Publication Citations"
    }

    return (
        <>
            <div>
                <NavTools />
                <div className='mt-2'>
                    <Bred links={[siteLinks.welcome, siteLinks.facultyHome, { title: names[Active], link: '' }]} />
                </div>
                <HorizontalNavbar />
            </div>

            {/* // report gen loading */}

            {
                reportLoading ? <div className='mt-3'>
                    <p className='text-center mb-3 text-gray-500'>Generating Report, Please wait...</p>
                    <LinearProgress />
                </div> : null
            }




            <div className="flex items-start justify-stretch">
                <Rightbar />
            </div>


        </>
    )
}

export default Main