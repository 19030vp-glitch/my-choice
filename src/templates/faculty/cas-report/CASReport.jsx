import React from 'react'
import Header from './Header'
import Table from './Tables'
import SummarySheet from './SummarySheet'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import Axios from 'axios'
import BasicIntro from './BasicIntro'
import Eligibility from './Eligibility'
import './CAS.css'
import Introduction from './Introduction'
import UserLoading from '../../../pages/UserLoading'
import { api } from '../../../js/api'

const CASReport = () => {

    const { selectedYear, userId, forPrintOut } = useParams()
    const [casData, setCasData] = useState(null)
    const [casError, setCasError] = useState(null)
    const [casArray, setCasArray] = useState(null)
    const [academicData, setAcademicData] = useState(null)
    const [fetchYears, setFetchYears] = useState([])
    const [eligData, setEligData] = useState(null)
    const [level, setLevel] = useState(null)
    const [userCasDuration, setUserCasDuration] = useState(null)






    // get cas data from userID
    useEffect(() => {
        const URL = `${api}/getCASData`
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
            let years = []
            JSON.parse(selectedYear).forEach(year => {
                oldCasArray.forEach(item => {
                    if (item.casYear === year) {
                        newCasArray.push(item)
                        years.push(...item.fetchYears)
                    }
                }
                )
            })

            setFetchYears(new Set(years))

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
        Axios.post(URL, { selectedYear, userId, fetchYears: [...fetchYears] })
            .then((res) => {
                res.data.status = 'success' ? setAcademicData(res.data.data) : setCasError('No data found')
            }).catch((err) => {
                setCasError('Something went wrong')
            })

    }, [fetchYears])

    useEffect(() => {
        // creating eligibility details
        if (casData?.['stage5']) {
            setEligData(JSON.parse(casData?.['stage5']))
            setLevel('stage5')
        } else if (casData?.['stage4']) {
            setEligData(JSON.parse(casData?.['stage4']))
            setLevel('stage4')
        } else if (casData?.['stage3']) {
            setEligData(JSON.parse(casData?.['stage3']))
            setLevel('stage3')
        } else if (casData?.['stage2']) {
            setEligData(JSON.parse(casData?.['stage2']))
            setLevel('stage2')
        } else if (casData?.['stage1']) {
            setEligData(JSON.parse(casData?.['stage1']))
            setLevel('stage1')
        }
    }, [casData])


    // calculate CAS Duration here
    useEffect(() => {
        if (casData) {
            if (casData.casDuration && casArray) {
                let casDuration = JSON.parse(casData.casDuration)
                let startWholeYear = casArray[0].casYear.toString().slice(0, -3)
                let lastPrefix = casArray[casArray.length - 1].casYear.toString().slice(0, -5)
                let lastSuffix = casArray[casArray.length - 1].casYear.toString().slice(5)
                let lastWholeYear = lastPrefix + lastSuffix

                let date = `${casDuration.firstYear?.day} ${casDuration.firstYear?.month} ${startWholeYear} to ${casDuration.lastYear?.day} ${casDuration.lastYear?.month} ${lastWholeYear}`

                setUserCasDuration(date)

            }
        }
    }, [casData, casArray])

    return (
        <div className='mx-auto w-full font-sans cas-report-generation'>
            {(casArray && academicData && eligData && level) ?
                <>
                    <Introduction level={level} userCasDuration={userCasDuration} title="Career Advancement Scheme (CAS)"
                        subTitle={userCasDuration ? `${userCasDuration}` : ""} forPrintOut={forPrintOut} />

                    <Header user={casData.userId} title="Career Advancement Scheme (CAS)"
                        subTitle={userCasDuration ? `CAS Duration: ${userCasDuration}` : ""}
                        directorData={academicData} userType="faculty" forPrintOut={forPrintOut} forCAS={true} />

                    <Eligibility eligData={eligData} level={level} forPrintOut={forPrintOut} userCasDuration={userCasDuration} userId={userId} />
                    <BasicIntro academicData={academicData} forPrintOut={forPrintOut} />
                    <Table academicData={academicData} casArray={casArray} forPrintOut={forPrintOut} />
                    <SummarySheet casArray={casArray} forPrintOut={forPrintOut} />
                </> : <p className='my-5'>
                    <UserLoading title="Fetching CAS Data" />
                </p>
            }
        </div>
    )
}

export default CASReport