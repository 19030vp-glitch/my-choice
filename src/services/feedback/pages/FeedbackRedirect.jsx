import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const FeedbackRedirect = () => {

    const { userType } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        let link = `/feedback/${userType}`
        navigate(link, { replace: true })
    }, [])


    return (
        <></>
    )
}

export default FeedbackRedirect
