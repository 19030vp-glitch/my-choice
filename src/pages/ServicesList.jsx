import React from 'react'
import GoBack from '../components/GoBack'
import siteLinks from '../components/siteLinks'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ServicesList = () => {
  const bredLinks = [siteLinks.welcome, siteLinks.srtmunUimsServices]
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)

  const services = [
    {
      title: "Inter-collegiate Youth Festival",
      desc: "College Registration, Student Management, Competition Management",
      loginLink: user?.youthUser ? siteLinks.yfCollegeHome.link : siteLinks.yfCollegeLogin.link
    },
    {
      title: "Centre for Competitive Exams, Training & Skills Development",
      desc: "Counseling and Guidance",
      loginLink: user?.skillUser ? siteLinks.skillHome.link : siteLinks.skillLogin.link
    },
    {
      title: "PG Section",
      desc: "Research Guidance, Progression to H.E., Demand Ratio",
      loginLink: user?.pgUser ? siteLinks.pgHome.link : siteLinks.pgLogin.link,
    },
    {
      title: "Academic Planning & Development Section",
      desc: "JRF-SRF, Research Projects",
      loginLink: user?.apdsUser ? siteLinks.apdsHome.link : siteLinks.apdsLogin.link
    },
    {
      title: "SWAYAM, NPTEL & MOOCs",
      desc: "Information related to MOOCs, SWAYAM/e-PG Pathshala/ NPTEL",
      loginLink: user?.swayamUser ? siteLinks.swayamHome.link : siteLinks.swayamLogin.link
    },
    {
      title: "Establishment Section",
      desc: "Information related to Permanent & Temporary Faculties",
      loginLink: user?.esttUser ? siteLinks.esttHome.link : siteLinks.esttLogin.link
    }

  ]

  return (
    <div>
      <GoBack pageTitle="SRTMUN-UIMS Services List" bredLinks={bredLinks} />

      <div className="mt-4 grid grid-cols-3 gap-4">
        {
          services?.map((item) => {
            return <div className='bg-gray-50 hover:bg-gray-100 p-2 rounded-md border cursor-pointer' onClick={() => navigate(item.loginLink)}>
              <p className='text-semibold'>{item.title}</p>
              <p className='text-sm text-muted'>{item.desc}</p>
            </div>
          })
        }
      </div>
    </div>
  )
}

export default ServicesList
