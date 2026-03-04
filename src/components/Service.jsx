import { Link } from 'react-router-dom'
import React from 'react'
import siteLinks from './siteLinks'

const Service = () => {
    return (
        <div>
            <section >

                <div className="flex flex-col lg:flex-row items-center justify-between flex-wrap">


                    <div className="p-3 flex-auto w-full lg:w-fit">
                        <div className="wrap-price">
                            <div className="price-innerdetail h-[100%] text-center flex flex-col items-center justify-between">
                                <div>
                                    <h5>Career Advancement Scheme</h5>
                                    <p className="prices">CAS Report</p>
                                </div>

                                <div className='flex items-center justify-center gap-2'>
                                    <Link to={siteLinks.cas.link} className="duration-200 bg-blue-900 text-white hover:bg-blue-800 p-2 rounded-lg ease-in-out mt-5 text-decoration-none">Fill Form</Link>
                                    <Link to={siteLinks.casReport.link} className="duration-200 bg-blue-900 text-white hover:bg-blue-800 p-2 rounded-lg ease-in-out mt-5 text-decoration-none">Download Report</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-3 flex-auto w-full lg:w-fit">
                        <div className="wrap-price">
                            <div className="price-innerdetail h-[100%] text-center flex flex-col items-center justify-between">
                                <div>
                                    <h5>Performance Based Appraisal System</h5>
                                    <p className="prices">PBAS Report</p>
                                </div>
                                <div className='flex items-center justify-center gap-2'>
                                    <Link to={siteLinks.pbas.link} className="duration-200 bg-blue-900 text-white hover:bg-blue-800 p-2 rounded-lg ease-in-out mt-5 text-decoration-none"> Fill Form</Link>
                                    <Link to={siteLinks.pbasReport.link} className="duration-200 bg-blue-900 text-white hover:bg-blue-800 p-2 rounded-lg ease-in-out mt-5 text-decoration-none"> Download Report</Link>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="p-3 flex-auto w-full lg:w-fit">
                        <div className="wrap-price">
                            <div className="price-innerdetail h-[100%] text-center flex flex-col items-center justify-between">
                                <div>
                                    <h5>Annual Quality Assurance Report</h5>
                                    <p className="prices">AQAR</p>
                                </div>
                                <div className='flex items-center justify-center gap-2'>
                                    <Link to={siteLinks.aqar.link} className="duration-200 bg-blue-900 text-white hover:bg-blue-800 p-2 rounded-lg ease-in-out mt-5 text-decoration-none"> Fill Form</Link>
                                    <Link to={siteLinks.aqarReport.link} className="duration-200 bg-blue-900 text-white hover:bg-blue-800 p-2 rounded-lg ease-in-out mt-5 text-decoration-none"> Download AQAR Data </Link>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="p-3 flex-auto w-full lg:w-fit">
                        <div className="wrap-price">
                            <div className="price-innerdetail h-[100%] text-center flex flex-col items-center justify-between">
                                <div>
                                    <h5>All Academic Details</h5>
                                    <p className="prices">Faculty Profile</p>
                                </div>
                                <div className='flex items-center justify-center gap-2'>
                                    <Link to={siteLinks.facultyProfile.link} className="duration-200 bg-blue-900 text-white hover:bg-blue-800 p-2 rounded-lg ease-in-out mt-5 text-decoration-none"> Profile</Link>
                                    <Link to={siteLinks.facultyReport.link} className="duration-200 bg-blue-900 text-white hover:bg-blue-800 p-2 rounded-lg ease-in-out mt-5 text-decoration-none"> Download Report</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    )
}

export default Service


const ServiceTile = ({ fullForm, title, link1, link1Title, link2, link2Title }) => {
    return (
        <div className="p-3 flex-auto w-full lg:w-fit">
            <div className="wrap-price">
                <div className="price-innerdetail h-[100%] text-center flex flex-col items-center justify-between">
                    <div>
                        <h5>{fullForm}</h5>
                        <p className="prices">{title}</p>
                    </div>
                    <div className='flex items-center justify-center gap-2'>
                        {link1 && <Link to={link1} className="duration-200 bg-blue-900 text-white hover:bg-blue-800 p-2 rounded-lg ease-in-out mt-5 text-decoration-none"> {link1Title}</Link>}
                        {link2 && <Link to={link2} className="duration-200 bg-blue-900 text-white hover:bg-blue-800 p-2 rounded-lg ease-in-out mt-5 text-decoration-none"> {link2Title}</Link>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export { ServiceTile }