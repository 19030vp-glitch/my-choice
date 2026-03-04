import Axios from 'axios'
import { toast } from 'react-hot-toast'
import { api } from '../../../js/api'


const handleRegistration = (setLoading, formData, programId, program, navigate) => {
    setLoading(true)
    const link = `${api}/program/registration`
    Axios.post(link, { formData, programId })
        .then((res) => {
            if (res.data.status === 'success') {
                toast.success('Registered Successfully')
                setLoading(false)
                localStorage.removeItem(`${programId}-ProgramRegistration-FormData`)
                navigate(`/program/${programId}/registration-form/acknowledgement`, { state: program })
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

const handleFeedback = (setLoading, formData, programId, program, navigate) => {
    setLoading(true)
    const link = `${api}/program/feedback`
    Axios.post(link, { formData, programId })
        .then((res) => {
            if (res.data.status === 'success') {
                toast.success('Registered Successfully')
                setLoading(false)
                // localStorage.removeItem(`${programId}-ProgramFeedback-FormData`)
                navigate(`/program/${programId}/feedback-form/acknowledgement`, { state: program })
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


const toggleResponseAcceptance = (programId, refetch) => {
    const link = `${api}/program/registration/toggleResponseAcceptance`
    Axios.post(link, { programId })
        .then((res) => {
            if (res.data.status === 'success') {
                toast.success(res.data.message)
                refetch()
            } else {
                toast.error(res.data.message)
                refetch()
            }
        }).catch((err) => {
            console.log(err.message)
            refetch()
            toast.error('Could not toggle. Try again later...')
        })
}

export default handleRegistration

export { toggleResponseAcceptance, handleFeedback }