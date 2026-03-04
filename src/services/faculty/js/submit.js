import Axios from 'axios';
import toast from 'react-hot-toast';
import { api } from '../../../js/api';


const submit = async (data, url, setState, setLoading, setModal, setIsFormOpen) => {
    // req to server
    try {
        const res = await Axios.post(`${api}/api/add/${url}`, { data })
        // handleling respose
        if (res.data.status === 'added') {
            setState(res.data.data);
            toast.success('Data added successfully');
            setLoading(false)
            setModal(false)
            setIsFormOpen && setIsFormOpen(false)
        }
        else if (res.data.status === 'error') {
            toast.error('Failed to add data');
            setLoading(false)
            setModal(false)
            setIsFormOpen && setIsFormOpen(false)
        }
    } catch (error) {
        toast.error('Failed to add data')
    }
}

const submitWithFile = async (data, url, setState, setLoading, setModal, setIsFormOpen, clearStates) => {

    try {
        // req to server
        const res = await Axios.post(`${api}/api/add/${url}`, data);

        // handleling respose
        if (res.data.status === 'added') {
            setState();
            toast.success('Data added successfully');
            setLoading(false)
            clearStates()
            setModal(false)
            setIsFormOpen(false)
        }
        else if (res.data.status === 'error') {
            toast.error('Failed to add data');
            setLoading(false)
            setModal(false)
            setIsFormOpen(false)
            clearStates()
        }
    } catch (error) {
        toast.error('Failed to add data')
    } finally {
        setState()
        setLoading(false)
    }
}


export { submitWithFile }

export default submit
