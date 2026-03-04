import React from 'react'
import { useNavigate } from 'react-router-dom'
import useScroll from '../hooks/useScroll'

const Acknowledgement = ({ children, title, navigateTo }) => {

    const navigate = useNavigate()
    useScroll()

    return (
        <div className='text-center'>
            <div>
                <p className='mt-5 text-4xl'>Acknowledgement</p>
                <p className='text-muted mt-2'>{title}</p>
            </div>

            <div className='my-5 md:w-3/5 w-full text-center mx-auto'>
                {children}
            </div>


            <div className='mx-auto'>
                <button className="btn btn-success px-10"
                    onClick={() => navigate(navigateTo)}
                >Done</button>
            </div>
        </div>
    )
}

export default Acknowledgement

