import axios from "axios";
import { api } from "../../../js/api";
import toast from "react-hot-toast";

export function getACFCollegeData(model, filter) {
    const link = `${api}/adminTable/getData`
    return axios.post(link, { filter, model })
}

export async function submitDetails(filter, academicYear, setIsLoading) {
    const link = `${api}/api/acf/submitAcademicYear`
    setIsLoading(true)

    try {
        const res = await axios.post(link, { filter, academicYear })

        if (res && res.data.status === "success") {
            toast.success(res.data.message)
        } else {
            toast.error(res.data.message)
        }
    } catch (error) {
        toast.error('Internal Server Error')
    } finally {
        setIsLoading(false)
    }
}