import Axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/UserSlice';
import { api } from '../js/api';

const useAuth = (shouldNavigate = true) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {

        const faculty_token = localStorage.getItem('faculty-token')

        if (faculty_token) {

            Axios.post(`${api}/api/user/authentication`, { token: faculty_token, model: 'FacultyUser', filterName: 'username' })
                .then(res => {
                    if (res.data.status === 'authenticated') {
                        dispatch(setUser(res.data.user))
                        if (shouldNavigate) navigate('/faculty')
                    }
                    else {
                        navigate('/load/faculty-login')
                        dispatch(setUser(null))
                        localStorage.removeItem('faculty-token')
                    }
                })
                .catch(err => {
                    navigate('/faculty-login')
                    dispatch(setUser(null))
                    localStorage.removeItem('faculty-token')
                })
        }
        else {
            navigate('/faculty-login')
            dispatch(setUser(null))
            localStorage.removeItem('faculty-token')
        }


    }, [])

}

export default useAuth