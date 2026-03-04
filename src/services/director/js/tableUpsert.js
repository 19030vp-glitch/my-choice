import toast from "react-hot-toast";
import { api } from "../../../js/api"
import axios from 'axios'

export const tableUpsert = async (data, filter, model) => {
    const link = `${api}/api/add/upsertWithFilter`

    const res = await axios.post(link, { data, filter, model });

    if (res.data.status === "added") {
        toast.success("Data added successfully");
    } else {
        toast.error("Error while updating data...");
    }
}