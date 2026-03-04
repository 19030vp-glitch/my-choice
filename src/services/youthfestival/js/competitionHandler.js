import Axios from 'axios'
import toast from 'react-hot-toast'
import { api } from '../../../js/api'

const addCompetition = async ({
    college, selectedStudents, competitionName, academicYear, isGroup, clearFunction, setIsLoading, refetch, isEdit, alreadySelectedStudents, edit, compId
}) => {

    setIsLoading(true)
    const link = `${api}/youthfestival/competition/add`
    Axios.post(link, { college, selectedStudents, competitionName, academicYear, isGroup, isEdit, alreadySelectedStudents, edit, compId })
        .then((res) => {
            if (res.data.status === 'success') {
                toast.success(res.data.message)
                clearFunction()
                refetch()
                setIsLoading(false)
            } else {
                toast.error(res.data.message)
                clearFunction()
                setIsLoading(false)
            }
        }).catch((err) => {
            console.log(err)
            console.log("Something went wrong")
            clearFunction()
            setIsLoading(false)
        })
}

const deleteCompetitions = (compId, refresh) => {
    const link = `${api}/youtfestival/delete/competition`
    Axios.post(link, { compId }).then((res) => {
        if (res.data.status === 'success') {
            toast.success('स्पर्धा यशस्वीरित्या डिलीट करण्यात आली आहे')
            refresh();
        } else {
            toast.error('स्पर्धा डिलिट नाही होऊ शकली')
            refresh();
        }
    }).catch((err) => {
        console.log(err)
        refresh();
        toast.error('स्पर्धा डिलिट नाही होऊ शकली')
    })
}

const deleteStudent = (studentId, refetch) => {
    console.log('Student Id to delete:', studentId)
    const url = `${api}/youthfestival/delete/student`
    Axios.post(url, { studentId }).then((res) => {
        if (res.data.status === 'success') {
            toast.success('विद्यार्थ्याला यशस्वीरीत्या डिलिट केले')
            refetch()
        } else {
            toast.error('विद्यार्थी डिलिट नाही झाला')
        }
    }).catch((error) => {
        console.log(error)
        toast.error('विद्यार्थी डिलिट नाही झाला')
    })
}


const fetchYouthData = ({ model, filter }) => {
    const url = `${api}/youthfestival/get/competitionData`
    return Axios.post(url, { model, filter })
}

const fetchStudentsData = ({ model, filter }) => {
    const url = `${api}/youthfestival/get/student/select`
    return Axios.post(url, { model, filter })
}

export { addCompetition, fetchYouthData, fetchStudentsData, deleteCompetitions, deleteStudent }