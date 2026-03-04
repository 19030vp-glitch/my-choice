import React from 'react'
import { landDetailsList } from '../js/constants'
import CRLandUpload from './CRLandUpload'

const CRLandDetailsUpload = ({ tabId, statusData, selected, serverLandPhotos, refetch }) => {

    const filter = {
        tabId,
        infraId: selected.id
    }

    return (
        <div className='grid grid-cols-2 gap-x-3 gap-y-14'>
            {
                landDetailsList(tabId).map((landItem, index) => {
                    return <CRLandUpload serverLandPhotos={serverLandPhotos} tabId={tabId} refetch={refetch} statusData={statusData} selected={selected} filter={filter} key={`cr-land-upload-${index}`} landItem={landItem} />
                })
            }
        </div>
    )
}

export default CRLandDetailsUpload
