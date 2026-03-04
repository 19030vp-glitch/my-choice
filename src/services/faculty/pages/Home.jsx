import React from 'react'
import OnlyNav from '../../../components/OnlyNav'
import useAuth from '../../../hooks/useAuth'
import { useSelector } from 'react-redux'
import Service from '../../../components/Service'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '../../../redux/slices/UserSlice'
import Bred from '../../../components/Bred'
import Footer from '../../../components/Footer'
import Axios from 'axios'
import useScroll from '../../../hooks/useScroll'
import title from '../../../js/title'
import siteLinks from '../../../components/siteLinks'
import serverLinks from '../../../js/serverLinks'
import { dashboardObj } from '../../../templates/faculty/cas-report/Header'
import { useState } from 'react'
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import ShowModal from '../../../components/ShowModal'
import { setActive } from '../../../redux/slices/ActiveSlice'
import { setPage } from '../../../redux/slices/NavbarSlice'
import capitalizeText from '../../../js/capitalizeText'
import { useQuery } from 'react-query'
import { api } from '../../../js/api'
import CheckFacultyDataValidity from '../components/CheckFacultyDataValidity'


const Home = () => {
    useAuth(false)
    const user = useSelector(state => state.user.user)
    const [academicData, setAcademicData] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [modalOpen, setModalOpen] = useState(false)


    useScroll()
    title("Faculty Home")

    const fetchDashboardData = () => {
        const URL = `${api}/api/getAllData`
        return Axios.post(URL, { userId: user?._id, fetchYears: 'all' })
    }

    useQuery(`GetAllData-${user?._id}`, () => fetchDashboardData, {
        onSuccess: async (promiseData) => {
            const data = await promiseData
            data?.data?.status === 'success' && setAcademicData(data?.data?.data)
        },
        refetchOnWindowFocus: false
    })


    const urlLinks = {
        ResearchProject: {
            onClickFunc: () => {
                navigate(siteLinks.facultyProfile.link); dispatch(setActive('research_projects')); dispatch(setPage('research_projects'));
            }
        },
        ResearchPaper: {
            onClickFunc: () => {
                navigate(siteLinks.facultyProfile.link); dispatch(setActive('research_papers')); dispatch(setPage('research_papers'));
            }
        },
        InvitedTalk: {
            onClickFunc: () => {
                navigate(siteLinks.facultyProfile.link); dispatch(setActive('invited_talk')); dispatch(setPage('invited_talk'));
            }
        },
        ConferenceOrganized: {
            onClickFunc: () => {
                navigate(siteLinks.facultyProfile.link); dispatch(setActive('conference_organized')); dispatch(setPage('conference_organized'));
            }
        },
        EContentDeveloped: {
            onClickFunc: () => {
                navigate(siteLinks.facultyProfile.link); dispatch(setActive('e_content_development')); dispatch(setPage('e_content_development'));
            }
        },
        BookAndChapter: {
            onClickFunc: () => {
                navigate(siteLinks.facultyProfile.link); dispatch(setActive('book_and_chapters')); dispatch(setPage('book_and_chapters'));
            }
        },
        PhdAwardedWithoutPGD: {
            onClickFunc: () => {
                navigate(siteLinks.facultyProfile.link); dispatch(setActive('phd_awarded')); dispatch(setPage('phd_awarded'));
            }
        },
        Patent: {
            onClickFunc: () => {
                navigate(siteLinks.facultyProfile.link); dispatch(setActive('patents')); dispatch(setPage('patents'));
            }
        },
        Online: {
            onClickFunc: () => {
                navigate(siteLinks.facultyProfile.link); dispatch(setActive('online_fdp')); dispatch(setPage('online_fdp'));
            }
        },
        Responsibilities: {
            onClickFunc: () => {
                navigate(siteLinks.facultyProfile.link); dispatch(setActive('responsibilities')); dispatch(setPage('responsibilities'));
            }
        },
    }



    return (
        <div>
            <OnlyNav user={user} heading={{ title: user?.designation !== 'Contractual' ? 'Permanent Faculty' : 'Contractual Faculty', link: siteLinks.welcome.link }}
                li={[siteLinks.cas, siteLinks.pbas, siteLinks.facultyChangePass]}
                logout={{ token: 'faculty-token', link: siteLinks.welcome.link }} />

            {/* Navtools */}
            <div className='mt-2'>
                <Bred links={[siteLinks.welcome, siteLinks.facultyHome]} />
            </div>

            <CheckFacultyDataValidity user={user} />


            {/* <div>
                <div className="alert bg-blue-100 alert-dismissible fade show mt-2" role="alert">
                    <p>Dear <strong>{user?.salutation} {user?.name}</strong>, please submit

                        <strong className="text-blue-600 cursor-pointer hover:text-blue-800"
                            onClick={() => navigate(`/feedback/teacher/`)}> Teacher Feedback (2021-22 & 2022-23)</strong> Form. Kindly, click on the links to proceed. </p>
                    <button type="button" className="btn-close text-black font-semibold text-xl" data-bs-dismiss="alert" aria-label="Close">&#10005;</button>
                </div>
            </div> */}



            <div className='mt-3 border rounded-xl gray animate-fade-up animate-once'>
                {/* PROFILE */}
                <div className='rounded-xl '>



                    {/* // new */}
                    {user &&
                        <div className='p-4 flex lg:flex-row items-start justify-start gap-3 flex-col'>
                            <div className='sm:flex items-start justify-start gap-5 lg:w-[50%]'>
                                <img src={serverLinks.showFile(user?.photoURL, 'faculty')} className='h-[100px] w-[100px] sm:h-[170px] sm:w-[170px] rounded-full object-cover border-4 border-[#344e87]' alt="faculty" />

                                <div className='text-black '>
                                    <p className='text-lg sm:text-2xl font-bold'>{user && user.salutation} {capitalizeText(user?.name)} </p>
                                    <p className='text-base sm:text-xl'>{user && user.designation === 'Contractual' ? 'Assistant Professor(Contractual)' : user.designation},</p>
                                    <p className='text-xs sm:text-sm'>{user && user.department},</p>
                                    <p className='text-xs sm:text-sm'>{user.department.includes("Latur") ? "Sub-Campus, Latur - 413531" : "SRTMUN, Vishnupuri, Nanded - 431 606"}</p>

                                    <div className='flex items-start justify-start gap-2 mt-4 flex-wrap'>
                                        <button onClick={() => { navigate(siteLinks.facultyProfile.link) }} className='p-2 rounded-full flex-auto border-2 text-sm sm:text-base hover:bg-blue-700 border-blue-800 bg-blue-800 text-white'>
                                            Go to Profile
                                        </button>

                                        <button onClick={() => { navigate(siteLinks.facultyReport.link) }} className='p-2 rounded-full border-2 flex-auto text-sm sm:text-base hover:bg-blue-700 border-blue-800 bg-blue-800 text-white'>
                                            Faculty Report
                                        </button>

                                        <button onClick={() => { dispatch(setUser(null)); navigate(siteLinks.welcome.link); localStorage.removeItem('faculty-token'); }} className='p-2 flex-auto text-sm sm:text-base rounded-full text-blue-700 border-2 hover:bg-blue-200 border-blue-700'>
                                            Logout
                                        </button>
                                        <button onClick={() => { navigate(siteLinks.validateData.link); }} className='p-2 flex-auto text-sm sm:text-base rounded-full text-blue-700 border-2 hover:bg-blue-200 border-blue-700'>
                                            Perform Data Validity Check
                                        </button>



                                    </div>
                                </div>
                            </div>
                            <div className="lg:w-[50%]">
                                {academicData && <ShowLocalDashboard directorData={academicData && academicData}
                                    dashboardObj={dashboardObj['faculty']} color="blue" bgColor="blue" urlLinks={urlLinks} />}
                            </div>
                        </div>

                    }
                </div>

                <div>
                    <div>
                        <div className='flex items-center justify-between mx-4 my-2'>
                            <p className='font-bold text-base sm:text-xl text-black'>Personal Infomation</p>
                            <div className='flex items-center justify-end gap-2'>
                                <button className='flex items-center justify-start gap-1 p-2 rounded-full sm:text-base text-sm bg-blue-800 border-2 hover:bg-blue-700 border-blue-800 text-white' onClick={() => { navigate(siteLinks.facultyProfile.link) }}>
                                    <ModeEditOutlineRoundedIcon /> Edit Profile
                                </button>
                            </div>

                        </div>
                        <hr className='text-black' />
                        <div className="md:mb-4 shadow-none">
                            {
                                user &&
                                <div className="card-body sm:flex">

                                    <div className='flex flex-wrap pl-5'>
                                        <DetailTile keyName="Full Name" value={`${user && user.salutation} ${user && user.name}`} />
                                        <DetailTile keyName="Date of Birth" value={`${user && user.dob === undefined ? 'Not Added' : user.dob}`} />
                                        <DetailTile keyName="Designation" value={`${user && user.designation}`} />
                                        <DetailTile keyName="Mobile" value={`${user && user.mobile === undefined ? 'Not Added' : user.mobile}`} />
                                        <DetailTile keyName="School" value={`${user && user.department}`} />
                                        <DetailTile keyName="Email" value={`${user && user.email === undefined ? 'Not Added' : user.email}`} />
                                        <DetailTile keyName="Employee ID" value={`${user.designation === 'Contractual' || user.username.includes('UFTG') ? '' : 'TG-'}${user && user.username}`} />
                                        <DetailTile keyName="Specialization" value={`${user && user.specialization === undefined ? 'Not Added' : user.specialization}`} />
                                        <DetailTile keyName="Gender" value={user && user.gender} />
                                        <DetailTile keyName="Address" value={`${user && user.address === undefined ? 'Not Added' : user.address}`} />
                                        <DetailTile keyName="Caste" value={`${user && user.cast === undefined ? 'Not Added' : user.cast}`} />
                                        <DetailTile keyName="Date of Joining" value={`${user && user.racDate === undefined ? 'Not Added' : user.racDate}`} />

                                    </div>
                                    {/* <div className='flex-1'>
                                    </div> */}

                                </div>
                            }
                        </div>

                    </div>
                </div>

                {/* SERVICES */}

                {
                    user && user.designation !== 'Contractual' &&
                    <div className='w-full mt-4'>
                        <p className='ml-4 font-bold sm:text-xl text-black text-base mb-3'>Services</p>
                        <hr className='text-black' />
                        <Service />
                    </div>
                }
            </div>

            {/* // Add more field */}
            <ShowModal title="Add fields in Faculty Profile" isModalOpen={modalOpen}
                setIsModalOpen={setModalOpen} okText="Save this field"   >
                <div className='flex items-center justify-between gap-2 my-5'>
                    <input type="text" placeholder='Name of the field' className='form-control' />
                    <input type="text" placeholder='Value of the field' className='form-control' />
                </div>
            </ShowModal>

            <Footer />

        </div>
    )
}

