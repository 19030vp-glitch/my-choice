import Axios from 'axios'
import toast from 'react-hot-toast'
import { api } from '../../../js/api'

async function handleEditWithFile(data, model, setModal, refresh, setLoading, setFormOpen, isCAS = false) {

    const url = `${api}/api/edit/${model}`

    try {
        const res = await Axios.post(url, data)
        if (res.data.status === 'deleted') {
            toast.success('Item edited successfully')
            setLoading(false)
            setModal(false)
            if (!isCAS) {
                setFormOpen(false)
            }
            refresh()
        }
        else {
            setLoading(false)
            if (!isCAS) {
                setFormOpen(false)
            }
            setModal(false)
            refresh()
        }
    }
    catch (error) {
        if (!isCAS) {
            setFormOpen(false)
        }
        setLoading(false)
        setModal(false)
        toast.error('Server error')
        refresh()
    } finally {
        refresh()
    }
}


export default handleEditWithFile