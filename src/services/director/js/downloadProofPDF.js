import axios from "axios"
import toast from "react-hot-toast"
import { api } from "../../../js/api"


const getProofPDF = async (model, filter, getproof, serviceName, setLoading) => {
    setLoading((prev) => {
        return { ...prev, [model]: true }
    })
    const link = `${api}/service/downloadProofs`
    try {
        const res = await axios.post(link, { filter, model, getproof, serviceName })

        if (res.data.status === 'success') {
            window.open(`${api}/downloadPdf/${res.data.fileName}`, '_blank');
            toast.success('Proofs collected Successfully')
        } else {
            toast.error(res.data.message)
        }

    } catch (error) {
        toast.error('Could not collect proofs, something went wrong')
    } finally {
        setLoading((prev) => {
            return { ...prev, [model]: false }
        })
    }
}

export default getProofPDF