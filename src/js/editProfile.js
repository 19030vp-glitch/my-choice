import { toast } from "react-hot-toast";
import Axios from "axios"
import { api } from "./api";

function editProfile(dispatch, setState, data, filter, modelName) {


    // check the backend in faculty-routes/services
    Axios.post(`${api}/api/edit-profile/${modelName}/${JSON.stringify(filter)}`, data).then(function (response) {
        if (response.data.status === 'edited') {
            dispatch(setState(response.data.data))
            toast.success('Profile Updated Successfully')
        }
        else {
            toast.error('Could not edit profile, try again...');
            return
        }
    }).catch(function (err) {
        toast.error('Something went wrong');
        return
    })
}

export default editProfile