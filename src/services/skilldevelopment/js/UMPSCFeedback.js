import Axios from 'axios'
import { toast } from 'react-hot-toast'
import { api } from '../../../js/api'


const handleUMPSCFeedback = (setLoading, formData, academicYear, setActiveStep, localStorageTitle) => {
    setLoading(true)
    const link = `${api}/feedback/umpsc-feedback`
    Axios.post(link, { response: formData, academicYear })
        .then((res) => {
            if (res.data.status === 'success') {
                toast.success('Feedback Submitted Successfully')
                setLoading(false)
                localStorage.removeItem(localStorageTitle)
                setActiveStep(2)
            } else {
                toast.error(res.data.error)
                setLoading(false)
            }
        }).catch((err) => {
            console.log(err)
            toast.error('Could not submit the form. Try again later...')
            setLoading(false)
        })
}

export default handleUMPSCFeedback