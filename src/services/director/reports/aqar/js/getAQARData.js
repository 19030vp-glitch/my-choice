import Axios from 'axios'
import { toast } from 'react-hot-toast';
import { api } from '../../../../../js/api';

const getAQARData = (setData, getByYear, filter, aqarYear, userType = 'faculty') => {
    const link = `${api}/service/${userType}/report/aqar/getData`;

    Axios.post(link, { filter })
        .then((res) => {
            if (res.data.status === 'success') {
                if (getByYear) {
                    res.data.data.aqarData.forEach((aqar) => {
                        if (JSON.parse(aqar).aqarYear === aqarYear) {
                            setData(JSON.parse(aqar));
                        }
                    })
                }
                else {
                    setData(res.data.data);
                }
            }
            else {
                setData(null)
            }
        }).catch((err) => {
            toast.error('Failed fetching data')
        })
}

const getTotalFacultyAQARData = (setData, setError) => {
    try {
        Axios.post(`${api}/service/faculty/report/aqar/getTotalData`,)
            .then((res) => {
                if (res.data.status === 'success') {
                    setData(res.data.data);
                }
                else {
                    setData(null)
                    setError({ error: true, message: 'Faculy AQAR Data Not Found. Please fill Faculy AQAR Form to generate report!' })
                }
            }).catch((err) => {
                toast.error('Failed fetching data')
            })
    } catch (error) {
        toast.error('Internal Server error');
    }
}


const getTotalDirectorAQARData = (setData, setLoading, setError) => {
    try {
        Axios.post(`${api}/service/director/report/aqar/getTotalData`,)
            .then((res) => {
                if (res.data.status === 'success') {
                    setData(res.data.data);
                    setLoading(false)
                }
                else {
                    setData(null)
                    setLoading(false)
                    setError({ error: true, message: 'Director AQAR Data Not Found. Please fill Director AQAR Form to generate report!' })
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



export default getAQARData
export { getTotalFacultyAQARData, getTotalDirectorAQARData }

