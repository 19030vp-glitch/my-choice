import axios from 'axios'
import { api } from '../../../js/api'

const fetchAllNews = ({ filter }) => {
    console.log("filter in news:", filter)
    return axios.post(`${api}/api/news/getAllNews`, { filter })
}

const fetchSingleItem = ({ newsId }) => {
    return axios.post(`${api}/api/news/singleNews`, { newsId })
}

const fetchIndexNews = () => {
    return axios.get(`${api}/api/news/indexNews`)
}

const searchNews = ({ search }) => {
    console.log('search', search)
    return axios.get(`${api}/api/news/search/${search}`)
}

export default fetchAllNews
export { fetchSingleItem, fetchIndexNews, searchNews }