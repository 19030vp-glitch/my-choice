import React from 'react'
import AdminFaculty from '../../admin/pages/AdminFaculty'
import useDirectorAuth from '../../../hooks/useDirectorAuth'
import { useSelector } from 'react-redux'
import Bred from '../../../components/Bred'
import siteLinks from '../../../components/siteLinks'
import OnlyNav from '../../../components/OnlyNav'
import Footer from '../../../components/Footer'
import title from '../../../js/title'

const DirectorFRCC = () => {
  const user = useSelector(state => state.user.directorUser)
  useDirectorAuth()
  title('Numarical Dashboard')
  return (
    <>
      <OnlyNav user={user} logout={{ token: 'director-token', link: siteLinks.welcome.link }}
        heading={{ title: 'Director', link: siteLinks.directorHome.link }}
        li={[siteLinks.sdm, siteLinks.aaa]} userType="director"
      />

      {/* bred & title */}
      <div className='mt-2 mb-4'>
        <Bred links={[siteLinks.welcome, siteLinks.directorHome, siteLinks.fdc]} />
      </div>

      {user&&<AdminFaculty school={user.department} />}

      <div className="">
        <br /><br />
        <Footer />
      </div>
    </>
  )
}

export default DirectorFRCC
