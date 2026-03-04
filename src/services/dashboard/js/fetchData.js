import axios from 'axios'
import { api } from '../../../js/api'

// you will find all these routes in /Server/utility/dashboard

const fetchData = ({ model, filter }) => {
    const url = `${api}/api/get/dashboardData`
    return axios.post(url, { model, filter })
}

const fetchAlumniData = ({ school }) => {
    const url = `${api}/api/get/alumniData`
    return axios.post(url, { school })
}

// /dashboard.jsx
const departmentWiseFetching = ({ school, model, userType }) => {
    const url = `${api}/api/get/modelData/departmentWise`
    return axios.post(url, { school, model, userType })
}

const fetchSchoolData = ({ school }) => {
    const url = `${api}/api/get/allSchoolData`
    return axios.post(url, { school })
}

const fetchSchoolDataCached = ({ school }) => {
    const url = `${api}/api/cached/dashboardData`
    return axios.post(url, { school })
}

const countData = ({ model, select, type }) => {
    const url = `${api}/api/get/dashboardCount`
    return axios.post(url, { model, select, type })
}

export default fetchData
export { fetchSchoolData, fetchAlumniData, countData, departmentWiseFetching, fetchSchoolDataCached }