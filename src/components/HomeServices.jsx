import { Link } from 'react-router-dom'
import React from 'react'

export default function HomeServices(props) {
    return (
        <div>
            <section >

                <div className="flex flex-col lg:flex-row items-center justify-between flex-wrap">
                    {
                        props.obj?.map((item) => {
                            return (
                                <div className="p-3 flex-1 w-full">
                                    <div className="wrap-price">
                                        <div className="price-innerdetail h-[100%] text-center flex flex-col items-center justify-between">
                                            <div>
                                                <h5>{item.head}</h5>
                                                <p className="prices">{item.para}</p>
                                            </div>
                                            <div className='flex items-center justify-center gap-2'>
                                                <Link to={item.linkbtn1} className="duration-200 bg-blue-900 text-white hover:bg-blue-800 p-2 rounded-lg ease-in-out mt-5 text-decoration-none">{item.lblbtn1}</Link>
                                                <Link to={item.linkbtn2.link} className="duration-200 bg-blue-900 text-white hover:bg-blue-800 p-2 rounded-lg ease-in-out mt-5 text-decoration-none">{item.lblbtn2}</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>)
                        })
                    }
                </div>
            </section>
        </div>
    )
}
