import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Axios from 'axios'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import Bred from '../../../components/Bred'
import title from '../../../js/title'
import siteLinks from '../../../components/siteLinks'
import { api } from '../../../js/api'
import OnlyNav from '../../../components/OnlyNav'

const users = {
    faculty: { name: "Faculty", model: "User", links: [siteLinks.welcome, siteLinks.facultyHome, siteLinks.facultyChangePass], reduxUser: "user", token: "faculty-token" },
    director: { name: "Director", model: "DirectorUser", links: [siteLinks.welcome, siteLinks.directorHome, siteLinks.directorChangePass], reduxUser: "directorUser", token: "director-token" },
    student: { name: "Student", model: "StudentUser", links: [siteLinks.welcome, siteLinks.studentHome, siteLinks.studentChangePass], reduxUser: "studentUser", token: "student-token" },
    alumni: { name: "Alumni", model: "StudentUser", links: [siteLinks.welcome, siteLinks.alumniHome, siteLinks.alumniChangePass], reduxUser: "alumniUser", token: "alumni-token" },
}
const ChangePassword = () => {
    const params = useParams()
    const userType = params.userType
    const name = users?.[userType]?.name
    title(`Change ${name} Password`)
    const model = users?.[userType]?.model
    const token = users?.[userType]?.token
    const reduxUser = users?.[userType]?.reduxUser


    // const [email, setEmail] = useState('')
    const navigate = useNavigate()
    let links = users?.[userType]?.links


    // states
    const [newPassword, setNewPassword] = useState('')
    const [newCPassword, setCNewPassword] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const user = useSelector(state => state.user?.[reduxUser])

    useEffect(() => {
        if (!user) {
            navigate(links[1].link)
        }
    }, [user])


    // change password
    function handleSubmit(e) {

        e.preventDefault()

        // check if new password or confirm password are same
        if (newPassword !== newCPassword) {
            toast.error('New password and confirm password does not match')
            return
        }

        setIsLoading(true)

        // check if current password is correct
        Axios.post(`${api}/service/changePassword`, { model, currentPassword, newPassword, userId: user._id })
            .then((res) => {
                if (res.data.status === 'changed') {
                    setIsLoading(false)
                    navigate(links[1].link)
                    toast.success('Password changed successfully')
                    setNewPassword('')
                    setCNewPassword('')
                    setCurrentPassword('')

                }
                else if (res.data.status === 'wrong') {
                    setNewPassword('')
                    setCNewPassword('')
                    setCurrentPassword('')
                    setIsLoading(false)
                    toast.error('Current password is wrong')
                }
                else {
                    setIsLoading(false)
                    toast.error('Something went wrong... try again later')
                }
            })




    }

    return (
        <div>
            <OnlyNav user={user} logout={{ token, link: siteLinks.welcome.link }}
                heading={{ title: `Change ${name} Password`, link: links[1].link }}
                li={links} userType={userType}
            />
            <div className="w-full">
                <div className='mt-2'>
                    <Bred links={links} />
                </div>
                <div className='flex items-center justify-center gap-2 mb-3 mt-6 mx-auto'>
                    <KeyRoundedIcon className='text-orange-700' />
                    <p className='text-orange-700 font-bold text-xl'>Change Password</p>
                </div>
                <div>
                    <div className="flex md:w-1/2 sm:w-full mx-auto items-center justify-center mt-3 mb-4 rounded-xl bg-gray-100 p-4">
                        <form className='md:w-[60%] sm:w-3/4 flex flex-col gap-2 w-full' onSubmit={handleSubmit}>

                            {/* OLD PASSWORD */}
                            <input type="password" placeholder="Enter your current password" className="p-3 rounded-lg form-control" required value={currentPassword} onChange={(e) => { setCurrentPassword(e.target.value) }} />



                            {/* // NEW PASSWORD */}
                            <input type="password" placeholder="Create a new password" className="p-3 rounded-lg mt-3 form-control" required value={newPassword} onChange={(e) => { setNewPassword(e.target.value) }} />

                            <input type="password" placeholder="New password, again" className="p-3 rounded-lg form-control" required value={newCPassword} onChange={(e) => { setCNewPassword(e.target.value) }} />




                            {
                                !isLoading ?

                                    <button type="submit" className="bg-blue-600 text-white rounded-lg hover:bg-blue-700 ease-in-out duration-200 p-3 mt-2">Change Password</button>

                                    :

                                    <button className="btn btn-primary bg-blue-600 text-white rounded-lg hover:bg-blue-700 ease-in-out duration-200 p-3 mt-2" type="button" disabled>
                                        <span className="spinner-grow spinner-grow-sm mx-2" role="status" aria-hidden="true"></span>
                                        Please wait...
                                    </button>

                            }
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword