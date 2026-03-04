import { Button, IconButton, Tooltip } from '@mui/material'
import React from 'react'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import Sidebar from './Sidebar';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import LeaderboardRoundedIcon from '@mui/icons-material/LeaderboardRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { setUser } from '../redux/slices/UserSlice';
import siteLinks from './siteLinks';

const OffCanvas = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    // function to generate report
    function generateReport() {

        navigate(siteLinks.facultyReport)
    }

    return (
        <div>

            <button type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
                <Tooltip title="Open Side Menubar">
                    <Button className='border-2 border-blue-500 rounded-full'
                        sx={{ borderRadius: '50px' }}>
                        <MenuRoundedIcon />
                    </Button>
                </Tooltip>
            </button>



            <div className="offcanvas offcanvas-start " data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">

                <div className="offcanvas-header pt-0 mt-3 px-2">

                    {/* // Services dropdown */}
                    <div className="btn-group mt-2 ml-2">
                        <button type="button" className=" py-2 px-4  " data-bs-toggle="dropdown" aria-expanded="false">
                            <IconButton className='text-blue-500'>
                                <MoreHorizRoundedIcon />
                            </IconButton>
                        </button>
                        <ul className="dropdown-menu w-56">

                            <li className='p-2'> <button onClick={generateReport} className='bg-green-100 text-green-800  hover:bg-green-200 border-2 border-green-200 ease-in-out duration-200 px-3 p-1 rounded-full'>
                                <LeaderboardRoundedIcon className='text-green-800 mr-2' />
                                Generate Report
                            </button>
                            </li>


                            <li><hr className="dropdown-divider" /></li>

                            <li onClick={() => { navigate('/'); localStorage.removeItem('faculty-token'); dispatch(setUser(null)) }} className='flex text-red-900 hover:bg-red-100 duration-200 ease-in-out items-center justify-start gap-2 p-2 cursor-pointer '><LogoutIcon className=' mr-2' />
                                Logout</li>
                        </ul>
                    </div>


                    <IconButton>
                        <CloseRoundedIcon data-bs-dismiss="offcanvas" />
                    </IconButton>
                </div>


                <div className="offcanvas-body py-0 px-2 change__scrollbar mx-4 mt-2 mb-4">
                    <div data-bs-dismiss="offcanvas">
                        <Sidebar />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default OffCanvas