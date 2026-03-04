import React from 'react'

const Note = ({ title, classes, mainTitle = "Note :" }) => {
    return (
        <div>
            <p className={`text-sm text-gray-500 ${classes}`}><span className='font-bold'>{mainTitle}</span> {title}</p>
        </div>
    )
}

export default Note