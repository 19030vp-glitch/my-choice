import Axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import fetchData from '../../../services/dashboard/js/fetchData'
import { getAuditData } from '../../../services/director/reports/academic-audit/components/audit-services'
import Header from '../../faculty/cas-report/Header'
import AAASummarySheet from './AAASummarySheet'
import AAATables from './AAATables'
import { api } from '../../../js/api'

const AAAReport = () => {

    const { department, selectedYear } = useParams()
    const [serverAuditData, setServerAuditData] = useState(null)
    const [auditData, setAuditData] = useState(null)
    const [auditError, setAuditError] = useState(null)
    const [academicData, setAcademicData] = useState(null)
    const [directorData, setDirectorData] = useState(null)

    // get AAA data from Department
    useEffect(() => {
        if (department) {
            selectedYear &&
                getAuditData(department, null, setServerAuditData, setAuditError, false)
        }
    }, [department])


    // getting the user from the department
    const param = { model: 'DirectorUser', filter: { department } }
    const { data: userData } = useQuery(
        [param.model, param], () => fetchData(param))

    // arrange aaa data based on selected aaa year from user
    useEffect(() => {

        if (serverAuditData) {
            let oldAAAArray = [];
            serverAuditData.AAAData.forEach(item => {
                oldAAAArray.push(JSON.parse(item))
            });

            // keep those element in array whose aaaYear is equal to selectedYear array
            let newAAAArray = []
            JSON.parse(selectedYear).forEach(year => {
                oldAAAArray.forEach(item => {
                    if (item.auditYear === year) {
                        newAAAArray.push(item)
                        console.log((item))
                    }
                }
                )
            })

            // sort the array based on aaaYear field in ascending order
            newAAAArray.sort((a, b) => {
                return parseInt(a.auditYear.slice(0, 4)) - parseInt(b.auditYear.slice(0, 4));
            })

            setAuditData(newAAAArray)
        }



    }, [serverAuditData])

    // get all the director data from SDM tables
    useEffect(() => {
        const URL = `${api}/api/getAllData/director`
        Axios.post(URL, { selectedYear, department, fetchYears: JSON.parse(selectedYear) })
            .then((res) => {
                res.data.status = 'success' ? setDirectorData(res.data.data) : setAuditError('No data found')
            }).catch((err) => {
                setAuditError('Something went wrong')
            })
    }, [selectedYear])

    // get all the academic data for from faculty tables
    useEffect(() => {
        const URL = `${api}/api/getAllData/faculty`
        Axios.post(URL, { department, filter: { year: { $in: JSON.parse(selectedYear) } } })
            .then((res) => {
                res.data.status = 'success' ? setAcademicData(res.data.data) : setAuditError('No data found')
            }).catch((err) => {
                setAuditError('Something went wrong')
            })

    }, [selectedYear])


    return (
        <div>
            {
                userData && <div>
                    <Header user={userData && userData?.data?.data[0]} title="Academic & Administrative Audit" subTitle={`AAA Report of year ${auditData?.map((item) => item.auditYear).join(', ')}`} userType="director" directorData={directorData} academicYear={(JSON.parse(selectedYear))[0]} type="aaa" />
                    <AAASummarySheet auditData={auditData} academicData={academicData} directorData={directorData} academicYear={(JSON.parse(selectedYear))[0]} />
                    <AAATables auditData={auditData} academicData={academicData} directorData={directorData} academicYear={(JSON.parse(selectedYear))[0]} />
                </div>
            }
        </div>
    )
}

export default AAAReport