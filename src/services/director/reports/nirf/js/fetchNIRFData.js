import axios from 'axios'
import { api } from '../../../../../js/api'

function studentIntakeFetch(academicYear) {
    const link = `${api}/nirf/admin/student-intake/${academicYear}`
    return axios.post(link)
}

function studentStrengthFetch(academicYear) {
    const link = `${api}/nirf/admin/student-strength/${academicYear}`
    return axios.post(link)
}



export { studentIntakeFetch, studentStrengthFetch }