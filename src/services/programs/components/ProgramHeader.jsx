import React from 'react'

const ProgramHeader = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <img src="/assets/logo.jpg" className="h-20" style={{ mixBlendMode: 'darken' }} />
            <p className="text-md font-bold text-center sm:text-xl md:text-2xl mt-2">SWAMI RAMANAND TEERTH MARATHWADA UNIVERSITY</p>
            <p className="text-gray-500 text-center text-base">Nanded- 431 606, Maharashtra, India</p>

        </div>
    )
}

export default ProgramHeader
