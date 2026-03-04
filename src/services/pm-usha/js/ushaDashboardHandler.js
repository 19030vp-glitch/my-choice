import { api } from "../../../js/api"
import axios from "axios"

export const getDashboardData = () => {
    const link = `${api}/api/pm-usha/dashboard`
    return axios.post(link)
}