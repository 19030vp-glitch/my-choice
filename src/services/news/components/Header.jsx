import { IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useDispatch, useSelector } from 'react-redux';
import { setProUser } from '../../../redux/slices/UserSlice';
import Filter from './Filter';

const Header = ({ title = "News Bulletin", showSearch = true, backURL = -1, search, setSearch, rangeDate, setRangeDate }) => {

    const navigate = useNavigate()
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        // update the date every second
        const interval = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formattedDate = date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
    });

    const formattedTime = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });


    const proUser = useSelector((state) => state.user.proUser)
    const dispatch = useDispatch()

    return (
        <div>
            <div className='py-1 border-b'>

                <div className='flex flex-col md:flex-row md:items-center items-start justify-between gap-1'>

                    <div className='flex item-center justify-between w-full md:w-auto md:flex-none'>
                        <div className='flex items-center justify-start gap-2'>
                            <IconButton onClick={() => { navigate(backURL) }}>
                                <ArrowBackRoundedIcon />
                            </IconButton>
                            <span className='font-bold md:text-lg text-base whitespace-nowrap'>{title}</span>
                        </div>

                        <div className='md:hidden float-right flex items-center justify-end gap-2 ml-2 md:ml-0'>
                            <div className='w-full float-right flex items-center justify-end'>
                                <div>
                                    <p className='text-sm md:text-base' >{formattedTime}</p>
                                    <p className='text-muted text-xs md:text-sm'>{formattedDate}</p>
                                </div>
                            </div>

                            {
                                proUser && <div className='w-full float-right flex items-center justify-end'
                                    onClick={() => { dispatch(setProUser(null)); localStorage.removeItem('pro-token'); navigate('/') }}>
                                    <IconButton>
                                        <LogoutRoundedIcon />
                                    </IconButton>
                                </div>
                            }

                        </div>
                    </div>

                    {showSearch && <div className='w-full mr-3'>
                        <Filter search={search} setSearch={setSearch} setRangeDate={setRangeDate} />
                    </div>}

                    <div className='hidden float-right md:flex items-center justify-end gap-2 ml-2 md:ml-0'>
                        <div className='w-full float-right flex items-center justify-end'>
                            <div>
                                <p className='text-sm md:text-base' >{formattedTime}</p>
                                <p className='text-muted text-xs md:text-sm'>{formattedDate}</p>
                            </div>
                        </div>

                        {
                            proUser && <div className='w-full float-right flex items-center justify-end'
                                onClick={() => { dispatch(setProUser(null)); localStorage.removeItem('pro-token'); navigate('/') }}>
                                <IconButton>
                                    <LogoutRoundedIcon />
                                </IconButton>
                            </div>
                        }

                    </div>

                </div>

            </div>
        </div>
    )
}

export default Header