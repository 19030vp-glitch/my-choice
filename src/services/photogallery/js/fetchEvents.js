import axios from 'axios'
import { api } from '../../../js/api'

const fetchEvents = ({ filter }) => {
    return axios.post(`${api}/api/event/getEvents`, { filter })
}

const fetchSingleEvent = ({ filter }) => {
    return axios.post(`${api}/api/event/singleEvent`, { filter })
}

export default fetchEvents
export { fetchSingleEvent }