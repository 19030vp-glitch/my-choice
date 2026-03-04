import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'



const NewDashboardTile = ({ title, figure, icon, gradient, url, theme }) => {

    const academicYear = useSelector((state) => state.academicYear.academicYear)
    const navigate = useNavigate()

    return (
        <div className="col w-full sm:w-[300px]">
            <div className={`card radius-10 border-start border-0 border-3 border-${theme} `}>
                <div className="card-body ">
                    <div className="d-flex align-items-center">
                        <div>
                            <p className="mb-0 text-secondary">{title}
                                {academicYear && academicYear !==
                                    'Show all' ? `of Year ${academicYear}`
                                    : null}</p>
                            <h4 className={`my-1 text-${theme} text-[60px]`}>{figure}</h4>
                            <p className='mb-0 font-13 cursor-pointer text-gray-500 hover:text-gray-600' onClick={() => { navigate(url) }}>Explore</p>
                        </div>
                        <div className={`widgets-icons-2 rounded-circle bg-gradient-${gradient} text-white ms-auto`}>{icon}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { NewDashboardTile }