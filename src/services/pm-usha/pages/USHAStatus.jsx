import React, { useEffect } from 'react'
import GoBack from '../../../components/GoBack'
import siteLinks from '../../../components/siteLinks'
import toast from 'react-hot-toast'
import useOtherServiceAuth from '../../../hooks/useOtherServiceAuth'
import { useNavigate, useParams } from 'react-router-dom'
import authParamsObject from '../../../js/authParamsObject'
import { proposalData } from './USHACards'
import title from '../../../js/title'
import Footer from '../../../components/Footer'
import ContructionRenovationStatus from '../status/CRStatus'
import SoftAndEquipmentTable from '../components/SoftAndEquipmentTable'
import SoftIterator from '../components/SoftIterator'

const USHAStatus = () => {
    const ushaAuthParams = authParamsObject.usha
    useOtherServiceAuth({ ...ushaAuthParams, shouldNavigate: false })
    const { tabName } = useParams()
    const navigate = useNavigate()
    const tabDetails = proposalData[tabName]

    useEffect(() => {
        if (!tabDetails) {
            toast.error("Invalid URL")
            navigate('/page-not-found', { replace: true })
        }
    }, [navigate, tabDetails, tabName])

    const breds = [siteLinks.welcome, siteLinks.ushaHome,
    { title: `${tabDetails.title} Details`, link: `/pm-usha/${tabName}/details` }, { title: `${tabDetails.title} Status`, link: `/pm-usha/${tabName}/status` }]

    title(`${tabDetails.title} Status`)

    return (
        <div>
            <div className="min-h-screen">
                <GoBack pageTitle={`${tabDetails.title} Status`} bredLinks={breds} />
                <div className='mt-4 animate-once animate-fade-up'>
                    <div className={`flex items-center gap-2 font-semibold text-blue-700 text-2xl border-b pb-2`}>
                        <span className="text-5xl">{`(${tabDetails.id})`}</span>
                        <div>
                            <p className="mt-2 font-bold">{tabDetails.title} Status</p>
                            <p className="text-sm italic">{tabDetails.annexure}</p>
                        </div>
                    </div>
                    {
                        tabDetails && <div className='mt-4'>
                            {
                                tabDetails.id === "A"
                                    ? <ContructionRenovationStatus tabId={tabDetails.id} />
                                    : tabDetails.id === "B"
                                        ? <ContructionRenovationStatus tabId={tabDetails.id} />
                                        : tabDetails.id === "C"
                                            ? <SoftAndEquipmentTable isEditable={true} type={"Equipment"} subType={"Equipment1"} />    
                                            : tabDetails.id === "D"
                                                ? <SoftIterator isEditable={true} />
                                                : null
                            }

                        </div>
                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default USHAStatus