export default Home


const DetailTile = ({ keyName, value }) => {
    return (
        <div className="row py-2 col-12 col-md-6 col-lg-6 text-black">
            <div className="col-sm-3">
                <p className="mb-0 text-sm sm:text-base font-semibold">{keyName}</p>
            </div>
            <div className="col-sm-9">
                <p className="mb-0 text-sm sm:text-base font-normal">{value}</p>
            </div>
        </div>
    )
}

const ShowLocalDashboard = ({ directorData, dashboardObj, color = "[#009879]", bgColor = "green", onClickFunc = null, urlLinks }) => {

    return <div className='flex items-center justify-between gap-3 flex-wrap animate-fade-left animate-once'>
        {
            directorData && dashboardObj.map((item, index) => {
                return (
                    directorData?.[item.model]?.length > 0) &&
                    <div key={index} className={`bg-${bgColor}-50 p-2 border border-green-100 rounded-md flex-auto hover:bg-${bgColor}-100 cursor-pointer`} onClick={() => { urlLinks[item.model].onClickFunc() }} >
                        <div className={`flex items-center justify-start gap-2 ${color.includes('#') ? `text-${color}` : `text-${color}-800`}`}>
                            {item.icon} <span className='font-bold text-xl'>{directorData?.[item.model]?.length}</span>
                        </div>
                        <p className='md:text-base text-sm'>{item.title}</p>
                    </div>
            })
        }
    </div>
}

export { ShowLocalDashboard }


