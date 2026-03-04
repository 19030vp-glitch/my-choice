import React from 'react'
import { MainHeading } from './Header'
import { stageObj } from '../../../services/faculty/reports/cas/components/ApplyLevel'

const Introduction = ({ forPrintOut, title, subTitle, userCasDuration, level }) => {
    return (
        <div className='w-full'>
            <MainHeading forPrintOut={forPrintOut} title={title} subTitle={subTitle} />
            <div>
                <div className="text-center my-5">
                    <p className='font-semibold underline underline-offset-1'>References:</p>
                    <div>
                        <i>(i). The Gazette of India: Extraordinary, Part III Section 4, Dated 18th July, 2018</i>
                        <br /><i>(ii). Government of Maharashtra Misc. - 2018.CR 56/18/UNI1 date 8th March, 2019</i>
                        <br /><i>(iii). SRTMU Acad/UGC Regu/2018-19/3345 dated 26th March, 2019</i>
                    </div>
                </div>


                <div className="text-center">

                    <div className="mb-2 mt-4">
                        <p className="font-semibold">CAS Promotion for <i>Teachers</i> in University & Colleges (Consolidated) </p>

                        <p className="my-3 text-lg font-semibold">
                            Assessment Period : From {userCasDuration}
                        </p>

                        <p className="mt font-semibold">
                            Request for Promotion Under CAS (Grade Pay / Academic Level) :
                            <p className="font-bold mt-1">{stageObj?.[level]?.title}</p>
                        </p>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Introduction
