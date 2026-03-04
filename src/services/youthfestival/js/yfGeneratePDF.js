import Axios from 'axios'
import toast from 'react-hot-toast'
import { api } from '../../../js/api'


function getYFApplicationData(collegeId, academicYear) {
    const link = `${api}/youthfestival/allData`
    return Axios.post(link, { collegeId, academicYear })
}

async function yfGeneratePDF(selectedYear, youthUser, setReportLoading) {
    setReportLoading({ title: 'Generating Application Form', isLoading: true })
    const link = `${api}/youthfestival/generate-application-form`
    Axios.post(link, { academicYear: selectedYear, user: youthUser }).then(function (res) {
        if (res.data.status === 'generated') {
            setReportLoading(false)
            toast.success('Application generated successfully');
            window.open(`${api}/downloadPdf/${res.data.fileName}`, '_blank');
        }
        else if (res.data.status === 'error') {
            setReportLoading(false)
            toast.error(res.data.message);
        }
    })
        .catch(function (err) {
            setReportLoading(false)
            toast.error('Something went wrong');
        })
}

function getYears(filter) {
    const link = `${api}/api/get/dashboardData`
    return Axios.post(link, { model: "YFCollegeSubmit", filter })
}

export default yfGeneratePDF

export { getYears, getYFApplicationData }