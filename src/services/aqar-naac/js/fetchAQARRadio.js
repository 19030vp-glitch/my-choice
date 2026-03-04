import axios from 'axios';
import toast from 'react-hot-toast';
import { api } from '../../../js/api';

// route available in naac-aqar.js
function fetchAQARRadioInfo(filter, isMultiple) {
    const link = `${api}/aqar/fetchAQARRadioInfo`
    return axios.post(link, { filter, isMultiple })
}

const saveAQARRadioInfo = (formData, refetch) => {
    const link = `${api}/aqar/saveAQARRadioInfo`
    axios.post(link, { formData }).then((res) => {
        if (res.data.status === 'success') {
            toast.success('Data saved successfully.')
            refetch()
        } else {
            toast.error('Failed saving data...')
            refetch()
        }
    }).catch((err) => {
        console.log('Error saving in data', err)
    })
}


export { saveAQARRadioInfo, fetchAQARRadioInfo }