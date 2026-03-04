import React from 'react'
import useDirectorAuth from '../../../hooks/useDirectorAuth'
import { useSelector } from 'react-redux'
import Bred from '../../../components/Bred'
import siteLinks from '../../../components/siteLinks'
import OnlyNav from '../../../components/OnlyNav'
import Footer from '../../../components/Footer'
import title from '../../../js/title'
import AdminResearchCenter from '../../admin/pages/AdminResearchCenter'

const DirectorRC = () => {
    const user = useSelector(state => state.user.directorUser)
  useDirectorAuth()

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

      {user&&<AdminResearchCenter School={user.department} />}

      <div className="">
        <br /><br />
        <Footer />
      </div>
    </>
  )
}

export default DirectorRC
