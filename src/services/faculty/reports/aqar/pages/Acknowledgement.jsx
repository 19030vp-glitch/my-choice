import React from 'react'
import { useSelector } from 'react-redux'
import siteLinks from '../../../../../components/siteLinks'
import { useNavigate } from 'react-router-dom'
import useScroll from '../../../../../hooks/useScroll'

const Acknowledgement = ({ userType }) => {

    const aqarYear = useSelector((state) => state.aqar.aqarYear)
    const user = useSelector((state) => state.user.user)
    const directorUser = useSelector((state) => state.user.directorUser)
    const navigate = useNavigate()
    useScroll()

    return (
        <div className='text-center'>
            <div>
                <p className='mt-5 text-4xl'>Acknowledgement</p>
                <p className='text-muted mt-2'>Successfull submission of AQAR Form ({aqarYear}) </p>
            </div>

            {
                userType === 'faculty' ? <FacultyAck aqarYear={aqarYear} user={user} /> : <DirectorAck aqarYear={aqarYear} user={directorUser} />
            }

            <div className='mx-auto'>
                <button className="btn btn-success px-10"
                    onClick={() => navigate(userType === 'faculty' ? siteLinks.facultyHome.link : siteLinks.directorHome.link)}
                >Done</button>
            </div>
        </div>
    )
}

export default Acknowledgement

const FacultyAck = ({ user, aqarYear }) => {
    return <div className='my-5 w-3/5 text-center mx-auto'>
        <p>Thank you, <b>{user?.salutation} {user?.name}</b> for successfully submitting the Annual Quality Assurance Report for the year <b>{aqarYear}</b>. </p>

        <div className='my-5 text-left'>
            <ul className="list-group">
                <li className="list-group-item disabled" aria-disabled="true">Your AQAR Form has following information related to</li>
                <li className="list-group-item">01. Research Papers</li>
                <li className="list-group-item">02. Research Projects</li>
                <li className="list-group-item">03. Awards & Recognition</li>
                <li className="list-group-item">04. Fellowships & Financial Assistance</li>
                <li className="list-group-item">05. JRF - SRF</li>
                <li className="list-group-item">06. Patents</li>
                <li className="list-group-item">07. Ph.D. Awarded</li>
                <li className="list-group-item">08. Book & Chapters</li>
                <li className="list-group-item">09. E-content developed</li>
                <li className="list-group-item">10. Consultancy Services</li>
                <li className="list-group-item">11. Faculty Development Programs (FDP) </li>
            </ul>
        </div>
    </div>
}

const DirectorAck = ({ user, aqarYear }) => {
    return <div className='my-5 w-3/5 text-center mx-auto'>
        <p>Thank you, <b>{user?.salutation} {user?.name}</b> (Director) for successfully submitting the Annual Quality Assurance Report for the year <b>{aqarYear}</b> for <b>{user?.department}</b>. </p>

        <div className='my-5 text-left'>
            <ul className="list-group">
                <li className="list-group-item disabled" aria-disabled="true">Your AQAR Form has following information related to</li>
                <li className="list-group-item">01. Syllabus Revision</li>
                <li className="list-group-item">02. Employability</li>
                <li className="list-group-item">03. Value Added Courses</li>
                <li className="list-group-item">04. Projects / Internships </li>
                <li className="list-group-item">05. Demand Ratio</li>
                <li className="list-group-item">06. Reserved Seats</li>
                <li className="list-group-item">07. UGC-SAP, CAS, DST-FIST, DBT, ICSSR</li>
                <li className="list-group-item">08. Research Methodology Workshops</li>
                <li className="list-group-item">09. Awards</li>
                <li className="list-group-item">10. Extension Activities</li>
                <li className="list-group-item">11. Memorandum of Understanding (MoUS)</li>
                <li className="list-group-item">12. Counselling and Guidance</li>
                <li className="list-group-item">13. Skill Enhancement Initiatives</li>
                <li className="list-group-item">14. Qualified Exams</li>
                <li className="list-group-item">15. Placements</li>
                <li className="list-group-item">16. Progression to Higher Education</li>
                <li className="list-group-item">16. Alumni Contribution</li>
                <li className="list-group-item">17. Professional Development / Administrative Training Programs Organized</li>
                <li className="list-group-item">18. Extended Profile</li>
            </ul>
        </div>
    </div>
}