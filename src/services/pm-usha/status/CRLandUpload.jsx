import React, { useState } from 'react'
import { deleteCRLandPhoto, updateCRLandPhotos } from '../js/crStatusHandler'
import FileViewer from '../../../components/FileViewer'
import { DeleteRounded } from '@mui/icons-material'
import { IconButton } from '@mui/material'

const CRLandUpload = ({ landItem, filter, statusData, selected, serverLandPhotos, refetch }) => {

    const [loading, setLoading] = useState(false)

    const handleFileChange = (e) => {
        // upload file to server
        const formData = new FormData();
        formData.append(`file`, e.target.files[0]);
        formData.append('filter', JSON.stringify(filter))
        formData.append('title', selected.name)
        formData.append('photoField', landItem.id)
        formData.append('status', statusData[selected.id].status)
        formData.append('statusInPercentage', statusData[selected.id]?.statusInPercentage)
        updateCRLandPhotos(formData, refetch, setLoading)
    }

    const handleCRLandPhotosDelete = () => {
        deleteCRLandPhoto(serverLandPhotos?.[landItem.id], filter, landItem.id, refetch)
    }


    return (
        <div className='bg-gray-50 border p-3 rounded-md'>
            <form class="max-w-sm">
                <label for="file-input" class="block mb-2 text-sm font-medium text-gray-900">Upload {landItem.title}</label>
                <label for="file-input" class="sr-only">Choose file</label>
                <input onChange={handleFileChange} type="file" name="file-input" id="file-input" class="block cursor-pointer w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none file:bg-gray-200 file:border-0 file:me-4 file:py-3 file:px-4" />

                {serverLandPhotos?.[landItem.id] &&
                    <div className="mt-2">
                        {loading ? <span>Uploading...</span>
                            : <div className='flex items-center justify-between'>
                                <FileViewer serviceName="usha" fileName={serverLandPhotos?.[landItem.id]} />
                                <IconButton onClick={handleCRLandPhotosDelete}>
                                    <DeleteRounded />
                                </IconButton>
                            </div>
                        }
                    </div>}
            </form>
        </div>
    )
}

export default CRLandUpload
