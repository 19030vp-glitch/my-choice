import Axios from "axios"
import { toast } from 'react-hot-toast'
import { api } from "../../../../js/api"


const generatePBASReport = (userData, selectedYear, setReportLoading, forPrintOut) => {
    try {

        Axios.post(`${api}/generatePBASReport`, { userData, selectedYear, forPrintOut })
            .then(function (res) {
                if (res.data.status === 'generated') {
                    setReportLoading(false)
                    toast.success('Report generated successfully');
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

    } catch (error) {
        alert('Internal Server error');
        setReportLoading(false)

    }


}


const saveCASDetails = (casData, userId, setSaveLoader) => {
    try {

        Axios.post(`${api}/savePBASDetails`, { casData, userId })
            .then((res) => {
                if (res.data) {
                    toast.success('PBAS details saved successfully');
                    // window.location = '/home'
                    // navigate('/home')
                    setSaveLoader(false)
                }
                else {
                    toast.error('PBAS details saving failed');
                    setSaveLoader(false)
                }
            }).catch((err) => {
                toast.error('PBAS details saving failed due to server error');
                setSaveLoader(false)
            })

    } catch (error) {
        alert('Internal Server error');
        setSaveLoader(false)
    }
}

const getCASData = (userId, setData, setError, sortByYear = false, casYear = null, setShouldProceed) => {

    console.log('Getting PBAS data')

    if (setShouldProceed) {
        setShouldProceed(false)
    }
    try {
        Axios.post(`${api}/getPBASData`, { userId })
            .then((res) => {
                if (res.data.status === 'success') {
                    if (sortByYear) {
                        res.data.data.casData.forEach((cas) => {
                            if (JSON.parse(cas).casYear === casYear) {
                                setData(() => JSON.parse(cas));
                                if (setShouldProceed) {
                                    setShouldProceed(true)
                                }
                                return
                            }
                        })
                    }
                    else {
                        setData(() => res.data.data);
                    }
                }
                else {
                    setData(null)
                    setError({ error: true, message: 'PBAS Data Not Found. Please fill PBAS Form to generate report!' })
                }

                // letting proceed after data fetching
                if (setShouldProceed) {
                    setShouldProceed(true)
                }

            }).catch((err) => {
                toast.error('Failed fetching data')
            })
    } catch (error) {
        toast.error('Internal Server error');
    }


}

const getTotalPBASData = (setData, setError) => {
    try {
        Axios.post(`${api}/getTotalPBASData`,)
            .then((res) => {
                if (res.data.status === 'success') {
                    setData(res.data.data);
                }
                else {
                    setData(null)
                    setError({ error: true, message: 'PBAS Data Not Found. Please fill PBAS Form to generate report!' })
                }
            }).catch((err) => {
                toast.error('Failed fetching data')
            })
    } catch (error) {
        toast.error('Internal Server error');
    }
}







export { saveCASDetails, generatePBASReport, getCASData, getTotalPBASData }
