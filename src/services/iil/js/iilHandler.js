import Axios from 'axios'
import toast from 'react-hot-toast'

function addIILData({ model, filter, dataToAppend, refetch }) {

    const link = `${api}/iil/addData`
    Axios.post(link, { model, filter, dataToAppend }).then((res) => {
        if (res.data.status === 'success') {
            toast.success('Data saved successfully.')
            refetch()
        } else {
            toast.error('Failed submitting data')
            refetch()
        }
    }).catch((err) => {
        console.log('Data could not be saved', err)
        refetch()
    })
}

const getIILData = ({ model, filter }) => {
    const link = `${api}/iil/getData`
    return Axios.post(link, { model, filter })
}


export { addIILData, getIILData }
