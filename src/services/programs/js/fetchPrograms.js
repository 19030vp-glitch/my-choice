import Axios from 'axios'
import { api } from '../../../js/api'

function fetchPrograms({ filter, select, singleItem, shouldPopulate = false }) {
    const link = `${api}/programs/fetch`
    return Axios.post(link, { filter, select, singleItem, shouldPopulate })
}

export { fetchPrograms }