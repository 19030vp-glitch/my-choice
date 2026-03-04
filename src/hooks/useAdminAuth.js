import Axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAdminUser } from '../redux/slices/UserSlice';
import { api } from '../js/api';

const useAdminAuth = (shouldNavigate) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {

        const admin_token = localStorage.getItem('admin-token')

        if (admin_token) {

            Axios.post(`${api}/api/auth/admin`, { admin_token })
                .then(res => {
                    if (res.data.status === 'authenticated') {
                        dispatch(setAdminUser(res.data.admin))

                        if (shouldNavigate === false) {
                            navigate('/admin')
                        }
                    }
                    else {
                        navigate('/load/admin-login')
                        dispatch(setAdminUser(null))
                        localStorage.removeItem('admin-token')

                    }
                })
                .catch(err => {
                    navigate('/admin-login')
                    dispatch(setAdminUser(null))
                    localStorage.removeItem('admin-token')

                })
        }
        else {
            navigate('/admin-login')
            dispatch(setAdminUser(null))
            localStorage.removeItem('admin-token')
        }


    }, [])



}

export default useAdminAuth