import React from 'react'
import { Link } from 'react-router-dom'
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import { IconButton, Tooltip } from '@mui/material';

const USHACard = ({ details }) => {
    return (
        <Link to={details.statusLink} className={`flex flex-col ${details.id === "A" ? 'border-red-100' : details.id === "D" ? 'border-orange-100' : `border-${details.footerColor}-100`} border-2 rounded-xl cursor-pointer ${details.bgColor} mt-3`}>
            <div className="p-3 md:p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span>{details.icon}</span> <span className={`text-lg font-bold ${details.color}`}>{details.title}</span>
                    </div>
                    <Link to={details.link}>
                        <Tooltip placement='top' title="View Details">
                            <IconButton><ArticleRoundedIcon className={`${details.color}`} /></IconButton>
                        </Tooltip>
                    </Link>

                </div>
                <p className="mt-2 text-gray-500">
                    {details.description}
                </p>
            </div>
        </Link>
    )
}

export default USHACard
