import React, { useState } from 'react'
import GoBack from '../../../components/GoBack'
import siteLinks from '../../../components/siteLinks'
import Text from '../../../inputs/Text'
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import OtherMainTable from '../../../components/OtherMainTable';

let nssLogo = <img alt='nss logo' src="/assets/nsslogo.png" height="40px" width="40px" />

const NSSStudentAdmission = () => {

    const [nssInfo, setNssInfo] = useState({})

    return (
        <div>
            <GoBack pageTitle="NSS Student Admission" bredLinks={[siteLinks.welcome, siteLinks.nssStudentAdmission]} />


            <div className="w-full border-b">
                <div className='mx-auto w-max'>
                    <p className='flex items-center justify-center gap-2 text-3xl pb-2'>{nssLogo} National Service Scheme</p>
                </div>
            </div>

            <div className="mt-3">
                <Text space='w-full' objectWiseState={true} state={nssInfo} setState={setNssInfo} title="Name of the College" stateKey="collegeName" />

                <div className="my-5">
                    <p className="text-center mb-2 font-semibold text-lg">List of the NSS Enrolled for the Year 2022-23</p>



                    <div className='bg-gray-50 p-3 border mb-3 rounded-md flex items-start justify-between gap-5'>
                        <div className='flex-auto'>
                            <p className="mb-3 font-semibold">1. Program Officers</p>
                            <div className="my-3">
                                <Text space='w-full' objectWiseState={true} state={nssInfo} setState={setNssInfo} title="Officer 1" stateKey="officer1" />
                            </div>
                            <div className="my-3">
                                <Text space='w-full' objectWiseState={true} state={nssInfo} setState={setNssInfo} title="Officer 2" stateKey="officer2" />
                            </div>
                            <div className="my-3">
                                <Text space='w-full' objectWiseState={true} state={nssInfo} setState={setNssInfo} title="Officer 3" stateKey="officer3" />
                            </div>
                        </div>
                        <div className='flex-auto'>
                            <p className="mb-3 font-semibold">2. Volunteers Count</p>
                            <div className="my-3">
                                <Text space='w-full' objectWiseState={true} state={nssInfo} setState={setNssInfo} title="Total Boys" stateKey="totalBoys" />
                            </div>
                            <div className="my-3">
                                <Text space='w-full' objectWiseState={true} state={nssInfo} setState={setNssInfo} title="Total Girls" stateKey="totalGirls" />
                            </div>
                            <div className="my-3">
                                <Text space='w-full' objectWiseState={true} state={nssInfo} setState={setNssInfo} title="Total Volunteers" stateKey="totalVolunteers" />
                            </div>
                        </div>

                    </div>

                    <div className="my-3">
                        <div className="accordion" id="accordionExample">
                            {
                                navcom.map((item, index) => {
                                    return <div className="accordion-item bg-gray-50 ">
                                        <h2 className="accordion-header accordionHeader" id={`heading-${index}`}>
                                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse-${index}`} aria-expanded="false" aria-controls={`collapse-${index}`}>
                                                {item.value}
                                            </button>
                                        </h2>
                                        <div id={`collapse-${index}`} className={`accordion-collapse collapse${index === 0 ? ' show' : ''}`} aria-labelledby={`heading-${index}`} data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                <div key={item}>{item.element}</div>
                                            </div>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>

                    <div className="my-2">
                        <button type="button" className="px-5 py-2.5 text-sm font-medium text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 rounded-lg text-center">
                            <BookmarkRoundedIcon />
                            <span className="ml-3">Submit NSS Data</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const navcom = [
    { element: <OtherMainTable model="NssBasicInfo" />, value: 'Student Basic Info' },
    { element: <OtherMainTable model="NssAdmission" />, value: 'NSS Student' },
]

export default NSSStudentAdmission
