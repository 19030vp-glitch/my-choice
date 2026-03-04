import Axios from 'axios'
import { api } from '../../../js/api'

function fetchRegistrations({ filter }) {
    const link = `${api}/programs/getRegistrations`
    return Axios.post(link, { filter })
}

export { fetchRegistrations }