import React from 'react'
import { useNavigate } from 'react-router-dom'
import Actions from './Actions'

const Old = ({ className, news, refetch, proUser }) => {
    const navigate = useNavigate()
    return (
        <div className={`${className} cursor-pointer rounded-md bg-white p-3 border hover:text-blue-600`}>
            {
                proUser && <div className="flex justify-end">
                    <Actions news={news} refetch={refetch} />
                </div>
            }
            <div onClick={() => navigate(`/news/${news.slug}`)} >
                <p className='text-xs text-muted'>29/10/2022</p>
                <p className='font-semibold md:text-base text-sm'>{news.headline} </p>
            </div>
        </div>
    )
}

export default Old