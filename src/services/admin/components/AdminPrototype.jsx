import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAdminAuth from '../../../hooks/useAdminAuth';
import Header from './Header';
import Loading from './Loading';
// import './Table.css'

const AdminPrototype = ({ model, title, children, loading }) => {

    // useEffect for auth and refresh
    useAdminAuth(true)

    return (
        <div className="overflow-auto w-full max-h-screen sticky-top">

            <Header title={title} model={model} />

            {
                loading ? <Loading /> : null
            }

            <table className="table mt-3 text-xs sm:text-base">

                {children}

            </table>
        </div>
    )
}

export default AdminPrototype