import Axios from "axios"
import { toast } from "react-hot-toast"
import { api } from "../../../js/api"

// server filename : actionTakenReport
const uploadATR = (data, refetch, add = true, setLoading) => {
    const link = `${api}/feedback/upload/actionTakenReport`
    setLoading(true)
    try {
        Axios.post(link, data)
            .then((res) => {
                if (res.data.status === 'success') {
                    toast.success(add ? 'File Uploaded successfully!' : 'File Removed Successfully!')
                    refetch()
                    setLoading(false)
                } else {
                    toast.error(add ? 'Error uploading file' : 'Error removing file')
                    setLoading(false)
                }
            }).catch((err) => {
                console.log(err)
                toast.error(add ? 'Error uploading file' : 'Error removing file')
                refetch()
                setLoading(false)
            })
    } catch (error) {
        toast.error('Error uploading file')
        refetch()
        setLoading(false)
    }
}

const submitATR = (shouldSubmit, schoolName, academicYear, refetch, afterSubmit, setLoading) => {
    setLoading(true)
    const link = `${api}/feedback/submit/actionTakenReport`
    try {
        Axios.post(link, { schoolName, academicYear, shouldSubmit })
            .then((res) => {
                if (res.data.status === 'success') {
                    shouldSubmit && toast.success('Action Reports are submitted successfully.')
                    refetch()
                    afterSubmit()
                    setLoading(false)
                } else {
                    shouldSubmit && toast.error('Could not submit reports.')
                    refetch()
                    setLoading(false)
                }
            }).catch((err) => {
                console.log(err)
                shouldSubmit && toast.error('Error occured submitting reports.')
                refetch()
                setLoading(false)
            })
    } catch (error) {
        toast.error('Error occured submitting reports.')
        refetch()
        setLoading(false)
    }
}



export { uploadATR, submitATR }