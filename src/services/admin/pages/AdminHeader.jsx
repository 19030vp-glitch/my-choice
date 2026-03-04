import React from 'react'
import "../css/admin.css"
import { Avatar } from '@mui/material';
import useAdminAuth from '../../../hooks/useAdminAuth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAdminUser } from '../../../redux/slices/UserSlice';
import siteLinks from '../../../components/siteLinks';
import serverLinks from '../../../js/serverLinks';
import GoBack from '../../../components/GoBack';


const AdminHeader = () => {
  const AdminActive = useSelector(state => state.adminActive.adminActive)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useAdminAuth()
  return (
    <>

      <GoBack backUrl="/" pageTitle="Admin Dashboard (SRTMUN-UIMS)" bredLinks={[siteLinks.welcome, siteLinks.adminDashboard, { title: AdminActive, link: '' }]}>
        <div className="btn-group" >
          <button type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <Avatar src={serverLinks.showFile('male.jpg', 'admin')} className="cursor-pointer" />
          </button>
          <ul className="dropdown-menu">
            {/* <li><button className="dropdown-item" onClick={() => {}}>Profile</button></li> */}

            {/* <li><hr className="dropdown-divider" /></li> */}
            <li><button className="dropdown-item" style={{ color: "red" }} onClick={() => { dispatch(setAdminUser(null)); navigate(siteLinks.welcome.link); localStorage.removeItem('admin-token'); }} >Logout</button></li>
          </ul>
        </div>
      </GoBack>
    </>
  )
}

export default AdminHeader