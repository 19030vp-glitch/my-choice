import Axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAlumniUser } from '../redux/slices/UserSlice';
import siteLinks from '../components/siteLinks';
import { api } from '../js/api';

const useAlumniAuth = (shouldNavigate = true) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {

        const alumni_token = localStorage.getItem('alumni-token')

        if (alumni_token) {

            Axios.post(`${api}/api/user/authentication`, { token: alumni_token, model: 'AlumniUser', filterName: 'email' })
                .then(res => {
                    if (res.data.status === 'authenticated') {
                        dispatch(setAlumniUser(res.data.user))
                        if (shouldNavigate) navigate(siteLinks.alumniHome.link)
                    }
                    else {
                        navigate('/load/alumni-login')
                        dispatch(setAlumniUser(null))
                        localStorage.removeItem('alumni-token')
                    }
                })
                .catch(err => {
                    navigate(siteLinks.alumniLogin.link)
                    dispatch(setAlumniUser(null))
                    localStorage.removeItem('alumni-token')
                })
        }
        else {
            navigate(siteLinks.alumniLogin.link)
            dispatch(setAlumniUser(null))
            localStorage.removeItem('alumni-token')
        }


    }, [])

}

export default useAlumniAuth