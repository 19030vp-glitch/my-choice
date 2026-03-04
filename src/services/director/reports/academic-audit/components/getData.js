// this function will access the database and get the information from the model received from the arguments

import Axios from 'axios';
import toast from 'react-hot-toast';


const getData = async (model, school, setState) => {
    const res = await Axios.post(`${api}/api/director/academic-audit/getData/facultyData`,
        { model, school })
    if (res) {
        if (res.data.status === 'success') {
            setState(res.data.data)
        }
        else if (res.data.status === 'error') {
            setState(null)
        }
        else {
            toast.error('Unable to fetch data from server')
        }
    } else {
        toast.error('Unable to fetch data from server')
    }

}

const getDirectorData = async (model, school, setState) => {
    const res = await Axios.post(`${api}/api/director/academic-audit/getData/directorData`,
        { model, school })
    if (res) {
        if (res.data.status === 'success') {
            setState(res.data.data)
        }
        else if (res.data.status === 'error') {
            setState(null)
        }
        else {
            toast.error('Unable to fetch data from server')
        }
    } else {
        toast.error('Unable to fetch data from server')
    }

}

export default getData
export { getDirectorData }
