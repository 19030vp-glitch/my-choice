import React from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../../templates/faculty/cas-report/Header'
import Tables from '../../../templates/faculty/faculty-report/Tables'
import Axios from 'axios'
import { useEffect, useState } from 'react'
import title from '../../../js/title'
import Loader from '../../../components/Loader'
import { reverseURLFormat } from '../js/prettifyTextForLink'
import { api } from '../../../js/api'


const Faculty = () => {
    const [academicData, setAcademicData] = useState(null)
    const { facultyName } = useParams()

    const [loading, setLoading] = useState(false)

    title(academicData ? `${academicData.user?.salutation} ${academicData.user?.name}` : 'Your Faculty Profile')


    // get all the academic data for tables
    useEffect(() => {

        if (facultyName) {
            setLoading(true)
            const URL = `${api}/api/getAllData`
            Axios.post(URL, { getDataFilter: { name: reverseURLFormat(facultyName) }, fetchYears: 'all' })
                .then((res) => {
                    res.data.status = 'success' ? (setAcademicData(res.data.data), setLoading(false)) : setAcademicData(null)
                }).catch((err) => {
                    setLoading(false)
                    return 'Something went wrong...'
                })
        }

    }, [facultyName])

    return (
        loading ? <Loader /> : <div>
            {(academicData) && <div>
                <Header user={academicData.user} title="Faculty Report" subTitle={`Faculty Report of ${academicData.user?.salutation} ${academicData.user?.name}`} directorData={academicData} userType="faculty" showPersonalDetails={false} />
                <Tables academicData={academicData} showProof={false} />
            </div>}
        </div>
    )
}

export default Faculty