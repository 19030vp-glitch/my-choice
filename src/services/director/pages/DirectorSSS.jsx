import React, { useState } from 'react'
import GoBack from '../../../components/GoBack'
import siteLinks from '../../../components/siteLinks'
import { getSSSAnalytics, getSSSData } from '../../feedback/js/getFeedbackData'
import { SSSAnalyticalData } from '../../admin/pages/AdminSSS'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { academicYearGenerator } from '../../../inputs/Year'
import Select from '../../../components/formComponents/Select'
import UserLoading from '../../../pages/UserLoading'

const DirectorSSS = () => {
    const bredLinks = [siteLinks.welcome, siteLinks.directorHome, { title: "Director SSS Analysis" }]
    const academicYearsToFetch = academicYearGenerator(2)
    const { schoolName } = useParams()

    const numericalDataFilter = { schoolName, academicYear: { $in: academicYearsToFetch } }
    const { data: numericalData, isLoading } = useQuery(`SSSData-${numericalDataFilter.schoolName}`, () => getSSSData(numericalDataFilter, academicYearsToFetch))

    const [schoolNameAndYear, setSchoolNameAndYear] = useState({ schoolName, academicYear: academicYearsToFetch[0] })
    const [reportLoading, setReportLoading] = useState(false)

    // query for analytical data
    const key = `SSSAnalyticalData-${schoolNameAndYear?.schoolName}-${schoolNameAndYear?.academicYear}`

    const { data: analytics, isLoading: isAnalyticsLoading } = useQuery(key, () => getSSSAnalytics(schoolNameAndYear?.schoolName, schoolNameAndYear?.academicYear),)


    return (
        <div>
            <GoBack pageTitle="Director SSS Analysis" bredLinks={bredLinks} />
            <div className="flex items-center justify-between">
                <p className="my-4 font-bold text-xl text-center flex-auto">Student Satisfaction Survey of {schoolNameAndYear?.schoolName} for {schoolNameAndYear?.academicYear} </p>

                <div>
                    <select className="form-select" id="validationCustom04" required onChange={
                        (e) => { setSchoolNameAndYear((prev) => { return { ...prev, academicYear: e.target.value } }) }} value={schoolNameAndYear?.academicYear}>
                        <option selected disabled value="">Choose Year</option>

                        {academicYearsToFetch.map((year, index) => {
                            return <option key={index} value={year}>{year}</option>
                        })}
                    </select>
                </div>

            </div>
            <hr />
            <br />
            {isLoading ? <UserLoading title="Fetching responses in numbers" /> :
                <div className="mb-3 flex items-start gap-3">
                    {
                        academicYearsToFetch.map((year) => {
                            return <div id="alert-additional-content-1" class="p-4 mb-4 text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert">
                                <div class="flex items-center">

                                    <span class="sr-only">Info</span>
                                    <h3 class="text-2xl font-bold">{numericalData?.data?.data?.[schoolName]?.[year]}</h3>
                                </div>
                                <div class="mt-2 text-sm">
                                    Responses of Academic Year {year}
                                </div>
                            </div>
                        })
                    }
                </div>
            }

            <SSSAnalyticalData isAnalyticsLoading={isAnalyticsLoading} reportLoading={reportLoading} setReportLoading={setReportLoading} forReport={false} analytics={analytics} schoolNameAndYear={schoolNameAndYear} excelClick={() => { }} />
        </div>
    )
}

export default DirectorSSS
