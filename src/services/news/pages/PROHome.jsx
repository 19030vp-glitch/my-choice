import React from 'react'
import OnlyNav from '../../../components/OnlyNav'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setProUser } from '../../../redux/slices/UserSlice'
import Bred from '../../../components/Bred'
import Footer from '../../../components/Footer'
import useScroll from '../../../hooks/useScroll'
import title from '../../../js/title'
import siteLinks from '../../../components/siteLinks'
import useProAuth from '../../../hooks/useProAuth'
import { NewsComponent, SearchTable } from './NewsPage'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useState } from 'react'
import Filter from '../components/Filter'
import serverLinks from '../../../js/serverLinks'
import GoBack from '../../../components/GoBack'


const PROHome = () => {
    useProAuth(false)
    useScroll()
    const user = useSelector((state) => state.user.proUser)
    title("PRO Home")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [search, setSearch] = useState(null)
    const [rangeDate, setRangeDate] = useState(null)

    return (
        <div>
            <GoBack pageTitle="PRO" showAvatar={{ photoURL: user?.photoURL, userType: 'news' }} />

            {/* Navtools */}
            <div className='mt-2'>
                <Bred links={[siteLinks.welcome, siteLinks.proHome]} />
            </div>

            <div className='mt-3 border rounded-xl gray'>
                {/* PROFILE */}
                <div className='rounded-xl p-3'>
                    <div>
                        {user &&
                            <div>
                                <div className='sm:flex items-start justify-start gap-5 w-full'>
                                    <img src={serverLinks.showFile(user?.photoURL, 'news')} className='h-[100px] w-[100px] sm:h-[170px] sm:w-[170px] rounded-full object-cover border-4 border-[#344e87]' />

                                    <div className='text-black '>
                                        <p className='text-lg sm:text-2xl font-bold'>{user && user.name}</p>
                                        <p className='text-base sm:text-xl'>Public Relation Officer,</p>
                                        <p className='text-xs sm:text-sm'>SRTMUN, Vishnupuri, Nanded - 431 606</p>

                                        <div className='flex items-center justify-start gap-2 mt-4 flex-wrap'>
                                            <div className='flex items-center justify-start gap-2'>
                                                <button onClick={() => { navigate(siteLinks.proEditor.link) }} className='p-2 rounded-full border-2 text-sm sm:text-base hover:bg-blue-700 border-blue-800 bg-blue-800 text-white'>
                                                    Add News
                                                </button>

                                                <button onClick={() => { navigate(siteLinks.allNews.link) }} className='p-2 rounded-full border-2 text-sm sm:text-base hover:bg-blue-700 border-blue-800 bg-blue-800 text-white'>
                                                    Explore News
                                                </button>
                                            </div>

                                            <button onClick={() => { dispatch(setProUser(null)); navigate(siteLinks.welcome.link); localStorage.removeItem('pro-token'); }} className='p-2 text-sm sm:text-base rounded-full text-blue-700 border-2 hover:bg-blue-200 border-blue-700'>
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>




                </div>

                <hr />

                {/* NEWS */}
                <div className='mt-3'>
                    <div>
                        <Filter search={search} setSearch={setSearch} rangeDate={rangeDate} setRangeDate={setRangeDate} />
                    </div>
                    <div className='mt-4'>
                        {rangeDate ? <SearchTable search={search} shouldFetchSearchData={false} rangeDate={rangeDate} /> : search ? <SearchTable search={search} shouldFetchSearchData={true} rangeDate={rangeDate} /> : <NewsComponent />}
                    </div>
                </div>



            </div>


            <Footer />

        </div>
    )
}

export default PROHome




