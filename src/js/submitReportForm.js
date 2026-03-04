import Axios from 'axios'
import { toast } from 'react-hot-toast'
import { api } from './api'


// Filename : submitReportForm
const submitReportForm = (navigate, year, filter, model, navigateToDirector) => {
    const link = `${api}/services/submitForm`
    Axios.post(link, { year, filter, model })
        .then((res) => {
            if (res.data.status === 'success') {
                toast.success('Form submitted successfully')
            } else {
                toast.error('Could not submit the form')
            }
        }).catch((err) => {
            console.log('Submission error :', err)
            toast.error('Error submiting form')
        })
}

// Filename : submitReportForm
const getReportInfo = (model, setData, setLoading, userType = 'faculty', service, setServiceData) => {
    setLoading(true)
    const link = `${api}/services/getTotalReportData`
    Axios.post(link, { model, userType })
        .then((res) => {
            if (res.data.status === 'success') {
                setData(res.data.data)
                setLoading(false)
                setServiceData((prev) => {
                    return { ...prev, [service]: res.data.data }
                })
            } else {
                toast.error('Could not submit the form')
                setLoading(false)
            }
        }).catch((err) => {
            console.log('Submission error :', err)
            toast.error('Error submiting form')
            setLoading(false)
        })
}

// Filename : submitReportForm
const getTotalReportInfo = (setData, setLoading, year, school) => {
    setLoading(true)
    const link = `${api}/services/getTotalReportData`
    Axios.post(link, { year, school })
        .then((res) => {
            if (res.data.status === 'success') {
                setData(res.data.data)
                setLoading(false)
            } else {
                toast.error('Could not submit the form')
                setLoading(false)
            }
        }).catch((err) => {
            console.log('Submission error :', err)
            toast.error('Error submiting form')
            setLoading(false)
        })
}


export default submitReportForm
export { getReportInfo, getTotalReportInfo }