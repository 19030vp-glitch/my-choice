import Axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAlumniUser, setStudentUser } from '../redux/slices/UserSlice';
import siteLinks from '../components/siteLinks';
import { api } from '../js/api';

const useStudentAuth = (shouldNavigate = true, userType) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {

        const student_token = localStorage.getItem(userType === 'student' ? 'student-token' : 'alumni-token')

        if (student_token) {

            Axios.post(`${api}/api/user/authentication`, { token: student_token, model: 'StudentUser', filterName: 'email' })
                .then(res => {
                    if (res.data.status === 'authenticated') {
                        dispatch(userType === 'student' ? setStudentUser(res.data.user) : setAlumniUser(res.data.user))
                        if (shouldNavigate) navigate(userType === 'student' ? siteLinks.studentHome.link : siteLinks.alumniHome.link)
                    }
                    else {
                        navigate(userType === 'student' ? '/load/student-login' : '/load/alumni-login')
                        dispatch(userType === 'student' ? setStudentUser(null) : setAlumniUser(null))
                        localStorage.removeItem(userType === 'student' ? 'student-token' : 'alumni-token')
                    }
                })
                .catch(err => {
                    navigate(siteLinks.studentLogin.link)
                    dispatch(userType === 'student' ? setStudentUser(null) : setAlumniUser(null))
                    localStorage.removeItem(userType === 'student' ? 'student-token' : 'alumni-token')
                })
        }
        else {
            navigate(userType === 'student' ? siteLinks.studentLogin.link : siteLinks.alumniLogin.link)
            dispatch(userType === 'student' ? setStudentUser(null) : setAlumniUser(null))
            localStorage.removeItem(userType === 'student' ? 'student-token' : 'alumni-token')

        }


    }, [])

}

export default useStudentAuth