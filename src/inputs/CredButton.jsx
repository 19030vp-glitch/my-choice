import React from 'react'

const CredButton = ({ title, spacing, isLoading }) => {
    return (
        <>
            {!isLoading ?
                <button type="submit" className={`bg-blue-600 text-white rounded-lg hover:bg-blue-700 ease-in-out duration-200 p-3 ${spacing}`}>{title}</button>
                :
                <button type="submit" className={`bg-blue-400 text-white rounded-lg ease-in-out duration-200 p-3 ${spacing}`} disabled><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span className="visually-hidden">Loading...</span></button>
            }
        </>
    )
}

export default CredButton