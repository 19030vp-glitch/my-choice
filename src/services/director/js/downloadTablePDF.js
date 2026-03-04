import axios from "axios";
import { api } from "../../../js/api";
import toast from "react-hot-toast";

const downloadTablePDF = async (title, params, serviceName, getproof, getproof2, setLoading) => {
    const { model } = params
    setLoading((prev) => {
        return { ...prev, [model]: true }
    })
    try {
        const res = await axios.post(`${api}/download/pdf/table`, { title, params, serviceName, getproof, getproof2 })
        window.open(`${api}/downloadPdf/${res.data.fileName}`, '_blank');
        toast.success('Table report generated successfully')
    } catch (error) {
        toast.error('Could not download table PDF')
    } finally {
        setLoading((prev) => {
            return { ...prev, [model]: false }
        })
    }
}

export default downloadTablePDF