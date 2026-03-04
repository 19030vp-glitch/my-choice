import Axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setDirectorUser, } from '../redux/slices/UserSlice';
import { api } from '../js/api';

const useDirectorAuth = (shouldNavigate) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {

        const director_token = localStorage.getItem('director-token')
        if (director_token) {

            Axios.post(`${api}/api/user/authentication`, { token: director_token, model: 'DirectorUser', filterName: 'department' })
                .then(res => {
                    if (res.data.status === 'authenticated') {
                        dispatch(setDirectorUser(res.data.user))
                        if (shouldNavigate === false) {
                            navigate('/director/')
                        }
                    }
                    else {
                        navigate('/load/director-login')
                        dispatch(setDirectorUser(null))
                        localStorage.removeItem('director-token')

                    }
                })
                .catch(err => {
                    navigate('/director-login')
                    dispatch(setDirectorUser(null))
                    localStorage.removeItem('director-token')

                })
        }
        else {
            navigate('/director-login')
            dispatch(setDirectorUser(null))
            localStorage.removeItem('director-token')
        }


    }, [])



}

export default useDirectorAuth