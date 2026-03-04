import React from 'react'
import GoBack from '../../../components/GoBack'
import siteLinks from '../../../components/siteLinks'
import { useDispatch, useSelector } from 'react-redux'
import serverLinks from '../../../js/serverLinks'
import { useNavigate } from 'react-router-dom'
import { setDSDUser } from '../../../redux/slices/UserSlice'

const HomeProfile = ({ children, bredLinks, user, setUser, userType, tokenName, profileButton1, profileButton2 }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    return (
        <div>
            <GoBack pageTitle={user?.department} bredLinks={bredLinks} />
            <div className='mt-3 border rounded-xl gray animate-fade-up animate-once'>

                {user &&
                    <div className='p-4 flex lg:flex-row items-start justify-start gap-3 flex-col'>
                        <div className='sm:flex items-start justify-start gap-5 lg:w-[65%]'>
                            <img src={serverLinks.showFile(user?.photoURL, userType)} className='h-[100px] w-[100px] sm:h-[170px] sm:w-[170px] rounded-full object-cover border-4 border-[#344e87]' />

                            <div className='text-black '>
                                <p className='text-lg sm:text-2xl font-bold'>{user?.name} </p>
                                <p className='text-base sm:text-xl'>{user?.designation ? user.designation : "Director"},</p>
                                <p className='text-xs sm:text-sm'>{user?.department},</p>
                                <p className='text-xs sm:text-sm'>
                                    SRTMUN, Vishnupuri, Nanded - 431 606</p>
                                <div className='flex items-start justify-start gap-2 mt-4 flex-wrap'>
                                    {profileButton1}
                                    {profileButton2}
                                    <button onClick={() => { dispatch(setUser(null)); navigate(siteLinks.welcome.link); localStorage.removeItem(tokenName); }} className='p-2 flex-auto text-sm sm:text-base rounded-full text-blue-700 border-2 hover:bg-blue-200 border-blue-700'>
                                        Logout
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>}


                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default HomeProfile
