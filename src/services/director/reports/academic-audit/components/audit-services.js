// this function will access the database and get the information from the model received from the arguments

import Axios from 'axios';
import toast from 'react-hot-toast';
import { api } from '../../../../../js/api';

// getter for faculty data for faculty tables from server
const getData = async (model, school, auditYear, setState) => {
    const res = await Axios.post(`${api}/api/director/academic-audit/getData/facultyData`,
        { model, school, auditYear })
    if (res) {
        if (res.data.status === 'success') {
            setState(res.data.data)
        }
        else if (res.data.status === 'error') {
            setState(null)
        }
        else {
            toast.error('Unable to fetch data from server')
        }
    } else {
        toast.error('Unable to fetch data from server')
    }

}

// getter for director data for director tables from server
const getDirectorData = async (model, school, setState) => {
    const res = await Axios.post(`${api}/api/director/academic-audit/getData/directorData`,
        { model, school })
    if (res) {
        if (res.data.status === 'success') {
            setState(res.data.data)
        }
        else if (res.data.status === 'error') {
            setState(null)
        }
        else {
            toast.error('Unable to fetch data from server')
        }
    } else {
        toast.error('Unable to fetch data from server')
    }

}

// saving data to database
const saveAAAData = async (AAAData, schoolName, setAutoSaveLoader) => {
    setAutoSaveLoader(true)
    const res = await Axios.post(`${api}/api/director/academic-audit/saveAAAData`,
        { AAAData, schoolName })
    if (res) {
        if (res.data.status === 'success') {
            setAutoSaveLoader(false)
            toast.success('Progess saved...')
        }
        else if (res.data.status === 'error') {
            toast.error('Could not save the data')
            setAutoSaveLoader(false)
        }
        else {
            toast.error('Could not save the data')
            setAutoSaveLoader(false)
        }
    } else {
        toast.error('Internal Server error')
        setAutoSaveLoader(false)

    }

}

// fetching data from database
const getAuditData = async (schoolName, auditYear, setData, setError, sortByYear, setAllYearAAAData, setShouldProceed) => {
    if (setShouldProceed) {
        setShouldProceed(false)
    }
    try {
        Axios.post(`${api}/api/director/academic-audit/getAAAData`, { schoolName })
            .then((res) => {
                if (res.data.status === 'success') {

                    if (setAllYearAAAData) {
                        setAllYearAAAData(() => res.data.data.AAAData && res.data.data.AAAData.sort((a, b) => {
                            return parseInt(JSON.parse(a).auditYear.slice(0, 4)) - parseInt(JSON.parse(b).auditYear.slice(0, 4));
                        }))
                    }

                    if (sortByYear) {
                        res.data.data.AAAData.forEach((item) => {
                            if (JSON.parse(item).auditYear === auditYear) {
                                setData(() => JSON.parse(item));
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
                    setError(new Date().getTime())
                }

                // letting form proceed after fetching data
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

const generateAAAReport = (userData, selectedYear, setReportLoading) => {
    try {
        Axios.post(`${api}/generateAAAReport`, { userData, selectedYear })
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
    }


}

const getTotalAAAData = (setData, setLoading, setError) => {
    try {
        Axios.post(`${api}/api/director/academic-audit/getTotalAAAData`,)
            .then((res) => {
                if (res.data.status === 'success') {
                    setData(res.data.data);
                    setLoading(false)
                }
                else {
                    setData(null)
                    setLoading(false)
                    setError({ error: true, message: 'AAA Data Not Found. Please fill AAA Form to generate report!' })
                }
            }).catch((err) => {
                toast.error('Failed fetching data')
                setLoading(false)
            })
    } catch (error) {
        toast.error('Internal Server error');
        setLoading(false)
    }
}




export default getData
export { getDirectorData, saveAAAData, getAuditData, generateAAAReport, getTotalAAAData }
