import axios from 'axios'
import { toast } from 'react-hot-toast'
import { api } from '../../../js/api'


// fileName : generateFeedbackReport
const downloadAnalysisPDF = async ({ schoolName, feedbackUser, academicYear, setIsLoading }) => {
    const link = `${api}/feedback/generateReport`

    try {
        const res = await axios.post(link, { schoolName, feedbackUser, academicYear })
        if (res.data.status == 'success') {
            toast.success(`${feedbackUser} Report Generated Successfully`)
            setIsLoading(false)
            window.open(`${api}/downloadPdf/${res.data.fileName}`, '_blank');
        } else if (res.data.status == 'error') {
            toast.error(res.data.message)
            setIsLoading(false)
        }
    } catch (error) {
        toast.error('Error generating report', error)
        setIsLoading(false)
    }


}



export { downloadAnalysisPDF }