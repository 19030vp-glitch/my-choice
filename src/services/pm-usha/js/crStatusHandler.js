import axios from "axios"
import { api } from "../../../js/api"
import toast from "react-hot-toast"

export const getCRStatus = (filter) => {
    const link = `${api}/api/pm-usha/getCRStatus`
    return axios.post(link, { filter })
}

// route in /pm-routes/
export const updateCRStatusAndOutcome = async (filter, data, fieldToUpdate, selectedInfra, refetch) => {
    const link = `${api}/api/pm-usha/updateCRStatusAndOutcome`
    try {
        const res = await axios.post(link, { filter, data, fieldToUpdate, selectedInfra })
        const capitalizedWord = fieldToUpdate === 'outcome' ? "Outcome" : "Status"
        if (res.data.status === 'success') {
            if (fieldToUpdate === "status") {
                refetch()
            }
            toast.success(`${capitalizedWord} saved successfully`)
        } else {
            toast.error(`There was an error saving ${fieldToUpdate}`)
        }
    } catch (error) {
        toast.error('Internal Server Error')
        console.log('Update CR Status Error', error)
    }
}


export const updateCRPhotos = async (formData, refetch, setFiles, setLoading) => {
    setLoading(true)
    const link = `${api}/api/pm-usha/uploadCRPhotos`
    try {
        const res = await axios.post(link, formData)
        if (res.data.status === 'success') {
            refetch()
            toast.success(res.data.message)
        } else {
            toast.error(res.data.message)
        }
    } catch (error) {
        toast.error('Internal Server Error')
        console.log('Update CR photo Error', error)
    } finally {
        refetch()
        setLoading(false)
        setFiles(null)
    }
}

export const updateCRLandPhotos = async (formData, refetch, setLoading) => {
    setLoading(true)
    const link = `${api}/api/pm-usha/uploadCRLandPhotos`
    try {
        const res = await axios.post(link, formData)
        if (res.data.status === 'success') {
            refetch()
            toast.success(res.data.message)
        } else {
            toast.error(res.data.message)
        }
    } catch (error) {
        toast.error('Internal Server Error')
        console.log('Update CR land photo Error', error)
    } finally {
        refetch()
        setLoading(false)
    }
}


export const deleteCRPhoto = async (filename, filter, photoField, refetch) => {
    const link = `${api}/api/pm-usha/deleteCRPhoto`
    try {
        const res = await axios.post(link, { filename, filter, photoField })
        if (res.data.status === 'success') {
            toast.success(res.data.message)
            refetch()

        } else {
            toast.error(res.data.message)
        }
    } catch (error) {
        toast.error('Internal Server Error')
        console.log('Delete CR Photo Status Error', error)
    } finally {
        refetch()
    }
}

export const deleteCRLandPhoto = async (filename, filter, photoField, refetch) => {
    const link = `${api}/api/pm-usha/deleteCRLandPhoto`
    try {
        const res = await axios.post(link, { filename, filter, photoField })
        if (res.data.status === 'success') {
            toast.success(res.data.message)
            refetch()

        } else {
            toast.error(res.data.message)
        }
    } catch (error) {
        toast.error('Internal Server Error')
        console.log('Delete CR Photo Status Error', error)
    } finally {
        refetch()
    }
}