import React from 'react'

const ProgramTitle = ({ program }) => {

    return (
        <div>
            <p className="text-muted"> {program?.prefix} </p>
            <p className="font-bold text-lg sm:text-xl md:text-3xl"> {program?.title} </p>
        </div>
    )
}

export default ProgramTitle
