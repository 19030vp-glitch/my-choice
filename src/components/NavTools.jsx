import { Avatar, IconButton, Skeleton, Tooltip } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { setPage } from '../redux/slices/NavbarSlice';
import { setActive } from '../redux/slices/ActiveSlice';
import { setUser } from '../redux/slices/UserSlice';
import OffCanvas from './OffCanvas';
import siteLinks from './siteLinks';
import serverLinks from '../js/serverLinks';
import GoBack from '../components/GoBack'


const NavTools = () => {

    const user = useSelector(state => state.user.user)
    const navigate = useNavigate()
    const dispatch = useDispatch();


    return (
        <>
            <GoBack pageTitle="Faculty Profile" backUrl="/faculty">
                {
                    user ?
                        <div className='flex items-center justify-end gap-2'>

                            <div className='bg-gray-100 rounded-full'>
                                <OffCanvas />
                            </div>
                            <div className='flex items-center justify-end gap-2'>
                                {/* // Dropdown item */}
                                <div className="btn-group">
                                    <button type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <Avatar src={serverLinks.showFile(user?.photoURL, 'faculty')} className="cursor-pointer" />
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><button className="dropdown-item" onClick={() => { navigate(siteLinks.facultyHome.link) }}>Home</button></li>
                                        <li><button className="dropdown-item" onClick={() => {
                                            navigate(siteLinks.facultyProfile.link);
                                            dispatch(setActive('profile'));
                                            dispatch(setPage('profile'));
                                        }}>Profile</button></li>
                                        <li><button className="dropdown-item" onClick={() => { navigate(siteLinks.facultyChangePass.link) }}>{siteLinks.facultyChangePass.title}</button></li>
                                        <li><hr className="dropdown-divider" /></li>

                                        <li><button onClick={() => { navigate('/'); localStorage.removeItem('faculty-token'); dispatch(setUser(null)); }} className="dropdown-item text-red-600"><LogoutIcon sx={{ fontSize: '20px' }} className="mr-2" />Logout</button></li>
                                    </ul>
                                </div>
                                <div>
                                    <Tooltip title="Log out">
                                        <IconButton onClick={() => { navigate('/'); localStorage.removeItem('faculty-token'); dispatch(setUser(null)); }}>
                                            <LogoutIcon />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            </div>
                        </div> :
                        <div className="flex items-center justify-end gap-2">
                            <span className='text-gray-400'>Connecting...</span>
                            <Skeleton variant="circular" width={40} height={40} />

                        </div>
                }
            </GoBack>
        </>
    )
}

export default NavTools