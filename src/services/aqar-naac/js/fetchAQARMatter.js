import axios from "axios";
import toast from "react-hot-toast";
import { api } from "../../../js/api";

// route available in naac-aqar.js
const saveAQARMatter = (formData, refetch) => {
    const link = `${api}/aqar/saveAQARMatter`
    axios.post(link, { formData }).then((res) => {
        if (res.data.status === 'success') {
            toast.success('Data saved successfully.')
            refetch()
        } else {
            toast.error('Failed saving matter...')
            refetch()
        }
    }).catch((err) => {
        console.log('Error saving in matter', err)
    })
}

function fetchAQARMatter(filter, isMultiple) {
    const link = `${api}/aqar/fetchAQARMatter`
    return axios.post(link, { filter, isMultiple })
}

export default fetchAQARMatter
export { saveAQARMatter }