import React, { useEffect, useState } from 'react'
import { constructionAndRenovationDetails } from '../js/constants'
import ConstructionRenovationStatus from './CRStatusRadio'
import ArrowButton from '../../../components/ArrowButton'
import ConstructionRenovationPhotos from './CRPhotos'
import CRLandDetailsUpload from './CRLandDetailsUpload'
import { updateCRStatusAndOutcome } from '../js/crStatusHandler'
import { useQuery } from 'react-query'
import { getCRStatus } from '../js/crStatusHandler'
import UserLoading from '../../../pages/UserLoading'
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import AddAPhotoRoundedIcon from '@mui/icons-material/AddAPhotoRounded';
import RuleRoundedIcon from '@mui/icons-material/RuleRounded';
import EditLocationRoundedIcon from '@mui/icons-material/EditLocationRounded';

const ConstructionStatus = ({ tabId }) => {

    const [selected, setSelected] = useState(constructionAndRenovationDetails[tabId][0])
    const [statusData, setStatusData] = useState({ [selected.id]: { status: 'Not yet started', statusInPercentage: 0, outcomes: "" } })
    const filter = { tabId, infraId: selected.id }
    const { data, isLoading, refetch } = useQuery(`get-construction-status-${selected.id}`, () => getCRStatus(filter), {
        refetchOnWindowFocus: false
    })

    useEffect(() => {
        if (selected) {
            const status = data?.data
            console.log('status in main:', status)
            setStatusData({ [selected.id]: { status: status?.status || 'Not yet started', statusInPercentage: status?.statusInPercentage || 0, outcomes: status?.outcomes || "", } })
        }
    }, [selected, data])


    return (
        <div className='flex md:flex-row flex-col items-start w-full gap-4'>

            <div className='md:w-[30%] w-full space-y-2'>
                {
                    constructionAndRenovationDetails[tabId].map((item, index) => {
                        return <div onClick={() => setSelected(() => item)} key={item.id} className={`md:p-3 p-2 border rounded-md  flex items-start gap-3 cursor-pointer ${selected.id === item.id ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 hover:bg-gray-100'}`}>
                            <span className='md:text-xl text-lg font-semibold'>{index + 1}.</span> <div>
                                <p className='md:text-base text-sm font-semibold'>{item.name} </p>
                                <p className='md:text-xs text-[10px]'>{item.description}</p>
                            </div>
                        </div>
                    })
                }
            </div>
            <div className='md:flex-1 md:w-fit w-full'>
                {
                    isLoading
                        ? <UserLoading title={`Fetching ${selected.workType} Details`} />
                        : <div className="accordion" id="accordionExample">


                            {/* 1. FOR STATUS */}
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button flex items-center gap-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        <RuleRoundedIcon /> <span>Status of {selected.name}</span>
                                    </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <ConstructionRenovationStatus refetch={refetch} setStatusData={setStatusData} statusData={statusData} tabId={tabId} selected={selected} />
                                    </div>
                                </div>
                            </div>





                            {/* 2. FOR LAND DETAILS */}
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed flex items-center gap-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseLand" aria-expanded="false" aria-controls="collapseLand">
                                        <EditLocationRoundedIcon sx={{ fontSize: '28px' }} /> <span>Land Map, Permissions, Cost, Blueprint, Sanction Letters & Audits of {selected.name}</span>
                                    </button>
                                </h2>
                                <div id="collapseLand" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <div>
                                            <CRLandDetailsUpload serverLandPhotos={data?.data?.["landPhotos"]} tabId={tabId} refetch={refetch} statusData={statusData} selected={selected} />
                                        </div>
                                    </div>
                                </div>
                            </div>





                            {/* 3. FOR GEO-TAGGED PHOTOS */}
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed flex items-center gap-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        <AddAPhotoRoundedIcon /> <span>Geo-tagged photos of {selected.name}</span>
                                    </button>
                                </h2>
                                <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <div>
                                            <ConstructionRenovationPhotos serverData={data?.data} tabId={tabId} refetch={refetch} statusData={statusData} selected={selected} />
                                        </div>
                                    </div>
                                </div>
                            </div>




                            {/* 4. FOR OUTCOMES */}
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed flex items-center gap-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapse4" aria-expanded="false" aria-controls="collapse4">
                                        <AssignmentRoundedIcon /> <span>Outcomes of {selected.name}</span>
                                    </button>
                                </h2>
                                <div id="collapse4" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <div>
                                            <div className="max-fill">
                                                <label htmlFor="textarea-label-with-helper-text" className="block text-sm font-medium mb-2">Leave the outcome of {selected.name}</label>
                                                <textarea value={statusData[selected.id]?.outcomes} onChange={(e) => setStatusData((prev) => {
                                                    return { ...prev, [selected.id]: { ...prev[selected.id], outcomes: e.target.value } }
                                                })} id="textarea-label-with-helper-text" className="p-3 block w-full border-gray-200 border-2 outline-none rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" rows="3" placeholder="Start writing here..." aria-describedby="hs-textarea-helper-text" />
                                                <p className="mt-2 text-xs text-gray-500 dark:text-neutral-500" id="hs-textarea-helper-text">Make sure to save the write-up by clicking on the "Save Outcomes" button</p>
                                            </div>
                                            <div className="w-full  flex items-center justify-end">
                                                <ArrowButton onClickFunction={() => updateCRStatusAndOutcome({ tabId, infraId: selected.id }, statusData[selected.id].outcomes, 'outcomes', selected)} className="mt-3" showArrow={false} title="Save Outcomes" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                }

            </div>
        </div>
    )
}

export default ConstructionStatus



