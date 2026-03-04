import StatusPage from '../../status/pages/StatusPage'
import useAdminAuth from '../../../hooks/useAdminAuth'

const AdminReportStatus = () => {
  return (
    <div >
      <div className='sub-main'>
        <StatusPage auth={{ admin: useAdminAuth }} user="admin" />
      </div>
    </div>
  )
}

export default AdminReportStatus
