import Axios from 'axios'
import toast from 'react-hot-toast'

const upsertRecord = async (data, refetch, uploadRowCount, model) => {


    try {
        const link = `${api}/api/upsertRecord/${model}`
        const res = await Axios.post(link, data)
        if (res.data.status === 'success') {
            toast.success(res.data.message)
            if (uploadRowCount < 2) {
                refetch()
            }
            return 200
        } else {
            toast.error('Record insertion failed')
            if (uploadRowCount < 2) {
                refetch()
            }
            return 500
        }
    } catch (error) {
        toast.error('Something went wrong')
        if (uploadRowCount < 2) {
            refetch()
        }
        return 500
    }
}

const deleteRecord = async (item, model, refreshFunction, setIsLoading = () => { }) => {
    try {
        const res = await Axios.post(`${api}/service/deleteItem`, { itemToDelete: item, model })


        if (res.data.status === 'deleted') {
            toast.success('Item deleted successfully')
            setIsLoading(false)
        }
        else if (res.data.status === 'error') {
            toast.error('Could not delete item')
            if (refreshFunction) {
                refreshFunction()
            }
            setIsLoading(false)
        }

    } catch (error) {
        setIsLoading(false)
        toast.error('Internal Server error')
    }
}

export { upsertRecord, deleteRecord }