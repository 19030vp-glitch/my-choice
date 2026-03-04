import React, { useEffect } from 'react'
import Header from '../cas-report/Header'
import Tables from './Tables'
import Axios from 'axios'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../../../js/api'


const FacultyReport = () => {
    const [academicData, setAcademicData] = useState(null)
    const { userId, otherOptions, years } = useParams()


    // get all the academic data for tables
    useEffect(() => {

        if (userId) {
            const URL = `${api}/api/getAllData`
            const fetchYears = JSON.parse(years)
            Axios.post(URL, { userId, fetchYears: fetchYears.length > 0 ? fetchYears : 'all' })
                .then((res) => {
                    res.data.status = 'success' ? setAcademicData(res.data.data) : setAcademicData(null)
                }).catch((err) => {
                    return 'Something went wrong...'
                })
        }

    }, [userId])

    return (
        (academicData) && <div>
            <Header user={academicData.user} title="Faculty Report" subTitle={null} directorData={academicData} otherOptions={JSON.parse(otherOptions)} userType="faculty" />
            <Tables academicData={academicData} showProof={true} otherOptions={JSON.parse(otherOptions)} />
        </div>
    )
}

export default FacultyReport