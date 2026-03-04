import React from 'react'
import { useSelector } from 'react-redux'
import siteLinks from '../../../../../components/siteLinks'
import { useNavigate } from 'react-router-dom'
import useScroll from '../../../../../hooks/useScroll'

const Acknowledgement = ({ serviceName, casYear }) => {

    const user = useSelector((state) => state.user.user)
    const navigate = useNavigate()
    useScroll()

    return (
        <div className='text-center'>
            <div>
                <p className='mt-5 text-4xl'>Acknowledgement</p>
                <p className='text-muted mt-2'>Successfull submission of {serviceName} Form ({casYear}) </p>
            </div>

            <div className='my-5 w-3/5 text-center mx-auto'>
                <p>Thank you, <b>{user?.salutation} {user?.name}</b> for successfully submitting the {serviceName === "CAS" ? "Career Advancement Scheme (CAS)" : "Performance Based Appraisal System (PBAS)"} Report for the year <b>{casYear}</b>. </p>
            </div>


            <div className='mx-auto'>
                <button className="btn btn-success px-10"
                    onClick={() => navigate(siteLinks.facultyHome.link)}
                >Done</button>
            </div>
        </div>
    )
}

export default Acknowledgement

