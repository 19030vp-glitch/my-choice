/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-distracting-elements */
import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import LocalLibraryRoundedIcon from '@mui/icons-material/LocalLibraryRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import BoyRoundedIcon from '@mui/icons-material/BoyRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import ScienceRoundedIcon from '@mui/icons-material/ScienceRounded';
import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded';
import SportsHandballRoundedIcon from '@mui/icons-material/SportsHandballRounded';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import { useNavigate } from 'react-router';
import useScroll from '../hooks/useScroll';
import { useDispatch, useSelector } from 'react-redux';
import title from '../js/title';
import { setDirectorUser, setUser, setAlumniUser, setStudentUser, setProUser, setPlacementUser, setExamUser, setKRCUser, setDSDUser, setNSSUser, setSportsUser, setIILUser, setESTTUser } from '../redux/slices/UserSlice';
import siteLinks from '../components/siteLinks';
import Dashboard from '../services/dashboard/pages/Dashboard';
import useUserIsLoggedIn from '../hooks/useUserIsLoggedIn';
import NewspaperRoundedIcon from '@mui/icons-material/NewspaperRounded';
import LabelImportantRoundedIcon from '@mui/icons-material/LabelImportantRounded';
import { fetchIndexNews } from '../services/news/js/fetchNews';
import { useQuery } from 'react-query';
import LoggedInUsers from '../components/LoggedInUsers';
import VisitorCount from '../services/dashboard/components/VisitorCount';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import searchServices from '../js/searchServices';


