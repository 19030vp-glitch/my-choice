import React from 'react'
import StatusPage from '../../status/pages/StatusPage'
import useDirectorAuth from '../../../hooks/useDirectorAuth'


const DirectorReportStatus = () => {
    return (
        <div>
            <StatusPage auth={{ director: useDirectorAuth }} />
        </div>
    )
}

export default DirectorReportStatus
