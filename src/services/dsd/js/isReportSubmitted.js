import toast from "react-hot-toast"
import Axios from 'axios'
import { api } from "../../../js/api"

// route filename : dsd-routes.js
const isReportSubmitted = (year, model, handleNext, customMessage, filter = null, dataToAdd = null) => {
    const link = `${api}/other/services/isReportSubmitted`
    Axios.post(link, { year, model, filter, dataToAdd })
        .then((res) => {
            if (res.data.status === 'success') {
                toast.success(customMessage ? customMessage : res.data.message)
                handleNext();
            } else {
                toast.error('Could not submit the form')
            }
        }).catch((err) => {
            console.log('Submission error :', err)
            toast.error('Error submiting form')
        })
}

export default isReportSubmitted