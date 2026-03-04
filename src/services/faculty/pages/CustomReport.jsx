import React, { useState } from 'react'
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import FactCheckRoundedIcon from '@mui/icons-material/FactCheckRounded';
import ViewDayRoundedIcon from '@mui/icons-material/ViewDayRounded';
import { CircularProgress } from '@mui/material';
import toast from 'react-hot-toast';
import Axios from 'axios'
import { useSelector } from 'react-redux';
import useAuth from '../../../hooks/useAuth';
import title from '../../../js/title';
import siteLinks from '../../../components/siteLinks';
import GenerateReportTemplate from '../../../components/GenerateReportTemplate';
import Footer from '../../../components/Footer';
import serverLinks from '../../../js/serverLinks';
import { api } from '../../../js/api';
import AcadmicYearSelect from '../../admin/components/AcadmicYearSelect';
import Note from '../../director/reports/academic-audit/components/Note';

const CustomReport = () => {

    title("Faculty Personalized Report Generation")


    // all table states
    const [Photo, setPhoto] = useState(true)
    const [PersonalInfo, setPersonalInfo] = useState(true)
    const [Qualification, setQualification] = useState(true)
    const [Degree, setDegree] = useState(true)
    const [AppointmentsHeldPrior, setAppointmentsHeldPrior] = useState(true)
    const [PostHeld, setPostHeld] = useState(true)
    const [Lectures, setLectures] = useState(true)
    const [Online, setOnline] = useState(true)
    const [ResearchProject, setResearchProject] = useState(true)
    const [ResearchPaper, setResearchPaper] = useState(true)
    const [BookAndChapter, setBookAndChapter] = useState(true)
    const [PhdAwarded, setPhdAwarded] = useState(true)
    const [JrfSrf, setJrfSrf] = useState(true)
    const [AwardRecognition, setAwardRecognition] = useState(true)
    const [Patent, setPatent] = useState(true)
    const [ConsultancyServices, setConsultancyServices] = useState(true)
    const [InvitedTalk, setInvitedTalk] = useState(true)
    const [ConferenceOrganized, setConferenceOrganized] = useState(true)
    const [Fellowship, setFellowship] = useState(true)
    const [Collaboration, setCollaboration] = useState(true)
    const [EContentDeveloped, setEContentDeveloped] = useState(true)
    const [Responsibilities, setResponsibilities] = useState(true)
    const [FinancialSupport, setFinancialSupport] = useState(true)
    const [ConferenceParticipated, setConferenceParticipated] = useState(true)
    const [ForeignVisit, setForeignVisit] = useState(true)

    // important states
    const [loading, setLoading] = useState(false)
    const user = useSelector(state => state.user.user);
    const [selected, setSelected] = useState(true)
    useAuth(false)

    const [values, setValues] = useState({ yearFilter: [] })

    const { yearFilter } = values


    // table for iteration purpose
    const tables = [
        {
            title: 'Qualification',
            columns: [
                'Exams', 'Institute/Board', 'Year', 'Percentage', 'Subjects',
            ],
            state: Qualification,
            setState: setQualification,
            id: 'Qualification'
        },
        {
            title: 'Degrees',
            columns: [
                'Degree', 'Title', 'University', 'Award Year', 'Proof',
            ],
            state: Degree,
            setState: setDegree,
            id: 'Degree'

        },
        {
            title: 'Appointments held prior to joining this institution',
            columns: [
                'Designation', 'Employer Name', 'Joining Date', 'Leaving Date', 'Salary with Grade', 'Reason for Leaving',
            ],
            state: AppointmentsHeldPrior,
            setState: setAppointmentsHeldPrior,
            id: 'AppointmentsHeldPrior'

        },
        {
            title: 'Posts held after appointment at this institution',
            columns: [
                'Designation', 'Department', 'Joining Date', 'Leaving Date', 'Appointment Order / CAS Promotion	',],
            state: PostHeld,
            setState: setPostHeld,
            id: 'PostHeld'

        },
        {
            title: 'Lectures / Seminars / Tutorials / Practicals',
            columns: ['Sr No', 'Course/Paper', 'Teaching Mode', 'No of classes alloted per week', '% of classes taken as per documented record', 'Year', 'Upload Attendance',],
            state: Lectures,
            setState: setLectures,
            id: 'Lectures'
        },
        {
            title: 'Online / Face-to-face FDP',
            columns: ['Name of Attended Teacher', 'Program Title', 'Duration From', 'Duration To', 'Year', 'Financial Approval/Certificate',],
            state: Online,
            setState: setOnline,
            id: 'Online'
        },
        {
            title: 'Research Projects',
            columns: ['Scheme/Project Name', 'Program Title', 'Principal Invigilator Name', 'Funding Agency Name', 'Government/Non-Government', 'Department', 'Award Year', 'Provided Funds (INR)', 'Project Duration', 'Year', 'Proof',],
            state: ResearchProject,
            setState: setResearchProject,
            id: 'ResearchProject'

        },
        {
            title: 'Research Papers notified by UGC',
            columns: ['Paper Title', 'Author Name', 'Teacher Department', 'Journal Name', 'Publication Year', 'ISSN Number', 'Recognition link in UGC enlistment of the Journal',
                'Year', 'Proof',],
            state: ResearchPaper,
            setState: setResearchPaper,
            id: 'ResearchPaper'

        },
        {
            title: 'Book and Chapter published',
            columns: ['Teacher Name', 'Title of Book / Chapter / Edited Book / Translation', 'Paper Title', 'Title of proceedings of the conference',
                'Conference Name', 'Is National', 'Year of Publication', 'ISBN/ISSN number of proceeding',
                'Affiliation Institute at the time of publication',
                'Publisher Name', 'School Name', 'Year', 'Proof',],
            state: BookAndChapter,
            setState: setBookAndChapter,
            id: 'BookAndChapter'
        },
        {
            title: 'Ph.D. Awarded',
            columns: ['Ph.D. Scholar Name',
                'Department Name',
                'Guide Name',
                'Thesis Title',
                'Year of Scholar Registration',
                'Year of PhD Award', 'Year', 'Proof',],
            state: PhdAwarded,
            setState: setPhdAwarded,
            id: 'PhdAwarded'
        },
        {
            title: 'JRF, SRF, PDF, Research Associates',
            columns: ['Research Fellow Name', 'Enrolment Year', 'Fellowship Duration', 'Fellowship Type', 'Granting Agency', 'Qualifying Exam (if any)', 'Year', 'Proof',],
            state: JrfSrf,
            setState: setJrfSrf,
            id: 'JrfSrf'
        },
        {
            title: 'Award and Recognition',
            columns: ['Name', 'National or International',
                'Award Year', 'PAN', 'Designation',
                'Name of the Award, Fellowship, received from Government',
                'Award Agency Name',
                'Incentives/Type of incentive given by the HEI in recognition of the award'
                , 'Year', 'Proof',],
            state: AwardRecognition,
            setState: setAwardRecognition,
            id: 'AwardRecognition'
        },
        {
            title: 'Award and Recognition',
            columns: ['Patenter Name', 'Patent Number', 'Patent Title', 'Award Year of Patent'
                , 'Year', 'Proof',],
            state: Patent,
            setState: setPatent,
            id: 'Patent'
        },
        {
            title: 'Consultancy Services',
            columns: ['Consultant Name', 'Consultancy Project Name', 'Consulting / Sponsoring Agency with contact', 'Consultancy Year', 'Revenue Generated(INR)', 'Year', 'Proof',],
            state: ConsultancyServices,
            setState: setConsultancyServices,
            id: 'ConsultancyServices'
        },
        {
            title: 'Collaborations',
            columns: ['Title of the collaborative activity',
                'Name of the collaborating agency with contact details',
                'Participant Name', 'Year of Collaboration', 'Duration',
                'Nature of the activity', 'Year', 'Proof',],

            state: Collaboration,
            setState: setCollaboration,
            id: 'Collaborations'
        },
        {
            title: 'Invited Talk',
            columns: ['Title of Lecture/Academic Session', 'Title of Seminar, etc.', 'Organized by', 'National or International', 'Year', 'Proof',],

            state: InvitedTalk,
            setState: setInvitedTalk,
            id: 'InvitedTalk'

        },
        {
            title: 'Conference Organized',
            columns: ['Program Title', 'School Name	Funded By', 'National or International',
                'No of Participants', 'Year', 'Proof',],

            state: ConferenceOrganized,
            setState: setConferenceOrganized,
            id: 'ConferenceOrganized'


        },
        {
            title: 'Fellowship / Financial assistance for advanced studies',
            columns: ['Name of the teacher awarded national/international fellowship/financial support',
                'Name of the award/fellowship', 'Award Year', 'Awarding Agency', 'Year', 'Proof',],

            state: Fellowship,
            setState: setFellowship,
            id: 'Fellowship'


        },
        {
            title: 'E-Content Developed',
            columns: ['Name of the Name of the Course / Module developed',
                'Platform on which the module was developed', 'Year', 'Link to content',],

            state: EContentDeveloped,
            setState: setEContentDeveloped,
            id: 'econtentDeveloped'


        },
        {
            title: 'Financial Support To Attend Conferences',
            columns: ['All fields', 'Academic Year', 'Uploaded Proof',],

            state: FinancialSupport,
            setState: setFinancialSupport,
            id: 'FinancialSupport'


        },
        {
            title: 'Administrative / Academic Responsibilities',
            columns: ['All fields', 'Academic Year', 'Uploaded Proof',],
            state: Responsibilities,
            setState: setResponsibilities,
            id: 'Responsibilities'
        },
        {
            title: 'Conference / Workshop / Seminar Participated',
            columns: ['All fields', 'Academic Year', 'Uploaded Proof',],
            state: ConferenceParticipated,
            setState: setConferenceParticipated,
            id: 'ConferenceParticipated'


        },
        {
            title: 'Foreign Visits',
            columns: ['All fields', 'Academic Year', 'Uploaded Proof',],
            state: ForeignVisit,
            setState: setForeignVisit,
            id: 'ForeignVisit'
        },

    ];

    // generates custom report
    function generateReport() {
        setLoading(true)
        let otherOptions = {
            Photo, PersonalInfo, Qualification, Degree, AppointmentsHeldPrior, PostHeld, Lectures, Online, ResearchProject, ResearchPaper, BookAndChapter, PhdAwarded, JrfSrf, AwardRecognition, Patent, ConsultancyServices, Collaboration, InvitedTalk, ConferenceOrganized, Fellowship, EContentDeveloped,
            Responsibilities, FinancialSupport, ConferenceParticipated, ForeignVisit,
        }
        Axios.post(`${api}/report/generateFacultyReport`, { userId: user._id, otherOptions, years: yearFilter })
            .then(function (res) {
                if (res.data.status === 'generated') {
                    setLoading(false)

                    toast.success('Report generated successfully');
                    window.open(`${api}/downloadPdf/${res.data.fileName}`, '_blank');
                }
                else if (res.data.status === 'error') {
                    setLoading(false)

                    toast.error(res.data.message);
                }
            })
            .catch(function (err) {
                setLoading(false)

                toast.error('Something went wrong');
            })
    }

    //function to change all the states to false
    function deselectAll() {

        setAppointmentsHeldPrior(false)
        setPostHeld(false)
        setLectures(false)
        setOnline(false)
        setResearchPaper(false)
        setResearchProject(false)
        setBookAndChapter(false)
        setPhdAwarded(false)
        setJrfSrf(false)
        setAwardRecognition(false)
        setPatent(false)
        setInvitedTalk(false)
        setConsultancyServices(false)
        setConferenceOrganized(false)
        setFellowship(false)
        setCollaboration(false)
        setSelected(false)
        setEContentDeveloped(false)
        setResponsibilities(false)
        setFinancialSupport(false)
        setConferenceParticipated(false)
        setForeignVisit(false)

    }

    function selectAll() {
        setDegree(true)
        setQualification(true)
        setAppointmentsHeldPrior(true)
        setPostHeld(true)
        setLectures(true)
        setOnline(true)
        setResearchPaper(true)
        setResearchProject(true)
        setBookAndChapter(true)
        setPhdAwarded(true)
        setJrfSrf(true)
        setAwardRecognition(true)
        setPatent(true)
        setInvitedTalk(true)
        setConsultancyServices(true)
        setConferenceOrganized(true)
        setFellowship(true)
        setCollaboration(true)
        setSelected(true)
        setEContentDeveloped(true)
        setResponsibilities(true)
        setFinancialSupport(true)
        setConferenceParticipated(true)
        setForeignVisit(true)

    }

    const bredLinks = [siteLinks.welcome, siteLinks.facultyHome, siteLinks.facultyProfile, { title: 'Generate Custom Report', link: '/generateCustomReport' }]

    let navRightChild = <button onClick={(e) => { toast.success('Generating your personalized report...'); generateReport() }} className='bg-blue-100 text-blue-800 hover:bg-blue-200 border-2 border-blue-200 ease-in-out duration-200 px-3 p-1 rounded-full sm:text-base text-sm'>
        <AssignmentRoundedIcon className='text-blue-800 mr-2' />
        Generate Report
    </button>


    return (
        <div>


            <GenerateReportTemplate bredLinks={bredLinks} backLink={siteLinks.facultyHome.link} title="Generate Your Personalized Faculty Report" loading={loading} navRightChild={navRightChild}>
                <div className='w-full md:flex items-start  md:justify-between mt-4'>
                    {/* LEFT */}
                    <div className='w-full md:w-1/3 mt-2'>
                        <div className='flex items-center justify-start gap-2 text-md sm:text-xl'>
                            <FactCheckRoundedIcon /> Options
                        </div>



                        {/* OPTIONs */}
                        <div className='my-3'>
                            <p className='text-sm text-gray-600'>Please check the desired options you want in your report</p>

                            {
                                <div>
                                    <div className="border-t border-b py-2 mt-2 mr-5 flex items-center justify-start gap-3">
                                        {
                                            selected ?
                                                <div>
                                                    <button onClick={deselectAll} className="p-1 rounded-xl border-2 border-blue-600 bg-blue-100 text-blue-600">Deselect All</button>
                                                </div> :
                                                <div>
                                                    <button onClick={selectAll} className="p-1 rounded-xl border-2 border-blue-600 bg-blue-100 text-blue-600">Select All</button>
                                                </div>
                                        }

                                        <AcadmicYearSelect value={yearFilter} setState={setValues} id="yearFilter" customClasses='border-[2px] rounded-lg border-blue-400' />
                                    </div>
                                    <Note classes="mt-2" title="By default all years are selected, in case you want to download report for specific year(s), you may select years." />
                                </div>
                            }


                            <div className='flex flex-col gap-2 mt-3 sm:text-base text-sm'>
                                <Check title='Photo' state={Photo} setState={setPhoto} id='Photo' />

                                <Check title='Personal Information' state={PersonalInfo} setState={setPersonalInfo} id='personalinfo' />


                                {
                                    tables.map((table, index) => {
                                        return (
                                            <Check key={index} title={table.title} state={table.state}
                                                setState={table.setState} id={table.id} />
                                        )
                                    })
                                }

                            </div>



                        </div>


                    </div>




                    {/* RIGHT */}
                    <div className='w-full md:w-1/2 mt-2'>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center justify-start gap-2 text-md sm:text-xl'>
                                <ViewDayRoundedIcon /> View
                            </div>
                        </div>

                        <div className=' w-full'>

                            <p className='text-sm text-gray-600'>Your report will look like this</p>
                            {
                                user ?
                                    <div className='max-w-200px mx-auto h-[122vh] border-2 rounded-lg my-2 p-2 overflow-x-hidden overflow-y-auto ease-in-out duration-300 border-blue-200'>

                                        <div>
                                            <p className='text-center font-bold text-sm md:text-xl'>OPERANT SCIENTIFIC PVT. LTD. </p>
                                            <p className='text-center mb-2 text-xs md:text-base'>Pali-306 401, Rajasthan, India</p>
                                            <hr />
                                            <br />
                                        </div>

                                        {/* Photo */}
                                        {Photo ?

                                            <div className='flex items-center justify-center'>



                                                <img src={serverLinks.showFile(user?.photoURL, 'faculty')} className='h-[50px] w-[50px] sm:h-[150px] sm:w-[150px] rounded-full object-cover' alt="profile" />
                                            </div>

                                            : null}
                                        <div className='my-2'>
                                            <p className='text-center text-md sm:text-xl font-bold'>{user?.salutation} {user?.name}</p>
                                            <p className='text-center text-sm sm:text-lg'>{user && user.designation === 'Contractual' ? 'Assistant Professor(Contractual)' : user.designation}</p>
                                            <p className='text-center text-xs sm:text-sm'>{user.department.includes("Latur") ? "Sub-Campus, Latur - 413531" : "SRTMUN, Vishnupuri, Nanded - 431 606"}</p>
                                        </div>
                                        <hr />
                                        <div>

                                            {/* Personal Information */}
                                            {
                                                PersonalInfo ?
                                                    <div className='mt-3'>
                                                        <div className="card text-xs sm:text-sm">
                                                            <div className="card-header text-center">
                                                                Personal Information
                                                            </div>
                                                            <ul className="list-group list-group-flush">
                                                                <li className="list-group-item"><span className="font-bold">Name : </span> {user?.salutation} {user?.name}</li>

                                                                <li className="list-group-item"><span className="font-bold">Department : </span> {user?.department}</li>

                                                                <li className="list-group-item"><span className="font-bold">Designation : </span> {user?.designation}</li>

                                                                <li className="list-group-item"><span className="font-bold">Date of Last Promotion : </span> {user?.promotionDate}</li>

                                                                <li className="list-group-item"><span className="font-bold">Grade Pay : </span> {user?.gradePay}</li>

                                                                <li className="list-group-item"><span className="font-bold">Address of Correspondence : </span> School of {user?.department}, SRTMU, Vishnupuri, Nanded - 431 401</li>

                                                                <li className="list-group-item"><span className="font-bold">Permanent Address : </span>{user?.address}</li>

                                                                <li className="list-group-item"><span className="font-bold">Mobile : </span>{user?.mobile}</li>


                                                            </ul>
                                                        </div>
                                                    </div> : null
                                            }



                                            {/* All tables */}
                                            {
                                                tables.map(function (table, index) {

                                                    return (
                                                        <div key={`${table}${index}`}>

                                                            {
                                                                table.state ?
                                                                    <TableTile key={index} title={tables[index].title} columns={tables[index].columns} /> : null
                                                            }

                                                        </div>
                                                    )
                                                })


                                            }




                                        </div>

                                    </div>
                                    : <div className='max-w-200px mx-auto h-[122vh] border-2 rounded-lg my-2 p-2 overflow-x-hidden overflow-y-auto ease-in-out duration-300 border-blue-200'>

                                        <div className="flex flex-col items-center justify-center mt-48">
                                            <CircularProgress />
                                            <p className='text-muted mt-2'>Loading View, Please Wait...</p>
                                        </div>

                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </GenerateReportTemplate>

            <div className='mt-10'>
                <Footer />

            </div>


        </div >
    )
}

export default CustomReport

function Check({ title, id, setState, state }) {
    return (
        <div className="form-check ">
            {/* {console.log(title, state, id)} */}
            <input className="form-check-input" onChange={() => { setState(!state) }} type="checkbox" value="" id={id} checked={state} />
            <label className="form-check-label" htmlFor={id}>
                {title}
            </label>
        </div>
    )
}

function TableTile({ title, columns }) {
    return (
        <div>
            <p className='text-center text-sm mt-9 underline'>{title}</p>
            <div>
                <table className="table table-hover sm:text-sm my-3 text-xs">
                    <thead>
                        <tr>
                            {columns.map(function (column, index) {
                                return <th scope="col" key={index}>{column}</th>
                            })}
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            {columns.map(function (column, index) {
                                return <td key={index}>Data</td>
                            })}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}