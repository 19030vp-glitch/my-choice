import { api } from "../../../js/api"
import axios from 'axios'

export const getACFDataForStatus = () => {
    const link = `${api}/api/acf/getACFDataForStatus`
    return axios.post(link)
}