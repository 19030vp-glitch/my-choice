import Axios from 'axios'
import toast from 'react-hot-toast'
import { api } from '../../../js/api'

function saveGeneralInfo(info, academicYear, user) {
    console.log(info, academicYear)
    const link = `${api}/youth/saveInfo`
    Axios.post(link, { info, academicYear, user }).then((res) => {
        if (res.data.status === 'success') {
            toast.success('Data saved successfully')
        } else {
            toast.error('Error saving data')
        }
    }).catch((err) => {
        toast.error('Error saving data')
        console.log(err)
    })

}

function fetchInfo(filter) {
    const link = `${api}/youth/fetchInfo`
    return Axios.post(link, { filter })
}


export { saveGeneralInfo, fetchInfo }