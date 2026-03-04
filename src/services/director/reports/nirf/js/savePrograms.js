import Axios from 'axios'
import toast from 'react-hot-toast'
import { api } from '../../../../../js/api'

async function savePrograms(schoolName, academicYear, programs, dispatch, setData, setIsProgramLoading) {
    setIsProgramLoading(true)
    const link = `${api}/NIRF/savePrograms`
    try {
        const res = await Axios.post(link, { schoolName, programs, academicYear })

        if (res.data.status === 'success') {
            dispatch(setData(res.data?.data || []))
            toast.success('Program(s) Saved Successfully')
        } else {
            toast.error('Could not save program(s)')
        }
    } catch (error) {
        console.log('Error in save programs', error)
        toast.error('Could not save program(s)')
    } finally {
        setIsProgramLoading(false)
    }
}

async function fetchPrograms(schoolName, academicYear, all = false) {
    const link = `${api}/NIRF/getPrograms`
    return await Axios.post(link, { schoolName, academicYear, all })
}

export { savePrograms, fetchPrograms }