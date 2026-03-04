import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import Axios from 'axios'
import Header from '../cas-report/Header'
import BasicIntro from '../cas-report/BasicIntro'
import SummarySheet from '../cas-report/SummarySheet'
import Table from '../cas-report/Tables'
import OtherInfo from '../cas-report/OtherInfo'
import Instructions from '../cas-report/Instructions'
import TeachingAndActivities from '../cas-report/TeachingAndActivities'
import UserLoading from '../../../pages/UserLoading'
import {api} from '../../../js/api'
 
const CASReport = () => {

    const { selectedYear, userId, forPrintOut } = useParams()
    const [casData, setCasData] = useState(null)
    const [casError, setCasError] = useState(null)
    const [casArray, setCasArray] = useState(null)
    const [academicData, setAcademicData] = useState(null)
    const [fetchYears, setFetchYears] = useState([])


    // get cas data from userID
    useEffect(() => {
        const URL = `${api}/getPBASData`
        Axios.post(URL, { userId })
            .then((res) => {
                if (res.data.status === 'success') {
                    setCasData(res.data.data)
                }
                else {
                    setCasError('Data not found')
                }
            }).catch((err) => {
                setCasError('CAS Error : ', err)
            })
    }, [])

    // arrange cas data based on selected cas year from user
    useEffect(() => {

        if (casData) {
            let oldCasArray = [];
            casData.casData.forEach(cas => {
                oldCasArray.push(JSON.parse(cas))
            });

            // keep those element in array whose casYear is equal to selectedYear array
            let newCasArray = []
            JSON.parse(selectedYear).forEach(year => {
                oldCasArray.forEach(item => {
                    if (item.casYear === year) {
                        newCasArray.push(item)
                    }
                }
                )
            })


            // sort the array based on casYear field in ascending order
            newCasArray.sort((a, b) => {
                return parseInt(a.casYear.slice(0, 4)) - parseInt(b.casYear.slice(0, 4));
            })

            setCasArray(newCasArray)
        }



    }, [casData])

    // get all the academic data for tables
    useEffect(() => {
        const URL = `${api}/api/getAllData`
        Axios.post(URL, { selectedYear, userId, fetchYears: JSON.parse(selectedYear) })
            .then((res) => {
                res.data.status = 'success' ? setAcademicData(res.data.data) : setCasError('No data found')
            }).catch((err) => {
                setCasError('Something went wrong')
            })

    }, [fetchYears])




    return (
        <div className='mx-auto w-full'>
            {(casArray && academicData) ?
                <>
                    <Header user={casData.userId} title="Performance Based Appraisal System (PBAS)"
                        subTitle={`PBAS Report of year ${casArray?.map((cas) => cas.casYear).join(', ')}`}
                        directorData={academicData} userType="faculty" forPrintOut={forPrintOut} />
                    <BasicIntro academicData={academicData} forPrintOut={forPrintOut} />
                    <TeachingAndActivities showFileURL="pbasDirURL" casArray={casArray} forPrintOut={forPrintOut} lectures={academicData.Lectures} />
                    <Table academicData={academicData} casArray={casArray} showFileURL="pbasDirURL" forPrintOut={forPrintOut} />
                    <SummarySheet casArray={casArray} showFileURL="pbasDirURL" title="PBAS" forPrintOut={forPrintOut} />
                    <OtherInfo academicData={academicData} casArray={casArray} forPrintOut={forPrintOut} />
                    <Instructions forPrintOut={forPrintOut} />
                </> : <p className='my-5'>
                    <UserLoading title="Fetching PBAS Data" />
                </p>
            }
        </div>
    )
}

export default CASReport