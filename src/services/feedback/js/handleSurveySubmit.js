import Axios from 'axios'
import { toast } from 'react-hot-toast'
import { api } from '../../../js/api'


const handleSurveySubmit = (setLoading, formData, schoolName, academicYear, setActiveStep) => {
    setLoading(true)
    const link = `${api}/survey/student-satisfaction-survey`
    Axios.post(link, { response: formData, schoolName, academicYear })
        .then((res) => {
            if (res.data.status === 'success') {
                toast.success('Survey Submitted Successfully')
                setLoading(false)
                localStorage.removeItem(`StudentSatisfactionSurvey-FormData-${academicYear}-${schoolName}`)
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

export default handleSurveySubmit