const Index = () => {
    let iconProps = { fontSize: '65px', color: '#fc4829', borderRadius: '50%', margin: '10px', padding: '5px', }
    useScroll()
    const users = useSelector(state => state.user)
    useUserIsLoggedIn()
    title("Welcome")
    const navigate = useNavigate()

    let serviceList = [
        {
            icon: <PersonRoundedIcon sx={iconProps} />,
            title: 'Faculty Profile',
            phrase: 'Login to the your Faculty Profile by entering your alloted Employee ID and Password.',
            user: users.user ? users.user : null,
            profileUrl: siteLinks.facultyHome.link,
            tokenId: 'faculty-token',
            dispatchFunction: setUser,
            loginUrl: siteLinks.facultyLogin.link,
        },
        {
            icon: <DescriptionRoundedIcon sx={iconProps} />,
            title: 'CAS / PBAS',
            phrase: 'Submit CAS & PBAS Reports effortlessly, login through your Faculty Profile Credentials',
            user: users.user ? users.user : null,
            profileUrl: siteLinks.cas.link,
            dispatchFunction: setUser,
            tokenId: 'faculty-token',
            loginUrl: siteLinks.facultyLogin.link,
        },
        {
            icon: <LocalLibraryRoundedIcon sx={iconProps} />,
            title: 'Director',
            phrase: "Information of the School's Students, Alumni, Achievements and much more in one place.",
            user: users.directorUser ? users.directorUser : null,
            profileUrl: siteLinks.directorHome.link,
            dispatchFunction: setDirectorUser,
            tokenId: 'director-token',
            loginUrl: siteLinks.directorLogin.link,
        },
        {
            icon: <LocalLibraryRoundedIcon sx={iconProps} />,
            title: 'Administrative & Academic Audit (AAA)',
            phrase: 'Login to the individual Director Profile by entering your valid allotted Director ID and Password.',
            user: users.directorUser ? users.directorUser : null,
            profileUrl: siteLinks.aaa.link,
            tokenId: 'director-token',
            dispatchFunction: setDirectorUser,
            loginUrl: siteLinks.directorLogin.link,
        },

        {
            icon: <SchoolRoundedIcon sx={iconProps} />,
            title: 'Student Profile',
            phrase: 'Login to student profile for giving feedbacks of your school and many different activities.',
            user: users.studentUser ? users.studentUser : null,
            profileUrl: siteLinks.studentHome.link,
            tokenId: 'student-token',
            loginUrl: '/student-login',
            dispatchFunction: setStudentUser
        },
        {
            icon: <BoyRoundedIcon sx={iconProps} />,
            title: 'Alumni Profile',
            phrase: 'Login to Alumni profile for giving feedbacks of your school and many different activities.',
            user: users.alumniUser ? users.alumniUser : null,
            profileUrl: siteLinks.alumniHome.link,
            tokenId: 'alumni-token',
            loginUrl: '/alumni-login',
            dispatchFunction: setAlumniUser

        },
        {
            icon: <NewspaperRoundedIcon sx={iconProps} />,
            title: 'Public Relation Officer (PRO)',
            phrase: 'Log in to your account to stay add the latest news and events happening at our university.',
            user: users.proUser ? users.proUser : null,
            profileUrl: siteLinks.proHome.link,
            tokenId: 'pro-token',
            loginUrl: siteLinks.proLogin.link,
            dispatchFunction: setProUser

        },
        {
            icon: <DirectionsRunIcon sx={iconProps} />,
            title: 'Training & Placement',
            phrase: 'Login to avail Training & Placement services with your ID and Password.',
            user: users.placementUser ? users.placementUser : null,
            profileUrl: siteLinks.placementHome.link,
            tokenId: 'placement-token',
            loginUrl: siteLinks.placementLogin.link,
            dispatchFunction: setPlacementUser
        },
        {
            icon: <GroupsRoundedIcon sx={iconProps} />,
            title: 'Board of Examination and Evaluation(BoEE)',
            phrase: 'Login to Board of Examination and Evaluation(BoEE)',
            user: users.examUser ? users.examUser : null,
            profileUrl: siteLinks.examHome.link,
            tokenId: 'exam-token',
            loginUrl: siteLinks.examLogin.link,
            dispatchFunction: setExamUser

        },
        {
            icon: <ScienceRoundedIcon sx={iconProps} />,
            title: 'Innovation, Incubation and Linkages',
            phrase: 'Login to the Innovation, Incubation and Linkages with valid ID & Password',
            user: users.iilUser ? users.iilUser : null,
            profileUrl: siteLinks.iilHome.link,
            tokenId: 'iil-token',
            loginUrl: siteLinks.iilLogin.link,
            dispatchFunction: setIILUser

        },
        {
            icon: <AutoStoriesRoundedIcon sx={iconProps} />,
            title: 'Knowledge Resource Center (KRC)',
            phrase: 'Login to the SRTMUN KRC with valid ID & Password',
            user: users.krcUser ? users.krcUser : null,
            profileUrl: siteLinks.krcHome.link,
            tokenId: 'krc-token',
            loginUrl: siteLinks.krcLogin.link,
            dispatchFunction: setKRCUser

        },
        {
            icon: <BusinessRoundedIcon sx={iconProps} />,
            title: 'Establishment Department',
            phrase: 'Login to Establishment Department section',
            user: users.esttUser ? users.esttUser : null,
            profileUrl: siteLinks.esttHome.link,
            tokenId: 'estt-token',
            loginUrl: siteLinks.esttLogin.link,
            dispatchFunction: setESTTUser
        },
        {
            icon: <AutoGraphRoundedIcon sx={iconProps} />,
            title: 'Department of Student Development (DSD)',
            phrase: 'Login to Department of Student Development for Student Development related activities.',
            user: users.dsdUser ? users.dsdUser : null,
            profileUrl: siteLinks.dsdHome.link,
            tokenId: 'dsd-token',
            loginUrl: siteLinks.dsdLogin.link,
            dispatchFunction: setDSDUser
        },
        {
            icon: <GroupsRoundedIcon sx={iconProps} />,
            title: 'National Service Scheme (NSS)',
            phrase: 'Login to National Service Scheme to know more about NSS',
            user: users.nssUser ? users.nssUser : null,
            profileUrl: siteLinks.nssHome.link,
            tokenId: 'nss-token',
            loginUrl: siteLinks.nssLogin.link,
            dispatchFunction: setNSSUser
        },
        {
            icon: <SportsHandballRoundedIcon sx={iconProps} />,
            title: 'Sports Department',
            phrase: 'Login to Sports Department for various Sports related activities & information',
            user: users.sportsUser ? users.sportsUser : null,
            profileUrl: siteLinks.sportsHome.link,
            tokenId: 'sports-token',
            loginUrl: siteLinks.sportsLogin.link,
            dispatchFunction: setSportsUser
        },

    ]

    const [uimsServices, setUimsServices] = useState(serviceList)
    const [search, setSearch] = useState('')

    const searchChange = (query) => {
        setSearch(() => query)
        if (query === '' || query === undefined || query === null) {
            setUimsServices(() => serviceList)
            return
        }
        searchServices(query, serviceList, setUimsServices)
    }

    const { data: news } = useQuery([], () => fetchIndexNews())

    useEffect(() => {
        searchChange(search)
    }, [users, search])


    return (
        <div className='dashboard-gradient'>
            <div className='mr-3 ml-3 sm:mx-3 md:mx-10 lg:mx-10 xl:mx-20'>

                {/* News */}
                <div className='flex items-center justify-start mt-2'>
                    <span onClick={() => { navigate('/news') }} className='md:text-base cursor-pointer text-sm whitespace-nowrap bg-orange-500 hover:bg-orange-800 text-white px-1 md:px-2 rounded-l-md'>
                        <div className='flex items-center justify-start gap-1 '><NewspaperRoundedIcon sx={{ fontSize: '18px' }} />News Bulletin</div></span>
                    <marquee className='bg-orange-100 text-orange-700' behavior="scroll" direction="left"
                    >
                        {
                            news?.data?.data.length > 0 ?
                                <div className='flex items-center justify-start gap-4'>

                                    {news?.data?.data?.map((el, index) => {
                                        return <div key={index} className='flex items-center justify-start gap-1 hover:text-blue-800 cursor-pointer text-sm md:text-base' onClick={() => { navigate(`/news/${el._id}`) }}>
                                            <LabelImportantRoundedIcon sx={{ fontSize: '18px' }} /> {el.headline}
                                        </div>
                                    })}

                                </div> : <p className="md:text-base text-sm">No Recent News</p>
                        }
                    </marquee>
                    <span onClick={() => { navigate('/news') }} className='sm:block hidden text-sm md:text-base whitespace-nowrap hover:bg-orange-800 bg-orange-500 text-white px-2 rounded-r-md'>
                        <div className='flex items-center justify-start gap-1  cursor-pointer'><NewspaperRoundedIcon sx={{ fontSize: '18px' }} />Explore all News</div></span>


                </div>

                <div className='mt-3 flex items-center justify-center'>
                    {/* LOGGED IN USERS */}
                    <LoggedInUsers />
                </div>

                {/* MAIN DIV */}

                <div className='z-30 mt-4'>
                    <div className={`text-center ${sessionStorage.getItem('animate') === 'false' ? '' : 'main__index__heading'}`}>
                        <p className='text-xs text-gray-500'>Welcome to</p>
                        <h2 className='font-bold text-blue-500 text-3xl md:text-6xl sm:text-4xl gradient'>SRTMUN-UIMS</h2>
                        <p className='text-[#fc4829] md:text-xl sm:text-lg text-base md:w-1/2 sm:w-2/3 text-center mx-auto'>University Information Management System</p>
                    </div>



                </div>


                <div className='z-30 animate-fade-up animate-once'>


                    <div className='sm:mx-1 rounded-lg'>
                        <Dashboard />
                    </div>



                    <div className='rounded-lg flex mt-9 sm:mx-1 items-center gap-2 overflow-hidden p-3 bg-[#fee2e2] animate-fade-up animate-once'>
                        <SearchRoundedIcon sx={{ color: '#fc4829' }} />
                        <input className="w-full outline-none border-none bg-transparent" placeholder={`Search SRTMUN-UIMS Services`} type="search" value={search} onChange={(e) => searchChange(e.target.value)} name="search" id="search" />
                    </div>
                    <div className={`flex-wrap justify-between md:p-1 flex items-center gap-auto ${sessionStorage.getItem('animate') === 'false' ? '' : 'main__cards'}`}>
                        {uimsServices?.map((item, index) => {
                            return <MainService data={item} key={index} searchChange={searchChange} search={search} />
                        })}
                    </div>


                    {/* Website visitor count and footer area */}
                    <div className="mt-40">
                        <VisitorCount />
                        <Footer />
                    </div>

                </div>



            </div>


        </div>
    )
}

export default Index


const MainService = ({ data }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()


    return (


        <div className="indexCard">
            <div className='indexCardIcon'>
                {data.icon}

            </div>
            <div className='indexCardBody'>
                <div>
                    <p className='indexCardPUp'>{data.title}</p>
                    <p className='indexCardPDown'>{data.phrase}</p>
                </div>
                <div className='indexBtnOuter'>
                    <button onClick={() => {
                        navigate(data.user ? data.profileUrl : data?.loginUrl)
                    }} className={`indexBtn ${data.user ? 'indexBtnHalf' : 'indexBtnFull'} duration-200 ease-in-out`}>
                        {data.user ? 'Visit Profile' : 'Login Now'}
                    </button>
                    {data.user && <button onClick={() => {
                        dispatch(data.dispatchFunction(null))
                        localStorage.removeItem(data.tokenId)
                        navigate('/')
                    }} className='indexBtn indexBtnHalf duration-200 ease-in-out'
                        style={{ backgroundColor: "#f88e7b" }}> Logout
                    </button>
                    }
                </div>
            </div>
        </div>


    )
}