import Axios from 'axios'
import { toast } from 'react-hot-toast'
import { api } from '../../../js/api'

function serviceLoginHandler({ email, password, model, setUser, navigate, navigationLink, tokenName, setIsLoading, dispatch }) {
    setIsLoading(true)
    // route in userAuthentication.js
    Axios.post(`${api}/service/user/login`, { email, password, model }).then(function (res) {
        if (res.data.status === 'ok') {
            dispatch(setUser(res.data.user))
            localStorage.setItem(tokenName, res.data.token)
            navigate(navigationLink, { replace: true })
            toast.success('Logged in successfully')
            setIsLoading(false)
        }
        else if (res.data.status === 'notok') {
            toast.error(res.data.message)
            setIsLoading(false)
        }
        else {
            toast.error('Username or password is incorrect')
            setIsLoading(false)
        }
    }).catch(function (err) {
        console.log(err)
        toast.error('Something went wrong')
        setIsLoading(false)
    })
}

export default serviceLoginHandler