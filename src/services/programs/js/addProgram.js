import Axios from 'axios'
import { toast } from 'react-hot-toast'
import { api } from '../../../js/api'

async function addProgram(formData, clearFuntion) {
    try {
        const link = `${api}/program/add`
        let res = await Axios.post(link, formData)
        if (res.data.status === "success") {
            toast.success('Program added successfully')
            clearFuntion()
        } else {
            toast.error('Could not add program')
        }
    } catch (error) {
        toast.error('Failed adding program', error)
    }
}

export { addProgram }