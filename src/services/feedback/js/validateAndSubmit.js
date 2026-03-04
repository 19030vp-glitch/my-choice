import { toast } from "react-hot-toast"
import Axios from "axios"
import { api } from "../../../js/api"


const validateForm = (questions, setLoading, responseType, formData, setFormData, data, navigate, setActiveStep, customSubmitFunction = false) => {

    let isValid = true

    let myQuestions = [...questions]

    myQuestions.reverse().forEach((question) => {
        if (question.required) {
            if (formData[question.question]) {
                if (question.type === 'check') {
                    if (formData[question.question].length === 0) {
                        const element = document.getElementById(question.question);
                        isValid = false
                        if (element) {
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });

                        }
                    }
                }
            } else {
                isValid = false
                const element = document.getElementById(question.question);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        }
    })


    if (isValid) {
        console.log('Form is ready to submit')
        if (customSubmitFunction) {
            customSubmitFunction()
        } else {
            submitResponse(setLoading, responseType, formData, setFormData, data, navigate, setActiveStep)
        }
    }

}

const submitResponse = (setLoading, responseType, formData, setFormData, data, navigate, setActiveStep) => {
    setLoading(true)
    const link = `${api}/feedback/${responseType}/collectResponse`
    console.log({ response: formData, academicYear: data.academicYear, schoolName: data.schoolName })
    Axios.post(link, { response: formData, academicYear: data.academicYear, schoolName: data.schoolName })
        .then((res) => {
            if (res.data.status === 'success') {
                toast.success('Your response was successfully submitted.')
                setLoading(false)
                handleReset(false, setFormData, data, responseType)
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

const handleReset = (reload = true, setFormData, data, responseType) => {
    setFormData({})
    localStorage.setItem(`${responseType}-FormData-${data.academicYear}-${data.schoolName}`, JSON.stringify({}))
    reload && window.location.reload()
    window.scrollTo(0, 0)
}


export default validateForm
export { submitResponse, handleReset }
