import Axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setProUser, setUser } from '../redux/slices/UserSlice';
import { api } from '../js/api';

const useProAuth = (shouldNavigate = true, keepMeOnTheSamePageAfterLogout = false) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {

        const pro_token = localStorage.getItem('pro-token')

        if (pro_token) {

            Axios.post(`${api}/api/user/authentication`, { token: pro_token, model: 'PROUser', filterName: 'username' })
                .then(res => {
                    if (res.data.status === 'authenticated') {
                        dispatch(setProUser(res.data.user))
                        if (shouldNavigate) navigate('/pro')
                    }
                    else {
                        navigate('/load/pro-login')
                        dispatch(setProUser(null))
                        localStorage.removeItem('pro-token')
                    }
                })
                .catch(err => {
                    navigate('/pro-login')
                    dispatch(setProUser(null))
                    localStorage.removeItem('pro-token')
                })
        }
        else {
            if (keepMeOnTheSamePageAfterLogout === false) {
                navigate('/pro-login')
            }
            dispatch(setProUser(null))
            localStorage.removeItem('pro-token')
        }


    }, [])

}

export default useProAuth