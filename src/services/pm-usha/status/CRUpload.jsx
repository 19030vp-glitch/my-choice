import React, { useState } from 'react'
import toast from 'react-hot-toast';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import ArrowButton from '../../../components/ArrowButton';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { deleteCRPhoto, updateCRPhotos } from '../js/crStatusHandler';
import serverLinks from '../../../js/serverLinks';


const ConstructionRenovationUpload = ({ tabId, selected, type, statusData, serverDataPhotos, refetch }) => {

    const [loading, setLoading] = useState(false)

    const filter = {
        tabId,
        infraId: selected.id
    }

    const [selectedFiles, setSelectedFiles] = useState("")

    const handleFileChange = (event) => {
        const files = event.target.files;
        if (files.length > 5) {
            toast.error("You can only select up to 5 images.");
            event.target.value = '';
            setSelectedFiles("")
        } else {
            setSelectedFiles(Array.from(files));
        }
    };

    const removeSelectedFile = (index) => {

        const oldFiles = [...selectedFiles];
        const updatedFiles = oldFiles.filter((_, i) => i !== index)

        if (updatedFiles.length > 0) {
            setSelectedFiles(() => updatedFiles)
        } else {
            setSelectedFiles(() => "")
        }
    }

    const uploadPhotos = () => {

        // create form data of selected files 
        const formData = new FormData();
        selectedFiles.forEach((file, index) => {
            formData.append(`file-${index + 1}`, file);
        })

        formData.append('filter', JSON.stringify(filter))
        formData.append('title', selected.name)
        formData.append('photoField', type)
        formData.append('status', statusData[selected.id].status)
        formData.append('statusInPercentage', statusData[selected.id].statusInPercentage)


        updateCRPhotos(formData, refetch, setSelectedFiles, setLoading)
    }

    const deletePhotoHandler = async (filename) => {
        await deleteCRPhoto(filename, filter, type, refetch)
    }

    return (
        <div>

            {/* FOR FILE SELECTION */}
            <div className="flex items-center justify-center w-full">
                <label htmlFor={`file-${type}`} className={`flex flex-col items-center justify-center w-full ${!selectedFiles ? "h-32" : "h-16"} border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white mt-3`}>
                    <div className={`flex ${!selectedFiles ? "flex-col" : "flex-row gap-2 sm:gap-4"} items-center justify-center pt-2 w-full`}>
                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <div className='text-center '>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Click to upload (Select upto 5 {`${type.slice(0, -6)} `} {selected.workType} photos) </p>
                            <p className="text-[10px] mt-1 text-gray-500 dark:text-gray-400 sm:mb-0 mb-2">PNG, JPG or JPEG </p>
                        </div>
                    </div>

                    {/* only 5 photos at a time */}
                    <input maxLength={5} multiple accept='image/png, image/jpeg, image/jpg' onChange={handleFileChange} id={`file-${type}`} name={`file-${type}`} type="file" className="hidden" />
                </label>
            </div>

            {/* FOR FILE PREVIEW */}
            {selectedFiles && selectedFiles?.length > 0 && <div className="flex flex-col items-center justify-center w-full border-2 p-3 rounded-lg mt-3">
                <p className='text-gray-500 mb-2'>Selected photos</p>
                <div className="flex flex-col items-center justify-center gap-2 w-full">
                    <div className="sm:flex gap-3 justify-center items-center flex-wrap space-y-2 sm:space-y-0">
                        {selectedFiles?.map((item, index) => (
                            <div key={index} className="relative">
                                <img
                                    className="w-full h-28 object-cover rounded-lg border py-3 pl-3 pr-5"
                                    src={URL.createObjectURL(item)}
                                    alt="preview"
                                />
                                <span className="absolute top-1 right-1 cursor-pointer text-gray-400 hover:text-gray-500" onClick={() => removeSelectedFile(index)}><ClearRoundedIcon /></span>
                            </div>
                        ))}
                    </div>
                    {
                        selectedFiles?.length > 0 && <ArrowButton onClickFunction={uploadPhotos} className="mt-3" title={!loading ? `Upload Photo${selectedFiles?.length > 1 ? 's' : ''}` : "Uploading..."} disabled={loading} showArrow={!loading} />
                    }
                </div>
            </div>}

            {/* SHOW ALREADY UPLOADED FILES */}
            {serverDataPhotos?.length > 0 && <div className="flex flex-col items-center justify-center w-full border-2 p-3 rounded-lg mt-3">
                <p className='text-gray-500 mb-2'>{serverDataPhotos?.length > 0 ? "Uploaded photos" : "Photos not yet uploaded"}</p>
                <div className="flex flex-col items-center justify-start gap-2 w-full">
                    <div className="sm:flex gap-3 justify-center items-center flex-wrap space-y-2 sm:space-y-0">
                        {serverDataPhotos?.map((item, index) => (
                            <div key={index} className="relative">
                                <img
                                    className="w-full h-28 object-cover rounded-lg border py-3 pl-3 pr-5"
                                    src={serverLinks.showFile(item, 'usha')}
                                    alt="preview"
                                />
                                <span className="absolute top-1 right-1 cursor-pointer text-gray-400 hover:text-gray-500" onClick={() => deletePhotoHandler(item)}><DeleteRoundedIcon /></span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>}

        </div>
    )
}

export default ConstructionRenovationUpload
