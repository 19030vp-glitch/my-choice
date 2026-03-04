import Axios from 'axios'
import { toast } from 'react-hot-toast'
import { api } from './api'

async function deleteItem(itemToDelete, callback, setLoading) {
    setLoading(true)

    const url = `${api}/api/deleteFile`
    Axios.post(url, { fileName: itemToDelete.fileName, path: itemToDelete.path })
        .then((res) => {
            if (res.data.status === 'deleted') {
                callback()
                toast.success('File deleted successfully')
                setLoading(false)
            } else {
                setLoading(false)
                console.log('Could delete the item, because file not found')
            }
        })


}

export { deleteItem }