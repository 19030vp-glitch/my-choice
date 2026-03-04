import Axios from 'axios'
import toast from 'react-hot-toast'
import { api } from '../../../../../js/api'

const saveStudentIntake = async (programId, programData, schoolName, setIsLoading) => {
    const link = `${api}/NIRF/saveStudentIntake`
    setIsLoading(true)
    try {
        const res = await Axios.post(link, { programId, programData, schoolName })

        if (res.data.status === 'success') {
            toast.success('Intake Saved Successfully')
        } else {
            toast.error('Could not save student intake')
        }
    } catch (error) {
        console.log('Error in save intake count', error)
        toast.error('Could not save intake count')
    } finally {
        setIsLoading(false)

    }

}

async function fetchStudentIntake(schoolName) {
    const link = `${api}/NIRF/getStudentIntake`
    return await Axios.post(link, { schoolName })
}


export { saveStudentIntake, fetchStudentIntake }