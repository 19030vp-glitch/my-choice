import { Avatar } from '@mui/material';
import React, { useEffect } from 'react'
import { useNavigate, } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useUserIsLoggedIn from '../hooks/useUserIsLoggedIn';

const IndexNavbar = () => {

    const user = useSelector(state => state.user.user)
    const adminUser = useSelector(state => state.user.adminUser)
    const directorUser = useSelector(state => state.user.directorUser)
    const navigate = useNavigate()


    useUserIsLoggedIn()

    return <>
        <div className="navbar pt-0 sticky-top z-20 w-full pb-2 bg-white">
            <div className="container-fluid">
                <div className="mx-auto bg-gray-200 p-2 sm:py-2 mt-2 rounded-xl sm:px-10">
                    <ul className="flex items-center justify-center text-black gap-3 cursor-pointer user-select-none ">

                        <IndexNavs title="Home" name="/" url="/" />

                        {
                            user ?
                                <div onClick={() => { navigate('/home') }}>
                                    <Avatar src={`${api}/showFile/${user.photoURL}`}
                                        sx={{ width: '30px', height: '30px' }}
                                    />
                                </div>
                                :
                                <IndexNavs title="Faculty Login" name='/faculty-login' url="/faculty-login" />
                        }
                        {
                            directorUser ?
                                <div onClick={() => { navigate('/director') }}>
                                    {/* <Avatar src={`/assets/${adminUser.photoURL}`} className="cursor-pointer"
                                            sx={{ width: '30px', height: '30px' }}
                                        /> */}
                                    <Avatar sx={{ width: '30px', height: '30px' }}>D</Avatar>

                                </div>
                                :
                                <IndexNavs title="Director Login" name='/director-login' url="/director-login" />

                        }
                        {
                            adminUser ?
                                <div onClick={() => { navigate('/admin/dashboard') }}>
                                    <Avatar src={`/assets/${adminUser.photoURL}`} className="cursor-pointer"
                                        sx={{ width: '30px', height: '30px' }}
                                    />

                                </div>
                                :
                                <IndexNavs title="Admin Login" name='/admin-login' url="/admin-login" />

                        }



                    </ul>
                </div>
                <div className='hidden'>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2 border-black" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn border-black" onClick={(e) => { e.preventDefault(); }}>Search</button>
                    </form>
                </div>
            </div>
        </div>

    </>
}

export default IndexNavbar


const IndexNavs = ({ url, title, name }) => {

    const navigate = useNavigate()
    const pathName = window.location.pathname

    return (
        <li className={` hover:bg-gray-300 py-1 px-2 hover:rounded-xl
        ${pathName === name ? 'text-black bg-gray-300 py-1 px-2 rounded-xl font-bold' : 'text-black'} text-sm sm:text-base`}
            onClick={() => { navigate(`${url}`) }}>
            {title}
        </li>


    )
}