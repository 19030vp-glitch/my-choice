import Axios from 'axios'
import toast from 'react-hot-toast'
import { api } from '../../../js/api'

// route available in krc-routes.js
const uploadSupportingDocument = (formData, refetch) => {
    console.log(...formData)
    const link = `${api}/aqar/uploadSupportingProof`
    Axios.post(link, formData).then((res) => {
        if (res.data.status === 'success') {
            toast.success('Data saved successfully.')
            refetch()
        } else {
            toast.error('Failed uploading file...')
            refetch()
        }
    }).catch((err) => {
        console.log('Error in supporting document upload', err)
        refetch()
    })
}


const fetchSupportingDocuments = (filter, isMultiple) => {
    const link = `${api}/aqar/fetchSupportingProof`
    return Axios.post(link, { filter, isMultiple })
}

export default uploadSupportingDocument
export { fetchSupportingDocuments }