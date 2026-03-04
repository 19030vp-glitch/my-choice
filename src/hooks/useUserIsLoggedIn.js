import { useEffect } from "react"
import { useDispatch } from "react-redux"
import Axios from 'axios'
import { setAdminUser, setDirectorUser, setUser, setAlumniUser, setStudentUser, setProUser } from "../redux/slices/UserSlice"
import useYouthAuth from "./useYouthAuth"
import useOtherServiceAuth from "./useOtherServiceAuth"
import authParamsObject from "../js/authParamsObject"
import { api } from "../js/api"


const useUserIsLoggedIn = () => {

    const dispatch = useDispatch()
    useYouthAuth(false, true)
    useOtherServiceAuth({ ...authParamsObject.apds, usingInIsUserLoggedInHook: true })
    useOtherServiceAuth({ ...authParamsObject.dsd, usingInIsUserLoggedInHook: true })
    useOtherServiceAuth({ ...authParamsObject.estt, usingInIsUserLoggedInHook: true })
    useOtherServiceAuth({ ...authParamsObject.exam, usingInIsUserLoggedInHook: true })
    useOtherServiceAuth({ ...authParamsObject.iil, usingInIsUserLoggedInHook: true })
    useOtherServiceAuth({ ...authParamsObject.krc, usingInIsUserLoggedInHook: true })
    useOtherServiceAuth({ ...authParamsObject.nss, usingInIsUserLoggedInHook: true })
    useOtherServiceAuth({ ...authParamsObject.pg, usingInIsUserLoggedInHook: true })
    useOtherServiceAuth({ ...authParamsObject.skill, usingInIsUserLoggedInHook: true })
    useOtherServiceAuth({ ...authParamsObject.sports, usingInIsUserLoggedInHook: true })
    useOtherServiceAuth({ ...authParamsObject.swayam, usingInIsUserLoggedInHook: true })
    useOtherServiceAuth({ ...authParamsObject.tpo, usingInIsUserLoggedInHook: true })
    useOtherServiceAuth({ ...authParamsObject.usha, usingInIsUserLoggedInHook: true })


    useEffect(() => {

        // admin
        const admin_token = localStorage.getItem('admin-token')
        if (admin_token) {

            Axios.post(`${api}/api/auth/admin`, { admin_token })
                .then(res => {
                    if (res.data.status === 'authenticated') {
                        dispatch(setAdminUser(res.data.admin))
                    }
                    else {
                        dispatch(setAdminUser(null))
                        localStorage.removeItem('admin-token')

                    }
                })
                .catch(err => {
                    dispatch(setAdminUser(null))
                    localStorage.removeItem('admin-token')

                })
        }
        else {
            dispatch(setAdminUser(null))
            localStorage.removeItem('admin-token')

        }

        // faculty
        const faculty_token = localStorage.getItem('faculty-token')
        if (faculty_token) {

            Axios.post(`${api}/api/user/authentication`, { token: faculty_token, model: 'FacultyUser', filterName: 'username' })
                .then(res => {
                    if (res.data.status === 'authenticated') {
                        dispatch(setUser(res.data.user))
                    }
                    else {
                        dispatch(setUser(null))
                        localStorage.removeItem('faculty-token')
                    }
                })
                .catch(err => {
                    dispatch(setUser(null))
                    localStorage.removeItem('faculty-token')

                })
        }
        else {
            dispatch(setUser(null))
            localStorage.removeItem('faculty-token')

        }

        // director
        const director_token = localStorage.getItem('director-token')
        if (director_token) {

            Axios.post(`${api}/api/user/authentication`, { token: director_token, model: 'DirectorUser', filterName: 'department' })
                .then(res => {
                    if (res.data.status === 'authenticated') {
                        dispatch(setDirectorUser(res.data.user))
                    }
                    else {
                        dispatch(setDirectorUser(null))
                        localStorage.removeItem('director-token')

                    }
                })
                .catch(err => {
                    dispatch(setDirectorUser(null))
                    localStorage.removeItem('director-token')

                })
        }
        else {
            dispatch(setDirectorUser(null))
            localStorage.removeItem('director-token')
        }

        // student
        const student_token = localStorage.getItem('student-token')
        if (student_token) {

            Axios.post(`${api}/api/user/authentication`, { token: student_token, model: 'StudentUser', filterName: 'email' })
                .then(res => {
                    if (res.data.status === 'authenticated') {
                        dispatch(setStudentUser(res.data.user))
                    }
                    else {
                        dispatch(setStudentUser(null))
                        localStorage.removeItem('student-token')
                    }
                })
                .catch(err => {
                    dispatch(setStudentUser(null))
                    localStorage.removeItem('student-token')

                })
        }
        else {
            dispatch(setStudentUser(null))
            localStorage.removeItem('student-token')

        }

        // alumni
        const alumni_token = localStorage.getItem('alumni-token')
        if (alumni_token) {

            Axios.post(`${api}/api/user/authentication`, { token: alumni_token, model: 'StudentUser', filterName: 'email' })
                .then(res => {
                    if (res.data.status === 'authenticated') {
                        dispatch(setAlumniUser(res.data.user))
                    }
                    else {
                        dispatch(setAlumniUser(null))
                        localStorage.removeItem('alumni-token')
                    }
                })
                .catch(err => {
                    dispatch(setAlumniUser(null))
                    localStorage.removeItem('alumni-token')

                })
        }
        else {
            dispatch(setAlumniUser(null))
            localStorage.removeItem('alumni-token')

        }


        // pro
        const pro_token = localStorage.getItem('pro-token')
        if (pro_token) {

            Axios.post(`${api}/api/user/authentication`, { token: pro_token, model: 'PROUser', filterName: 'username' })
                .then(res => {
                    if (res.data.status === 'authenticated') {
                        dispatch(setProUser(res.data.user))
                    }
                    else {
                        dispatch(setProUser(null))
                        localStorage.removeItem('pro-token')
                    }
                })
                .catch(err => {
                    dispatch(setProUser(null))
                    localStorage.removeItem('pro-token')

                })
        }
        else {
            dispatch(setProUser(null))
            localStorage.removeItem('pro-token')
        }


    }, [])
}

export default useUserIsLoggedIn