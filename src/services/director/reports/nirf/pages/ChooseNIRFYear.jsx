import React, { useState } from 'react'
import GoBack from '../../../../../components/GoBack'
import Year from '../../../../../inputs/Year'
import { SaveButton } from '../../../../faculty/reports/pbas/PbasReportHome'
import title from '../../../../../js/title'
import toast from 'react-hot-toast'
import Footer from '../../../../../components/Footer'
import siteLinks from '../../../../../components/siteLinks'
import { useNavigate } from 'react-router-dom'

const ChooseNIRFYear = () => {

    const [academicYear, setAcademicYear] = useState(null)
    const navigate = useNavigate()
    let pageTitle = 'National Institutional Ranking Framework (NIRF)'
    title(pageTitle)
    const bredLinks = [siteLinks.welcome, siteLinks.directorHome, siteLinks.nirfSelectYear]

    return (
        <div>

            <GoBack pageTitle={pageTitle} bredLinks={bredLinks} />

            <div className='h-screen'>
                <div className='mx-auto flex items-center text-center justify-center my-5'>
                    <Year state={academicYear} setState={setAcademicYear} space='col-md-3'
                        title="Choose Academic Year" customYears={['2022-23']} />
                </div>
                <div className='mx-auto flex items-center justify-center'>
                    <SaveButton title={`Save and Proceed`} onClickFunction={() => {
                        if (academicYear) {
                            navigate(`/director/nirf/${academicYear}/programs`)
                        } else {
                            toast.error('Select Academic Year before you proceed.')
                        }
                    }} />
                </div>
            </div>





            <Footer />
        </div>
    )
}

export default ChooseNIRFYear
