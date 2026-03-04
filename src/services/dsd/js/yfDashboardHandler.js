import Axios from "axios"
import { api } from "../../../js/api"

function getYFDashboardData(dataFilter) {
    const link = `${api}/dsd/youthfestival/dashboard`
    return Axios.post(link, { dataFilter })
}

export default getYFDashboardData