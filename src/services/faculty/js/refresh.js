// this function will access the database and get the information from the model received from the arguments

import axios from 'axios';
import { api } from '../../../js/api';


const getData = async ({ model, userId, year }) => {
    return await axios.post(`${api}/api/getData`, { model, userId, year })
}

const refresh = ({ model, userId, year, dataFilter = null }) => {
    return axios.post(`${api}/api/getData`, { model, userId, year, dataFilter })
}

const getModelData = ({ model, filter }) => {
    return axios.post(`${api}/getModelData`, { model, filter })
}

export default refresh
export { getData, getModelData }