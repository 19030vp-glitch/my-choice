import toast from "react-hot-toast"
import Axios from 'axios'
import { api } from "../../../js/api"

function editYFProfile(data, user, setData, setOpen, modelName = "YFCollege", filter) {
    const link = `${api}/youthfestival/editProfile`
    Axios.post(link, { data, user, modelName, filter }).then((res) => {
        if (res.data.status === 'success') {
            setData(res.data.data)
            toast.success('Successfully Updated college details')
            setOpen(false);
        } else {
            toast.error('Failed updating...')
            setOpen(false);
        }
    }).catch((err) => {
        setOpen(false);
        console.log('Something went wrong')
    })
}

export default editYFProfile