import React from 'react'

const Spinner = ({ title }) => {
    return (
        <div className="text-center">
            <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <p className='text-light'>{title}</p>
        </div>
    )
}

export default Spinner