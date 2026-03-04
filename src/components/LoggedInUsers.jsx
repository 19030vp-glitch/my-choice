import { Avatar } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import serverLinks from '../js/serverLinks'
import siteLinks from './siteLinks'

const LoggedInUsers = () => {

    const users = useSelector((state) => state.user)

    const navigate = useNavigate()

    const redirectLinks = {
        user: { homeLink: siteLinks.facultyHome.link, serviceName: 'faculty', title: "Faculty" },
        directorUser: { homeLink: siteLinks.directorHome.link, serviceName: 'director', title: "Director" },
        studentUser: { homeLink: siteLinks.studentHome.link, serviceName: 'student', title: "Student" },
        alumniUser: { homeLink: siteLinks.alumniHome.link, serviceName: 'student', title: "Alumni" },
        proUser: { homeLink: siteLinks.proHome.link, serviceName: 'news', title: "PRO" },
        adminUser: { homeLink: siteLinks.adminHome.link, serviceName: 'admin', title: "Admin" },
        youthUser: { homeLink: siteLinks.yfCollegeHome.link, serviceName: 'youthfestival', title: "YF", abbr: "YF" },
        dsdUser: { homeLink: siteLinks.dsdHome.link, serviceName: 'dsd', title: "DSD", abbr: "DSD" },
        krcUser: { homeLink: siteLinks.krcHome.link, serviceName: 'krc', title: "KRC", abbr: "KRC" },
        sportsUser: { homeLink: siteLinks.sportsHome.link, serviceName: 'sports', title: "Sports", abbr: "SPRT" },
        nssUser: { homeLink: siteLinks.nssHome.link, serviceName: 'nss', title: "NSS", abbr: "NSS" },
        examUser: { homeLink: siteLinks.examHome.link, serviceName: 'exam', title: "BOEE", abbr: "BOEE" },
        placementUser: { homeLink: siteLinks.placementHome.link, serviceName: 'placement', title: "TPO", abbr: "TPO" },
        iilUser: { homeLink: siteLinks.iilHome.link, serviceName: 'iil', title: "IIL", abbr: "IIL" },
        skillUser: { homeLink: siteLinks.skillHome.link, serviceName: 'skill', title: "CETSD", abbr: "CETSD" },
        pgUser: { homeLink: siteLinks.pgHome.link, serviceName: 'pg', title: "PG", abbr: "PG" },
        apdsUser: { homeLink: siteLinks.apdsHome.link, serviceName: 'apds', title: "APDS", abbr: "APDS" },
        swayamUser: { homeLink: siteLinks.swayamHome.link, serviceName: 'swayam', title: "NPTEL", abbr: "NPTEL" },
        esttUser: { homeLink: siteLinks.esttHome.link, serviceName: 'estt', title: "ESTT", abbr: "ESTT" },
        ushaUser: { homeLink: siteLinks.ushaHome.link, serviceName: 'usha', title: "PM-USHA", abbr: "USHA" },
    }

    return (
        <div>
            <div>
                {
                    users && <div className="text-center bg-gray-100 rounded-md border py-1 px-3 inline-block w-[auto] mx-auto">
                        <div className='flex items-center justify-center gap-4'>

                            {
                                Object.keys(users).map((serviceName, index) => {
                                    return users[serviceName] && <div key={index} className='cursor-pointer'
                                        onClick={() => navigate(redirectLinks[serviceName].homeLink)}>
                                        <div className='text-center flex items-center flex-col justify-center'>
                                            <Avatar draggable={false} src={users[serviceName]?.photoURL ? serverLinks.showFile(users[serviceName]?.photoURL, redirectLinks[serviceName].serviceName) : null} sx={{ fontSize: '15px', bgcolor: 'orange' }} >{redirectLinks[serviceName]?.abbr}</Avatar>
                                            <p className="text-xs text-muted mt-1 font-semibold">{redirectLinks[serviceName].title}</p>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default LoggedInUsers