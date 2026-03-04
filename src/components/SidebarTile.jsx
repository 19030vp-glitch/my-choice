import React from 'react'
import { useDispatch } from 'react-redux';
import { setPage } from '../redux/slices/NavbarSlice';



const SidebarTile = ({ title, icon, active, setActive, state, small = true }) => {
    const dispatch = useDispatch()
    return (
        <div onClick={() => { dispatch(setPage(state)); dispatch(setActive(state)); }} className={`flex items-center duration-200 ease-in-out cursor-pointer hover:bg-blue-200 justify-start gap-2 
        ${active === state ? 'bg-blue-300' : 'bg-blue-100'} ${small ? 'px-2 py-2' : 'px-4 py-3'} text-sm rounded-full`}>
            {icon}
            <p className='text-blue-900'>{title}</p>
        </div>
    )
}

export default SidebarTile